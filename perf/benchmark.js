// Copyright 2004-present Facebook. All Rights Reserved.

// Licensed under the Apache License, Version 2.0 (the "License"); you may
// not use this file except in compliance with the License. You may obtain
// a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

var Benchmark = (function() {
    var count = 0;
    var frame = 0;
    var backoff = 0;
    var num = 1;
    var w, h;
    var inc;
    var dec;
    var desc;
    var tid;
    var nodel;
    var targetfps, targetfps_max, targetfps_min;
    var adjustment, hit_slow;
    var goodcount, hit_good;
    var last_slow;
    var toofast, tooslow;
    var timenear;
    var testover;
    var slowframes;
    var demo;
    var starttime;
    var runtest = false;

    var Benchmark = {};

    function setup(criteria) {
      // functions to increase/decrease the amount of things drawn
      inc = criteria.inc;
      dec = criteria.dec;

      // how many times to call incremenet/decrement when we need to increase/decrease
      num = criteria.num || num;

      demo = criteria.demo || null;
      tid = criteria.tid;
      w = criteria.w || Browser.winsize[0];
      h = criteria.h || Browser.winsize[1];
      nodel = criteria.nodel;
      count = 0;
      frame = 0;
      backoff = 0;
      slowframes = 0;
      targetfps = criteria.tfps ? criteria.tfps : 60;
      adjustment = 0, hit_slow = false;
      goodcount = 0, hit_good = false;
      starttime = (new Date()).getTime();

      // we want to be within 5% of the target fps
      targetfps_max = targetfps + 1;
      targetfps_min = targetfps - 1;

      // .. unless we're on Firefox < 20.0, where rAF sucks
      if ("version" in window &&
          window.version[0].indexOf("firefox") == 0 &&
          parseFloat(window.version[1]) < 20.0)
      {
        targetfps_max = targetfps * 1.05;
        targetfps_min = targetfps * 0.95;
      }

      //console.log("target FPS:", targetfps);
      runtest = true;
      Benchmark.name = tid;
    }

    function setCount(newCount) {
      newCount = Math.floor(newCount);
      if (newCount <= 0)
        newCount = 1;

      if (newCount == count)
        return;

      if (newCount > count) {
        while (count != newCount) {
          inc(count++, w, h);
        }
      } else {
        while (count != newCount) {
          dec(--count);
        }
      }

      //console.log("setCount", count);
    }

    function tick() {
      if (!(runtest && inc && dec))
        return;

      if (++frame % targetfps != 0)
        return;

      var elapsed = (new Date()).getTime() - starttime;
      if (!demo && elapsed > 60*2*1000) {
        // if we fail to converge in 2 minutes, abort
        runtest = false;
        PerfTest.done(tid, 0);
        return;
      }

      var fps = Tick.fps();

      if (Tick.slowFrame || count == 0) {
        // this is too slow
        slowframes++;

        if (!demo && slowframes == 5) {
          PerfTest.done(tid, 0);
          return;
        }

        setCount(count / 2);
        return;
      }

      // If we already slowed down, and if the delta between
      // the last slow count and our current count is less than 1%...
      // If we're within our target range, flag it as good. 
      // With enough good results, we're done.
      if (hit_slow &&
          Math.abs(count - last_slow) < count * 0.01 &&
          fps >= targetfps_min &&
          fps <= targetfps_max)
      {
        //console.log("good", fps, count);
        if (goodcount++ > 2) {
          runtest = false;
          PerfTest.done(tid, count);
        }

        return;
      }

      // no good!
      goodcount = 0;

      function updateAdjustment() {
        // always change at least 1% of the total count at once,
        // with a minimum of 1; otherwise use half of the previous adjustment
        // value
        adjustment = Math.floor(Math.max(count * 0.01, adjustment / 2));
        if (adjustment == 0)
          adjustment = 1;
        //console.log("updateAdjustment", adjustment);
      }

      if (fps < (hit_slow ? targetfps_min : targetfps_min*0.9)) {
        //console.log("slow, fps", fps, "hit_slow", hit_slow, "targetfps_min", targetfps_min);
        toofast = false;
        if (tooslow && adjustment > 0) {
          // save the last count when we were slow
          last_slow = count;

          updateAdjustment();
          setCount(count - adjustment);

          hit_slow = true;
        } else {
          // Start slowing down by a minimum of 1% of the count, up to
          // count / 4 -- which will be equal to 1/2 of the amount we
          // increased count by when we thought we were fast.
          // So... 1 2 4 8 16 32 64 -> adjustment to 48

          if (!hit_slow) {
            // initialize it to the right range to hunt in
            adjustment = count / 2;
          }

          tooslow = true;
        }
      } else if (hit_slow) {
        //console.log("fast after slow");
        tooslow = false;

        // this will always lower the adjustment
        updateAdjustment();
        setCount(count + adjustment);
      } else {
        //console.log("fast");
        tooslow = false;
        if (toofast) {
          setCount(count * 2);
        } else {
          toofast = true;
        }
      }
    }

    function getCurrentCount() {
      return count;
    }

    function reset() {
      Benchmark.name = null;
      runtest = false;
    }

    Benchmark.reset = reset;
    Benchmark.tick = tick;
    Benchmark.setup = setup;
    Benchmark.count = getCurrentCount;
    return Benchmark;
  })();

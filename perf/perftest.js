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

var PerfTest = (function() {
    var in_speedtests = ("SpeedTests" in window);

    // from https://gist.github.com/raw/3794226/17a1e053341567b747bffb84d04af9b043fa794a/has3d.js
    function has_3d_transforms(){
      var el = document.createElement('p'),
      has3d,
      transforms = {
        'webkitTransform':'-webkit-transform',
        'OTransform':'-o-transform',
        'msTransform':'-ms-transform',
        'MozTransform':'-moz-transform',
        'transform':'transform'
      };
  
      // Add it to the body to get the computed style
      document.body.insertBefore(el, null);
  
      for (var t in transforms) {
        console.log(t);
        if (el.style[t] !== undefined) {
          el.style[t] = 'translate3d(1px,1px,1px)';
          has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
          console.log(has3d);
          break;
        }
      }
  
      document.body.removeChild(el);
  
      return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
    }
  
    function has_css_transitions() {
      var b = document.body || document.documentElement;
      var s = b.style;
      var p = 'transition';
      if(typeof s[p] == 'string') {return true; }
  
      // Tests for vendor specific prop
      v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
      p = p.charAt(0).toUpperCase() + p.substr(1);
      for(var i=0; i<v.length; i++) {
        if(typeof s[v[i] + p] == 'string') { return true; }
      }
      return false;
    }

    var ninja_sprites = [
      'ninja1',
      'ninja2',
      'box1',
      'box2',
      'board1',
      'board2'
    ];

    var ship_sprites = [
      'ship',
      'rock',
      'boom',
      'powerup'
    ];

    function incShip(count, x, y) {
      var sprite = ship_sprites[count % ship_sprites.length];
      Gob.add(Utils.uuidv4(), sprite, parseInt(Math.random() * 8), [Math.random() * x, Math.random() * y], [Math.random() * 10 + 1, 0], Math.random()*2000, 1);
    }

    function incIShip(count, x, y) {
      var sprite = ship_sprites[count % ship_sprites.length];
      var sprite = "ship";
      IGob.add(Utils.uuidv4(), sprite, Math.random()*2000, 1, [[Math.random() * x, Math.random() * y]]);
    }

    function incShipRot(count, x, y) {
      var sprite = ship_sprites[count % ship_sprites.length];
      Gob.add(Utils.uuidv4(), sprite, parseInt(Math.random() * 8), [Math.random() * x, Math.random() * y], [Math.random() * 10 - 5, Math.random() * 10 - 5], Math.random()*2000, 1);
    }

    function incNinja(count, x, y) {
      var sprite = ninja_sprites[count % ninja_sprites.length];
      Gob.add(Utils.uuidv4(), sprite, parseInt(Math.random() * 8), [Math.random() * x, Math.random() * y], [Math.random() * 10 + 1, 0]);
    }

    function incNinjaRot(count, x, y) {
      var sprite = ninja_sprites[count % ninja_sprites.length];
      Gob.add(Utils.uuidv4(), sprite, parseInt(Math.random() * 8), [Math.random() * x, Math.random() * y], [Math.random() * 10 - 5, Math.random() * 10 - 5]);
    }

    function dec(count) {
      for (var id in Gob.gobs) {
        Gob.del(id);
        return;
      }
    }

    function idec(count) {
      for (var id in IGob.igobs) {
        IGob.del(id);
        return;
      }
    }

    function ninjas() {
      Sprites.add('ninja1', {url: '/images/ninja_01.png', frames: 24,
            framepos: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
                       [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
                       [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2]],
            width: 128, height: 128});

      Sprites.add('ninja2', {url: '/images/ninja_02.png', frames: 24,
            framepos: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
                       [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
                       [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2]],
            width: 128, height: 128});

      Sprites.add('box1', {url: '/images/box_01.png', frames: 24,
            framepos: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
                       [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
                       [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2]],
            width: 128, height: 128});

      Sprites.add('box2', {url: '/images/box_02.png', frames: 24,
            framepos: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
                       [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
                       [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2]],
            width: 128, height: 128});

      Sprites.add('board1', {url: '/images/board_01.png', frames: 24,
            framepos: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
                       [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
                       [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2]],
            width: 128, height: 128});

      Sprites.add('board2', {url: '/images/board_02.png', frames: 24,
            framepos: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
                       [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
                       [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2]],
            width: 128, height: 128});
    }

    function iship() {
      Sprites.add('ship', {url: '/images/ship_fbmark.png', frames: 2,
            framepos: [[0, 0], [1, 0]],
            width: 128, height: 128});
    }

    function spitoutcss(frames, width, height, name) {
      var out = "@-webkit-keyframes '"+name+"' {\n";
      for (var i=0,len=frames.length;i<len;i++) {
        var curr;
        if (i == 0)
          curr = "from";
        else
          curr = parseInt(i/len*1000000)/10000 + "\%"
        if (i == len - 1)
          next = "to";
        else {
          next = parseInt((i+1)/len*1000000 - 1)/10000 + "\%"
        }
        if (0) {
          out += curr+" { -webkit-transform: translate("+(frames[i][0]*width ? -frames[i][0]*width : 0)+"px,"+(frames[i][1]*height ? -frames[i][1]*height : 0)+"px); }\n";
          out += next+" { -webkit-transform: translate("+(frames[i][0]*width ? -frames[i][0]*width : 0)+"px,"+(frames[i][1]*height ? -frames[i][1]*height : 0)+"px); }\n";
        } else {
          out += curr+" { background-position: "+(frames[i][0]*width ? -frames[i][0]*width : 0)+"px "+(frames[i][1]*height ? -frames[i][1]*height : 0)+"px; }\n";
          out += next+" { background-position: "+(frames[i][0]*width ? -frames[i][0]*width : 0)+"px "+(frames[i][1]*height ? -frames[i][1]*height : 0)+"px; }\n";
        }
      }
      out += "}\n";
      console.log(out);
    }

    var multiSprites = 10;
    var PerfTest = {};


    function incShipMulti(count,x,y) {
      var sprite = "mship" + (count % multiSprites);
      Gob.add(Utils.uuidv4(), sprite, parseInt(Math.random() * 8), [Math.random() * x, Math.random() * y], [Math.random() * 10 + 1, 0], Math.random()*2000, 1);
    }

    function shipMulti() {
      for (var i=0;i<multiSprites;i++) {
        Sprites.add('mship'+i, {url: '/images/ship.png?'+Utils.uuidv4(), frames: 36,
              framepos: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0],
                         [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
                         [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2],
                         [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3],
                         [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4],
                         [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5]],
              width: 256, height: 256});
      }
    }

    function shipMultiSmall() {
      for (var i=0;i<multiSprites;i++) {
        Sprites.add('mship'+i, {url: '/images/ship_half.png?'+Utils.uuidv4(), frames: 36,
              framepos: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0],
                         [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1],
                         [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2],
                         [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3],
                         [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4],
                         [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5]],
              width: 128, height: 128});
      }
    }

    function ship() {
      if (GameFrame.settings.sprite_sheets) {
        Sprites.add('ship', {url: '/images/ship_fbmark.png', frames: 2,
              framepos: [[0, 0], [1, 0]],
              width: 128, height: 128});

        Sprites.add('rock', {url: '/images/asteroid.png', frames: 60,
              framepos: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
                         [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
                         [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2],
                         [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
                         [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4],
                         [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5],
                         [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6],
                         [0, 7], [1, 7], [2, 7], [3, 7]],
              width: 128, height: 128});

        Sprites.add('boom', {url: '/images/explosion.png', frames: 59,
              framepos: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
                         [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
                         [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2],
                         [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
                         [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4],
                         [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5],
                         [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6],
                         [0, 7], [1, 7], [2, 7]],
              width: 256, height: 256});
        Sprites.add('powerup', {url: '/images/powerup.png', frames: 40,
              framepos: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
                         [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
                         [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2],
                         [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3],
                         [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4]],
              width: 64, height: 64});
      } else {
        Sprites.add('ship0', {url: '/images/ship/Test_Ship_Thrust_Frame1_128_00018.png', frames: 2,
              framepos: [[0, 0]],
              width: 128, height: 128});
        Sprites.add('ship1', {url: '/images/ship/Test_Ship_Thrust_Frame2_128_00018.png', frames: 2,
              framepos: [[0, 0]],
              width: 128, height: 128});

        for (var i=0;i<60;i++) {
          Sprites.add('rock'+i, {url: '/images/asteroid/Test_Asteroid_128_000'+(i<10?'0'+i:i)+'.png', frames: 60,
                framepos: [[0, 0]],
                width: 128, height: 128});
        }

        // FIXMECORY - this should be a magical loader thingy
        for (var i=6;i<59;i++) {
          var s = i-6;
          Sprites.add('boom'+s, {url: '/images/explosion/Test_Explosion_0000'+(i<10?'0'+i:i)+'.png', frames: 53,
                framepos: [[0, 0]],
                width: 256, height: 256});
        }

        for (var i=0;i<40;i++) {
          Sprites.add('powerup'+i, {url: '/images/powerup/Test_Powerup_Star_64_0000'+(i<10?'0'+i:i)+'.png', frames: 40,
                framepos: [[0, 0]],
                width: 64, height: 64});
        }
      }
    }

    function ship_by2() {
      SpriteLoad.rock();
      SpriteLoad.boom();
      SpriteLoad.powerup();
      Sprites.add('ship0', {url: '/images/ship/Test_Ship_Thrust_Frame1_64_00018.png', frames: 2,
            framepos: [[0, 0]],
            width: 64, height: 64});
      Sprites.add('ship1', {url: '/images/ship/Test_Ship_Thrust_Frame2_64_00018.png', frames: 2,
            framepos: [[0, 0]],
            width: 64, height: 64});
    }

    var sprites = {aa: {sp: ship, inc: incShip, num: 20},
                   aahalf: {sp: ship_by2, inc: incShip, num: 1},
                   igob: {sp: iship, inc: incIShip, dec: idec, num: 10, nodel:true},
                   ninja: {sp: ninjas, inc: incNinja, num: 15},
                   ninjarot: {sp: ninjas, inc: incNinjaRot, num: 5},
                   rot: {sp: ship, inc: incShipRot, num: 5}};

    function scrollBackground() {
      Sprites.add('world', {url: '/images/stars.png', frames: 1,
            framepos: [[0, 0]],
            width: 512, height: 511});

      World.initScrollable({scrollx:-10,eachx: 512, eachy: 511,
            tilelist: ['world']});
    }

    function worldBackground() {
      Sprites.add('world', {url: '/images/stars.jpg', frames: 1,
            framepos: [[0, 0]],
            width: 512, height: 511});

      World.initScrollable({eachx: 512, eachy: 511,
            tilelist: ['world']});
    }

    function ninjaBackground() {
      Sprites.add('ninja', {url: '/images/Background_01_1024_0000.png', frames: 1,
            framepos: [[0, 0]],
            width: 1024, height: 768});

      World.add('ninja', 'ninja', [0.5 * Browser.w, 0.5 * Browser.h]);
    }

    function noBackground() {
    }

    var background_loaders = {world: worldBackground, scroll: scrollBackground, none: noBackground, ninja: ninjaBackground, none:noBackground};

    var tests = [];
    PerfTest.pushTest = function(test) {
      tests.push(test);
    }

    var stops = [];
    PerfTest.pushStop = function(stop) {
      stops.push(stop);
    }

    var viewports = {fluid: 1, fluid_width: 1, normal: 1, tiny: 1};


    function addTest(test) {
      tests.push(function() {
          Gob.delAll();
          World.reset();
          if (test.settings.multi) {
            Sprites.deleteAll();
          }

          var tid = {};
          tid.browser = Browser.browser;
          tid.viewport = test.viewport;
          tid.render_path = '';
          tid.test = test;
          for (var id in test.settings) {
            if (id == 'render_mode') {
              tid.render_mode = test.settings[id];
            } else {
              tid.render_path += id + ':' + test.settings[id] + ' ';
            }
          }

          GameFrame.updateSettings(test.settings, true);
          GameFrame.setXbyY(test.viewport);

          if (test.background) {
            background_loaders[test.background]();
            tid.background = test.background;
          }

          var tmp_inc = sprites[test.sprites].inc;
          var tmp_dec = sprites[test.sprites].dec ? sprites[test.sprites].dec : dec;

          if (test.settings.multi) {
            multiSprites = test.settings.multi;
            if (test.sprites == 'aa')
              shipMulti();
            else
              shipMultiSmall();
            tmp_inc = incShipMulti;
            num = 1;
          } else {
            sprites[test.sprites].sp();
          }
          tid.sprites = test.sprites;

          var num = sprites[test.sprites].num;
          if (test.settings.render_mode == GameFrame.WEBGL && test.sprites == 'rot') {
            num *= 5;
          }

          Benchmark.setup({inc: tmp_inc,
                dec: tmp_dec,
                tfps: test.tfps,
                num: num,
                w: Browser.w,
                h: Browser.h,
                tid: tid,
                nodel: sprites[test.sprites].nodel ? true : false,
                demo: test.demo});
          if (!test.hack) {
            UI.addButton('', 'stoptest', {pos: [5, 5], width: 100, height: 40, text: 'Stop Perf Test', command: {cmd: 'stopperftest', args: []}});
          }
        });
    }

    PerfTest.addTest = addTest;

    var current = 0;

    PerfTest.postToServer = function(score, testName) {
      if (in_speedtests) {
        console.log(testName);
        function make_st_name(t) {
          var name = "jsgamebench-";
          name += t.sprites + "-";

          var ts = t.settings;
          name += ts.render_mode + "-";

          name += ts.sprite_sheets ? "s" : "";
          name += ts.int_snap ? "i" : "";
          name += ts.webgl_blended_canvas ? "b" : "";
          name += ts.canvas_background ? "c" : "";
          name += ts.css_transitions ? "t" : "";
          name += ts.css_keyframe ? "k" : "";
          name += ts.transform3d ? "3" : "";
          name += ts.update_existing ? "u" : "";
          name += ts.use_div_background ? "d" : "";
          name += ts.webgl_batch_sprites ? "." + ts.webgl_batch_sprites : "";
          name += ts.multi ? ".m" + ts.multi : "";
          

          return name;
        }

        var data = testName[0];

        var targets = ["canvas", "html", "webgl"];
        for (var i = 0; i < targets.length; ++i) {
          var target = targets[i];
          for (var sp in data.details[target]) {
            var res = data.details[target][sp];
            for (var ti = 0; ti < res.length; ++ti) {
              var t = data.details[target][sp][ti];
              console.log("result", make_st_name(t.test), t.score);
              SpeedTests.recordSubResult(make_st_name(t.test), t.score);
            }
          }
        }
        SpeedTests.finish();
      } else {
        var req = new XMLHttpRequest();
        req.open('POST', 'benchmark_results', false);
        var result={};
        result.score=score;
        result.testName=testName;
        req.send(JSON.stringify(result));
      }
    };

    PerfTest.init = function() {
      UI.del('buttons');
      UI.del('perf');
      Benchmark.reset();
      tests = [];
      current = 0;
      var spar = {'aa':1, 'rot':1};
      var vp = 'normal';
      var bg = 'world';
      var snap = true;
      var target_fps = 60;

      // we should add these back at some point, but we don't care for now
      var has3d = has_3d_transforms();
      var hastransitions = has_css_transitions();

      // for both 'rot' and 'aa' sprite types
      for (var sp in spar) {
        // basic HTML stuff; loop twice, once without 3d transforms and once with
        for (var t3 = 0; t3 < (has3d ? 2 : 1); t3++) {
          // basic HTML test
          addTest({viewport: vp, settings: {render_mode: GameFrame.HTML_ONLY, update_existing: true, use_div_background: true, css_transitions: false, sprite_sheets: false, css_keyframe: false, int_snap: snap, transform3d: t3 ? true : false}, tfps: target_fps, background: bg, sprites: sp });

          if (hastransitions) {
            // once with just sprite_sheets = false, css_keyframe = false
            addTest({viewport: vp, settings: {render_mode: GameFrame.HTML_ONLY, update_existing: true, use_div_background: true, css_transitions: true, sprite_sheets: false, css_keyframe: false, int_snap: snap, transform3d: t3 ? true : false}, tfps: target_fps, background: bg, sprites: sp });

            // and once with sprite_sheets = true, css_keyframe = true
            addTest({viewport: vp, settings: {render_mode: GameFrame.HTML_ONLY, update_existing: true, use_div_background: true,  css_transitions: true, sprite_sheets: true, css_keyframe: true, int_snap: snap, transform3d: t3 ? true : false}, tfps: target_fps, background: bg, sprites: sp });
          }
        }

        // canvas 2d
        if (!!document.createElement('canvas').getContext) {
          addTest({viewport: vp, settings: {render_mode: GameFrame.CANVAS_ONLY, canvas_background: false, sprite_sheets: false, int_snap: snap}, tfps: target_fps, background: bg, sprites: sp });
          addTest({viewport: vp, settings: {render_mode: GameFrame.CANVAS_ONLY, canvas_background: true, sprite_sheets: false, int_snap: snap}, tfps: target_fps, background: bg, sprites: sp });
        }

        // webgl
        if (WebGLUtil.isSupported()) {
          addTest({viewport: vp, settings: {render_mode: GameFrame.WEBGL, webgl_blended_canvas: false, webgl_batch_sprites: 0, sprite_sheets: false, int_snap: false}, tfps: target_fps, background: bg, sprites: sp });
          addTest({viewport: vp, settings: {render_mode: GameFrame.WEBGL, webgl_blended_canvas: false, webgl_batch_sprites: 0, sprite_sheets: true, int_snap: false}, tfps: target_fps, background: bg, sprites: sp });
          addTest({viewport: vp, settings: {render_mode: GameFrame.WEBGL, webgl_blended_canvas: false, webgl_batch_sprites: 500, sprite_sheets: true, int_snap: false}, tfps: target_fps, background: bg, sprites: sp });
          addTest({viewport: vp, settings: {render_mode: GameFrame.WEBGL, webgl_blended_canvas: false, webgl_batch_sprites: 5000, sprite_sheets: true, int_snap: false}, tfps: target_fps, background: bg, sprites: sp });
        }
      }

      // sort the tests in a random order
      tests.sort(function(a,b) {return Math.random()-0.5;});
    }

    PerfTest.done = function(tid, count) {
      FBmark.addScore(tid, count);
      current++;
      PerfTest.doAll();
    }

    PerfTest.stop = function() {
      Gob.delAll();
      IGob.delAll();
      World.reset();
      Sprites.deleteAll();
      Benchmark.reset();
      tests = [];
      current = 0;
      for (var i = 0; i < stops.length; i++) {
        stops[i]();
      }
      stops = [];
      Init.reset();
    }

    PerfTest.doAll = function() {
      console.log("doAll", current, tests.length);
      if (current < tests.length) {
        tests[current]();
      } else {
        var result = FBmark.peak();
        Perf.myscore = parseInt(result.score);
        var temp = {};
        temp.details = result;
        temp.browser = Browser.browser_version;
        temp.peak = result.score;
        FBmark.reset();
        PerfTest.stop();
        PerfTest.postToServer(result.score, [temp]);
        ClientCmd.perfdisplay([temp]);
      }
    }

    return PerfTest;
  })();

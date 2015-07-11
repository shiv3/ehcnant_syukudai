enchant();
Bullets = [];
window.onload = function() {
  game = new Game(480, 260);
  game.fps = 30;
  game.rootScene.backgroundColor = "#fff";
  game.preload(
    'http://enchantjs.com/assets/images/map2.gif',
    'http://enchantjs.com/assets/images/chara1.gif');
  isconn = false;


  game.onload = function() {
    var kuma = new Sprite(32, 32); // ...(1)
    kuma.image = game.assets['http://enchantjs.com/assets/images/chara1.gif']; // ...(2)
    kuma.x = 100;
    kuma.y = 120;
    game.rootScene.addChild(kuma);
    game.rootScene.backgroundColor = '#7ecef4';

    game.addEventListener('enterframe', function() {
      if (game.input.up) {
        if (0 < kuma.y - 5) {
          kuma.y -= 5;
          rpc("move", "up");
        }
      }
      if (game.input.down) {
        if (game.height > kuma.y) {
          kuma.y += 5;
          rpc("move", "down");
        }

      }
      if (game.input.right) {
        kuma.x += 5;
        rpc("move", "right");
      }
      if (game.input.left) {
        kuma.x -= 5;
        rpc("move", "left");
      }
      if (game.input.space) {
        console.log("space")
        if (game.frame % 2 == 0) {
          fire(kuma)
          rpc("fire", "bullet")
        }
      }
    });
    game.keybind(32, "space");


    function rpc(type, ax) {
      if (isconn) {
        if (type == "move") {
          if (ax == "up") {
            conn.send({
              "type": "move",
              "ax": "up"
            });
          }
          if (ax == "down") {
            conn.send({
              "type": "move",
              "ax": "down"
            });
          }
          if (ax == "right") {
            conn.send({
              "type": "move",
              "ax": "right"
            });
          }
          if (ax == "left") {
            conn.send({
              "type": "move",
              "ax": "left"
            });
          }
        }
        if(type=="fire"){
          if(ax=="bullet"){
            conn.send({
              "type":"fire",
              "ax":"bullet"
            });
          }
        }
      }
    }

    function toge() {
      conn.send({
        "type": "together",
        "x": kuma.x,
        "y": kuma.y
      });
    }
    peer.on('connection', function(conn) {
      conn.on('data', function(data) {
        // Will print 'hi!'
        if (data.type == "connect" || data.type == "receive") {
          JoinGame();
          toge()
          isconn = true;
        }
        if (data.type == "together") {
          kuma2.x = data.x;
          kuma2.y = data.y;
        }

        if (data.type == "move") {
          if (data.ax == "down") {
            kuma2.y += 5;
          }
          if (data.ax == "up") {
            kuma2.y -= 5;
          }
          if (data.ax == "right") {
            kuma2.x += 5;
          }
          if (data.ax == "left") {
            kuma2.x -= 5;
          }
        }
        if(data.type=="fire"){
          if(data.ax=="bullet"){
            fire(kuma2);
          }
        }
      });
    });

    function JoinGame() {
      console.log("join!");
      kuma2 = new Sprite(32, 32);
      kuma2.image = game.assets['http://enchantjs.com/assets/images/chara1.gif'];
      kuma2.x = 100;
      kuma2.y = 120;
      game.rootScene.addChild(kuma2);
      game.rootScene.backgroundColor = '#7ecef4';
    }

    function fire(k) {
      Bullets.push(new Bullet(k.x, k.y));
      console.log("fire");
    }
    game.addEventListener('enterframe', function() {
      Bullets.forEach(function(b) {
        b.x += 8;
      });
    })
  }
  game.start();



  var Bullet = Class.create(Sprite, {
    initialize: function(x, y) {
      Sprite.call(this, 16, 16);
      this.image = game.assets['http://enchantjs.com/assets/images/map2.gif'];
      this.x = x + 10;
      this.y = y + 10;
      this.frame = 11;
      this.scale(0.3, 0.3);
      game.rootScene.addChild(this);
    }
  });
}

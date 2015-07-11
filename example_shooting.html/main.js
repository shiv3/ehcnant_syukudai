enchant();
window.onload = function() {
  game = new Game(1020, 320);
  game.fps = 30;
  game.rootScene.backgroundColor = "#fff";
  game.preload('chara1.gif');
  game.preload(
    'http://enchantjs.com/assets/images/map2.gif',
    'http://enchantjs.com/assets/images/chara1.gif');
  PlayerBullets = [];
  EnemyBullets = [];
  Enemys = [];
  game.onload = function() {
    var chara1 = new Player(game.rootScene.width / 2, 32, true);
    // chara2 = new Player(game.rootScene.width - 32, 96, false);

    // enemy1 = new Enemy(game.rootScene.width - 22, 96, false);
    var EnemyGroup = new Group();
    // EnemyGroup.addChild(enemy1);
    game.rootScene.addChild(EnemyGroup);

    EnemyGroup.addEventListener('enterframe', function() {
      this.childNodes.forEach(function(b) {
        b.x -= 1;
        if(game.frame%30==0){
          b.fire();
        }
        if(b.hp<=0){
            EnemyGroup.removeChild(b);
            console.log("dy")
        }
      });
    });

    Bullet.intersect(Enemy).forEach(function(pair){
    //pair[0]: Class1のインスタンス
    //pair[1]: Class2のインスタンス
      scene.removeChild(pair[0]);
      scene.removeChild(pair[1]);
    });

    var player = new Sprite(10, 10);
    var surf = new Surface(100, 100);
    surf.context.beginPath();
    surf.context.fillStyle = 'rgba(252, 0, 0, 0.8)';
    surf.context.fillRect(0, 0, 100, 100);
    player.image = surf
    game.rootScene.addChild(player);

    sp = new Supporter(game.rootScene.width / 2, 32, true);
    game.rootScene.addChild(sp);

    sp.addEventListener('enterframe',function(){
      sp.x = chara1.x + Math.sin(game.frame/10)*20;
      sp.y = chara1.y + Math.cos(game.frame/10)*20;

      if (game.input.space) {
        if(game.frame%2==0){
          sp.fire();
        }

      }
    });

    label = new Label();
    label.font = '24px helvetica';
    label._style.color = '#000000';
    game.rootScene.addChild(label);

    chara1.addEventListener('enterframe',function(){
      label.text = chara1.hp;
      if(this.hp<=0){
        chara1.backgroundColor = 'red';
        label.text = "死";
      }
    });
    game.rootScene.addEventListener('enterframe', function() {
      if(Math.floor(Math.random()*30)==0){
        var Enem = new Enemy(game.rootScene.width - 22,Math.floor(Math.random()*1000), false);
        Enemys.push(Enem);
        EnemyGroup.addChild(Enem);
      }
      if (game.input.up) {
        if(0<chara1.y-5){
          chara1.y-=5;
        }

      }
      if (game.input.down) {
        if(game.height>chara1.y){
          chara1.y+=5;
        }

      }
      if (game.input.right) {
        chara1.x+=5;
      }
      if (game.input.left) {
        chara1.x-=5;
      }
      if (game.input.space) {
        if(game.frame%2==0){
          chara1.fire()
        }
      }
      PlayerBullets.forEach(function(b) {
        b.x += 8;
        if(b.x>game.width+100){
          game.rootScene.removeChild(b);
          PlayerBullets.shift();
        }
        for(var en=0;en<Enemys.length;en++){
          e = Enemys[en];
          if(b.intersect(e)){
            e.backgroundColor = 'red';
            e.hp -= 1;
            game.rootScene.removeChild(b);
            // PlayerBullets.splice(b-1,1);
            // Enemys.splice(en,1);
          }
        }
      });

      for(var t = 0;t<EnemyBullets.length;t++){
        b = EnemyBullets[t];
        b.x -= 2;
        if(b.x<0){
          game.rootScene.removeChild(b);
          EnemyBullets.splice(t, 1);
        }
        if(b.intersect(chara1)){
          chara1.hp -= 10;
          game.rootScene.removeChild(b);
        }
      }
      for(var ene=0;ene<Enemys.length;ene++){
        var eem = Enemys[ene];
        if(eem.x<0){
          game.rootScene.removeChild(eem);
          Enemys.splice(ene, 1);
        }
      }
    });
    game.keybind('Z'.charCodeAt(0), 'a');
    game.addEventListener('abuttondown', function() {
      chara1.superfire();
    });
    game.keybind(32, "space");
    game.addEventListener('spacebuttondown', function() {
      // chara1.fire()
    });

  };
  game.start();

  var Bullet = Class.create(Sprite, {
    initialize: function(x, y, forward) {
      Sprite.call(this, 16, 16);
      this.image = game.assets['http://enchantjs.com/assets/images/map2.gif'];
      this.x = x;
      this.y = y;
      this.frame = 11;
      this.scale(0.3, 0.3);
      // 前へ進む場合はtrue、下がる場合はfalse、自分で追加したプロパティ
      this.forward = forward;
      game.rootScene.addChild(this);
    }
  });


  var SuperBullet = Class.create(Bullet, {
    initialize: function(x, y, forward) {
      Bullet.call(this);
      this.x = x;
      this.y = y;
      this.scale(10, 10);
      game.rootScene.addChild(this);
    }
  });
  // クラスの作成
  var Player = Class.create(Sprite, {
    initialize: function(x, y, forward) {
      Sprite.call(this, 32, 32);
      this.hp = 3000;
      this.image = game.assets['chara1.gif'];
      this.scale(0.5, 0.5);
      this.x = x;
      this.y = y;
      this.frame = 0;
      // 前へ進む場合はtrue、下がる場合はfalse、自分で追加したプロパティ
      this.forward = forward;
      game.rootScene.addChild(this);
    },
    fire: function() {
      PlayerBullets.push(new Bullet(this.x + 10, this.y, false));
      // a = new Bullet(this.x + 10, this.y, false);
      // PlayerBulletsGroup.addChild(a);
    },
    superfire: function() {
      PlayerBullets.push(new SuperBullet(this.x + 10, this.y, true));
    }
  });
  var Supporter = Class.create(Player,{
    initialize:function(x,y,forward){
      Player.call(this);
    }
  });

  var Enemy = Class.create(Sprite, {
    initialize: function(x, y, forward) {
      Sprite.call(this, 32, 32);
      this.hp = 100;
      this.image = game.assets['chara1.gif'];
      this.x = x;
      this.y = y;
      this.frame = 0;
      // 前へ進む場合はtrue、下がる場合はfalse、自分で追加したプロパティ
      this.forward = forward;
      game.rootScene.addChild(this);
    },
    fire: function() {

      EnemyBullets.push(new Bullet(this.x, this.y, false));
    }
  });
}

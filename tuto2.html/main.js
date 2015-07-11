enchant();
var game;
window.onload = function() {
  game = new Game(480, 260);
  game.fps = 30;
  game.rootScene.backgroundColor = "#fff";
  game.preload(
    'http://enchantjs.com/assets/images/map2.gif',
    'http://enchantjs.com/assets/images/chara1.gif');
  isconn = false;
  KumaArr = []
  game.onload = function() {
    game.rootScene.backgroundColor = '#7ecef4';
    var kuma = new Kuma(32, 32); // ...(1)

    game.addEventListener('enterframe',function(){
      if(game.input.right){
        kuma.right();
        KumaArr.forEach(function(k){
          k.right();
        });
      }

      if(game.frame%Math.round(Math.random()*40)==0){
        KumaArr.push(new Kuma(Math.round(Math.random()*480),Math.round(Math.random()*260)));
      }
    });
  };
  game.start();

  var Kuma = Class.create(Sprite, {
    initialize: function(x, y) {
      Sprite.call(this, 32, 32);
      this.image = game.assets['http://enchantjs.com/assets/images/chara1.gif'];
      this.scale(1,1);
      this.x = x;
      this.y = y;
      this.frame = 0;
      game.rootScene.addChild(this);
    },
    right: function() {
      this.x += 2;
    }
  });
};

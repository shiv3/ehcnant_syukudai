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
  game.onload = function() {
    game.rootScene.backgroundColor = '#7ecef4';
    var kuma = new Kuma(32, 32); // ...(1)

    var KumaGroup = new Group();
    ShirokumaGroup = new Group();

    game.addEventListener('enterframe',function(){

      if(game.frame%Math.round(Math.random()*20)==0){
        k = new Kuma(Math.round(Math.random()*480),Math.round(Math.random()*260));
        KumaGroup.addChild(k);
      }
      if(game.frame%Math.round(Math.random()*20)==0){
        k = new Shirokuma(Math.round(Math.random()*480),Math.round(Math.random()*260));
        ShirokumaGroup.addChild(k);
      }

      ShirokumaGroup.childNodes.forEach(function(s){
        KumaGroup.childNodes.forEach(function(k){
          if(s.intersect(k)){
            ShirokumaGroup.removeChild(s);
            KumaGroup.removeChild(k);
          }
        });
      });

    });

    KumaGroup.addEventListener('enterframe',function(){
      if(game.input.right){
          KumaGroup.x += 2;
      }
    });
    ShirokumaGroup.addEventListener('enterframe',function(){
      if(game.input.right){
        ShirokumaGroup.x += 4;
      }
    });
    game.rootScene.addChild(KumaGroup);
    game.rootScene.addChild(ShirokumaGroup);

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
      this.backgroundColor = 'red';
    },
    right: function() {
      this.x += 2;
    }
  });
  var Shirokuma = Class.create(Kuma,{
    initialize:function(x,y){
      Kuma.call(this,x,y);
      this.name = "shirokuma";
      this.image = game.assets['http://enchantjs.com/assets/images/chara1.gif'];
      this.frame = 6;
      game.rootScene.addChild(this);
      this.backgroundColor = 'white';
    },
    dash:function(){
      this.x += 5;
    }
  });
};

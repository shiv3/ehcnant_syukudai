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
    var kuma = new Sprite(32, 32); // ...(1)
    kuma.image = game.assets['http://enchantjs.com/assets/images/chara1.gif']; // ...(2)
    kuma.x = 100;
    kuma.y = 120;
    game.rootScene.addChild(kuma);
    game.rootScene.backgroundColor = '#7ecef4';

    game.addEventListener('enterframe',function(){
      if(game.input.right){
        kuma.x += 2;
      }
    });

  };
  game.start();


};

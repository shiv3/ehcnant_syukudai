enchant();
var game;
window.onload = function() {
  game = new Game(1040, 640);
  game.onload = function() {
    scene = new Scene3D(); //3Dのシーンを作る
    obj = new Cube(); //立方体を作る
    obj.x = -1;
    // obj.y = 4;
    obj.z = 4;
    scene.addChild(obj); //3Dシーンに立方体を追加
    game.rootScene.addEventListener('touchstart', function(e) {
      obj.x = e.x/1040 -0.5;
      obj.y = -(e.y/640 -0.5);
    });
    game.addEventListener('enterframe', function() {
      obj.rotateYaw(0.1);
      obj.rotatePitch(0.1);
    });
  };
  game.start();


};

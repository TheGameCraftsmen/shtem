'use strict';
var shtem = shtem || {};

shtem.GameEngine = function (){
    this.centerX = 0;
    this.imgName = "";
    this.img = null;
    this.centerY = 0;
    this.tileSize = 32;
    this.moveX = 0;
    this.moveY = 0;
    this.ennemies = [];
    this.explosions = [];
}

shtem.GameEngine.prototype ={
    gameLoop: function (){
      shtem.canvas.clearCanvas();
      shtem.gameEngine.render();  
      var arrayShipToRemove = [];
      shtem.gameEngine.ennemies.forEach(function (ennemy){
          ennemy.loop();
          if (ennemy.state === shtem.C.ITEM_STATE_DESTROYED){
              arrayShipToRemove.push(ennemy);
          }else{
            ennemy.render();
          }
      })
      removeItemArrayFromArray(arrayShipToRemove,shtem.gameEngine.ennemies);
      shtem.player.loop();
      
      shtem.player.render();
      var expToRemove = [];
      shtem.gameEngine.explosions.forEach(function(exp){
          exp.loop();
          exp.render();
          if (exp.state === shtem.C.ITEM_STATE_DESTROYED){
              expToRemove.push(exp);
          }
      })
      removeItemArrayFromArray(expToRemove,shtem.gameEngine.explosions);

    },

    render : function(){
        var ctx = shtem.canvas.canvasTile.getContext("2d");
        ctx.drawImage(
            this.img,
            0,
            0,
            2048,
            2048,
            0 - shtem.player.x,
            0 - shtem.player.y,
            2048,
            2048);
    },

    mouseMoveEvent: function(evt){
        var bounds = shtem.canvas.canvasMouse.getBoundingClientRect(); 
        shtem.gameEngine.mouseX = evt.pageX - bounds.left;
        shtem.gameEngine.mouseY = evt.pageY - bounds.top;
    },

    clickEvent : function(evt){
        shtem.player.fire();
    },

    init : function(){
        this.centerX = window.innerWidth / 2 -  this.tileSize / 2 ;
        this.centerY = window.innerHeight / 2 - this.tileSize / 2 - 70;
        shtem.canvas = new shtem.Canvas();
        shtem.canvas.init();
        shtem.canvas.setCanvasSize(window.innerWidth,window.innerHeight);
        shtem.tileset = new shtem.Tileset();
        shtem.player = new shtem.Player ();
        shtem.player.init();
        
        let tempEnnemy = new shtem.Ennemy();
        tempEnnemy.init();
        this.ennemies.push(tempEnnemy);
        
        this.imgName = "assets/images/background/other_back6.png";
        this.img = shtem.tileset.get(this.imgName);

        shtem.canvas.canvasMouse.addEventListener("click",shtem.gameEngine.clickEvent);
        shtem.canvas.canvasMouse.addEventListener("mousemove",shtem.gameEngine.mouseMoveEvent);
    },
}

shtem.gameEngine = new shtem.GameEngine();
shtem.gameEngine.init();

setInterval(shtem.gameEngine.gameLoop,1000/60)
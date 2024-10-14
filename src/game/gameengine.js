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
    this.bonus = [];
    this.meteors = [];
}

shtem.GameEngine.prototype ={
    gameLoop: function (){
      shtem.canvas.clearCanvas();
      shtem.gameEngine.render();  
      let arrayShipToRemove = [];
      shtem.gameEngine.ennemies.forEach(function (ennemy){
          ennemy.loop();
          if (ennemy.state === shtem.C.ITEM_STATE_DESTROYED){
              arrayShipToRemove.push(ennemy);
              let bonus = ennemy.getBonus();
              if (bonus !== null){
                  shtem.gameEngine.bonus.push(bonus);
              }
          }else{
            ennemy.render();
          }
      })

      removeItemArrayFromArray(arrayShipToRemove,shtem.gameEngine.ennemies);
      shtem.player.loop();
      
      shtem.player.render();

      shtem.gameEngine.meteors.forEach(function(meteor){
        meteor.render();
      })

      let bonusToRemove = [];
      shtem.gameEngine.bonus.forEach(function(bonus){
          bonus.loop();
          bonus.render();
          if (bonus.state === shtem.C.ITEM_STATE_DESTROYED){
              bonusToRemove.push(bonus);
          }
      })
      removeItemArrayFromArray(bonusToRemove,shtem.gameEngine.bonus);

      let expToRemove = [];
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
        let ctx = shtem.canvas.canvasTile.getContext("2d");
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
        let bounds = shtem.canvas.canvasMouse.getBoundingClientRect(); 
        shtem.gameEngine.mouseX = evt.pageX - bounds.left;
        shtem.gameEngine.mouseY = evt.pageY - bounds.top;
    },

    clickEvent : function(evt){
        shtem.player.fire();
    },

    mouseWheel : function(evt){
        shtem.player.speedChange(evt.deltaY);
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
        let tempMeteor = new shtem.Meteor();
        tempMeteor.init(shtem.C.METEOR_1);
        this.meteors.push(tempMeteor);
        
        let tempEnnemy = new shtem.Ennemy();
        tempEnnemy.init(shtem.C.ENNEMY_TURREL_1);
        tempEnnemy.x = 800;
        // tempEnnemy.init(2);
        this.ennemies.push(tempEnnemy);
        
        this.imgName = "assets/images/background/other_back6.png";
        this.img = shtem.tileset.get(this.imgName);

        shtem.canvas.canvasMouse.addEventListener("click",shtem.gameEngine.clickEvent);
        shtem.canvas.canvasMouse.addEventListener("mousemove",shtem.gameEngine.mouseMoveEvent);
        shtem.canvas.canvasMouse.addEventListener("mousewheel",shtem.gameEngine.mouseWheel);
    },
}

shtem.gameEngine = new shtem.GameEngine();
shtem.gameEngine.init();

setInterval(shtem.gameEngine.gameLoop,1000/60)
'use strict';
var shtem = shtem || {};

shtem.GameEngine = function (){
    this.centerX = 0;
    this.centerY = 0;
}

shtem.GameEngine.prototype ={
    gameLoop: function (){
      shtem.canvas.clearCanvas();
      shtem.gameEngine.render();  
      shtem.player.render();
    },

    render : function(){

    },


    clickEvent : function(evt){

    },

    init : function(){
        this.centerX = window.innerWidth / 2 -  this.tileSize / 2 ;
        this.centerY = window.innerHeight / 2 - this.tileSize / 2 - 70;
        shtem.player = new shtem.Player ();
        shtem.canvas = new shtem.Canvas();
        shtem.canvas.init();
        shtem.canvas.setCanvasSize(window.innerWidth,window.innerHeight);
    },
    
    
}

shtem.gameEngine = new shtem.GameEngine();
shtem.gameEngine.init();

setInterval(shtem.gameEngine.gameLoop,1000/60)
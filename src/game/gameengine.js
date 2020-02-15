'use strict';
var shtem = shtem || {};

shtem.GameEngine = function (){
    this.centerX = 0;
    this.imgName = "";
    this.img = null;
    this.centerY = 0;
    this.tileSize = 32;
}

shtem.GameEngine.prototype ={
    gameLoop: function (){
      shtem.canvas.clearCanvas();
      shtem.gameEngine.render();  
      shtem.player.render();
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


    clickEvent : function(evt){

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
        
        this.imgName = "assets/images/background/other_back6.png";
        this.img = shtem.tileset.get(this.imgName);
    },
    
    
}

shtem.gameEngine = new shtem.GameEngine();
shtem.gameEngine.init();

setInterval(shtem.gameEngine.gameLoop,1000/60)
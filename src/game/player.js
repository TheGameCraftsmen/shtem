'use strict';
var shtem = shtem || {};

shtem.Player = function (){
    this.x = 1000;
    this.y = 1000;
    this.sprite = "";
    this.spriteset = null;
    this.angleDegrees = 0;
    this.angleRadian = 0;
    this.speed = 2;
}

shtem.Player.prototype ={
    init : function (){
        this.sprite = "assets/images/ships/mship1_32.png";
        
        this.spriteset = shtem.tileset.get(this.sprite);
    },

    move : function(){
        if(! isNaN(this.angleRadian)){
            this.x += Math.cos(Math.abs(this.angleRadian)) * this.speed;
            this.y -= Math.sin(this.angleRadian) * this.speed;
        }
    },    

    loop : function(){
        this.angleDegrees = ((Math.atan2(shtem.gameEngine.mouseY - shtem.gameEngine.centerY, shtem.gameEngine.mouseX - shtem.gameEngine.centerX) + Math.PI / 2 ) * -180/Math.PI + 90);
        this.angleRadian = this.angleDegrees * Math.PI / 180;
        this.move();
    },

    render : function(){
        var ctx = shtem.canvas.canvasTile.getContext("2d");
        ctx.setTransform(1, 0, 0, 1, shtem.gameEngine.centerX, shtem.gameEngine.centerY);
        ctx.rotate(Math.atan2(shtem.gameEngine.mouseY - shtem.gameEngine.centerY, shtem.gameEngine.mouseX - shtem.gameEngine.centerX) + Math.PI / 2); 
        
        
        ctx.drawImage(this.spriteset,-16, -16); 
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
};
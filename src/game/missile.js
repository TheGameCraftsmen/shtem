'use strict';
var shtem = shtem || {};

shtem.Missile = function (){
    this.x = 1000;
    this.y = 1000;
    this.sprite = "";
    this.spriteset = null;
    this.angleRotation = 0;
    this.angleDegrees = 0;
    this.angleRadian = 0;
    this.speed = 5;
}

shtem.Missile.prototype ={
    init : function (){
        this.sprite = "assets/images/ships/beam.png";
        //this.sprite = "assets/images/ships/mship1_32.png";
        this.tx = 41;
        this.ty = 57;
        this.sizeX = 12;
        this.sizeY = 28;
        this.x = shtem.player.x;
        this.y = shtem.player.y;
        this.spriteset = shtem.tileset.get(this.sprite);
        this.angleDegrees = shtem.player.angleDegrees;
        this.angleRotation = shtem.player.angleRotation;
        this.angleRadian = shtem.player.angleRadian;
    },

    move : function(){
        if(! isNaN(this.angleRadian)){
            this.x += Math.cos(Math.abs(this.angleRadian)) * this.speed;
            this.y -= Math.sin(this.angleRadian) * this.speed;
        }
    },    

    loop : function(){
        this.move();
    },

    render : function(){
        var ctx = shtem.canvas.canvasTile.getContext("2d");
        ctx.setTransform(1, 0, 0, 1, this.x - shtem.player.x + shtem.gameEngine.centerX, this.y - shtem.player.y + shtem.gameEngine.centerY);
        ctx.rotate(this.angleRotation); 
        ctx.drawImage(this.spriteset,-21,-37);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
};
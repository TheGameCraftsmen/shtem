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
    this.stepX = 0;
    this.stepY = 0;
}

shtem.Missile.prototype ={
    init : function (src){
        this.sprite = "assets/images/ships/beams.png";
        this.tx = 41;
        this.ty = 57;
        this.sizeX = 12;
        this.sizeY = 28;
        this.x = src.x;
        this.y = src.y;
        this.spriteset = shtem.tileset.get(this.sprite);
        this.angleDegrees = src.angleDegrees;
        this.angleRotation = src.angleRotation;
        this.angleRadian = src.angleRadian;
        this.stepX = Math.cos(Math.abs(this.angleRadian)) * this.speed;
        this.stepY = -Math.sin(this.angleRadian) * this.speed;
    },

    move : function(){
        if(! isNaN(this.angleRadian)){
            this.x += this.stepX;
            this.y += this.stepY;
        }
    },    

    loop : function(){
        this.move();
    },

    render : function(){
        var ctx = shtem.canvas.canvasTile.getContext("2d");
        ctx.setTransform(1, 0, 0, 1, this.x - shtem.player.x + shtem.gameEngine.centerX, this.y - shtem.player.y + shtem.gameEngine.centerY);
        ctx.rotate(this.angleRotation); 
        ctx.drawImage(
            this.spriteset,
            9,
            40,
            11,
            18,
            -6,
            -9,
            11,
            18);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
};
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
    this.speed = 0;
    this.stepX = 0;
    this.stepY = 0;
    this.lifetime = 0;
    this.startlife = 0;
    this.state = shtem.C.ITEM_STATE_ALIVE;
    this.damage = 0;
    this.idTemplate = 0;
    this.rythm = 0;
    this.number = 0;
}

shtem.Missile.prototype ={
    loadFromTemplate : function(){
        var src = shtem.weapons[this.idTemplate];
        this.sizeX = src.size.x;
        this.sizeY = src.size.y;
        this.speed = src.speed;
        this.sprite = src.sprite;
        this.damage = src.damage;
        this.lifetime = src.lifetime;
        this.rythm = src.rythm;
        this.tx = src.position.x;
        this.ty = src.position.y;
        this.number = src.number;
        this.upgrade = src.upgrade;
    },

    init : function (templateId, src){
        this.idTemplate = templateId;
        this.loadFromTemplate();
        this.x = src.x;
        this.y = src.y;
        this.spriteset = shtem.tileset.get(this.sprite);
        this.angleDegrees = src.angleDegrees;
        this.angleRotation = src.angleRotation;
        this.angleRadian = src.angleRadian;
        this.stepX = Math.cos(Math.abs(this.angleRadian)) * this.speed;
        this.stepY = -Math.sin(this.angleRadian) * this.speed;
        let d = new Date();
        this.startlife = d.getTime();
    },

    move : function(){
        if(! isNaN(this.angleRadian)){
            this.x += this.stepX;
            this.y += this.stepY;
        }
    },    

    loop : function(){
        if (this.state === shtem.C.ITEM_STATE_ALIVE){
            let d = new Date();
            let tick = d.getTime();
            if (tick - this.startlife > this.lifetime){
                this.state = shtem.C.ITEM_STATE_DESTROYED;
            }else{
                this.move();
            }
        }
    },

    render : function(){
        if (this.state === shtem.C.ITEM_STATE_ALIVE){
            var ctx = shtem.canvas.canvasCreature.getContext("2d");
            ctx.setTransform(1, 0, 0, 1, this.x - shtem.player.x + shtem.gameEngine.centerX, this.y - shtem.player.y + shtem.gameEngine.centerY);
            ctx.rotate(this.angleRotation); 
            ctx.drawImage(
                this.spriteset,
                this.tx,
                this.ty,
                this.sizeX,
                this.sizeY,
                -6,
                -9,
                this.sizeX,
                this.sizeY);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
};
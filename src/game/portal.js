'use strict';
var shtem = shtem || {};

shtem.Portal = function (){
    this.x = 1000;
    this.y = 1200;
    this.spriteX = 0;
    this.spriteY = 0;
    this.sizeX = 0;
    this.sizeY = 0;
    this.sprite = "";
    this.spriteset = null;
    this.speed = 0;
    this.idTemplate = 1;
    this.animation = 0;
    this.actualAnimation = 0;
    this.animationTick = 0;

}

shtem.Portal.prototype ={
    loadFromTemplate : function(){
        let src = shtem.portal[this.idTemplate];
        this.sprite = src.sprite;
        this.sizeX = src.size.x;
        this.sizeY = src.size.y;
        this.spriteX = src.position.x;
        this.spriteY = src.position.y;
        this.animation = src.animation;
    },

    init : function (templateId){
        this.idTemplate = templateId;
        this.loadFromTemplate();
        this.spriteset = shtem.tileset.get(this.sprite);

    },

    renderAnimation : function(){
        let d = new Date();
        let newTick = d.getTime();
        if ((newTick - this.animationTick) > 100 ){
            this.actualAnimation += 1;
            if (this.actualAnimation == this.animation){
                this.actualAnimation = 0;
            }
            this.animationTick = newTick;
        }
    },

    render : function(){
        let ctx = shtem.canvas.canvasCreature.getContext("2d");
        this.renderAnimation();
        ctx.setTransform(1, 0, 0, 1, this.x - shtem.player.x + shtem.gameEngine.centerX, this.y - shtem.player.y + shtem.gameEngine.centerY);
        ctx.drawImage(
            this.spriteset,
            this.spriteX + this.sizeX*this.actualAnimation,
            this.spriteY,
            this.sizeX,
            this.sizeY,
            -16,
            -16,
            128,
            128);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
};
'use strict';
var shtem = shtem || {};

shtem.Meteor = function (){
    this.x = 1000;
    this.y = 1000;
    this.sizeX = 0;
    this.sizeY = 0;
    this.sprite = "";
    this.spriteset = null;
    this.speed = 0;
    this.idTemplate = 1;

}

shtem.Meteor.prototype ={
    loadFromTemplate : function(){
        let src = shtem.meteor[this.idTemplate];
        this.sprite = src.sprite;
        this.sizeX = src.size.x;
        this.sizeY = src.size.y;
    },

    init : function (templateId){
        this.idTemplate = templateId;
        this.loadFromTemplate();
        this.spriteset = shtem.tileset.get(this.sprite);

    },

    render : function(){
        let ctx = shtem.canvas.canvasCreature.getContext("2d");
        ctx.setTransform(1, 0, 0, 1, this.x - shtem.player.x + shtem.gameEngine.centerX, this.y - shtem.player.y + shtem.gameEngine.centerY);
        ctx.drawImage(
            this.spriteset,
            0,
            0,
            this.sizeX,
            this.sizeY,
            -16,
            -16,
            32,
            32);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
};
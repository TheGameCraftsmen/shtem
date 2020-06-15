'use strict';
var shtem = shtem || {};

shtem.Bonus = function (){
    this.x = 1000;
    this.y = 1000;
    this.sprite = "";
    this.spriteset = null;
    this.tx = 0;
    this.ty = 0;
    this.sizeX = 0;
    this.sizeY = 0;
    this.state = shtem.C.ITEM_STATE_ALIVE;
}

shtem.Bonus.prototype ={
    loadFromTemplate : function(){
        var src = shtem.bonus[this.idTemplate];
        this.sprite = src.sprite;
        this.sizeX = src.size.x;
        this.sizeY = src.size.y;
        this.tx = src.position.x;
        this.ty = src.position.y;
    },

    init : function (templateId, x, y){
        this.idTemplate = templateId;
        this.loadFromTemplate();
        this.x = x;
        this.y = y;
        this.spriteset = shtem.tileset.get(this.sprite);
    },

    loop : function(){
        if (this.state === shtem.C.ITEM_STATE_ALIVE){
        }
    },

    render : function(){
        if (this.state === shtem.C.ITEM_STATE_ALIVE){
            var ctx = shtem.canvas.canvasCreature.getContext("2d");
            ctx.setTransform(1, 0, 0, 1, this.x - shtem.player.x + shtem.gameEngine.centerX, this.y - shtem.player.y + shtem.gameEngine.centerY);
            ctx.drawImage(
                this.spriteset,
                this.tx,
                this.ty,
                this.sizeX,
                this.sizeY,
                -16,
                -16,
                32,
                32);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
};
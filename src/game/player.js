'use strict';
var shtem = shtem || {};

shtem.Player = function (){
    this.x = 1000;
    this.y = 1000;
    this.sprite = "";
    this.spriteset = null;
    this.angle = 0;
}

shtem.Player.prototype ={
    init : function (){
        this.sprite = "assets/images/ships/mship1_32.png";
        this.spriteset = shtem.tileset.get(this.sprite);
    },

    render : function(){
        var ctx = shtem.canvas.canvasTile.getContext("2d");
        ctx.drawImage(
           this.spriteset,
           0,
           0,
           32,
           32,
           shtem.gameEngine.centerX,
           shtem.gameEngine.centerY,
           32,
           32);
    }
};
'use strict';
var shtem = shtem || {};

shtem.Explosion = function (){
    this.x = 0;
    this.y = 0;
    this.sprite = "";
    this.spriteset = null;
    this.state = shtem.C.ITEM_STATE_ALIVE;
    this.imgNumberX = 0;
    this.imgNumberY = 0;
    this.changeTick = 0;
}

shtem.Explosion.prototype ={
    init : function (x,y){
        this.sprite = "assets/images/spriteset/explosion.png";
        this.spriteset = shtem.tileset.get(this.sprite);
        this.x = x;
        this.y = y;
    },

    loop : function(){
        let d = new Date();
        let tick = d.getTime();
        if (tick - this.changeTick > 30){
            this.changeTick = tick;
            this.imgNumberX += 1;
            if (this.imgNumberX > 4){
                this.imgNumberX = 0;
                this.imgNumberY +=1;
                if (this.imgNumberY > 4){
                    this.state = shtem.C.ITEM_STATE_DESTROYED;
                }
            }
        }
    },

    render : function(){
        if (this.state === shtem.C.ITEM_STATE_ALIVE){
            var ctx = shtem.canvas.canvasTile.getContext("2d");
            ctx.setTransform(1, 0, 0, 1, this.x - shtem.player.x + shtem.gameEngine.centerX, this.y - shtem.player.y + shtem.gameEngine.centerY);
            ctx.drawImage(
                this.spriteset,
                this.imgNumberX * 64,
                this.imgNumberY * 64,
                64,
                64,
                -16,
                -16,
                32,
                32);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
};
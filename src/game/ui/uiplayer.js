'use strict';
var shtem = shtem || {};

shtem.UIPlayer = function (){
    this.x = 100;
    this.y = 10;
    this.width = 100;
    this.height = 12;
    this.ctx = undefined;
}

shtem.UIPlayer.prototype ={
    init : function (){
        this.ctx  = shtem.canvas.canvasAnimation.getContext("2d");
    },

    renderLifeGauge : function(){
        var prctLife = Math.floor((shtem.player.hitpoint/shtem.player.maxHitPoint)*100);
        if (prctLife < 0) prctLife = 0;
        this.ctx.beginPath(); //background of gauge
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
        this.ctx.beginPath(); // gauge of life
        this.ctx.fillStyle = "#00FF00";
        this.ctx.fillRect(this.x,this.y,prctLife,this.height);
        this.ctx.strokeStyle = "#bdffff"; // border of gauge
        this.ctx.rect(this.x,this.y,this.width,this.height);
        this.ctx.stroke();
    },

    render : function(){
        this.renderLifeGauge();
    }
}
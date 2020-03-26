'use strict';
var shtem = shtem || {};

shtem.UILifeGauge = function (){
    this.x = 100;
    this.y = 10;
    this.width = 50;
    this.height = 4;
    this.ctx = undefined;
}

shtem.UILifeGauge.prototype ={
    init : function (item){
        this.ctx  = shtem.canvas.canvasAnimation.getContext("2d");
        this.item = item
    },

    renderLifeGauge : function(){
        let prctLife = this.item.hitpoint/this.item.maxHitPoint;
        if (prctLife < 0) prctLife = 0;
        let fillIt = Math.floor(this.width * prctLife); 
        this.ctx.beginPath(); //background of gauge
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
        this.ctx.beginPath(); // gauge of life
        this.ctx.fillStyle = "#00FF00";
        this.ctx.fillRect(this.x,this.y,fillIt,this.height);
        this.ctx.strokeStyle = "#bdffff"; // border of gauge
        this.ctx.rect(this.x,this.y,this.width,this.height);
        this.ctx.stroke();
    },

    render : function(x,y){
        this.y = y - 20;
        this.x = x - (Math.floor(this.width/2));
        this.renderLifeGauge();
    }
}
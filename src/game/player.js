'use strict';
var shtem = shtem || {};

shtem.Player = function (){
    this.x = 1000;
    this.y = 1000;
    this.sprite = "";
    this.spriteset = null;
    this.angleRotation;
    this.angleDegrees = 0;
    this.angleRadian = 0;
    this.speed = 2;
    this.missiles = [];
    this.lastFireTick = 0;
}

shtem.Player.prototype ={
    init : function (){
        this.sprite = "assets/images/ships/mship1_32.png";

        this.spriteset = shtem.tileset.get(this.sprite);
    },

    move : function(){
        if(! isNaN(this.angleRadian)){
            this.x += Math.cos(Math.abs(this.angleRadian)) * this.speed;
            this.y -= Math.sin(this.angleRadian) * this.speed;
        }
    },    

    fire : function(){
        let d = new Date();
        let newTick = d.getTime();
        if (newTick - this.lastFireTick > 200){
            this.lastFireTick = newTick;
            let m = new shtem.Missile();
            m.init();
            this.missiles.push(m);
        }
        
    },

    loop : function(){
        this.angleRotation = Math.atan2(shtem.gameEngine.mouseY - shtem.gameEngine.centerY, shtem.gameEngine.mouseX - shtem.gameEngine.centerX) + Math.PI / 2;
        this.angleDegrees = this.angleRotation * -180/Math.PI + 90;
        this.angleRadian = this.angleDegrees * Math.PI / 180;
        this.move();
        this.missiles.forEach(function(m){
            m.loop();
        })
    },

    render : function(){
        var ctx = shtem.canvas.canvasTile.getContext("2d");

        ctx.setTransform(1, 0, 0, 1, shtem.gameEngine.centerX, shtem.gameEngine.centerY);
        ctx.rotate(this.angleRotation);        
        ctx.drawImage(this.spriteset,-16, -16); 
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        this.missiles.forEach(function(m){
            m.render();
        })

        
        
        
    }
};
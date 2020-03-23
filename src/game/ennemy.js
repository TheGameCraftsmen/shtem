'use strict';
var shtem = shtem || {};

shtem.Ennemy = function (){
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

shtem.Ennemy.prototype ={
    init : function (){
        this.sprite = "assets/images/ships/turret.png";
        this.spriteset = shtem.tileset.get(this.sprite);
        this.angleDegrees = 180;
        this.angleRotation = (this.angleDegrees-90)/-180*Math.PI;
        this.angleRadian = this.angleDegrees * Math.PI / 180;
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
            m.init(this);
            this.missiles.push(m);
        }
    },

    loop : function(){
        //this.move();
        this.fire();
        var missileToRemove = [];
        this.missiles.forEach(function(m){
            m.loop();
            if (m.state === shtem.C.MISSILE_STATE_DESTROYED){
                missileToRemove.push(m);
            }
        })
        var _this = this;
        missileToRemove.forEach(function(item){
            const index = _this.missiles.indexOf(item);
            if (index !== -1) {
                _this.missiles.splice(index, 1);
            }
            return;
        })
    },

    render : function(){
        var ctx = shtem.canvas.canvasTile.getContext("2d");
        ctx.setTransform(1, 0, 0, 1, this.x - shtem.player.x + shtem.gameEngine.centerX, this.y - shtem.player.y + shtem.gameEngine.centerY);
        ctx.rotate(this.angleRotation); 
        //ctx.drawImage(this.spriteset,-16, -16); 
        ctx.drawImage(
            this.spriteset,
            0,
            0,
            192,
            192,
            -16,
            -16,
            32,
            32);
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        this.missiles.forEach(function(m){
            m.render();
        })
    }
};
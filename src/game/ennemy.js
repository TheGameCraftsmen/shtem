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
    this.hitpoint = 10;
    this.maxHitPoint = 10;
    this.state = shtem.C.ITEM_STATE_ALIVE;
}

shtem.Ennemy.prototype ={
    init : function (){
        this.sprite = "assets/images/ships/turret.png";
        this.spriteset = shtem.tileset.get(this.sprite);
        this.angleDegrees = 180;
        this.angleRotation = (this.angleDegrees-90)/-180*Math.PI;
        this.angleRadian = this.angleDegrees * Math.PI / 180;
        this.uiLifeGauge = new shtem.UILifeGauge();
        this.uiLifeGauge.init(this);
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

    setDamage : function(dmg){
        this.hitpoint -= dmg;
        this.hitpoint = this.hitpoint < 0 ? 0 : this.hitpoint;
        if (this.hitpoint === 0){
            this.state = shtem.C.ITEM_STATE_DESTROYED;
        }
    },

    missileCollisionToCharacter : function(){
        var _this = this;
        this.missiles.forEach(function(m){
            if (boxCollision (shtem.player,m) === true){
                m.state  = shtem.C.ITEM_STATE_DESTROYED;
                shtem.player.setDamage(m.damage);
                let exp = new shtem.Explosion();
                exp.init(m.x,m.y);
                shtem.gameEngine.explosions.push(exp);
            }
        });
    },

    loop : function(){
        this.fire();
        var missileToRemove = [];
        this.missiles.forEach(function(m){
            m.loop();
            if (m.state === shtem.C.ITEM_STATE_DESTROYED){
                missileToRemove.push(m);
            }
        })
        
        removeItemArrayFromArray(missileToRemove,this.missiles);
        this.missileCollisionToCharacter();
    },

    render : function(){
        var ctx = shtem.canvas.canvasTile.getContext("2d");
        ctx.setTransform(1, 0, 0, 1, this.x - shtem.player.x + shtem.gameEngine.centerX, this.y - shtem.player.y + shtem.gameEngine.centerY);
        ctx.rotate(this.angleRotation); 
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

        this.uiLifeGauge.render(this.x - shtem.player.x + shtem.gameEngine.centerX, this.y - shtem.player.y + shtem.gameEngine.centerY);
    }
};
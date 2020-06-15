'use strict';
var shtem = shtem || {};

shtem.Player = function (){
    this.x = 1300;
    this.y = 1000;
    this.sprite = "";
    this.spriteset = null;
    this.angleRotation;
    this.angleDegrees = 0;
    this.angleRadian = 0;
    this.speed = 0;
    this.missiles = [];
    this.lastFireTick = 0;
    this.hitpoint = 0;
    this.maxHitPoint = 0;
    this.uiLifeGauge = null;
    this.maxSpeed = 0;
    this.idTemplate = shtem.C.SHIP_PLAYER_1;
    this.idWeapon = 0;
}


shtem.Player.prototype ={
    loadFromTemplate : function(){
        var src = shtem.ships[this.idTemplate];
        this.sprite = src.sprite;
        this.maxSpeed = src.speed;
        this.maxHitPoint = src.hitpoint;
        this.hitpoint = src.hitpoint;
        this.idWeapon = src.weaponid;
    },

    init : function (){
        this.loadFromTemplate();
        this.spriteset = shtem.tileset.get(this.sprite);
        this.uiLifeGauge = new shtem.UILifeGauge();
        this.uiLifeGauge.init(this);
    },

    speedChange : function(delta){
        if (delta < 0){
            this.speed -= 1;
            this.speed = this.speed < 0 ? 0 : this.speed;
        }else{
            this.speed += 1;
            this.speed = this.speed > this.maxSpeed ? this.maxSpeed : this.speed;
        }

    },

    move : function(){
        if(! isNaN(this.angleRadian)){
            let newX = this.x + Math.cos(Math.abs(this.angleRadian)) * this.speed;
            let newY = this.y - Math.sin(this.angleRadian) * this.speed;
            var collider = { "x" : newX, "y" : newY};
            var hasCollided = false;
            shtem.gameEngine.ennemies.forEach(function (ennemy){
                hasCollided = hasCollided || boxCollision(collider,ennemy);
                return;
            })
            if (! hasCollided){
                this.x = newX;
                this.y = newY;
            }
        }
    },    

    setDamage : function(dmg){
        this.hitpoint -= dmg;
        this.hitpoint = this.hitpoint < 0 ? 0 : this.hitpoint;
    },

    fire : function(){
        let d = new Date();
        let newTick = d.getTime();
        var src = shtem.weapons[this.idWeapon];
        if (newTick - this.lastFireTick > src.rythm){
            this.lastFireTick = newTick;
            let m = new shtem.Missile();
            m.init(this.idWeapon,this);
            this.missiles.push(m);
        }
        
    },

    takeBonus : function(bonus){
        let srcActualWeapon = shtem.weapons[this.idWeapon];
        this.idWeapon = srcActualWeapon.upgrade;        
    },

    loop : function(){
        this.angleRotation = Math.atan2(shtem.gameEngine.mouseY - shtem.gameEngine.centerY, shtem.gameEngine.mouseX - shtem.gameEngine.centerX) + Math.PI / 2;
        this.angleDegrees = this.angleRotation * -180/Math.PI + 90;
        this.angleRadian = this.angleDegrees * Math.PI / 180;
        this.move();
        var _this = this;
        var missileToRemove = [];
        this.missiles.forEach(function(m){
            m.loop();
            var _m = m;
            shtem.gameEngine.ennemies.forEach(function(ennemy){
                if (boxCollision(_m,ennemy) === true){
                    _m.state = shtem.C.ITEM_STATE_DESTROYED;
                    let exp = new shtem.Explosion();
                    exp.init(_m.x, _m.y);
                    shtem.gameEngine.explosions.push(exp);
                    ennemy.setDamage(_m.damage);
                }
            });

            if (m.state === shtem.C.ITEM_STATE_DESTROYED){
                missileToRemove.push(m);
            }
        })
        removeItemArrayFromArray(missileToRemove,this.missiles);

        shtem.gameEngine.bonus.forEach(function(bonus){
            if (boxCollision(_this,bonus) === true){
                bonus.state = shtem.C.ITEM_STATE_DESTROYED;
                _this.takeBonus(bonus);
            }
        });
    },

    render : function(){
        var ctx = shtem.canvas.canvasCreature.getContext("2d");

        ctx.setTransform(1, 0, 0, 1, shtem.gameEngine.centerX, shtem.gameEngine.centerY);
        ctx.rotate(this.angleRotation);        
        ctx.drawImage(this.spriteset,-16, -16); 
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        this.missiles.forEach(function(m){
            m.render();
        })

        this.uiLifeGauge.render(shtem.gameEngine.centerX, shtem.gameEngine.centerY);
        
        
    }
};
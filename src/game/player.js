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
                shtem.gameEngine.meteors.forEach(function (meteor){
                hasCollided = hasCollided || boxCollision(collider,meteor);
                    return;
                })
            }
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
            
            if (shtem.weapons[this.idWeapon].number > 1){
                let stepX = Math.sin(Math.abs(this.angleRadian)) * shtem.C.WEAPON_SPACE_BETWEEN_GREEN_BEAM;
                let stepY = Math.cos(this.angleRadian) * shtem.C.WEAPON_SPACE_BETWEEN_GREEN_BEAM;
                if (this.angleRadian < 0){
                    stepY = -stepY;
                }
                let decalageNb = shtem.weapons[this.idWeapon].number / 2;
                for (let i = 1; i<= decalageNb;i++){
                    let position = {"x" : this.x + stepX*i, 
                            "y" : this.y + stepY*i,
                            "angleDegrees" : this.angleDegrees,
                            "angleRotation" : this.angleRotation,
                            "angleRadian" : this.angleRadian};
                    let m = new shtem.Missile();
                    m.init(this.idWeapon,position);
                    this.missiles.push(m);
                    m = new shtem.Missile();
                    position = {"x" : this.x - stepX*i, 
                                "y" : this.y - stepY*i,
                                "angleDegrees" : this.angleDegrees,
                                "angleRotation" : this.angleRotation,
                                "angleRadian" : this.angleRadian};
                    m.init(this.idWeapon,position);
                    this.missiles.push(m);    
                }
            }else{
                let m = new shtem.Missile();
                let position = {"x" : this.x, 
                            "y" : this.y,
                            "angleDegrees" : this.angleDegrees,
                            "angleRotation" : this.angleRotation,
                            "angleRadian" : this.angleRadian};
                m.init(this.idWeapon,position);
                this.missiles.push(m);
            }
            
        }
        
    },

    takeBonus : function(bonus){
        if (bonus.idTemplate == shtem.C.BONUS_UPGRADE_SHOOT){
            let srcActualWeapon = shtem.weapons[this.idWeapon];
            this.idWeapon = srcActualWeapon.upgrade;        
        }else{
            if (bonus.idTemplate == shtem.C.BONUS_HEAL){
                let hpGain = Math.floor(this.maxHitPoint / 3);
                this.hitpoint += hpGain;
                this.hitpoint = this.hitpoint > this.maxHitPoint ? this.maxHitPoint : this.hitpoint;
            }
        }
    },
    
    missileLoop : function(){
        var missileToRemove = [];
        this.missiles.forEach(function(missile){
            missile.loop();
            if (missile.state === shtem.C.ITEM_STATE_DESTROYED){
                missileToRemove.push(missile);
            }
        })
        removeItemArrayFromArray(missileToRemove,this.missiles);
    },

    bonusLoop : function(){
        var _this = this;
        shtem.gameEngine.bonus.forEach(function(bonus){
            if (boxCollision(_this,bonus) === true){
                bonus.state = shtem.C.ITEM_STATE_DESTROYED;
                _this.takeBonus(bonus);
            }
        });
    },

    loop : function(){
        this.angleRotation = Math.atan2(shtem.gameEngine.mouseY - shtem.gameEngine.centerY, shtem.gameEngine.mouseX - shtem.gameEngine.centerX) + Math.PI / 2;
        this.angleDegrees = this.angleRotation * -180/Math.PI + 90;
        this.angleRadian = this.angleDegrees * Math.PI / 180;
        this.move();
        this.missileLoop();
        this.bonusLoop();
        
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
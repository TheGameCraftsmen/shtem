'use strict';
var shtem = shtem || {};

shtem.Ennemy = function (){
    this.x = 1000;
    this.y = 1000;
    this.sizeX = 0;
    this.sizeY = 0;
    this.sprite = "";
    this.spriteset = null;
    this.angleRotation = 0;
    this.angleDegrees = 0;
    this.angleRadian = 0;
    this.speed = 2;
    this.missiles = [];
    this.lastFireTick = 0;
    this.hitpoint = 10;
    this.maxHitPoint = 10;
    this.state = shtem.C.ITEM_STATE_ALIVE;
    this.templateWeapon = shtem.C.WEAPON_SIMPLE_RED_BEAM;
    this.idTemplate = 1;
    this.bonusPrct = 0;
    this.ennemyType = 0;
}

shtem.Ennemy.prototype ={
    loadFromSpecificTemplateShip : function(src){
        this.speed = src.speed;
    },

    loadFromTemplate : function(){
        let src = shtem.ennemy[this.idTemplate];
        this.sprite = src.sprite;
        this.maxHitPoint = src.hitpoint;
        this.hitpoint = src.hitpoint;
        this.templateWeapon = src.weaponid;
        this.bonusPrct = src.bonusprcent;
        this.sizeX = src.size.x;
        this.sizeY = src.size.y;
        this.ennemyType = src.ennemytype;
        if (this.ennemyType === shtem.C.ENNEMY_TYPE_SHIP){
            this.loadFromSpecificTemplateShip(src);
        }
    },

    getBonus : function(){
        let val = Math.random() * 100;
        if (val <= this.bonusPrct ){
            let bonus = new shtem.Bonus();
            bonus.init(shtem.C.BONUS_UPGRADE_SHOOT,this.x,this.y);
            return bonus;
        }
        return null;
    },

    init : function (templateId){
        this.idTemplate = templateId;
        this.loadFromTemplate();
        this.spriteset = shtem.tileset.get(this.sprite);
        this.angleDegrees = 180;
        this.angleRotation = (this.angleDegrees-90)/-180*Math.PI;
        this.angleRadian = this.angleDegrees * Math.PI / 180;
        this.uiLifeGauge = new shtem.UILifeGauge();
        this.uiLifeGauge.init(this);
    },

    move : function(){
        if(! isNaN(this.angleRadian)){
            let newX = this.x + Math.cos(Math.abs(this.angleRadian)) * this.speed;
            let newY = this.y - Math.sin(this.angleRadian) * this.speed;
            var collider = { "x" : newX, "y" : newY};
            let hasCollided = boxCollision(collider,shtem.player);
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

    fire : function(){
        let d = new Date();
        let newTick = d.getTime();
        var src = shtem.weapons[this.templateWeapon];
        if (newTick - this.lastFireTick > src.rythm){
            this.lastFireTick = newTick;
            let m = new shtem.Missile();
            m.init(this.templateWeapon,this,shtem.C.OWNER_MISSILE_ENNEMY);
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

    rotate : function(){
        this.angleDegrees -= 1;
        this.angleRotation = (this.angleDegrees-90)/-180*Math.PI;
        this.angleRadian = this.angleDegrees * Math.PI / 180;
    },

    loopMissile : function(){
        var missileToRemove = [];
        this.missiles.forEach(function(m){
            m.loop();
            if (m.state === shtem.C.ITEM_STATE_DESTROYED){
                missileToRemove.push(m);
            }
        })
        
        removeItemArrayFromArray(missileToRemove,this.missiles);
    },

    lookAtPlayer : function(){
        this.angleRotation = Math.atan2( shtem.player.y - this.y, shtem.player.x - this.x) + Math.PI / 2;
        this.angleDegrees = this.angleRotation * -180/Math.PI + 90;
        this.angleRadian = this.angleDegrees * Math.PI / 180;
    },

    loop : function(){
        this.fire();
        if (this.ennemyType === shtem.C.ENNEMY_TYPE_TURREL){
            this.rotate();
        }else{
            if (this.ennemyType === shtem.C.ENNEMY_TYPE_SHIP){
                this.lookAtPlayer();
                this.move();
            }
        }
        this.loopMissile();
    },

    render : function(){
        var ctx = shtem.canvas.canvasCreature.getContext("2d");
        ctx.setTransform(1, 0, 0, 1, this.x - shtem.player.x + shtem.gameEngine.centerX, this.y - shtem.player.y + shtem.gameEngine.centerY);
        ctx.rotate(this.angleRotation); 
        ctx.drawImage(
            this.spriteset,
            0,
            0,
            this.sizeX,
            this.sizeY,
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
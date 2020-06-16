'use strict';

var shtem = shtem || {};

shtem.ennemy = {
    1 : {
        "id" : shtem.C.ENNEMY_TURREL_1,
        "sprite"    : "assets/images/ships/turret.png",
        "size":{"x" : 192, "y" : 192},
        "ennemytype" : shtem.C.ENNEMY_TYPE_TURREL,
        "weaponid" : shtem.C.WEAPON_SIMPLE_RED_BEAM,
        "hitpoint" : 10,
        "bonusprcent" : 10
    },
    2 : {
        "id" : shtem.C.ENNEMY_SHIP_1,
        "sprite"    : "assets/images/ships/ennemy1.png",
        "size":{"x" : 835, "y" : 835},
        "ennemytype" : shtem.C.ENNEMY_TYPE_SHIP,
        "weaponid" : shtem.C.WEAPON_SIMPLE_RED_BEAM,
        "hitpoint" : 10,
        "bonusprcent" : 10,
        "speed" : 1,
    },

};
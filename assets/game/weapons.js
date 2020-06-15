'use strict';

var shtem = shtem || {};

shtem.weapons = {
    1 : {
        "id" : shtem.C.WEAPON_SIMPLE_GREEN_BEAM,
        "sprite"    : "assets/images/ships/beams.png",
        "size":{"x" : 11, "y" : 18},
        "position" : { "x" : 9, "y" : 40},
        "lifetime" : 1000,
        "speed" : 5,
        "damage" : 1,
        "rythm" : 200,
        "number" : 1,
        "upgrade" : shtem.C.WEAPON_DOUBLE_GREEN_BEAM,
    },
    2 : {
        "id" : shtem.C.WEAPON_SIMPLE_RED_BEAM,
        "sprite"    : "assets/images/ships/beams.png",
        "size":{"x" : 11, "y" : 18},
        "position" : { "x" : 9, "y" : 154},
        "lifetime" : 1000,
        "speed" : 3,
        "damage" : 1,
        "rythm" : 600,
        "number" : 1,
        "upgrade" : shtem.C.WEAPON_DOUBLE_GREEN_BEAM,
    },
    3 : {
        "id" : shtem.C.WEAPON_DOUBLE_GREEN_BEAM,
        "sprite"    : "assets/images/ships/beams.png",
        "size":{"x" : 11, "y" : 18},
        "position" : { "x" : 9, "y" : 40},
        "lifetime" : 1000,
        "speed" : 5,
        "damage" : 1,
        "rythm" : 200,
        "number" : 2,
        "upgrade" : shtem.C.WEAPON_DOUBLE_GREEN_BEAM,
    },
};
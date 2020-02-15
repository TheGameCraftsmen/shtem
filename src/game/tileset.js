'use strict';
var shtem = shtem || {};

shtem.Tileset = function (){
  this.tilesets = {};
};

shtem.Tileset.prototype = {
  get : function(name){
    if (!(name in this.tilesets)){
      var tileset = new Image();
      tileset.src = name;
      this.tilesets[name] = tileset;
    }
    return this.tilesets[name];
  }
};

function removeItemArrayFromArray (listToRemove,removeFromArray) {
    var _removeFromArray = removeFromArray;
    listToRemove.forEach(function(item){
        const index = _removeFromArray.indexOf(item);
        if (index !== -1) {
            _removeFromArray.splice(index, 1);
        }
        return;
    })
}

function boxCollision(obj1, obj2){
    if ((((obj1.x) < obj2.x && ((obj1.x+32) > obj2.x))
                   || ((obj1.x > (obj2.x ) && (obj1.x) < (obj2.x + 32))))
                && 
                (((obj1.y) < obj2.y && ((obj1.y+32) > obj2.y))
                   || ((obj1.y > (obj2.y ) && (obj1.y) < (obj2.y + 32))))
            ){
                return true;
            }
    return false;
}
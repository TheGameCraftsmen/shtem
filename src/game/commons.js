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

var x = function(){

console.log('test');
};

var c = 1;
var a = function(x){
    var id = "John";
    return {setId:function(ID){
        id = ID;     
    },
        getId:function(){
            return id;
        }
    }
};

console.log(a.getId());
console.log(a.setId(5));
console.log(a.getId());
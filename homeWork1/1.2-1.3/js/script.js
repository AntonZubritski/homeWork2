// ------Create object country-------

var termBelarus = {
    Minsk: 18,
    Brest: 25,
    Gomel: 23,
    Grodno: 19,
    Vitebsk: 24
};


/*-----lesson 2.2-----*/


var valueTemp = [];
var value = 0;


for(var key in termBelarus) {
    valueTemp.push(termBelarus[key]);
    value += termBelarus[key];
}

var avarageValueTemp = value/valueTemp.length;
console.log(avarageValueTemp);
alert("Cредняя температура по городам Беларуси " + avarageValueTemp + "°C");


/*-----lesson 2.3-----*/
/*-----Option-1-------*/


var largeTerm = function (object) {
    return Math.max.apply(Math, Object.values(object))
};

alert("Самая высокая температура в Беларуси " + largeTerm(termBelarus) + "°C");


/*-----Option-2------*/
/*

var valuesTerm = [];

for(var key in termBelarus) {
    valuesTerm.push(termBelarus[key]);
}

var largeTerm = function (array) {
    alert(Math.max.apply(Math,array));
};

largeTerm(valuesTerm);

*/



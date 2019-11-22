// ClassWork 1

var num = 17;

var str = "У меня есть 18 яблок";

num = num - 2;


if(num > 16) {
    alert("Да, все гуд");
} else {
    console.log(str);
}


switch(num){
    case 18: alert("Здесь 18");
    break;
    case 20: alert("Здесь 20");
    break;
    default: alert("Стандартное значение")
}

var add;


function sum(a,b,c) {
    add = (a + b) * c;
    return add;
}
sum(3,2,6);
alert(sum(3,2,4));

document.write(sum(3,4,74));






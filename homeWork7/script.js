/*
// -----Generator 1


function* generateNumber(a, b) {
    for (let i = a; i <= b; i++) {
        yield i
    }
}
let gen = [...generateNumber(4,10)];

alert(gen);


// -----Generator 2

\
function* generateSequence() {
    yield 1;
    yield 2;
    yield 3;
}

let generator = generateSequence();

for(let value of generator) {
    alert(value);
}

// -----Iterator 1

let arr = [1,2,3,5,7,23];


let iterator = () => {
    for (let i of arr){
        console.log(i);
    }
};

iterator();

// -----Iterator 2

let houseBase2 = [
    {
        "adress" : "Rokoss 1-12",
        "rooms" : "2",
        "windowA": "6",
        "sizeWallA" : "8",
        "sizeWallB" : "12"
    },
    {
        "adress" : "Vaneeva 1-2",
        "rooms" : "4",
        "windowA": "7",
        "sizeWallA" : "5",
        "sizeWallB" : "19"
    }
];
console.log(houseBase2);

let iterator2 = () => {
    for (let house2 of houseBase2){
        console.log(house2);
        for (let i in house2){
            console.log(i);
        } 
    }
};

iterator2();

// -----Mixin
let mixin = superclass => class extends superclass {
    test() {
        console.log('test from MyMixin');
    }
};

class InfoRoute {
    constructor ( dateIn, dateTo, cost, star) {
        this.dateIn = dateIn;
        this.dateTo = dateTo;
        this.cost = cost;
        this.star = star;
    }
    get getInfoRoute() {
        return `${this.cost} $`
    }
}

class InfoRoute2 extends InfoRoute{
    constructor (way, wayIn, wayTo, dateIn, dateTo, cost, star) {
        super (dateIn, dateTo, cost, star);
        this.way = way;
        this.wayIn = wayIn;
        this.wayTo = wayTo;
    }
}

let num = new InfoRoute2(9,9,97,7,5,7,4);
console.log(num);


class InfoRoute3 extends mixin(InfoRoute2){
    constructor (timeIn, timeTo, way, wayIn, wayTo, dateIn, dateTo, cost, star) {
        super (way, wayIn, wayTo, dateIn, dateTo, cost, star);
        this.timeIn = timeIn;
        this.timeTo = timeTo;
    }
}
let numMixin = new InfoRoute3(1,2,3,4,5,6,7,8,9);

console.log(numMixin);*/



// ----- Function Render Option City
let renderOption = () => {
    let wayTo = document.getElementById('wayTo');
    wayTo.innerHTML = '';
    for (let c of cityBase) {
        wayTo.innerHTML += `<option title="${c.id}">${c.city}</option>`;
    }
};
renderOption();

let btnSave = document.getElementById('btnSave');

let inform = document.getElementById('inform');

btnSave.addEventListener('click', () => {
    let wayTo = document.getElementById('wayTo');
    let date = new Date() ;
    let hour = 3600000;


    for (let c of cityBase) {
        if (wayTo.value === c.city){

            let infoDate = new Date(+date + (hour * c.utc));
            infoDate = JSON.stringify(infoDate);

            console.log(infoDate);
            inform.innerHTML = `
            <div>${wayTo.value}</div>
            <div>${infoDate}</div>
            <div><img src="${c.pic}"></div>`
        }
    }

});


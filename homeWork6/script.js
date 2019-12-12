//--Buttons and hidden blocks
let btn = document.getElementById('btn');
let addRoute = document.getElementById('addRoute');
let tableForm = document.getElementById('table');
let btnSave = document.getElementById('btnSave');
let tbody = document.getElementById('tbody');

//--Array for objects
let routeArray = [];

let angellist = document.getElementById('angellist');
let angellistI = document.getElementById('angellistI');


angellist.addEventListener('click', () => clickStar());

btn.addEventListener('click', () => addRoute.style.display = 'block');

btnSave.addEventListener('click',() => {
    addRoute.style.display = 'none';
    tableForm.style.display = 'block';
    saveArray();

});


function clickStar() {

    if (angellist.value === 0) {
        angellistI.classList.add('fa-star-color-click');
        angellist.value = 1;
    } else {
        angellist.value = 0;
        angellistI.classList.remove('fa-star-color-click');
    }
}

function saveArray() {
    //--All Value input
    let way = document.querySelectorAll('.ulList input')[0].value;
    let wayIn = document.querySelectorAll('.ulList input')[1].value;
    let wayTo = document.querySelectorAll('.ulList input')[2].value;
    let timeIn = document.querySelectorAll('.ulList input')[3].value;
    let timeTo = document.querySelectorAll('.ulList input')[4].value;
    let dateIn = document.querySelectorAll('.ulList input')[5].value;
    let dateTo = document.querySelectorAll('.ulList input')[6].value;
    let cost = document.querySelectorAll('.ulList input')[7].value;

    //--Create object & push Array(routeArray)
    let route = new InfoRoute(way, wayIn, wayTo, timeIn, timeTo, dateIn, dateTo, cost, angellist.value);
    routeArray.push(route);

    console.log(routeArray);


    angellist.value = 0;
    angellistI.classList.remove('fa-star-color-click');

    list();
}

function list() {
    //--Update rendering
    tbody.innerHTML = '';

    //--Arrow function & map method
    routeArray.map((arr, i) => {

        tbody.innerHTML += `<td>${i + 1}</td>
        <td>${arr.way}</td>
        <td>${arr.wayIn}</td>
        <td>${arr.wayTo}</td>
        <td>${arr.getDateInRoute}</td>
        <td>${arr.getDateToRoute}</td>
        <td>${arr.getInfoRoute}</td>
        <td><i class="fa fa-ban fa-color" title="delete${i}"
        onclick="del(this)" data-id="${i}"></td>
        ${arr.getStarIcon}`
    });
}


function del (i) {

    // Delete object
    const ind = i.getAttribute("data-id");
    console.log("index: ", ind);
    console.log(this);
    routeArray.splice(ind, 1);
    console.log(routeArray);

    list();

}



class InfoRoute {
    constructor (way, wayIn, wayTo, timeIn, timeTo, dateIn, dateTo, cost, star) {
        this.way = way;
        this.wayIn = wayIn;
        this.wayTo = wayTo;
        this.timeIn = timeIn;
        this.timeTo = timeTo;
        this.dateIn = dateIn;
        this.dateTo = dateTo;
        this.cost = cost;
        this.star = star;
    }
    get getInfoRoute() {
        return `${this.cost} $`
    }
    get getDateInRoute() {
        return `${this.timeIn} ${this.dateIn}`
    }
    get getDateToRoute() {
        return `${this.timeTo} ${this.dateTo}`
    }
    get getStarIcon() {
        if (this.star === 1){
            return `<td class="td-i"><i class="fa fa-angellist
                    fa-angellist-tbl"></i></td>`
        } else {
            return ``
        }
    }
}


// btn.addEventListener('keypress', function (enterPress) {
//     if (enterPress.which === 13) {
//         let liAdd = document.createElement('li');
//         let newRoute = this.value;
//         this.value = "";
//         items.appendChild(liAdd).append(newRoute);
//
//     }
// });
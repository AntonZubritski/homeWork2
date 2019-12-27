import {cityBase} from "./base/cityBase";
import {InfoRoute} from "./constructor/constructor";
import {weatherBalloon, jsonFlickrFeed, animaPic,} from "./api/api";
import {tabActive, clickStar, renderOption} from "./block/block";


//--Buttons and hidden blocks
let btn = document.getElementById('btn');
let addRoute = document.getElementById('addRoute');
let tableForm = document.getElementById('table');
let btnSave = document.getElementById('btnSave');
let tbody = document.getElementById('tbody');
let weather = document.getElementById('weather');
let secFlickr = document.getElementById('top3');
let angellist = document.getElementById('angellist');
let angellistI = document.getElementById('angellistI');
let search = document.getElementById("search");
//--Flickr
let submitFlickr = document.getElementById('submitFlickr');

//--Array for objects
let routeArray = [];
let waitArray = [];
let futureArray = [];
let favoritesArray = [];



//------TAB
let a = document.getElementById('firstTable1');
let b = document.getElementById('firstTable2');
let c = document.getElementById('firstTable3');
let d = document.getElementById('firstTable4');




//-------------------------------------AddEventListener
angellist.addEventListener('click', () => clickStar());
btn.addEventListener('click', () => {addRoute.style.display = 'block'; renderOption()});
btnSave.addEventListener('click',() => {
    addRoute.style.display = 'none';
    tableForm.style.display = 'flex';
    weather.style.display = 'flex';
    secFlickr.style.display = 'block';
    saveArray();
});
submitFlickr.addEventListener('click', () => {jsonFlickrFeed(search.value); setTimeout(() => animaPic(),1000);});
//---tab.addEventListener
a.addEventListener('click',() => {tabActive(a,b,c,d); list(routeArray)});
b.addEventListener('click',() => {tabActive(b,a,c,d); btnFirstTable(waitArray)});
c.addEventListener('click',() => {tabActive(c,a,b,d); btnFirstTable(futureArray)});
d.addEventListener('click',() => {tabActive(d,c,a,b); btnFirstTable(favoritesArray)});
//-----------------------------------------------------




// ----- Function Save Array
function saveArray() {
    //--All Value input
    let way = document.getElementById('way').value;
    let wayIn = document.getElementById('wayIn').value;
    let wayTo = document.getElementById('wayTo').value;
    let timeIn = document.getElementById('timeIn').value;
    let timeTo = document.getElementById('timeTo').value;
    let dateIn = document.getElementById('dateIn').value;
    let dateTo = document.getElementById('dateTo').value;
    let cost = document.getElementById('cost').value;

    //--Create object & push Array(routeArray)
    let route = new InfoRoute(way, wayIn, wayTo, timeIn, timeTo, dateIn, dateTo, cost, angellist.value);
    routeArray.push(route);

    angellist.value = 0;
    angellistI.classList.remove('fa-star-color-click');

    // ---------Flickr pic auto render
    search.value = `${wayTo}/city`;
    for (let so of cityBase){
    if (wayTo === so.city){
        search.value = so.flickrText
    }}

    jsonFlickrFeed(search.value);
    setTimeout(() => animaPic(),1000);
    //--------------------------------
    list(routeArray);
}




// ----- Function Render Elements
function list(array) {
    //--Update rendering
    tbody.innerHTML = '';

    //--Arrow function & map method
    array.map((arr, i) => {

        tbody.innerHTML += `<td>${i + 1}</td>
        <td>${arr.way}</td>
        <td>${arr.wayIn}</td>
        <td>${arr.wayTo}</td>
        <td>${arr.getDateInRoute}</td>
        <td>${arr.getDateToRoute}</td>
        <td>${arr.getInfoRoute}</td>
        <td><i class="fa fa-ban fa-color" title="delete${i}"
        data-id="${i}"></td>
        ${arr.getStarIcon}`
    });

    //--Find Id for weather
    let option = document.getElementById('wayTo');
    let optionId = document.querySelectorAll('#wayTo option');
    let massId = 0;
    let picId = 0;

    for (let id in optionId){
        if (option.value === optionId[id].value){
            massId = cityBase[id].id;
            picId = id;
        }
    }

    weatherBalloon(massId);

    weather.style.backgroundImage = cityBase[picId].pic;
    weather.innerHTML = `
        <div class="cloudText">
            <div id="description"></div>
            <h1 id="temp" class="temp"></h1>
            <div id="location"></div>
        </div>
        <div class="textWeather">
            <div id="textWeather"></div>
        </div>
        <img src="./img/cloud-01.png" alt="" class="cloud1">
        <img src="./img/cloud-02.png" alt="" class="cloud2">
        <img src="./img/cloud-03.png" alt="" class="cloud3">
        <img src="./img/cloud-04.png" alt="" class="cloud4">`;

    delBtn();// Вызов функции для добавления события отрендеренных кнопок:'Удалить'
}




//-----  2 Function Delete button
function delBtn() {

    let delbtn = document.querySelectorAll(".fa-color");
    for (let btn of delbtn){
        btn.addEventListener('click', () => {
            del(btn);
        })
    }
}
function del(i) {
    // Delete object
    const ind = i.getAttribute("data-id");
    routeArray.splice(ind, 1);
    list(routeArray);
}




// ----- Tabs function array
function btnFirstTable(array) {
    waitArray = [];
    futureArray = [];
    favoritesArray = [];

    for (let i in routeArray) {
        //---Favorites test
        let favorites = routeArray[i].star;
        //---Date test
        let dateNow = new Date();
        let waitDate = new Date(routeArray[i].getDateInRoute);
        let result = waitDate - dateNow;

        if (result > 0) {
            waitArray.push(routeArray[i]);
        } else if (favorites === 1){
            favoritesArray.push(routeArray[i]);
        } else {
            futureArray.push(routeArray[i]);
        }

        list(array);
    }
}

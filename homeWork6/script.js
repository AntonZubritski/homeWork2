//--Buttons and hidden blocks
let btn = document.getElementById('btn');
let addRoute = document.getElementById('addRoute');
let tableForm = document.getElementById('table');
let btnSave = document.getElementById('btnSave');
let tbody = document.getElementById('tbody');
let weather = document.getElementById('weather');
let angellist = document.getElementById('angellist');
let angellistI = document.getElementById('angellistI');
//--Array for objects
let routeArray = [];
let massId = 0;
let picId = 0;


//--addEventListener
angellist.addEventListener('click', () => clickStar());

btn.addEventListener('click', () => {
    addRoute.style.display = 'block';
    renderOption();
});

btnSave.addEventListener('click',() => {
    addRoute.style.display = 'none';
    tableForm.style.display = 'block';
    saveArray();
});


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

    console.log(routeArray);


    angellist.value = 0;
    angellistI.classList.remove('fa-star-color-click');
    
    list();

}
// ----- Function Render Elements
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

    //--Find Id for weather
    let option = document.getElementById('wayTo');
    let optionId = document.querySelectorAll('#wayTo option');
    for (let id in optionId){
        if (option.value === optionId[id].value){

            massId = cityBase[id].id;
            picId = id;
            console.log(massId);
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
        <img src="./cloud/cloud-01.png" alt="" class="cloud1">
        <img src="./cloud/cloud-02.png" alt="" class="cloud2">
        <img src="./cloud/cloud-03.png" alt="" class="cloud3">
        <img src="./cloud/cloud-04.png" alt="" class="cloud4">`
}

// ----- Function Delete button
let del = (i) => {
    // Delete object
    const ind = i.getAttribute("data-id");
    console.log("index: ", ind);
    console.log(this);
    routeArray.splice(ind, 1);
    console.log(routeArray);

    list();
};

// ----- Function Render Option City
let renderOption = () => {
    let wayIn = document.getElementById('wayIn');
    let wayTo = document.getElementById('wayTo');
    wayIn.innerHTML = '';
    wayTo.innerHTML = '';
    for (let c of cityBase) {
        wayIn.innerHTML += `<option>${c.city}</option>`;
        wayTo.innerHTML += `<option title="${c.id}">${c.city}</option>`;
    }

};

function clickStar() {

    if (angellist.value === 0) {
        angellistI.classList.add('fa-star-color-click');
        angellist.value = 1;
    } else {
        angellist.value = 0;
        angellistI.classList.remove('fa-star-color-click');
    }
}

// ----- Class

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

// ----- Weather
function weatherBalloon(i) {
    let key = 'd1259b3d788c0aa8132b4fd18ff92b58';
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${i}&appid=${key}`)
        .then((resp) => resp.json()) // Convert data to json
        .then((data) => {
            drawWeather(data);
            console.log(data);
        })
        .catch(() => {});
}

function drawWeather(d) {
    let celcius = Math.round(parseFloat(d.main.temp)-273.15);

    document.getElementById('description').innerHTML = d.weather[0].description;
    document.getElementById('temp').innerHTML = celcius + '&deg;';
    document.getElementById('location').innerHTML = d.name;
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


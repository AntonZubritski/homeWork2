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
let search = document.getElementById("search").value;
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
    tableForm.style.display = 'flex';
    weather.style.display = 'flex';
    secFlickr.style.display = 'block';

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

    // ---------Flickr pic auto render
    search = `${wayTo}/city`;
    jsonFlickrFeed();
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

    list(routeArray);
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
        return `${this.dateIn} ${this.timeIn}`
    }
    get getDateToRoute() {
        return `${this.dateTo} ${this.timeTo}`
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

// ----- Weather API
function weatherBalloon(i) {
    let key = 'd1259b3d788c0aa8132b4fd18ff92b58';
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${i}&appid=${key}`)
        .then((resp) => resp.json()) // Convert data to json
        .then((data) => {
            drawWeather(data);
            console.log(data);
        })
        .catch(() => {console.log('Error Weather: ')});
}

function drawWeather(d) {
    let celcius = Math.round(parseFloat(d.main.temp)-273.15);

    document.getElementById('description').innerHTML = d.weather[0].description;
    document.getElementById('temp').innerHTML = celcius + '&deg;';
    document.getElementById('location').innerHTML = d.name;
}
// --------------- Flickr API




let jsonFlickrFeed = () => {
    let key = '7a052a68ef616ebbb7180178ee95a410';
    let src = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=`;
    let qtyPic = 20;

    fetch(`${src}${key}&tags=${search}&per_page=${qtyPic}&page=1&format=json&nojsoncallback=1`)

        .then((resp) => resp.json())
        .then((data) => {
            let picArray = data.photos.photo.map((pic) =>{
            let srcPath = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
            return `<img src=${srcPath}>`
            });

            let image = '';
            for (pic of picArray){
                image += pic;
            }
            document.getElementById("outputDiv").innerHTML = image;
        })
        .catch(() => {console.log(`Error:`)});
};


//---------------- Slider

let outputImg = document.getElementById('outputDiv');
let submitFlickr = document.getElementById('submitFlickr');

submitFlickr.addEventListener('click', () => {
    // outputImg.style.display = 'block';
    jsonFlickrFeed();
    setTimeout(() => animaPic(),1000)
});


// document.querySelector(".reveal").classList.remove("reveal");



function animaPic() {
    let revealedImages = document.querySelectorAll(".shuffle img"),i = 1;
    let getRandom = (min, max) => Math.random() * (max - min) + min;

    for (let pic of revealedImages ) {

        setTimeout(() => {
        pic.style.position = `absolute`;
        pic.style.width = `${getRandom(20, 35)}%`;
        pic.style.left = `${getRandom(-5, 71)}%`;
        pic.style.top = `${getRandom(0.8, 26)}vh`;
        pic.classList.add(`expose`);

        let animate = pic.animate([
            {
                opacity: `0`, transform: `rotate(${getRandom(-15, 15)}deg) scale(1.2)`,
                boxShadow: `0 0 12px 12px rgba(0,0,0,.3)`
            },
            {
                opacity: `1`, transform: `rotate(${getRandom(-10, 10)}deg)`,
                boxShadow: `5px 4px 4px 5px rgba(0,0,0,.3)`
            }
        ], {
            duration: 1000,
            fill: `forwards`
        });
        }, 2000 * i);
        i++;
    }
    
}
//--------------- BTN Tab Table
let a = document.getElementById('firstTable1');
let b = document.getElementById('firstTable2');
let c = document.getElementById('firstTable3');

let waitArray = [];
let futureArray = [];


let tabActive = (a,b,c) =>{
    a.classList.add('tabActive');
    a.classList.remove('tab');
    b.classList.add('tab');
    b.classList.remove('tabActive');
    c.classList.add('tab');
    c.classList.remove('tabActive');
};

a.addEventListener('click',() => {
    tabActive(a,b,c);
    list(routeArray);
});
b.addEventListener('click',() => {
    btnFirstTable(waitArray);
    tabActive(b,a,c);
});
c.addEventListener('click',() => {
    tabActive(c,a,b);
    btnFirstTable(futureArray);

});


function btnFirstTable(array) {
    waitArray = [];
    futureArray = [];

    for (let i in routeArray){
        let dateNow = new Date();
        let waitDate = new Date(routeArray[i].getDateInRoute);
        let result = waitDate - dateNow;

        if (result > 0){
            waitArray.push(routeArray[i]);
        } else {
            futureArray.push(routeArray[i]);
        }
        list(array);
    }
}



//--------------------------------------- Вариант N2 Flickr API
/*
let JavaScriptFetch = () => {

    let script = document.createElement('script');
    let url = `https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=`;

    script.src = `${url}${document.getElementById("search").value}`;
    document.querySelector('head').appendChild(script);
    document.querySelector('head script').replaceWith('');

};
let flikrMass = [];

function jsonFlickrFeed(data) {
    let image = "";
    flikrMass = data.items;
    let flikrMassSlice = flikrMass.slice(0,6);

    for (element of flikrMassSlice){
            image += `<img src=${element.media.m}>`;
    }

    document.getElementById("outputDiv").innerHTML = image;
}


*/

//----------------------------------------------------


// btn.addEventListener('keypress', function (enterPress) {
//     if (enterPress.which === 13) {
//         let liAdd = document.createElement('li');
//         let newRoute = this.value;
//         this.value = "";
//         items.appendChild(liAdd).append(newRoute);
//
//     }
// });


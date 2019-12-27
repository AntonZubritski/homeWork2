// --------------- Weather

import {infoWeather} from "../base/cityBase";


export function weatherBalloon(i) {
    let key = 'd1259b3d788c0aa8132b4fd18ff92b58';
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${i}&appid=${key}`)
        .then((resp) => resp.json()) // Convert data to json
        .then((data) => {
            drawWeather(data);
        })
        .catch(() => {});
}

export function drawWeather(d){
    let celcius = Math.round(parseFloat(d.main.temp)-273.15);

    document.getElementById('description').innerHTML = d.weather[0].description;
    document.getElementById('temp').innerHTML = celcius + '&deg;';
    document.getElementById('location').innerHTML = d.name;
    textWeather1(celcius);
}



// --------------- Text weather

let textWeather1 = (cel) => {
    for (let i = 0; i <= infoWeather.length; i++){

        if (cel == infoWeather[i].grad || cel > infoWeather[i].grad && cel <= infoWeather[i+1].grad){
            document.getElementById('textWeather').innerHTML = infoWeather[i].text;
        }
    }
};



// --------------- Flickr API

let keyFlick = '7a052a68ef616ebbb7180178ee95a410';
let src = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=`;
let qtyPic = 20;

export let jsonFlickrFeed = (search) => {
    fetch(`${src}${keyFlick}&tags=${search}&per_page=${qtyPic}&page=1&format=json&nojsoncallback=1`)

        .then((resp) => resp.json())
        .then((data) => {
            let picArray = data.photos.photo.map((pic) =>{
                let srcPath = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
                return `<img src=${srcPath}>`
            });

            let image = '';
            for (let pic of picArray){
                image += pic;
            }
            document.getElementById("outputDiv").innerHTML = image;
        })
        .catch((data) => {console.log(`Error:`, data)});
};



// --------------- Slider

export function animaPic() {
    let revealedImages = document.querySelectorAll(".shuffle img");
    let i = 1;
    let getRandom = (min, max) => Math.random() * (max - min) + min;

    for (let pic of revealedImages ) {

        setTimeout(() => {
            pic.style.position = `absolute`;
            pic.style.width = `${getRandom(15, 25)}%`;
            pic.style.left = `${getRandom(-5, 71)}%`;
            pic.style.top = `${getRandom(-0.3, 18)}vh`;
            pic.classList.add(`expose`);

             pic.animate([
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
        }, 1500 * i);
        i++;
    }
}
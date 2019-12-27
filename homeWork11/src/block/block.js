import {cityBase} from "../base/cityBase";

//--------------- BTN Tab Table
export let tabActive = (a, b, c, d) =>{
    a.classList.add('tabActive');
    a.classList.remove('tab');
    b.classList.add('tab');
    b.classList.remove('tabActive');
    c.classList.add('tab');
    c.classList.remove('tabActive');
    d.classList.add('tab');
    d.classList.remove('tabActive');
};


// ----- Function Render Option City//Выпадающий список
export let renderOption = () => {
    let wayIn = document.getElementById('wayIn');
    let wayTo = document.getElementById('wayTo');
    wayIn.innerHTML = '';
    wayTo.innerHTML = '';
    for (let c of cityBase) {
        wayIn.innerHTML += `<option>${c.city}</option>`;
        wayTo.innerHTML += `<option title="${c.id}">${c.city}</option>`;
    }
};


// ----- Function Favorites true/false
export function clickStar() {
    if (angellist.value === 0) {
        angellistI.classList.add('fa-star-color-click');
        angellist.value = 1;
    } else {
        angellist.value = 0;
        angellistI.classList.remove('fa-star-color-click');
    }
}

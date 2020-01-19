let user = document.getElementById('user');

function pushUser () {
    user.innerText = '';
    user.innerText = `Привет, ${dataPersons[0].firstName}`;
}


//  пробник подписка

let innerTimeBasic = document.getElementById('timeBasic');
let innertimePremium = document.getElementById('timePremium');

function timeBasic() {
    let date = '2020-02-17T017:00:00';
    date = date.split("T").reverse().join(" ");// разобрать , реверс и собрать

    innerTimeBasic.innerHTML = '';
    innerTimeBasic.innerHTML += `<p>
                 ${getTimeRemaining(date).days} дней
                ${getTimeRemaining(date).hours}:${getTimeRemaining(date).minutes}:${getTimeRemaining(date).seconds}
                </p>
`;
    } //загрузить и вставить элементы в таблицу
const datePremium = new Date();
datePremium.setDate(datePremium.getDate() + 30);

    function timePremium() {

        console.log(datePremium);
        setTimeout(function run() {
            innertimePremium.innerHTML = '';
            innertimePremium.innerHTML += `<p>
                 ${getTimeRemaining(datePremium).days} дней
                ${getTimeRemaining(datePremium).hours}:${getTimeRemaining(datePremium).minutes}:${getTimeRemaining(datePremium).seconds}
                </p>
`;
            setTimeout(run, 1000);
        }, 1000);


    }


let premiumButt = document.getElementById('premiumButt');
premiumButt.addEventListener('click', () => {
    timePremium()
});


//---------------------------------------------------Date
function getTimeRemaining(endtime){

    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor( (t/1000) % 60 );
    let minutes = Math.floor( (t/1000/60) % 60 );
    let hours = Math.floor( (t/(1000*60*60)) % 24 );
    let days = Math.floor( t/(1000*60*60*24) );

    return {t, days, hours, minutes, seconds};
}
setTimeout(function run() {
    timeBasic();
    setTimeout(run, 1000);
}, 1000);



new Promise(async function (resolve) {
    resolve(await getPerson())
})
    .then(() => pushUser())
    .then (() => renderTable2());


//---------------------------------------------------Exit

let exit = document.getElementById('exit');

exit.addEventListener('click', function () {
    localStorage.removeItem('dataPersons');
    window.location ='index.html';
});
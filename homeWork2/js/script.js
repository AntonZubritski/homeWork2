"use strict";

let textArea = document.getElementById('taskInn');
let dateArea = document.getElementById('dateInn');
let tblInn = document.getElementById('tblInn');
let btnSave = document.getElementById('btnSave');
let tblInfo = localStorage.getItem('tblInfo');
let selected_index = 1;

tblInfo = JSON.parse(tblInfo); //преобразовать строку в объект
if (tblInfo === null) { // если нет данных, запускаем пустой массив
    tblInfo = [];
}


//-----------------------------------------------------LocalStorage

function Create() {
    // Получить входные значения  HTML и преобразовать их в строку
    let taskObj = {
        textArea: textArea.value,
        dateArea: dateArea.value,
    };
    tblInfo.push(taskObj);

    // Сохраняем данные в localStorage
    localStorage.setItem("tblInfo", JSON.stringify(tblInfo));
}


//-----------------------------------------------------Render

function List() {

    tblInn.innerHTML = '';
    tblInn.innerHTML = `
            <caption class="caption">To-Do-Do List</caption>
            <tr class="colorTableTitle">
                <th>Задача</th>
                <th>Выполнить до</th>
                <th>Дней до выполнения</th>
                <th>Удалить</th>
            `;//Добавить таблицу в структуру HTML


function getTimeRemaining(endtime){
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor( (t/1000) % 60 );
    let minutes = Math.floor( (t/1000/60) % 60 );
    let hours = Math.floor( (t/(1000*60*60)) % 24 );
    let days = Math.floor( t/(1000*60*60*24) );

    return {t, days, hours, minutes, seconds
    };
}

//---------------------------------------------------Date

    for (let i in tblInfo) {
        let info = tblInfo[i];

        let date = info.dateArea;
        date = date.split("T").reverse().join(" ");// разобрать , реверс и собрать

        let diffDays = "";
        if (date === ""){
            diffDays = "Укажите дату";
        }

        console.log(date);
        tblInn.innerHTML += `
               <tr class="taskRow">
                <td class="task">${info.textArea}</td>
                <td class="date">${date}</td>
                <td> ${getTimeRemaining(date).days} дней
                ${getTimeRemaining(date).hours}:${getTimeRemaining(date).minutes}:${getTimeRemaining(date).seconds}</td>
                
                 <td>
                    <div class="text-center">
                        <i class="fa fa-times-circle colorIcon btnDelete" title="Delete${i}" onclick="del(this)" ></i>
                    </div>
                </td>
            </tr>`;
    } //загрузить и вставить элементы в таблицу
}


//---------------------------------------------------Delete

function Delete() {

    // Удалить выбранный элемент в таблице
    tblInfo.splice(selected_index, 1);
    // Обновить данные локального хранилища
    localStorage.setItem("tblInfo", JSON.stringify(tblInfo));
    alert("Задача удалена"); //Оповещение
}

function del (e) {

    // Получить идентификатор элемента, который нужно удалить
    selected_index = e.getAttribute('title').replace('Delete', '');

    Delete(); //удалить элемент
    List(); //Вернуться к пунктам, перечисленным в таблице
}

btnSave.addEventListener('click', function () {
    Create();
    List();
    alert("Задача записана"); //Оповещение
});



window.onload = function () {

    setTimeout(function run() {
        List();
        setTimeout(run, 1000);
    }, 1000);
};


//----------------------------------------



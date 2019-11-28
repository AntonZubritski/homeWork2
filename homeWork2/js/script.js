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

            </tr>
            <tr class="taskRow">
                <td class="task">Зашить носки(пример)</td>
                <td>23-11-2019</td>
                <td>10</td>
                <td>
                    <div class="text-center">
                        <i class="fa fa-times-circle  colorIcon btnDelete" title='Delete'></i>
                    </div>
                </td>
            </tr>
            <tr class="taskRow">
                <td class="task">Отжать Бабки(пример)</td>
                <td>23-11-2019</td>
                <td>10</td>
                <td>
                    <div class="text-center">
                        <i class="fa fa-times-circle  colorIcon btnDelete" title='Delete'></i>
                    </div>
                </td>
            </tr>
            <tr class="taskRow">
                <td class="task">Позвонить маме(пример)</td>
                <td>23-11-2019</td>
                <td>10</td>
                <td>
                    <div class="text-center">
                        <i class="fa fa-times-circle  colorIcon btnDelete" title='Delete'></i>
                    </div>
                </td>
            </tr>
            </tr>
            <tr class="taskRow">
                <td class="task">Одеть шапку(пример)</td>
                <td>23-11-2019</td>
                <td>10</td>
                <td>
                    <div class="text-center">
                        <i class="fa fa-times-circle  colorIcon btnDelete" title='Delete'></i>
                    </div>
                </td>
            </tr>
            `;//Добавить таблицу в структуру HTML


//---------------------------------------------------Date

    for (let i in tblInfo) {
        let info = tblInfo[i];

        let date = info.dateArea;
        date = date.split("-").reverse().join("-");// разобрать , реверс и собрать

        let diffDays = "";
        if (date === ""){
            diffDays = "Укажите дату";
        } else {
            let date3 = info.dateArea;
            let date1 = new Date(date3);
            let date2 = new Date();
            diffDays = parseInt((date1 - date2) / (1000 * 60 * 60 * 24)) + 1;
        }

        tblInn.innerHTML += `
               <tr class="taskRow">
                <td class="task">${info.textArea}</td>
                <td class="date">${date}</td>
                <td>${diffDays}</td>
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
    List();
};
"use strict";

let btnCreate = document.getElementById('btnCreate');
let btnSaveCr = document.getElementById('btnSaveCr');
let btnSave = document.getElementById('btnSave');
let wrapper = document.getElementById('wrapper');
let btnCrud = document.getElementById('btnCrud');
let inform = document.getElementById('inform');
let selected_index = 1;
const adress = document.getElementsByTagName('input')[0]; // почему value не работает с ID
const rooms = document.getElementsByTagName('input')[1];
const windowAmount = document.getElementsByTagName('input')[2];
const sizeA = document.getElementsByTagName('input')[3];
const sizeB = document.getElementsByTagName('input')[4];





let tblHouses = localStorage.getItem('tblHouses');
tblHouses = JSON.parse(tblHouses); //преобразовать строку в объект
let tblHouses0 = [];
//Перебираем массив и создаем массив объектов
for (let key in tblHouses){
    let house = tblHouses[key];
    let obj = new Room(house.adress, house.rooms, house.windowA, house.sizeWallA, house.sizeWallB);
    tblHouses0.push(obj);

    //Удаляем старые элементы массива
    // tblHouses.splice(0,tblHouses.length/2);
    // tblHouses.push(obj);
    // console.log(key);
}


// если нет данных, запускаем пустой массив
if (tblHouses === null) {

    tblHouses = [];
    console.log('tblHouses === null');
    console.log(tblHouses);
} else{

    tblHouses = [];
    tblHouses = tblHouses.concat(tblHouses0);
    console.log(tblHouses);
}


btnCreate.addEventListener('click', function () {
    btnCrud.style.display = 'none';
    wrapper.style.display = 'flex';
    list();
});


btnSave.addEventListener('click', function () {
    create();
    list();
});


function create() {

    // --------------Вариант работы напрямую с объектом
    // let propInfoObj = {
    //     adress: adress,
    //     rooms: rooms,
    //     windowA: windowAmount,
    //     sizeWallA: sizeA,
    //     sizeWallB: sizeB,
    // };

    // Получить входные значения  HTML и преобразовать их в строку
    let propInfoObj = new Room(adress.value, rooms.value, windowAmount.value, sizeA.value, sizeB.value);
    tblHouses.push(propInfoObj);
    // Сохраняем данные в localStorage
    localStorage.setItem("tblHouses", JSON.stringify(tblHouses));
}

function list() {
    let tblList = document.getElementById('tblList');

    //Добавить таблицу в структуру HTML
    tblList.innerHTML = '';
    tblList.innerHTML = `
            <thead class="colorTableTitle">
                <tr>
                <th>Адресс</th>
                <th>Комнаты</th>
                <th>Окна</th>
                <th>Длинна стены А</th>
                <th>Длинна стены B</th>
                <th>Площадь</th>
                <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
            `;

    for (let i in tblHouses) {
        let per = tblHouses[i];
        let tbody = document.querySelector('#tblList tbody');

        tbody.innerHTML += `<tr> 
        <td>${per.adress}</td>
        <td>${per.rooms}</td>
        <td>${per.windowA}</td>
        <td>${per.sizeWallA} м.</td>
        <td>${per.sizeWallB} м.</td>
        <td>${per.sizeWallA * per.sizeWallB} кв.м</td>
                <td>
                <div class="text-center">
                   <i class="fa fa-pencil-square-o colorIcon" title='Edit${i}' id='btnEdit' onclick="editBtn(this)" ></i>  
                   <i class="fa fa-times-circle mr-3 colorIcon" title='Delete${i}' id='btnDelete' onclick="deleteBtn(this)"></i>
                </div>
                </td>
                
                </tr>`;
    } //загрузить и вставить элементы в таблицу
}

function deleteBtn (e) {

    // Получить идентификатор элемента, который нужно удалить
    selected_index = e.getAttribute('title').replace('Delete', '');

    // Можно Получить идентификатор через event.target.id
    // alert("id= " + event.target.id);

    // Удалить выбранный элемент в таблице
    tblHouses.splice(selected_index, 1);

    // Обновить данные локального хранилища
    localStorage.setItem("tblHouses", JSON.stringify(tblHouses));
    alert("Данные удалены"); //Оповещение

    list(); //Вернуться к пунктам, перечисленным в таблице
}

function editBtn (e) {

    btnSave.style.display = "none";
    btnSaveCr.style.display = "inline-block";

    // Получить идентификатор элемента, который нужно удалить
    selected_index = e.getAttribute('title').replace('Edit', '');

// вставляем значения в Input-ы
    let per = tblHouses[selected_index];
    per.setInputValue(adress, rooms, windowAmount, sizeA, sizeB);

    inform.innerHTML = "";
    inform.innerHTML += `<div class="padd">${per.getInfoHouse()};</div>`;
    inform.innerHTML += `<div>${per.getSqareMetrs()};</div>`;



}

function btnSaveCreate() {

    // -------------- Вариант работы напрямую с объектом
    // Редактировать выбранный элемент в таблице
    // tblHouses[selected_index] = {
    //     adress: adress.value,
    //     rooms: rooms.value,
    //     windowA: windowAmount.value,
    //     sizeWallA: sizeA.value,
    //     sizeWallB: sizeB.value
    // };
    
    btnSave.style.display = "inline-block";
    btnSaveCr.style.display = "none";

    // МЕТОД ВПИХНУТЬ В ПРОТОТАЙП
    tblHouses[selected_index].setParameters(adress, rooms, windowAmount, sizeA, sizeB);

    //Хранить предметы в localStorage
    localStorage.setItem("tblHouses", JSON.stringify(tblHouses));
    alert("Данные отредактированы"); //Оповещение
    inform.innerHTML = "Подробная информация";
    list(); //Вернуться к пунктам, перечисленным в таблице
}

//Тип - Дом, офис,
// --------------Конструкторы
function House(adress, rooms, windowA) {
    this.adress = adress;
    this.rooms = rooms;
    this.windowA = windowA;

    this.getInfoHouse = function () {
        return "Дом расположен по адресу: " + this.adress + ", колличество комнат: " + this.rooms +
            ", колличество окон: " + this.windowA;
    };
    this.getAdress = function () {
        return this.adress;
    };
}


function Room(adress, rooms, windowA, sizeWallA, sizeWallB) {

    House.apply(this, arguments); // почему не работает call

    this.sizeWallA = sizeWallA;
    this.sizeWallB = sizeWallB;

    this.getSqareMetrs = function () {
        return "Площадь дома: " + this.sizeWallA * this.sizeWallB + " кв.м";
    };
    this.setParameters = function (adress, rooms, windowA, sizeWallA, sizeWallB) {
        this.adress = adress.value;
        this.rooms = rooms.value;
        this.windowA = windowA.value;
        this.sizeWallA = sizeWallA.value;
        this.sizeWallB = sizeWallB.value;
    };
    this.setInputValue = function (adress, rooms, windowAmount, sizeA, sizeB) {
        adress.value = this.adress;
        rooms.value = this.rooms;
        windowAmount.value = this.windowA;
        sizeA.value = this.sizeWallA;
        sizeB.value = this.sizeWallB;

    }
}


// --------------Вариант с prototype
// Room.prototype.setParameters = function (adress, rooms, windowA, sizeWallA, sizeWallB) {
//     this.adress = adress;
//     this.rooms = rooms;
//     this.windowA = windowA;
//     this.sizeWallA = sizeWallA;
//     this.sizeWallB = sizeWallB;
// };


// --------------Консольки для проверки
// let rokoss76 = new House("Рокоссовского 76-196", "красная", 4 , 8);
// console.log(rokoss76);
// console.log(rokoss76.getInfoHouse());
// let rokoss76Room1 = new Room("sdfsf", 5, 3, 10, 4);
// console.log(rokoss76Room1.setParameters());





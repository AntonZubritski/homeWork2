"use strict";
let email2 = document.getElementById('email2');
let password2 = document.getElementById('password2');
let warningText2 = document.getElementById('warningText2');
let navBtnSign = document.querySelectorAll('#navBtnSign li');
let btnClickReg = document.getElementById('btnClickReg');
let btnPersonData = document.getElementById('btnPersonData');
let dataPersons = localStorage.getItem('dataPersons');
let section = document.querySelectorAll('.tab-pane');


//Если данные верны и совпали - переходим на User.html
if (btnClickReg !== null) {
    btnClickReg.addEventListener('click', () => {
        for (let i in dataPersons) {
            if (email2.value === dataPersons[i].inputEmail && password2.value === dataPersons[i].inputPassword) {
                window.open('user.html');
            }
        }
    });
    getPerson();
}



/*---------------------sign in/ to /registration-----------------------*/
// Функция на переключение вкладок -  sign in/ to /registration
navBtnSign.forEach(function(btnLi) {

    btnLi.addEventListener("click", function() {

        if (btnLi.classList.contains('active') === false) {
            navBtnSign.forEach(function (i) {
               i.classList.remove('active');
            });

            btnLi.classList.add('active');
        }
        test();
    });
});

function test() {
        if (navBtnSign[0].classList.contains('active') === true) {
            section[1].classList.remove('active', 'show');
            section[0].classList.add('active', 'show');

        } else if (navBtnSign[1].classList.contains('active') === true) {
            section[0].classList.remove('active', 'show');
            section[1].classList.add('active', 'show');
        }

}


/*---------------------Registration person-----------------------*/

function getPerson() {
    dataPersons = JSON.parse(dataPersons);

    if (dataPersons === null) {
        dataPersons = [];
    }
}


let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let inputEmail2 = document.getElementById('inputEmail2');
let inputPassword2 = document.getElementById('inputPassword2');



function Create() {
    // Получить входные значения в HTML и преобразовать их в строку
    let person = new InfoPerson(firstName.value, lastName.value, inputEmail2.value, inputPassword2.value);

    dataPersons.push(person);

    // Сохраняем данные в localStorage
    localStorage.setItem("dataPersons", JSON.stringify(dataPersons));
    alert("Данный сохранены"); //Оповещение
    return true;
}


let adminLogin = function () {
    btnPersonData.addEventListener('click', function () {
        if (firstName.value && lastName.value && inputEmail2.value && inputPassword2.value !== '') {
            warningText2.innerHTML = '';
            warningText2.innerHTML = 'Вы успещно зарегестрированы';
            return Create()

        } else {
            return warningText2.innerHTML = 'Заполните все данные';
        }
    })
};


if (btnPersonData !== null) {
    window.onload = function () {
        adminLogin();
    }
}

let buttUser = document.getElementById('buttUser');
 if (buttUser !== null) {
     if (dataPersons !== null) {

         buttUser.innerHTML = `<a href="user.html">Кабинет</a>`;
     }
 }



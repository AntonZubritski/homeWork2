let container = document.querySelector('#contentContainer');
let containerFooter = document.getElementById('contentConteinerFooter');

let arrayCount = [];
let cartCountStor = '';
let cartCountStorSplit = 0;

let fill2 = localStorage.getItem("filmArray");
let filmArray2 = JSON.parse(fill2);
console.log(filmArray2);


// счетчик товаров и запись в local storage
let counter = () => {
    let count = document.getElementById("counter");
    if (localStorage.getItem('Key') !== null ){
        cartCountStor = localStorage.getItem('Key').replace(/[^,\d;]/g, '');
        cartCountStorSplit = cartCountStor.split(',');
        count.innerText = "";
        if (localStorage.getItem('Key') === "[]"){
            count.innerText = 0;
        } else {
            count.innerText = cartCountStorSplit.length
        }
    }
};
//
//рендер и перебор массива и вывод на страницу и поиск по id выьранного
const renderTable2 = () => {
    container.innerHTML = "";

    for (let key in filmArray2){
        let film = filmArray2[key];

        if (arrayCount.includes(`${key}`)) {

            container.innerHTML += ( `<tr>
                    <th scope="row" class = "index">${key}</th>
                    <td>${film.title}</td>
                    <td>
                        <img class="img-fluid img-size" src=${film.poster} alt="GoodImg">
                    </td>
                    <td class="inputContainer">
                        <input type="number" value="1" min="1" aria-label="search" style="width: 50px;" class="form-control numberCartAmount" />
                    </td>
                    <td class="cost" data-cost = "${film.id}">${film.id} $</td>
                    <td id="summCart">${film.id}</td>
                    <td>
                    <i class="fa fa-times-circle mr-3 color-icon" title='Delete${key}' data-id = '${key}' id='btnDelete' onclick="del(this)"></i>
                    </td>
                </tr>`)}
    }
};

//Подсчет
function listeners() {
    document.querySelectorAll(".numberCartAmount").forEach( item =>{

        item.addEventListener("change", function(e){
            console.log(e);
            let res = parseInt(event.target.parentNode.parentNode.querySelector('.cost').textContent) * e.target.value;
            event.target.parentNode.parentNode.querySelector('#summCart').innerHTML = res;

            let sum = Array.prototype.slice.call((document.querySelectorAll('#summCart'))).reduce( (res, item) => {
                return  res += parseInt(item.innerText)
            }, 0);

            document.querySelector(".text-center").innerHTML = sum;
        })})
}

if (localStorage.getItem('Key') !== null) {
    replaceCountCart();
    function replaceCountCart() {
        cartCountStor = localStorage.getItem('Key').replace(/[^,\d;]/g, '');
        cartCountStorSplit = cartCountStor.split(',');
        arrayCount = cartCountStorSplit;
    }
}
//DElete
let del = e => {
    let id = e.getAttribute('data-id');
    console.log(id);


            cartCount.splice(cartCount.indexOf(id), 1);
            console.log(cartCount);
            localStorage.setItem('Key', JSON.stringify(cartCount));
    replaceCountCart();
    counter();
    renderTable2();

    if (!cartCount.length){localStorage.removeItem('Key')}

};


if (container !== null){
    renderTable2();
}

listeners();


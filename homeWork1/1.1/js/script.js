/*----Button1-----------при нажатии на кнопку переход по ссылке-*/
function button1(){
    document.getElementById("butt1").onclick = function () {
        window.open('https://www.instagram.com/a.zubritski/')
    }
}

/*----Button2-----------при нажатии на кнопку меняются стили элементов-*/
   function button2() {
       document.getElementById("butt2").onclick = function () {
           if (document.getElementById("side_id").className !== "side1a") {
            document.getElementById("side_id").className = "side1a";
           } else if (document.getElementById("side_id2").className !== "side2b") {
            document.getElementById("side_id2").className = "side2b";
           } else if (document.getElementById("side_id3").className !== "side3c") {
               document.getElementById("side_id3").className = "side3c";
           } else if (document.body.className !== "body2") {
               document.body.className = "body2";
           } else {
            document.body.className = "";
            document.getElementById("side_id").className = "side1";
            document.getElementById("side_id2").className = "side2";
            document.getElementById("side_id3").className = "side3"
           }
       }
   }

/*----Button3-----------при нажатии на кнопку все удаляется и отрисовываются Flex-ы-*/
function button3() {
    document.getElementById("butt3").onclick = function () {
        let elem = document.body.children[0];
        elem.remove(); // <-- вызов удалит элемент */

        let wrap = document.createElement("div"); // Создание div class wrapper
        wrap.className = "wrapper";
        wrap.id = "wrap";
        document.body.appendChild(wrap);

        for (let n = 1; n < 10; n++) { // цикл для создания Flex элементов(9 шт)
            let div;

            if (n !== 5) {
                div = document.createElement("div");
                div.className = "flex";
                wrap.insertBefore(div, wrap.children[0]);
            } else {
                div = document.createElement("div");
                div.className = "flex";
                div.innerHTML = "КАНGРАDИЛЭШН! Flex-ы";
                wrap.insertBefore(div, wrap.children[0]);
            }

        }
    }
}

window.onload = function () {
    button2();
    button1();
    button3();
};
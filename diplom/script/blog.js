let newsApiKey = '4caf575771e447feb89cf71883bf956b';
let newsArray = [];
let innerNews = document.getElementById('innerNews');
let bodyWrapper = document.getElementById('body_wrapper');


// эта функция делает фетч на новостной портал и загружает через конструктор в массив
let jsonNews = async () => {

    let url = `https://newsapi.org/v2/top-headlines?country=ru&category=entertainment&apiKey=${newsApiKey}`;
    await fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);

            newsArray = data.articles.map((el, inde) => {

                let title = el.title;
                let description = el.description;
                let urlToImage = el.urlToImage;
                let publishedAt = new Date (el.publishedAt);


                return  new InfoNews(title,description,urlToImage, publishedAt, inde);
            });

        })
        .catch((err) => {console.log(err)});
};
// выкидывает на страницу новости
function renderNews() {

    newsArray.map((news) =>{
        innerNews.innerHTML += news.cardNews
    });
}
//Ожидание запроса-функции-fetch: jsonNews() перед рендером на страницу
new Promise(  function (resolve, reject) {
        resolve(jsonNews());
}).then(function () {
        console.log(newsArray);
            renderNews();
});

//Открывает модальное окно
let prop = (i) => {
    const inde = i.getAttribute('data-id');
    innerNews.innerHTML = "";
    console.log('data-id',inde);
    innerNews.innerHTML = newsArray[inde].modalNews;
    innerNews.classList.add('modalCatalog');
    bodyWrapper.classList.add('wrapBlog')
};

//Возвращает как было на страницу с новостями путем отрисовки
let backNews = () => {
    innerNews.innerHTML = "";
    renderNews();
    bodyWrapper.classList.remove('wrapBlog')
};




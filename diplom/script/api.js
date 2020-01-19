let filmArray = [];
let filmFetch = [];
let filmArrayArray = [];
let treiler = [];
let key = '0abaa92b02fa31ca28d58f1d75cc8e98';
let src = `https://api.themoviedb.org/3/discover/movie?api_key=`;


let ru = `&language=ru`;
let en = `&language=en`;
// колличество страниц обработки
let page = 5;


let date = `2019`;
let find = `avengers`;
let sizeP = `w500`;




// Отправляем фетч запрос и получаем массив фильмов
let jsonFilmFeed = async () => {
    // Сначала я писал сайт с 1 запросом и получал 20 фильмов, задача была получить 100 - для этого я
    // сделал цикл для получения массивов с фильмами и выгружал в общий массив
    // записывал через коструктор
    for (let i = 1; i <= page; i++ ) {
        await fetch(`${src}${key}${ru}&sort_by=popularity.desc&include_video=true&page=${i}`)

            .then((resp) => resp.json())
            .then((data) => {
                filmFetch = data.results.map((el, index) => {

                    let date = el.release_date;//массив
                    let poster = `https://image.tmdb.org/t/p/${sizeP}/${el.poster_path}`;
                    let discript = el.overview;
                    let title = el.title;
                    let idFilm = el.id;
                    let backdrop = el.backdrop_path;
                    let genre = el.genre_ids;


                    return new InfoFilm(title, discript, idFilm, poster, date, backdrop, index, genre);
                });
                filmArrayArray.push(filmFetch);

            })
            .catch((err) => {
                console.log(`Error:`, err)
            });
    }
};

//В этом фетч запросе я по id фильма искал трейлер для каждого фильма и загружал в конструктор фильма
let jsonTreilerArray = () => {

    return filmArray.map((link, index) => {
        
        fetch(`https://api.themoviedb.org/3/movie/${link.idFilm}/videos?api_key=${key}${ru}`)
            .then((resp) => resp.json())
            .then(data => {
               if(data.results){  link.url = data.results[0].key;
                   return link} else {
                   fetch(`https://api.themoviedb.org/3/movie/${link.idFilm}/videos?api_key=${key}${en}`)
                       .then((resp) => resp.json())
                       .then((data) => {
                            if(data.results){  link.url = data.results[0].key;
                                return link}
                         return link
                       })
               }

            })
            .then(() => {
                let fill = JSON.stringify(filmArray);
                localStorage.setItem("filmArray", fill);
            })
            .catch((err) => {

            });

    });

};




// let getImage = `https://api.themoviedb.org/3/movie/${idFilm}/images?api_key=0abaa92b02fa31ca28d58f1d75cc8e98&language=ru`;
let getVideo = `https://api.themoviedb.org/3/movie/181812/videos?api_key=0abaa92b02fa31ca28d58f1d75cc8e98&language=en-US`;
// let recomendation = `https://api.themoviedb.org/3/movie/${idFilm}/recommendations?api_key=${key}${en}&page=1`;
// let similar = `https://api.themoviedb.org/3/movie/${idFilm}/similar?api_key=${key}${en}&page=1`;

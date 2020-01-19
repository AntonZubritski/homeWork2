let filterCategory = document.getElementById('filterCategory');
let buttCategory = document.getElementById('buttCategory');
let searchfield = document.getElementById('searchfield');

let rus =  `ru`;
let eng = `en-Us`;
function renderCategory () {
    filterCategory.innerHTML = '';

    genres.map((category, index) => {

        filterCategory.innerHTML += `
                        <option value="${category.id}">${category.name}</option>

`
    });

}

renderCategory();

newArraySearch = [];
let jsonFilmSearch = async () => {

    await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=${ru}&query=${searchfield.value}&page=1&include_adult=false`)

        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            newArraySearch = data.results.map((el, index) => {
            let date = el.release_date;//массив
            let poster = `https://image.tmdb.org/t/p/${sizeP}/${el.poster_path}`;
            let discript = el.overview;
            let title = el.title;
            let idFilm = el.id;
            let backdrop = el.backdrop_path;
            let genre = el.genre_ids;


            return new InfoFilm(title, discript, idFilm, poster, date, backdrop, index, genre);

            });


        })
        .catch((err) => {console.log(`Error:`, err)});


};


searchfield.addEventListener("keydown", (e) => {
    if (e.which === 13) {
        new Promise((resolve) => {
            resolve (jsonFilmSearch());

        })
            .then(() => {
                console.log(newArraySearch);
                innerContent.innerHTML = '';
                newArraySearch.map((film, index) => {

                    innerContent.innerHTML += film.posterInfo
                })

            })

    }

});

let newArray = [];

function posterSearchCategory() {

    innerContent.innerHTML = "";
    filmArray.map((film, index) => {
        if (film.genreIds.includes(+filterCategory.value)) {
            newArray.push(film);
            innerContent.innerHTML += film.posterInfo
        }
    });
}





buttCategory.addEventListener('click', () => {
    posterSearchCategory();
});


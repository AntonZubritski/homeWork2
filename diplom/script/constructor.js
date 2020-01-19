// --------------- Class
class InfoPerson {
    constructor(firstName, lastName, inputEmail, inputPassword) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.inputEmail = inputEmail;
        this.inputPassword = inputPassword;
    }
}
class InfoTreiler{
    constructor (id, url) {
        this.id = id;
        this.url = url;
    }
}

class InfoFilm extends InfoTreiler{
    constructor (title, discript, idFilm, poster, date, backdrop, ind, genreIds, id, url) {
        super(4+ind, url);
        this.title = title;
        this.discript = discript;
        this.idFilm = idFilm;
        this.poster = poster;
        this.date = date;
        this.backdrop = backdrop;
        this.ind = ind;
        this.genreIds = genreIds;
    }

    get posterInfo() {
            return `<div class="card white posterText">
                            <h4 class="black margin">${this.title}</h4>
                            
                        <div class="poster card sliderCat" style="background-image: url(${this.poster})">
                           
                         </div>
                               <div class="posterText">
                               <div>
                                   <button id="${this.ind}" class="buttCard btnGoods" data-id="${this.ind}" onclick="btnClick(this)">Купить</button>
                                   <button id="buttMore${this.ind}" data-id="${this.ind}" onclick="index(this)" class="buttCard">Подробнее</button>
                               </div>
                               <p class="no-margin black">${this.date}</p>
                               
                               </div>
                         </div>
                        </div>`
    }
    get modalInfo() {
        return `
                        <div class="modalCard modalSliderCat">
                            <h3>${this.title}</h3>
                        <div class="flex">
                        <img src="${this.poster}">
                        <p>${this.discript}</p>
                        </div>
                        <p class="no-margin black">${this.date}</p>
                       <div id="reviewStars-input">
                            <input id="star-4" type="radio" name="reviewStars"/>
                            <label title="gorgeous" for="star-4"></label>
                        
                            <input id="star-3" type="radio" name="reviewStars"/>
                            <label title="good" for="star-3"></label>
                        
                            <input id="star-2" type="radio" name="reviewStars"/>
                            <label title="regular" for="star-2"></label>
                        
                            <input id="star-1" type="radio" name="reviewStars"/>
                            <label title="poor" for="star-1"></label>
                        
                            <input id="star-0" type="radio" name="reviewStars"/>
                            <label title="bad" for="star-0"></label>
                        </div>
                        
                        <button id="buttMore${this.ind}" data-id="${this.ind}" onclick="catalogList()" class="buttCard">В Каталог</button>
                        </div>
                        
                        <div class="modalCard modalSliderCat" id="treiler">
                             <h3>ТРЕЙЛЕР</h3>
                             <iframe width="640" height="360" src="https://www.youtube.com/embed/${this.url}" frameborder="1" allowfullscreen></iframe>
                        </div>
                        <div class="modalCard modalSliderCat" id>
                            <h3>Комментарии</h3>
                        <form action="" method="post" name="commentform" id="commentform">
                        <p><input type="text" name="author" id="author" value="" size="25" />
                        <small> Имя</small>
                        </p>
                        <p><input type="text" name="email" id="email" value="" size="25" />
                        <small> E-Mail</small>
                        </p>
                        <p><textarea name="comment" id="comment" cols="48" rows="8"> </textarea>
                        </p>
                        <p><input name="submit" type="submit" id="submit" value="Отправить" />
                        </p>
                        </form>
                        </div>
                        `
    }
}
class InfoNews {
    constructor(title, descript, img, publishedAt, inde) {
        this.title = title;
        this.descript = descript;
        this.img = img;
        this.publishedAt = publishedAt;
        this.inde = inde;
    }
    get cardNews() {
        return `<div class="card white posterText cardNews">
                            <h4 class="black margin">${this.title}</h4>
                            
                        <div class="poster newsImg" style="background-image: url(${this.img})">
                           
                         </div>
                               <div class="posterText">
                               <div>
                                   <button id="buttMore${this.inde}" data-id="${this.inde}" onclick="prop(this)" class="buttCard">Подробнее</button>
                               </div>
                               <p class="no-margin black">
                    ${this.publishedAt.getFullYear()}/${this.publishedAt.getMonth()+1}/${this.publishedAt.getDate()}</p>
                               
                               </div>
                         </div>
                        </div>`
    }
    get modalNews() {
        return `
                        <div class="modalCard modalInnerNews">
                            <h3>${this.title}</h3>
                        <div class="flex">
                        <img src="${this.img}">
                        <p>${this.descript}</p>
                        </div>
                        <p class="no-margin black">
                        ${this.publishedAt.getFullYear()}/${this.publishedAt.getMonth()+1}/${this.publishedAt.getDate()}</p>
                        <div id="reviewStars-input">
                            <input id="star-4" type="radio" name="reviewStars"/>
                            <label title="gorgeous" for="star-4"></label>
                        
                            <input id="star-3" type="radio" name="reviewStars"/>
                            <label title="good" for="star-3"></label>
                        
                            <input id="star-2" type="radio" name="reviewStars"/>
                            <label title="regular" for="star-2"></label>
                        
                            <input id="star-1" type="radio" name="reviewStars"/>
                            <label title="poor" for="star-1"></label>
                        
                            <input id="star-0" type="radio" name="reviewStars"/>
                            <label title="bad" for="star-0"></label>
                        </div>
                        
                        <button id="buttMore${this.inde}"data-id="${this.inde}" onclick="backNews()" class="buttCard">В Каталог</button>
                        </div>
                        `
    }

}




    // <div class="sliderModal">
//     </div>
//--------------- BTN Tab Table

export let tabActive = (a, b, c) =>{
    a.classList.add('tabActive');
    a.classList.remove('tab');
    b.classList.add('tab');
    b.classList.remove('tabActive');
    c.classList.add('tab');
    c.classList.remove('tabActive');
};



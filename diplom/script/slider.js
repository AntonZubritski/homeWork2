// $(document).ready(function(){
//     $('.slider').bxSlider();
// });

$('.slider').bxSlider({
    auto: true,
    pager: true,
    // adaptiveHeight:true,
});

// $('.main .sliderSale').bxSlider({
//     auto: true,
//     pager: false,
//     pagerEl: false,
//     adaptiveHeight: true,
//     autoHover: true,
// });


    $('.main_slider ul').bxSlider({
        pager: false,
        controls: false,
        mode: 'fade',
        auto: true,
        pause: 2000,
        adaptiveHeight: true,
        touchEnabled: false
    });


$(function() {
    let pull 		= $('#pull');
    menu 		= $('nav ul');
    menuHeight	= menu.height();

    $(pull).on('click', function(e) {
        e.preventDefault();
        menu.slideToggle();
    });
});

$(window).resize(function(){
    let w = $(window).width();
    if(w > 320 && menu.is(':hidden')) {
        menu.removeAttr('style');
    }
});

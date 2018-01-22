/*
* Title: Content scroller
* Author: Adam Southorn
* Version: 1.0
*/

var contentScroller = {
    init: function () {
        $('.slick-content-scroller').slick({
            dots: true,
            prevArrow: '<button type="button" class="slick-prev"><span class="svg-load" data-src="/images/icon-arrow.svg"></span></button>',
            nextArrow: '<button type="button" class="slick-next"><span class="svg-load" data-src="/images/icon-arrow.svg"></span></button>'
        });
        global.setImages();
    }
};
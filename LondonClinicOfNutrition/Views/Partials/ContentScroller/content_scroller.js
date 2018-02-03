/*
* Title: Content scroller
* Author: Adam Southorn
* Version: 1.0
*/

var contentScroller = {
    init: function () {
        $('.slick-content-scroller').slick({
            dots: true,
            prevArrow: global.views.slickSettings.prevArrow,
            nextArrow: global.views.slickSettings.nextArrow
        });
        global.setImages();
    }
};
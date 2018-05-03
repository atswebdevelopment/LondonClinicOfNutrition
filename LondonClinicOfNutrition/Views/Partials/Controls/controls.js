/*
* Title: Controls
* Author: Adam Southorn
* Version: 1.0
*/

var controls = {
    init: function () {
        //Controls
        if ($(window).width() < 767) {
            var buttons = $('.controls__center .buttons'),
                width = 0;

            buttons.find('li').each(function () {
                width += ($(this).width() + 20);
            });

            buttons.css('width', width);
        }
    }
};
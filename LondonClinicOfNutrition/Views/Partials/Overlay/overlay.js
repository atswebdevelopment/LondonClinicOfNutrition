/*
* Title: Overlay
* Author: Adam Southorn
* Version: 1.0
*/

var overlay = {
    init: function () {
        $('.overlay-button').click(function () {
            var action = $(this).attr('data-action');

            $('.overlay').removeClass('overlay--active');
            $('.overlay--' + action).addClass('overlay--active');
            $('.content-container').addClass('overlay-on');
            return false;
        });

        $('.overlay .close a').click(function () {
            $('.overlay').removeClass('overlay--active');
            $('.content-container').removeClass('overlay-on');
            return false;
        });
    }
};
/*
* Title: Header
* Author: Adam Southorn
* Version: 1.0
*/

var header = {
    init: function () {
        //Header
        $('.search input').focusin(function () {
            $('.search').addClass('search--active');
        });

        $('.search .close a').click(function () {
            $('.search').removeClass('search--active');
            $('.search input').val('');
            return false;
        });

        $('.nav-m a').click(function () {
            $('.header').toggleClass('header--m-nav-open');
            return false;
        });
    }
};
/*
* Title: Main JS
* Author: Adam Southorn
* Version: 1.0
*/

var global = {
    init: function () {
        global.ui();
        global.setImages();
        global.resize();
        //$(window).on('resize', function (e) {
        //    views.resize();
        //});
    },
    ui: function () {
        $('.section__indicator .arrow').click(function () {
            if (!$(this).next('span').length) {
                var next = $(this).parents('.section').next();

                $('html, body').stop().animate({
                    'scrollTop': next.offset().top
                }, 300, function () {
                    //window.location.hash = target;
                });
            }
            else {
                $('html, body').scrollTop(0);
            }
            return false;
        });
    },
    setImages: function () {
        $('.img-load,.bg-load,.svg-load').each(function () {
            var bg = $(this).hasClass('bg-load') ? true : false,
                origClasses = $(this).attr('class'),
                data = $(this).attr('data-src');

            $(this).removeClass('img-load bg-load svg-load');

            var classes = $(this).attr('class');
            if (data !== undefined) {
                if (data.indexOf('[width]') > -1) {
                    var screensize = 1600;
                    if ($(window).width() < 1024) {
                        screensize = 1024;
                    }
                    if ($(window).width() < 768) {
                        screensize = 768;
                    }
                    $(this).attr('data-src', data.replace('[width]', screensize));
                }

                if (bg) {
                    var bgElement = $(this);
                    $('<img/>').attr('src', bgElement.attr('data-src')).on('load', function () {
                        $(this).remove();
                        bgElement.css('background-image', 'url(' + bgElement.attr('data-src') + ')');
                    });
                }
                else {
                    if (origClasses.indexOf('svg-load') > -1) {
                        var $img = $(this);
                        var imgID = $img.attr('id');
                        var imgURL = $img.attr('data-src');

                        $.get(imgURL, function (data) {
                            var $svg = $(data).find('svg');
                            $svg = $svg.attr('class', classes);
                            $svg = $svg.attr('data-src', imgURL);
                            $svg = $svg.removeAttr('xmlns:a');

                            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
                            }

                            $img.replaceWith($svg);
                        }, 'xml');
                    }
                    else {
                        $(this).replaceWith('<img class="' + classes + '" src="' + $(this).attr('data-src') + '" alt="' + $(this).attr('data-alt') + '">');
                    }
                }
            }
        });
    },
    resize: function () {

    },
    views: {
        prevArrow: '<button type="button" class="round-button slick-prev"><span class="svg-load" data-src="/images/icon-arrow.svg"></span></button>',
        nextArrow: '<button type="button" class="round-button slick-next"><span class="svg-load" data-src="/images/icon-arrow.svg"></span></button>'
    },
    models: {
        getContent: function (id, skip, take) {
            return $.ajax({
                url: '/umbraco/api/Content/GetContent?id=' + id + '&skip=' + skip + '&take=' + take,
                type: 'GET',
                context: document.body
            });
        },
        getSearch: function (searchTerm, skip, take) {
            return $.ajax({
                url: '/umbraco/api/Search/GetSearch?searchTerm=' + searchTerm + '&skip=' + skip + '&take=' + take,
                type: 'GET',
                context: document.body
            });
        },
        postForm: function (data, method) {
            return $.ajax({
                url: '/umbraco/api/Forms/' + method,
                type: 'POST',
                context: document.body,
                data: data
            });
        }
    }
};
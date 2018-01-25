/*
* Title: Blogs
* Author: Adam Southorn
* Version: 1.0
*/

var blogs = {
    skip: 0,
    take: 0,
    container: $('.boxes-blogs .boxes'),
    init: function () {
        //Blogs
        blogs.take = blogs.container.attr('data-take');
        blogs.view(blogs.skip, blogs.take);
    },
    view: function (skip, take){
        blogs.model(blogs.container.attr('data-id'), skip, take).success(function (data) {
            blogs.controller(data);
        }).fail(function (data) {
            console.log(data.responseJSON.Message);
        });
    },
    controller: function (data){
        console.log(data);

        var html = '';

        for (var i = 0; i < data.length; i++) {
            html += '<div class="boxes__box"><div class="boxes__content">' +
                '<a class="boxes__link" href="' + data[i].url + '"></a>' +
                '<span class="boxes__image bg-load" data-src="' + data[i].image + '"></span>' +
                '<div class="boxes__icon"><span class="svg-load" data-src="' + data[i].icon + '"></span></div>' +
                '<span class="timestamp">' + data[i].date + '</span>' +
                '<span class="boxes__title">' + data[i].name + '</span>' +
                '<span class="button button--secondary"><a>Read more</a></span>' +
                '</div></div>';
        }

        blogs.container.append(html);

        if (blogs.container.attr('data-scroll') === 'True') {
            blogs.container.slick({
                dots: true,
                slidesToShow: 3,
                slidesToScroll: 3,
                prevArrow: '<button type="button" class="slick-prev"><span class="svg-load" data-src="/images/icon-arrow.svg"></span></button>',
                nextArrow: '<button type="button" class="slick-next"><span class="svg-load" data-src="/images/icon-arrow.svg"></span></button>'
            });
        }
        global.setImages();
    },
    model: function (id, skip, take) {
        return $.ajax({
            url: '/umbraco/api/Content/GetContent?id=' + id + '&skip=' + skip + '&take=' + take,
            type: 'GET',
            context: document.body
        });
    }
};
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
/*
* Title: Cookiebar
* Author: Adam Southorn
* Version: 1.0
*/

var cookieBar = {
    init: function () {
        //Cookie bar
        if (localStorage.cookies === undefined) {
            try {
                localStorage.cookies = "on";
                $('.cookie-bar').slideDown();
            }
            catch (err) { }
        }

        $('.cookie-bar .button a').on('click touch', function () {
            $('.cookie-bar').slideUp();
            return false;
        });
    }
};
/*
* Title: Recipes
* Author: Adam Southorn
* Version: 1.0
*/

var recipes = {
    skip: 0,
    take: 0,
    init: function () {
        //Recipes
        recipes.take = $('.boxes-recipes .boxes').attr('data-take');
        recipes.view(recipes.skip, recipes.take);
    },
    view: function (skip, take){
        recipes.model($('.boxes-recipes .boxes').attr('data-id'), skip, take).success(function (data) {
            recipes.controller(data);
        }).fail(function (data) {
            console.log(data.responseJSON.Message);
        });
    },
    controller: function (data){
        console.log(data);

        var html = '';

        for (var i = 0; i < data.length; i++) {
            html += '<div class="boxes__box"><div class="boxes__content">' +
                '<a class="boxes__link" href="' + data[i].url + '"></a>' +
                '<span class="boxes__image bg-load" data-src="' + data[i].image + '"></span>' +
                '<div class="boxes__icon"><span class="svg-load" data-src="' + data[i].icon + '"></span></div>' +
                '<span class="boxes__title">' + data[i].name + '</span>' +
                '<span class="button button--secondary"><a>Read more</a></span>' +
                '</div></div>';
        }

        $('.boxes-recipes .boxes').append(html);

        if ($('.boxes-recipes .boxes').attr('data-scroll') === 'True') {
            $('.boxes-recipes .boxes').slick({
                dots: true,
                slidesToShow: 3,
                slidesToScroll: 3,
                prevArrow: '<button type="button" class="slick-prev"><span class="svg-load" data-src="/images/icon-arrow.svg"></span></button>',
                nextArrow: '<button type="button" class="slick-next"><span class="svg-load" data-src="/images/icon-arrow.svg"></span></button>'
            });
        }
        global.setImages();
    },
    model: function (id, skip, take) {
        return $.ajax({
            url: '/umbraco/api/Content/GetContent?id=' + id + '&skip=' + skip + '&take=' + take,
            type: 'GET',
            context: document.body
        });
    }
};
/*
* Title: Services
* Author: Adam Southorn
* Version: 1.0
*/

var services = {
    skip: 0,
    take: 0,
    container: $('.boxes-services .boxes'),
    init: function () {
        //Services
        services.take = services.container.attr('data-take');
        services.view(services.skip, services.take);
    },
    view: function (skip, take) {
        services.model(services.container.attr('data-id'), skip, take).success(function (data) {
            services.controller(data);
        }).fail(function (data) {
            console.log(data.responseJSON.Message);
        });
    },
    controller: function (data) {
        console.log(data);

        var html = '';
        var style = $('.boxes-services--service').length ? ' button--secondary' : '';

        for (var i = 0; i < data.length; i++) {
            html += '<div class="boxes__box"><div class="boxes__content">' +
                '<a class="boxes__link" href="' + data[i].url + '"></a>' +
                '<div class="boxes__icon"><span class="svg-load" data-src="/images/icon-cancer.svg"></span></div>' +
                '<span class="boxes__title">' + data[i].name + '</span>' +
                '<p>Cancer is a complicated illness. There are many different types of cancer and prognosis can vary enormously between individuals. We all know someone who has been diagnosed with cancer and sadly, it’s becoming more common.</p>' +
                '<span class="button' + style +'"><a>Read more</a></span>' +
                '</div></div>';
        }

        services.container.append(html);

        if (services.container.attr('data-scroll') === 'True') {
            services.container.slick({
                dots: true,
                slidesToShow: 3,
                slidesToScroll: 3,
                prevArrow: '<button type="button" class="slick-prev"><span class="svg-load" data-src="/images/icon-arrow.svg"></span></button>',
                nextArrow: '<button type="button" class="slick-next"><span class="svg-load" data-src="/images/icon-arrow.svg"></span></button>'
            });
        }
        global.setImages();
    },
    model: function (id, skip, take) {
        return $.ajax({
            url: '/umbraco/api/Content/GetContent?id=' + id + '&skip=' + skip + '&take=' + take,
            type: 'GET',
            context: document.body
        });
    }
};
/*
* Title: Treatments
* Author: Adam Southorn
* Version: 1.0
*/

var treatments = {
    skip: 0,
    take: 0,
    container: $('.boxes-treatments .boxes'),
    init: function () {
        //Treatments
        treatments.take = treatments.container.attr('data-take');
        treatments.view(treatments.skip, treatments.take);
    },
    view: function (skip, take){
        treatments.model(treatments.container.attr('data-id'), skip, take).success(function (data) {
            treatments.controller(data);
        }).fail(function (data) {
            console.log(data.responseJSON.Message);
        });
    },
    controller: function (data){
        console.log(data);

        var html = '';

        for (var i = 0; i < data.length; i++) {
            html += '<div class="boxes__box"><div class="boxes__content">' +
                '<a class="boxes__link" href="' + data[i].url + '"></a>' +
                '<div class="boxes__icon"><span class="svg-load" data-src="' + data[i].icon + '"></span></div>' +
                '<span class="boxes__title">' + data[i].name + '</span>' +
                '<p>Cancer is a complicated illness. There are many different types of cancer and prognosis can vary enormously between individuals. We all know someone who has been diagnosed with cancer and sadly, it’s becoming more common.</p>' +
                '<span class="button button--secondary"><a>Read more</a></span>' +
                '</div></div>';
        }

        treatments.container.append(html);

        if (treatments.container.attr('data-scroll') === 'True') {
            treatments.container.slick({
                dots: true,
                slidesToShow: 3,
                slidesToScroll: 3,
                prevArrow: '<button type="button" class="slick-prev"><span class="svg-load" data-src="/images/icon-arrow.svg"></span></button>',
                nextArrow: '<button type="button" class="slick-next"><span class="svg-load" data-src="/images/icon-arrow.svg"></span></button>'
            });
        }
        global.setImages();
    },
    model: function (id, skip, take) {
        return $.ajax({
            url: '/umbraco/api/Content/GetContent?id=' + id + '&skip=' + skip + '&take=' + take,
            type: 'GET',
            context: document.body
        });
    }
};
/*
* Title: Main JS
* Author: Adam Southorn
* Version: 1.0
*/

var global = {
    init: function () {
        global.ui();
        global.setImages();
        if ($('form').length) {
            global.forms();
        }
        global.resize();
        //$(window).on('resize', function (e) {
        //    views.resize();
        //});
    },
    ui: function () {
        $('.section__indicator button').click(function () {
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
    forms: function () {
        $('form').submit(function (e) {
            var form = $(this);

            if (!views.validateForms(form)) {
                e.preventDefault();
                return false;
            }

            form.find('.error-text').hide();

            form.addClass('form--loading');

            try {
                models.form(form.serialize(), form.attr('data-method')).success(function (data) {
                    controllers.form(data, form);
                }).fail(function (data) {
                    console.log(data.responseJSON.Message);
                    form.find('.error-text').show();
                    form.removeClass('form--loading');
                });
            }
            catch (ex) {
                console.log(ex);
                console.log('form post failed');
                form.find('.error-text').show();
                form.removeClass('form--loading');
            }

            e.preventDefault();
        });

        $('body').on('change', '.field--error input', function () {
            var form = $(this).parents('form');
            views.validateForms(form);
        });
    },
    validateForms: function (form) {
        var result = true;

        form.find('.email').each(function () {
            if (views.validateEmail($(this).val()) === false) {
                result = false;
                $(this).parents('.form__field').addClass('form__field--error').find('.validation').text('Email address is not valid');
            }
            else {
                $(this).parents('.form__field').removeClass('form__field--error').find('.validation').text('');
            }
        });

        form.find('.required').each(function () {
            if ($(this).val() === "") {
                result = false;
                $(this).parents('.form__field').addClass('form__field--error').find('.validation').text('This field is required');
            }
            else {
                $(this).parents('.form__field').removeClass('form__field--error').find('.validation').text('');
            }
        });

        form.find('.phone').each(function () {
            if (views.validatePhone($(this).val()) === false) {
                result = false;
                $(this).parents('.form__field').addClass('form__field--error').find('.validation').text('Telephone number is not valid');
            }
            else {
                $(this).parents('.form__field').removeClass('form__field--error').find('.validation').text('');
            }
        });

        form.find('.field--error').eq(0).find('input').focus();

        return result;
    },
    validateEmail: function (val) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(val);
    },
    validatePhone: function (val) {
        var re = /^[0-9]+$/;
        return re.test(val);
    }
};
global.init();
cookieBar.init();
if ($('.content-scroller').length) {
    contentScroller.init();
}
if ($('.boxes-treatments').length) {
    treatments.init();
}
if ($('.boxes-services').length) {
    services.init();
}
if ($('.boxes-blogs').length) {
    blogs.init();
}
if ($('.boxes-recipes').length) {
    recipes.init();
}
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
        views.setImages();
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
* Title: Treatments
* Author: Adam Southorn
* Version: 1.0
*/

var treatments = {
    skip: 0,
    take: 0,
    init: function () {
        //Treatments
        treatments.take = $('.treatments').attr('data-take');
        treatments.view(treatments.skip, treatments.take);
    },
    view: function (skip, take){
        treatments.model($('.treatments').attr('data-id'), skip, take).success(function (data) {
            treatments.controller(data);
        }).fail(function (data) {
            console.log(data.responseJSON.Message);
        });
    },
    controller: function (data){
        console.log(data);

        var html = '';

        for (var i = 0; i < data.length; i++) {
            html += '<div class="boxes__box"><div class="boxes__content"><a class="boxes__link" href="' + data[i].url + '"></a><h3>' + data[i].name + '</h3></div></div>';
        }

        $('.boxes').append(html);

        if ($('.treatments').attr('data-scroll') === 'True') {
            $('.treatments').slick({
                dots: true,
                slidesToShow: 3,
                slidesToScroll: 3,
                prevArrow: '<button type="button" class="slick-prev"><span class="svg-load" data-src="/images/icon-arrow.svg"></span></button>',
                nextArrow: '<button type="button" class="slick-next"><span class="svg-load" data-src="/images/icon-arrow.svg"></span></button>'
            });
        }
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

var views = {
    init: function () {
        views.ui();
        views.setImages();
        if ($('form').length) {
            views.forms();
        }
        views.resize();
        //$(window).on('resize', function (e) {
        //    views.resize();
        //});
    },
    ui: function () {
        $('.switch a').click(function () {
            $('.mailer__content').toggleClass('hidden');
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
views.init();
cookieBar.init();
contentScroller.init();
treatments.init();
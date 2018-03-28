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

        $('.load-more').click(function () {
            blogs.skip += blogs.take;
            blogs.view(blogs.skip, blogs.take);
            return false;
        });
    },
    view: function (skip, take){
        global.models.getContent(blogs.container.attr('data-id'), skip, take, blogs.container.attr('data-search')).success(function (data) {
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
                '<div class="boxes__icon icon"><span class="svg-load" data-src="' + data[i].icon + '"></span></div>' +
                '<span class="boxes__timestamp timestamp">' + data[i].date + '</span>' +
                '<span class="boxes__title">' + data[i].name + '</span>' +
                '<span class="button button--secondary"><a>Read more</a></span>' +
                '</div></div>';
        }

        if ($('.load-more').length) {
            if (data.length < blogs.take) {
                $('.section__indicator').remove();
            }
        }

        blogs.container.append(html).addClass('boxes--loaded');

        if (blogs.container.attr('data-scroll') === 'True') {
            blogs.container.slick(global.views.slickSettings);
        }
        global.setImages();
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
            prevArrow: global.views.slickSettings.prevArrow,
            nextArrow: global.views.slickSettings.nextArrow
        });
        global.setImages();
    }
};
/*
* Title: Controls
* Author: Adam Southorn
* Version: 1.0
*/

var controls = {
    init: function () {
        //Controls
        
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
/*
* Title: Recipes
* Author: Adam Southorn
* Version: 1.0
*/

var recipes = {
    skip: 0,
    take: 0,
    container: $('.boxes-recipes .boxes'),
    init: function () {
        //Recipes
        recipes.take = recipes.container.attr('data-take');
        recipes.view(recipes.skip, recipes.take);

        $('.filter a').click(function () {
            $('.filter li').removeClass('active');
            $(this).parent().addClass('active');

            recipes.container.attr('data-filter', $(this).attr('data-filter'));

            recipes.skip = 0;

            global.boxes.reset();

            recipes.view(recipes.skip, recipes.take);

            return false;
        });

        $('.load-more').click(function () {
            recipes.skip += recipes.take;
            recipes.view(recipes.skip, recipes.take);
            return false;
        });
    },
    view: function (skip, take) {
        global.models.getContent(recipes.container.attr('data-id'), skip, take, recipes.container.attr('data-search'), recipes.container.attr('data-filter')).success(function (data) {
            recipes.controller(data);
        }).fail(function (data) {
            console.log(data.responseJSON.Message);
        });
    },
    controller: function (data) {
        console.log(data);

        var html = '';

        for (var i = 0; i < data.length; i++) {
            html += '<div class="boxes__box"><div class="boxes__content">' +
                '<a class="boxes__link" href="' + data[i].url + '"></a>' +
                '<span class="boxes__image bg-load" data-src="' + data[i].image + '"></span>' +
                '<div class="boxes__icon icon"><span class="svg-load" data-src="' + data[i].icon + '"></span></div>' +
                '<span class="boxes__title">' + data[i].name + '</span>' +
                '<span class="button button--secondary"><a>Read more</a></span>' +
                '</div></div>';
        }

        if ($('.load-more').length) {
            if (data.length < recipes.take) {
                $('.section__indicator').remove();
            }
        }

        recipes.container.append(html).addClass('boxes--loaded');

        if (recipes.container.attr('data-scroll') === 'True') {
            recipes.container.slick(global.views.slickSettings);
        }
        global.setImages();
    }
};
/*
* Title: Reviews
* Author: Adam Southorn
* Version: 1.0
*/

var reviews = {
    container: $('.boxes-reviews .boxes'),
    init: function () {
        reviews.container.googlePlaces({
            placeId: 'ChIJh5YWhNQadkgRqetJi1V1Yck',
            render: ['reviews'],
            min_rating: 4,
            max_rows: 5
        });

        var checkBoxesBeforeSlick = setInterval(function () {
            if ($('.boxes__stars').length) {
                clearInterval(checkBoxesBeforeSlick);
                reviews.container.slick(global.views.slickSettings);
                global.setImages();
            }
        }, 100);
    }
};
/*
* Title: Search
* Author: Adam Southorn
* Version: 1.0
*/

var search = {
    skip: 0,
    take: 0,
    container: $('.search-results'),
    init: function () {
        //Search
        search.take = search.container.attr('data-take');
        search.view(search.skip, search.take);

        $('.load-more').click(function () {
            search.skip += search.take;
            search.view(search.skip, search.take);
            return false;
        });
    },
    view: function (skip, take) {
        global.models.getSearch(search.container.attr('data-searchTerm'), skip, take).success(function (data) {
            search.controller(data);
        }).fail(function (data) {
            console.log(data.responseJSON.Message);
        });
    },
    controller: function (data) {
        console.log(data);

        var html = '';

        for (var i = 0; i < data.length; i++) {
            html += '<div class="search-results__result">' +
                '<h2><a href="' + data[i].url + '">' + data[i].name + '</a></h2>' +
                    data[i].content +
                    '<span class="search-results__timestamp timestamp">' + data[i].date + '</span>' +
                    '<span class="search-results__link"><a href="' + data[i].url + '">Read more</a></span>' +
                '</div>';
        }

        if ($('.load-more').length) {
            if (data.length < search.take) {
                $('.section__indicator').remove();
            }
        }

        search.container.append(html);
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
        global.models.getContent(services.container.attr('data-id'), skip, take, services.container.attr('data-search')).success(function (data) {
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
                '<div class="boxes__icon icon"><span class="svg-load" data-src="' + data[i].icon + '"></span></div>' +
                '<span class="boxes__title">' + data[i].name + '</span>' +
                data[i].content +
                '<span class="button' + style +'"><a>Read more</a></span>' +
                '</div></div>';
        }

        services.container.append(html).addClass('boxes--loaded');

        if (services.container.attr('data-scroll') === 'True') {
            services.container.slick(global.views.slickSettings);
        }
        global.setImages();
    }
};
/*
* Title: Team
* Author: Adam Southorn
* Version: 1.0
*/

var team = {
    skip: 0,
    take: 0,
    container: $('.boxes-team .boxes'),
    init: function () {
        //Team
        team.take = team.container.attr('data-take');
        team.view(team.skip, team.take);

        $('.filter a').click(function () {
            $('.filter li').removeClass('active');
            $(this).parent().addClass('active');

            team.container.attr('data-filter', $(this).attr('data-filter'));

            team.skip = 0;

            global.boxes.reset();

            team.view(team.skip, team.take);

            return false;
        });
    },
    view: function (skip, take){
        global.models.getContent(team.container.attr('data-id'), skip, take, "", team.container.attr('data-filter')).success(function (data) {
            team.controller(data);
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
                '<div class="boxes__icon icon"><span class="svg-load" data-src="' + data[i].icon + '"></span></div>' +
                '<span class="boxes__title">' + data[i].name + '</span>' +
                '<span class="boxes__subtitle">' + data[i].content + '</span>' +
                '<span class="button button--secondary"><a>About me</a></span>' +
                '</div></div>';
        }

        team.container.append(html).addClass('boxes--loaded');

        if (team.container.attr('data-scroll') === 'True') {
            team.container.slick(global.views.slickSettings);
        }
        global.setImages();
    }
};
/*
* Title: Testimonials
* Author: Adam Southorn
* Version: 1.0
*/

var testimonials = {
    skip: 0,
    take: 0,
    container: $('.boxes-testimonials .boxes'),
    init: function () {
        //Testimonials
        testimonials.take = testimonials.container.attr('data-take');
        testimonials.view(testimonials.skip, testimonials.take);
    },
    view: function (skip, take) {
        global.models.getContent(testimonials.container.attr('data-id'), skip, take).success(function (data) {
            testimonials.controller(data);
        }).fail(function (data) {
            console.log(data.responseJSON.Message);
        });
    },
    controller: function (data) {
        console.log(data);

        var html = '';

        for (var i = 0; i < data.length; i++) {
            html += '<div class="boxes__box"><div class="boxes__content">' +
                '<span class="boxes__image bg-load" data-src="' + data[i].image + '"></span>' +
                '<div class="boxes__icon boxes__icon--small"><span class="svg-load" data-src="/images/icon-quote.svg"></span></div>' +
                '<span class="boxes__title">' + data[i].name + '</span>' +
                '<p>' + data[i].content + '</p>' +
                '<span class="boxes__foot">' + data[i].title + '</span>' +
                '</div></div>';
        }

        testimonials.container.append(html).addClass('boxes--loaded');

        if (testimonials.container.attr('data-scroll') === 'True') {
            testimonials.container.slick(global.views.slickSettings);
        }
        global.setImages();
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
        global.models.getContent(treatments.container.attr('data-id'), skip, take, treatments.container.attr('data-search')).success(function (data) {
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
                '<div class="boxes__icon icon"><span class="svg-load" data-src="' + data[i].icon + '"></span></div>' +
                '<span class="boxes__title">' + data[i].name + '</span>' +
                data[i].content +
                '<span class="button button--secondary"><a>Read more</a></span>' +
                '</div></div>';
        }

        treatments.container.append(html).addClass('boxes--loaded');

        if (treatments.container.attr('data-scroll') === 'True') {
            treatments.container.slick(global.views.slickSettings);
        }
        global.setImages();
    }
};
/*
* Title: Forms JS
* Author: Adam Southorn
* Version: 1.0
*/

var forms = {
    init: function () {
        $('.ajax').submit(function (e) {
            var form = $(this);

            if (form.hasClass('no-submit')) {
                e.preventDefault();
                return false;
            }

            if (!forms.validateForms(form)) {
                e.preventDefault();
                return false;
            }

            form.find('.error-text').hide();

            form.addClass('form--loading');

            try {
                global.models.postForm(form.serialize(), form.attr('data-method')).success(function (data) {
                    forms.controller(data, form);
                }).fail(function (data) {
                    console.log(data);
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

        $('body').on('change', '.form__field--error input', function () {
            var form = $(this).parents('form');
            forms.validateForms(form); 
        });
    },
    controller: function (data, form) {
        if (data === "success") {
            form.addClass('form--complete');
            form.addClass('no-submit');
        }
        form.removeClass('form--loading');
        //LCN FOOTER FORM
        if ($('.form-label').length) {
            $('.required').attr('readonly', 'true').val('Thanks for signing up!');

            form.find('button').addClass('round-button--tick').empty().html('<span class="svg-load" data-src="/images/icon-tick.svg"></span>');
            global.setImages();
        }
        //LCN FOOTER FORM
    },
    validateForms: function (form) {
        var result = true;

        form.find('.email').each(function () {
            if ($(this).val() !== "") {
                if (forms.validateEmail($(this).val()) === false) {
                    result = false;
                    $(this).parents('.form__field').addClass('form__field--error').find('.form__validation').text('Email address is not valid');
                }
                else {
                    $(this).parents('.form__field').removeClass('form__field--error').find('.form__validation').text('');
                }
                //LCN FOOTER FORM
                if ($('.form-label').length) {
                    if (forms.validateEmail($(this).val()) === false) {
                        $('.form-label').text('Email address is not valid');
                    }
                    else {
                        $('.form-label').text('');
                    }
                }
                //LCN FOOTER FORM
            }
        });

        form.find('.required').each(function () {
            if ($(this).val() === "") {
                result = false;
                $(this).parents('.form__field').addClass('form__field--error').find('.form__validation').text('This field is required');
            }
            else {
                $(this).parents('.form__field').removeClass('form__field--error').find('.form__validation').text('');
            }
        });

        form.find('.phone').each(function () {
            if ($(this).val() !== "") {
                if (forms.validatePhone($(this).val()) === false) {
                    result = false;
                    $(this).parents('.form__field').addClass('form__field--error').find('.form__validation').text('Telephone number is not valid');
                }
                else {
                    $(this).parents('.form__field').removeClass('form__field--error').find('..form__validation').text('');
                }
            }
        });

        form.find('.form__field--error').eq(0).find('input').focus();

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

        $('div.star-list li').each(function () {
            $(this).prepend('<span class="svg-load" data-src="/images/icon-star.svg"></span>');
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
    boxes: {
        reset: function () {
            $('.boxes').removeClass('boxes--loaded').empty();
        }
    },
    views: {
        slickSettings: {
            dots: true,
            centerMode: true,
            variableWidth: true,
            prevArrow: '<button type="button" class="round-button slick-prev"><span class="svg-load" data-src="/images/icon-arrow.svg"></span></button>',
            nextArrow: '<button type="button" class="round-button slick-next"><span class="svg-load" data-src="/images/icon-arrow.svg"></span></button>'
        }
    },
    models: {
        getContent: function (id, skip, take, searchTerm, filter) {
            searchTerm = searchTerm === undefined ? "" : searchTerm;
            filter = filter === undefined ? "" : filter;

            return $.ajax({
                url: '/umbraco/api/Content/GetContent?id=' + id + '&skip=' + skip + '&take=' + take + '&searchTerm=' + searchTerm + '&filter=' + filter,
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
                url: '/umbraco/api/' + method,
                type: 'POST',
                context: document.body,
                data: data
            });
        }
    }
};
global.init();
cookieBar.init();
header.init();
overlay.init();

if ($('.form').length) {
    forms.init();
}
if ($('.content-scroller').length) {
    contentScroller.init();
}
if ($('.controls').length) {
    controls.init();
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
if ($('.boxes-team').length) {
    team.init();
}
if ($('.boxes-reviews').length) {
    reviews.init();
}
if ($('.boxes-testimonials').length) {
    testimonials.init();
}
if ($('.search-results').length) {
    search.init();
}
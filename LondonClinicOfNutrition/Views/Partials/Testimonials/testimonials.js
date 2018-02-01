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

        testimonials.container.append(html);

        if (testimonials.container.attr('data-scroll') === 'True') {
            testimonials.container.slick({
                dots: true,
                slidesToShow: 3,
                slidesToScroll: 3,
                prevArrow: global.views.prevArrow,
                nextArrow: global.views.nextArrow
            });
        }
        global.setImages();
    }
};
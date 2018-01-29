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
                prevArrow: '<button type="button" class="round-button slick-prev"><span class="svg-load" data-src="/images/icon-arrow.svg"></span></button>',
                nextArrow: '<button type="button" class="round-button slick-next"><span class="svg-load" data-src="/images/icon-arrow.svg"></span></button>'
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
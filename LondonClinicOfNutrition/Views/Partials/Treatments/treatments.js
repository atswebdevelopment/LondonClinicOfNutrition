﻿/*
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
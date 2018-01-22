﻿/*
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
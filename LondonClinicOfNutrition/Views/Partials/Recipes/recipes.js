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
                '<div class="boxes__icon"><span class="svg-load" data-src="/images/icon-cancer.svg"></span></div>' +
                '<h3>' + data[i].name + '</h3>' +
                '<span class="button"><a>Read more</a></span>' +
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
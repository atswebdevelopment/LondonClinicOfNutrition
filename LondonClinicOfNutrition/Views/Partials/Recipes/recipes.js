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
    },
    view: function (skip, take) {
        global.models.getContent(recipes.container.attr('data-id'), skip, take).success(function (data) {
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

        recipes.container.append(html);

        if (recipes.container.attr('data-scroll') === 'True') {
            recipes.container.slick(global.views.slickSettings);
        }
        global.setImages();
    }
};
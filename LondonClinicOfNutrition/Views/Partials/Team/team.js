/*
* Title: Team
* Author: Adam Southorn
* Version: 1.0
*/

var team = {
    skip: 0,
    take: 0,
    init: function () {
        //Team
        team.take = $('.boxes-team .boxes').attr('data-take');
        team.view(team.skip, team.take);
    },
    view: function (skip, take){
        global.models.getContent($('.boxes-team .boxes').attr('data-id'), skip, take).success(function (data) {
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
                '<div class="boxes__icon"><span class="svg-load" data-src="' + data[i].icon + '"></span></div>' +
                '<span class="boxes__title">' + data[i].name + '</span>' +
                '<span class="boxes__subtitle">' + data[i].content + '</span>' +
                '<span class="button button--secondary"><a>About me</a></span>' +
                '</div></div>';
        }

        $('.boxes-team .boxes').append(html);

        if ($('.boxes-team .boxes').attr('data-scroll') === 'True') {
            $('.boxes-team .boxes').slick({
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
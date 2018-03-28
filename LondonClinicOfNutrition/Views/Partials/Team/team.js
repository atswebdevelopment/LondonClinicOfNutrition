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
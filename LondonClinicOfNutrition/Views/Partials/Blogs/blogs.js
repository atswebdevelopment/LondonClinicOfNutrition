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
        global.models.getContent(blogs.container.attr('data-id'), skip, take).success(function (data) {
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

        blogs.container.append(html);

        if (blogs.container.attr('data-scroll') === 'True') {
            blogs.container.slick(global.views.slickSettings);
        }
        global.setImages();
    }
};
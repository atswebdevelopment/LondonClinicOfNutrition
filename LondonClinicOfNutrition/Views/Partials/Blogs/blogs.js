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
    },
    view: function (skip, take){
        blogs.model(blogs.container.attr('data-id'), skip, take).success(function (data) {
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
                '<div class="boxes__icon"><span class="svg-load" data-src="' + data[i].icon + '"></span></div>' +
                '<span class="timestamp">' + data[i].date + '</span>' +
                '<h3>' + data[i].name + '</h3>' +
                '<span class="button button--secondary"><a>Read more</a></span>' +
                '</div></div>';
        }

        blogs.container.append(html);

        if (blogs.container.attr('data-scroll') === 'True') {
            blogs.container.slick({
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
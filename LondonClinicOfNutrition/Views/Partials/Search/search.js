/*
* Title: Search
* Author: Adam Southorn
* Version: 1.0
*/

var search = {
    skip: 0,
    take: 0,
    container: $('.search-results'),
    init: function () {
        //Search
        search.take = search.container.attr('data-take');
        search.view(search.skip, search.take);

        $('.load-more').click(function () {
            search.skip += search.take;
            search.view(search.skip, search.take);
            return false;
        });
    },
    view: function (skip, take) {
        global.models.getSearch(search.container.attr('data-searchTerm'), skip, take).success(function (data) {
            search.controller(data);
        }).fail(function (data) {
            console.log(data.responseJSON.Message);
        });
    },
    controller: function (data) {
        console.log(data);

        var html = '';

        for (var i = 0; i < data.length; i++) {
            html += '<div class="search-results__result">' +
                '<h2><a href="' + data[i].url + '">' + data[i].name + '</a></h2>' +
                    data[i].content +
                    '<span class="search-results__timestamp timestamp">' + data[i].date + '</span>' +
                    '<span class="search-results__link"><a href="' + data[i].url + '">Read more</a></span>' +
                '</div>';
        }

        if ($('.load-more').length) {
            if (data.length < search.take) {
                $('.section__indicator').remove();
            }
        }

        search.container.append(html);
    }
};
/*
* Title: Reviews
* Author: Adam Southorn
* Version: 1.0
*/

var reviews = {
    container: $('.boxes-reviews .boxes'),
    init: function () {
        reviews.container.googlePlaces({
            placeId: 'ChIJh5YWhNQadkgRqetJi1V1Yck',
            render: ['reviews'],
            min_rating: 4,
            max_rows: 5
        });

        var checkBoxesBeforeSlick = setInterval(function () {
            if ($('.boxes__stars').length) {
                clearInterval(checkBoxesBeforeSlick);
                reviews.container.slick(global.views.slickSettings);
                global.setImages();
            }
        }, 100);
    }
};
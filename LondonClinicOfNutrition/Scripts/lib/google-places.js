/* https://github.com/peledies/google-places */
(function($) {

    $.googlePlaces = function(element, options) {

        var defaults = {
              placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4' // placeId provided by google api documentation
            , render: ['reviews']
            , min_rating: 0
            , max_rows: 0
            , rotateTime: false
        };

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
             element = element;

        plugin.init = function() {
          plugin.settings = $.extend({}, defaults, options);
          $('body').append("<div id='map-plug'></div>"); // create a plug for google to load data into
          initialize_place(function(place){
            plugin.place_data = place;
            // render specified sections
            if(plugin.settings.render.indexOf('reviews') > -1){
              renderReviews(plugin.place_data.reviews);
              if(!!plugin.settings.rotateTime) {
                  initRotation();
              }
            }
          });
        }

        var initialize_place = function(c){
          var map = new google.maps.Map(document.getElementById('map-plug'));

          var request = {
            placeId: plugin.settings.placeId
          };

          var service = new google.maps.places.PlacesService(map);

          service.getDetails(request, function(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
              c(place);
            }
          });
        }

        var sort_by_date = function(ray) {
          ray.sort(function(a, b){
            var keyA = new Date(a.time),
            keyB = new Date(b.time);
            // Compare the 2 dates
            if(keyA < keyB) return -1;
            if(keyA > keyB) return 1;
            return 0;
          });
          return ray;
        }

        var filter_minimum_rating = function(reviews){
          for (var i = reviews.length -1; i >= 0; i--) {
            if(reviews[i].rating < plugin.settings.min_rating){
              reviews.splice(i,1);
            }
          }
          return reviews;
        }

        var renderReviews = function(reviews){
          reviews = sort_by_date(reviews);
          reviews = filter_minimum_rating(reviews);
          var html = "";
          var row_count = (plugin.settings.max_rows > 0)? plugin.settings.max_rows - 1 : reviews.length - 1;
          // make sure the row_count is not greater than available records
          row_count = (row_count > reviews.length-1)? reviews.length -1 : row_count;
          for (var i = row_count; i >= 0; i--) {
            var stars = renderStars(reviews[i].rating);
            var date = convertTime(reviews[i].time);
            var readmore = 'https://www.google.co.uk/search?q=london+clinic+of+nutrition+reviews&oq=london+clinic+of+&aqs=chrome.3.69i57j69i60j69i61j0j69i61j69i59.5691j0j7&sourceid=chrome&ie=UTF-8#lrd=0x48761ad484169687:0xc96175558b49eba9,1,,,';
            html = html + "<div class='boxes__box'><div class='boxes__content'><a class='boxes__link' href='" + readmore + "' target='_blank'></a><span class='boxes__username'>" + reviews[i].author_name + "</span>" + stars + "<p>" + reviews[i].text + "</p><span class='button button--secondary'><a href='" + readmore + "' target='_blank'>Read more</a></span></div></div>"
          };
          $element.append(html);
        }

        //html = html + "<div class='boxes__box'><div class='boxes__content'><div class='review-meta'><span class='review-author'>"+reviews[i].author_name+"</span><span class='review-sep'>, </span><span class='review-date'>"+date+"</span></div>"+stars+"<p>"+reviews[i].text+"</p></div></div>"

        var initRotation = function() {
            var $reviewEls = $element.children('.review-item');
            var currentIdx = $reviewEls.length > 0 ? 0 : false;
            $reviewEls.hide();
            if(currentIdx !== false) {
                $($reviewEls[currentIdx]).show();
                setInterval(function(){ 
                    if(++currentIdx >= $reviewEls.length) {
                        currentIdx = 0;
                    }
                    $reviewEls.hide();
                    $($reviewEls[currentIdx]).fadeIn('slow');
                }, plugin.settings.rotateTime);
            }
        }

        var renderStars = function(rating){
          var stars = "<ul class='boxes__stars'>";
                            
          // fill in gold stars
          for (var i = 0; i < rating; i++) {
              stars = stars +"<li class='boxes__star star'><span class='svg-load' data-src='/images/icon-star.svg'></span></li>";
          };

          // fill in empty stars
          if(rating < 5){
            for (var i = 0; i < (5 - rating); i++) {
                stars = stars +"<li class='boxes__star star boxes__star--inactive'><span class='svg-load' data-src='/images/icon-star.svg'></span></li>";
            };
          }
          stars = stars+"</ul>";
          return stars;
        }

        var convertTime = function(UNIX_timestamp){
          var a = new Date(UNIX_timestamp * 1000);
          var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var time = months[a.getMonth()] + ' ' + a.getDate() + ', ' + a.getFullYear();
          return time;
        }

        plugin.init();

    }

    $.fn.googlePlaces = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('googlePlaces')) {
                var plugin = new $.googlePlaces(this, options);
                $(this).data('googlePlaces', plugin);
            }
        });

    }

})(jQuery);
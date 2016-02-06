$(function(){

    $('.btn-up').on({
        'click':function(){
            $('html, body').animate({scrollTop: 0}, 600);
        }

    });

    $('.swiper-container').each(function () {
        Slider($(this));
    });

    $(window).on({
        'scroll':function(){
            if($(window).scrollTop() > $(window).height()){
                $('.btn-up').fadeIn();
            } else {
                $('.btn-up').fadeOut();
            }
            if($(window).scrollTop() + $(window).height() > $('.site__footer').offset().top + 16) {
                $('.btn-up').css({ bottom: $(window).scrollTop() + $(window).height() - $('.site__footer').offset().bottom + 55 });
            } else {
                $('.btn-up').css({ bottom: '70px' });
            }
        }
    });

    $('.menu__btn').on({
        'click':function(){
            var curElem = $(this).parent();

            if (curElem.hasClass('active')) {
                curElem.removeClass('active');
                $('menu__btn').removeClass('active_btn');

            } else {
                curElem.addClass('active');
                $('menu__btn').addClass('active_btn');
            }

        }
    });

    $( ".popular-last" ).click(function() {
        $( ".site__aside__popular ul li" ).css('display', 'block');
        $( ".popular-last").css('display', 'none');
        return false;
    });

} );

var Slider = function (obj) {

    //private properties
    var _self = this,
        _next = obj.find($('.swiper-button-next')),
        _prev = obj.find($('.swiper-button-prev')),
        _obj = obj;

    //private methods
    var _addEvents = function () {

        },
        _init = function () {
            _addEvents();
        };
    if (_obj.hasClass('review-slider__wrap')) {
        var _swiperPromo = new Swiper(_obj, {
            nextButton: _next,
            prevButton: _prev,
            slidesPerView: 5,
            spaceBetween: 0,
            loop: false,
            breakpoints: {

                1024: {
                    slidesPerView: 5
                },
                768: {
                    slidesPerView: 3
                }
            }


        });

    }
    if (_obj.hasClass('container_wrap')) {
        var _slider = new Swiper(_obj, {
            nextButton: '.slider_next',
            prevButton: '.slider_prev',
            spaceBetween: 0,
            loop: false,
            loopedSlides: 3,
            slidesPerView: 6

        });

    }

    //public properties

    //public methods

    _init();
};

$(window).on({
    load: function () {
        
    }
});
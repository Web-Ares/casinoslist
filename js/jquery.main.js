$(function(){

    $('.links').each(function () {

        if($(window).width() > 1024){
            $('.links').each(function () {
                var curItem = $(this),
                    curData = curItem.data('colvisible-desktop')-1;
                $(this).find(".links__item:gt("+curData+")").addClass('links__item-none');
            });
        } else {
            var curItem = $(this),
                curData = curItem.data('colvisible-mobile') - 1;
            $(this).find(".links__item:gt(" + curData + ")").addClass('links__item-none');
        }
    });
       $( ".links__expand" ).click(function() {
        var curItem = $(this).parent(),
            curData = curItem.data('colvisible-mobile')-1;
        $(this).parent().find(".links__item:gt("+curData+")").removeClass('links__item-none');
        $(this).css('display', 'none');
        return false;
    });

    $( ".links__all" ).click(function() {
        var curItem = $(this).parent(),
            curData = curItem.data('colvisible-desktop')-1;
        $(this).parent().find(".links__item:gt("+curData+")").removeClass('links__item-none');
        $(this).css('display', 'none');
        return false;
    });


       $('.btn-up').on({
        'click':function(){
            $('html, body').animate({scrollTop: 0}, 600);
        }

    });
    var _width=$(window).width();

    $( window ).resize(function() {
        _width=$(window).width();
        if ($(".search").hasClass('search_close')) {
        $(".search__frame").css({
            "width": _width
        });
        }
    });

    $('.search__btn').on({
        'click':function(){
            $(".search__frame").toggleClass('search_visible');
            $(".search").toggleClass('search_close');
            $(".search__frame").css({
                "width": _width
            });
        }

    });

    $('.swiper-container').each(function () {
        Slider($(this));
    });

    $( ".bonus-type__fulter" ).css('display','none');

    $( ".bonus-type__all" ).click(function() {
        $( ".bonus-type__fulter" ).css('display','block');
        return false
    });
    $( ".bonus-type__cancel" ).click(function() {
        $( ".bonus-type__fulter" ).css('display','none');
        return false
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

    $( ".show-expand" ).click(function() {
        $( ".site__aside__popular ul li" ).css('display', 'block');
        $( ".popular-last").css('display', 'none');
        return false;
    });
    
    $.each( $( '#piechart' ), function(){
        new Piechart ( $( this ) )
    } );

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
            spaceBetween: 0,
            slidesPerView: 'auto',
            loopedSlides: 40,
            loop: true

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
        if (_obj.hasClass('bonus-type__slider')){
            var __slider = new Swiper(_obj, {
                direction: 'vertical',
                spaceBetween: 0,
                loop: true,
                centeredSlides: true,
                mousewheelControl: true,
                paginationClickable: true,
                loopedSlides: 5,
                slidesPerView:5

            });
        }

    //public properties

    //public methods

    _init();
};

var Piechart = function ( obj ) {

    var _self = this,
        _obj = obj,
        _window = $( window),
        _dataArray = _obj.data( 'chart');

    var _drawChart = function(){

            _self.data = google.visualization.arrayToDataTable([

                ['Task', 'PerCent' ],
                [ _dataArray.slices[0].title ,  +_dataArray.slices[0].percentage ],
                [ _dataArray.slices[1].title ,  +_dataArray.slices[1].percentage ],
                [ _dataArray.slices[2].title ,  +_dataArray.slices[2].percentage ],
                [ _dataArray.slices[3].title ,  +_dataArray.slices[3].percentage ],
                [ _dataArray.slices[4].title ,  +_dataArray.slices[4].percentage ]

            ]);

            _self.options = {
                legend: {

                    position: 'right',
                    textStyle: {
                        color: _dataArray.textColor,
                        fontName: _dataArray.fontName,
                        fontSize: _dataArray.fontSize
                    }

                },
                slices: {
                    0: { color: _dataArray.slices[0].color },
                    1: { color: _dataArray.slices[1].color },
                    2: { color: _dataArray.slices[2].color },
                    3: { color: _dataArray.slices[3].color },
                    4: { color: _dataArray.slices[4].color }
                },
                pieStartAngle: 270
            };

            _self.chart = new google.visualization.PieChart( _obj[0] );

            _self.chart.draw( _self.data, _self.options );
        },
        _events = function(){

            _window.on({
                resize: function () {

                    _self.chart.draw( _self.data, _self.options );

                }
            })

        },
        _initChart = function(){

            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(_drawChart);

        },
        _init = function () {
            _initChart();
            _events();
        };

    _init();
};
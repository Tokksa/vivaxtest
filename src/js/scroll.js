import $ from 'jquery';

$(document).ready(function() {

    var targets = $('.js-animated');
    var winHeight = $(window).height();

    $(window).scroll(function(){
        var winScrollTop = $(this).scrollTop();

        $(targets).each(function(key, val) {
            var targetPos = $(val).offset().top;
            var scrollToElem = targetPos - winHeight;

            if (winScrollTop > scrollToElem && $(val).attr('data-state') == 'wait') {
                var className = $(val).attr('data-animation');
                $(val).addClass(className);
                $(val).attr('data-state', 'done');
            }
        });

    });

});
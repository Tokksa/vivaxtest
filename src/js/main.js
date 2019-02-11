import $ from 'jquery';
import Swiper from 'swiper';
// import magnificPopup from 'magnific-popup';
// import cookie from 'jquery.cookie';

$(document).ready(function() {

  let mainSlider = new Swiper('#main-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    spaceBetween: 60,
    slideActiveClass: 'is-active',
    navigation: {
      prevEl: '#main-slider-prev',
      nextEl: '#main-slider-next',
    },
    pagination: {
      el: '#main-slider-pagination',
      type: 'bullets',
      clickable: true,
    }
  });

});
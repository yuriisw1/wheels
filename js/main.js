
//IBG
jQuery(document)[0].querySelectorAll(".ibg").forEach(el => {
   if (el.querySelector('img')) {
      el.style.backgroundImage = 'url(' + el.querySelector('img').getAttribute('src') + ')';
      el.querySelector('img').style.display = 'none';
   }
});

//accordion
jQuery(document).ready(function () {
   jQuery('.pull-up').click(function (event) {
      if (jQuery('.section').hasClass('one')) {
         jQuery('.pull-up').not(jQuery(this)).removeClass('.active');
         jQuery('.toolbar__list').not(jQuery(this).next()).slideUp(300);
      }
      jQuery(this).toggleClass('active').next().slideToggle(300);
   });
});

//--SLICK-SLIDER-OPTIONS--//		
jQuery(document).ready(function () {
   jQuery(".slider.slider-banner").slick({
      arrows: true,
      dots: true,
      autoplay: true,
      infinite: false,
      speed: 500,
   });

   jQuery(".slider.slider-catalog").slick({
      arrows: true,
      dots: false,
      autoplay: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4
   });
});
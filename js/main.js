
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


   jQuery('.header__backet').click(function (event) {
      jQuery('.hidden-basket').addClass('active');
   });
   $(document).mouseup(function (e) { // отслеживаем событие клика по веб-документу
      var block = $(".hidden-basket"); // определяем элемент, к которому будем применять условия (можем указывать ID, класс либо любой другой идентификатор элемента)
      if (!block.is(e.target) // проверка условия если клик был не по нашему блоку
         && block.has(e.target).length === 0) { // проверка условия если клик не по его дочерним элементам
         block.removeClass('active'); // если условия выполняются - скрываем наш элемент
      }
   });


   jQuery('.options-panel__button').click(function (event) {
      jQuery('.hidden-block').addClass('active');
   });
   $(document).mouseup(function (e) { // отслеживаем событие клика по веб-документу
      var block = $(".hidden-block"); // определяем элемент, к которому будем применять условия (можем указывать ID, класс либо любой другой идентификатор элемента)
      if (!block.is(e.target) // проверка условия если клик был не по нашему блоку
         && block.has(e.target).length === 0) { // проверка условия если клик не по его дочерним элементам
         block.removeClass('active'); // если условия выполняются - скрываем наш элемент
      }
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
      adaptiveHeight: true

   });

   jQuery(".slider.slider-catalog").slick({
      arrows: true,
      dots: false,
      autoplay: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      adaptiveHeight: true,
      responsive: [
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 3
            }
         },
         {
            breakpoint: 568,
            settings: {
               slidesToShow: 2
            }
         },
         {
            breakpoint: 340,
            settings: {
               slidesToShow: 1
            }
         }
      ]
   });
   //RADIO
   $.each($('.radiobuttons__item'), function (index, val) {
      if ($(this).find('input').prop('checked') == true) {
         $(this).addClass('active');
      }
   });
   $(document).on('click', '.radiobuttons__item', function (event) {
      $(this).parents('.radiobuttons').find('.radiobuttons__item').removeClass('active');
      $(this).parents('.radiobuttons').find('.radiobuttons__item input').prop('checked', false);
      $(this).toggleClass('active');
      $(this).find('input').prop('checked', true);
      return false;
   });

   $(document).ready(function () {
      $('.header__menu-burger').click(function (event) {
         $('.header__burger,.header__list,.header__menu-burger').toggleClass('active');
         $('body').toggleClass('lock');
      });



      jQuery('.tabs__content').not(":first").hide();
      jQuery('.tabs .tabs__link').click(function () {
         jQuery('.tabs .tabs__link').removeClass('active').eq($(this).index()).addClass('active');
         jQuery('.tabs__content').hide().eq($(this).index()).fadeIn()
      }).eq(0).addClass('active');

   });

   $('.image-popup-no-margins').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      fixedContentPos: true,
      mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
      image: {
         verticalFit: true
      },
      zoom: {
         enabled: true,
         duration: 300,// don't foget to change the duration also in CSS
         easing: 'ease-in-out', // CSS transition easing function
         opener: function (openerElement) {
            return openerElement.is('img') ? openerElement : openerElement.find('img');
         }
      }
   });

   $('.popup-with-form').magnificPopup({
      type: 'inline',
      preloader: false,
      focus: '#name',

      // When elemened is focused, some mobile browsers in some cases zoom in
      // It looks not nice, so we disable it:
      callbacks: {
         beforeOpen: function () {
            if ($(window).width() < 700) {
               this.st.focus = false;
            } else {
               this.st.focus = '#name';
            }
         }
      }
   });
});

function catalogItemCounter(field) {

   var fieldCount = function (el) {

      var
         // Мин. значение
         min = el.data('min') || false,

         // Макс. значение
         max = el.data('max') || false,

         // Кнопка уменьшения кол-ва
         dec = el.prev('.dec'),

         // Кнопка увеличения кол-ва
         inc = el.next('.inc');

      function init(el) {
         if (!el.attr('disabled')) {
            dec.on('click', decrement);
            inc.on('click', increment);
         }

         // Уменьшим значение
         function decrement() {
            var value = parseInt(el[0].value);
            value--;

            if (!min || value >= min) {
               el[0].value = value;
            }
         };

         // Увеличим значение
         function increment() {
            var value = parseInt(el[0].value);

            value++;

            if (!max || value <= max) {
               el[0].value = value++;
            }
         };

      }

      el.each(function () {
         init($(this));
      });
   };

   $(field).each(function () {
      fieldCount($(this));
   });
}

catalogItemCounter('.fieldCount');


"use strict";

(function () {
   let originalPositions = [];
   let daElements = document.querySelectorAll('[data-da]');
   let daElementsArray = [];
   let daMatchMedia = [];
   //Заполняем массивы
   if (daElements.length > 0) {
      let number = 0;
      for (let index = 0; index < daElements.length; index++) {
         const daElement = daElements[index];
         const daMove = daElement.getAttribute('data-da');
         if (daMove != '') {
            const daArray = daMove.split(',');
            const daPlace = daArray[1] ? daArray[1].trim() : 'last';
            const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
            const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
            const daDestination = document.querySelector('.' + daArray[0].trim())
            if (daArray.length > 0 && daDestination) {
               daElement.setAttribute('data-da-index', number);
               //Заполняем массив первоначальных позиций
               originalPositions[number] = {
                  "parent": daElement.parentNode,
                  "index": indexInParent(daElement)
               };
               //Заполняем массив элементов 
               daElementsArray[number] = {
                  "element": daElement,
                  "destination": document.querySelector('.' + daArray[0].trim()),
                  "place": daPlace,
                  "breakpoint": daBreakpoint,
                  "type": daType
               }
               number++;
            }
         }
      }
      dynamicAdaptSort(daElementsArray);

      //Создаем события в точке брейкпоинта
      for (let index = 0; index < daElementsArray.length; index++) {
         const el = daElementsArray[index];
         const daBreakpoint = el.breakpoint;
         const daType = el.type;

         daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
         daMatchMedia[index].addListener(dynamicAdapt);
      }
   }
   //Основная функция
   function dynamicAdapt(e) {
      for (let index = 0; index < daElementsArray.length; index++) {
         const el = daElementsArray[index];
         const daElement = el.element;
         const daDestination = el.destination;
         const daPlace = el.place;
         const daBreakpoint = el.breakpoint;
         const daClassname = "_dynamic_adapt_" + daBreakpoint;

         if (daMatchMedia[index].matches) {
            //Перебрасываем элементы
            if (!daElement.classList.contains(daClassname)) {
               let actualIndex = indexOfElements(daDestination)[daPlace];
               if (daPlace === 'first') {
                  actualIndex = indexOfElements(daDestination)[0];
               } else if (daPlace === 'last') {
                  actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
               }
               daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
               daElement.classList.add(daClassname);
            }
         } else {
            //Возвращаем на место
            if (daElement.classList.contains(daClassname)) {
               dynamicAdaptBack(daElement);
               daElement.classList.remove(daClassname);
            }
         }
      }
      customAdapt();
   }

   //Вызов основной функции
   dynamicAdapt();

   //Функция возврата на место
   function dynamicAdaptBack(el) {
      const daIndex = el.getAttribute('data-da-index');
      const originalPlace = originalPositions[daIndex];
      const parentPlace = originalPlace['parent'];
      const indexPlace = originalPlace['index'];
      const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
      parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
   }
   //Функция получения индекса внутри родителя
   function indexInParent(el) {
      var children = Array.prototype.slice.call(el.parentNode.children);
      return children.indexOf(el);
   }
   //Функция получения массива индексов элементов внутри родителя 
   function indexOfElements(parent, back) {
      const children = parent.children;
      const childrenArray = [];
      for (let i = 0; i < children.length; i++) {
         const childrenElement = children[i];
         if (back) {
            childrenArray.push(i);
         } else {
            //Исключая перенесенный элемент
            if (childrenElement.getAttribute('data-da') == null) {
               childrenArray.push(i);
            }
         }
      }
      return childrenArray;
   }
   //Сортировка объекта
   function dynamicAdaptSort(arr) {
      arr.sort(function (a, b) {
         if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
      });
      arr.sort(function (a, b) {
         if (a.place > b.place) { return 1 } else { return -1 }
      });
   }
   //Дополнительные сценарии адаптации
   function customAdapt() {
      //const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
   }
}());
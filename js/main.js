jQuery(document).ready(function($) {

  "use strict";


  var siteMenuClone = function() {

    $('.js-clone-nav').each(function() {
      var $this = $(this);
      $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
    });


    setTimeout(function() {
      var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);

        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

    $('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();

    });

    $(window).resize(function() {
      var $this = $(this),
        w = $this.width();

      if ( w > 768 ) {
        if ( $('body').hasClass('offcanvas-menu') ) {
          $('body').removeClass('offcanvas-menu');
        }
      }
    });

    $('body').on('click', '.js-menu-toggle', function(e) {
      var $this = $(this);
      e.preventDefault();

      if ( $('body').hasClass('offcanvas-menu') ) {
        $('body').removeClass('offcanvas-menu');
        $this.removeClass('active');
      } else {
        $('body').addClass('offcanvas-menu');
        $this.addClass('active');
      }
    });

    // click outisde offcanvas
    $(document).mouseup(function(e) {
      var container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ( $('body').hasClass('offcanvas-menu') ) {
          $('body').removeClass('offcanvas-menu');
        }
      }
    });
  };
  siteMenuClone();



  var siteSticky = function() {
    $(".js-sticky-header").sticky({topSpacing:0});
  };
  siteSticky();

  var siteScroll = function() {

    $(window).scroll(function() {
      var st = $(this).scrollTop();
      if (st > 100) {
        $('.js-sticky-header').addClass('shrink');
      } else {
        $('.js-sticky-header').removeClass('shrink');
      }
    });
  };
  siteScroll();

  $('strong').each((i, e)=> {
    let date_str;
    const text = $(e).text();
    const mesi = [
      'gennaio',
      'febbraio',
      'marzo',
      'aprile',
      'maggio',
      'giugno',
      'luglio',
      'agosto',
      'settembre',
      'ottobre',
      'novembre',
      'dicembre',
    ];
    const pattern_it = `^([0-9]{1,2})\\s+(${mesi.join('|')})\\s+([0-9]{2,4})$`;
    const regex = new RegExp(pattern_it, "i");
    const found_it = text.match(regex);
    const found_en = text.match(/^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})$/);

    if (found_it){
      date_str = `${found_it[3]}/${mesi.indexOf(found_it[2]) + 1}/${found_it[1]} 24:00 GMT+2`;
    } else if (found_en){
      date_str = `${found_en[3]}/${found_en[2]}/${found_en[1]} 24:00 GMT+2`;
    } else {
      return;
    }

    if (!date_str){
      return;
    }

    const endDate = new Date(date_str).getTime()
    const now = new Date().getTime();

    const remainingMs = endDate - now;
    console.log(`string: ${date_str}; end: ${endDate}; now: ${now}; remaining: ${remainingMs}`);
    

    if (remainingMs > 0){
      if (found_it){
        $(e).append(` <span class="text-success"> &rarr; mancano ${Math.floor(remainingMs / (1000 * 60 * 60 * 24))} giorni!</span>`);
      } else {
        $(e).append(` <span class="text-success"> &rarr; ${Math.floor(remainingMs / (1000 * 60 * 60 * 24))} days left!</span>`);
      }
    } else {
      if (found_it){
        $(e).append(` <span class="text-danger">Termine scaduto!</span>`);
      } else {
        $(e).append(` <span class="text-danger">deadline expired!</span>`);
      }
    }

    
  });

});

(function($) {
  Drupal.behaviors.mck_uig = {
    attach: function (context, settings) {
  	mck_uig_backtotop_click();
  	mck_uig_backtotop_toggle();
    mck_uig_search();
    search_block_form_submit();
    $(window).bind('scroll', function(){
      mck_uig_backtotop_toggle();
    });

    }
  };

  var mck_uig_backtotop_toggle = function() {
    var scrollPos = $(window).scrollTop();
    var scrollObj = $('.back-to-top');
    var offset = 0;
    if(typeof Drupal.settings.mck_uig != 'undefined') {
      if(typeof Drupal.settings.mck_uig.backto_top_offset != 'undefined') {
        offset = Drupal.settings.mck_uig.backto_top_offset;
      }
    }
    if(scrollPos > offset) {
      scrollObj.fadeIn('slow');
    } else {
      scrollObj.fadeOut('slow');
    }
  }
  

  var mck_uig_backtotop_click = function() {
  	$('.back-to-top a').bind('click', function(){
	    $('html, body').animate({scrollTop:(0)}, 1000);
	    return false;
	  });
  }
  
  // Search overlay - as UIG search is not working
  var mck_uig_search = function(){
    $('.mck-search__toggle').bind('click', function(){
      if($(this).hasClass('search-overlay-open')) {
        $('body, .mck-header').removeClass('.is-overlay');
        $('.mck-search').removeClass('mck-search--expanded');
        $('.mck-icon__search', this).removeClass('mck-icon__x');
        $(this).removeClass('search-overlay-open');
      } else {
        $(this).addClass('search-overlay-open');
        $('body, .mck-header').addClass('.is-overlay');
        $('.mck-search').addClass('mck-search--expanded');
        $('.mck-icon__search', this).addClass('mck-icon__x');
        $('.mck-search__input').focus();
      }
    });
  }
  
  var search_block_form_submit = function() {
    $('.mck-search__form .mck-icon__search').bind('click', function(){
      $(this).parents('form').trigger('submit');
    });
  }
  
  // popup modal basic
  $.uig_custom_modal = function(title, content) {
      // backdrop
      $html = '<div class="mck-modal mck-modal--backdrop is-dark"></div>';
      
      $html += '<div class="mck-modal mck-modal--window">';
      $html += '<div class="mck-modal__container is-large">';
      
      // header
      $html += '<div class="mck-modal__header">';
      $html += '<h1 class="mck-modal__title">' + title + '</h1>';
      $html += '<span class="mck-modal__close">';
      $html += '<a href="javascript:void(0)" class="mck-icon__x" data-mck-modal-close><span class="hide-text">Close modal</span></a>';
      $html += '</span>';
      $html += '</div>'; // close header
                
      // content 
      $html += '<div class="mck-modal__content mck-scrollable">';
      $html += content;
      $html += '</div>';
        
      $html += '</div>'; // close container
      $html += '</div>'; // close window
      
      $('body').append($html);
      //alert($('.mck-carousel .mck-carousel-item').get(2));
      
      $('.mck-carousel').mckCarousel();
      
      $('.mck-modal__close').bind('click', function(){
        $('.mck-modal').remove();
      });
  }
  
  

})(jQuery);
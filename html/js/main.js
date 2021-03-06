$(document).foundation();

$( document ).ready(function() {
	reveal();
	 $('.owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
                responsiveClass: true,
                nav:true,
                pager:false,
                navText: ["<span class='mck-icon__arrow-left'></span>","<span class='mck-icon__arrow-right'></span>"],
                responsive: {
                  0: {
                    items: 1,
                    nav: false
                  },
                  600: {
                    items: 1,
                    nav: true
                  },
                  1000: {
                    items: 1,
                    nav: true,
                    loop: false
                  }
                }
              });
	// mobile menu slideout
     $('.button-collapse').sideNav({
      draggable: true
    });

	//sidebar filter
    $('.collapsible').collapsible();

    //menu nav
    magicline();
    var $grid = $('.grid');
    	// isotope - Store # parameter and add "." before hash
		// var hashID = "." + window.location.hash.substring(1);
		// var $grid = $('.grid');
		// 		if(window.location.hash)
		// 		{
		// 			$grid.isotope({
		// 				itemSelector: '.element-item',
		// 				//filter: '.rr',
		// 				filter:hashID,
		// 				layoutMode: 'fitRows',
		// 				getSortData: {
		// 				    category: '[data-category]'
		// 				},
		// 				 sortBy : 'category'
		// 			});
		// }
		// else
		// {
		// 		$grid.isotope({
		// 		    itemSelector: '.element-item',
		// 		    filter: '.rr',
		// 		    layoutMode: 'fitRows',
		// 		    getSortData: {
		// 		        category: '[data-category]'
		// 		    },
		// 		     sortBy : 'category'
		// 	    });
		// }
		// filter functions
		var filterFns = {
		 
		};

		
		var $filterButtonGroup = $('#filters');
			$filterButtonGroup.on( 'click', '.filter-button', function() {
			  var filterAttr = $( this ).attr('data-filter');
			  // set filter in hash
			  location.hash = 'filter=' + encodeURIComponent( filterAttr );
			});

			$('#sidebarfilters').on( 'click', '.sidebarfilter-button', function() {
		  var filterValue = $( this ).attr('data-filter');
		  // use filterFn if matches value
		  filterValue = filterFns[ filterValue ] || filterValue;
		  $grid.isotope({ filter: filterValue });
		});
		// bind filter button click
		// $('#filters').on( 'click', '.filter-button', function() {
		//   var filterValue = $( this ).attr('data-filter');
		//   // use filterFn if matches value
		//   filterValue = filterFns[ filterValue ] || filterValue;
		//   $grid.isotope({ filter: filterValue });
		// });
		// change is-checked class on buttons
		// $('#filters').each( function( i, buttonGroup ) {
		//   var $buttonGroup = $( buttonGroup );
		//   $buttonGroup.on( 'click', '.filter-button', function() {
		//     $buttonGroup.find('.is-checked').removeClass('is-checked');
		//     $( this ).addClass('is-checked');
		//   });
		// });

		var isIsotopeInit = false;

		function onHashchange() {
		  var hashFilter = getHashFilter();
		  if ( !hashFilter && isIsotopeInit ) {
		    return;
		  }
		  isIsotopeInit = true;
		  // filter isotope
		  $grid.isotope({
		    itemSelector: '.element-item',
		    layoutMode: 'fitRows',
		    // use filterFns
		    filter: filterFns[ hashFilter ] || hashFilter
		  });
		  // set selected class on button
		  if ( hashFilter ) {
		    $filterButtonGroup.find('.is-checked').removeClass('is-checked');
		    $filterButtonGroup.find('[data-filter="' + hashFilter + '"]').addClass('is-checked');
		  }
		}

	$(window).on( 'hashchange', onHashchange );
	onHashchange();


});
function getHashFilter() {
  var hash = location.hash;
  // get filter=filterName
  var matches = location.hash.match( /filter=([^&]+)/i );
  var hashFilter = matches && matches[1];
  return hashFilter && decodeURIComponent( hashFilter );
}

	

function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function magicline(){
	var $el, leftPos, newWidth,
        $mainNav = $("#nav-mobile");
    
    $mainNav.append("<li id='magic-line'></li>");
    var $magicLine = $("#magic-line");
    
    $magicLine
        .width($(".active").width())
        .css("left", $(".active a").position().left + 27)
        .data("origLeft", $magicLine.position().left)
        .data("origWidth", $magicLine.width());
        
    $("#nav-mobile li a").hover(function() {
        $el = $(this);
        leftPos = $el.position().left;
        newWidth = $el.parent().width();
        $magicLine.stop().animate({
            left: leftPos,
            width: newWidth
        });
    }, function() {
        $magicLine.stop().animate({
            left: $magicLine.data("origLeft"),
            width: $magicLine.data("origWidth")
        });    
    });
    if($('.portaltitle').hasClass('active')){
	   $('#magic-line').css('display','none');
	}
}

function reveal(){
  window.sr = ScrollReveal();
  
  sr.reveal('#index-banner',{ duration: 600,mobile:false,reset:false,useDelay: 'always' },200);
   sr.reveal('#index-banner h1,#index-banner h3,#index-banner img,.intro,.filters,.linktabs,.card-panel',{ duration: 500,easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',delay:50,mobile:false,reset:false,useDelay: 'always' },150);

 sr.reveal('.card,.story',{ duration: 700,delay: 300,easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',mobile:false,useDelay:'always',reset:false},300);


 }
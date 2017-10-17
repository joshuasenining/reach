jQuery(document).foundation();

jQuery( document ).ready(function($) {

   $(".page-events .monthview").hover(
  function() {
    $( this ).addClass("calendarhover");
     $(this).find(".contents").addClass("fillcolor");

  }, function() {
    $( this ).removeClass("calendarhover");
     $(this).find(".contents").removeClass("fillcolor");

  }
);
   
	//reveal();
  
  $("<div id='back-link'><a href=\"javascript:history.go(-1)\">&laquo; Back</a></div>").insertAfter('#subheader-menu');

  $('#sidebarfilters ul.collapsible li').click(function(e) {
      if($(this).hasClass('active')) {
          e.preventDefault();
          $("button.resetfilters").trigger('click');
      }
  });

  //image map
  $('img[usemap]').rwdImageMaps();

  $(".flowchart").hover(function(){
    var href = $(this).attr("href");
    var index = $(this).index(); 

    $(this).removeClass("hide"); 
    $(".hover-content").eq(index).addClass("show");
  
  }, function(){
       $(".hover-content").removeClass("show").addClass("hide");

  });

  
// $( "#block-views-tools-and-resources-block-5 .collapsible" ).click(function() {
//    $("#block-views-tools-and-resources-block-5 .view-header p").css("display", "block");
// });


  
       
 	 //mobile menu slideout
     $('.button-collapse').sideNav({
      draggable: true
    });
	 $('.owl-carousel').owlCarousel({
                loop: true,
                mouseDrag: false,
               touchDrag: true,
                margin: 10,
                responsiveClass: true,
                nav:true,
                pager:false,
                autoHeight:true,
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
	//sidebar filter
    $('.collapsible').collapsible();

  //support network slideout
//$("#block-views-tools-and-resources-block-2 .collapsible").collapsible('open', 0);

    $("#block-views-tools-and-resources-block-3 .collapsible").click(function() {
     
      // $("#block-views-tools-and-resources-block-6").css("display", "block");
       $("#block-views-tools-and-resources-block-6").addClass("expand-accordion");
       $("#block-views-tools-and-resources-block-6 .collapsible").collapsible("open", 0);

    });


    //menu nav
    // magicline();
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
		//change is-checked class on buttons
		$('#sidebarfilters').each( function( i, buttonGroup ) {
		  var $buttonGroup = $( buttonGroup );
		  $buttonGroup.on( 'click', '.collapsible-body .sidebarfilter-button', function() {
		    $buttonGroup.find('.is-checked').removeClass('is-checked');
		    $( this ).addClass('is-checked');
		  });
		});

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
  
      //reset isoptope filters
      $(".resetfilters").click(function(){
          $(".grid").isotope({
              filter: '*'
          });

          $('#sidebarfilters ul li,#sidebarfilters .sidebarfilter-button').removeClass('active');
         
      });

	
    //add active class to sidebar filters
    $(".collapsible-body ul li").click(function(){
        $(".collapsible-body ul li").removeClass("active");
        $(".collapsible-body ul li div i").remove();
        $(this).addClass("active");
        $(this).find("div").prepend("<i class='material-icons dp48'>play_arrow</i>");
    });


    $(".trigger").click(function(){
        event.preventDefault();

        $('.videowrapper').iziModal('open');

    });
    $("#modal").iziModal({
        onClosing: function(){
            var video = $('.popup-video')[0];
            video.pause();
        }
    });

    $(".fancygroup").each(function(){
        $id = $(this).attr('rel');
        $(this).find(".fancybox").attr("data-fancybox",$id);
        // console.log($(this).find(".fancybox").attr("href"));

    });


    if(jQuery().fancybox) {
        $('.fancybox').fancybox();

    }


    $(document).on('click', '.trigger', function (event) {
        event.preventDefault();
        var videourl = $(this).find("a").attr("href");
        var video = $('.popup-video')[0];
        video.src = videourl;
        video.load();
        $('#modal').iziModal('open');
        video.play();
    });

    if($("#block-menu-menu-playbook-submenu li a").hasClass("active")){
        $("#nav-mobile li.menu-451").addClass("active-trail");
        $("#nav-mobile li.menu-451 a").addClass("active-trail");

    }
    if($("#block-menu-menu-submenu li a").hasClass("active")){
        $("#nav-mobile li.menu-737").addClass("active-trail");
        $("#nav-mobile li.menu-737 a").addClass("active-trail");

    }



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

// function reveal(){
//   window.sr = ScrollReveal();
  
//   sr.reveal('#index-banner',{ duration: 600,mobile:false,reset:false,useDelay: 'always' },200);
//    sr.reveal('#index-banner h1,#index-banner h3,#index-banner img,.intro,.filters,.linktabs,.card-panel',{ duration: 500,easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',delay:50,mobile:false,reset:false,useDelay: 'always' },150);
//  sr.reveal('.card,.story',{ duration: 700,delay: 300,easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',mobile:false,useDelay:'always',reset:false},300);

//  }
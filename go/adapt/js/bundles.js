/*
* adapt-contrib-article-reveal
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Stuart Nicholls <stuart@stuartnicholls.com>, Mohammed Salamat Ali <Mohammed.SalamatAli@kineo.com>
*/
define('extensions/adapt-article-reveal/js/adapt-article-reveal',['require','coreJS/adapt','backbone'],function(require) {

var Adapt = require('coreJS/adapt');
var Backbone = require('backbone');

var ArticleRevealView = Backbone.View.extend({

    className: "article-reveal",

    initialize: function () {
        this.render();
        this.setup();
        this.listenTo(Adapt, "remove", this.remove);
        this.listenTo(Adapt, 'device:changed', this.setDeviceSize);
        Adapt.on("page:scrollTo", _.bind(this.onProgressBarScrollTo, this));
    },

    events: {
        "click .article-reveal-open-button":"revealArticle",
        "click .article-reveal-close-button":"closeArticle"
    },

    render: function () {
        var data = this.model.toJSON();
        var template = Handlebars.templates["adapt-article-reveal"];
        $(this.el).html(template(data)).prependTo('.' + this.model.get("_id"));
        var incomplete = this.model.findDescendants("components").where({_isComplete:false});
        if (incomplete.length === 0){
            this.$(".article-reveal-open-button").addClass('visited');
            this.$(".article-reveal-open-button").addClass('show');
        }
        return this;
    },
    
    setup: function(event) {
        if (event) event.preventDefault();
        //prevent drag on buttons
        this.preventDrag();

        //hide articles
        var $articleInner = $("." + this.model.get("_id") + " > .article-inner ");

        var incomplete = this.model.findDescendants("components").where({_isComplete:false});
        if (incomplete.length > 0){
            $articleInner.css({display:"none"});

            //set components to isVisible false
            this.toggleisVisible( false );
        }
        this.setDeviceSize();
    },

    setDeviceSize: function() {
        if (Adapt.device.screenSize === 'large' || Adapt.device.screenSize === 'medium') {
            this.$el.addClass('desktop').removeClass('mobile');
            this.model.set('_isDesktop', true);
        } else {
            this.$el.addClass('mobile').removeClass('desktop');
            this.model.set('_isDesktop', false)
        }
        this.render();
    },
    
    closeArticle: function(event) {
        if (event) event.preventDefault();

        //set article not showing in css
        this.$(".article-reveal-close-button").removeClass('show');
        this.$(".article-reveal-open-button").removeClass('disabled');

        //animate Close..
        // this.$(".article-reveal-close-button").velocity("fadeOut", 500);

        //..and set components to isVisible false
        this.$el.siblings(".article-inner").velocity("slideUp", 600, _.bind(function() {
            this.toggleisVisible(false);
        }, this));
        this.$el.velocity("scroll", {
            duration: 600,
            offset: -$(".navigation").outerHeight()
        });
        this.$(".article-reveal-open-button").focus();
    },

    revealArticle: function(event) {
        if (event) event.preventDefault();
        if(this.$el.closest(".article").hasClass("locked")) return; // in conjunction with pageLocking

        if (!this.$(".article-reveal-open-button").hasClass('disabled')) { // don't animate when disabled
            //set article visited and article showing in css
            this.$(".article-reveal-open-button").addClass('visited disabled'); // disable button when open
            this.$(".article-reveal-close-button").addClass('show');

            //animate reveal 
            Adapt.trigger("article:revealing", this);
            this.$el.siblings(".article-inner").velocity("slideDown", 800, _.bind(function() {
                Adapt.trigger("article:revealed", this);
                // Call window resize to force components to rerender -
                // fixes components that depend on being visible for setting up layout
                $(window).resize();
            }, this));
            this.$el.velocity("scroll", {
                delay: 400,
                duration: 800,
                offset: this.$el.height() - $(".navigation").outerHeight()
            });
            // this.$(".article-reveal-close-button").velocity("fadeIn", {
            //     delay: 400,
            //     duration: 500
            // });

            //set components to isVisible true
            this.toggleisVisible(true);
        }
    },

    toggleisVisible: function(view) {
        var allComponents = this.model.findDescendants('components');
          allComponents.each(function(component) {
                component.set({
                    '_isVisible':view
                },{
                    pluginName:"_articleReveal"
                });
          });
    },
    
    preventDrag: function() {
        $(".article-reveal-open-button").on("dragstart", function(event) { 
            event.preventDefault(); 
        });
        $(".article-reveal-close-button").on("dragstart", function(event) { 
            event.preventDefault(); 
        });
    },

    // Handles the Adapt page scrollTo event
    onProgressBarScrollTo: function(componentSelector) { 
        var allComponents = this.model.findDescendants('components');
        var componentID = componentSelector;
        if(componentID.indexOf('.') === 0) componentID = componentID.slice(1);
        allComponents.each(_.bind(function(component){
            if(component.get('_id') === componentID && !component.get('_isVisible')){
                this.revealComponent(componentSelector);
                return;
            }
        }, this));
    },

    revealComponent: function(componentSelector) {
        this.$(".article-reveal-open-button").addClass('visited');
        this.$(".article-reveal-open-button").addClass('show');
        
        this.toggleisVisible(true);
        $("." + this.model.get("_id") + " > .article-inner ").slideDown(0);
        this.$(".article-reveal-close-button").fadeIn(1);
        $(window).scrollTo($(componentSelector), {
            offset:{
                top:-$('.navigation').height()
            }
        }).resize();
    }

});

Adapt.on('articleView:postRender', function(view) {
    if (view.model.get("_articleReveal")) {
        new ArticleRevealView({
            model:view.model
        });
    }
});

});
define('extensions/adapt-articleBlockSlider/js/adapt-articleView',[
    'coreJS/adapt',
    'coreViews/articleView'
], function(Adapt, AdaptArticleView) {

    var BlockSliderView = {

        _disableAnimationOnce: false,
        _disableAnimations: false,

        events: {
            "click [data-block-slider]": "_onBlockSliderClick"
        },

        preRender: function() {

            AdaptArticleView.prototype.preRender.call(this);
            if (this.model.isBlockSliderEnabled()) this._blockSliderPreRender();

        },

        _blockSliderPreRender: function() {
            this._disableAnimations = $('html').is(".ie8") || $('html').is(".iPhone.version-7\\.0");
            this._blockSliderSetupEventListeners();
        },

        _blockSliderSetupEventListeners: function() {

            this._onBlockSliderResize = _.bind(this._onBlockSliderResize, this);
            this._blockSliderResizeHeight = _.bind(this._blockSliderResizeHeight, this);

            this.listenTo(Adapt, "device:resize", this._onBlockSliderResize);
            this.listenTo(Adapt, "device:changed", this._onBlockSliderDeviceChanged);
            
            this.listenToOnce(Adapt, "remove", this._onBlockSliderRemove);
            this.listenToOnce(this.model, "change:_isReady", this._onBlockSliderReady);

            this.listenTo(Adapt, "page:scrollTo", this._onBlockSliderPageScrollTo);
            this.listenTo(Adapt, "page:scrolledTo", this._onBlockSliderPageScrolledTo);

        },

        render: function() {

            if (this.model.isBlockSliderEnabled()) {

                this._blockSliderRender();

            } else AdaptArticleView.prototype.render.call(this);
        
        },

        _blockSliderRender: function() {
            Adapt.trigger(this.constructor.type + 'View:preRender', this);
          
            this._blockSliderConfigureVariables();

            var data = this.model.toJSON();
            var template = Handlebars.templates['articleBlockSlider-article'];
            this.$el.html(template(data));

            this.addChildren();

            _.defer(_.bind(function() {
                this._blockSliderPostRender();

            }, this));

            this.$el.addClass('article-block-slider-enabled');

            this.delegateEvents();

            return this;
        },

        _blockSliderConfigureVariables: function() {
            var blocks = this.model.getChildren().models;
            var totalBlocks = blocks.length;

            this.model.set("_currentBlock", 0);
            this.model.set("_totalBlocks", totalBlocks);

            var itemButtons = [];

            for (var i = 0, l = totalBlocks; i < l; i++) {
                itemButtons.push({
                    _className: (i === 0 ? "home" : "not-home") + (" i"+i),
                    _index: i,
                    _includeNumber: i != 0,
                    _title: blocks[i].get('title')
                });
            }

            this.model.set("_itemButtons", itemButtons);
        },

        _blockSliderConfigureControls: function(animate) {

            var duration = this.model.get("_articleBlockSlider")._slideAnimationDuration || 200;

            if (this._disableAnimationOnce) animate = false;
            if (this._disableAnimations) animate = false;

            var _currentBlock = this.model.get("_currentBlock");
            var _totalBlocks = this.model.get("_totalBlocks");

            var $left = this.$el.find("[data-block-slider='left']");
            var $right = this.$el.find("[data-block-slider='right']");

            if (_currentBlock === 0) {
                $left.a11y_cntrl_enabled(false);
                $right.a11y_cntrl_enabled(true);
            } else if (_currentBlock == _totalBlocks - 1 ) {
                $left.a11y_cntrl_enabled(true);
                $right.a11y_cntrl_enabled(false);
            } else {
                $left.a11y_cntrl_enabled(true);
                $right.a11y_cntrl_enabled(true);
            }

            var $indexes = this.$el.find("[data-block-slider='index']");
            $indexes.a11y_cntrl_enabled(true).removeClass("selected");
            $indexes.eq(_currentBlock).a11y_cntrl_enabled(false).addClass("selected visited");

            var $blocks = this.$el.find(".block");

            $blocks.a11y_on(false).eq(_currentBlock).a11y_on(true);
            
            _.delay(_.bind(function() {
                if ($blocks.eq(_currentBlock).onscreen().onscreen) $blocks.eq(_currentBlock).a11y_focus();
            }, this), duration);

        },

        _blockSliderSetButtonLayout: function() {
            var buttonsLength = this.model.get('_itemButtons').length;
            var itemwidth = 100 / buttonsLength;
            this.$('.item-button').css({
                width: itemwidth + '%'
            });
        },

        _blockSliderPostRender: function() {
            this._blockSliderConfigureControls(false);

            

            if (this.model.get("_articleBlockSlider")._hasTabs) {
                var parentHeight = this.$('.item-button').parent().height();
                this.$('.item-button').css({
                    height: parentHeight + 'px'
                });

                var toolbarHeight = this.$('.article-block-toolbar').height();
                var additionalMargin = '30';
                this.$('.article-block-toolbar').css({
                    top: '-' + (toolbarHeight + (additionalMargin/2)) + 'px'
                });

                var toolbarMargin = parseFloat(toolbarHeight) + parseFloat(additionalMargin);
                this.$('.article-block-slider').css({
                    marginTop: toolbarMargin + 'px'
                });
                this._blockSliderSetButtonLayout();
            }

            this._onBlockSliderDeviceChanged();

            var startIndex = this.model.get("_articleBlockSlider")._startIndex || 0;

            this._blockSliderMoveIndex(startIndex, false);

            Adapt.trigger(this.constructor.type + 'View:postRender', this);
            
        },

        _onBlockSliderReady: function() {
            this._blockSliderHideOthers();
            _.delay(_.bind(function(){
                this._blockSliderConfigureControls(false);
            },this),250);
            this.$(".component").on("resize", this._blockSliderResizeHeight);
        },

        _onBlockSliderClick: function(event) {
            event.preventDefault();

            var id = $(event.currentTarget).attr("data-block-slider");

            switch(id) {
            case "left":
                this._blockSliderMoveLeft();
                break;
            case "index":
                var index = parseInt($(event.currentTarget).attr("data-block-slider-index"));
                this._blockSliderMoveIndex(index);
                break;
            case "right":
                this._blockSliderMoveRight();
                break;
            }

        },

        _blockSliderMoveLeft: function() {
            if (this.model.get("_currentBlock") === 0) return;

            var index = this.model.get("_currentBlock");
            index--;
            this._blockSliderMoveIndex(index);
        },

        _blockSliderMoveIndex: function(index, animate) {
            if (this.model.get("_currentBlock") != index) {

                this.model.set("_currentBlock", index);
                this._blockSliderSetVisible(this.model.getChildren().models[index], true);

                this._blockSliderResizeHeight(animate);
                this._blockSliderScrollToCurrent(animate);
                this._blockSliderConfigureControls(animate);
            }

            var duration = this.model.get("_articleBlockSlider")._slideAnimationDuration || 200;

            if (this._disableAnimationOnce) animate = false;
            if (this._disableAnimations) animate = false;

            if (animate !== false) {
                _.delay(function() {
                    $(window).resize();
                }, duration);
            } else {
                $(window).resize();
            }
        },

        _blockSliderMoveRight: function() {
            if (this.model.get("_currentBlock") == this.model.get("_totalBlocks") - 1 ) return;

            var index = this.model.get("_currentBlock");
            index++;
            this._blockSliderMoveIndex(index);
        },

        _blockSliderScrollToCurrent: function(animate) {
            var isEnabled = this._blockSliderIsEnabledOnScreenSizes();
            var $container = this.$el.find(".article-block-slider");

            if (!isEnabled) {
                return $container.scrollLeft(0);
            }

            var blocks = this.$el.find(".block");
            var blockWidth = $(blocks[0]).outerWidth();
            var totalLeft = this.model.get("_currentBlock") * blockWidth;

            this._blockSliderShowAll();

            var duration = this.model.get("_articleBlockSlider")._slideAnimationDuration || 200;

            var currentBlock = this.model.get("_currentBlock")
            var $currentBlock = $(blocks[currentBlock]);

            if (this._disableAnimationOnce) animate = false;
            if (this._disableAnimations) animate = false;
            
            if (animate === false) {
                _.defer(_.bind(function(){
                    $container.scrollLeft(totalLeft );
                    this._blockSliderHideOthers();
                }, this));
            } else {
                $container.stop(true).animate({scrollLeft:totalLeft}, duration, _.bind(function() {
                    $container.scrollLeft(totalLeft );
                    this._blockSliderHideOthers();
                }, this));
            }

        },

        _blockSliderIsEnabledOnScreenSizes: function() {
            var isEnabledOnScreenSizes = this.model.get("_articleBlockSlider")._isEnabledOnScreenSizes;

            var sizes = isEnabledOnScreenSizes.split(" ");
            if (_.indexOf(sizes, Adapt.device.screenSize) > -1) {
                return true;
            }
            return false;
        },

        _blockSliderShowAll: function() {
            var blocks = this.model.getChildren().models;
            var currentIndex = this.model.get("_currentBlock");

            for (var i = 0, l = blocks.length; i < l; i++) {
                this._blockSliderSetVisible(blocks[i], true);
            }
        },
        
        _blockSliderHideOthers: function() {
            var blocks = this.model.getChildren().models;
            var currentIndex = this.model.get("_currentBlock");

            for (var i = 0, l = blocks.length; i < l; i++) {
                if (i != currentIndex) {
                    this._blockSliderSetVisible(blocks[i], false);
                } else {
                    this._blockSliderSetVisible(blocks[i], true);
                }
            }

        },

        _blockSliderSetVisible: function(model, value) {
            var id = model.get("_id");

            this.$el.find("."+id + " *").css("visibility", value ? "" : "hidden");

        },

        _onBlockSliderResize: function() {
            
            this._blockSliderResizeWidth(false);
            this._blockSliderResizeHeight(false);
            this._blockSliderScrollToCurrent(false);

        },

        _blockSliderResizeHeight: function(animate) {
            var $container = this.$el.find(".article-block-slider");
            var isEnabled = this._blockSliderIsEnabledOnScreenSizes();

            if (!isEnabled) {
                this._blockSliderShowAll();
                return $container.velocity("stop").css({"height": "", "min-height": ""});
            }

            var currentBlock = this.model.get("_currentBlock");
            var $blocks = this.$el.find(".block");

            var currentHeight = $container.height();
            var blockHeight = $blocks.eq(currentBlock).height();

            var maxHeight = -1;
            $container.find(".block").each(function() { 
            
            if ($(this).height() > maxHeight)
                maxHeight = $(this).height();
            });

            var duration = (this.model.get("_articleBlockSlider")._heightAnimationDuration || 200) * 2;

            if (this._disableAnimationOnce) animate = false;
            if (this._disableAnimations) animate = false;

            if (this.model.get("_articleBlockSlider")._hasUniformHeight) {
                if (animate === false) {
                    $container.css({"height": maxHeight+"px"});
                } else {
                    $container.velocity("stop").velocity({"height": maxHeight+"px"}, {duration: duration });//, easing: "ease-in"});
                }
            } else if (currentHeight <= blockHeight) {

                if (animate === false) {
                    $container.css({"height": blockHeight+"px"});
                } else {
                    $container.velocity("stop").velocity({"height": blockHeight+"px"}, {duration: duration });//, easing: "ease-in"});
                }

            } else if (currentHeight > blockHeight) {

                if (animate === false) {
                    $container.css({"height": blockHeight+"px"});
                } else {
                    $container.velocity("stop").velocity({"height": blockHeight+"px"}, {duration: duration });//, easing: "ease-in"});
                }

            }

            var minHeight = this.model.get("_articleBlockSlider")._minHeight;
            if (minHeight) {
                $container.css({"min-height": minHeight+"px"});
            }
        },

        _blockSliderResizeWidth: function() {
            var isEnabled = this._blockSliderIsEnabledOnScreenSizes();
            var $blockContainer = this.$el.find(".block-container");
            var $blocks = this.$el.find(".block");

            if (!isEnabled) {
                $blocks.css("width", "");
                return $blockContainer.css({"width": "100%"});
            }

            var $container = this.$el.find(".article-block-slider");

            $blocks.css("width", $container.width()+"px");
                
            var blockWidth = $($blocks[0]).outerWidth();
            var totalWidth = $blocks.length * (blockWidth);

            $blockContainer.width(totalWidth + "px");

        },

        _onBlockSliderDeviceChanged: function() {
            var isEnabled = this._blockSliderIsEnabledOnScreenSizes();

            if (isEnabled) {
                this.$(".article-block-toolbar, .article-block-bottombar").removeClass("display-none")
            } else {
                this.$(".article-block-toolbar, .article-block-bottombar").addClass("display-none");
            }

            _.delay(function() {
                $(window).resize();
            }, 250);
        },

        _onBlockSliderPageScrollTo: function(selector) {
            this._disableAnimationOnce = true;
            _.defer(_.bind(function() {
                this._disableAnimationOnce = false;
            }, this));

            if (typeof selector === "object") selector = selector.selector;

            var isEnabled = this._blockSliderIsEnabledOnScreenSizes();
            if (!isEnabled) {
                return;
            }

            if (this.$el.find(selector).length == 0) return;
            
            var id = selector.substr(1);

            var model = Adapt.findById(id);
            if (!model) return;

            var block;
            if (model.get("_type") == "block") block = model;
            else block = model.findAncestor("blocks");
            if (!block) return;

            var children = this.model.getChildren();
            for (var i = 0, item; item = children.models[i++];) {
                if (item.get("_id") == block.get("_id")) {
                    _.defer(_.bind(function() {
                        this._blockSliderMoveIndex(i-1, false);
                    }, this));
                    return;
                }
            }

        },

        _onBlockSliderPageScrolledTo: function() {
            _.defer(_.bind(function() {
                this._blockSliderScrollToCurrent(false);
            }, this));
        },

        _onBlockSliderRemove: function() {
            this._blockSliderRemoveEventListeners();
        },

        _blockSliderRemoveEventListeners: function() {
            this.$(".component").off("resize", this._blockSliderResizeHeight);
            this.stopListening(Adapt, "device:changed", this._onBlockSliderDeviceChanged);
        }
    };

    return BlockSliderView;

});

define('extensions/adapt-articleBlockSlider/js/adapt-articleModel',[
	'coreJS/adapt'
], function(Adapt) {

	var BlockSliderModel = {

		isBlockSliderEnabled: function() {
			return this.get("_articleBlockSlider") && this.get("_articleBlockSlider")._isEnabled;
		}

	};

	return BlockSliderModel;
});

//https://github.com/cgkineo/jquery.resize 2015-08-13

(function() {

  if ($.fn.off.elementResizeOriginalOff) return;


  var orig = $.fn.on;
  $.fn.on = function () {
    if (arguments[0] !== "resize") return $.fn.on.elementResizeOriginalOn.apply(this, _.toArray(arguments));
    if (this[0] === window) return $.fn.on.elementResizeOriginalOn.apply(this, _.toArray(arguments));

    addResizeListener.call(this, (new Date()).getTime());

    return $.fn.on.elementResizeOriginalOn.apply(this, _.toArray(arguments));
  };
  $.fn.on.elementResizeOriginalOn = orig;
  var orig = $.fn.off;
  $.fn.off = function () {
    if (arguments[0] !== "resize") return $.fn.off.elementResizeOriginalOff.apply(this, _.toArray(arguments));
    if (this[0] === window) return $.fn.off.elementResizeOriginalOff.apply(this, _.toArray(arguments));

    removeResizeListener.call(this, (new Date()).getTime());

    return $.fn.off.elementResizeOriginalOff.apply(this, _.toArray(arguments));
  };
  $.fn.off.elementResizeOriginalOff = orig;

  var expando = $.expando;
  var expandoIndex = 0;

  function checkExpando(element) {
    if (!element[expando]) element[expando] = ++expandoIndex;
    }

  //element + event handler storage
  var resizeObjs = {};

  //jQuery element + event handler attachment / removal
  var addResizeListener = function(data) {
      checkExpando(this);
      resizeObjs[data.guid + "-" + this[expando]] = { 
        data: data, 
        $element: $(this) 
      };
  };

  var removeResizeListener = function(data) {
    try { 
      delete resizeObjs[data.guid + "-" + this[expando]]; 
    } catch(e) {

    }
  };

  function checkLoopExpired() {
    if ((new Date()).getTime() - loopData.lastEvent > 500) {
      stopLoop()
      return true;
    }
  }

  function resizeLoop () {
    if (checkLoopExpired()) return;

    var resizeHandlers = getEventHandlers("resize");

    if (resizeHandlers.length === 0) {
      //nothing to resize
      stopLoop();
      resizeIntervalDuration = 500;
      repeatLoop();
    } else {
      //something to resize
      stopLoop();
      resizeIntervalDuration = 250;
      repeatLoop();
    }

    if  (resizeHandlers.length > 0) {
      var items = resizeHandlers;
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        triggerResize(item);
      }
    }

  }

  function getEventHandlers(eventName) {
    var items = [];
    
    switch (eventName) {
    case "resize":
      for (var k in resizeObjs) {
        items.push(resizeObjs[k]);
      }
      break;
    }

    return items;
  }

  function getDimensions($element) {
      var height = $element.outerHeight();
      var width = $element.outerWidth();

      return {
        uniqueMeasurementId: height+","+width
      };
  }

  function triggerResize(item) {
    var measure = getDimensions(item.$element);
    //check if measure has the same values as last
    var isFirstRun = false;
    if (item._resizeData === undefined) isFirstRun = true;
    if (item._resizeData !== undefined && item._resizeData === measure.uniqueMeasurementId) return;
    item._resizeData = measure.uniqueMeasurementId;
    if (isFirstRun) return;
    
    //make sure to keep listening until no more resize changes are found
    loopData.lastEvent = (new Date()).getTime();
    
    item.$element.trigger('resize');
  }


  //checking loop interval duration
  var resizeIntervalDuration = 250;

  var loopData = {
    lastEvent: 0,
    interval: null
  };

  //checking loop start and end
  function startLoop() {
    loopData.lastEvent = (new Date()).getTime();
    if (loopData.interval !== null) {
      stopLoop();
    }
    loopData.interval = setTimeout(resizeLoop, resizeIntervalDuration);
  }

  function repeatLoop() {
    if (loopData.interval !== null) {
      stopLoop();
    }
    loopData.interval = setTimeout(resizeLoop, resizeIntervalDuration);
  }

  function stopLoop() {
    clearInterval(loopData.interval);
    loopData.interval = null;
  }

  $('body').on("mousedown mouseup keyup keydown", startLoop);
  $(window).on("resize", startLoop);


})();

define("extensions/adapt-articleBlockSlider/js/lib/jquery.resize", function(){});

define('extensions/adapt-articleBlockSlider/js/adapt-articleExtension',[
	'coreJS/adapt',
	'coreViews/articleView',
	'coreModels/articleModel',
	'./adapt-articleView',
	'./adapt-articleModel',
	'./lib/jquery.resize'
], function(Adapt, ArticleView, ArticleModel, ArticleViewExtension, ArticleModelExtension) {

	/*	
		Here we are extending the articleView and articleModel in Adapt.
		This is to accomodate the block slider functionality on the article.
		The advantage of this method is that the block slider behaviour can utilize all of the predefined article behaviour in both the view and the model.
	*/	

	//Extends core/js/views/articleView.js
	var ArticleViewInitialize = ArticleView.prototype.initialize;
	ArticleView.prototype.initialize = function(options) {
		if (this.model.get("_articleBlockSlider")) {
			//extend the articleView with new functionality
			_.extend(this, ArticleViewExtension);
		}
		//initialize the article in the normal manner
		return ArticleViewInitialize.apply(this, arguments);
	};

	//Extends core/js/models/articleModel.js
	var ArticleModelInitialize = ArticleModel.prototype.initialize;
	ArticleModel.prototype.initialize = function(options) {
		if (this.get("_articleBlockSlider")) {
			//extend the articleModel with new functionality
			_.extend(this, ArticleModelExtension);

			//initialize the article in the normal manner
			var returnValue = ArticleModelInitialize.apply(this, arguments);

			return returnValue;
		}

		//initialize the article in the normal manner if no assessment
		return ArticleModelInitialize.apply(this, arguments);
	};

});
define('extensions/adapt-articleBlockSlider/js/articleBlockSlider',[
	'coreJS/adapt',
	'./adapt-articleExtension'
], function(Adapt) {

});


define('extensions/adapt-background-switcher/js/adapt-contrib-background-switcher',[
	'coreJS/adapt'
], function(Adapt) {

	var BackgroundSwitcherView = Backbone.View.extend({

		_blockModels: null,
		_blockModelsIndexed: null,
		_onBlockInview: null,
		$backgroundContainer: null,
		$backgrounds: null,
		$blockElements: null,
		_firstId: null,
		_activeId: null,
		windowHeight: null,

		initialize: function() {
			this._blockModels = this.model.findDescendants('blocks').filter(function(model) {
				return model.get("_backgroundSwitcher");
			});
			if(this._blockModels.length == 0) {
			        this.onRemove();
			        return;
			}
			this._blockModelsIndexed = _.indexBy(this._blockModels, "_id");

			this.listenTo(Adapt, "pageView:ready", this.onPageReady);
			this.listenTo(Adapt, "remove", this.onRemove);

			this._onScroll = _.debounce(_.bind(this.onScroll, this), 1);
			this._onResize = _.debounce(_.bind(this.onResize, this), 1);

			$(window).on("scroll", this._onScroll);
			$(window).on("resize", this._onResize);

			this.setupBackgroundContainer();
		},

		onPageReady: function() {

			this.$blockElements = {};
			this.$backgrounds = {};
			this.callbacks = {};

			for (var i = 0, l = this._blockModels.length; i < l; i++) {
				var blockModel = this._blockModels[i];	
				if(!blockModel.get('_backgroundSwitcher')) continue;

				var id = blockModel.get("_id");

				if (!this._firstId) this._firstId = id;

				var $blockElement = this.$el.find("."+ id);

				$blockElement.attr("data-backgroundswitcher", id);
				this.$blockElements[id] = $blockElement;

				$blockElement.addClass('background-switcher-block');

				var options = blockModel.get('_backgroundSwitcher');

				var $backGround = $('<div class="background-switcher-background" style="background-image: url('+options.src+');"></div>');
				this.$backgroundContainer.prepend($backGround);
				this.$backgrounds[id] = $backGround;

				$blockElement.find('.block-inner').addClass('background-switcher-block-mobile').css({'background-image': 'url('+options.mobileSrc+')'});

			}

			this._activeId = this._firstId;
			
			this.$backgroundContainer.imageready(_.bind(function() {
				this.$backgroundContainer.css("opacity", 1);
				this.showBackground();	
			}, this));

		},

		setupBackgroundContainer : function() {

			this.$backgroundContainer = $('<div class="background-switcher-container"></div>');
			this.$el.addClass('background-switcher-active');
			this.$el.prepend(this.$backgroundContainer);
			this.windowHeight = $(window).height();
			this.$backgroundContainer.height(this.windowHeight);

		},

		onResize: function() {
			//only change the height of the background container if it changes by more than 50px
			//the ipad navigation bar causes the window height to change and makes the picture jump otherwise
			var windowHeight = $(window).height();
			var absoluteDifference = Math.abs(this.windowHeight - windowHeight);
			if (absoluteDifference > 50) {
				this.windowHeight = $(window).height();
				this.$backgroundContainer.height(this.windowHeight);
			}
		},

		onScroll: function() {
			for (var i = 0, l = this._blockModels.length; i < l; i++) {

				var blockModel = this._blockModels[i];	
				if(!blockModel.get('_backgroundSwitcher')) continue;

				var id = blockModel.get("_id");

				var measurements = this.$blockElements[id].onscreen();

				var isOnscreen = measurements.percentFromTop < 80 && measurements.percentFromBottom < 80 ;
				if (!isOnscreen) continue;

				if (this._activeId === id) return;

				this._activeId = id;

				return this.showBackground();

			}
		},

		showBackground: function() {
			var blockModel = this._blockModelsIndexed[this._activeId];

			if(Modernizr.csstransitions){
				this.$('.background-switcher-background.active').removeClass('active');
				this.$backgrounds[this._activeId].addClass('active');
			}
			else {
				this.$('.background-switcher-background.active').velocity({opacity:0}, 1000, function(){ $(this).removeClass('active'); });
				this.$backgrounds[this._activeId].velocity({opacity:1}, 1000, function(){ $(this).addClass('active'); });
			}
		},

		onRemove: function () {
			$(window).off("scroll", this._onScroll);
			this.$blockElements = null;
			this.$backgroundContainer = null;
			this.$backgrounds = null;
			this._blockModels = null;
			this._blockModelsIndexed = null;
			this._onBlockInview = null;
			this.remove();
		}


	});

	Adapt.on("pageView:postRender", function(view) {
		var model = view.model;
		if (model.get("_backgroundSwitcher")) {
			if (model.get("_backgroundSwitcher")._isActive) {
				new BackgroundSwitcherView({model: model, el: view.el });
			}
		}
	});

});

define('extensions/adapt-contrib-assessment/js/adapt-assessmentArticleView',[
    'coreJS/adapt',
    'coreViews/articleView'
], function(Adapt, AdaptArticleView) {

    var AssessmentView = {

        postRender: function() {
            AdaptArticleView.prototype.postRender.call(this);
            if (this.model.isAssessmentEnabled()) {
                this._setupEventListeners();

                var config = this.model.getConfig();
                if (config && config._questions && config._questions._canShowMarking === false) {
                    this.$el.addClass('no-marking');
                }
            }
            this.$el.addClass('assessment');
        },

        _setupEventListeners: function() {
            this.listenTo(Adapt, "assessments:complete", this._onAssessmentComplete);
            this.listenTo(Adapt, "assessments:reset", this._onAssessmentReset);
            this.listenTo(Adapt, "remove", this._onRemove);
        },

        _removeEventListeners: function() {
            this.stopListening(Adapt, "assessments:complete", this._onAssessmentComplete);
            this.stopListening(Adapt, "assessments:reset", this._onAssessmentReset);
        },

        _onAssessmentComplete: function(state, model) {
            if (state.id != this.model.get("_assessment")._id) return;

            console.log("assessment complete", state, model);

        },

        _onAssessmentReset: function(state, model) {
            if (state.id != this.model.get("_assessment")._id) return;

            console.log("assessment reset", state, model);

        },

        _onRemove: function() {
            this._removeEventListeners();
        }

    };

    return AssessmentView;

});

define('extensions/adapt-contrib-assessment/js/adapt-assessmentQuestionBank',['require'],function(require) {
    
    var QuestionBank = function(quizBankid, articleId, numQuestionBlocks, uniqueQuestions) {

        this._id = quizBankid;
        this._articleId = articleId;
        this._numQuestionBlocks = numQuestionBlocks;
        this._uniqueQuestions = uniqueQuestions;
        this.questionBlocks = [];
        this.unUsedQuestionBlocks = undefined;
        this.usedQuestionBlocks = [];

    };

    QuestionBank.prototype = {

        getID: function() {
            return this._id;
        },

        addBlock: function(block) {
            this.questionBlocks.push(block);
        },

        getRandomQuestionBlocks: function() {
            this.checkResetUnunsedBlocks();

            var questionBlocks = [];
            var usedQuestionBlocks = this.usedQuestionBlocks.slice(0);

            for (var i = 0; i < this._numQuestionBlocks; i++) {
                var question = this.getRandomQuestion();
                if (question !== undefined) {
                    questionBlocks.push(question);
                } else {
                    if (usedQuestionBlocks.length === 0) break;
                    var index = Math.floor(Math.random() * (usedQuestionBlocks.length-1));
                    question = usedQuestionBlocks.splice(index,1)[0];
                    questionBlocks.push(question);
                }
            }
                
            return questionBlocks;
        },

        checkResetUnunsedBlocks: function() {
            if (this.unUsedQuestionBlocks !== undefined && this._uniqueQuestions) return;
            
            this.unUsedQuestionBlocks = this.questionBlocks.slice(0);
        },

        getRandomQuestion: function() {
            if (this.unUsedQuestionBlocks !== undefined && this.unUsedQuestionBlocks.length < 1) {
               console.warn("assessment:"+this._articleId+" No more unique questions for _assessment._quizBankID " + this._id);
               return undefined;
            }

            var index = Math.round(Math.random() * (this.unUsedQuestionBlocks.length-1));
            var questionBlock = this.unUsedQuestionBlocks[index];
            this.usedQuestionBlocks.push(questionBlock);

            this.unUsedQuestionBlocks.splice(index, 1);

            return questionBlock;
        }
        
    };

    return QuestionBank;

});
define('extensions/adapt-contrib-assessment/js/adapt-assessmentArticleModel',[
    'coreJS/adapt',
    './adapt-assessmentQuestionBank'
], function(Adapt, QuestionBank) {


    var givenIdCount = 0;
    var assessmentConfigDefaults = {
        "_isEnabled":true,
        "_questions": {
            "_resetType": "soft",
            "_canShowFeedback": false,
            "_canShowMarking": false,
            "_canShowModelAnswer": false
        },
        "_isPercentageBased" : true,
        "_scoreToPass" : 100,
        "_includeInTotalScore": true,
        "_assessmentWeight": 1,
        "_isResetOnRevisit": true,
        "_reloadPageOnReset": true,
        "_attempts": "infinite"
    };

    var AssessmentModel = {

    //Private functions

        _postInitialize: function() {
            if (!this.isAssessmentEnabled()) return;

            var assessmentConfig = this.getConfig();

            _.extend(this, {
                '_currentQuestionComponents': null,
                "_originalChildModels": null,
                "_questionBanks": null,
                "_forceResetOnRevisit": false
            });

            var attemptsLeft;
            switch (assessmentConfig._attempts) {
                case "infinite": case 0: case undefined: case -1: case null:
                     attemptsLeft = "infinite";
                    break;
                default:
                    attemptsLeft = assessmentConfig._attempts;
                    break;
            }


            //if assessment passed required and assessment included in total
            //set attemptsleft to infinite
            var centralAssessmentState = Adapt.assessment.getState();

            if (assessmentConfig._includeInTotalScore &&
                centralAssessmentState.requireAssessmentPassed) {
                attemptsLeft = "infinite";
            }

            this.set({
                '_currentQuestionComponentIds': [],
                '_assessmentCompleteInSession': false,
                '_attemptInProgress': false,
                "_isAssessmentComplete": false,
                '_numberOfQuestionsAnswered': 0,
                '_lastAttemptScoreAsPercent': 0,
                "_attempts": attemptsLeft,
                "_attemptsLeft": attemptsLeft,
                "_attemptsSpent": 0
            });

            this.listenToOnce(Adapt, "app:dataReady", this._onDataReady);
            this.listenTo(Adapt, "remove", this._onRemove);

        },

        init: function() {
            //save original children
            this._originalChildModels = this.getChildren().models;
            //collect all question components
            this._currentQuestionComponents = this.findDescendants("components").where({_isQuestionType: true});
            var currentQuestionsCollection = new Backbone.Collection(this._currentQuestionComponents);
            this.set("_currentQuestionComponentIds", currentQuestionsCollection.pluck("_id"));

            this._setAssessmentOwnershipOnChildrenModels();

        },

        _setAssessmentOwnershipOnChildrenModels: function() {
            //mark all children components as belonging to an assessment
            for (var i = 0, l = this._originalChildModels.length; i < l; i++) {
                var blockModel = this._originalChildModels[i];
                blockModel.set({
                    _isPartOfAssessment: true
                });
                //make sure components are set to _isPartOfAssessment for plp checking
                blockModel.setOnChildren({
                    _isPartOfAssessment: true
                });
            }
        },
        

        _onDataReady: function() {
            //register assessment
            Adapt.assessment.register(this);
        },

        _setupAssessmentData: function(force) {
            var assessmentConfig = this.getConfig();
            var state = this.getState();
            var shouldResetAssessment = (!this.get("_attemptInProgress") && !state.isPass)
                                || force == true;

            var quizModels;
            if (shouldResetAssessment) {
                this.set("_numberOfQuestionsAnswered", 0);
                this.set("_isAssessmentComplete", false);
                this.set("_assessmentCompleteInSession", false);
                this.set("_score", 0);
                this.getChildren().models = this._originalChildModels;
                if(assessmentConfig._banks && 
                        assessmentConfig._banks._isEnabled && 
                        assessmentConfig._banks._split.length > 1) {

                    quizModels = this._setupBankedAssessment();
                } else if(assessmentConfig._randomisation && 
                        assessmentConfig._randomisation._isEnabled) {

                    quizModels = this._setupRandomisedAssessment();
                }
            }

            if (!quizModels) {
                // leave the order as before, completed or not
                quizModels = this.getChildren().models;
            } else if ( quizModels.length === 0 ) {
                quizModels = this.getChildren().models;
                console.warn("assessment: Not enough unique questions to create a fresh assessment, using last selection");
            }

            this.getChildren().models = quizModels;

            this._currentQuestionComponents = this.findDescendants('components').where({_isQuestionType: true});
            var currentQuestionsCollection = new Backbone.Collection(this._currentQuestionComponents);
            this.set("_currentQuestionComponentIds", currentQuestionsCollection.pluck("_id"));

            var shouldResetQuestions = (assessmentConfig._isResetOnRevisit !== false && !state.isPass) 
                                        || force == true;

            if (shouldResetAssessment || shouldResetQuestions) {
                this._resetQuestions();
                this.set("_attemptInProgress", true);
                Adapt.trigger('assessments:reset', this.getState(), this);
            }
            
            if (!state.isComplete) {
                this.set("_attemptInProgress", true);
            }
            
            this._overrideQuestionComponentSettings();
            this._setupQuestionListeners();
            this._checkNumberOfQuestionsAnswered();
            this._updateQuestionsState();

            Adapt.assessment.saveState();

        },

        _setupBankedAssessment: function() {
            var assessmentConfig = this.getConfig();

            this._setupBanks();

            //get random questions from banks
            var questionModels = [];
            for (var bankId in this._questionBanks) {
                var questionBank = this._questionBanks[bankId];
                var questions = questionBank.getRandomQuestionBlocks();
                questionModels = questionModels.concat(questions);
            }

            //if overall question order should be randomized
            if (assessmentConfig._banks._randomisation) {
                questionModels = _.shuffle(questionModels);
            }

            return questionModels;
        },

        _setupBanks: function() {
            var assessmentConfig = this.getConfig();
            var banks = assessmentConfig._banks._split.split(",");

            this._questionBanks = [];

            //build fresh banks
            for (var i = 0, l = banks.length; i < l; i++) {
                var bank = banks[i];
                var bankId = (i+1);
                var questionBank = new QuestionBank(bankId, 
                                                this.get("_id"), 
                                                bank, 
                                                true);

                this._questionBanks[bankId] = questionBank;
            }

            //add blocks to banks
            var children = this.getChildren().models;
            for (var i = 0, l = children.length; i < l; i++) {
                var blockModel = children[i];
                var blockAssessmentConfig = blockModel.get('_assessment');
                var bankId = blockAssessmentConfig._quizBankID;
                this._questionBanks[bankId].addBlock(blockModel);
            }

        },

        _setupRandomisedAssessment: function() {
            var assessmentConfig = this.getConfig();

            var randomisationModel = assessmentConfig._randomisation;
            var blockModels = this.getChildren().models;
            
            var questionModels = _.shuffle(blockModels);

            questionModels = questionModels.slice(0, randomisationModel._blockCount);
            
            return questionModels;
        },

        _overrideQuestionComponentSettings: function() {
            var questionConfig = this.getConfig()._questions;
            var questionComponents = this._currentQuestionComponents;

            var newSettings = {};
            if(questionConfig.hasOwnProperty('_canShowFeedback')) {
                newSettings._canShowFeedback = questionConfig._canShowFeedback;
            }

            if(questionConfig.hasOwnProperty('_canShowModelAnswer')) {
                newSettings._canShowModelAnswer = questionConfig._canShowModelAnswer;
            }

            if (questionConfig.hasOwnProperty('_canShowMarking')) {
                newSettings._canShowMarking = questionConfig._canShowMarking;
            }

            if(!_.isEmpty(newSettings)) {
                for (var i = 0, l = questionComponents.length; i < l; i++) {
                    questionComponents[i].set(newSettings, { pluginName: "_assessment" });
                }
            }

        },

        _setupQuestionListeners: function() {
            var questionComponents = this._currentQuestionComponents;
            for (var i = 0, l = questionComponents.length; i < l; i++) {
                var question = questionComponents[i];
                if (question.get("_isInteractionComplete")) continue;
                this.listenTo(question, 'change:_isInteractionComplete', this._onQuestionCompleted);
            }
        },

        _checkNumberOfQuestionsAnswered: function() {
            var questionComponents = this._currentQuestionComponents;
            var numberOfQuestionsAnswered = 0;
            for (var i = 0, l = questionComponents.length; i < l; i++) {
                var question = questionComponents[i];
                if (question.get("_isInteractionComplete")) {
                    numberOfQuestionsAnswered++;
                }
            }
            this.set("_numberOfQuestionsAnswered", numberOfQuestionsAnswered);
        },

        _removeQuestionListeners: function() {
            var questionComponents = this._currentQuestionComponents;
            for (var i = 0, l = questionComponents.length; i < l; i++) {
                var question = questionComponents[i];
                this.stopListening(question, 'change:_isInteractionComplete', this._onQuestionCompleted);
            }
        },

        _onQuestionCompleted: function(questionModel, value) {
            if (value === false) return;
            if(!questionModel.get('_isInteractionComplete')) return;

            var numberOfQuestionsAnswered = this.get("_numberOfQuestionsAnswered");
            numberOfQuestionsAnswered++;
            this.set("_numberOfQuestionsAnswered", numberOfQuestionsAnswered);

            this._updateQuestionsState();
            Adapt.assessment.saveState();

            this._checkAssessmentComplete();
        },

        _checkAssessmentComplete: function() {
            var numberOfQuestionsAnswered = this.get("_numberOfQuestionsAnswered");

            var allQuestionsAnswered = numberOfQuestionsAnswered >= this._currentQuestionComponents.length;
            if (!allQuestionsAnswered) return;
            
            this._onAssessmentComplete();
        },

        _onAssessmentComplete: function() {
            var assessmentConfig = this.getConfig();

            this.set("_attemptInProgress", false);
            this._spendAttempt();

            var scoreAsPercent = this._getScoreAsPercent();
            var score = this._getScore();
            var maxScore = this._getMaxScore();

            this.set({
                '_scoreAsPercent': scoreAsPercent,
                '_score': score,
                '_maxScore': maxScore,
                '_lastAttemptScoreAsPercent': scoreAsPercent,
                '_assessmentCompleteInSession': true,
                '_isAssessmentComplete': true
            });

            this._updateQuestionsState();

            this._checkIsPass();

            this._removeQuestionListeners();
            
            Adapt.trigger('assessments:complete', this.getState(), this);
        },

        _updateQuestionsState: function() {
            var questions = [];

            var questionComponents = this._currentQuestionComponents;
            for (var i = 0, l = questionComponents.length; i < l; i++) {
                var questionComponent = questionComponents[i];

                var questionModel = {
                    _id: questionComponent.get("_id"),
                    _isCorrect: questionComponent.get("_isCorrect") === undefined ? null : questionComponent.get("_isCorrect")
                };

                //build array of questions
                questions.push(questionModel);

            }
            
            this.set({
                '_questions': questions
            });
        },

        _checkIsPass: function() {
            var assessmentConfig = this.getConfig();

            var isPercentageBased = assessmentConfig._isPercentageBased;
            var scoreToPass = assessmentConfig._scoreToPass;

            var scoreAsPercent = this.get("_scoreAsPercent");
            var score = this.get("_score");

            var isPass = false;
            if (score && scoreAsPercent) {
                if (isPercentageBased) {
                    isPass = (scoreAsPercent >= scoreToPass) ? true : false;
                } else {
                    isPass = (score >= scoreToPass) ? true : false;
                }
            }

            this.set("_isPass", isPass);
        },

        _isAttemptsLeft: function() {
            var assessmentConfig = this.getConfig();

            var isAttemptsEnabled = assessmentConfig._attempts && assessmentConfig._attempts != "infinite";

            if (!isAttemptsEnabled) return true;

            if (this.get('_attemptsLeft') === 0) return false;
        
            return true;
        },

        _spendAttempt: function() {
            if (!this._isAttemptsLeft()) return false;

            var attemptsSpent = this.get("_attemptsSpent");
            attemptsSpent++;
            this.set("_attemptsSpent", attemptsSpent);

            if (this.get('_attempts') == "infinite") return true;

            var attemptsLeft = this.get('_attemptsLeft');
            attemptsLeft--;
            this.set('_attemptsLeft', attemptsLeft);

            return true;
        },

        _getScore: function() {
            var score = 0;
            var questionComponents = this._currentQuestionComponents;
            for (var i = 0, l = questionComponents.length; i < l; i++) {
                var question = questionComponents[i];
                if (question.get('_isCorrect') && 
                    question.get('_questionWeight')) {
                    score += question.get('_questionWeight');
                }
            }
            return score;
        },
        
        _getMaxScore: function() {
            var maxScore = 0;
            var questionComponents = this._currentQuestionComponents;
            for (var i = 0, l = questionComponents.length; i < l; i++) {
                var question = questionComponents[i];
                if (question.get('_questionWeight')) {
                    maxScore += question.get('_questionWeight');
                }
            }
            return maxScore;
        },
        
        _getScoreAsPercent: function() {
            if (this._getMaxScore() === 0) return 0;
            return Math.round((this._getScore() / this._getMaxScore()) * 100);
        },

        _getLastAttemptScoreAsPercent: function() {
            return this.get('_lastAttemptScoreAsPercent');
        },

        _checkReloadPage: function() {
            if (!this.canResetInPage()) return false;

            var parentId = this.getParent().get("_id");
            var currentLocation = Adapt.location._currentId;

            //check if on assessment page and should rerender page
            if (currentLocation != parentId) return false;
            if (!this.get("_isReady")) return false;

            return true;
        },

        _reloadPage: function() {
            this._forceResetOnRevisit = true;

            Backbone.history.navigate("#/id/"+Adapt.location._currentId, { replace:true, trigger: true });
        },

        _resetQuestions: function() {
            var assessmentConfig = this.getConfig();
            var questionComponents = this._currentQuestionComponents;

            for (var i = 0, l = questionComponents.length; i < l; i++) {
                var question = questionComponents[i];
                question.reset(assessmentConfig._questions._resetType, true);
            }
        },

        _onRemove: function() {
            this._removeQuestionListeners();
        },



        _setCompletionStatus: function() {
            this.set({
                "_isComplete": true,
                "_isInteractionComplete": true,
            });
        },

        _checkIfQuestionsWereRestored: function() {
            if (this.get("_assessmentCompleteInSession")) return;
            if (!this.get("_isAssessmentComplete")) return;

            //fix for courses that do not remember the user selections
            //force assessment to reset if user revisits an assessment page in a new session which is completed
            var wereQuestionsRestored = true;

            var questions = this.get("_questions");
            for (var i = 0, l = questions.length; i < l; i++) {
                var question = questions[i];
                var questionModel = Adapt.findById(question._id);
                if (!questionModel.get("_isSubmitted")) {
                    wereQuestionsRestored = false;
                    break;
                }
            }
        
            if (!wereQuestionsRestored) {
                this.set("_assessmentCompleteInSession", true);
                return true;
            }

            return false;
        },


    //Public Functions

        isAssessmentEnabled: function() {
            if (this.get("_assessment") && 
                this.get("_assessment")._isEnabled) return true;
            return false;
        },

        canResetInPage: function() {
            var assessmentConfig = this.getConfig();
            if (assessmentConfig._reloadPageOnReset === false) return false;
            return true;
        },

        reset: function(force) {
            var assessmentConfig = this.getConfig();

            //check if forcing reset via page revisit or force parameter
            force = this._forceResetOnRevisit || force == true;
            this._forceResetOnRevisit = false;

            var isPageReload = this._checkReloadPage();

            //stop resetting if not complete or not allowed
            if (this.get("_assessmentCompleteInSession") && 
                    !assessmentConfig._isResetOnRevisit && 
                    !isPageReload && 
                    !force) return false;
            
            //check if new session and questions not restored
            var wereQuestionsRestored = this._checkIfQuestionsWereRestored();
            force = force || wereQuestionsRestored;
            // the assessment is going to be reset so we must reset attempts
            // otherwise assessment may not be set up properly in next session
            if (wereQuestionsRestored && !this._isAttemptsLeft()) {
                this.set({'_attemptsLeft':this.get('_attempts')});
                this.set({'_attemptsSpent':0});
            }

            //stop resetting if no attempts left
            if (!this._isAttemptsLeft() && !force) return false;

            if (!isPageReload) {
                //only perform this section when not attempting to reload the page
                this._setupAssessmentData(force);
            } else {
                this._reloadPage();
            }

            return true;
        },

        getSaveState: function() {
            var state = this.getState();
            var questions = state.questions;
            var indexByIdQuestions = _.indexBy(questions, "_id");

            for (var id in indexByIdQuestions) {
                indexByIdQuestions[id] = indexByIdQuestions[id]._isCorrect
            }

            var saveState = [
                state.isComplete ? 1:0,
                state.attemptsSpent,
                state.maxScore,
                state.score,
                state.attemptInProgress ? 1:0,
                indexByIdQuestions
            ];

            return saveState;
        },

        setRestoreState: function(restoreState) {
            var isComplete = restoreState[0] == 1 ? true : false;
            var attempts = this.get("_attempts");
            var attemptsSpent = restoreState[1];
            var maxScore = restoreState[2];
            var score = restoreState[3];
            var attemptInProgress = restoreState[4] == 1 ? true : false;
            var scoreAsPercent;

            var indexByIdQuestions = restoreState[5];

            var blockIds = {};
            for (var id in indexByIdQuestions) {
                var blockId = Adapt.findById(id).get("_parentId");
                blockIds[blockId] = Adapt.findById(blockId);
            }
            var restoredChildrenModels = _.values(blockIds);
            
            if (indexByIdQuestions) this.getChildren().models = restoredChildrenModels;


            this.set("_isAssessmentComplete", isComplete);
            this.set("_assessmentCompleteInSession", false);
            this.set("_attemptsSpent", attemptsSpent );
            this.set("_attemptInProgress", attemptInProgress )

            if (attempts == "infinite") this.set("_attemptsLeft", "infinite");
            else this.set("_attemptsLeft" , attempts - attemptsSpent);

            this.set("_maxScore", maxScore || this._getMaxScore());
            this.set("_score", score || 0);

            if (score) {
                scoreAsPercent = Math.round( score / maxScore  * 100);
            } else {
                scoreAsPercent = 0;
            }
        
            this.set("_scoreAsPercent", scoreAsPercent);
            this.set("_lastAttemptScoreAsPercent", scoreAsPercent)

            
            var questions = [];
            for (var id in indexByIdQuestions) {
                questions.push({
                    _id: id,
                    _isCorrect: indexByIdQuestions[id]
                });
            }

            

            this.set("_questions", questions);
            this._checkIsPass();

        },

        getState: function() {
            //return the current state of the assessment
            //create snapshot of values so as not to create memory leaks
            var assessmentConfig = this.getConfig();

            var state = {
                id: assessmentConfig._id,
                type: "article-assessment",
                pageId: this.getParent().get("_id"),
                isEnabled: assessmentConfig._isEnabled,
                isComplete: this.get("_isAssessmentComplete"),
                isPercentageBased: assessmentConfig._isPercentageBased,
                scoreToPass: assessmentConfig._scoreToPass,
                score: this.get("_score"),
                scoreAsPercent: this.get("_scoreAsPercent"),
                maxScore: this.get("_maxScore"),
                isPass: this.get("_isPass"),
                includeInTotalScore: assessmentConfig._includeInTotalScore,
                assessmentWeight: assessmentConfig._assessmentWeight,
                attempts: this.get("_attempts"),
                attemptsSpent: this.get("_attemptsSpent"),
                attemptsLeft: this.get("_attemptsLeft"),
                attemptInProgress: this.get("_attemptInProgress"),
                lastAttemptScoreAsPercent: this.get('_lastAttemptScoreAsPercent'),
                questions: this.get("_questions"),
                questionModels: new Backbone.Collection(this._currentQuestionComponents)
            };

            return state;
        },

        getConfig: function() {
            var assessmentConfig = this.get("_assessment");

            if (assessmentConfig._id === undefined) {
                assessmentConfig._id = "givenId"+(givenIdCount++);
            } else {
                return assessmentConfig;
            }

            if (!assessmentConfig) {
                assessmentConfig = $.extend(true, {}, assessmentConfigDefaults);
            } else {
                assessmentConfig = $.extend(true, {}, assessmentConfigDefaults, assessmentConfig);
            }

            this.set("_assessment", assessmentConfig);

            return assessmentConfig;
        }
        
    };

    return AssessmentModel;
});

define('extensions/adapt-contrib-assessment/js/assessment',[
    'coreJS/adapt'
], function(Adapt) {

    /*
        Here we setup a registry for all assessments
    */

    var assessmentsConfigDefaults = {
        "_postTotalScoreToLms": true,
        "_isPercentageBased": true,
        "_scoreToPass": 100,
        "_requireAssessmentPassed": false,
        "_isDefaultsLoaded": true
    };

    Adapt.assessment = _.extend({

    //Private functions

        _assessments: _.extend([], {
            _byPageId: {},
            _byAssessmentId: {}
        }),

        initialize: function() {
            this.listenTo(Adapt, "assessments:complete", this._onAssessmentsComplete);
            this.listenTo(Adapt, "router:location", this._checkResetAssessmentsOnRevisit);
        },

        _onAssessmentsComplete: function(state) {
            var assessmentId = state.id;

            state.isComplete = true;

            if (assessmentId === undefined) return;

            if (!this._getStateByAssessmentId(assessmentId)) {
                console.warn("assessments: state was not registered when assessment was created");
            }

            this.saveState();

            this._setPageProgress();

            this._checkAssessmentsComplete();

            //need to add spoor assessment state saving

        },

        _restoreModelState: function(assessmentModel) {

            if (!this._saveStateModel) {
                this._saveStateModel = Adapt.offlineStorage.get("assessment");
            }
            if (this._saveStateModel) {
                var state = assessmentModel.getState();
                if (this._saveStateModel[state.id]) {
                    assessmentModel.setRestoreState(this._saveStateModel[state.id]);
                }
            }

        },

        _checkResetAssessmentsOnRevisit: function(toObject) {
            /* 
                Here we hijack router:location to reorganise the assessment blocks 
                this must happen before trickle listens to block completion
            */
            if (toObject._contentType !== "page") return;

            //initialize assessment on page visit before pageView:preRender (and trickle)
            var pageAssessmentModels = this._getAssessmentByPageId(toObject._currentId);
            if (pageAssessmentModels === undefined) return;

            for (var i = 0, l = pageAssessmentModels.length; i < l; i++) {
                var pageAssessmentModel = pageAssessmentModels[i];
                pageAssessmentModel.reset();
            }

            this._setPageProgress();
        },

        _checkAssessmentsComplete: function() {
            var allAssessmentsComplete = true;
            var assessmentToPostBack = 0;
            var states = this._getStatesByAssessmentId();

            var assessmentStates = [];

            for (var id in states) {
                var state = states[id];
                if (!state.includeInTotalScore) continue;
                if (!state.isComplete) {
                    allAssessmentsComplete = false;
                    break;
                }
                assessmentToPostBack++;
                assessmentStates.push(state);
            }

            if (!allAssessmentsComplete || assessmentToPostBack === 0) return false;

            if (assessmentToPostBack === 1) {
                this._setupSingleAssessmentConfiguration(assessmentStates[0]);
            }

            this._postScoreToLms();

            return true;
        },

        _setupSingleAssessmentConfiguration: function(assessmentState) {
            var assessmentsConfig = Adapt.course.get("_assessment");
            $.extend(true, assessmentsConfig, {
                "_postTotalScoreToLms": assessmentState.includeInTotalScore,
                "_isPercentageBased": assessmentState.isPercentageBased,
                "_scoreToPass": assessmentState.scoreToPass
            });
            Adapt.course.set("_assessment", assessmentsConfig);
        },
        
        _postScoreToLms: function() {
            var assessmentsConfig = this.getConfig();
            if (assessmentsConfig._postTotalScoreToLms === false) return;
            
            var completionState = this.getState();
            //post completion to spoor
            _.defer(function() {
                Adapt.trigger("assessment:complete", completionState);
            });
        },

        _getAssessmentByPageId: function(pageId) {
            return this._assessments._byPageId[pageId];
        },

        _getStateByAssessmentId: function(assessmentId) {
            return this._assessments._byAssessmentId[assessmentId].getState();
        },

        _getStatesByAssessmentId: function() {
            var states = {};
            for (var i = 0, l = this._assessments.length; i < l; i++) {
                var assessmentModel = this._assessments[i];
                var state = assessmentModel.getState();
                states[state.id] = state;
            }
            return states;
        },

        _setPageProgress: function() {
            //set _subProgressTotal and _subProgressComplete on pages that have assessment progress indicator requirements
            
            var requireAssessmentPassed = this.getConfig()._requireAssessmentPassed;

            for (var k in this._assessments._byPageId) {

                var assessments = this._assessments._byPageId[k];

                var assessmentsTotal = assessments.length;
                var assessmentsPassed = 0;

                for (var i = 0, l = assessments.length; i < l; i++) {
                    var assessmentState = assessments[i].getState();

                    var isComplete;

                    if (requireAssessmentPassed) {
                        
                        if (!assessmentState.includeInTotalScore) {
                            isComplete = assessmentState.isComplete;
                        } else if (assessmentState.isPass) {
                            isComplete = assessmentState.isComplete;
                        }

                    } else {

                        isComplete = assessmentState.isComplete;
                    }

                    if ( isComplete ) {
                        assessmentsPassed+=1; 
                    }
                }

                try {
                    var pageModel = Adapt.findById(k);
                    pageModel.set("_subProgressTotal", assessmentsTotal);
                    pageModel.set("_subProgressComplete", assessmentsPassed);
                } catch(e) {

                }

            }
        },


    //Public functions

        register: function(assessmentModel) {
            var state = assessmentModel.getState();
            var assessmentId = state.id;
            var pageId = state.pageId;

            if (this._assessments._byPageId[pageId] === undefined) {
                this._assessments._byPageId[pageId] = [];
            }
            this._assessments._byPageId[pageId].push(assessmentModel);

            if (assessmentId) {
                this._assessments._byAssessmentId[assessmentId] = assessmentModel;
            }

            this._assessments.push(assessmentModel);

            this._restoreModelState(assessmentModel);

            Adapt.trigger("assessments:register", state, assessmentModel);

            this._setPageProgress();
        },

        get: function(id) {
            if (id === undefined) {
                return this._assessments.slice(0);
            } else {
                return this._assessments._byAssessmentId[id];
            }
        },

        saveState: function() {

            this._saveStateModel = {};
            for (var i = 0, assessmentModel; assessmentModel = this._assessments[i++];) {
                var state = assessmentModel.getState();
                this._saveStateModel[state.id] = assessmentModel.getSaveState();
            }

            Adapt.offlineStorage.set("assessment", this._saveStateModel);
        },

        getConfig: function () {
            var assessmentsConfig = Adapt.course.get("_assessment");

            if (assessmentsConfig && assessmentsConfig._isDefaultsLoaded) {
                return assessmentsConfig;
            }

            if (assessmentsConfig === undefined) {
                assessmentsConfig = $.extend(true, {}, assessmentsConfigDefaults);
            } else {
                assessmentsConfig = $.extend(true, {}, assessmentsConfigDefaults, assessmentsConfig);
            }

            Adapt.course.set("_assessment", assessmentsConfig);

            return assessmentsConfig;
        },
        
        getState: function() {
            var assessmentsConfig = this.getConfig();

            var score = 0;
            var maxScore = 0;
            var isPass = false;
            var totalAssessments = 0;

            var states = this._getStatesByAssessmentId();

            var assessmentsComplete = 0;

            for (var id in states) {
                var state = states[id];
                if (!state.includeInTotalScore) continue;
                if (state.isComplete) assessmentsComplete++;
                totalAssessments++;
                maxScore += state.maxScore / state.assessmentWeight;
                score += state.score / state.assessmentWeight;
                isPass = isPass === false ? false : state.isPass;
            }

            var isComplete = assessmentsComplete == totalAssessments;
            
            var scoreAsPercent = Math.round((score / maxScore) * 100);

            if ((assessmentsConfig._scoreToPass || 100) && isComplete) {
                if (assessmentsConfig._isPercentageBased || true) {
                    if (scoreAsPercent >= assessmentsConfig._scoreToPass) isPass = true;
                } else {
                    if (score >= assessmentsConfig._scoreToPass) isPass = true;
                }
            }

            return {
                isComplete: isComplete,
                isPercentageBased: assessmentsConfig._isPercentageBased,
                requireAssessmentPassed: assessmentsConfig._requireAssessmentPassed,
                isPass: isPass,
                scoreAsPercent: scoreAsPercent,
                maxScore: maxScore,
                score: score,
                assessmentsComplete: assessmentsComplete,
                assessments: totalAssessments
            };
        },

    }, Backbone.Events);

    Adapt.assessment.initialize();

});

define('extensions/adapt-contrib-assessment/js/adapt-assessmentArticleExtension',[
    'coreJS/adapt',
    'coreViews/articleView',
    'coreModels/articleModel',
    './adapt-assessmentArticleView',
    './adapt-assessmentArticleModel',
    './assessment',
], function(Adapt, ArticleView, ArticleModel, AdaptAssessmentArticleView, AdaptAssessmentArticleModel) {

    /*  
        Here we are extending the articleView and articleModel in Adapt.
        This is to accomodate the assessment functionality on the article.
        The advantage of this method is that the assessment behaviour can utilize all of the predefined article behaviour in both the view and the model.
    */  

    //Extends core/js/views/articleView.js
    var ArticleViewInitialize = ArticleView.prototype.initialize;
    ArticleView.prototype.initialize = function(options) {
        if (this.model.get("_assessment") && this.model.get("_assessment")._isEnabled === true) {
            //extend the articleView with new functionality
            _.extend(this, AdaptAssessmentArticleView);
        }
        //initialize the article in the normal manner
        return ArticleViewInitialize.apply(this, arguments);
    };

    //Extends core/js/models/articleModel.js
    var ArticleModelInitialize = ArticleModel.prototype.initialize;
    ArticleModel.prototype.initialize = function(options) {
        if (this.get("_assessment") && this.get("_assessment")._isEnabled === true) {
            //extend the articleModel with new functionality
            _.extend(this, AdaptAssessmentArticleModel);

            //initialize the article in the normal manner
            var returnValue = ArticleModelInitialize.apply(this, arguments);

            //initialize assessment article
            this._postInitialize();

            return returnValue;
        }

        //initialize the article in the normal manner if no assessment
        return ArticleModelInitialize.apply(this, arguments);
    };

});

define('extensions/adapt-contrib-bookmarking/js/adapt-contrib-bookmarking',[
    'coreJS/adapt'
], function(Adapt) {

    var Bookmarking = _.extend({

        bookmarkLevel: null,
        watchViewIds: null,
        watchViews: [],
        restoredLocationID: null,
        currentLocationID: null,

        initialize: function () {
            this.listenToOnce(Adapt, "router:location", this.onAdaptInitialize);
        },

        onAdaptInitialize: function() {
            if (!this.checkIsEnabled()) return;
            this.setupEventListeners();
            this.checkRestoreLocation();
        },

        checkIsEnabled: function() {
            var courseBookmarkModel = Adapt.course.get('_bookmarking');
            if (!courseBookmarkModel || !courseBookmarkModel._isEnabled) return false;
            if (!Adapt.offlineStorage) return false;
            return true;
        },

        setupEventListeners: function() {
            this._onScroll = _.debounce(_.bind(this.checkLocation, Bookmarking), 1000);
            this.listenTo(Adapt, 'menuView:ready', this.setupMenu);
            this.listenTo(Adapt, 'pageView:preRender', this.setupPage);
        },

        checkRestoreLocation: function() {
            this.restoredLocationID = Adapt.offlineStorage.get("location");

            if (!this.restoredLocationID || this.restoredLocationID === "undefined") return;

            this.listenToOnce(Adapt, "pageView:ready menuView:ready", this.restoreLocation);
        },

        restoreLocation: function() {
            _.defer(_.bind(function() {
                this.stopListening(Adapt, "pageView:ready menuView:ready", this.restoreLocation);

                if (this.restoredLocationID == Adapt.location._currentId) return;

                try {
                    var model = Adapt.findById(this.restoredLocationID);
                } catch (error) {
                    return;
                }
                
                if (!model) return;

                var locationOnscreen = $("." + this.restoredLocationID).onscreen();
                var isLocationOnscreen = locationOnscreen && (locationOnscreen.percentInview > 0);
                var isLocationFullyInview = locationOnscreen && (locationOnscreen.percentInview === 100);
                if (isLocationOnscreen && isLocationFullyInview) return;

                this.showPrompt();
            }, this));
        },

        showPrompt: function() {
            var courseBookmarkModel = Adapt.course.get('_bookmarking');
            if (!courseBookmarkModel._buttons) {
                courseBookmarkModel._buttons = {
                    yes: "Yes",
                    no: "No"
                };
            }
            if (!courseBookmarkModel._buttons.yes) courseBookmarkModel._buttons.yes = "Yes";
            if (!courseBookmarkModel._buttons.no) courseBookmarkModel._buttons.no = "No";


            this.listenToOnce(Adapt, "bookmarking:continue", this.navigateToPrevious);
            this.listenToOnce(Adapt, "bookmarking:cancel", this.navigateCancel);

            var promptObject = {
                title: courseBookmarkModel.title,
                body: courseBookmarkModel.body,
                _prompts:[
                    {
                        promptText: courseBookmarkModel._buttons.yes,
                        _callbackEvent: "bookmarking:continue",
                    },
                    {
                        promptText: courseBookmarkModel._buttons.no,
                        _callbackEvent: "bookmarking:cancel",
                    }
                ],
                _showIcon: true
            }

            if (Adapt.config.get("_accessibility") && Adapt.config.get("_accessibility")._isActive) {
                $(".loading").show();
                $("#a11y-focuser").focus();
                $("body").attr("aria-hidden", true);
                _.delay(function() {
                    $(".loading").hide();
                    $("body").removeAttr("aria-hidden");
                    Adapt.trigger('notify:prompt', promptObject);
                }, 3000);
            } else {
                Adapt.trigger('notify:prompt', promptObject);
            }
        },

        navigateToPrevious: function() {
            _.defer(_.bind(function() {
                var isSinglePage = Adapt.contentObjects.models.length == 1; 
                Backbone.history.navigate('#/id/' + this.restoredLocationID, {trigger: true, replace: isSinglePage});
            }, this));
            
            this.stopListening(Adapt, "bookmarking:cancel");
        },

        navigateCancel: function() {
            this.stopListening(Adapt, "bookmarking:continue");
        },

        resetLocationID: function () {
            this.setLocationID('');
        },

        setupMenu: function(menuView) {
            var menuModel = menuView.model;
            //set location as menu id unless menu is course, then reset location
            if (menuModel.get("_parentId")) return this.setLocationID(menuModel.get("_id"));
            else this.resetLocationID();
        },
        
        setupPage: function (pageView) {
            var hasPageBookmarkObject = pageView.model.has('_bookmarking');
            var bookmarkModel = (hasPageBookmarkObject) ? pageView.model.get('_bookmarking') : Adapt.course.get('_bookmarking');
            this.bookmarkLevel = bookmarkModel._level;

            if (!bookmarkModel._isEnabled) {
                this.resetLocationID();
                return;
            } else {
                //set location as page id
                this.setLocationID(pageView.model.get('_id'));

                this.watchViewIds = pageView.model.findDescendants(this.bookmarkLevel+"s").pluck("_id");
                this.listenTo(Adapt, this.bookmarkLevel + "View:postRender", this.captureViews);
                this.listenToOnce(Adapt, "remove", this.releaseViews);
                $(window).on("scroll", this._onScroll);
            }
        },

        captureViews: function (view) {
            this.watchViews.push(view);
        },

        setLocationID: function (id) {
            if (!Adapt.offlineStorage) return;
            if (this.currentLocationID == id) return;
            Adapt.offlineStorage.set("location", id);
            this.currentLocationID = id;
        },

        releaseViews: function () {
            this.watchViews.length = 0;
            this.watchViewIds.length = 0;
            this.stopListening(Adapt, 'remove', this.releaseViews);
            this.stopListening(Adapt, this.bookmarkLevel + 'View:postRender', this.captureViews);
            $(window).off("scroll", this._onScroll);
        },

        checkLocation: function() {
            var highestOnscreen = 0;
            var highestOnscreenLocation = "";

            var locationObjects = [];
            for (var i = 0, l = this.watchViews.length; i < l; i++) {
                var view = this.watchViews[i];

                var isViewAPageChild = (_.indexOf(this.watchViewIds, view.model.get("_id")) > -1 );

                if ( !isViewAPageChild ) continue;

                var element = $("." + view.model.get("_id"));
                var isVisible = (element.is(":visible"));

                if (!isVisible) continue;

                var measurements = element.onscreen();
                if (measurements.percentInview > highestOnscreen) {
                    highestOnscreen = measurements.percentInview;
                    highestOnscreenLocation = view.model.get("_id");
                }
            }

            //set location as most inview component
            if (highestOnscreenLocation) this.setLocationID(highestOnscreenLocation);
        }

    }, Backbone.Events)

    Bookmarking.initialize();

});

define('extensions/adapt-contrib-pageLevelProgress/js/completionCalculations',[
    'coreJS/adapt'
], function(Adapt) {
    
    // Calculate completion of a contentObject
    function calculateCompletion(contentObjectModel) {

        var viewType = contentObjectModel.get('_type'),
            nonAssessmentComponentsTotal = 0,
            nonAssessmentComponentsCompleted = 0,
            assessmentComponentsTotal = 0,
            assessmentComponentsCompleted = 0,
            subProgressCompleted = 0,
            subProgressTotal = 0,
            isComplete = contentObjectModel.get("_isComplete") ? 1 : 0;

        // If it's a page
        if (viewType == 'page') {
            var children = contentObjectModel.findDescendants('components').where({'_isAvailable': true, '_isOptional': false});

            var availableChildren = filterAvailableChildren(children);
            var components = getPageLevelProgressEnabledModels(availableChildren);

            var nonAssessmentComponents = getNonAssessmentComponents(components);

            nonAssessmentComponentsTotal = nonAssessmentComponents.length | 0,
            nonAssessmentComponentsCompleted = getComponentsCompleted(nonAssessmentComponents).length;

            var assessmentComponents = getAssessmentComponents(components);

            assessmentComponentsTotal = assessmentComponents.length | 0,
            assessmentComponentsCompleted = getComponentsInteractionCompleted(assessmentComponents).length;

            subProgressCompleted = contentObjectModel.get("_subProgressComplete") || 0;
            subProgressTotal = contentObjectModel.get("_subProgressTotal") || 0;

            var pageCompletion = {
                "subProgressCompleted": subProgressCompleted,
                "subProgressTotal": subProgressTotal,
                "nonAssessmentCompleted": nonAssessmentComponentsCompleted,
                "nonAssessmentTotal": nonAssessmentComponentsTotal,
                "assessmentCompleted": assessmentComponentsCompleted,
                "assessmentTotal": assessmentComponentsTotal
            };

            if (contentObjectModel.get("_pageLevelProgress") && contentObjectModel.get("_pageLevelProgress")._showPageCompletion !== false 
                && Adapt.course.get("_pageLevelProgress") && Adapt.course.get("_pageLevelProgress")._showPageCompletion !== false) {
                //optionally add one point extra for page completion to eliminate incomplete pages and full progress bars
                // if _showPageCompletion is true then the progress bar should also consider it so add 1 to nonAssessmentTotal
                pageCompletion.nonAssessmentCompleted += isComplete;
                pageCompletion.nonAssessmentTotal += 1;
            }

            return pageCompletion;
        }
        // If it's a sub-menu
        else if (viewType == 'menu') {

            _.each(contentObjectModel.get('_children').models, function(contentObject) {
                var completionObject = calculateCompletion(contentObject);
                subProgressCompleted += contentObjectModel.subProgressCompleted || 0;
                subProgressTotal += contentObjectModel.subProgressTotal || 0;
                nonAssessmentComponentsTotal += completionObject.nonAssessmentTotal;
                nonAssessmentComponentsCompleted += completionObject.nonAssessmentCompleted;
                assessmentComponentsTotal += completionObject.assessmentTotal;
                assessmentComponentsCompleted += completionObject.assessmentCompleted;
            });

            return {
                "subProgressCompleted": subProgressCompleted,
                "subProgressTotal" : subProgressTotal,
                "nonAssessmentCompleted": nonAssessmentComponentsCompleted,
                "nonAssessmentTotal": nonAssessmentComponentsTotal,
                "assessmentCompleted": assessmentComponentsCompleted,
                "assessmentTotal": assessmentComponentsTotal,
            };
        }
    }

    function getNonAssessmentComponents(models) {
        return _.filter(models, function(model) {
            return !model.get('_isPartOfAssessment');
        });
    }

    function getAssessmentComponents(models) {
        return _.filter(models, function(model) {
            return model.get('_isPartOfAssessment');
        });
    }

    function getComponentsCompleted(models) {
        return _.filter(models, function(item) {
            return item.get('_isComplete');
        });
    }

    function getComponentsInteractionCompleted(models) {
        return _.filter(models, function(item) {
            return item.get('_isInteractionComplete');
        });
    }

    //Get only those models who were enabled for pageLevelProgress
    function getPageLevelProgressEnabledModels(models) {
        return _.filter(models, function(model) {
            if (model.get('_pageLevelProgress')) {
                return model.get('_pageLevelProgress')._isEnabled;
            }
        });
    }

    function unavailableInHierarchy(parents) {
        if (parents.length > 0) {
            var parentsAvailable = _.map(parents, function(parent) {
                return parent.get('_isAvailable');
            });
            return _.indexOf(parentsAvailable, false) > -1;
        } else {
            return;
        }
    }

    function filterAvailableChildren(children) {
        var availableChildren = [];

        for(var child=0; child < children.length; child++) {
            var parents = children[child].getParents().models;
            if (!unavailableInHierarchy(parents)) {
                availableChildren.push(children[child]);
            }
        }

        return availableChildren;
    }

    return {
    	calculateCompletion: calculateCompletion,
    	getPageLevelProgressEnabledModels: getPageLevelProgressEnabledModels,
        filterAvailableChildren: filterAvailableChildren
    };

})
;
define('extensions/adapt-contrib-pageLevelProgress/js/PageLevelProgressMenuView',['require','coreJS/adapt','backbone'],function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');

    var PageLevelProgressMenuView = Backbone.View.extend({

        className: 'page-level-progress-menu-item',

        initialize: function() {
            this.listenTo(Adapt, 'remove', this.remove);

            this.ariaText = '';
            if (Adapt.course.get('_globals')._extensions && Adapt.course.get('_globals')._extensions._pageLevelProgress && Adapt.course.get('_globals')._extensions._pageLevelProgress.pageLevelProgressMenuBar) {
                this.ariaText = Adapt.course.get('_globals')._extensions._pageLevelProgress.pageLevelProgressMenuBar + ' ';
            }

            this.render();

            _.defer(_.bind(function() {
                this.updateProgressBar();
            }, this));
        },

        events: {
        },

        render: function() {
            var data = this.model.toJSON();
            _.extend(data, {
                _globals: Adapt.course.get('_globals')
            });
            var template = Handlebars.templates['pageLevelProgressMenu'];

            this.$el.html(template(data));
            return this;
        },

        updateProgressBar: function() {
            if (this.model.get('completedChildrenAsPercentage')) {
                var percentageOfCompleteComponents = this.model.get('completedChildrenAsPercentage');
            } else {
                var percentageOfCompleteComponents = 0;
            }

            // Add percentage of completed components as an aria label attribute
            this.$('.page-level-progress-menu-item-indicator-bar .aria-label').html(this.ariaText + Math.floor(percentageOfCompleteComponents) + '%');

        },

    });

    return PageLevelProgressMenuView;

});

define('extensions/adapt-contrib-pageLevelProgress/js/PageLevelProgressView',['require','coreJS/adapt','backbone'],function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');

    var PageLevelProgressView = Backbone.View.extend({

        className: 'page-level-progress',

        initialize: function() {
            this.listenTo(Adapt, 'remove', this.remove);
            this.render();
        },

        events: {
            'click .page-level-progress-item button': 'scrollToPageElement'
        },

        scrollToPageElement: function(event) {
            if(event && event.preventDefault) event.preventDefault();
            var currentComponentSelector = '.' + $(event.currentTarget).attr('data-page-level-progress-id');
            var $currentComponent = $(currentComponentSelector);
            Adapt.once('drawer:closed', function() {
                Adapt.scrollTo($currentComponent, { duration:400 });
            });
            Adapt.trigger('drawer:closeDrawer');
        },

        render: function() {
            var components = this.collection.toJSON();
            var data = {
                components: components,
                _globals: Adapt.course.get('_globals')
            };
            var template = Handlebars.templates['pageLevelProgress'];
            this.$el.html(template(data));
            this.$el.a11y_aria_label(true);
            return this;
        }

    });

    return PageLevelProgressView;

});

define('extensions/adapt-contrib-pageLevelProgress/js/PageLevelProgressNavigationView',['require','coreJS/adapt','backbone','./completionCalculations','extensions/adapt-contrib-pageLevelProgress/js/PageLevelProgressView'],function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');
    var completionCalculations = require('./completionCalculations');

    var PageLevelProgressView = require('extensions/adapt-contrib-pageLevelProgress/js/PageLevelProgressView');

    var PageLevelProgressNavigationView = Backbone.View.extend({

        tagName: 'button',

        className: 'base page-level-progress-navigation',

        initialize: function() {
            this.listenTo(Adapt, 'remove', this.remove);
            this.listenTo(Adapt, 'router:location', this.updateProgressBar);
            this.listenTo(Adapt, 'pageLevelProgress:update', this.refreshProgressBar);
            this.listenTo(this.collection, 'change:_isInteractionComplete', this.updateProgressBar);
            this.listenTo(this.model, 'change:_isInteractionComplete', this.updateProgressBar);
            this.$el.attr('role', 'button');
            this.ariaText = '';
            
            if (Adapt.course.has('_globals') && Adapt.course.get('_globals')._extensions && Adapt.course.get('_globals')._extensions._pageLevelProgress && Adapt.course.get('_globals')._extensions._pageLevelProgress.pageLevelProgressIndicatorBar) {
                this.ariaText = Adapt.course.get('_globals')._extensions._pageLevelProgress.pageLevelProgressIndicatorBar +  ' ';
            }
            
            this.render();
            
            _.defer(_.bind(function() {
                this.updateProgressBar();
            }, this));
        },

        events: {
            'click': 'onProgressClicked'
        },

        render: function() {
            var components = this.collection.toJSON();
            var data = {
                components: components,
                _globals: Adapt.course.get('_globals')
            };            

            var template = Handlebars.templates['pageLevelProgressNavigation'];
            $('.navigation-drawer-toggle-button').after(this.$el.html(template(data)));
            return this;
        },
        
        refreshProgressBar: function() {
            var currentPageComponents = this.model.findDescendants('components').where({'_isAvailable': true});
            var availableChildren = completionCalculations.filterAvailableChildren(currentPageComponents);
            var enabledProgressComponents = completionCalculations.getPageLevelProgressEnabledModels(availableChildren);
            
            this.collection = new Backbone.Collection(enabledProgressComponents);
            this.updateProgressBar();
        },

        updateProgressBar: function() {
            var completionObject = completionCalculations.calculateCompletion(this.model);
            
            //take all assessment, nonassessment and subprogress into percentage
            //this allows the user to see if assessments have been passed, if assessment components can be retaken, and all other component's completion
            
            var completed = completionObject.nonAssessmentCompleted + completionObject.assessmentCompleted + completionObject.subProgressCompleted;
            var total  = completionObject.nonAssessmentTotal + completionObject.assessmentTotal + completionObject.subProgressTotal;

            var percentageComplete = Math.floor((completed / total)*100);


            this.$('.page-level-progress-navigation-bar').css('width', percentageComplete + '%');

            // Add percentage of completed components as an aria label attribute
            this.$el.attr('aria-label', this.ariaText +  percentageComplete + '%');

            // Set percentage of completed components to model attribute to update progress on MenuView
            this.model.set('completedChildrenAsPercentage', percentageComplete);
        },

        onProgressClicked: function(event) {
            if(event && event.preventDefault) event.preventDefault();
            Adapt.drawer.triggerCustomView(new PageLevelProgressView({collection: this.collection}).$el, false);
        }

    });

    return PageLevelProgressNavigationView;

});

define('extensions/adapt-contrib-pageLevelProgress/js/adapt-contrib-pageLevelProgress',['require','coreJS/adapt','backbone','./completionCalculations','extensions/adapt-contrib-pageLevelProgress/js/PageLevelProgressMenuView','extensions/adapt-contrib-pageLevelProgress/js/PageLevelProgressNavigationView'],function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');
    var completionCalculations = require('./completionCalculations');

    var PageLevelProgressMenuView = require('extensions/adapt-contrib-pageLevelProgress/js/PageLevelProgressMenuView');
    var PageLevelProgressNavigationView = require('extensions/adapt-contrib-pageLevelProgress/js/PageLevelProgressNavigationView');

    function setupPageLevelProgress(pageModel, enabledProgressComponents) {

        new PageLevelProgressNavigationView({model: pageModel, collection:  new Backbone.Collection(enabledProgressComponents) });

    }

    // This should add/update progress on menuView
    Adapt.on('menuView:postRender', function(view) {

        if (view.model.get('_id') == Adapt.location._currentId) return;

        // do not proceed until pageLevelProgress enabled on course.json
        if (!Adapt.course.get('_pageLevelProgress') || !Adapt.course.get('_pageLevelProgress')._isEnabled) {
            return;
        }

        var pageLevelProgress = view.model.get('_pageLevelProgress');
        var viewType = view.model.get('_type');

        // Progress bar should not render for course viewType
        if (viewType == 'course') return;

        if (pageLevelProgress && pageLevelProgress._isEnabled) {

            var completionObject = completionCalculations.calculateCompletion(view.model);

            //take all non-assessment components and subprogress info into the percentage
            //this allows the user to see if the assessments are passed (subprogress) and all other components are complete
            
            var completed = completionObject.nonAssessmentCompleted + completionObject.subProgressCompleted;
            var total = completionObject.nonAssessmentTotal + completionObject.subProgressTotal;

            var percentageComplete = Math.floor((completed / total)*100);
            
            view.model.set('completedChildrenAsPercentage', percentageComplete);
            view.$el.find('.menu-item-inner').append(new PageLevelProgressMenuView({model: view.model}).$el);

        }

    });

    // This should add/update progress on page navigation bar
    Adapt.on('router:page', function(pageModel) {

        // do not proceed until pageLevelProgress enabled on course.json
        if (!Adapt.course.get('_pageLevelProgress') || !Adapt.course.get('_pageLevelProgress')._isEnabled) {
            return;
        }

        var currentPageComponents = pageModel.findDescendants('components').where({'_isAvailable': true});
        var availableComponents = completionCalculations.filterAvailableChildren(currentPageComponents);
        var enabledProgressComponents = completionCalculations.getPageLevelProgressEnabledModels(availableComponents);

        if (enabledProgressComponents.length > 0) {
            setupPageLevelProgress(pageModel, enabledProgressComponents);
        }

    });

});

define('extensions/adapt-contrib-resources/js/adapt-contrib-resourcesView',['require','backbone','coreJS/adapt'],function(require) {

    var Backbone = require('backbone');
    var Adapt = require('coreJS/adapt');

    var ResourcesView = Backbone.View.extend({

        className: "resources",

        initialize: function() {
            this.listenTo(Adapt, 'remove', this.remove);
            this.render();
        },

        events: {
            'click .resources-filter button': 'onFilterClicked',
            'click .resources-item-container button': 'onResourceClicked'
        },

        render: function() {
            var collectionData = this.collection.toJSON();
            var modelData = this.model.toJSON();
            var template = Handlebars.templates["resources"];
            this.$el.html(template({model: modelData, resources:collectionData, _globals: Adapt.course.get('_globals')}));
            _.defer(_.bind(this.postRender, this));
            return this;
        },

        postRender: function() {
            this.listenTo(Adapt, 'drawer:triggerCustomView', this.remove);
        },

        onFilterClicked: function(event) {
            event.preventDefault();
            var $currentTarget = $(event.currentTarget);
            this.$('.resources-filter button').removeClass('selected');
            var filter = $currentTarget.addClass('selected').attr('data-filter');
            var items = [];

            if (filter === 'all') {
                items = this.$('.resources-item').removeClass('display-none');
            } else {
                this.$('.resources-item').removeClass('display-none').not("." + filter).addClass('display-none');
                items = this.$('.resources-item.' + filter);
            }

            if (items.length === 0) return;
            $(items[0]).a11y_focus();
        },

        onResourceClicked: function(event) {
            window.top.open($(event.currentTarget).data("href"));
        }
    });

    return ResourcesView;
})
;
define('extensions/adapt-contrib-resources/js/adapt-contrib-resourcesHelpers',['require','handlebars'],function(require) {

	var Handlebars = require('handlebars');

	Handlebars.registerHelper('if_collection_contains', function(collection, attribute, value, block) {
		var makeBlockVisible = false;

		_.each(collection, function(resource) {
			if (resource[attribute] === value) {
				makeBlockVisible = true;
			}
		});
		if(makeBlockVisible) {
            return block.fn(this);
        } else {
            return block.inverse();
        }
    });

    Handlebars.registerHelper('if_collection_contains_only_one_item', function(collection, attribute, block) {
		var attributeCount = [];

		_.each(collection, function(resource) {
			var resourceAttribute = resource[attribute];
			if (_.indexOf(attributeCount, resourceAttribute) === -1) {
				attributeCount.push(resourceAttribute);
			}
		});

		if (attributeCount.length <= 1) {
			return block.fn(this);
		} else {
			return block.inverse(this);
		}

    });

    Handlebars.registerHelper('return_column_layout_from_collection_length', function(collection, attribute) {
		var attributeCount = [];

		_.each(collection, function(resource) {
			var resourceAttribute = resource[attribute];
			if (_.indexOf(attributeCount, resourceAttribute) === -1) {
				attributeCount.push(resourceAttribute);
			}
		});

		return (attributeCount.length + 1);

    });

})
	;
define('extensions/adapt-contrib-resources/js/adapt-contrib-resources',[
    'backbone',
    'coreJS/adapt',
    './adapt-contrib-resourcesView',
    './adapt-contrib-resourcesHelpers'
], function(Backbone, Adapt, ResourcesView, ResourcesHelpers) {

    function setupResources(resourcesModel, resourcesItems) {

        var resourcesCollection = new Backbone.Collection(resourcesItems);
        var resourcesModel = new Backbone.Model(resourcesModel);

        Adapt.on('resources:showResources', function() {
            Adapt.drawer.triggerCustomView(new ResourcesView({
                model: resourcesModel,
                collection: resourcesCollection
            }).$el);
        });

    }

    Adapt.once('app:dataReady', function() {

        var courseResources = Adapt.course.get('_resources');

        // do not proceed until resource set on course.json
        if (!courseResources || courseResources._isEnabled === false) return;

        var drawerObject = {
            title: courseResources.title,
            description: courseResources.description,
            className: 'resources-drawer'
        };
        // Syntax for adding a Drawer item
        // Adapt.drawer.addItem([object], [callbackEvent]);
        Adapt.drawer.addItem(drawerObject, 'resources:showResources');

        setupResources(courseResources, courseResources._resourcesItems);

    });

});

/*global console*/

/* ===========================================================

pipwerks SCORM Wrapper for JavaScript
v1.1.20160322

Created by Philip Hutchison, January 2008-2016
https://github.com/pipwerks/scorm-api-wrapper

Copyright (c) Philip Hutchison
MIT-style license: http://pipwerks.mit-license.org/

This wrapper works with both SCORM 1.2 and SCORM 2004.

Inspired by APIWrapper.js, created by the ADL and
Concurrent Technologies Corporation, distributed by
the ADL (http://www.adlnet.gov/scorm).

SCORM.API.find() and SCORM.API.get() functions based
on ADL code, modified by Mike Rustici
(http://www.scorm.com/resources/apifinder/SCORMAPIFinder.htm),
further modified by Philip Hutchison

=============================================================== */


var pipwerks = {};                                  //pipwerks 'namespace' helps ensure no conflicts with possible other "SCORM" variables
pipwerks.UTILS = {};                                //For holding UTILS functions
pipwerks.debug = { isActive: true };                //Enable (true) or disable (false) for debug mode

pipwerks.SCORM = {                                  //Define the SCORM object
    version:    null,                               //Store SCORM version.
    handleCompletionStatus: true,                   //Whether or not the wrapper should automatically handle the initial completion status
    handleExitMode: true,                           //Whether or not the wrapper should automatically handle the exit mode
    API:        { handle: null,
                  isFound: false },                 //Create API child object
    connection: { isActive: false },                //Create connection child object
    data:       { completionStatus: null,
                  exitStatus: null },               //Create data child object
    debug:      {}                                  //Create debug child object
};



/* --------------------------------------------------------------------------------
   pipwerks.SCORM.isAvailable
   A simple function to allow Flash ExternalInterface to confirm
   presence of JS wrapper before attempting any LMS communication.

   Parameters: none
   Returns:    Boolean (true)
----------------------------------------------------------------------------------- */

pipwerks.SCORM.isAvailable = function(){
    return true;
};



// ------------------------------------------------------------------------- //
// --- SCORM.API functions ------------------------------------------------- //
// ------------------------------------------------------------------------- //


/* -------------------------------------------------------------------------
   pipwerks.SCORM.API.find(window)
   Looks for an object named API in parent and opener windows

   Parameters: window (the browser window object).
   Returns:    Object if API is found, null if no API found
---------------------------------------------------------------------------- */

pipwerks.SCORM.API.find = function(win){

    var API = null,
        findAttempts = 0,
        findAttemptLimit = 500,
        traceMsgPrefix = "SCORM.API.find",
        trace = pipwerks.UTILS.trace,
        scorm = pipwerks.SCORM;

    while ((!win.API && !win.API_1484_11) &&
           (win.parent) &&
           (win.parent != win) &&
           (findAttempts <= findAttemptLimit)){

                findAttempts++;
                win = win.parent;

    }

    //If SCORM version is specified by user, look for specific API
    if(scorm.version){

        switch(scorm.version){

            case "2004" :

                if(win.API_1484_11){

                    API = win.API_1484_11;

                } else {

                    trace(traceMsgPrefix +": SCORM version 2004 was specified by user, but API_1484_11 cannot be found.");

                }

                break;

            case "1.2" :

                if(win.API){

                    API = win.API;

                } else {

                    trace(traceMsgPrefix +": SCORM version 1.2 was specified by user, but API cannot be found.");

                }

                break;

        }

    } else {                             //If SCORM version not specified by user, look for APIs

        if(win.API_1484_11) {            //SCORM 2004-specific API.

            scorm.version = "2004";      //Set version
            API = win.API_1484_11;

        } else if(win.API){              //SCORM 1.2-specific API

            scorm.version = "1.2";       //Set version
            API = win.API;

        }

    }

    if(API){

        trace(traceMsgPrefix +": API found. Version: " +scorm.version);
        trace("API: " +API);

    } else {

        trace(traceMsgPrefix +": Error finding API. \nFind attempts: " +findAttempts +". \nFind attempt limit: " +findAttemptLimit);

    }

    return API;

};


/* -------------------------------------------------------------------------
   pipwerks.SCORM.API.get()
   Looks for an object named API, first in the current window's frame
   hierarchy and then, if necessary, in the current window's opener window
   hierarchy (if there is an opener window).

   Parameters:  None.
   Returns:     Object if API found, null if no API found
---------------------------------------------------------------------------- */

pipwerks.SCORM.API.get = function(){

    var API = null,
        win = window,
        scorm = pipwerks.SCORM,
        find = scorm.API.find,
        trace = pipwerks.UTILS.trace;

    API = find(win);

    if(!API && win.parent && win.parent != win){
        API = find(win.parent);
    }

    if(!API && win.top && win.top.opener){
        API = find(win.top.opener);
    }

    //Special handling for Plateau
    //Thanks to Joseph Venditti for the patch
    if(!API && win.top && win.top.opener && win.top.opener.document) {
        API = find(win.top.opener.document);
    }

    if(API){
        scorm.API.isFound = true;
    } else {
        trace("API.get failed: Can't find the API!");
    }

    return API;

};


/* -------------------------------------------------------------------------
   pipwerks.SCORM.API.getHandle()
   Returns the handle to API object if it was previously set

   Parameters:  None.
   Returns:     Object (the pipwerks.SCORM.API.handle variable).
---------------------------------------------------------------------------- */

pipwerks.SCORM.API.getHandle = function() {

    var API = pipwerks.SCORM.API;

    if(!API.handle && !API.isFound){

        API.handle = API.get();

    }

    return API.handle;

};



// ------------------------------------------------------------------------- //
// --- pipwerks.SCORM.connection functions --------------------------------- //
// ------------------------------------------------------------------------- //


/* -------------------------------------------------------------------------
   pipwerks.SCORM.connection.initialize()
   Tells the LMS to initiate the communication session.

   Parameters:  None
   Returns:     Boolean
---------------------------------------------------------------------------- */

pipwerks.SCORM.connection.initialize = function(){

    var success = false,
        scorm = pipwerks.SCORM,
        completionStatus = scorm.data.completionStatus,
        trace = pipwerks.UTILS.trace,
        makeBoolean = pipwerks.UTILS.StringToBoolean,
        debug = scorm.debug,
        traceMsgPrefix = "SCORM.connection.initialize ";

    trace("connection.initialize called.");

    if(!scorm.connection.isActive){

        var API = scorm.API.getHandle(),
            errorCode = 0;

        if(API){

            switch(scorm.version){
                case "1.2" : success = makeBoolean(API.LMSInitialize("")); break;
                case "2004": success = makeBoolean(API.Initialize("")); break;
            }

            if(success){

                //Double-check that connection is active and working before returning 'true' boolean
                errorCode = debug.getCode();

                if(errorCode !== null && errorCode === 0){

                    scorm.connection.isActive = true;

                    if(scorm.handleCompletionStatus){

                        //Automatically set new launches to incomplete
                        completionStatus = scorm.status("get");

                        if(completionStatus){

                            switch(completionStatus){

                                //Both SCORM 1.2 and 2004
                                case "not attempted": scorm.status("set", "incomplete"); break;

                                //SCORM 2004 only
                                case "unknown" : scorm.status("set", "incomplete"); break;

                                //Additional options, presented here in case you'd like to use them
                                //case "completed"  : break;
                                //case "incomplete" : break;
                                //case "passed"     : break;    //SCORM 1.2 only
                                //case "failed"     : break;    //SCORM 1.2 only
                                //case "browsed"    : break;    //SCORM 1.2 only

                            }

                            //Commit changes
                            scorm.save();

                        }

                    }

                } else {

                    success = false;
                    trace(traceMsgPrefix +"failed. \nError code: " +errorCode +" \nError info: " +debug.getInfo(errorCode));

                }

            } else {

                errorCode = debug.getCode();

                if(errorCode !== null && errorCode !== 0){

                    trace(traceMsgPrefix +"failed. \nError code: " +errorCode +" \nError info: " +debug.getInfo(errorCode));

                } else {

                    trace(traceMsgPrefix +"failed: No response from server.");

                }
            }

        } else {

            trace(traceMsgPrefix +"failed: API is null.");

        }

    } else {

          trace(traceMsgPrefix +"aborted: Connection already active.");

     }

     return success;

};


/* -------------------------------------------------------------------------
   pipwerks.SCORM.connection.terminate()
   Tells the LMS to terminate the communication session

   Parameters:  None
   Returns:     Boolean
---------------------------------------------------------------------------- */

pipwerks.SCORM.connection.terminate = function(){

    var success = false,
        scorm = pipwerks.SCORM,
        exitStatus = scorm.data.exitStatus,
        completionStatus = scorm.data.completionStatus,
        trace = pipwerks.UTILS.trace,
        makeBoolean = pipwerks.UTILS.StringToBoolean,
        debug = scorm.debug,
        traceMsgPrefix = "SCORM.connection.terminate ";


    if(scorm.connection.isActive){

        var API = scorm.API.getHandle(),
            errorCode = 0;

        if(API){

             if(scorm.handleExitMode && !exitStatus){

                if(completionStatus !== "completed" && completionStatus !== "passed"){

                    switch(scorm.version){
                        case "1.2" : success = scorm.set("cmi.core.exit", "suspend"); break;
                        case "2004": success = scorm.set("cmi.exit", "suspend"); break;
                    }

                } else {

                    switch(scorm.version){
                        case "1.2" : success = scorm.set("cmi.core.exit", "logout"); break;
                        case "2004": success = scorm.set("cmi.exit", "normal"); break;
                    }

                }

            }

            //Ensure we persist the data
            success = scorm.save();

            if(success){

                switch(scorm.version){
                    case "1.2" : success = makeBoolean(API.LMSFinish("")); break;
                    case "2004": success = makeBoolean(API.Terminate("")); break;
                }

                if(success){

                    scorm.connection.isActive = false;

                } else {

                    errorCode = debug.getCode();
                    trace(traceMsgPrefix +"failed. \nError code: " +errorCode +" \nError info: " +debug.getInfo(errorCode));

                }

            }

        } else {

            trace(traceMsgPrefix +"failed: API is null.");

        }

    } else {

        trace(traceMsgPrefix +"aborted: Connection already terminated.");

    }

    return success;

};



// ------------------------------------------------------------------------- //
// --- pipwerks.SCORM.data functions --------------------------------------- //
// ------------------------------------------------------------------------- //


/* -------------------------------------------------------------------------
   pipwerks.SCORM.data.get(parameter)
   Requests information from the LMS.

   Parameter: parameter (string, name of the SCORM data model element)
   Returns:   string (the value of the specified data model element)
---------------------------------------------------------------------------- */

pipwerks.SCORM.data.get = function(parameter){

    var value = null,
        scorm = pipwerks.SCORM,
        trace = pipwerks.UTILS.trace,
        debug = scorm.debug,
        traceMsgPrefix = "SCORM.data.get('" +parameter +"') ";

    if(scorm.connection.isActive){

        var API = scorm.API.getHandle(),
            errorCode = 0;

          if(API){

            switch(scorm.version){
                case "1.2" : value = API.LMSGetValue(parameter); break;
                case "2004": value = API.GetValue(parameter); break;
            }

            errorCode = debug.getCode();

            //GetValue returns an empty string on errors
            //If value is an empty string, check errorCode to make sure there are no errors
            if(value !== "" || errorCode === 0){

                //GetValue is successful.
                //If parameter is lesson_status/completion_status or exit status, let's
                //grab the value and cache it so we can check it during connection.terminate()
                switch(parameter){

                    case "cmi.core.lesson_status":
                    case "cmi.completion_status" : scorm.data.completionStatus = value; break;

                    case "cmi.core.exit":
                    case "cmi.exit"     : scorm.data.exitStatus = value; break;

                }

            } else {

                trace(traceMsgPrefix +"failed. \nError code: " +errorCode +"\nError info: " +debug.getInfo(errorCode));

            }

        } else {

            trace(traceMsgPrefix +"failed: API is null.");

        }

    } else {

        trace(traceMsgPrefix +"failed: API connection is inactive.");

    }

    trace(traceMsgPrefix +" value: " +value);

    return String(value);

};


/* -------------------------------------------------------------------------
   pipwerks.SCORM.data.set()
   Tells the LMS to assign the value to the named data model element.
   Also stores the SCO's completion status in a variable named
   pipwerks.SCORM.data.completionStatus. This variable is checked whenever
   pipwerks.SCORM.connection.terminate() is invoked.

   Parameters: parameter (string). The data model element
               value (string). The value for the data model element
   Returns:    Boolean
---------------------------------------------------------------------------- */

pipwerks.SCORM.data.set = function(parameter, value){

    var success = false,
        scorm = pipwerks.SCORM,
        trace = pipwerks.UTILS.trace,
        makeBoolean = pipwerks.UTILS.StringToBoolean,
        debug = scorm.debug,
        traceMsgPrefix = "SCORM.data.set('" +parameter +"') ";


    if(scorm.connection.isActive){

        var API = scorm.API.getHandle(),
            errorCode = 0;

        if(API){

            switch(scorm.version){
                case "1.2" : success = makeBoolean(API.LMSSetValue(parameter, value)); break;
                case "2004": success = makeBoolean(API.SetValue(parameter, value)); break;
            }

            if(success){

                if(parameter === "cmi.core.lesson_status" || parameter === "cmi.completion_status"){

                    scorm.data.completionStatus = value;

                }

            } else {

                errorCode = debug.getCode();

                trace(traceMsgPrefix +"failed. \nError code: " +errorCode +". \nError info: " +debug.getInfo(errorCode));

            }

        } else {

            trace(traceMsgPrefix +"failed: API is null.");

        }

    } else {

        trace(traceMsgPrefix +"failed: API connection is inactive.");

    }

	trace(traceMsgPrefix +" value: " +value);

    return success;

};


/* -------------------------------------------------------------------------
   pipwerks.SCORM.data.save()
   Instructs the LMS to persist all data to this point in the session

   Parameters: None
   Returns:    Boolean
---------------------------------------------------------------------------- */

pipwerks.SCORM.data.save = function(){

    var success = false,
        scorm = pipwerks.SCORM,
        trace = pipwerks.UTILS.trace,
        makeBoolean = pipwerks.UTILS.StringToBoolean,
        traceMsgPrefix = "SCORM.data.save failed";


    if(scorm.connection.isActive){

        var API = scorm.API.getHandle();

        if(API){

            switch(scorm.version){
                case "1.2" : success = makeBoolean(API.LMSCommit("")); break;
                case "2004": success = makeBoolean(API.Commit("")); break;
            }

        } else {

            trace(traceMsgPrefix +": API is null.");

        }

    } else {

        trace(traceMsgPrefix +": API connection is inactive.");

    }

    return success;

};


pipwerks.SCORM.status = function (action, status){

    var success = false,
        scorm = pipwerks.SCORM,
        trace = pipwerks.UTILS.trace,
        traceMsgPrefix = "SCORM.getStatus failed",
        cmi = "";

    if(action !== null){

        switch(scorm.version){
            case "1.2" : cmi = "cmi.core.lesson_status"; break;
            case "2004": cmi = "cmi.completion_status"; break;
        }

        switch(action){

            case "get": success = scorm.data.get(cmi); break;

            case "set": if(status !== null){

                            success = scorm.data.set(cmi, status);

                        } else {

                            success = false;
                            trace(traceMsgPrefix +": status was not specified.");

                        }

                        break;

            default      : success = false;
                        trace(traceMsgPrefix +": no valid action was specified.");

        }

    } else {

        trace(traceMsgPrefix +": action was not specified.");

    }

    return success;

};


// ------------------------------------------------------------------------- //
// --- pipwerks.SCORM.debug functions -------------------------------------- //
// ------------------------------------------------------------------------- //


/* -------------------------------------------------------------------------
   pipwerks.SCORM.debug.getCode
   Requests the error code for the current error state from the LMS

   Parameters: None
   Returns:    Integer (the last error code).
---------------------------------------------------------------------------- */

pipwerks.SCORM.debug.getCode = function(){

    var scorm = pipwerks.SCORM,
        API = scorm.API.getHandle(),
        trace = pipwerks.UTILS.trace,
        code = 0;

    if(API){

        switch(scorm.version){
            case "1.2" : code = parseInt(API.LMSGetLastError(), 10); break;
            case "2004": code = parseInt(API.GetLastError(), 10); break;
        }

    } else {

        trace("SCORM.debug.getCode failed: API is null.");

    }

    return code;

};


/* -------------------------------------------------------------------------
   pipwerks.SCORM.debug.getInfo()
   "Used by a SCO to request the textual description for the error code
   specified by the value of [errorCode]."

   Parameters: errorCode (integer).
   Returns:    String.
----------------------------------------------------------------------------- */

pipwerks.SCORM.debug.getInfo = function(errorCode){

    var scorm = pipwerks.SCORM,
        API = scorm.API.getHandle(),
        trace = pipwerks.UTILS.trace,
        result = "";


    if(API){

        switch(scorm.version){
            case "1.2" : result = API.LMSGetErrorString(errorCode.toString()); break;
            case "2004": result = API.GetErrorString(errorCode.toString()); break;
        }

    } else {

        trace("SCORM.debug.getInfo failed: API is null.");

    }

    return String(result);

};


/* -------------------------------------------------------------------------
   pipwerks.SCORM.debug.getDiagnosticInfo
   "Exists for LMS specific use. It allows the LMS to define additional
   diagnostic information through the API Instance."

   Parameters: errorCode (integer).
   Returns:    String (Additional diagnostic information about the given error code).
---------------------------------------------------------------------------- */

pipwerks.SCORM.debug.getDiagnosticInfo = function(errorCode){

    var scorm = pipwerks.SCORM,
        API = scorm.API.getHandle(),
        trace = pipwerks.UTILS.trace,
        result = "";

    if(API){

        switch(scorm.version){
            case "1.2" : result = API.LMSGetDiagnostic(errorCode); break;
            case "2004": result = API.GetDiagnostic(errorCode); break;
        }

    } else {

        trace("SCORM.debug.getDiagnosticInfo failed: API is null.");

    }

    return String(result);

};


// ------------------------------------------------------------------------- //
// --- Shortcuts! ---------------------------------------------------------- //
// ------------------------------------------------------------------------- //

// Because nobody likes typing verbose code.

pipwerks.SCORM.init = pipwerks.SCORM.connection.initialize;
pipwerks.SCORM.get  = pipwerks.SCORM.data.get;
pipwerks.SCORM.set  = pipwerks.SCORM.data.set;
pipwerks.SCORM.save = pipwerks.SCORM.data.save;
pipwerks.SCORM.quit = pipwerks.SCORM.connection.terminate;



// ------------------------------------------------------------------------- //
// --- pipwerks.UTILS functions -------------------------------------------- //
// ------------------------------------------------------------------------- //


/* -------------------------------------------------------------------------
   pipwerks.UTILS.StringToBoolean()
   Converts 'boolean strings' into actual valid booleans.

   (Most values returned from the API are the strings "true" and "false".)

   Parameters: String
   Returns:    Boolean
---------------------------------------------------------------------------- */

pipwerks.UTILS.StringToBoolean = function(value){
    var t = typeof value;
    switch(t){
       //typeof new String("true") === "object", so handle objects as string via fall-through.
       //See https://github.com/pipwerks/scorm-api-wrapper/issues/3
       case "object":
       case "string": return (/(true|1)/i).test(value);
       case "number": return !!value;
       case "boolean": return value;
       case "undefined": return null;
       default: return false;
    }
};



/* -------------------------------------------------------------------------
   pipwerks.UTILS.trace()
   Displays error messages when in debug mode.

   Parameters: msg (string)
   Return:     None
---------------------------------------------------------------------------- */

pipwerks.UTILS.trace = function(msg){

     if(pipwerks.debug.isActive){

        if(window.console && window.console.log){
            window.console.log(msg);
        } else {
            //alert(msg);
        }

     }
};

define("extensions/adapt-contrib-spoor/js/scorm/API", function(){});

define ('extensions/adapt-contrib-spoor/js/scorm/wrapper',['require'],function(require) {

	/*
		IMPORTANT: This wrapper uses the Pipwerks SCORM wrapper and should therefore support both SCORM 1.2 and 2004. Ensure any changes support both versions.
	*/

	var ScormWrapper = function() {
		/* configuration */
		this.setCompletedWhenFailed = true;// this only applies to SCORM 2004
		/**
		 * whether to commit each time there's a change to lesson_status or not
		 */
		this.commitOnStatusChange = true;
		/**
		 * how frequently (in minutes) to commit automatically. set to 0 to disable.
		 */
		this.timedCommitFrequency = 10;
		/**
		 * how many times to retry if a commit fails
		 */
		this.maxCommitRetries = 5;
		/**
		 * time (in milliseconds) to wait between retries
		 */
		this.commitRetryDelay = 1000;
		
		/**
		 * prevents commit from being called if there's already a 'commit retry' pending.
		 */
		this.commitRetryPending = false;
		/**
		 * how many times we've done a 'commit retry'
		 */
		this.commitRetries = 0;
		/**
		 * not currently used - but you could include in an error message to show when data was last saved
		 */
		this.lastCommitSuccessTime = null;
		
		this.timedCommitIntervalID = null;
		this.retryCommitTimeoutID = null;
		this.logOutputWin = null;
		this.startTime = null;
		this.endTime = null;
		
		this.lmsConnected = false;
		this.finishCalled = false;
		
		this.logger = Logger.getInstance();
		this.scorm = pipwerks.SCORM;

		this.suppressErrors = false;
        
		if (window.__debug)
			this.showDebugWindow();
	};

	// static
	ScormWrapper.instance = null;

	/******************************* public methods *******************************/

	// static
	ScormWrapper.getInstance = function() {
		if (ScormWrapper.instance === null)
			ScormWrapper.instance = new ScormWrapper();
		
		return ScormWrapper.instance;
	};

	ScormWrapper.prototype.getVersion = function() {
		return this.scorm.version;
	};

	ScormWrapper.prototype.setVersion = function(value) {
		this.scorm.version = value;
		/**
		 * stop the pipwerks code from setting cmi.core.exit to suspend/logout when targeting SCORM 1.2.
		 * there doesn't seem to be any tangible benefit to doing this in 1.2 and it can actually cause problems with some LMSes
		 * (e.g. setting it to 'logout' apparently causes Plateau to log the user completely out of the LMS!)
		 * It needs to be on for SCORM 2004 though, otherwise the LMS might not restore the suspend_data
		 */
		this.scorm.handleExitMode = this.isSCORM2004();
	};

	ScormWrapper.prototype.initialize = function() {
		this.lmsConnected = this.scorm.init();

		if (this.lmsConnected) {
			this.startTime = new Date();
			
			this.initTimedCommit();
		}
		else {
			this.handleError("Course could not connect to the LMS");
		}
		
		return this.lmsConnected;
	};

	/**
	* allows you to check if this is the user's first ever 'session' of a SCO, even after the lesson_status has been set to 'incomplete'
	*/
	ScormWrapper.prototype.isFirstSession = function() {
		return (this.getValue(this.isSCORM2004() ? "cmi.entry" :"cmi.core.entry") === "ab-initio");
	};

	ScormWrapper.prototype.setIncomplete = function() {
		this.setValue(this.isSCORM2004() ? "cmi.completion_status" : "cmi.core.lesson_status", "incomplete");

		if(this.commitOnStatusChange) this.commit();
	};

	ScormWrapper.prototype.setCompleted = function() {
		this.setValue(this.isSCORM2004() ? "cmi.completion_status" : "cmi.core.lesson_status", "completed");
		
		if(this.commitOnStatusChange) this.commit();
	};

	ScormWrapper.prototype.setPassed = function() {
		if (this.isSCORM2004()) {
			this.setValue("cmi.completion_status", "completed");
			this.setValue("cmi.success_status", "passed");
		}
		else {
			this.setValue("cmi.core.lesson_status", "passed");
		}

		if(this.commitOnStatusChange) this.commit();
	};

	ScormWrapper.prototype.setFailed = function() {
		if (this.isSCORM2004()) {
			this.setValue("cmi.success_status", "failed");
			
			if(this.setCompletedWhenFailed)
				this.setValue("cmi.completion_status", "completed");
		}
		else {
			this.setValue("cmi.core.lesson_status", "failed");
		}

			if(this.commitOnStatusChange) this.commit();
	};

	ScormWrapper.prototype.getStatus = function() {
		var status = this.getValue(this.isSCORM2004() ? "cmi.completion_status" : "cmi.core.lesson_status");

		switch(status.toLowerCase()) {// workaround for some LMSes (e.g. Arena) not adhering to the all-lowercase rule
			case "passed":
			case "completed":
			case "incomplete":
			case "failed":
			case "browsed":
			case "not attempted":
			case "not_attempted":// mentioned in SCORM 2004 docs but not sure it ever gets used
			case "unknown": //the SCORM 2004 version of not attempted
				return status;
			break;
			default:
				this.handleError("ScormWrapper::getStatus: invalid lesson status '" + status + "' received from LMS");
				return null;
		}
	};

	ScormWrapper.prototype.setStatus = function(status) {
		switch (status.toLowerCase()){
        case "incomplete":
          this.setIncomplete();
          break;
        case "completed":
          this.setCompleted();
          break;
        case "passed":
          this.setPassed();
          break;
        case "failed":
          this.setFailed();
          break;
        default:
          this.handleError("ScormWrapper::setStatus: the status '" + status + "' is not supported.");
          break;
      }
	}

	ScormWrapper.prototype.getScore = function() {
		return this.getValue(this.isSCORM2004() ? "cmi.score.raw" : "cmi.core.score.raw");
	};

	ScormWrapper.prototype.setScore = function(_score, _minScore, _maxScore) {
		if (this.isSCORM2004()) {
			this.setValue("cmi.score.raw", _score) && this.setValue("cmi.score.min", _minScore) && this.setValue("cmi.score.max", _maxScore) && this.setValue("cmi.score.scaled", _score / 100);
		}
		else {
			this.setValue("cmi.core.score.raw", _score);

			if(this.isSupported("cmi.core.score.min")) this.setValue("cmi.core.score.min", _minScore);

			if(this.isSupported("cmi.core.score.max")) this.setValue("cmi.core.score.max", _maxScore);
		}
	};

	ScormWrapper.prototype.getLessonLocation = function() {
		return this.getValue(this.isSCORM2004() ? "cmi.location" : "cmi.core.lesson_location");
	};

	ScormWrapper.prototype.setLessonLocation = function(_location) {
		this.setValue(this.isSCORM2004() ? "cmi.location" : "cmi.core.lesson_location", _location);
	};

	ScormWrapper.prototype.getSuspendData = function() {
		return this.getValue("cmi.suspend_data");
	};

	ScormWrapper.prototype.setSuspendData = function(_data) {
		this.setValue("cmi.suspend_data", _data);
	};

	ScormWrapper.prototype.getStudentName = function() {
		return this.getValue(this.isSCORM2004() ? "cmi.learner_name" : "cmi.core.student_name");
	};

	ScormWrapper.prototype.getStudentId = function(){
		return this.getValue(this.isSCORM2004() ? "cmi.learner_id":"cmi.core.student_id");
	};

	ScormWrapper.prototype.commit = function() {
		this.logger.debug("ScormWrapper::commit");
		
		if (this.lmsConnected) {
			if (this.commitRetryPending) {
				this.logger.debug("ScormWrapper::commit: skipping this commit call as one is already pending.");
			}
			else {
				if (this.scorm.save()) {
					this.commitRetries = 0;
					this.lastCommitSuccessTime = new Date();
				}
				else {
					if (this.commitRetries < this.maxCommitRetries && !this.finishCalled) {
						this.commitRetries++;
						this.initRetryCommit();
					}
					else {
						var _errorCode = this.scorm.debug.getCode();

						var _errorMsg = "Course could not commit data to the LMS";
						_errorMsg += "\nError " + _errorCode + ": " + this.scorm.debug.getInfo(_errorCode);
						_errorMsg += "\nLMS Error Info: " + this.scorm.debug.getDiagnosticInfo(_errorCode);

						this.handleError(_errorMsg);
					}
				}
			}
		}
		else {
			this.handleError("Course is not connected to the LMS");
		}
	};

	ScormWrapper.prototype.finish = function() {
		this.logger.debug("ScormWrapper::finish");
		
		if (this.lmsConnected && !this.finishCalled) {
			this.finishCalled = true;
			
			if(this.timedCommitIntervalID != null) {
				window.clearInterval(this.timedCommitIntervalID);
			}
			
			if(this.commitRetryPending) {
				window.clearTimeout(this.retryCommitTimeoutID);
				this.commitRetryPending = false;
			}
			
			if (this.logOutputWin && !this.logOutputWin.closed) {
				this.logOutputWin.close();
			}
			
			this.endTime = new Date();
			
			if (this.isSCORM2004()) {
				this.scorm.set("cmi.session_time", this.convertToSCORM2004Time(this.endTime.getTime() - this.startTime.getTime()));
			}
			else {
				this.scorm.set("cmi.core.session_time", this.convertToSCORM12Time(this.endTime.getTime() - this.startTime.getTime()));
				this.scorm.set("cmi.core.exit", "");
			}
			
			// api no longer available from this point
			this.lmsConnected = false;
			
			if (!this.scorm.quit()) {
				this.handleError("Course could not finish");
			}
		}
		else {
			this.handleError("Course is not connected to the LMS");
		}
	};

	ScormWrapper.prototype.recordInteraction = function(id, response, correct, latency, type) {
		if(this.isSupported("cmi.interactions._count")) {
			switch(type) {
				case "choice":
					this.recordInteractionMultipleChoice.apply(this, arguments);
					break;

				case "matching":
					this.recordInteractionMatching.apply(this, arguments);
					break;

				case "numeric":
					this.isSCORM2004() ? this.recordInteractionScorm2004.apply(this, arguments) : this.recordInteractionScorm12.apply(this, arguments);
					break;

				case "fill-in":
					this.recordInteractionFillIn.apply(this, arguments);
					break;

				default:
					console.error("ScormWrapper.recordInteraction: unknown interaction type of '" + type + "' encountered...");
			}
		}
		else {
			this.logger.info("ScormWrapper::recordInteraction: cmi.interactions are not supported by this LMS...");
		}
	};

	/****************************** private methods ******************************/
	ScormWrapper.prototype.getValue = function(_property) {
		this.logger.debug("ScormWrapper::getValue: _property=" + _property);

		if(this.finishCalled) {
			this.logger.debug("ScormWrapper::getValue: ignoring request as 'finish' has been called");
			return;
		}
		
		if (this.lmsConnected) {
			var _value = this.scorm.get(_property);
			var _errorCode = this.scorm.debug.getCode();
			var _errorMsg = "";
			
			if (_errorCode !== 0) {
				if (_errorCode === 403) {
					this.logger.warn("ScormWrapper::getValue: data model element not initialized");
				}
				else {
					_errorMsg += "Course could not get " + _property;
					_errorMsg += "\nError Info: " + this.scorm.debug.getInfo(_errorCode);
					_errorMsg += "\nLMS Error Info: " + this.scorm.debug.getDiagnosticInfo(_errorCode);
					
					this.handleError(_errorMsg);
				}
			}
			this.logger.debug("ScormWrapper::getValue: returning " + _value);
			return _value + "";
		}
		else {
			this.handleError("Course is not connected to the LMS");
		}
	};

	ScormWrapper.prototype.setValue = function(_property, _value) {
		this.logger.debug("ScormWrapper::setValue: _property=" + _property + " _value=" + _value);

		if(this.finishCalled) {
			this.logger.debug("ScormWrapper::setValue: ignoring request as 'finish' has been called");
			return;
		}
		
		if (this.lmsConnected) {
			var _success = this.scorm.set(_property, _value);
			var _errorCode = this.scorm.debug.getCode();
			var _errorMsg = "";
			
			if (!_success) {
			/*
			* Some LMSes have an annoying tendency to return false from a set call even when it actually worked fine.
			* So, we should throw an error _only_ if there was a valid error code...
			*/
				if(_errorCode !== 0) {
					_errorMsg += "Course could not set " + _property + " to " + _value;
					_errorMsg += "\nError Info: " + this.scorm.debug.getInfo(_errorCode);
					_errorMsg += "\nLMS Error Info: " + this.scorm.debug.getDiagnosticInfo(_errorCode);
					
					this.handleError(_errorMsg);
				}
				else {
					this.logger.warn("ScormWrapper::setValue: LMS reported that the 'set' call failed but then said there was no error!");
				}
			}
			
			return _success;
		}
		else {
			this.handleError("Course is not connected to the LMS");
		}
	};

	/**
	* used for checking any data field that is not 'LMS Mandatory' to see whether the LMS we're running on supports it or not.
	* Note that the way this check is being performed means it wouldn't work for any element that is
	* 'write only', but so far we've not had a requirement to check for any optional elements that are.
	*/
	ScormWrapper.prototype.isSupported = function(_property) {
		this.logger.debug("ScormWrapper::isSupported: _property=" + _property);

		if(this.finishCalled) {
			this.logger.debug("ScormWrapper::isSupported: ignoring request as 'finish' has been called");
			return;
		}
		
		if (this.lmsConnected) {
			var _value = this.scorm.get(_property);
			var _errorCode = this.scorm.debug.getCode();
			
			return (_errorCode === 401 ? false : true);
		}
		else {
			this.handleError("Course is not connected to the LMS");
			return false;
		}
	};

	ScormWrapper.prototype.initTimedCommit = function() {
		this.logger.debug("ScormWrapper::initTimedCommit");
		
		if(this.timedCommitFrequency > 0) {
			var delay = this.timedCommitFrequency * (60 * 1000);
			this.timedCommitIntervalID = window.setInterval(_.bind(this.commit, this), delay);
		}
	};

	ScormWrapper.prototype.initRetryCommit = function() {
		this.logger.debug("ScormWrapper::initRetryCommit " + this.commitRetries + " out of " + this.maxCommitRetries);
		
		this.commitRetryPending = true;// stop anything else from calling commit until this is done
		
		this.retryCommitTimeoutID = window.setTimeout(_.bind(this.doRetryCommit, this), this.commitRetryDelay);
	};

	ScormWrapper.prototype.doRetryCommit = function() {
		this.logger.debug("ScormWrapper::doRetryCommit");

		this.commitRetryPending = false;

		this.commit();
	};

	ScormWrapper.prototype.handleError = function(_msg) {
		this.logger.error(_msg);
		
		if (!this.suppressErrors && (!this.logOutputWin || this.logOutputWin.closed) && confirm("An error has occured:\n\n" + _msg + "\n\nPress 'OK' to view debug information to send to technical support."))
			this.showDebugWindow();
	};


	ScormWrapper.prototype.getInteractionCount = function(){

		var count = this.getValue("cmi.interactions._count");

		return count === "" ? 0 : count;
	};
	
	ScormWrapper.prototype.recordInteractionScorm12 = function(id, response, correct, latency, type) {
		
		id = this.trim(id);

		var cmiPrefix = "cmi.interactions." + this.getInteractionCount();
		
		this.setValue(cmiPrefix + ".id", id);
		this.setValue(cmiPrefix + ".type", type);
		this.setValue(cmiPrefix + ".student_response", response);
		this.setValue(cmiPrefix + ".result", correct ? "correct" : "wrong");
		if (latency !== null && latency !== undefined) this.setValue(cmiPrefix + ".latency", this.convertToSCORM12Time(latency));
		this.setValue(cmiPrefix + ".time", this.getCMITime());
	};


	ScormWrapper.prototype.recordInteractionScorm2004 = function(id, response, correct, latency, type) {

		id = this.trim(id);

		var cmiPrefix = "cmi.interactions." + this.getInteractionCount();
		
		this.setValue(cmiPrefix + ".id", id);
		this.setValue(cmiPrefix + ".type", type);
		this.setValue(cmiPrefix + ".learner_response", response);
		this.setValue(cmiPrefix + ".result", correct ? "correct" : "incorrect");
		if (latency !== null && latency !== undefined) this.setValue(cmiPrefix + ".latency", this.convertToSCORM2004Time(latency));
		this.setValue(cmiPrefix + ".timestamp", this.getISO8601Timestamp());
	};


	ScormWrapper.prototype.recordInteractionMultipleChoice = function(id, response, correct, latency, type) {
		
		if(this.isSCORM2004()) {
			response = response.replace(/,|#/g, "[,]");
		} else {
			response = response.replace(/#/g, ",");
		}
		
		var scormRecordInteraction = this.isSCORM2004() ? this.recordInteractionScorm2004 : this.recordInteractionScorm12;

		scormRecordInteraction.call(this, id, response, correct, latency, type);
	};

	
	ScormWrapper.prototype.recordInteractionMatching = function(id, response, correct, latency, type) {

		response = response.replace(/#/g, ",");

		if(this.isSCORM2004()) {
			response = response.replace(/,/g, "[,]");
			response = response.replace(/\./g, "[.]");
		}
		
		var scormRecordInteraction = this.isSCORM2004() ? this.recordInteractionScorm2004 : this.recordInteractionScorm12;

		scormRecordInteraction.call(this, id, response, correct, latency, type);
	};


	ScormWrapper.prototype.recordInteractionFillIn = function(id, response, correct, latency, type) {
		
		var maxLength = this.isSCORM2004() ? 250 : 255;

		if(response.length > maxLength) {
			response = response.substr(0,maxLength);

			this.logger.warn("ScormWrapper::recordInteractionFillIn: response data for " + id + " is longer than the maximum allowed length of " + maxLength + " characters; data will be truncated to avoid an error.");
		}

		var scormRecordInteraction = this.isSCORM2004() ? this.recordInteractionScorm2004 : this.recordInteractionScorm12;

		scormRecordInteraction.call(this, id, response, correct, latency, type);
	};

	ScormWrapper.prototype.showDebugWindow = function() {
		
		if (this.logOutputWin && !this.logOutputWin.closed) {
			this.logOutputWin.close();
		}
		
		this.logOutputWin = window.open("log_output.html", "Log", "width=600,height=300,status=no,scrollbars=yes,resize=yes,menubar=yes,toolbar=yes,location=yes,top=0,left=0");
		
		if (this.logOutputWin)
			this.logOutputWin.focus();
		
		return;
	};

	ScormWrapper.prototype.convertToSCORM12Time = function(msConvert) {
		
		var msPerSec = 1000;
		var msPerMin = msPerSec * 60;
		var msPerHour = msPerMin * 60;

		var ms = msConvert % msPerSec;
		msConvert = msConvert - ms;

		var secs = msConvert % msPerMin;
		msConvert = msConvert - secs;
		secs = secs / msPerSec;

		var mins = msConvert % msPerHour;
		msConvert = msConvert - mins;
		mins = mins / msPerMin;

		var hrs = msConvert / msPerHour;

		if(hrs > 9999) {
			return "9999:99:99.99";
		}
		else {
			var str = [this.padWithZeroes(hrs,4), this.padWithZeroes(mins, 2), this.padWithZeroes(secs, 2)].join(":");
			return (str + '.' + Math.floor(ms/10));
		}
	};

	/**
	* Converts milliseconds into the SCORM 2004 data type 'timeinterval (second, 10,2)'
	* this will output something like 'P1DT3H5M0S' which indicates a period of time of 1 day, 3 hours and 5 minutes
	* or 'PT2M10.1S' which indicates a period of time of 2 minutes and 10.1 seconds
	*/
	ScormWrapper.prototype.convertToSCORM2004Time = function(msConvert) {
		var csConvert = Math.floor(msConvert / 10);
		var csPerSec = 100;
		var csPerMin = csPerSec * 60;
		var csPerHour = csPerMin * 60;
		var csPerDay = csPerHour * 24;

		var days = Math.floor(csConvert/ csPerDay);
		csConvert -= days * csPerDay
		days = days ? days + "D" : "";

		var hours = Math.floor(csConvert/ csPerHour);
		csConvert -= hours * csPerHour
		hours = hours ? hours + "H" : "";

		var mins = Math.floor(csConvert/ csPerMin);
		csConvert -= mins * csPerMin
		mins = mins ? mins + "M" : "";

		var secs = Math.floor(csConvert/ csPerSec);
		csConvert -= secs * csPerSec
		secs = secs ? secs : "0";

		var cs = csConvert;
		cs = cs ? "." + cs : "";
		
		var seconds = secs + cs + "S";
		
		var hms = [hours,mins,seconds].join("");
		
		return "P" + days + "T" + hms;
	};

	ScormWrapper.prototype.getCMITime = function() {
		
		var date = new Date();

		var hours = this.padWithZeroes(date.getHours(),2);
		var min = this.padWithZeroes(date.getMinutes(),2);
		var sec = this.padWithZeroes(date.getSeconds(),2);

		return [hours, min, sec].join(":");
	};

	ScormWrapper.prototype.getISO8601Timestamp = function() {
	
		var date = new Date();
		
		var ymd = [
			date.getFullYear(),
			this.padWithZeroes(date.getMonth()+1,2),
			this.padWithZeroes(date.getDate(),2)
		].join("-");

		var hms = [
			this.padWithZeroes(date.getHours(),2),
			this.padWithZeroes(date.getMinutes(),2),
			this.padWithZeroes(date.getSeconds(),2)
		].join(":");


		return ymd+"T"+hms;
	};

	ScormWrapper.prototype.padWithZeroes = function(numToPad, padBy) {

		var len = padBy;

		while(--len){ numToPad = "0" + numToPad }

		return numToPad.slice(-padBy);
	};

	ScormWrapper.prototype.trim = function(str) {
		return str.replace(/^\s*|\s*$/g, "");
	};

	ScormWrapper.prototype.isSCORM2004 = function() {
		return this.scorm.version === "2004";
	};

	return ScormWrapper;
});

Logger = function() {
	this.logArr = new Array();
	this.registeredViews = new Array();
};

// static
Logger.instance = null;
Logger.LOG_TYPE_INFO = 0;
Logger.LOG_TYPE_WARN = 1;
Logger.LOG_TYPE_ERROR = 2;
Logger.LOG_TYPE_DEBUG = 3;

Logger.getInstance = function() {
	if (Logger.instance == null)
		Logger.instance = new Logger();
	return Logger.instance;
};

Logger.prototype.getEntries = function() {
	return this.logArr;
};

Logger.prototype.getLastEntry = function() {
	return this.logArr[this.logArr.length - 1];
};

Logger.prototype.info = function(str) {
	this.logArr[this.logArr.length] = {str:str, type:Logger.LOG_TYPE_INFO};
	this.updateViews();
};

Logger.prototype.warn = function(str) {
	this.logArr[this.logArr.length] = {str:str, type:Logger.LOG_TYPE_WARN};
	this.updateViews();
};

Logger.prototype.error = function(str) {
	this.logArr[this.logArr.length] = {str:str, type:Logger.LOG_TYPE_ERROR};
	this.updateViews();
};

Logger.prototype.debug = function(str) {
	this.logArr[this.logArr.length] = {str:str, type:Logger.LOG_TYPE_DEBUG};
	this.updateViews();
};

//register a view
Logger.prototype.registerView = function(_view) {
	this.registeredViews[this.registeredViews.length] = _view;
};

//unregister a view
Logger.prototype.unregisterView = function(_view) {
	for (var i = 0; i < this.registeredViews.length; i++)
		if (this.registeredViews[i] == _view) {
			this.registeredViews.splice(i, 1);
			i--;
		}
};

// update all views
Logger.prototype.updateViews = function() {
	for (var i = 0; i < this.registeredViews.length; i++) {
		if (this.registeredViews[i])
			this.registeredViews[i].update(this);
	}
};
define("extensions/adapt-contrib-spoor/js/scorm/logger", function(){});

define('extensions/adapt-contrib-spoor/js/scorm',[
	'./scorm/API',
 	'./scorm/wrapper',
	'./scorm/logger',
], function(API, wrapper, logger) {

	//Load and prepare SCORM API

	return wrapper.getInstance();

});
define('extensions/adapt-contrib-spoor/js/serializers/default',[
    'coreJS/adapt'
], function (Adapt) {

    //Captures the completion status of the blocks
    //Returns and parses a '1010101' style string

    var serializer = {
        serialize: function () {
            return this.serializeSaveState('_isComplete');
        },

        serializeSaveState: function(attribute) {
            if (Adapt.course.get('_latestTrackingId') === undefined) {
                var message = "This course is missing a latestTrackingID.\n\nPlease run the grunt process prior to deploying this module on LMS.\n\nScorm tracking will not work correctly until this is done.";
                console.error(message);
            }

            var excludeAssessments = Adapt.config.get('_spoor') && Adapt.config.get('_spoor')._tracking && Adapt.config.get('_spoor')._tracking._excludeAssessments;

            // create the array to be serialised, pre-populated with dashes that represent unused tracking ids - because we'll never re-use a tracking id in the same course
            var data = [];
            var length = Adapt.course.get('_latestTrackingId') + 1;
            for (var i = 0; i < length; i++) {
                data[i] = "-";
            }

            // now go through all the blocks, replacing the appropriate dashes with 0 (incomplete) or 1 (completed) for each of the blocks
            _.each(Adapt.blocks.models, function(model, index) {
                var _trackingId = model.get('_trackingId'),
                    isPartOfAssessment = model.getParent().get('_assessment'),
                    state = model.get(attribute) ? 1: 0;

                if(excludeAssessments && isPartOfAssessment) {
                    state = 0;
                }

                if (_trackingId === undefined) {
                    var message = "Block '" + model.get('_id') + "' doesn't have a tracking ID assigned.\n\nPlease run the grunt process prior to deploying this module on LMS.\n\nScorm tracking will not work correctly until this is done.";
                    console.error(message);
                } else {
                    data[_trackingId] = state;
                }
            }, this);

            return data.join("");
        },

        deserialize: function (completion) {

            _.each(this.deserializeSaveState(completion), function(state, blockTrackingId) {
                if (state === 1) {
                    this.markBlockAsComplete(Adapt.blocks.findWhere({_trackingId: blockTrackingId}));
                }
            }, this);

        },    

        deserializeSaveState: function (string) {
            var completionArray = string.split("");

            for (var i = 0; i < completionArray.length; i++) {
                if (completionArray[i] === "-") {
                    completionArray[i] = -1;
                } else {
                    completionArray[i] = parseInt(completionArray[i], 10);
                }
            }

            return completionArray;
        },

        markBlockAsComplete: function(block) {
            if (!block) {
                return;
            }
        
            block.getChildren().each(function(child) {
                child.set('_isComplete', true);
            }, this);
        }

    };

    return serializer;
});

//https://raw.githubusercontent.com/oliverfoster/SCORMSuspendDataSerializer 2015-06-27
(function(_) {

	function toPrecision(number, precision) {
		if (precision === undefined) precision = 2
		var multiplier = 1 * Math.pow(10, precision);
		return Math.round(number * multiplier) / multiplier;
	}

	function BinaryToNumber(bin, length) {
		return parseInt(bin.substr(0, length), 2);
	}

	function NumberToBinary(number, length) {
		return Padding.fillLeft( number.toString(2), length );
	}

	var Padding = {
		addLeft: function PaddingAddLeft(str, x , char) {
			char = char || "0";
			return (new Array( x + 1)).join(char) + str;
		},
		addRight: function PaddingAddRight(str, x, char) {
			char = char || "0";
			return  str + (new Array( x + 1)).join(char);
		},
		fillLeft: function PaddingFillLeft(str, x, char) {
			if (str.length < x) {
	        	var paddingLength = x - str.length;
	        	return Padding.addLeft(str, paddingLength, char)
	        }
	        return str;
		},
		fillRight: function PaddingFillLeft(str, x, char) {
			if (str.length < x) {
	        	var paddingLength = x - str.length;
	        	return Padding.addRight(str, paddingLength, char)
	        }
	        return str;
		},
		fillBlockLeft: function PaddingFillBlockRight(str, x, char) {
			if (str.length % x) {
	        	var paddingLength = x - (str.length % x);
	        	return Padding.addLeft(str, paddingLength, char)
	        }
	        return str;
		},
		fillBlockRight: function PaddingFillBlockRight(str, x, char) {
			if (str.length % x) {
	        	var paddingLength = x - (str.length % x);
	        	return Padding.addRight(str, paddingLength, char)
	        }
	        return str;
		}
	};

	function Base64() {
		switch (arguments.length) {
		case 1:
			var firstArgumentType = typeof arguments[0];
			switch (firstArgumentType) {
			case "number":
				return Base64._indexes[arguments[0]];
			case "string":
				return Base64._chars[arguments[0]];
			default:
				throw "Invalid arguments type";
			}
		case 2:
			var char = arguments[0];
			var index = arguments[1];
			Base64._chars[char] = index;
			Base64._indexes[index] = char;
			return;
		default:
			throw "Invalid number of arguments";
		}
	}
	Base64._chars = {};
	Base64._indexes = {};
	(function() {
		var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		for (var i = 0, l = alphabet.length; i<l; i++) {
			Base64(alphabet[i], i);
		}
	})();


	function DataType() {
		switch (arguments.length) {
		case 1:
			switch (typeof  arguments[0]) {
			case "object":
				var item = arguments[0]
				if (DataType._types[item.type] === undefined) DataType._types[item.type] = [];
				DataType._types[item.type].push(item);
				item.index = DataType._indexes.length
				DataType._indexes.push(item);
				DataType[item.name] = item;
				return;
			case "string":
				return DataType.getName(arguments[0]);
			case "number":
				return DataType.getIndex(arguments[0]);
			default:
				throw "Argument type not allowed";
			}
		default:
			throw "Too many arguments";
		}
		
	}
	DataType.VARIABLELENGTHDESCRIPTORSIZE = 8;
	DataType._types = {};
	DataType._indexes = [];
	DataType.getName = function DataTypeGetName(name) {
		if (DataType[name])
			return DataType[name];
		throw "Type name not found '"+name+"'";
	};
	DataType.getIndex = function DataTypeGetIndex(index) {
		if (DataType._indexes[index])
			return DataType._indexes[index];
		throw "Type index not found '"+index+"'";
	};
	DataType.getTypes = function DataTypeGetTypes(type) {
		if (DataType._types[type])
			return DataType._types[type];
		throw "Type not found '"+type+"'";
	};
	DataType.checkBounds = function DataTypeCheckBounds(name, number) {
		var typeDef = DataType(name);
		if (number > typeDef.max) throw name + " value is larger than "+typeDef.max;
		if (number < typeDef.min) throw name + " value is smaller than "+typeDef.min;
	};
	DataType.getNumberType = function DataTypeGetNumberType(number) {
		var isDecimal = (number - Math.floor(number)) !== 0;
		var numberDataTypes = DataType.getTypes("number");
		for (var t = 0, type; type = numberDataTypes[t++];) {
			if (number <= type.max && number >= type.min && (!isDecimal || isDecimal == type.decimal) ) {
				return type;
			}
		}
	};
	DataType.getVariableType = function DataTypeGetVariableType(variable) {
		var variableNativeType = variable instanceof Array ? "array" : typeof variable;
		var variableDataType;

		switch(variableNativeType) {
		case "number":
			variableDataType = DataType.getNumberType(variable);
			break;
		case "string":
			variableDataType = DataType.getName("string");
			break;
		default: 
			var supportedItemDataTypes = DataType.getTypes(variableNativeType);
			switch (supportedItemDataTypes.length) {
			case 1:
				variableDataType = supportedItemDataTypes[0];
				break;
			default:
				throw "Type not found '"+variableNativeType+"'";
			}
		}
	
		if (!variableDataType) throw "Cannot assess type '"+variableNativeType+"'";

		return variableDataType;
	};
	DataType.getArrayType = function getArrayType(arr) {
		var foundItemTypes = [];

		for (var i = 0, l = arr.length; i < l; i++) {
			var item = arr[i];
			var itemDataType = DataType.getVariableType(item);

			if (_.findWhere(foundItemTypes, { name: itemDataType.name })) continue;
	
			foundItemTypes.push(itemDataType);
		}

		switch (foundItemTypes.length) {
		case 0:
			throw "Cannot determine array data types";
		case 1:
			//single value type
		 	return foundItemTypes[0];
		default: 
			//many value types
			var nativeTypeNames = _.pluck(foundItemTypes, 'type');
			var uniqueNativeTypeNames = _.uniq(nativeTypeNames);
			var hasManyNativeTypes = (uniqueNativeTypeNames.length > 1);

			if (hasManyNativeTypes) return DataType("variable"); //multiple types in array

			//single native type in array, multiple datatype lengths
			switch (uniqueNativeTypeNames[0]) {
			case "number":
				var foundDecimal = _.findWhere(foundItemTypes, { decimal: true});
				if (foundDecimal) return foundDecimal;
				return _.max(foundItemTypes, function(type) {
					return type.max;
				});
			}

			throw "Unsupported data types";
		}
		
	};
	(function() {
		var types = [
			{
				"size": "fixed",
				"length": 1,
				"name": "boolean",
				"type": "boolean"
			},
			{
				"max": 15,
				"min": 0,
				"decimal": false,
				"size": "fixed",
				"length": 4,
				"name": "half",
				"type": "number"
			},
			{
				"max": 255,
				"min": 0,
				"decimal": false,
				"size": "fixed",
				"length": 8,
				"name": "byte",
				"type": "number"
			},
			{
				"max": 65535,
				"min": 0,
				"decimal": false,
				"size": "fixed",
				"length": 16,
				"name": "short",
				"type": "number"
			},
			{
				"max": 4294967295,
				"min": 0,
				"decimal": false,
				"size": "fixed",
				"length": 32,
				"name": "long",
				"type": "number"
			},
			{
				"max": 4294967295,
				"min": -4294967295,
				"decimal": true,
				"precision": 2,
				"size": "variable",
				"name": "double",
				"type": "number"
			},
			{
				"name": "base16",
				"size": "variable",
				"type": "string"
			},
			{
				"name": "base64",
				"size": "variable",
				"type": "string"
			},
			{
				"name": "array",
				"size": "variable",
				"type": "array"
			},
			{
				"name": "variable",
				"size": "variable",
				"type": "variable"
			},
			{
				"name": "string",
				"size": "variable",
				"type": "string"
			}
		];
		for (var i = 0, type; type = types[i++];) {
			DataType(type);
		}
	})();

	

	function Converter(fromType, toType) {
		fromType = Converter.translateTypeAlias(fromType);
		toType = Converter.translateTypeAlias(toType);

		var args = [].slice.call(arguments, 2);

		if (fromType != "binary" && toType != "binary") {
			if (!Converter._converters[fromType]) throw "Type not found '" + fromType + "'";
			if (!Converter._converters[fromType]['binary']) throw "Type not found 'binary'";
			
			var bin = Converter._converters[fromType]['binary'].call(this, args[0], Converter.WRAPOUTPUT);

			if (!Converter._converters['binary'][toType]) throw "Type not found '"+toType+"'";

			return Converter._converters['binary'][toType].call(this, bin, Converter.WRAPOUTPUT);
		}

		if (!Converter._converters[fromType]) throw "Type not found '" + fromType + "'";
		if (!Converter._converters[fromType][toType]) throw "Type not found '" + toType + "'";

		return Converter._converters[fromType][toType].call(this, args[0], Converter.WRAPOUTPUT);
	}
	Converter.WRAPOUTPUT = false;
	Converter.translateTypeAlias = function ConverterTranslateTypeAlias(type) {
		type = type.toLowerCase();
		for (var Type in Converter._typeAliases) {
			if (Type == type || (" "+Converter._typeAliases[Type].join(" ")+" ").indexOf(" "+type+" ") >= 0 ) return Type;
		}
		throw "Type not found '" + type + "'";
	};
	Converter._typeAliases = {
		"base64": [ "b64" ],
		"base16" : [ "hex", "b16" ],
		"double": [ "dbl", "decimal", "d" ],
		"long": [ "lng", "l" ],
		"short": [ "s" ],
		"byte" : [ "b" ],
		"half": [ "h" ],
		"number": [ "num", "n" ],
		"binary": [ "bin" ],
		"boolean": [ "bool" ],
		"array": [ "arr" ]
	};
	Converter._variableWrapLength = function ConverterVariableWrapLength(bin) {
		var variableLength = bin.length;
		var binLength = NumberToBinary(variableLength, DataType.VARIABLELENGTHDESCRIPTORSIZE)

		return binLength + bin;
	};
	Converter._variableLength = function ConverterVariableLength(bin) {
		var VLDS =  DataType.VARIABLELENGTHDESCRIPTORSIZE;
		var variableLength = BinaryToNumber(bin, VLDS );
		return variableLength;
	};
	Converter._variableUnwrapLength = function ConverterVariableUnwrapLength(bin) {
		var VLDS =  DataType.VARIABLELENGTHDESCRIPTORSIZE;
		var variableLength = BinaryToNumber(bin, VLDS );

		return bin.substr( VLDS, variableLength);
	};
	Converter._converters = {
		"base64": {
			"binary": function ConverterBase64ToBinary(base64) { //TODO PADDING... ?
				var firstByte = Base64(base64.substr(0,1));
				var binFirstByte = NumberToBinary(firstByte, 6);
				var paddingLength = BinaryToNumber(binFirstByte, 6);

			    var bin = "";
			    for (var i = 0, ch; ch = base64[i++];) {
			        var block = Base64(ch).toString(2);
			        block = Padding.fillLeft(block, 6);
			        bin += block;
			    }
			    bin =  bin.substr(6+paddingLength);
			    return bin;
			}
		},
		"base16": {
			"binary": function ConverterBase16ToBinary(hex) {
				var firstByte = Base64(base64.substr(0,1));
				var binFirstByte = NumberToBinary(firstByte, 4);
				var paddingLength = BinaryToNumber(binFirstByte, 4);

			    var bin = "";
			    for (var i = 0, ch; ch = hex[i++];) {
			        var block = parseInt(ch, 16).toString(2);
			        block = Padding.fillLeft(block, 4);
			        bin += block;
			    }

			     bin =  bin.substr(6+paddingLength);
			    return bin;
			}
		},
		"double": {
			"binary": function ConverterDoubleToBinary(dbl, wrap) {
				var typeDef = DataType("double");
				DataType.checkBounds("double", dbl);

				dbl = toPrecision(dbl, typeDef.precision);

				var dblStr = dbl.toString(10);

				var isMinus = dbl < 0;
			
				var baseStr, exponentStr, highStr, lowStr, decimalPosition, hasDecimal;

				
				var exponentPos = dblStr.indexOf("e");
				if (exponentPos > -1) {
					//exponential float representation "nE-x"
					baseStr = dblStr.substr(0, exponentPos);
					exponentStr = Math.abs(dblStr.substr(exponentPos+1));

					if (isMinus) baseStr = baseStr.substr(1);

					decimalPosition = baseStr.indexOf(".");
					hasDecimal = (decimalPosition > -1);

					if (hasDecimal) {
						highStr = baseStr.substr(0, decimalPosition);
						lowStr = baseStr.substr(decimalPosition+1);

						exponentStr = (Math.abs(exponentStr) + lowStr.length);

						baseStr = highStr + lowStr;
					}

				} else {
					//normal long float representation "0.00000000"
					baseStr = dblStr;
					exponentStr = "0";

					if (isMinus) dblStr = dblStr.substr(1);

					decimalPosition = dblStr.indexOf(".");
					hasDecimal = (decimalPosition > -1);
					if (hasDecimal) {
						highStr = dblStr.substr(0, decimalPosition);
						lowStr = dblStr.substr(decimalPosition+1);

						exponentStr = (lowStr.length);
						if (highStr == "0") {
							baseStr = parseInt(lowStr, 10).toString(10);
						} else {
							baseStr = highStr + lowStr;
						}
					} else {
						baseStr = dblStr;
					}

				}

				var bin = [];

				var binLong = Padding.fillBlockLeft (parseInt(baseStr, 10).toString(2), 4);
				var binMinus = isMinus ? "1" : "0";
				var binExponent = Padding.fillLeft( parseInt(exponentStr, 10).toString(2), 7);
				
				bin.push( binMinus );
				bin.push( binExponent );
				bin.push( binLong );

				if (wrap === false) {
					return bin.join("");
				} else {
					return Converter._variableWrapLength(bin.join(""));
				}
			}
		},
		"long": {
			"binary": function ConverterLongToBinary(value) {
				var typeDef = DataType("long");
				DataType.checkBounds("long", value);
				value = toPrecision(value, 0);
				return Padding.fillLeft(value.toString(2), typeDef.length);
			}
		},
		"short": {
			"binary": function ConverterShortToBinary(value) {
				var typeDef = DataType("short");
				DataType.checkBounds("short", value);
				value = toPrecision(value, 0);
				return Padding.fillLeft(value.toString(2), typeDef.length);
			}
		},
		"byte": {
			"binary": function ConverterByteToBinary(value) {
				var typeDef = DataType("byte");
				DataType.checkBounds("byte", value);
				value = toPrecision(value, 0);
				return Padding.fillLeft(value.toString(2), typeDef.length);
			}
		},
		"half": {
			"binary": function ConverterHalfToBinary(value) {
				var typeDef = DataType("half");
				DataType.checkBounds("half", value);
				value = toPrecision(value, 0);
				return Padding.fillLeft(value.toString(2), typeDef.length);
			}
		},
		"boolean": {
			"binary": function ConverterBooleanToBinary(bool) {
				return bool ? "1" : "0";
			},
		},
		"array": {
			"binary": function ConverterArrayToBinary(arr, wrap) { //TODO PADDING NOT GOOD
				var typeDef = DataType("array");
				var arrayItemType = DataType.getArrayType(arr);
				var isVariableArray = arrayItemType.name == "vairable";

				if (isVariableArray) {
					var bin = half2bin(15);
					//variable array
					return bin;
				} else {
					var binArrayIdentifier = Converter._converters['half']['binary'](arrayItemType.index);

					var binItemsArray = [];
					for (var i = 0, l = arr.length; i < l; i++) {
						var item = arr[i];
						var binItem = Converter._converters[arrayItemType.name]['binary'](item);
						//console.log("binItem", binItem);
						binItemsArray.push( binItem );
					}

					var binItems = binItemsArray.join("");

					var paddingLength = 0;
					if (binItems.length % 4) paddingLength = 4 - (binItems.length % 4);
					var binPaddingLen = NumberToBinary(paddingLength, 2);

					var binPadding = (new Array(paddingLength+1)).join("0");

					var bin = [];
					bin.push(binArrayIdentifier);
					bin.push(binPaddingLen);
					bin.push(binPadding);
					bin.push(binItems);

					var finished = bin.join("");
					//console.log("unwrapped", finished);

					if (wrap === false) return finished;

					var wrapped = Converter._variableWrapLength( finished);
					//console.log("wrapped", wrapped);

					return wrapped;
				}

			}
		},
		"binary": {
			"array": function ConverterBinaryToArray(bin, wrap) { //TODO PADDING NOT GOOD
				var typeDef = DataType("array");

				//console.log("wrapped", bin);
				if (wrap !== false)
					bin = Converter._variableUnwrapLength( bin);
				//console.log("unwrapped", bin);

				var binArrayIdentifier = bin.substr(0, 4);
				var binPaddingLen = bin.substr(4 , 2);

				var arrayIdentifier = Converter._converters['binary'][ 'half' ]( binArrayIdentifier );
				var paddingLength = BinaryToNumber( binPaddingLen, 2 );

				var dataStart = 4 + 2 + paddingLength;
				var dataLength = bin.length - dataStart;

				var binItems = bin.substr(dataStart, dataLength );

				var arrayItemType = DataType(arrayIdentifier);
				var isVariableArray = arrayItemType.name == "variable";

				var rtn = [];
				if (isVariableArray) {

				} else {
					var hasVariableLengthChildren = arrayItemType.size == "variable";
					if (hasVariableLengthChildren) {
						var VLDS = DataType.VARIABLELENGTHDESCRIPTORSIZE;
						while ( binItems != "" ) {
							
							var variableLength = Converter._variableLength( binItems );
							var binItem = binItems.substr(0, VLDS + variableLength);
							binItems = binItems.substr(VLDS+variableLength);
							//console.log("binItem", binItem, BinaryToNumber(binItem, 16));

							rtn.push( Converter._converters['binary'][ arrayItemType.name ]( binItem) );
						}
					} else {
						while ( binItems != "" ) {
							var binItem = binItems.substr(0, arrayItemType.length);
							binItems = binItems.substr(arrayItemType.length);

							rtn.push( Converter._converters['binary'][ arrayItemType.name ](binItem) );
						}
					}

				}


				return rtn;

			},
			"base64": function ConverterBinaryToBase64(bin) { //TODO PADDING NOT GOOD
				var paddingLength = 0;
				if (bin.length % 6) paddingLength = 6 - (bin.length % 6);
				binPaddingLen = NumberToBinary(paddingLength, 6);
				binPadding = Padding.addLeft("", paddingLength);
				bin = binPaddingLen + binPadding + bin;

				var binLength = bin.length;
			    var base64 = "";
			    for (var b = 0; b < 10000; b++) {
			        if (b*6 >= binLength) break;
			     
			        var block = bin.substr(b*6,6);
			        base64 += Base64(parseInt(block, 2));
			    }

			    return base64;
			},
			"base16": function ConverterBinaryToBase16(bin) {
				var paddingLength = 0;
				if (bin.length % 4) paddingLength = 4 - (bin.length % 4);
				binPaddingLen = NumberToBinary(paddingLength, 4);
				binPadding = Padding.addLeft("", paddingLength);
				bin = binPaddingLen + binPadding + bin;

			    var binLength = bin.length;
			    var hex = "";
			    for (var b = 0; b < 10000; b++) {
			        if (b*4 >= binLength) break;
			     
			        var block = bin.substr(b*4,4);
			        hex += parseInt(block, 2).toString(16);
			    }
			    return hex;
			},
			"double": function ConverterBinaryToDouble(bin, wrap) {
				var typeDef = DataType("double");
				
				if (wrap !== false)
					bin = Converter._variableUnwrapLength(bin);

				var isMinus = bin.substr(0 ,1) == 1;

				var exponentByte = parseInt("0" + bin.substr(1, 7), 2);
				var baseLong = parseInt( bin.substr(8, bin.length), 2);

				var dbl = parseFloat(baseLong+"E-"+exponentByte, 10);
				if (isMinus) dbl = dbl * -1;

				return dbl;
			},
			"long": function ConverterBinaryToLong(bin) {
				return parseInt(bin.substr(0, 32), 2);
			},
			"short": function ConverterBinaryToShort(bin) {
				return parseInt(bin.substr(0, 16), 2);
			},
			"byte": function ConverterBinaryToByte(bin) {
				return parseInt(bin.substr(0, 8), 2);
			},
			"half": function ConverterBinaryToHalf(bin) {
				return parseInt(bin.substr(0, 4), 2);
			},
			"boolean": function ConverterBinaryToBoolean(bin) {
				return bin.substr(0,1) == "1" ? true: false;
			},
			"number": function ConverterBinaryToNumber(bin) {
				return parseInt(bin, 2);
			}
		}
	};
	
	window.SCORMSuspendData = {
		serialize: function SCORMSuspendDataSerialize(arr) {
			return Converter ("array", "base64", arr);
		},
		deserialize: function SCORMSuspendDataDeserialize(base64) {
			return Converter("base64", "array", base64);
		},
		Base64: Base64,
		Converter: Converter,
		DataType: DataType
	};


})(_);

define("extensions/adapt-contrib-spoor/js/serializers/scormSuspendDataSerializer", function(){});

define('extensions/adapt-contrib-spoor/js/serializers/questions',[
    'coreJS/adapt',
    './scormSuspendDataSerializer'
], function (Adapt) {

    //Captures the completion status and user selections of the question components
    //Returns and parses a base64 style string
    var includes = {
        "_isQuestionType": true,
        "_isResetOnRevisit": false
    };

    var serializer = {
        serialize: function () {
            return this.serializeSaveState();
        },

        serializeSaveState: function() {
            if (Adapt.course.get('_latestTrackingId') === undefined) {
                var message = "This course is missing a latestTrackingID.\n\nPlease run the grunt process prior to deploying this module on LMS.\n\nScorm tracking will not work correctly until this is done.";
                console.error(message);
                return "";
            }

            var rtn = "";
            try {
                var data = this.captureData();
                if (data.length === 0) return "";
                rtn = SCORMSuspendData.serialize(data);
            } catch(e) {
                console.error(e);
            }

            return rtn;
        },

        captureData: function() {
            var data = [];
            
            var trackingIds = Adapt.blocks.pluck("_trackingId");
            var blocks = {};
            var countInBlock = {};

            for (var i = 0, l = trackingIds.length; i < l; i++) {

                var trackingId = trackingIds[i];
                var blockModel = Adapt.blocks.findWhere({_trackingId: trackingId });
                var componentModels = blockModel.getChildren().where(includes);

                for (var c = 0, cl = componentModels.length; c < cl; c++) {

                    var component = componentModels[c].toJSON();
                    var blockId = component._parentId;

                    if (!blocks[blockId]) {
                        blocks[blockId] = blockModel.toJSON();
                    }

                    var block = blocks[blockId];
                    if (countInBlock[blockId] === undefined) countInBlock[blockId] = -1;
                    countInBlock[blockId]++;

                    var blockLocation = countInBlock[blockId];

                    if (component['_isInteractionComplete'] === false || component['_isComplete'] === false) {
                        //if component is not currently complete skip it
                        continue;
                    }

                    var hasUserAnswer = (component['_userAnswer'] !== undefined);
                    var isUserAnswerArray = (component['_userAnswer'] instanceof Array);


                    var numericParameters = [
                            blockLocation,
                            block['_trackingId'],
                            component['_score'] || 0,
                            component['_attemptsLeft'] || 0
                        ];

                    var booleanParameters = [
                            hasUserAnswer,
                            isUserAnswerArray,
                            component['_isInteractionComplete'],
                            component['_isSubmitted'],
                            component['_isCorrect'] || false
                        ];

                    var dataItem = [
                        numericParameters,
                        booleanParameters
                    ];


                    if (hasUserAnswer) {
                        var userAnswer = isUserAnswerArray ? component['_userAnswer'] : [component['_userAnswer']];

                        var arrayType = SCORMSuspendData.DataType.getArrayType(userAnswer);

                        switch(arrayType.name) {
                        case "string": case "variable":
                            console.log("Cannot store _userAnswers from component " + component._id + " as array is of variable or string type.");
                            continue;
                        }

                        dataItem.push(userAnswer);
                    }

                    data.push(dataItem);

                }

            }

            return data;

        },

        deserialize: function (str) {

            try {
                var data = SCORMSuspendData.deserialize(str);
                this.releaseData( data );
            } catch(e) {
                console.error(e);
            }
            
        },    

        releaseData: function (arr) {
            
            for (var i = 0, l = arr.length; i < l; i++) {
                var dataItem = arr[i];

                var numericParameters = dataItem[0];
                var booleanParameters = dataItem[1];

                var blockLocation = numericParameters[0];
                var trackingId = numericParameters[1];
                var score = numericParameters[2];
                var attemptsLeft = numericParameters[3] || 0;

                var hasUserAnswer = booleanParameters[0];
                var isUserAnswerArray = booleanParameters[1];
                var isInteractionComplete = booleanParameters[2];
                var isSubmitted = booleanParameters[3];
                var isCorrect = booleanParameters[4];

                var block = Adapt.blocks.findWhere({_trackingId: trackingId});
                var components = block.getChildren();
                components = components.where(includes);
                var component = components[blockLocation];

                component.set("_isComplete", true);
                component.set("_isInteractionComplete", isInteractionComplete);
                component.set("_isSubmitted", isSubmitted);
                component.set("_score", score);
                component.set("_isCorrect", isCorrect);
                component.set("_attemptsLeft", attemptsLeft);

                if (hasUserAnswer) {
                    var userAnswer = dataItem[2];
                    if (!isUserAnswerArray) userAnswer = userAnswer[0];

                    component.set("_userAnswer", userAnswer);
                }


            }
        }
    };

    return serializer;
});

define('extensions/adapt-contrib-spoor/js/adapt-stateful-session',[
	'coreJS/adapt',
	'./serializers/default',
	'./serializers/questions'
], function(Adapt, serializer, questions) {

	//Implements Adapt session statefulness
	
	var AdaptStatefulSession = _.extend({

		_config: null,
		_shouldStoreResponses: false,
		_shouldRecordInteractions: true,

	//Session Begin
		initialize: function() {
			this.getConfig();
			this.restoreSessionState();
			/*
			deferring this prevents restoring the completion state of the blocks from triggering a setSuspendData call for each block that gets its completion state restored
			we should be able to remove this if/when we implement the feature that allows plugins like spoor to pause course initialisation
			*/
			_.defer(_.bind(this.setupEventListeners, this));
		},

		getConfig: function() {
			this._config = Adapt.config.has('_spoor')
				? Adapt.config.get('_spoor')
				: false;
			
			this._shouldStoreResponses = (this._config && this._config._tracking && this._config._tracking._shouldStoreResponses);
			
			// default should be to record interactions, so only avoid doing that if _shouldRecordInteractions is set to false
			if (this._config && this._config._tracking && this._config._tracking._shouldRecordInteractions === false) {
				this._shouldRecordInteractions = false;
			}
		},

		saveSessionState: function() {
			var sessionPairs = this.getSessionState();
			Adapt.offlineStorage.set(sessionPairs);
		},

		restoreSessionState: function() {
			var sessionPairs = Adapt.offlineStorage.get();
			var hasNoPairs = _.keys(sessionPairs).length === 0;

			if (hasNoPairs) return;

			if (sessionPairs.completion) serializer.deserialize(sessionPairs.completion);
			if (sessionPairs.questions && this._shouldStoreResponses) questions.deserialize(sessionPairs.questions);
			if (sessionPairs._isCourseComplete) Adapt.course.set('_isComplete', sessionPairs._isCourseComplete);
			if (sessionPairs._isAssessmentPassed) Adapt.course.set('_isAssessmentPassed', sessionPairs._isAssessmentPassed);
		},

		getSessionState: function() {
			var sessionPairs = {
				"completion": serializer.serialize(),
				"questions": (this._shouldStoreResponses == true ? questions.serialize() : ""),
				"_isCourseComplete": Adapt.course.get("_isComplete") || false,
				"_isAssessmentPassed": Adapt.course.get('_isAssessmentPassed') || false
			};
			return sessionPairs;
		},

	//Session In Progress
		setupEventListeners: function() {
			this._onWindowUnload = _.bind(this.onWindowUnload, this);
			$(window).on('unload', this._onWindowUnload);

			if (this._shouldStoreResponses) {
				this.listenTo(Adapt.components, 'change:_isInteractionComplete', this.onQuestionComponentComplete);
			}

			if(this._shouldRecordInteractions) {
				this.listenTo(Adapt, 'questionView:recordInteraction', this.onQuestionRecordInteraction);
			}

			this.listenTo(Adapt.blocks, 'change:_isComplete', this.onBlockComplete);
			this.listenTo(Adapt.course, 'change:_isComplete', this.onCompletion);
			this.listenTo(Adapt, 'assessment:complete', this.onAssessmentComplete);
		},

		onBlockComplete: function(block) {
			this.saveSessionState();
		},

		onQuestionComponentComplete: function(component) {
			if (!component.get("_isQuestionType")) return;

			this.saveSessionState();
		},

		onCompletion: function() {
			if (!this.checkTrackingCriteriaMet()) return;

			this.saveSessionState();
			
			Adapt.offlineStorage.set("status", this._config._reporting._onTrackingCriteriaMet);
		},

		onAssessmentComplete: function(stateModel) {
			Adapt.course.set('_isAssessmentPassed', stateModel.isPass)
			
			this.saveSessionState();

			this.submitScore(stateModel.scoreAsPercent);

			if (stateModel.isPass) {
				this.onCompletion();
			} else if (this._config && this._config._tracking._requireAssessmentPassed) {
				this.submitAssessmentFailed();
			}
		},

		onQuestionRecordInteraction:function(questionView) {
			var responseType = questionView.getResponseType();

			// if responseType doesn't contain any data, assume that the question component hasn't been set up for cmi.interaction tracking
			if(_.isEmpty(responseType)) return;

			var id = questionView.model.get('_id');
			var response = questionView.getResponse();
			var result = questionView.isCorrect();
			var latency = questionView.getLatency();
			
			Adapt.offlineStorage.set("interaction", id, response, result, latency, responseType);
		},

		submitScore: function(score) {
			if (this._config && !this._config._tracking._shouldSubmitScore) return;
			
			Adapt.offlineStorage.set("score", score, 0, 100);
		},

		submitAssessmentFailed: function() {
			if (this._config && this._config._reporting.hasOwnProperty("_onAssessmentFailure")) {
				var onAssessmentFailure = this._config._reporting._onAssessmentFailure;
				if (onAssessmentFailure === "") return;
					
				Adapt.offlineStorage.set("status", onAssessmentFailure);
			}
		},
		
		checkTrackingCriteriaMet: function() {
			var criteriaMet = false;

			if (!this._config) {
				return false;
			}

			if (this._config._tracking._requireCourseCompleted && this._config._tracking._requireAssessmentPassed) { // user must complete all blocks AND pass the assessment
				criteriaMet = (Adapt.course.get('_isComplete') && Adapt.course.get('_isAssessmentPassed'));
			} else if (this._config._tracking._requireCourseCompleted) { //user only needs to complete all blocks
				criteriaMet = Adapt.course.get('_isComplete');
			} else if (this._config._tracking._requireAssessmentPassed) { // user only needs to pass the assessment
				criteriaMet = Adapt.course.get('_isAssessmentPassed');
			}

			return criteriaMet;
		},

	//Session End
		onWindowUnload: function() {
			$(window).off('unload', this._onWindowUnload);

			this.stopListening();
		}
		
	}, Backbone.Events);

	return AdaptStatefulSession;

});
define('extensions/adapt-contrib-spoor/js/adapt-offlineStorage-scorm',[
	'coreJS/adapt',
	'./scorm',
	'coreJS/offlineStorage'
], function(Adapt, scorm) {

	//SCORM handler for Adapt.offlineStorage interface.

	//Stores to help handle posting and offline uniformity
	var temporaryStore = {};
	var suspendDataStore = {};
	var suspendDataRestored = false;

	Adapt.offlineStorage.initialize({

		get: function(name) {
			if (name === undefined) {
				//If not connected return just temporary store.
				if (this.useTemporaryStore()) return temporaryStore;

				//Get all values as a combined object
				suspendDataStore = this.getCustomStates();

				var data = _.extend(_.clone(suspendDataStore), {
					location: scorm.getLessonLocation(),
					score: scorm.getScore(),
					status: scorm.getStatus(),
					student: scorm.getStudentName(),
					learnerInfo: this.getLearnerInfo()
				});

				suspendDataRestored = true;
				
				return data;
			}

			//If not connected return just temporary store value.
			if (this.useTemporaryStore()) return temporaryStore[name];

			//Get by name
			switch (name.toLowerCase()) {
				case "location":
					return scorm.getLessonLocation();
				case "score":
					return scorm.getScore();
				case "status":
					return scorm.getStatus();
				case "student":// for backwards-compatibility. learnerInfo is preferred now and will give you more information
					return scorm.getStudentName();
				case "learnerInfo":
					return this.getLearnerInfo();
				default:
					return this.getCustomState(name);
			}
		},

		set: function(name, value) {
			//Convert arguments to array and drop the 'name' parameter
			var args = [].slice.call(arguments, 1);
			var isObject = typeof name == "object";

			if (isObject) {
				value = name;
				name = "suspendData";
			}

			if (this.useTemporaryStore()) {
				if (isObject) {
					temporaryStore = _.extend(temporaryStore, value);
				} else {
					temporaryStore[name] = value;
				}

				return true;
			}

			switch (name.toLowerCase()) {
				case "interaction":
					return scorm.recordInteraction.apply(scorm, args);
				case "location":
					return scorm.setLessonLocation.apply(scorm, args);
				case "score":
					return scorm.setScore.apply(scorm, args);
				case "status":
					return scorm.setStatus.apply(scorm, args);
				case "student":
				case "learnerInfo":
					return false;// these properties are read-only
				case "suspenddata":
				default:
					if (isObject) {
						suspendDataStore = _.extend(suspendDataStore, value);
					} else {
						suspendDataStore[name] = value;
					}

					var dataAsString = JSON.stringify(suspendDataStore);
					return (suspendDataRestored) ? scorm.setSuspendData(dataAsString) : false;
			}
		},

		getCustomStates: function() {
			var isSuspendDataStoreEmpty = _.isEmpty(suspendDataStore);
			if (!isSuspendDataStoreEmpty && suspendDataRestored) return _.clone(suspendDataStore);

			var dataAsString = scorm.getSuspendData();
			if (dataAsString === "" || dataAsString === " " || dataAsString === undefined) return {};

			var dataAsJSON = JSON.parse(dataAsString);
			if (!isSuspendDataStoreEmpty && !suspendDataRestored) dataAsJSON = _.extend(dataAsJSON, suspendDataStore);
			return dataAsJSON;
		},

		getCustomState: function(name) {
			var dataAsJSON = this.getCustomStates();
			return dataAsJSON[name];
		},
		
		useTemporaryStore: function() {
			var cfg = Adapt.config.get('_spoor');
			
			if (!scorm.lmsConnected || (cfg && cfg._isEnabled === false)) return true;
			return false;
		},

		/**
		 * Returns an object with the properties:
		 * - id (cmi.core.student_id)
		 * - name (cmi.core.student_name - which is usually in the format "Lastname, Firstname" - but sometimes doesn't have the space after the comma)
		 * - firstname
		 * - lastname
		 */
		getLearnerInfo: function() {
			var name = scorm.getStudentName();
			var firstname = "", lastname = "";
			if (name && name !== 'undefined' && name.indexOf(",") > -1) {
				//last name first, comma separated
				var nameSplit = name.split(",");
				lastname = $.trim(nameSplit[0]);
				firstname = $.trim(nameSplit[1]);
				name = firstname + " " + lastname;
			} else {
				console.log("SPOOR: LMS learner_name not in 'lastname, firstname' format");
			}
			return {
				name: name,
				lastname: lastname,
				firstname: firstname,
				id: scorm.getStudentId()
			};
		}
		
	});

});
define('extensions/adapt-contrib-spoor/js/adapt-contrib-spoor',[
  'coreJS/adapt',
  './scorm',
  './adapt-stateful-session',
  './adapt-offlineStorage-scorm'
], function(Adapt, scorm, adaptStatefulSession) {

  //SCORM session manager

  var Spoor = _.extend({

    _config: null,

  //Session Begin

    initialize: function() {
      this.listenToOnce(Adapt, "configModel:dataLoaded", this.onConfigLoaded);
      this.listenToOnce(Adapt, "app:dataReady", this.onDataReady);
    },

    onConfigLoaded: function() {
      if (!this.checkConfig()) return;

      this.configureAdvancedSettings();

      scorm.initialize();

      this.setupEventListeners();
    },

    onDataReady: function() {
      adaptStatefulSession.initialize();
    },

    checkConfig: function() {
      this._config = Adapt.config.has('_spoor') 
        ? Adapt.config.get('_spoor')
        : false;

      if (this._config && this._config._isEnabled !== false) return true;
      
      return false;
    },

    configureAdvancedSettings: function() {
      if(this._config._advancedSettings) {
        var settings = this._config._advancedSettings;

        if(settings._showDebugWindow) scorm.showDebugWindow();

        scorm.setVersion(settings._scormVersion || "1.2");

        if(settings.hasOwnProperty("_suppressErrors")) {
          scorm.suppressErrors = settings._suppressErrors;
        }

        if(settings.hasOwnProperty("_commitOnStatusChange")) {
          scorm.commitOnStatusChange = settings._commitOnStatusChange;
        }

        if(settings.hasOwnProperty("_timedCommitFrequency")) {
          scorm.timedCommitFrequency = settings._timedCommitFrequency;
        }

        if(settings.hasOwnProperty("_maxCommitRetries")) {
          scorm.maxCommitRetries = settings._maxCommitRetries;
        }

        if(settings.hasOwnProperty("_commitRetryDelay")) {
          scorm.commitRetryDelay = settings._commitRetryDelay;
        }
      } else {
        /**
        * force use of SCORM 1.2 by default - some LMSes (SABA/Kallidus for instance) present both APIs to the SCO and, if given the choice,
        * the pipwerks code will automatically select the SCORM 2004 API - which can lead to unexpected behaviour.
        */
        scorm.setVersion("1.2");
      }

      /**
      * suppress SCORM errors if 'nolmserrors' is found in the querystring
      */
      if(window.location.search.indexOf('nolmserrors') != -1) scorm.suppressErrors = true;
    },

    setupEventListeners: function() {
      var advancedSettings = this._config._advancedSettings;
      var shouldCommitOnVisibilityChange = (!advancedSettings ||
        advancedSettings._commitOnVisibilityChangeHidden !== false) &&
        document.addEventListener;

      this._onWindowUnload = _.bind(this.onWindowUnload, this);
      $(window).on('unload', this._onWindowUnload);

      if (shouldCommitOnVisibilityChange) {
        document.addEventListener("visibilitychange", this.onVisibilityChange);
      }
    },

    onVisibilityChange: function() {
      if (document.visibilityState === "hidden") scorm.commit();
    },

  //Session End

    onWindowUnload: function() {
      scorm.finish();

      $(window).off('unload', this._onWindowUnload);
    }
    
  }, Backbone.Events);

  Spoor.initialize();

});

define('extensions/adapt-contrib-trickle/js/trickleView',[
    'coreJS/adapt'
], function(Adapt) {

    var TrickleView = Backbone.View.extend({

        isSteplocked: false,

        initialize: function(options) {
            this.setupEventListeners();
        },

        setupEventListeners: function() {
            var AdaptEvents = {
                "trickle:kill": this.onKill,
                "remove": this.onRemove
            };
            
            this.onPreRender(this);

            AdaptEvents[this.model.get("_type") + "View:postRender"] = this.onPostRender;
            this.listenTo(Adapt, AdaptEvents);

            this.on("steplock", this.onStepLock);
            this.on("stepunlock", this.onStepUnlock);
        },

        onPreRender: function(view) {
            if (!this.isElementEnabled()) return;

            Adapt.trigger("trickle:preRender", this);
        },

        onPostRender: function(view) {
            if (view.model.get("_id") !== this.model.get("_id")) return;
            if (!this.isElementEnabled()) return;

            Adapt.trigger("trickle:postRender", this);
        },

        isElementEnabled: function() {
            var trickle = Adapt.trickle.getModelConfig(this.model);
            if (!trickle) return false;

            var isArticleWithOnChildren = (this.model.get("_type") === "article" && trickle._onChildren);
            if (isArticleWithOnChildren) {
                return false;
            }

            if (trickle._isEnabled === true) return true;
            return false;
        },

        onStepLock: function() {
            if (!this.isElementEnabled()) {
                this.continueToNext();
                return;
            }

            var trickle = Adapt.trickle.getModelConfig(this.model);
            var isSteplocking = (trickle._stepLocking && trickle._stepLocking._isEnabled);
            if (!isSteplocking) {
                this.continueToNext();
                return;
            }

            Adapt.trigger("trickle:steplock", this);
            //console.log("trickle steplock at", this.model.get("_id"))

            this.isSteplocked = true;
        },

        continueToNext: function() {
            _.defer(_.bind(function() {
                Adapt.trigger("trickle:continue", this);
            }, this));
        },


        onStepUnlock: function() {
            if (!this.isSteplocked) return;
            this.isSteplocked = false;
            Adapt.trigger("trickle:stepunlock", this);
        },

        onKill: function() {
            this.detachFromElement()
        },

        onRemove: function() {
            this.detachFromElement();
        },

        detachFromElement: function() {
            this.undelegateEvents();
            this.stopListening();
            this.model = null;
            this.articleModel = null;
            this.$el = null;
            this.el = null;
        }
                
    });

    return TrickleView;

})
;
define('extensions/adapt-contrib-trickle/js/pageView',[
    'coreJS/adapt',
    './trickleView'
], function(Adapt, TrickleView) {

    var PageView = Backbone.View.extend({

        currentDescendantIndex: 0,
        currentLocksOnDescendant: 0,
        currentDescendant: null,

        initialize: function(options) {
            if (!this.isPageEnabled()) {
                return this.detachFromPage();
            }
            this.setupDescendants();
            if (!this.haveDescendantsGotTrickle()) {
                return this.detachFromPage();   
            }
            this.addClassToHtml();
            this.setupEventListeners();
        },

        isPageEnabled: function() {
            var trickleConfig = Adapt.trickle.getModelConfig(this.model);
            if (trickleConfig && trickleConfig._isEnabled === false) return false;
            return true;
        },

        setupDescendants: function() {
            this.currentDescendant = null;
            this.descendantViews = {};
            this.getDescendants();
            Adapt.trigger("trickle:descendants", this);
        },

        descendantsChildFirst: null,
        descendantsParentFirst: null,
        descendantViews: null,

        getDescendants: function() {
            this.descendantsChildFirst = this.model.getDescendants();
            this.descendantsParentFirst = this.model.getDescendants(true);

            //if some descendants flip between _isAvailable true/false they must have their defaults set before the filter is applied
            this.setDescendantsTrickleDefaults();

            this.descendantsChildFirst = this.filterComponents(this.descendantsChildFirst);
            this.descendantsParentFirst = this.filterComponents(this.descendantsParentFirst);

        },

        filterComponents: function(descendants) {
            return new Backbone.Collection(descendants.filter(function(descendant) {
                if (descendant.get("_type") === "component") return false;
                if (!descendant.get("_isAvailable")) return false;
                return true;
            }));
        },

        setDescendantsTrickleDefaults: function() {
            //use parent first as likely to get to article 
            //
            this.descendantsParentFirst.each(_.bind(function(descendant) {

                var trickle = Adapt.trickle.getModelConfig(descendant);
                var noTrickleConfig = (!trickle);

                //check if descendant has trickle settings
                if (noTrickleConfig) return;

                //check if trickle is configures on descendant
                //NOTE: Removed for banked assessments
                //var isTrickleConfigured = descendant.get("_isTrickleConfigured");
                //if (isTrickleConfigured) return;

                //setup steplocking defaults
                trickle._stepLocking = _.extend({
                    "_isEnabled": true, //(default=true)
                    "_isCompletionRequired": true, //(default=true)
                    "_isLockedOnRevisit": false //(default=false)
                }, trickle._stepLocking);

                //setup main trickle defaults
                trickle = _.extend({
                    "_isEnabled": true, //(default=true)
                    "_autoScroll": true, //(default=true)
                    "_scrollDuration": 500, //(default=500)
                    "_onChildren": true, //(default=true)
                    "_scrollTo": "@block +1", //(default="@block +1")
                }, trickle);

                Adapt.trickle.setModelConfig(descendant, trickle);

                //check article "onChildren" rule
                if (trickle._onChildren 
                    && descendant.get("_type") === "article") {
                    this.setupArticleOnChildren(descendant, trickle);
                }

                //set descendant trickle as configured
                descendant.set("_isTrickleConfigured", true);

            }, this));
        },

        setupArticleOnChildren: function(articleModel, articleTrickleConfig) {
            //set trickle on all blocks, using article config with block overrides
            var articleBlocks = articleModel.getChildren();

            articleBlocks.each(function(blockModel, index) {
                var blockTrickleConfig = Adapt.trickle.getModelConfig(blockModel);

                //overlay block trickle on article trickle
                //this allows values to carry through from the article to the block 
                //retains any value overriden in the block
                for (var k in blockTrickleConfig) {
                    //handle nested objects to one level
                    if (typeof blockTrickleConfig[k] === "object") {
                        blockTrickleConfig[k] = _.extend({}, articleTrickleConfig[k], blockTrickleConfig[k]);
                    }
                }

                blockTrickleConfig = _.extend({}, articleTrickleConfig, blockTrickleConfig);


                //setup start/final config
                if (articleBlocks.length === index+1) {
                    blockTrickleConfig._isFinal = true;
                }
                if (index === 0) {
                    blockTrickleConfig._isStart = true;
                }

                Adapt.trickle.setModelConfig(blockModel, blockTrickleConfig);
            });

        },

        haveDescendantsGotTrickle: function() {
            return this.descendantsChildFirst.some(function(descendant) {
                var trickle = Adapt.trickle.getModelConfig(descendant);
                if (!trickle) return false;
                if (trickle._isEnabled === true) {
                    return true;
                }
                return false;
            });
        },

        addClassToHtml: function() {
            $("html").addClass("trickle");
        },

        setupEventListeners: function() {
            this.listenTo(Adapt, {
                "remove": this.onRemove,
                
                "articleView:preRender": this.onDescendantPreRender,
                "blockView:preRender": this.onDescendantPreRender,

                "trickle:unwait": this.onUnwait,
                "trickle:wait": this.onWait,
                "trickle:continue": this.onContinue,
                "trickle:skip": this.onSkip,

                "trickle:kill": this.onKill
            });
            this.listenToOnce(this.model, "change:_isReady", this.onPageReady)
        },

        onDescendantPreRender: function(view) {
            //ignore components
            if (view.model.get("_type") === "component") return;

            var descendantView = new TrickleView({
                model: view.model,
                el: view.el
            });
            this.descendantViews[view.model.get("_id")] = descendantView;
        },

        //trickle lifecycle

        onPageReady: function(model, value) {
            if (!value) return;

            this.currentDescendant = null;

            Adapt.trigger("trickle:started");
            this.gotoNextDescendant();
        },

        gotoNextDescendant: function() {
            this.getDescendants();

            if (this.currentDescendant) {
                this.currentDescendant.trigger("stepunlock");
                this.currentDescendant = null;
            }

            for (var index = this.currentDescendantIndex || 0, l = this.descendantsChildFirst.models.length; index < l; index++) {
                var descendant = this.descendantsChildFirst.models[index];
                switch ( descendant.get("_type") ) {
                case "block": case "article":
                    this.currentLocksOnDescendant = 0;
                    this.currentDescendantIndex = index;
                    var currentId = descendant.get("_id");
                    this.currentDescendant = this.descendantViews[currentId];
                    this.currentDescendant.trigger("steplock");
                    return;
                }
            }
            this.finished();
        },

        onContinue: function(view) {
            if (!this.currentDescendant) return;
            if (view.model.get("_id") !== this.currentDescendant.model.get("_id")) return;

            this.onSkip();
        },

        onWait: function() {
            this.currentLocksOnDescendant++;
        },

        onUnwait: function() {
            this.currentLocksOnDescendant--;
            if (this.currentLocksOnDescendant > 0) return;
            
            var lastDescendant = this.currentDescendant.model;
            
            this.currentDescendantIndex++;
            this.gotoNextDescendant();

            Adapt.trickle.scroll(lastDescendant);
            
        },

        onSkip: function() {
            //wait for all handlers to accept skip
            _.defer(_.bind(function() {
                this.currentDescendantIndex++;
                this.gotoNextDescendant();
            }, this));
        },

        onKill: function() {
            this.finished();
            this.detachFromPage();
        },

        finished: function() {
            Adapt.trigger("trickle:finished");
            this.detachFromPage();
        },

        //end of trickle lifecycle

        onRemove: function() {
            this.finished();
        },

        detachFromPage: function() {
            this.removeClassFromHtml();
            this.undelegateEvents();
            this.stopListening();
            this.model = null;
            this.$el = null;
            this.el = null;
            this.currentDescendant = null;
            this.descendantViews = null;
            this.descendantsChildFirst = null;
            this.descendantsParentFirst = null;
            Adapt.trickle.pageView = null;
        },

        removeClassFromHtml: function() {
            $("html").removeClass("trickle");
        }
                
    });

    return PageView;

})
;
//https://github.com/cgkineo/jquery.resize 2016-02-02

(function() {

  if ($.fn.off.elementResizeOriginalOff) return;


  var orig = $.fn.on;
  $.fn.on = function () {
    if (arguments[0] !== "resize") return $.fn.on.elementResizeOriginalOn.apply(this, _.toArray(arguments));
    if (this[0] === window) return $.fn.on.elementResizeOriginalOn.apply(this, _.toArray(arguments));

    addResizeListener.call(this, (new Date()).getTime());

    return $.fn.on.elementResizeOriginalOn.apply(this, _.toArray(arguments));
  };
  $.fn.on.elementResizeOriginalOn = orig;
  var orig = $.fn.off;
  $.fn.off = function () {
    if (arguments[0] !== "resize") return $.fn.off.elementResizeOriginalOff.apply(this, _.toArray(arguments));
    if (this[0] === window) return $.fn.off.elementResizeOriginalOff.apply(this, _.toArray(arguments));

    removeResizeListener.call(this, (new Date()).getTime());

    return $.fn.off.elementResizeOriginalOff.apply(this, _.toArray(arguments));
  };
  $.fn.off.elementResizeOriginalOff = orig;

  var expando = $.expando;
  var expandoIndex = 0;

  function checkExpando(element) {
    if (!element[expando]) element[expando] = ++expandoIndex;
    }

  //element + event handler storage
  var resizeObjs = {};

  //jQuery element + event handler attachment / removal
  var addResizeListener = function(data) {
      checkExpando(this);
      resizeObjs[data.guid + "-" + this[expando]] = { 
        data: data, 
        $element: $(this) 
      };
  };

  var removeResizeListener = function(data) {
    try { 
      delete resizeObjs[data.guid + "-" + this[expando]]; 
    } catch(e) {

    }
  };

  function checkLoopExpired() {
    if ((new Date()).getTime() - loopData.lastEvent > 500) {
      stopLoop()
      return true;
    }
  }

  function resizeLoop () {
    if (checkLoopExpired()) return;

    var resizeHandlers = getEventHandlers("resize");

    if (resizeHandlers.length === 0) {
      //nothing to resize
      stopLoop();
      resizeIntervalDuration = 500;
      repeatLoop();
    } else {
      //something to resize
      stopLoop();
      resizeIntervalDuration = 250;
      repeatLoop();
    }

    if  (resizeHandlers.length > 0) {
      var items = resizeHandlers;
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        triggerResize(item);
      }
    }

  }

  function getEventHandlers(eventName) {
    var items = [];
    
    switch (eventName) {
    case "resize":
      for (var k in resizeObjs) {
        items.push(resizeObjs[k]);
      }
      break;
    }

    return items;
  }

  function getDimensions($element) {
      var height = $element.outerHeight();
      var width = $element.outerWidth();

      return {
        uniqueMeasurementId: height+","+width
      };
  }

  function triggerResize(item) {
    var measure = getDimensions(item.$element);
    //check if measure has the same values as last
    var isFirstRun = false;
    if (item._resizeData === undefined) isFirstRun = true;
    if (item._resizeData !== undefined && item._resizeData === measure.uniqueMeasurementId) return;
    item._resizeData = measure.uniqueMeasurementId;
    if (isFirstRun) return;
    
    //make sure to keep listening until no more resize changes are found
    loopData.lastEvent = (new Date()).getTime();
    
    item.$element.trigger('resize');
  }


  //checking loop interval duration
  var resizeIntervalDuration = 250;

  var loopData = {
    lastEvent: 0,
    interval: null
  };

  //checking loop start and end
  function startLoop() {
    loopData.lastEvent = (new Date()).getTime();
    if (loopData.interval !== null) {
      stopLoop();
    }
    loopData.interval = setTimeout(resizeLoop, resizeIntervalDuration);
  }

  function repeatLoop() {
    if (loopData.interval !== null) {
      stopLoop();
    }
    loopData.interval = setTimeout(resizeLoop, resizeIntervalDuration);
  }

  function stopLoop() {
    clearInterval(loopData.interval);
    loopData.interval = null;
  }

  $('body').on("mousedown mouseup keyup keydown", startLoop);
  $(window).on("resize", startLoop);


})();

define("extensions/adapt-contrib-trickle/js/lib/jquery.resize", function(){});

define('extensions/adapt-contrib-trickle/js/lib/adaptModelExtension',[
    'coreJS/adapt',
    'coreModels/adaptModel'
], function(Adapt, AdaptModel) {

    _.extend(AdaptModel.prototype, {
        
        /*
        * Fetchs the sub structure of an id as a flattened array
        *
        *   Such that the tree:
        *       { a1: { b1: [ c1, c2 ], b2: [ c3, c4 ] }, a2: { b3: [ c5, c6 ] } }
        *
        *   will become the array (parent first = false):
        *       [ c1, c2, b1, c3, c4, b2, a1, c5, c6, b3, a2 ]
        *
        *   or (parent first = true):
        *       [ a1, b1, c1, c2, b2, c3, c4, a2, b3, c5, c6 ]
        *
        * This is useful when sequential operations are performed on the page/article/block/component hierarchy.
        */
        getDescendants: function(parentFirst) {
            var descendants = [];

            if (this.get("_type") === "component") {
                descendants.push(this);
                return new Backbone.Collection(descendants);
            }

            var children = this.getChildren();

            for (var i = 0, l = children.models.length; i < l; i++) {

                var child = children.models[i];
                if (child.get("_type") === "component") {

                    descendants.push(child);

                } else {

                    var subDescendants = child.getDescendants(parentFirst);
                    if (parentFirst == true) descendants.push(child);
                    descendants = descendants.concat(subDescendants.models);
                    if (parentFirst != true) descendants.push(child);

                }

            }

            return new Backbone.Collection(descendants);
        },

        /*
        * Returns a relative structural item from the Adapt hierarchy
        *   
        *   Such that in the tree:
        *       { a1: { b1: [ c1, c2 ], b2: [ c3, c4 ] }, a2: { b3: [ c5, c6 ] } }
        *
        *       findRelative(modelC1, "@block +1") = modelB2;
        *       findRelative(modelC1, "@component +4") = modelC5;
        *
        */
        findRelative: function(relativeString, options) {
            var types = [ "menu", "page", "article", "block", "component" ];

            options = options || {};

            var modelId = this.get("_id");
            var modelType = this.get("_type");

            //return a model relative to the specified one if opinionated
            var rootModel = Adapt.course;
            if (options.limitParentId) {
                rootModel = Adapt.findById(options.limitParentId);
            }

            var relativeDescriptor = parseRelativeString(relativeString);

            var findAncestorType = (_.indexOf(types, modelType) > _.indexOf(types, relativeDescriptor.type));
            var findSameType = (modelType === relativeDescriptor.type);

            var searchBackwards = false;
            var movementCount = 0;

            // children first [c,c,b,a,c,c,b,a,p,c,c,b,a,c,c,b,a,p]
            var pageDescendants = rootModel.getDescendants().toJSON();

            //choose search style
            if (findSameType || findAncestorType) {
                //examples a<>a or c<>b,a,p
                //assume next is 0 index
                //assume last is -1 index
                searchBackwards = (relativeDescriptor.offset <= 0);
            } else {
                //finding descendant
                //examples a<>c or a<>b
                if (relativeDescriptor.offset < 1) {
                    //assume last descendant is 0 index
                    searchBackwards = true;
                } else {
                    //assume next descendant is +1 index
                    movementCount = 1;
                    searchBackwards = false;
                }
            }

            //exclude not available and not visible if opinionated
            if (options.filterNotVisible) {
                pageDescendants = _.filter(pageDescendants, function(descendant) {
                    return descendant._isVisible;
                });
            } 
            if (options.filterNotAvailable) {
                pageDescendants = _.filter(pageDescendants, function(descendant) {
                    return descendant._isAvailable;
                });
            } 

            //find current index in array
            var modelIndex = _.findIndex(pageDescendants, function(pageDescendant) {
                if (pageDescendant._id === modelId) {
                    return true;
                }
                return false;
            });

            //search in appropriate order
            if (searchBackwards) {
                for (var i = modelIndex, l = -1; i > l; i--) {
                    var descendant = pageDescendants[i];
                    if (descendant._type === relativeDescriptor.type) {
                        if (-movementCount === relativeDescriptor.offset) {
                            return Adapt.findById(descendant._id);
                        }
                        movementCount++;
                    }
                }
            } else {
                for (var i = modelIndex, l = pageDescendants.length; i < l; i++) {
                    var descendant = pageDescendants[i];
                    if (descendant._type === relativeDescriptor.type) {
                        if (movementCount === relativeDescriptor.offset) {
                            return Adapt.findById(descendant._id);
                        }
                        movementCount++;
                    }
                }
            }

            return undefined;
        }
    });


    function parseRelativeString(relativeString) {
        var type = relativeString.substr(0, _.indexOf(relativeString, " "));
        var offset = parseInt(relativeString.substr(type.length));
        type = type.substr(1);

        /*RETURN THE TYPE AND OFFSET OF THE SCROLLTO
        * "@component +1"  : 
        * {
        *       type: "component",
        *       offset: 1
        * }
        */
        return { 
            type: type,
            offset: offset
        };
    }

});

define('extensions/adapt-contrib-trickle/js/handlers/buttonView',[
    'coreJS/adapt',
    'coreViews/componentView'
], function(Adapt, ComponentView) {

    var completionAttribute = "_isInteractionComplete";

    var TrickleButtonView = Backbone.View.extend({

        isStepLocking: false,
        hasStepLocked: false,
        isStepLocked: false,
        isStepLockFinished: false,
        hasStepPreCompleted: false,
        isWaitingForClick: false,
        allowVisible: false,
        allowEnabled: true,
        overlayShownCount: 0,

        el: function() {

            this.setupPreRender();

            return Handlebars.templates['trickle-button'](this.model.toJSON());
        },

        setupPreRender: function() {
            
            this.setupButtonVisible();
            this.setupButtonEnabled();
        },

        setupButtonVisible: function() {
            var trickle = Adapt.trickle.getModelConfig(this.model);
            this.allowVisible = false;
            trickle._button._isVisible = false;

            if (trickle._button._styleBeforeCompletion === "visible") {
                this.allowVisible = true;
                if (trickle._button._autoHide && trickle._button._isFullWidth) {
                    trickle._button._isVisible = false;    
                } else {
                    trickle._button._isVisible = true;
                }
            }
        },

        setupButtonEnabled: function() {
            var trickle = Adapt.trickle.getModelConfig(this.model);
            
            if (trickle._stepLocking._isCompletionRequired === false) {
                this.allowEnabled = true;
                trickle._button._isDisabled = false;   
            } else if (trickle._button._styleBeforeCompletion === "visible") {
                this.allowEnabled = false;
                trickle._button._isDisabled = true;
            } else {
                trickle._button._isDisabled = false;
                this.allowEnabled = true;
            }

        },
        
        events: {
            "click button": "onButtonClick"
        },

        initialize: function(options) {
            this.getCompletionAttribute();
            this.debounceCheckAutoHide();
            this.setupStepLocking();
            this.setupEventListeners();
        },

        getCompletionAttribute: function() {
            var trickle = Adapt.trickle.getModelConfig(Adapt.config);
            if (!trickle) return;
            if (trickle._completionAttribute) {
                completionAttribute = trickle._completionAttribute
            }
        },

        setupStepLocking: function() {
            var trickle = Adapt.trickle.getModelConfig(this.model);
            if (trickle._stepLocking._isEnabled) {
                this.isStepLocked = true;
            } else {
                this.isStepLocked = false;
            }
        },

        setupEventListeners: function() {
            this.listenTo(Adapt, {
                "trickle:overlay": this.onOverlay,
                "trickle:unoverlay": this.onUnoverlay,
                "trickle:steplock": this.onStepLock,
                "trickle:stepunlock": this.onStepUnlock,
                "trickle:skip": this.onSkip,
                "trickle:kill": this.onKill,
                "trickle:update": this.onUpdate,
                "remove": this.onRemove 
            });

            this.listenTo(this.model, "change:"+completionAttribute, this.onCompletion);
        },

        debounceCheckAutoHide: function() {
            this.checkButtonAutoHideSync = this.checkButtonAutoHide;
            this.checkButtonAutoHide = _.debounce(_.bind(this.checkButtonAutoHide, this), 100);
        },

        checkButtonAutoHide: function() {
            if (!this.allowVisible) {
                this.setButtonVisible(false);
                return;
            }

            var trickle = Adapt.trickle.getModelConfig(this.model);
            if (!trickle._button._autoHide) {
                this.setButtonVisible(true);
                return;
            } else if (this.overlayShownCount > 0) {
                this.setButtonVisible(false);
                return;
            }

            var measurements = this.$el.onscreen();

            //this is to fix ios7 iphone4 miscalculation
            var isJustOffscreen = (measurements.bottom > -100);


            //add show/hide animation here if needed
            if (measurements.onscreen || isJustOffscreen) {
                this.setButtonVisible(true);
            } else {
                this.setButtonVisible(false);
            }
        },

        setButtonVisible: function(bool) {
            var trickle = Adapt.trickle.getModelConfig(this.model);
            if (!bool) {
                this.$(".component-inner").addClass("display-none");
                trickle._button._isVisible = false;
                //console.log("trickle hiding button", this.model.get("_id"));
            } else {
                this.$(".component-inner").removeClass("display-none");
                trickle._button._isVisible = true;
                //console.log("trickle showing button", this.model.get("_id"));
            }
        },

        checkButtonEnabled: function(bool) {
            if (!this.allowEnabled) {
                this.setButtonEnabled(false);
            } else {
                this.setButtonEnabled(true);
            }
        },

        setButtonEnabled: function(bool) {
            var trickle = Adapt.trickle.getModelConfig(this.model);
            if (bool) {
                this.$("button").removeClass("disabled").removeAttr("disabled");
                trickle._button._isDisabled = true;
            } else {
                this.$("button").addClass("disabled").attr("disabled", "disabled");
                trickle._button._isDisabled = false;
            }
        },

        onStepLock: function(view) {
            if (!this.isViewMatch(view)) return;

            this.hasStepLocked = true;
            this.isStepLocking = true;
            this.overlayShownCount = 0;

            var trickle = Adapt.trickle.getModelConfig(this.model);

            if (this.isButtonEnabled()) {
                var isCompleteAndShouldRelock = (trickle._stepLocking._isLockedOnRevisit && this.model.get(completionAttribute));

                if (isCompleteAndShouldRelock) {
                    this.isStepLocked = true;
                    this.model.set("_isTrickleAutoScrollComplete", false);
                    Adapt.trigger("trickle:wait");
                    this.allowVisible = true;
                    this.checkButtonAutoHide();
                } else if (this.hasStepPreCompleted) {
                    //force the button to show if section completed before it was steplocked
                    this.isStepLocked = true;
                    this.model.set("_isTrickleAutoScrollComplete", false);
                    this.allowVisible = true;
                    this.stepCompleted();
                }
                this.setupOnScreenListener();
            }
        },

        onOverlay: function() {
            this.overlayShownCount++;
        },

        onUnoverlay: function() {
            this.overlayShownCount--;
            this.checkButtonAutoHide();
        },

        setupOnScreenListener: function() {
            var trickle = Adapt.trickle.getModelConfig(this.model);

            if (trickle._button._autoHide) {
                this.$el.on("onscreen", this.checkButtonAutoHide);
            }
        },

        isViewMatch: function(view) {
            return view.model.get("_id") === this.model.get("_id");
        },

        isButtonEnabled: function() {
            var trickle = Adapt.trickle.getModelConfig(this.model);

            if (!trickle._isEnabled || !trickle._button._isEnabled) return false;
            return true;
        },

        onCompletion: function(model, value) {
            if (value === false) return;

            this.hasStepPreCompleted = true;

            if (!this.hasStepLocked) return;

            _.defer(_.bind(function() {
                this.stepCompleted();
            }, this));
        },

        stepCompleted: function() {

            if (this.isStepLockFinished) return;

            this.isStepLocked = false;
            this.allowVisible = false;
            this.allowEnabled = false;

            if (this.isButtonEnabled()) {
                if (this.isStepLocking) {

                    this.isStepLocked = true;
                    this.isWaitingForClick = true;
                    Adapt.trigger("trickle:wait");

                } else {

                    this.isStepLockFinished = true;
                }

                this.allowVisible = true;
                this.allowEnabled = true;
            }

            this.model.set("_isTrickleAutoScrollComplete", false);
            this.checkButtonAutoHide();
            this.checkButtonEnabled();

        },

        onButtonClick: function() {
            if (this.isStepLocked) {
                Adapt.trigger("trickle:unwait");
                this.isStepLocked = false;
                this.isStepLockFinished = true;

            } else {
                this.model.set("_isTrickleAutoScrollComplete", false);
                _.defer(_.bind(function() {
                    Adapt.trickle.scroll(this.model);
                }, this));
            }

            var trickle = this.model.get("_trickle");
            switch (trickle._button._styleAfterClick) {
            case "hidden":
                this.allowVisible = false;
                this.checkButtonAutoHideSync();
                break;
            case "disabled":
                this.allowEnabled = false;
                this.checkButtonAutoHideSync();
            }
        },

        onUpdate: function() {
            var trickle = Adapt.trickle.getModelConfig(this.model);

            if (trickle._button._autoHide && this.isStepLocking) {
                this.$el.off("onscreen", this.checkButtonAutoHide);
            }
            
            var $original = this.$el;
            var $newEl = $(Handlebars.templates['trickle-button'](this.model.toJSON()));
            $original.replaceWith($newEl);

            this.setElement($newEl);

            if (trickle._button._autoHide && this.isStepLocking) {
                this.$el.on("onscreen", this.checkButtonAutoHide);
            }
        },

        onStepUnlock: function(view) {
            if (!this.isViewMatch(view)) return;
            this.$el.off("onscreen", this.checkButtonAutoHide);
            this.isStepLocking = false;
            this.overlayShownCount = 0;
        },

        onSkip: function() {
            if (!this.isStepLocking) return;

            this.onKill();
        },

        onKill: function() {
            this.$el.off("onscreen", this.checkButtonAutoHide);
            if (this.isWaitingForClick) {
                this.model.set("_isTrickleAutoScrollComplete", true);
            }
            this.isWaitingForClick = false;
            this.isStepLocked = false;
            this.isStepLocking = false;
            this.allowVisible = false;
            this.allowEnabled = false;
            this.isStepLockFinished = true;
            this.model.set("_isTrickleAutoScrollComplete", false);
            this.checkButtonAutoHide();
            this.checkButtonEnabled();
        },

        onRemove: function() {
            if (this.isWaitingForClick) {
                this.model.set("_isTrickleAutoScrollComplete", true);
            }
            this.isWaitingForClick = false;
            this.$el.off("onscreen", this.checkButtonAutoHide);
            this.isStepLocking = true;
            this.remove();
        }

    });

    return TrickleButtonView;
});

define('extensions/adapt-contrib-trickle/js/handlers/button',[
    'coreJS/adapt',
    './buttonView'
], function(Adapt, ButtonView) {

    var TrickleButtonHandler = _.extend({

        buttonViews: null,

        initialize: function() {
            this.listenToOnce(Adapt, {
                "app:dataReady": this.onAppDataReady,
                "remove": this.onRemove
            });
        },

        onAppDataReady: function() {
            this.buttonViews = {};
            this.setupEventListeners();
        },

        setupEventListeners: function() {
            this.listenTo(Adapt, {
                "trickle:preRender": this.onPreRender,
                "trickle:postRender": this.onPostRender,
            });
        },

        onPreRender: function(view) {
            //setup button on prerender to allow it to control the steplocking process
            if (!this.isTrickleEnabled(view.model)) return;

            this.setupConfigDefaults(view.model);

            this.buttonViews[view.model.get("_id")] = new ButtonView({
                model: view.model
            });
        },

        onPostRender: function(view) {
            //inject the button at post render
            if (!this.isTrickleEnabled(view.model)) return;

            view.$el.append(this.buttonViews[view.model.get("_id")].$el);
        },

        isTrickleEnabled: function(model) {
            var trickle = Adapt.trickle.getModelConfig(model);
            if (!trickle || !trickle._isEnabled) return false;

            if (trickle._onChildren && model.get("_type") === "article") return false;

            return true;
        },

        setupConfigDefaults: function(model) {
            if (model.get("_isTrickleButtonConfigured")) return;

            var trickle = Adapt.trickle.getModelConfig(model);
            trickle._button = _.extend({
                "_isEnabled": true, //(default=true)
                "_styleBeforeCompletion": "hidden", //(default=hidden)
                "_styleAfterClick": "hidden", //(default=hidden)
                "_isFullWidth": true, //(default=true)
                "_autoHide": true, //(default=true)
                "_className": "", //(default="")
                "text": "Continue", //(default="Continue")
                "startText": "Begin", //(default="Begin")
                "finalText": "Finish", //(default="Finish")
                "_component": "trickle-button", //(default="trickle-button")
                "_isLocking": true,
                "_isVisible": false,
                "_isDisabled": false
            }, trickle._button);


            if (trickle._button._isFullWidth) {
                trickle._stepLocking._isEnabled = true;
                trickle._button._styleAfterClick = "hidden";
            } else {
                trickle._button._autoHide = false;
            }

            Adapt.trickle.setModelConfig(model, trickle);
            model.set("_isTrickleButtonConfigured", true);

        },

        onRemove: function() {
            this.buttonViews = {};
        }

    }, Backbone.Events);

    TrickleButtonHandler.initialize();

    return TrickleButtonHandler;
});

define('extensions/adapt-contrib-trickle/js/handlers/completion',[
    'coreJS/adapt', 
], function(Adapt) {

    var completionAttribute = "_isInteractionComplete";

    var TrickleCompletionHandler = _.extend({

        isStepLocking: false,
        isCompleted: false,
        
        stepModel: null,
        
        initialize: function() {
            this.listenToOnce(Adapt, "app:dataReady", this.onAppDataReady);
        },

        onAppDataReady: function() {
            this.getCompletionAttribute();
            this.setupEventListeners();
        },

        getCompletionAttribute: function() {
            var trickle = Adapt.trickle.getModelConfig(Adapt.config);
            if (!trickle) return;
            if (trickle._completionAttribute) {
                completionAttribute = trickle._completionAttribute
            }
        },

        setupEventListeners: function() {
            this.listenTo(Adapt, {
                "trickle:descendants": this.onDescendants,
                "trickle:steplock": this.onStepLock,
                "trickle:stepunlock": this.onStepUnlock,
                "trickle:kill": this.onKill,
                "remove": this.onRemove
            });
        },

        onDescendants: function(view) {
            //save the original completion state of the component before steplocking
            view.descendantsParentFirst.each(_.bind(function(descendant) {
                var trickle = Adapt.trickle.getModelConfig(descendant);
                if (!trickle) return;
                trickle._wasCompletedPreRender = descendant.get(completionAttribute);
            }, this));
        },

        onStepLock: function(view) {
            var isModelComplete = view.model.get(completionAttribute);

            var trickle = Adapt.trickle.getModelConfig(view.model);
            if (!trickle._stepLocking._isCompletionRequired
                && !trickle._stepLocking._isLockedOnRevisit) {
                if (isModelComplete) {
                    //skip any components that do not require completion but that are already complete
                    //this is needed for a second visit to a page with 'inview' components that aren't reset and don't require completion and are not relocked on revisit
                    Adapt.trigger("trickle:continue", view);
                }
                return;
            }

            if (trickle._stepLocking._isCompletionRequired
                && isModelComplete
                && trickle._wasCompletedPreRender) {
                //skip any components that are complete, have require completion and we completed before the page rendered
                Adapt.trigger("trickle:continue", view);
                return;
            }

            Adapt.trigger("trickle:wait");

            if (isModelComplete) {
                _.defer(function() {
                    Adapt.trigger("trickle:unwait")
                });
                return;
            }

            view.model.set("_isTrickleAutoScrollComplete", false);
            this.isCompleted = false;
            this.isStepLocking = true;
            this.stepModel = view.model;

            this.listenTo(this.stepModel, "change:"+completionAttribute, this.onCompletion);
        },

        onCompletion: function(model, value) {
            if (value === false) return;

            _.defer(_.bind(function() {
                this.stepCompleted();
            }, this));

        },

        stepCompleted: function() {

            if (!this.isStepLocking) return;

            if (this.isCompleted) return;
            this.isCompleted = true;

            this.stopListening(this.stepModel, "change:"+completionAttribute, this.onCompletion);
            
            _.defer(function(){
                Adapt.trigger("trickle:unwait");
            });
        },

        onKill: function() {
            this.onStepUnlock();
        },

        onRemove: function() {
            this.onStepUnlock();
        },

        onStepUnlock: function() {
            this.stopListening(this.stepModel, "change:"+completionAttribute, this.onCompletion);
            this.isStepLocking = false;
            this.stepModel = null;
            this.isCompleted = false;
        }        

    }, Backbone.Events);

    TrickleCompletionHandler.initialize();

    return TrickleCompletionHandler;

});

define('extensions/adapt-contrib-trickle/js/handlers/notify',[
    'coreJS/adapt', 
], function(Adapt) {

    var TrickleNotifyHandler = _.extend({

        isStepLocking: false,
        isNotifyOpen: false,

        initialize: function() {
            this.listenToOnce(Adapt, "app:dataReady", this.onAppDataReady);
        },

        onAppDataReady: function() {
            this.setupEventListeners();
        },

        setupEventListeners: function() {
            this.listenTo(Adapt, {
                "trickle:steplock": this.onStepLock,
                "notify:opened": this.onNotifyOpened,
                "notify:closed": this.onNotifyClosed,
                "trickle:stepunlock": this.onStepUnlock,
                "remove": this.onRemove
            });
        },

        onStepLock: function(view) {
            this.isStepLocking = true;
        },

        onNotifyOpened: function() {
            if (!this.isStepLocking) return;

            this.isNotifyOpen = true;
            Adapt.trigger("trickle:overlay");
            Adapt.trigger("trickle:wait");
        },

        onNotifyClosed: function() {
            if (!this.isStepLocking) return;
            if (!this.isNotifyOpen) return;

            this.isNotifyOpen = false;
            Adapt.trigger("trickle:unoverlay");
            Adapt.trigger("trickle:unwait");
        },

        onStepUnlock: function() {
            this.isStepLocking = false;
        },

        onRemove: function() {
            this.onStepUnlock();
        }

    }, Backbone.Events);

    TrickleNotifyHandler.initialize();

    return TrickleNotifyHandler;

});

define('extensions/adapt-contrib-trickle/js/handlers/resize',[
    'coreJS/adapt', 
], function(Adapt) {

    var TrickleBodyResizeHandler = _.extend({

        isStepLocking: false,

        stepView: null,

        initialize: function() {
            this.listenToOnce(Adapt, "app:dataReady", this.onAppDataReady);
        },

        onAppDataReady: function() {
            this.debounceOnResize();
            this.setupEventListeners();
        },

        debounceOnResize: function() {
            this.onResize = _.debounce(_.bind(this.onResize, this), 10);
        },

        setupEventListeners: function() {
            this.listenTo(Adapt, {
                "trickle:steplock": this.onStepLock,
                "trickle:resize": this.onTrickleResize,
                "trickle:stepunlock": this.onStepUnlock,
                "trickle:kill": this.onKill,
                "trickle:finished": this.onFinished,
                "remove": this.onRemove
            });
        },

        onStepLock: function(view) {
            this.isStepLocking = true;
            this.stepView = view;
            $(window).on("resize", this.onResize);
            $(".page").on("resize", this.onResize);

            //wait for height / visibility to adjust
            _.defer(function() {
                Adapt.trigger("trickle:resize");
            });
        },

        onResize: function() {
            if (!this.isStepLocking) return;
            Adapt.trigger("trickle:resize");
        },

        onTrickleResize: function() {
            if (!this.isStepLocking) return;
            var offset = this.stepView.$el.offset();
            var height = this.stepView.$el.height();

            var topPadding = parseInt($("#wrapper").css("padding-top") || "0");

            var bottom = (offset['top'] - topPadding) + height;

            $("#wrapper").css("height", bottom );
        },

        onStepUnlock: function(view) {
            this.isStepLocking = false;
            this.stepView = null;
            $(window).off("resize", this.onResize);
            $(".page").off("resize", this.onResize);
        },

        onKill: function() {
            this.onFinished();
            this.onStepUnlock();
        },

        onFinished: function() {
             $("#wrapper").css("height", "" );
        },

        onRemove: function() {
            this.onStepUnlock();
            this.stepView = null;
        }

    }, Backbone.Events);

    TrickleBodyResizeHandler.initialize();

    return TrickleBodyResizeHandler;

});

define('extensions/adapt-contrib-trickle/js/handlers/tutor',[
    'coreJS/adapt', 
], function(Adapt) {

    var TrickleTutorHandler = _.extend({

        isStepLocking: false,
        isTutorOpen: false,

        initialize: function() {
            this.listenToOnce(Adapt, "app:dataReady", this.onAppDataReady);
        },

        onAppDataReady: function() {
            this.setupEventListeners();
        },

        setupEventListeners: function() {
            this.listenTo(Adapt, {
                "trickle:steplock": this.onStepLock,
                "tutor:opened": this.onTutorOpened,
                "tutor:closed": this.onTutorClosed,
                "trickle:stepunlock": this.onStepUnlock,
                "remove": this.onRemove
            });
        },

        onStepLock: function(view) {
            this.isStepLocking = true;
        },

        onTutorOpened: function() {
            if (!this.isStepLocking) return;

            this.isTutorOpen = true;
            Adapt.trigger("trickle:overlay");
            Adapt.trigger("trickle:wait");
        },

        onTutorClosed: function() {
            if (!this.isStepLocking) return;
            if (!this.isTutorOpen) return;

            this.isTutorOpen = false;
            Adapt.trigger("trickle:unoverlay");
            Adapt.trigger("trickle:unwait");
        },

        onStepUnlock: function() {
            this.isStepLocking = false;
        },

        onRemove: function() {
            this.onStepUnlock();
        }

    }, Backbone.Events);

    TrickleTutorHandler.initialize();

    return TrickleTutorHandler;

});

define('extensions/adapt-contrib-trickle/js/handlers/visibility',[
    'coreJS/adapt', 
], function(Adapt) {

    var TrickleVisibilityHandler = _.extend({

        isStepLocking: false,

        trickleModel: null,

        initialize: function() {
            this.listenToOnce(Adapt, "app:dataReady", this.onAppDataReady);
        },

        onAppDataReady: function() {
            this.setupEventListeners();
        },

        setupEventListeners: function() {
            this.listenTo(Adapt, {
                "trickle:steplock": this.onStepLock,
                "trickle:visibility": this.onVisibility,
                "trickle:stepunlock": this.onStepUnlock,
                "trickle:kill": this.onKill,
                "trickle:finished": this.onFinished,
                "remove": this.onRemove
            });

        },

        onStepLock: function(view) {
            this.isStepLocking = true;
            this.trickleModel = view.model;
            Adapt.trigger("trickle:visibility");
        },

        onVisibility: function() {
            if (!this.isStepLocking) return;

            if (!Adapt.trickle.pageView) return;

            var descendantsParentFirst = Adapt.trickle.pageView.descendantsParentFirst;

            var trickleModelId = this.trickleModel.get("_id");
            var trickleType = this.trickleModel.get("_type");

            var atIndex = _.findIndex(descendantsParentFirst.models, function(descendant) {
                if (descendant.get("_id") === trickleModelId) return true;
            });

            descendantsParentFirst.each(function(descendant, index) {
                if (index <= atIndex) {
                    descendant.set("_isVisible", true, {pluginName:"trickle"});
                    var components = descendant.findDescendants("components");
                    components.each(function(componentModel) {
                        componentModel.set("_isVisible", true, {pluginName:"trickle"});
                    });
                } else {

                    if (trickleType === "article" && descendant.get("_type") === "block") {
                        //make sure article blocks are shown
                        if (descendant.get("_parentId") === trickleModelId) {
                            descendant.set("_isVisible", true, {pluginName:"trickle"});
                            var components = descendant.findDescendants("components");
                            components.each(function(componentModel) {
                                componentModel.set("_isVisible", true, {pluginName:"trickle"});
                            });
                            return;
                        }
                    }

                    descendant.set("_isVisible", false, {pluginName:"trickle"});
                    var components = descendant.findDescendants("components");
                    components.each(function(componentModel) {
                        componentModel.set("_isVisible", false, {pluginName:"trickle"});
                    });
                }
            });

        },

        onStepUnlock: function(view) {
            this.isStepLocking = false;
            this.trickleModel = null;
        },

        onKill: function() {
            this.onFinished();
            this.onStepUnlock();
        },

        onFinished: function() {

            var descendantsParentFirst = Adapt.trickle.pageView.descendantsParentFirst;

            descendantsParentFirst.each(function(descendant) {
                descendant.set("_isVisible", true, {pluginName:"trickle"});
                var components = descendant.findDescendants("components");
                components.each(function(componentModel) {
                    componentModel.set("_isVisible", true, {pluginName:"trickle"});
                });
            });

        },

        onRemove: function() {
            this.onStepUnlock();
        }

    }, Backbone.Events);

    TrickleVisibilityHandler.initialize();

    return TrickleVisibilityHandler;

});

define('extensions/adapt-contrib-trickle/js/handlers/done',[
    'coreJS/adapt', 
], function(Adapt) {

    var TrickleDone = _.extend({

        initialize: function() {
            this.listenToOnce(Adapt, "app:dataReady", this.onAppDataReady);
        },

        onAppDataReady: function() {
            this.setupEventListeners();
        },

        setupEventListeners: function() {
            this.onDone = _.debounce(_.bind(this.onDone), 50);
            this.listenTo(Adapt, {
                "trickle:steplock": this.onDone,
                "trickle:stepunlock": this.onDone,
                "trickle:continue": this.onDone,
                "trickle:finished": this.onDone
            });
        },

        onDone: function() {
            Adapt.trigger("trickle:done");
        }

    }, Backbone.Events);

    TrickleDone.initialize();

    return TrickleDone;

});

define('extensions/adapt-contrib-trickle/js/adapt-contrib-trickle',[
    'coreJS/adapt',
    './pageView',
    './lib/jquery.resize',
    './lib/adaptModelExtension',
    './handlers/button',
    './handlers/completion',
    './handlers/notify',
    './handlers/resize',
    './handlers/tutor',
    './handlers/visibility',
    './handlers/done'
], function(Adapt, PageView) {

    Adapt.trickle = _.extend({

        model: null,
        pageView: null,

        initialize: function() {
            this.listenToOnce(Adapt, {
                "app:dataReady": this.onAppDataReady
            });
        },

        onAppDataReady: function() {
            this.getCourseModel();
            if (!this.isCourseEnabled()) return;
            this.setupListeners();
        },

        getCourseModel: function() {
            this.model = Adapt.course;
        },

        isCourseEnabled: function() {
            var trickleConfig = this.getModelConfig(this.model);
            if (trickleConfig && trickleConfig._isEnabled === false) return false;
            return true;
        },

        getModelConfig: function(model) {
            return model.get("_trickle");
        },

        setModelConfig: function(model, config) {
            return model.set("_trickle", config);
        },

        setupListeners: function() {
            this.listenTo(Adapt, {
                "pageView:preRender": this.onPagePreRender,
                "remove": this.onRemove
            });
        },

        onPagePreRender: function(view) {
            this.pageView = new PageView({
                model: view.model, 
                el: view.el
            });
        },

        scroll: function(fromModel) {
            //wait for model visibility to handle
            _.delay(_.bind(function() {

                if (!this.shouldScrollPage(fromModel)) return;

                var trickle = Adapt.trickle.getModelConfig(fromModel);
                var scrollTo = trickle._scrollTo;
                if (scrollTo === undefined) scrollTo = "@block +1";

                fromModel.set("_isTrickleAutoScrollComplete", true);

                var scrollToId = "";
                switch (scrollTo.substr(0,1)) {
                case "@":
                    //NAVIGATE BY RELATIVE TYPE
                    
                    //Allows trickle to scroll to a sibling / cousin component relative to the current trickle item
                    var relativeModel = fromModel.findRelative(scrollTo, {
                        filterNotAvailable: true
                    });
                    
                    if (relativeModel === undefined) return;
                    scrollToId = relativeModel.get("_id");

                    //console.log("trickle scrolling to", scrollToId, "from", fromModel.get("_id"));

                    break;
                case ".":
                    //NAVIGATE BY CLASS
                    scrollToId = scrollTo.substr(1, scrollTo.length-1);
                    break;
                default: 
                    scrollToId = scrollTo;
                }

                if (scrollToId == "") return;
                
                var duration = fromModel.get("_trickle")._scrollDuration || 500;
                Adapt.scrollTo("." + scrollToId, { duration: duration });

            }, this), 250);
        },

        shouldScrollPage: function(fromModel) {
            var trickle = Adapt.trickle.getModelConfig(fromModel);
            if (!trickle || !trickle._isEnabled) return false;

            var hasScrolled = fromModel.get("_isTrickleAutoScrollComplete");
            if (hasScrolled) return false;

            var isAutoScrollOff = (!trickle._autoScroll);
            if (isAutoScrollOff) return false;

            var isArticleWithOnChildren = (fromModel.get("_type") === "article" && trickle._onChildren);
            if (isArticleWithOnChildren) return false;

            return true;
        },

        onRemove: function() {
            
        }
                
    }, Backbone.Events);

    Adapt.trickle.initialize();

    return Adapt.trickle;

});

define('extensions/adapt-contrib-triggered/js/adapt-contrib-triggered',[
  'coreJS/adapt'
], function(Adapt) {

    function setupTriggeredViews(componentView) {

        var TriggeredShowView = Backbone.View.extend({

            tagName: 'button',

            className: 'base triggered-button-show',

            initialize: function() {
                this.listenTo(Adapt, 'remove', this.remove);
                this.$el.attr({
                    'data-triggered-id': this.model.get('_id'),
                    'tabindex': 0
                });
                this.triggeredView = componentView;
                this.render();
            },

            events: {
                'click': 'show'
            },

            render: function() {
                var data = this.model.toJSON();
                var template = Handlebars.templates['triggered-show-button'];
                var $container = $(".component-container", $("." + this.model.get("_parentId")));
                $container.addClass('triggered-container');

                var showButton = this.triggeredView.model.get('_triggered').showButton;
                this.$el.html(template(data)).css({
                    top:showButton._top,
                    right: showButton._right,
                    bottom: showButton._bottom,
                    left:showButton._left,
                }).appendTo($container);
                return this;
            },

            show: function(event) {
                event && event.preventDefault();
                var $currentTarget = $(event.currentTarget);
                var currentTriggeredId = $currentTarget.attr('data-triggered-id');

                $currentTarget.addClass('triggered-hidden');

                this.triggeredView.model.set('_isVisible', true, {pluginName:'_triggered'});
                $('.' + currentTriggeredId).removeClass('triggered-hidden');
                this.triggeredView.$el.data('inview', false);
                $(window).scroll();
                this.triggeredView.$el.a11y_focus();
            }

        });

        var TriggeredHideView = Backbone.View.extend({

            el: function() {
                return componentView.el;
            },

            initialize: function() {
                this.listenTo(Adapt, 'remove', this.remove);
                this.render();
            },

            events: {
                'click .triggered-button-hide': 'hide'
            },

            render: function() {
                var data = this.model.toJSON();
                var template = Handlebars.templates['triggered-hide-button'];
                this.$el.addClass('triggered-component triggered-hidden').append(template(data));
                return this;
            },

            hide: function(event) {
                event && event.preventDefault();
                var currentTriggeredId = this.model.get('_id');
                this.model.set('_isVisible', false, {pluginName:'_triggered'});
                this.$el.addClass('triggered-hidden');
                $('.triggered-button-show[data-triggered-id="'+currentTriggeredId+'"]').removeClass('triggered-hidden').a11y_focus();
            }

        });

        new TriggeredShowView({model: componentView.model});
        new TriggeredHideView({model: componentView.model});

    }

    function onComponentViewPreRender(view) {
        if (view.model.get('_triggered') && view.model.get('_triggered')._isEnabled === true) {
            view.model.set('_isVisible', false, {pluginName:'_triggered'});
        }
    }

    function onComponentViewPostRender(componentView) {
        if (componentView.model.get('_triggered') && componentView.model.get('_triggered')._isEnabled === true) {
            setupTriggeredViews(componentView);
        }
    }

    function onDataReady() {
        // do not proceed until triggered enabled on course.json
        if (!Adapt.course.get('_triggered') || !Adapt.course.get('_triggered')._isEnabled) {
            return;
        }

        Adapt.on('componentView:preRender', onComponentViewPreRender);
        Adapt.on('componentView:postRender', onComponentViewPostRender);
    }

    Adapt.once('app:dataReady', onDataReady);

});

define('extensions/adapt-contrib-tutor/js/adapt-contrib-tutor',[
    'coreJS/adapt'
],function(Adapt) {

    Adapt.on('questionView:showFeedback', function(view) {

        var alertObject = {
            title: view.model.get("feedbackTitle"),
            body: view.model.get("feedbackMessage")
        };

        if (view.model.has('_isCorrect')) {
            // Attach specific classes so that feedback can be styled.
            if (view.model.get('_isCorrect')) {
                alertObject._classes = 'correct';
            } else {
                if (view.model.has('_isAtLeastOneCorrectSelection')) {
                    // Partially correct feedback is an option.
                    alertObject._classes = view.model.get('_isAtLeastOneCorrectSelection')
                        ? 'partially-correct'
                        : 'incorrect';
                } else {
                    alertObject._classes = 'incorrect';
                }
            }
        }

        Adapt.once("notify:closed", function() {
            Adapt.trigger("tutor:closed");
        });

        Adapt.trigger('notify:popup', alertObject);

        Adapt.trigger('tutor:opened');
    });

});

define('extensions/adapt-devtools/js/devtools-model',['require','coreJS/adapt'],function(require) {

	var Adapt = require('coreJS/adapt');

	var DevtoolsModel = Backbone.Model.extend({

		initialize:function() {
			var config = Adapt.config.has('_devtools') ? Adapt.config.get('_devtools') : this.getDefaultConfig();
			this.set(_.extend({
				'_trickleEnabled':false,
				'_hintingAvailable':true,
				'_hintingEnabled':false,
				'_toggleFeedbackAvailable':true,
				'_feedbackEnabled':true,
				'_autoCorrectAvailable':true,
				'_autoCorrectEnabled':false,
				'_altTextAvailable':true,
				'_altTextEnabled':false,
				'_tutorListener':null,
				'_unlockAvailable':true,
				'_unlocked':false,
				'_toggleBankingAvailable':true
			}, config));
		},

		getDefaultConfig:function() {
			return {
				'_isEnabled':false,
				'_theme':'theme-dark'
			};
		},

		toggleFeedback:function() {
			this.set('_feedbackEnabled', !this.get('_feedbackEnabled'));
		},

		toggleHinting:function() {
			this.set('_hintingEnabled', !this.get('_hintingEnabled'));
		},

		toggleAutoCorrect:function() {
			this.set('_autoCorrectEnabled', !this.get('_autoCorrectEnabled'));
		},

		toggleAltText:function() {
			this.set('_altTextEnabled', !this.get('_altTextEnabled'));
		}
	});

	return DevtoolsModel;
});

define('extensions/adapt-devtools/js/hinting',['require','coreJS/adapt'],function(require) {

	var Adapt = require('coreJS/adapt');

	var Hinting = _.extend({

		initialize:function() {
			this.listenTo(Adapt.devtools, 'change:_hintingEnabled', this.toggleHints);
		},

		toggleHints:function() {
			var contentObject = Adapt.findById(Adapt.location._currentId);
			var components = contentObject.findDescendants('components');
			var renderedQuestions = components.where({'_isQuestionType':true, '_isReady':true});

			_.each(renderedQuestions, function(model) {
				this.setHinting($('.'+model.get('_id')), model, Adapt.devtools.get('_hintingEnabled'));
			}, this);

			if (Adapt.devtools.get('_hintingEnabled')) this.listenTo(Adapt, 'componentView:postRender', this.onComponentRendered);
			else this.stopListening(Adapt, 'componentView:postRender');
		},

		onComponentRendered:function(view, hintingEnabled) {
			if (view.model.get('_isQuestionType')) this.setHinting(view.$el, view.model);
		},

		setHinting:function($el, model, hintingEnabled) {
			switch (model.get('_component')) {
				case 'mcq':this.setMcqHinting($el, model, hintingEnabled !== false); break;
				case 'gmcq':this.setGmcqHinting($el, model, hintingEnabled !== false); break;
				case 'matching':this.setMatchingHinting($el, model, hintingEnabled !== false); break;
				case 'slider':this.setSliderHinting($el, model, hintingEnabled !== false); break;
				case 'textinput':this.setTextInputHinting($el, model, hintingEnabled !== false); break;
				case 'questionStrip':this.setQuestionStripHinting($el, model, hintingEnabled !== false); break;
			}
		},

		setMcqHinting:function($el, model, hintingEnabled) {
			if (hintingEnabled) {
				_.each(model.get('_items'), function(item, index) {
					$el.find('.mcq-item').eq(index).addClass(item._shouldBeSelected ? 'hintCorrect' : 'hintIncorrect');
				});
			}
			else {
				$el.find('.mcq-item').removeClass('hintCorrect hintIncorrect');
			}
		},

		setGmcqHinting:function($el, model, hintingEnabled) {
			if (hintingEnabled) {
				_.each(model.get('_items'), function(item, index) {
					$el.find('.gmcq-item').eq(index).addClass(item._shouldBeSelected ? 'hintCorrect' : 'hintIncorrect');
				});
			}
			else {
				$el.find('.gmcq-item').removeClass('hintCorrect hintIncorrect');
			}
		},

		setMatchingHinting:function($el, model, hintingEnabled) {
			if (hintingEnabled) {
				_.each(model.get('_items'), function(item, itemIndex) {
					var $select = $el.find('select').eq(itemIndex);
					var $options = $select.find('option');
					_.each(item._options, function(option, optionIndex) {
						/*if (Modernizr.touch) {*/
							if (option._isCorrect) $options.eq(optionIndex+1).append('<span class="hint"> (correct)</span>');
						/*}
						else {
							$options.eq(optionIndex+1).addClass(option._isCorrect ? 'hintCorrect' : 'hintIncorrect');
						}*/
					});
				});
			}
			else {
				/*if (Modernizr.touch) */$el.find('option .hint').remove();
				/*else $el.find('option').removeClass('hintCorrect hintIncorrect');*/
			}
		},

		setSliderHinting:function($el, model, hintingEnabled) {
			if (hintingEnabled) {
				var correctAnswer = model.get('_correctAnswer');
				if (correctAnswer) {
					$el.find('.slider-scale-number').addClass('hintIncorrect');
					$el.find('.slider-scale-number[data-id="'+correctAnswer+'"]').removeClass('hintIncorrect').addClass('hintCorrect');
				}
				else {
					$el.find('.slider-scale-number').addClass('hintIncorrect');
					var bottom = model.get('_correctRange')._bottom;
	        		var top = model.get('_correctRange')._top;
	        		for (var i = bottom; i <= top; i++)
	        			$el.find('.slider-scale-number[data-id="'+i+'"]').removeClass('hintIncorrect').addClass('hintCorrect');
				}
			}
			else {
				$el.find('.slider-scale-number').removeClass('hintCorrect hintIncorrect');
			}
		},

		setTextInputHinting:function($el, model, hintingEnabled) {
			if (hintingEnabled) {
				_.each(model.get('_items'), function(item, index) {
					if (model.get('_answers')) {
						// generic answers
						$el.find('.textinput-item').eq(index).find('input').attr('placeholder', model.get('_answers')[index][0]);
					}
					else {
						// specific answers
						$el.find('.textinput-item').eq(index).find('input').attr('placeholder', item._answers[0]);
					}
				});
			}
			else {
				_.each(model.get('_items'), function(item, index) {
					if (model.get('_answers')) {
						$el.find('.textinput-item').eq(index).find('input').attr('placeholder', item.placeholder);
					}
				});
			}
		},

		setQuestionStripHinting:function($el, model, hintingEnabled) {
			if (hintingEnabled) {
				_.each(model.get('_items'), function(item, itemIndex) {
					var $item = $el.find('.component-item').eq(itemIndex);
					var $subItems = $item.find('.qs-strapline-header-inner:not(.qs-noop) .qs-strapline-title-inner');
					_.each(item._subItems, function(subItem, subItemIndex) {
						if (subItem._isCorrect) $subItems.eq(subItemIndex).append('<span class="hint"> (correct)</span>');
					});
				});
			}
			else {
				$el.find('.qs-strapline-title-inner .hint').remove();
			}
		}
	}, Backbone.Events);

	Adapt.once('adapt:initialize devtools:enable', function() {
		if (!Adapt.devtools.get('_isEnabled')) return;

		Hinting.initialize();
	});

	return Hinting;
});

define('extensions/adapt-devtools/js/is-question-supported',['require'],function(require) {
	function isQuestionSupported(model) {
		switch (model.get('_component')) {
			case 'mcq':
			case 'gmcq':
			case 'matching':
			case 'slider':
			case 'textinput':
			case 'questionStrip':return true;
			default: return false;
		}
	}

	return isQuestionSupported;
});
define('extensions/adapt-devtools/js/auto-answer',['require','coreJS/adapt','./hinting','./is-question-supported'],function(require) {

	var Adapt = require('coreJS/adapt');
	var Hinting = require('./hinting');
	var isQuestionSupported = require('./is-question-supported');

	var AutoAnswer = _.extend({

		initialize:function() {
			this.listenTo(Adapt, 'componentView:postRender', this.componentRendered);
		},

		componentRendered:function(view) {
			if (isQuestionSupported(view.model)) {
				if (view.buttonsView) {
					view.$('.buttons-action').on('mousedown', _.bind(this.onSubmitClicked, this, view));
				}
				else if (Adapt.devtools.get('_debug')) {
					console.warn('adapt-devtools: could not find submit button on '+view.model.get('_id'));
				}
			}
		},

		onSubmitClicked:function(view, e) {
			// remove hinting if enabled
			if (Adapt.devtools.get('_hintingEnabled')) Hinting.setHinting(view.$el, view.model, false);

			if ((e.ctrlKey && !e.shiftKey) || Adapt.devtools.get('_autoCorrectEnabled')) {
				this.answer(view);
			}
			else if (e.ctrlKey && e.shiftKey) {
				this.answer(view, true);
			}
		},

		answer:function(view, incorrectly) {
			if (view.model.get('_isSubmitted')) return;

			if (Adapt.devtools.get('_debug')) {
				console.log('adapt-devtools: answer '+view.model.get('_id')+(incorrectly === true ? ' incorrectly' : ''));
			}

			if (incorrectly === true) {
				switch (view.model.get('_component')) {
					case 'mcq':this.answerMultipleChoiceIncorrectly(view); break;
					case 'gmcq':this.answerMultipleChoiceIncorrectly(view, true); break;
					case 'matching':this.answerMatchingIncorrectly(view); break;
					case 'slider':this.answerSliderIncorrectly(view); break;
					case 'textinput':this.answerTextInputIncorrectly(view); break;
					case 'questionStrip':this.answerQuestionStripIncorrectly(view); break;
					default:this.answerUnsupportedIncorrectly(view);
				}
			}
			else {
				switch (view.model.get('_component')) {
					case 'mcq':this.answerMultipleChoice(view); break;
					case 'gmcq':this.answerMultipleChoice(view, true); break;
					case 'matching':this.answerMatching(view); break;
					case 'slider':this.answerSlider(view); break;
					case 'textinput':this.answerTextInput(view); break;
					case 'questionStrip':this.answerQuestionStrip(view); break;
					default:this.answerUnsupported(view);
				}
			}
		},

		answerMultipleChoice:function(view, isGraphical) {
			_.each(view.model.get('_items'), function(item, index) {
				if (item._shouldBeSelected && !item._isSelected || !item._shouldBeSelected && item._isSelected) {
					view.$(isGraphical ? '.gmcq-item input' : '.mcq-item input').eq(index).trigger('change');
				}
			});
		},

		answerMultipleChoiceIncorrectly:function(view, isGraphical) {
			var model = view.model, items = model.get('_items'), itemCount = items.length;
			var selectionStates = _.times(itemCount, function() {return false;});
			// number of items that should be selected
			var nShould = _.where(items, {_shouldBeSelected:true}).length;
			// and number that should not
			var nShouldNot = itemCount - nShould;
			// decide how many items to select
			var nSelect = model.get('_selectable');
			// decide how many of these should be incorrect
			var nIncorrect = nShouldNot == 0 ? 0 : _.random(nShould == 1 ? 1 : 0, Math.min(nShouldNot, nSelect));
			// and how many should be correct
			var nCorrect = nIncorrect == 0 ? _.random(1, Math.min(nShould - 1, nSelect)) : _.random(0, Math.min(nShould, nSelect - nIncorrect));

			if (itemCount == 1 || nSelect == 0) {
				console.warn('adapt-devtools: not possible to answer '+model.get('_id')+' incorrectly');
				return;
			}

			for (var j = 0; j < nIncorrect; j++) {
				// start at a random position in items to avoid bias (err is contingency for bad data)
				for (var k=_.random(itemCount), err=itemCount, found=false; !found && err>=0; k++, err--) {
					var index = k%itemCount;
					if (selectionStates[index] === false) {
						if (!items[index]._shouldBeSelected) selectionStates[index] = found = true;
					}
				}
			}
			for (var j = 0; j < nCorrect; j++) {
				// start at a random position in items to avoid bias (err is contingency for bad data)
				for (var k=_.random(itemCount), err=itemCount, found=false; !found && err>=0; k++, err--) {
					var index = k%itemCount;
					if (selectionStates[index] === false) {
						if (items[index]._shouldBeSelected) selectionStates[index] = found = true;
					}
				}
			}

			_.each(items, function(item, index) {
				if (selectionStates[index] && !item._isSelected || !selectionStates[index] && item._isSelected) {
					view.$(isGraphical ? '.gmcq-item input' : '.mcq-item input').eq(index).trigger('change');
				}
			});
		},

		answerMatching:function(view) {
			_.each(view.model.get('_items'), function(item, itemIndex) {
				var $select = view.$('select').eq(itemIndex);
				var $options = $select.find('option');
				_.each(item._options, function(option, optionIndex) {
					if (option._isCorrect) $options.eq(optionIndex+1).prop('selected', true);
				});
			});
		},

		answerMatchingIncorrectly:function(view) {
			var items = view.model.get('_items'), itemCount = items.length, nIncorrect = _.random(1, itemCount);
			// decide which items to answer incorrectly (minimum one)
			var selectionStates = _.shuffle(_.times(itemCount, function(i) {return i<nIncorrect;}));

			_.each(items, function(item, itemIndex) {
				var $select = view.$('select').eq(itemIndex);
				var $options = $select.find('option');
				// check if this item is to be answered incorrectly
				if (selectionStates[itemIndex]) {
					// start at a random position in options to avoid bias (err is contingency for bad data)
					for (var count=item._options.length, i=_.random(count), err=count; err>=0; i++, err--)
						if (!item._options[i%count]._isCorrect) {
							$options.eq((i%count)+1).prop('selected', true);
							return;
						}
				}
				else {
					_.each(item._options, function(option, optionIndex) {
						if (option._isCorrect) $options.eq(optionIndex+1).prop('selected', true);
					});
				}
			});
		},

		answerSlider:function(view) {
			var correctAnswer = view.model.get('_correctAnswer');
			if (correctAnswer) {
				view.$('.slider-scale-number[data-id="'+correctAnswer+'"]').trigger('click');
			}
			else {
				var bottom = view.model.get('_correctRange')._bottom;
        		var top = view.model.get('_correctRange')._top;
        		var d = top - bottom;
        		// select from range at random
        		view.$('.slider-scale-number[data-id="'+(bottom+Math.floor(Math.random()*(d+1)))+'"]').trigger('click');
			}
		},

		answerSliderIncorrectly:function(view) {
			var correctAnswer = view.model.get('_correctAnswer');
			var start = view.model.get('_scaleStart'), end = view.model.get('_scaleEnd');
			var incorrect = _.times(end-start+1, function(i) {return start+i;});
			if (correctAnswer) {
				incorrect.splice(correctAnswer-start, 1);
			}
			else {
				var bottom = view.model.get('_correctRange')._bottom;
        		var top = view.model.get('_correctRange')._top;
        		incorrect.splice(bottom-start, top-bottom+1);
			}
			view.$('.slider-scale-number[data-id="'+_.shuffle(incorrect)[0]+'"]').trigger('click');
		},

		answerTextInput:function(view) {
			var answers = view.model.get('_answers');
			_.each(view.model.get('_items'), function(item, index) {
				if (answers) view.$('.textinput-item input').eq(index).val(answers[index][0]); // generic answers
				else view.$('.textinput-item input').eq(index).val(item._answers[0]); // specific answers
			});
		},

		answerTextInputIncorrectly:function(view) {
			var items = view.model.get('_items'), itemCount = items.length, nIncorrect = _.random(1, itemCount);
			// decide which items to answer incorrectly (minimum one)
			var selectionStates = _.shuffle(_.times(itemCount, function(i) {return i<nIncorrect;}));
			var answers = view.model.get('_answers');
			_.each(items, function(item, index) {
				if (selectionStates[index]) {
					view.$('.textinput-item input').eq(index).val('***4n 1nc0rr3ct 4nsw3r***'); // probably
				}
				else {
					if (answers) view.$('.textinput-item input').eq(index).val(answers[index][0]);
					else view.$('.textinput-item input').eq(index).val(item._answers[0]);
				}
			});
		},

		answerQuestionStrip:function(view) {
			_.each(view.model.get('_items'), function(item, itemIndex) {
				_.each(item._subItems, function(subItem, subItemIndex) {
					if (subItem._isCorrect) view.setStage(itemIndex, subItemIndex, true);
				});
			});
		},

		answerQuestionStripIncorrectly:function(view) {
			var items = view.model.get('_items'), itemCount = items.length, nIncorrect = _.random(1, itemCount);
			// decide which items to answer incorrectly (minimum one)
			var selectionStates = _.shuffle(_.times(itemCount, function(i) {return i<nIncorrect;}));

			_.each(items, function(item, itemIndex) {
				// check if this item is to be answered incorrectly
				if (selectionStates[itemIndex]) {
					// start at a random position in subitems to avoid bias (err is contingency for bad data)
					for (var count=item._subItems.length, i=_.random(count), err=count; err>=0; i++, err--)
						if (!item._subItems[i%count]._isCorrect) {
							view.setStage(itemIndex, i%count, true);
							return;
						}
				}
				else {
					_.each(item._subItems, function(subItem, subItemIndex) {
						if (subItem._isCorrect) view.setStage(itemIndex, subItemIndex, true);
					});
				}
			});
		},

		answerUnsupported:function(view) {
			var model = view.model;

			model.set({"_isComplete":true, "_isInteractionComplete":true, "_isCorrect":true, "_isSubmitted":true, "_score":1});
			model.set("_attemptsLeft", Math.max(0, model.get("_attempts") - 1));
		},

		answerUnsupportedIncorrectly:function(view) {
			var model = view.model;
			
			model.set({"_isComplete":true, "_isInteractionComplete":true, "_isCorrect":false, "_isSubmitted":true, "_score":0});
			model.set("_attemptsLeft", Math.max(0, model.get("_attempts") - 1));
		}
	}, Backbone.Events);
	
	Adapt.on('app:dataReady devtools:enable', function() {
		if (!Adapt.devtools.get('_isEnabled')) return;

		AutoAnswer.initialize();
	});

	return AutoAnswer;
});

define('extensions/adapt-devtools/js/pass-half-fail',['require','coreJS/adapt','./auto-answer'],function(require) {

	var Adapt = require('coreJS/adapt');
	var AutoAnswer = require('./auto-answer');

	var PassHalfFail = _.extend({
		initialize:function() {
			this._questionViews = [];
			this._currentPageId = null;
			this.listenTo(Adapt, 'pageView:preRender', this.onPagePreRender);
			this.listenTo(Adapt, 'remove', this.onRemove);
		},

		_completeNonQuestions:function() {
			var currentModel = Adapt.findById(Adapt.location._currentId);
			var nonQuestions = currentModel.findDescendants("components").filter(function(m) {return m.get('_isQuestionType') !== true;});

			_.each(nonQuestions, function(item) {
				item.set("_isComplete", true);
				item.set("_isInteractionComplete", true);
			});
		},

		pass:function(callback) {
			var i = 0, qs = this._questionViews, len = qs.length;

			//this._completeNonQuestions();

			// async to avoid locking up the interface
			function step() {
				for (var j=0, count=Math.min(2, len-i); j < count; i++, j++) {
					AutoAnswer.answer(qs[i]);
					if (!qs[i].model.get('_isSubmitted')) qs[i].$('.buttons-action').trigger('click');
				}
				i == len ? callback() : setTimeout(step);
			}

			step();
		},

		half:function(callback) {
			var notSubmitted = function(view) {return !view.model.get('_isSubmitted')};
			var qs = _.shuffle(_.filter(this._questionViews, notSubmitted));
			var i = 0, len = qs.length;

			//this._completeNonQuestions();

			// async to avoid locking up the interface
			function step() {
				for (var j=0, count=Math.min(2, len-i); j < count; i++, j++) {
					AutoAnswer.answer(qs[i], i % 2 == 0);
					if (!qs[i].model.get('_isSubmitted')) qs[i].$('.buttons-action').trigger('click');
				}
				i == len ? callback() : setTimeout(step);
			}

			step();
		},

		fail:function(callback) {
			var i = 0, qs = this._questionViews, len = qs.length;

			//this._completeNonQuestions();

			// async to avoid locking up the interface
			function step() {
				for (var j=0, count=Math.min(2, len-i); j < count; i++, j++) {
					AutoAnswer.answer(qs[i], true);
					if (!qs[i].model.get('_isSubmitted')) qs[i].$('.buttons-action').trigger('click');
				}
				i == len ? callback() : setTimeout(step);
			}

			step();
		},

		onPagePreRender:function(view) {
			this._currentPageId = view.model.get('_id');
			this.listenTo(Adapt, 'componentView:postRender', this.onComponentRendered);
		},

		onRemove:function() {
			this.stopListening(Adapt, 'componentView:postRender', this.onComponentRendered);
			this._questionViews = [];
		},

		onComponentRendered:function(view) {
			// check component is part of current page
			if (view.model.has('_parentId') && view.model.findAncestor('contentObjects').get('_id') == this._currentPageId) {
				if (view.model.get('_isQuestionType')) {
					this._questionViews.push(view);
				}
			}
		}
	}, Backbone.Events);

	Adapt.on('app:dataReady devtools:enable', function() {
		if (!Adapt.devtools.get('_isEnabled')) return;

		PassHalfFail.initialize();
	});

	return PassHalfFail;
});

define('extensions/adapt-devtools/js/toggle-banking',['require','coreJS/adapt','coreJS/router'],function(require) {

	var Adapt = require('coreJS/adapt');
	var Router = require('coreJS/router');

	var ToggleBanking = {

		initialize:function() {
			Adapt.articles.each(function(m) {
				var config = this.getConfig(m);
				if (m.has('_assessment') && m.get('_assessment')._banks && !m.get('_assessment')._banks._isEnabled) {
					config._assessmentBankDisabled = true;
				}
			}, this);
		},

		getConfig:function(articleModel) {
			if (!articleModel.has('_devtools')) articleModel.set('_devtools', {});
			return articleModel.get('_devtools');
		},

		getBankedAssessmentsInCurrentPage:function() {
			var pageModel = Adapt.findById(Adapt.location._currentId);
			var f = function(m) {
				config = this.getConfig(m);
				if (!config._assessmentBankDisabled &&
					m.has('_assessment') &&
					m.get('_assessment')._isEnabled &&
					m.get('_assessment')._banks._split.length > 1) return true;

				return false;
			};

			return Adapt.location._contentType == 'menu' ? [] : pageModel.findDescendants('articles').filter(f, this);
		},

		toggle:function() {
			var bankedAssessments = this.getBankedAssessmentsInCurrentPage();
			var isBankingEnabled = function(m) {return m.get('_assessment')._banks._isEnabled;};
			var enable = !bankedAssessments.some(isBankingEnabled);

			_.each(bankedAssessments, function(articleModel) {
				articleModel.get('_assessment')._banks._isEnabled = enable;
				// set properties to trigger setup of assessment data
				articleModel.set({'_attemptInProgress':false, '_isPass':false});
			});

			// reload page
			Router.handleId(Adapt.location._currentId);
		}
	};

	Adapt.once('adapt:initialize devtools:enable', function() {
		if (!Adapt.devtools.get('_isEnabled')) return;

		ToggleBanking.initialize();
	});

	return ToggleBanking;
});

define('extensions/adapt-devtools/js/map',['require','coreJS/adapt','coreJS/router'],function(require) {

	var Adapt = require('coreJS/adapt');
	var Router = require('coreJS/router');

	var MapView = Backbone.View.extend({
		events: {
			'click a':'onLinkClicked'
		},

		initialize: function() {
			this.$('html').addClass('devtools-map');
			this._renderIntervalId = setInterval(_.bind(this._checkRenderInterval, this), 500);
			this.listenTo(Adapt.components, 'change:_isComplete', this.onModelCompletionChanged);
			this.listenTo(Adapt.blocks, 'change:_isComplete', this.onModelCompletionChanged);
			this.listenTo(Adapt.articles, 'change:_isComplete', this.onModelCompletionChanged);
			this.listenTo(Adapt.contentObjects, 'change:_isComplete', this.onModelCompletionChanged);
			this.render();
		},

		render: function() {
			var config = Adapt.devtools;
            var data = this.model;
            var startTime = new Date().getTime();

            var template = Handlebars.templates['devtoolsMap'];
            this.$('body').addClass(config.has('_theme') ? config.get('_theme') : 'theme-light');
            this.$('body').html(template(data));

            //console.log('adapt-devtools: map rendered in ' + ((new Date().getTime())-startTime) + ' ms');
		},

		remove: function() {
			clearInterval(this._renderIntervalId);
            this.$('body').html('Course closed!');
            this.stopListening();
            return this;
        },

		_checkRenderInterval:function() {
			if (this._invalid) {
				this._invalid = false;
				this.render();
			}
		},

		_getConfig:function(pageModel) {
			if (!pageModel.has('_devtools')) pageModel.set('_devtools', {});
			return pageModel.get('_devtools');
		},

		_disablePageIncompletePrompt:function(pageModel) {
			var config = this._getConfig(pageModel);

			if (pageModel.has('_pageIncompletePrompt')) {
				config._pageIncompletePromptExists = true;
				if (pageModel.get('_pageIncompletePrompt').hasOwnProperty('_isEnabled')) {
					config._pageIncompletePromptEnabled = pageModel.get('_pageIncompletePrompt')._isEnabled;
				}
			}
			else {
				config._pageIncompletePromptExists = false;
				pageModel.set('_pageIncompletePrompt', {});
			}

			pageModel.get('_pageIncompletePrompt')._isEnabled = false;
		},

		_restorePageIncompletePrompt:function(pageModel) {
			var config = this._getConfig(pageModel);

			if (config._pageIncompletePromptExists) {
				if (config.hasOwnProperty('_pageIncompletePromptEnabled')) pageModel.get('_pageIncompletePrompt')._isEnabled = config._pageIncompletePromptEnabled;
				else delete pageModel.get('_pageIncompletePrompt')._isEnabled;
			}
			else {
				pageModel.unset('_pageIncompletePrompt');
			}
			delete config._pageIncompletePromptExists;
			delete config._pageIncompletePromptEnabled;
		},

		onModelCompletionChanged:function() {
			this.invalidate();
		},

		onLinkClicked:function(e) {
			var $target = $(e.currentTarget);
			var id = $target.attr("href").slice(1);
			var model = Adapt.findById(id);

			e.preventDefault();
			
			if (e.ctrlKey && this.el.defaultView) {
				id = id.replace(/-/g, '');
				this.el.defaultView[id] = model;
				this.el.defaultView.console.log('devtools: add property window.'+id+':');
				this.el.defaultView.console.log(model);
			}
			else if (e.shiftKey) {
				this.navigateAndDisableTrickle(id);
			}
			else {
				this.navigateAndDisableTrickleUpTo(id);
			}
		},

		invalidate:function() {
			this._invalid = true;
		},

		/**
		* Navigate to the element with the given id (or as closely to it as possible). Disable trickle up to the given id.
		* N.B. because trickle cannot be reliably manipulated in situ we must reload the page. Trickle remains disabled on
		* affected article(s)|block(s).
		*/
		navigateAndDisableTrickleUpTo:function(id) {
			var model = Adapt.findById(id);
			var pageModel = Adapt.findById(Adapt.location._currentId);

			// first ensure page incomplete prompt won't activate
			this._disablePageIncompletePrompt(pageModel);

			// now navigate

			if (model._siblings == 'contentObjects') {
				Backbone.history.navigate("#/id/"+id, {trigger:true});
			}
			else {
				var level = model.get('_type') == 'component' ? model.getParent() : model;
				var siblings = level.getParent().getChildren(), sibling = null;
				// disable trickle on all preceeding article(s)|block(s)
				for (var i=0, count=siblings.indexOf(level); i < count; i++) {
					sibling = siblings.at(i);
					console.log('disabling trickle on '+sibling.get('_id'));
					if (sibling.has('_trickle')) {
						sibling.get('_trickle')._isEnabled = false;
					}
					else {
						sibling.set('_trickle', {_isEnabled:false});
					}
				}
				// check if already on page
				if (Adapt.location._currentId == model.findAncestor('contentObjects').get('_id')) {
					this.listenToOnce(Adapt, 'pageView:ready', function(view) {
						_.defer(_.bind(function() {
							Adapt.scrollTo($('.'+id));
							this.checkVisibility(id);
						}, this));
					});
					if (Adapt.location._currentId == Adapt.course.get('_id')) Router.handleRoute ? Router.handleRoute() : Router.handleCourse();
					else Router.handleId(Adapt.location._currentId);
				}
				else {
					this.listenToOnce(Adapt, 'pageView:ready', function() {
						_.defer(_.bind(function() {
							this.checkVisibility(id);
						}, this));
					});
					Backbone.history.navigate("#/id/"+id, {trigger:true});
				}
			}

			// restore pageIncompletePrompt config
			this._restorePageIncompletePrompt(pageModel);

			this.invalidate();
		},

		/**
		* Navigate to the element with the given id (or as closely to it as possible). Disable trickle on containing
		* page temporarily.
		*/
		navigateAndDisableTrickle:function(id) {
			var model = Adapt.findById(id);
			var pageModel = Adapt.findById(Adapt.location._currentId);

			// first ensure page incomplete prompt won't activate
			this._disablePageIncompletePrompt(pageModel);

			if (model._siblings == 'contentObjects') {
				Backbone.history.navigate("#/id/"+id, {trigger:true});
			}
			else {
				// if already on page ensure trickle is disabled
				if (Adapt.location._currentId == model.findAncestor('contentObjects').get('_id')) {
					Adapt.devtools.set('_trickleEnabled', false);
					Adapt.scrollTo($('.'+id));
					this.checkVisibility(id);
				}
				else {
					// pick target model to determine trickle config according to trickle version (2.1 or 2.0.x)
					var targetModel = Adapt.trickle ? model.findAncestor('contentObjects') : Adapt.course;
					
					// if necessary disable trickle (until page is ready)
					if (!targetModel.has('_trickle')) {
						targetModel.set('_trickle', {_isEnabled:false});
						this.listenToOnce(Adapt, 'pageView:ready', function() {
							_.defer(_.bind(function() {
								targetModel.get('_trickle')._isEnabled = true;
								this.checkVisibility(id);
							}, this));
						});
					}
					else if (targetModel.get('_trickle')._isEnabled) {
						targetModel.get('_trickle')._isEnabled = false;
						this.listenToOnce(Adapt, 'pageView:ready', function() {
							_.defer(_.bind(function() {
								targetModel.get('_trickle')._isEnabled = true;
								this.checkVisibility(id);
							}, this));
						});
					}

					Backbone.history.navigate("#/id/"+id, {trigger:true});
				}
			}

			// restore pageIncompletePrompt config
			this._restorePageIncompletePrompt(pageModel);

			this.invalidate();
		},

		checkVisibility:function(id) {
			var model = Adapt.findById(id);
			if ($('.'+id).is(':visible') || model == Adapt.course) return;

			while (!$('.'+id).is(':visible') && model != Adapt.course) {
				model = model.getParent();
				id = model.get('_id');
			}
			console.log('adapt-devtools::checkVisibility scrolling to ancestor '+id);
			Adapt.scrollTo($('.'+id));
		}
	});

	var Map = _.extend({
		initialize: function() {
			this.listenTo(Adapt, 'devtools:mapLoaded', this.onMapLoaded);
			$(window).on('unload', _.bind(this.onCourseClosed, this));

			function isMenu(options) {
				if (this.get('_type') !== 'page') {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
			}

			function eachChild(options) {
			    var ret = "";
			    var children = this.get('_children').models;
			    
			    for (var i = 0, j = children.length; i < j; i++) {
			        ret = ret + options.fn(children[i], {data:{index:i,first:i==0,last:i===j-1}});
			    }

			    return ret;
			}

			function getProp(prop, options) {
				return this.get(prop);
			}

			function isStringEmpty(str) {
				return !str || (str.trim && str.trim().length == 0) || ($.trim(str).length == 0)
			}

			function getTitle(options) {
				var t = this.get('displayTitle');
				if (isStringEmpty(t)) t = this.get('title');
				if (isStringEmpty(t)) t = this.get('_id');
				return t;
			}

			function when(prop, options) {
				if (this.get(prop)) {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
			}

			function isTrickled(options) {
				var trickleConfig = this.get('_trickle');
				var trickled = false;
				var isBlock = this.get('_type') == 'block';

				if (trickleConfig) trickled = (isBlock || trickleConfig._onChildren !== true) && trickleConfig._isEnabled;
				else if (isBlock) {
					trickleConfig = this.getParent().get('_trickle');
					if (trickleConfig) trickled = trickleConfig._onChildren && trickleConfig._isEnabled;
				}

				if (trickled) {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
			}

			Handlebars.registerHelper('isMenu', isMenu);
			Handlebars.registerHelper('eachChild', eachChild);
			Handlebars.registerHelper('getProp', getProp);
			Handlebars.registerHelper('getTitle', getTitle);
			Handlebars.registerHelper('when', when);
			Handlebars.registerHelper('isTrickled', isTrickled);
		},

		open:function() {
			if (!this.mapWindow) {
				this.mapWindow = window.open('assets/map.html', 'Map');
			}
			else {
				this.mapWindow.focus();
			}
		},

		onMapClosed: function() {
			console.log('onMapClosed');
			this.mapWindow = null;
		},

		onMapLoaded: function(mapWindow) {
			console.log('onMapLoaded');
			this.mapWindow = mapWindow;
			this.mapWindow.focus();
			$('html', this.mapWindow.document).addClass($('html', window.document).attr('class'));
			this.mapView = new MapView({model:Adapt, el:this.mapWindow.document});
			$(this.mapWindow).on('unload', _.bind(this.onMapClosed, this));
        },

        onCourseClosed:function() {
        	if (this.mapView) {
        		this.mapView.remove();
        		//this.mapWindow.close();
        	}
        }
	}, Backbone.Events);

	Adapt.once('adapt:initialize devtools:enable', function() {
		if (!Adapt.devtools.get('_isEnabled')) return;

		Map.initialize();
	});

	return Map;
});

define('extensions/adapt-devtools/js/utils',['require','coreJS/adapt','coreModels/adaptModel','coreViews/questionView'],function(require) {

	var Adapt = require('coreJS/adapt');
	var AdaptModel = require('coreModels/adaptModel');
	var QuestionView = require('coreViews/questionView');
	
	// control-click to access Adapt model
	function onDocumentClicked(e) {
		if (e.ctrlKey) {
			var $target = $(e.target);

			function getModel($el, t) {
				if ($el.length == 0) return false; 
				var re = new RegExp('[\\s]+('+t+'\\-[^\\s]+)');
				var id = re.exec($el.attr('class'))[1];
				var model = id.slice(t.length+1) == Adapt.course.get('_id') ? Adapt.course : Adapt.findById(id);
				if (model) {
					id = model.get('_id').replace(/-/g, '');
					window[id] = model;
					console.log('devtools: add property window.'+id+':');
					console.log(model);
				}
				return true;
			}
			
			if (getModel($target.parents('.component'), 'c')) return;
			if (getModel($target.parents('.block'), 'b')) return;
			if (getModel($target.parents('.article'), 'a')) return;
			if (getModel($target.parents('.page'), 'co')) return;
			if (getModel($target.parents('.menu'), 'menu')) return;
		}
	}

	function getAdaptCoreVersion() {
		try {
			if (typeof AdaptModel.prototype.setCompletionStatus == 'function') return ">=v2.0.10";
			if (typeof AdaptModel.prototype.checkLocking == 'function') return "v2.0.9";
			if (typeof Adapt.checkingCompletion == 'function') return "v2.0.8";
			if (typeof AdaptModel.prototype.getParents == 'function') return "v2.0.7";
			if ($.a11y && $.a11y.options.hasOwnProperty('isIOSFixesEnabled')) return "v2.0.5-v2.0.6";
			if (Adapt instanceof Backbone.Model) return "v2.0.4";
			if (typeof QuestionView.prototype.recordInteraction == 'function') return "v2.0.2-v2.0.3";
			if (typeof Adapt.findById == 'function') return "v2.0.0-v2.0.1";
			return "v1.x";
		}
		catch (e) {
			return 'unknown version';
		}
	}

	Adapt.once('adapt:initialize', function() {
		var str = 'Version of Adapt core detected: '+getAdaptCoreVersion();
		var horz = getHorzLine();

		console.log(horz+'\nVersion of Adapt core detected: '+getAdaptCoreVersion()+'\n'+horz);

		function getHorzLine() {
			for (var s='', i=0, c=str.length; i<c; i++) s+='*';
			return s;
		}
	});

	Adapt.once('adapt:initialize devtools:enable', function() {
		if (!Adapt.devtools.get('_isEnabled')) return;

		$(document).on('click', onDocumentClicked);

		// useful for command-line debugging
		if (!window.a) window.a = Adapt;
	});
});

define('extensions/adapt-devtools/js/end-trickle',['require','coreJS/adapt'],function(require) {

	var Adapt = require('coreJS/adapt');

	function onTrickleBegun() {
		if (!Adapt.devtools.get('_trickleEnabled')) {
			console.log('Trickle started');
			Adapt.devtools.set('_trickleEnabled', true);
			// listen for user request to end trickle
			Adapt.devtools.once('change:_trickleEnabled', onTrickleChange);
		}
	}

	function onTrickleEnded() {
		console.log('Trickle ended');
		Adapt.devtools.off('change:_trickleEnabled', onTrickleChange);
		Adapt.devtools.set('_trickleEnabled', false);
	}

	function onTrickleChange() {
		if (!Adapt.devtools.get('_trickleEnabled')) {
			// user triggered
			Adapt.trigger('trickle:kill');
		}
	}

	function remove() {
		if (Adapt.devtools.get('_trickleEnabled')) {
			onTrickleEnded();
		}
	}

	Adapt.once('adapt:initialize devtools:enable', function() {
		if (!Adapt.devtools.get('_isEnabled')) return;

		Adapt.on('trickle:interactionInitialize trickle:started', onTrickleBegun);
		Adapt.on('trickle:kill trickle:finished', onTrickleEnded);
		Adapt.on('remove', remove);
	});
});

define('extensions/adapt-devtools/js/toggle-feedback',['require','coreJS/adapt'],function(require) {

	var Adapt = require('coreJS/adapt');

	function onShowFeedback() {
		// trickle waits for tutor to close so pretend that this happens
		//Adapt.trigger('tutor:opened'); trickle-tutorPlugin doesn't actually listen to this(!)
		Adapt.trigger('tutor:closed');
	}

	function hushTutor() {
		Adapt.devtools.set('_tutorListener', Adapt._events['questionView:showFeedback'].pop());
		Adapt.on('questionView:showFeedback', onShowFeedback);
	}

	function reinstateTutor() {
		Adapt.off('questionView:showFeedback', onShowFeedback);

		if (!Adapt._events.hasOwnProperty('questionView:showFeedback')) {
			Adapt._events['questionView:showFeedback'] = [];
		}

		Adapt._events['questionView:showFeedback'].push(Adapt.devtools.get('_tutorListener'));
	}

	function onFeedbackToggled() {
		if (Adapt.devtools.get('_feedbackEnabled')) {
			reinstateTutor();
			$(document).off('mouseup', '.buttons-feedback');
		}
		else {
			hushTutor();
			$(document).on('mouseup', '.buttons-feedback', onFeedbackButtonClicked);
		}
	}

	function onFeedbackButtonClicked(e) {
		var classes = $(e.currentTarget).parents('.component').attr('class');
		var componentId = /[\s]+(c\-[^\s]+)/.exec(classes)[1];
		
		if (componentId) {
			// bring tutor back temporarily
			reinstateTutor();
			// tutor expects a view, but it's not actually needed
			Adapt.trigger('questionView:showFeedback', {model:Adapt.findById(componentId)});
			// and hush it again
			hushTutor();
		}
		else console.error('devtools:onFeedbackButtonClicked: malformed component class name');
	}
	
	Adapt.once('adapt:initialize devtools:enable', function() {
		if (!Adapt.devtools.get('_isEnabled')) return;

		if (Adapt.devtools.get('_toggleFeedbackAvailable')) {
			// assume single registrant is adapt-contrib-tutor
			if (Adapt._events.hasOwnProperty('questionView:showFeedback') && Adapt._events['questionView:showFeedback'].length == 1) {
				Adapt.devtools.on('change:_feedbackEnabled', onFeedbackToggled);
			}
			else {
				console.warn('devtools: no tutor or multiple registrants of questionView:showFeedback so disabling ability to toggle feedback.');
				Adapt.devtools.set('_toggleFeedbackAvailable', false);
			}
		}
	});
});

define('extensions/adapt-devtools/js/toggle-alt-text',['require','coreJS/adapt'],function(require) {

	var Adapt = require('coreJS/adapt');

	var AltText = _.extend({

		initialize:function() {
			this.listenTo(Adapt.devtools, 'change:_altTextEnabled', this.toggleAltText);

			// if available we can use to avoid unnecessary checks
			if (typeof MutationObserver == 'function') {
				this.observer = new MutationObserver(_.bind(this.onDomMutation, this));
			}
		},

		addTimer:function(fireNow) {
			this.timerId = setInterval(_.bind(this.onTimer, this), 1000);
			if (fireNow) this.onTimer();
		},

		removeTimer:function() {
			clearInterval(this.timerId);
		},

		connectObserver:function() {
			if (this.observer) this.observer.observe(document.getElementById('wrapper'), {
				childList: true,
				subtree:true,
				attributes:true,
				attributeFilter:['class', 'style']
			});
		},

		disconnectObserver:function() {
			if (this.observer) this.observer.disconnect();
		},

		toggleAltText:function() {
			if (Adapt.devtools.get('_altTextEnabled')) {
				this.addTimer(true);
				this.connectObserver();
			}
			else {
				this.removeTimer();
				this.removeAllAnnotations();
				this.disconnectObserver();
			}
		},

		addAnnotation:function($img, $annotation) {
			var template = Handlebars.templates['devtoolsAnnotation'];
			var text = $img.attr('alt');

			if (!text) text = $img.attr('aria-label');
			
			var $annotation = $(template({text:text}));

			if (!text) $annotation.addClass('devtools-annotation-warning');

			$img.after($annotation);
			$img.data('annotation', $annotation);

			this.updateAnnotation($img, $annotation);
		},

		removeAnnotation:function($img, $annotation) {
			$annotation.remove();
			$img.removeData('annotation');
		},

		removeAllAnnotations:function() {
			$('img').each(_.bind(function(index, element) {
				var $img = $(element);
				var $annotation = $img.data('annotation');

				if ($annotation) this.removeAnnotation($img, $annotation);
			}, this));
		},

		updateAnnotation:function($img, $annotation) {
			var position = $img.position();
			position.left += parseInt($img.css('marginLeft'), 10) + parseInt($img.css('paddingLeft'), 10);
			position.top += parseInt($img.css('marginTop'), 10) + parseInt($img.css('paddingTop'), 10);
			$annotation.css(position);
		},

		onDomMutation:function(mutations) {
			this.mutated = true;
		},

		onTimer:function() {
			if (this.mutated === false) return;
			if (this.observer) this.mutated = false;

			//console.log('devtools::toggle-alt-text:run check');

			this.disconnectObserver();

			$('img').each(_.bind(function(index, element) {
				var $img = $(element);
				var $annotation = $img.data('annotation');
				var isVisible = $img.is(':visible');

				if (isVisible) {
					if (!$annotation) this.addAnnotation($img, $annotation);
					else this.updateAnnotation($img, $annotation);
				}
				else if ($annotation) {
					this.removeAnnotation($img, $annotation);
				}
			}, this));

			this.connectObserver();
		}
	}, Backbone.Events);

	Adapt.once('adapt:initialize devtools:enable', function() {
		if (!Adapt.devtools.get('_isEnabled')) return;

		AltText.initialize();
	});

	return AltText;
});
define('extensions/adapt-devtools/js/unlock',['require','coreJS/adapt','coreJS/router'],function(require) {

	var Adapt = require('coreJS/adapt');
	var Router = require('coreJS/router');

	function breakCoreLocking() {
		Adapt.course.unset('_lockType');

		breakLocks(Adapt.contentObjects);
		breakLocks(Adapt.articles);
		breakLocks(Adapt.blocks);

		function breakLocks(collection) {
			collection.each(function(model) {
				model.unset('_lockType');
				model.unset('_isLocked');
			});
		}
	}

	function onUnlocked() {
		if (Adapt.devtools.get('_unlocked')) {
			breakCoreLocking();
			// reload the page/menu
			if (Adapt.location._currentId == Adapt.course.get('_id')) Router.handleRoute ? Router.handleRoute() : Router.handleCourse();
			else Router.handleId(Adapt.location._currentId);
		}
	}

	// menu unlock legacy (for courses authored prior to v2.0.9 or which otherwise do not use core locking)
	function onMenuPreRender(view) {
		if (Adapt.devtools.get('_unlocked')) {
			if (Adapt.location._currentId == view.model.get('_id')) {
				view.model.once('change:_isReady', _.bind(onMenuReady, view));
				view.model.getChildren().each(function(item) {
					// first pass: attempt to manipulate commonly employed locking mechanisms
					if (item.has('_lock')) item.set('_lock', item.get('_lock').length > -1 ? [] : false);
					if (item._lock) item._lock = item._lock.length > -1 ? [] : false;
					if (item._locked === true) item._locked = false;
					if (item._isLocked === true) item._isLocked = false;
				});
			}
		}
	}

	// menu unlock legacy (for courses authored prior to v2.0.9 or which otherwise do not use core locking)
	function onMenuReady() {
		if (Adapt.devtools.get('_unlocked')) {
			// second pass: attempt to enable clickable elements
			this.$('a, button').prop('disabled', false).css('pointer-events', 'auto');
		}
	}

	Adapt.once('adapt:initialize devtools:enable', function() {
		if (!Adapt.devtools.get('_isEnabled')) return;

		if (Adapt.devtools.get('_unlockAvailable')) {
			Adapt.devtools.on('change:_unlocked', onUnlocked);
			Adapt.on('menuView:preRender', onMenuPreRender);
		}
	});
});

define('extensions/adapt-devtools/js/enable',['require','coreJS/adapt','coreJS/router'],function(require) {

	var Adapt = require('coreJS/adapt');
	var Router = require('coreJS/router');

	var buffer = '';
	var isMouseDown = false;

	function onKeypress(e) {
		var c = String.fromCharCode(e.which).toLowerCase();
		buffer += c;
		if (isMouseDown && c == '5' && !Adapt.devtools.get('_isEnabled')) enable();
		else processBuffer();
	}

	function onMouseDown() {
		isMouseDown = true;
	}

	function onMouseUp() {
		isMouseDown = false;
	}
	
	function processBuffer() {
		var blen = buffer.length;
		if (blen > 100) buffer = buffer.substr(1,100);
		blen = buffer.length;

		if (buffer.substr( blen - ("kcheat").length, ("kcheat").length  ) == "kcheat") {
			if (!Adapt.devtools.get('_isEnabled')) enable();
		}
	}

	function enable() {
		removeHooks();
		Adapt.devtools.set('_isEnabled', true);
		Adapt.trigger('devtools:enable');

		// reload the menu/page
		if (Adapt.location._currentId == Adapt.course.get('_id')) Router.handleRoute ? Router.handleRoute() : Router.handleCourse();
		else Router.handleId(Adapt.location._currentId);
	}

	function addHooks() {
		$(window).on("keypress", onKeypress);
		$(window).on("mousedown", onMouseDown);
		$(window).on("mouseup", onMouseUp);

		window.kcheat = function() {
			buffer = "kcheat";
			processBuffer();
		};

		Router.route('kcheat', 'kcheat', function() {
			if (window.kcheat) window.kcheat();
		});
	}

	function removeHooks() {
		$(window).off("keypress", onKeypress);
		$(window).off("mousedown", onMouseDown);
		$(window).off("mouseup", onMouseUp);
		window.kcheat = undefined;
	}

	Adapt.once('adapt:initialize', function() {
		if (Adapt.devtools.get('_isEnabled')) return;

		// some plugins (e.g. bookmarking) will manipulate the router so defer the call
		_.defer(function () {addHooks();});
	});
});

/*
* adapt-devtools
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Chris Steele <chris.steele@kineo.com>, Oliver Foster <oliver.foster@kineo.com>
*/

define('extensions/adapt-devtools/js/adapt-devtools',[
	'coreJS/adapt',
	'coreModels/adaptModel',
	'./devtools-model',
	'./pass-half-fail',
	'./toggle-banking',
	'./map',
	'./auto-answer',
	'./utils',
	'./end-trickle',
	'./hinting',
	'./toggle-feedback',
	'./toggle-alt-text',
	'./unlock',
	'./enable'
], function(Adapt, AdaptModel, DevtoolsModel, PassHalfFail, ToggleBanking, Map) {

	var DevtoolsView = Backbone.View.extend({

		className:'devtools',

		events:{
			'click .end-trickle':'onEndTrickle',
			'change .hinting input':'onToggleHinting',
			'change .banking input':'onToggleBanking',
			'change .feedback input':'onToggleFeedback',
			'change .auto-correct input':'onToggleAutoCorrect',
			'change .alt-text input':'onToggleAltText',
			'click .unlock':'onUnlock',
			'click .open-map':'onOpenMap',
			'click .complete-page':'onCompletePage',
			'click .pass':'onPassHalfFail',
			'click .half':'onPassHalfFail',
			'click .fail':'onPassHalfFail'
		},

		initialize:function() {
			this.render();

			this._checkUnlockVisibility();
			this._checkTrickleEndVisibility();
			this._checkBankingVisibility();
			this._checkFeedbackVisibility();
			this._checkHintingVisibility();
			this._checkAutoCorrectVisibility();
			this._checkAltTextVisibility();
			this._checkPassHalfFailVisibility();
			this._checkCompletePageVisibility();
		},

		render:function() {
			var data = Adapt.devtools.toJSON();
			var template = Handlebars.templates['devtools'];
            this.$el.html(template(data));
			return this;
		},

		/*************************************************/
		/********************* UNLOCK ********************/
		/*************************************************/

		_checkUnlockVisibility:function() {
			// check if function available and not already activated
			if (!Adapt.devtools.get('_unlockAvailable') || Adapt.devtools.get('_unlocked')) this.$('.unlock').addClass('display-none');
			else this.$('.unlock').toggleClass('display-none', !this._checkForLocks());
		},

		_checkForLocks:function() {
			if (typeof AdaptModel.prototype.checkLocking != 'function') return Adapt.location._contentType == 'menu';

			var hasLock = function(model) {return model.has('_lockType');};

			if (hasLock(Adapt.course)) return true;
			if (Adapt.contentObjects.some(hasLock)) return true;
			if (Adapt.articles.some(hasLock)) return true;
			if (Adapt.blocks.some(hasLock)) return true;

			return false;
		},

		onUnlock:function() {
			Adapt.devtools.set('_unlocked', true);
			this._checkUnlockVisibility();
		},

		/*************************************************/
		/********************** MAP **********************/
		/*************************************************/

		onOpenMap:function() {
			Map.open();
			Adapt.trigger('drawer:closeDrawer');
		},

		/*************************************************/
		/******************** TRICKLE ********************/
		/*************************************************/

		_checkTrickleEndVisibility:function() {
			this.$('.end-trickle').toggleClass('display-none', !Adapt.devtools.get('_trickleEnabled'));
		},

		onEndTrickle:function() {
			Adapt.devtools.set('_trickleEnabled', false);
			this._checkTrickleEndVisibility();
		},

		/*************************************************/
		/*************** QUESTION BANKING ****************/
		/*************************************************/

		_checkBankingVisibility:function() {
			if (!Adapt.devtools.get('_toggleFeedbackAvailable')) {
				this.$('.banking').addClass('display-none');
				return;
			}

			var bankedAssessments = ToggleBanking.getBankedAssessmentsInCurrentPage();
			var isBankingEnabled = function(m) {return m.get('_assessment')._banks._isEnabled;};

			if (bankedAssessments.length > 0) {
				this.$('.banking').removeClass('display-none');
				this.$('.banking label').toggleClass('selected', bankedAssessments.some(isBankingEnabled));
			}
			else {
				this.$('.banking').addClass('display-none');
			}
		},

		onToggleBanking:function() {
			ToggleBanking.toggle();
			this._checkBankingVisibility();
		},

		/*************************************************/
		/*********** QUESTION FEEDBACK (TUTOR) ***********/
		/*************************************************/

		_checkFeedbackVisibility:function() {
			if (Adapt.devtools.get('_toggleFeedbackAvailable')) {
				this.$('.feedback').removeClass('display-none');
				this.$('.feedback label').toggleClass('selected', Adapt.devtools.get('_feedbackEnabled'));
			}
			else {
				this.$('.feedback').addClass('display-none');
			}
		},

		onToggleFeedback:function() {
			Adapt.devtools.toggleFeedback();
			this._checkFeedbackVisibility();
		},

		/*************************************************/
		/*************** QUESTION HINTING ****************/
		/*************************************************/

		_checkHintingVisibility:function() {
			if (Adapt.devtools.get('_hintingAvailable')) {
				this.$('.hinting').removeClass('display-none');
				this.$('.hinting label').toggleClass('selected', Adapt.devtools.get('_hintingEnabled'));
			}
			else {
				this.$('.hinting').addClass('display-none');
			}
		},

		onToggleHinting:function() {
			Adapt.devtools.toggleHinting();
			this._checkHintingVisibility();
		},

		/*************************************************/
		/***************** AUTO CORRECT ******************/
		/*************************************************/

		_checkAutoCorrectVisibility:function() {
			if (Adapt.devtools.get('_autoCorrectAvailable')) {
				this.$('.toggle.auto-correct').removeClass('display-none');
				this.$('.toggle.auto-correct label').toggleClass('selected', Adapt.devtools.get('_autoCorrectEnabled'));
				this.$('.tip.auto-correct').toggleClass('display-none', Adapt.devtools.get('_autoCorrectEnabled'));
			}
			else {
				this.$('.auto-correct').addClass('display-none');
			}
		},

		onToggleAutoCorrect:function() {
			Adapt.devtools.toggleAutoCorrect();
			this._checkAutoCorrectVisibility();
		},

		/*************************************************/
		/******************* ALT TEXT ********************/
		/*************************************************/

		_checkAltTextVisibility:function() {
			if (Adapt.devtools.get('_altTextAvailable')) {
				this.$('.toggle.alt-text').removeClass('display-none');
				this.$('.toggle.alt-text label').toggleClass('selected', Adapt.devtools.get('_altTextEnabled'));
				this.$('.tip.alt-text').toggleClass('display-none', Adapt.devtools.get('_altTextEnabled'));
			}
			else {
				this.$('.alt-text').addClass('display-none');
			}
		},

		onToggleAltText:function() {
			Adapt.devtools.toggleAltText();
			this._checkAltTextVisibility();
		},

		/*************************************************/
		/***************** COMPLETE PAGE *****************/
		/*************************************************/

		_checkCompletePageVisibility:function() {
			var currentModel = Adapt.findById(Adapt.location._currentId);

			if (currentModel.get('_type') != 'page') {
				this.$('.complete-page').addClass('display-none');
				return;
			}

			var cond = currentModel.has('_isInteractionsComplete') ? {'_isInteractionsComplete':false} : {'_isInteractionComplete':false};
			var incomplete = currentModel.findDescendants('components').where(cond);

			this.$('.complete-page').toggleClass('display-none', incomplete.length == 0);

		},

		onCompletePage:function(e) {
			var currentModel = Adapt.findById(Adapt.location._currentId);

			if (Adapt.devtools.get('_trickleEnabled')) Adapt.trigger("trickle:kill");

			var cond = currentModel.has('_isInteractionsComplete') ? {'_isInteractionsComplete':false} : {'_isInteractionComplete':false};
			var incomplete = currentModel.findDescendants('components').where(cond);

			_.each(incomplete, function(component) {
				if (component.get('_isQuestionType')) {
					component.set("_isCorrect", true);
					component.set("_isSubmitted", true);
					component.set("_score", 1);
					component.set("_attemptsLeft", Math.max(0, component.set("_attempts") - 1));
				}
				
				component.set("_isComplete", true);
				component.set(currentModel.has('_isInteractionsComplete') ? '_isInteractionsComplete' : '_isInteractionComplete', true);
			});

			Adapt.trigger('drawer:closeDrawer');
		},

		/************************************************************/
		/******* Similar to original adapt-cheat functionality ******/
		/************************************************************/

		_checkPassHalfFailVisibility:function() {
			var currentModel = Adapt.findById(Adapt.location._currentId);

			if (currentModel.get('_type') != 'page') {
				this.$('.pass, .half, .fail').addClass('display-none');
				return;
			}

			var unanswered = currentModel.findDescendants('components').where({'_isQuestionType':true, '_isSubmitted':false});
			
			if (unanswered.length == 0)	this.$('.tip.pass-half-fail').html('');
			else this.$('.tip.pass-half-fail').html('With the '+unanswered.length+' unanswered question(s) in this page do the following:');

			this.$('.pass, .half, .fail').toggleClass('display-none', unanswered.length == 0);

		},

		onPassHalfFail:function(e) {
			if (Adapt.devtools.get('_trickleEnabled')) Adapt.trigger("trickle:kill");

			// potentially large operation so show some feedback
			$('.loading').show();

			var tutorEnabled = Adapt.devtools.get('_feedbackEnabled');

			if (tutorEnabled) Adapt.devtools.set('_feedbackEnabled', false);

			if ($(e.currentTarget).hasClass('pass')) PassHalfFail.pass(_.bind(this.onPassHalfFailComplete, this, tutorEnabled));
			else if ($(e.currentTarget).hasClass('half')) PassHalfFail.half(_.bind(this.onPassHalfFailComplete, this, tutorEnabled));
			else PassHalfFail.fail(_.bind(this.onPassHalfFailComplete, this, tutorEnabled));

			Adapt.trigger('drawer:closeDrawer');
		},

		onPassHalfFailComplete:function(tutorEnabled) {
			console.log('onPassHalfFailComplete');

			if (tutorEnabled) Adapt.devtools.set('_feedbackEnabled', true);

			$('.loading').hide();
		}
	});

	var DevtoolsNavigationView = Backbone.View.extend({

		initialize:function() {
			var template = Handlebars.templates.devtoolsNavigation;

			this.$el = $(template());

			$('html').addClass('devtools-enabled');

			if (this.$el.is('a') || this.$el.is('button')) this.$el.on('click', _.bind(this.onDevtoolsClicked, this));
			else this.$el.find('a, button').on('click', _.bind(this.onDevtoolsClicked, this));

			// keep drawer item to left of PLP, resources, close button etc
			this.listenTo(Adapt, 'pageView:postRender menuView:postRender', this.onContentRendered);
		},

		render:function() {
	        $('.navigation-inner').append(this.$el);
			return this;
		},

		deferredRender:function() {
			_.defer(_.bind(this.render, this));
		},

		onContentRendered:function(view) {
			if (view.model.get('_id') == Adapt.location._currentId) {
				this.stopListening(view.model, 'change:_isReady', this.deferredRender);
				this.listenToOnce(view.model, 'change:_isReady', this.deferredRender);
			}
		},

		onDevtoolsClicked:function(event) {
			if(event && event.preventDefault) event.preventDefault();
            Adapt.drawer.triggerCustomView(new DevtoolsView().$el, false);
		}
	});

	Adapt.once('courseModel:dataLoaded', function() {
		Adapt.devtools = new DevtoolsModel();
	});

	Adapt.once('adapt:initialize devtools:enable', function() {
		if (!Adapt.devtools.get('_isEnabled')) return;
		
		new DevtoolsNavigationView();
	});
});

define('extensions/adapt-hint/js/adapt-hint',['require','coreJS/adapt','backbone'],function(require) {

	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');

	var hintExtensionView = Backbone.View.extend({

		events: {
			"click .hint-extension-button": "onSpecButtonClicked"
		},
		
		className: 'hint-extension',

		initialize: function() {
			this.render();
		},

		render: function() {
			var data = this.model.toJSON();
			var template = Handlebars.templates['hint'];

			this.$el.html(template(data)).appendTo($('.' + this.model.get('_id')));
			_.defer(_.bind(this.postRender, this));
		},

		postRender: function() {
			this.setLayout();
			this.listenTo(Adapt, 'remove', this.remove);
			this.listenTo(Adapt, 'hint-extension-widget:open', this.checkIfShouldClose);
		},

		setLayout: function() {
			if (Adapt.config.get('_defaultDirection') == 'rtl' && Adapt.device.screenSize === 'small' ) {
                $('.' + this.model.get('_id') + " .component-title-inner").css({
					paddingLeft: '35px'
				});
            } else {
                $('.' + this.model.get('_id') + " .component-title-inner").css({
					paddingRight: '35px'
				});
            }

			var $specDetail = this.$('.hint-extension-widget');

			$specDetail.velocity({
				scaleX: 0,
				scaleY: 0
			}, {
				duration: 1
			});
		},

		onSpecButtonClicked: function(event) {
			if (event) event.preventDefault();

			var $specDetail = this.$('.hint-extension-widget');

			if (!$specDetail.hasClass('widget-open')) {
				$specDetail.velocity({
					scaleX: 1,
					scaleY: 1
				}, {
					duration: 800,
					display: 'block',
					easing: [500, 35]
				});
				$specDetail.addClass('widget-open');

				this.$('.hint-extension-button').removeClass('icon-light-bulb').addClass('icon-cross');

				Adapt.trigger('hint-extension-widget:open', this.model.get('_id'));
			} else {
				$specDetail.velocity({
					scaleX: 0,
					scaleY: 0
				}, {
					duration: 300,
					display: 'none'
				});
				$specDetail.removeClass('widget-open');

				this.$('.hint-extension-button').removeClass('icon-cross').addClass('icon-light-bulb');
			}
		},

		checkIfShouldClose: function(id) {
			if (this.model.get('_id') !== id) {
				var $widget = $('.' + this.model.get('_id') + " .hint-extension-widget");
				var $button = $('.' + this.model.get('_id') + " .hint-extension-button");

				$widget.velocity({
					scaleX: 0,
					scaleY: 0
				}, {
					duration: 300,
					display: 'none'
				});

				$widget.removeClass('widget-open');
				$button.removeClass('icon-cross').addClass('icon-light-bulb');
			}
		}
	});

	Adapt.on('componentView:postRender', function(view) {
		if (view.model.has('_hint') && view.model.get('_hint').length > 0) {
			new hintExtensionView({
				model: view.model
			});
		}
	});

});

define('extensions/adapt-inspector/js/adapt-inspector',[ "coreJS/adapt" ], function(Adapt) {

	var InspectorView = Backbone.View.extend({

		className: "inspector",

		ids: [],

		initialize: function() {
			this.listenTo(Adapt, {
				"inspector:id": this.pushId,
				"inspector:hover": this.setVisibility,
				"inspector:touch": this.updateInspector,
				"device:resize": this.onResize,
				"remove": this.remove
			}).render();
		},

		events: {
			"mouseleave": "onLeave"
		},

		render: function() {
			$("#wrapper").append(this.$el);
		},

		pushId: function(id) {
			this.ids.push(id);
		},

		setVisibility: function() {
			if ($(".inspector:hover").length) return;

			for (var i = this.ids.length - 1; i >= 0; --i) {
				var $hovered = $("[data-id='" + this.ids[i] + "']:hover");

				if ($hovered.length) return this.updateInspector($hovered);
			}

			$(".inspector-visible").removeClass("inspector-visible");
			this.$el.hide();
		},

		updateInspector: function($hovered) {
			if ($hovered.hasClass("inspector-visible")) return;

			var data = [];

			$(".inspector-visible").removeClass("inspector-visible");
			this.addOverlappedElements($hovered).each(function() {
				var $element = $(this);
				var attributes = $element.data().attributes;

				if (!attributes) return;

				data.push(attributes);
				$element.addClass("inspector-visible");
			});
			this.$el.html(Handlebars.templates.inspector(data)).removeAttr("style");
			this.positionInspector($hovered);
		},

		addOverlappedElements: function($hovered) {
			var checkOverlap = function() {
				var $element = $(this);
				var isOverlapped = $element.height() &&
					_.isEqual($element.offset(), $hovered.offset()) &&
					$element.width() === $hovered.width();

				if (isOverlapped) $hovered = $hovered.add($element);
			};

			for (var i = this.ids.length - 1; i >= 0; --i) {
				$("[data-id='" + this.ids[i] + "']").each(checkOverlap);
			}

			return $hovered;
		},

		positionInspector: function($hovered) {
			var offset = $hovered.offset();
			var inspectorHeight = this.getComputed("height");
			var $arrow = this.$(".inspector-arrow");
			var arrowHeight = $arrow.outerHeight() / 2;
			var inspectorWidth = this.getComputed("width");

			this.$el.css({
				top: offset.top - inspectorHeight - arrowHeight,
				left: offset.left + $hovered.width() / 2 - inspectorWidth / 2,
				minWidth: inspectorWidth,
				minHeight: inspectorHeight + arrowHeight
			});

			$arrow.css("top", Math.floor(inspectorHeight));
		},

		getComputed: function(property) {
			return typeof getComputedStyle !== "undefined" ?
				parseFloat(getComputedStyle(this.$el[0])[property], 10) :
				this.$el[property]();
		},

		onResize: function() {
			var $hovered = $(".inspector-visible");

			if (!$hovered.length) return;

			$hovered.removeClass("inspector-visible");

			if (!Adapt.device.touch) this.setVisibility();
			else this.updateInspector($hovered.last());
		},

		onLeave: function() {
			if (!Adapt.device.touch) this.setVisibility();
		}

	});

	var InspectorContainerView = Backbone.View.extend({

		initialize: function() {
			var id = this.model.get("_id");

			this.listenTo(Adapt, "remove", this.remove).addTracUrl(id);
			this.$el.attr("data-id", id).data(this.model);
			Adapt.trigger("inspector:id", id);
		},

		events: function() {
			return !Adapt.device.touch ?
				{ "mouseenter": "onHover", "mouseleave": "onHover" } :
				{ "touchend": "onTouch" };
		},

		addTracUrl: function(id) {
			var tracUrl = Adapt.config.get("_inspector")._tracUrl;

			if (!tracUrl) return;

			var title = $("<div/>").html(this.model.get("displayTitle")).text();
			var params = id;
			var adaptLocation = Adapt.location;
			var location = adaptLocation._currentId;
			var locationType = adaptLocation._contentType;

			if (title) params += " " + title;
			if (id !== location) params += " (" + locationType + " " + location + ")";

			tracUrl += "/newticket?summary=" + encodeURIComponent(params);
			this.model.set("_tracUrl", tracUrl);
		},

		onHover: function() {
			_.defer(function() { Adapt.trigger("inspector:hover"); });
		},

		onTouch: function(event) {
			if (event.originalEvent.stopInspectorPropagation) return;

			event.originalEvent.stopInspectorPropagation = true;

			if (!$(event.target).is("[class*=inspector-]")) {
				Adapt.trigger("inspector:touch", this.$el);
			}
		}

	});

	Adapt.once("app:dataReady", function() {
		var config = Adapt.config.get("_inspector");

		if (!config || !config._isEnabled) return;
		if (Adapt.device.touch && config._disableOnTouch) return;

		var views = config._elementsToInspect ||
			[ "menu", "page", "article", "block", "component" ];

		Adapt.on("router:location", function() {
			new InspectorView();
		}).on(views.join("View:postRender ") + "View:postRender", function(view) {
			new InspectorContainerView({ el: view.$el, model: view.model });
		});
	});

});
define('extensions/adapt-pageIncompletePrompt/js/adapt-pageIncompletePrompt',[
    'coreJS/adapt'
], function(Adapt) {


    var PageIncompletePrompt = _.extend({
        
        PLUGIN_NAME: "_pageIncompletePrompt",

        handleRoute: true,
        inPage: false,
        inPopup: false,
        pageComponents: null,
        pageModel: null,
        routeArguments: null,
        model: null,

        _ignoreAccessibilityNavigation: false,

        initialize: function() {
            this.setupEventListeners();
        },

        setupEventListeners: function() {
            this.listenToOnce(Adapt, "app:dataLoaded", this.setupModel);
            this.listenTo(Adapt, "pageView:ready", this.onPageViewReady);
            this.listenTo(Adapt, "pageIncompletePrompt:leavePage", this.onLeavePage);
            this.listenTo(Adapt, "pageIncompletePrompt:cancel", this.onLeaveCancel);
            this.listenTo(Adapt, "router:navigate", this.onRouterNavigate);
        },

        setupModel: function() {
            this.model = Adapt.course.get(this.PLUGIN_NAME);
            this.listenTo(Adapt, "accessibility:toggle", this.onAccessibilityToggle);
        },

        onPageViewReady: function() {
            this.inPage = true;
            this.pageModel = Adapt.findById(Adapt.location._currentId);
            this.pageComponents = this.pageModel.findDescendants("components").where({"_isAvailable": true});
        },

        onLeavePage: function() {
            if (!this.inPopup) return;
            this.inPopup = false;

            this.stopListening(Adapt, "notify:cancelled");
            this.enableRouterNavigation(true);
            this.handleRoute = false;
            this.inPage = false;

            Adapt.trigger("router:navigateTo", this.routeArguments);

            this.handleRoute = true;
        },

        onLeaveCancel: function() {
            if (!this.inPopup) return;
            this.inPopup = false;
            
            this.stopListening(Adapt, "notify:cancelled");
            this.routeArguments = undefined;
            this.enableRouterNavigation(true);
            this.handleRoute = true;
        },

        onRouterNavigate: function(routeArguments) {
            
            if(!this.isEnabled() || this.allComponentsComplete()) return;

            if (routeArguments[0]) {
                //check if routing to current page child
                //exit if on same page
                try {
                    var id = routeArguments[0];
                    var model = Adapt.findById(id);
                    var parent = model.findAncestor("contentObjects");
                    if (parent.get("_id") == this.pageModel.get("_id")) return;
                } catch (e) {}
            }

            if (this._ignoreAccessibilityNavigation) {
                this._ignoreAccessibilityNavigation = false;
                return;
            }

            this.enableRouterNavigation(false)
            this.routeArguments = routeArguments;
            this.inPopup = true;
            
            var promptObject;
    		var pageIncompletePromptConfig = this.pageModel.get("_pageIncompletePrompt");
    		if (pageIncompletePromptConfig && pageIncompletePromptConfig._buttons) {
    			promptObject = {
    				title: pageIncompletePromptConfig.title,
    				body: pageIncompletePromptConfig.message,
    				_prompts:[{
    				        promptText: pageIncompletePromptConfig._buttons.yes,
    				        _callbackEvent: "pageIncompletePrompt:leavePage",
    				},{
    				        promptText: pageIncompletePromptConfig._buttons.no,
    				        _callbackEvent: "pageIncompletePrompt:cancel"
    				}],
    				_showIcon: true
    			};
    		} else {
    			promptObject = {
    				title: this.model.title,
    				body: this.model.message,
    				_prompts:[{
    				        promptText: this.model._buttons.yes,
    				        _callbackEvent: "pageIncompletePrompt:leavePage",
    				},{
    				        promptText: this.model._buttons.no,
    				        _callbackEvent: "pageIncompletePrompt:cancel"
    				}],
    				_showIcon: true
    			};
    		}

            this.listenToOnce(Adapt, "notify:cancelled", this.onLeaveCancel);

            Adapt.trigger("notify:prompt", promptObject);
        },

        onAccessibilityToggle: function() {
            if (Adapt.device.touch) {
                //accessibility is always on for touch devices
                //ignore toggle
                this._ignoreAccessibilityNavigation = false;
            } else {
                //skip renavigate for accessibility on desktop
                this._ignoreAccessibilityNavigation = true;
            }
        },

        isEnabled: function() {
            if (!Adapt.location._currentId) return false;
            if (!this.handleRoute) return false;
            if (!this.inPage) return false;
            if (this.inPopup) return false;
            
            switch (Adapt.location._contentType) {
            case "menu": case "course":
                this.inPage = false;
                return false;
            }
            var pageModel = Adapt.findById(Adapt.location._currentId);
            if (pageModel.get("_isOptional")) return false;
            var isEnabledForCourse = this.model && !!this.model._isEnabled;
            var isEnabledForPage = pageModel.get("_pageIncompletePrompt") && !!pageModel.get("_pageIncompletePrompt")._isEnabled;               
            return (isEnabledForCourse && isEnabledForPage !== false) || isEnabledForPage;
        },

        allComponentsComplete: function() {
            
            if(this.pageComponents === null) return true;
            
            for(var i = 0, count = this.pageComponents.length; i < count; i++) {
                var component  = this.pageComponents[i];
                var isMandatory = (component.get('_isOptional') === false);
                var isComplete = component.get("_isComplete");
            
                if(isMandatory && !isComplete) return false;   
            }
            
            return true;
        },

        enableRouterNavigation: function(value) {
            Adapt.router.set("_canNavigate", value, { pluginName: this.PLUGIN_NAME });
        }

    }, Backbone.Events);

    PageIncompletePrompt.initialize();

    return PageIncompletePrompt;

});

define('extensions/adapt-prototype/js/adapt-prototype',[
	"coreJS/adapt"
], function(Adapt) {

	var EditView = Backbone.View.extend({
		$currentComponentContainer: null,
		currentComponentID: null,
		events: {
			"click": "onEditClicked"
		},
		initialize: function() {
			$("body").append(this.el);
		},
		onEditClicked: function(event) {
			event.preventDefault();
			this.openEditWindow();
		},
		onResize: function() {
			if (!this.$currentComponentContainer) return;

			var offset = this.$currentComponentContainer.offset();
			var width = this.$currentComponentContainer.width();

			var offsetWidth = this.$el.width();

			editView.$el.css({
				top: offset['top']+"px",
				left: (offset['left']+width-offsetWidth)-50+"px",
				display: "block"
			}).html("Edit " + this.currentComponentID)
		},
		openEditWindow: function() {
			var prototypeWindow = window.open("prototype/index.html", "_blank");
			prototypeWindow.Adapt = Adapt;
			prototypeWindow.data = {
				view: start.findViewById(this.currentComponentID)
			};
			prototypeWindow.parentWindow = window;
		}
	});
	
	

	var StartView = Backbone.View.extend({
		views: [],
		events: {
			"mouseover .prototype-component": "onComponentFocus",
			"focus .prototype-component": "onComponentFocus"
		},
		initialize: function() {
			this.setupEventListeners();
		},
		setupEventListeners: function() {
			this.listenTo(Adapt, "componentView:preRender", this.onComponentPreRender);
			this.listenTo(Adapt, "remove", this.onRemove);
		},
		onComponentPreRender: function(view) {
			this.views.push(view);
			var id = view.model.get("_id");
			view.$el.addClass("prototype-component").attr("data-prototype-id", id);
		},
		onComponentFocus: function(event) {
			var $componentContainer = $(event.currentTarget);
			var id = $componentContainer.attr("data-prototype-id");
			editView.currentComponentID = id;
			editView.$currentComponentContainer = $componentContainer;
			editView.onResize();
		},
		onRemove: function() {
			this.views = [];
			editView.$el.css("display","");
		},
		findViewById: function(id) {
			for (var i = 0, l = this.views.length; i < l; i++) {
				if (this.views[i].model.get("_id") == id) {
					return this.views[i];
				}
			}
			return undefined;
		}
	});

	var start;
	var editView;

	Adapt.once("app:dataReady", function() {

		start = new StartView({ el: document.getElementsByTagName("body")[0] });
		editView = new EditView({ el: $(Handlebars.templates['prototype-edit']({}))[0] })
	});

});
/*
* adapt-quicknav
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Oliver Foster <oliver.foster@kineo.com>
*/

define('extensions/adapt-quicknav/js/adapt-quicknav-view',['require','backbone','coreJS/adapt'],function(require) {

	var Backbone = require('backbone');
	var Adapt = require('coreJS/adapt');

	var QuickNavView = Backbone.View.extend({
		initialize: function() {
			this.listenTo(Adapt, 'remove', this.remove);
			this.render();

			this.model.state._locked = false;
            if (this.model.config._lock) {
                var contentObjects = this.model.config._lock;
                var completeCount = 0;
                for( var i = 0; i < contentObjects.length; i++) if (Adapt.contentObjects.findWhere({_id:contentObjects[i]}).get("_isComplete")) completeCount++;
                if (completeCount < contentObjects.length) {
                    this.model.state._locked = true;
                }
            }

            if (this.model.state._locked == true) this.$('#next').attr("disabled", "disabled");

			if (this.model.config._isEnableNextOnCompletion) {
				if (this.model.state.currentPage.model.get("_isComplete")) this.onPageCompleted();
				else {
					this.$('#next').attr("disabled", "disabled");
					this.listenTo( this.model.state.currentPage.model,"change:_isComplete", this.onPageCompleted );
				}
			}


			
		},
		render: function() {
	        var template = Handlebars.templates["quicknav-bar"];
	        this.$el.html(template(this.model));
	        return this;
		},

		className: "block quicknav",

		events: {
			"click #root": "onRootClicked",
			"click #previous": "onPreviousClicked",
			"click #up": "onUpClicked",
			"click #next": "onNextClicked"
		},

		onRootClicked: function() {
			this.parent.onRootClicked();
		},
		onPreviousClicked: function() {
			this.parent.onPreviousClicked();
		},
		onUpClicked: function() {
			this.parent.onUpClicked();
		},
		onNextClicked: function() {
			this.parent.onNextClicked();
		},

		onPageCompleted: function( ) {
			this.model.state._locked = false;
            if (this.model.config._lock) {
                var contentObjects = this.model.config._lock;
                var completeCount = 0;
                for( var i = 0; i < contentObjects.length; i++) if (Adapt.contentObjects.findWhere({_id:contentObjects[i]}).get("_isComplete")) completeCount++;
                if (completeCount < contentObjects.length) {
                    this.model.state._locked = true;
                }
            }

            if (this.model.state._locked == true) this.$('#next').attr("disabled", "disabled");
			else this.$('#next').removeAttr("disabled");
		}

	});

	return QuickNavView;
})
	;
/*
* adapt-diffuseAssessment
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Oliver Foster <oliver.foster@kineo.com>
*/

define('extensions/adapt-quicknav/js/quicknav-placeholder',['require','coreViews/componentView','coreJS/adapt'],function(require) {
    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var quicknav = ComponentView.extend({
        preRender: function() {
            this.setCompletionStatus();
        },

        postRender: function() {
            this.setReadyStatus();
        }
    });

    Adapt.register("quicknav", quicknav);

    return quicknav;
});

/*
* adapt-quicknav
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Oliver Foster <oliver.foster@kineo.com>
*/

define('extensions/adapt-quicknav/js/adapt-quicknav',['require','coreJS/adapt','backbone','extensions/adapt-quicknav/js/adapt-quicknav-view','extensions/adapt-quicknav/js/quicknav-placeholder'],function(require) {

	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');
	var QuickNavView = require('extensions/adapt-quicknav/js/adapt-quicknav-view');
	require('extensions/adapt-quicknav/js/quicknav-placeholder');

	var quicknav = Backbone.View.extend({
		config: undefined,
		state: {
			lastBlock: undefined,
			currentMenu: undefined,
			currentPage: undefined,
			isFirstPage: false,
			isLastPage: false
		},
		menuStructure: {},
		onRootClicked: function() {
			Backbone.history.navigate("#/",{trigger:true, "replace": true});
		},
		onPreviousClicked:function() {
			var menus = undefined;
			var indexOfMenu = undefined;
			var pages = undefined;

			if (_.keys(this.menuStructure).length === 0) {
				pages = _.pluck(new Backbone.Collection(Adapt.contentObjects.where({_type: "page"})).toJSON(), [ "_id" ]);
			} else {
				menus = _.keys(this.menuStructure);
				indexOfMenu = _.indexOf(menus, this.state.currentMenu.get("_id"));
				pages = _.keys(this.menuStructure[this.state.currentMenu.get("_id")]);
			}

			if (pages === undefined) return;

			var indexOfPage = _.indexOf(pages, this.state.currentPage.model.get("_id"));
			if (this.config._isContinuous == "global" && menus !== undefined) {
				if (indexOfPage === 0) { //if page is at the beginning of the menu goto previous menu, last page
					if (this.config._global !== undefined && this.config._global._pagePrevious !== undefined) {
						Backbone.history.navigate("#/id/" + this.config._global._pagePrevious, {trigger: true, replace: true});
						return;
					} else if (indexOfMenu === 0 && indexOfMenu == menus.length - 1) {
						//single menu, last page
					} else if (indexOfMenu === 0) {
						indexOfMenu = menus.length - 1; //last menu
						pages = _.keys(this.menuStructure[menus[indexOfMenu]]); //get menu pages
					} else {
						indexOfMenu-=1; //previous menu
						pages = _.keys(this.menuStructure[menus[indexOfMenu]]); //get menu pages
					}
					indexOfPage = pages.length - 1; //last page
				} else {
					indexOfPage-=1; //previous page
				}
			} else if (this.config._isContinuous == "local" || (this.config._isContinuous == "global" && menus === undefined)) {
				if (indexOfPage === 0 && indexOfPage == pages.length - 1) {
					//single page
				} else if (indexOfPage === 0) {
					indexOfPage = pages.length - 1; //last page
				} else {
					indexOfPage-=1; //previous page
				}
			} else {
				if (indexOfPage === 0) return;
				indexOfPage-=1; //previous page
			}
			Backbone.history.navigate("#/id/" + pages[indexOfPage], {trigger: true, replace: true});
		},
		onUpClicked: function() {
			var parentId = this.state.currentPage.model.get("_parentId");
			Backbone.history.navigate("#/id/" + parentId, {trigger: true, replace: true});
		},
		onNextClicked: function() {
			var menus = undefined;
			var indexOfMenu = undefined;
			var pages = undefined;

			if (_.keys(this.menuStructure).length === 0) {
				pages = _.pluck(new Backbone.Collection(Adapt.contentObjects.where({_type: "page"})).toJSON(), [ "_id" ]);
			} else {
				menus = _.keys(this.menuStructure);
				indexOfMenu = _.indexOf(menus, this.state.currentMenu.get("_id"));
				pages = _.keys(this.menuStructure[this.state.currentMenu.get("_id")]);
			}

			if (pages === undefined) return;

			var indexOfPage = _.indexOf(pages, this.state.currentPage.model.get("_id"));
			if (this.config._isContinuous == "global" && menus !== undefined) {
				if (indexOfPage === pages.length - 1) { //if page is at the end of the menu goto next menu, first page
					if (this.config._global !== undefined && this.config._global._pageNext !== undefined) {
						Backbone.history.navigate("#/id/" + this.config._global._pageNext, {trigger: true, replace: true});
						return;
					} else if (indexOfMenu === 0 && indexOfMenu == menus.length - 1) {
						//single menu, first page
					} else if (indexOfMenu == menus.length - 1) {
						indexOfMenu = 0; //first menu
						pages = _.keys(this.menuStructure[menus[indexOfMenu]]); //get menu pages
					} else {
						indexOfMenu+=1; //next menu
						pages = _.keys(this.menuStructure[menus[indexOfMenu]]); //get menu pages
					}
					indexOfPage = 0; //first page
				} else {
					indexOfPage+=1; //next page
				}
			} else if (this.config._isContinuous == "local" || (this.config._isContinuous == "global" && menus === undefined)) {
				if (indexOfPage === 0 && indexOfPage == pages.length - 1) {
					//single page
				} else if (indexOfPage == pages.length - 1) {
					indexOfPage = 0; //first page
				} else {
					indexOfPage+=1; //next page
				}
			} else {
				if (indexOfPage == pages.length - 1) return;
				indexOfPage+=1; //next page
			}
			Backbone.history.navigate("#/id/" + pages[indexOfPage], {trigger: true, replace: true});
		},
		position: function() {
			this.state.isFirstPage = false;
			this.state.isLastPage = false;

			var pages = undefined;

			if (_.keys(this.menuStructure).length === 0) {
				pages = _.pluck(new Backbone.Collection(Adapt.contentObjects.where({_type: "page"})).toJSON(), [ "_id" ]);
			} else {
				pages = _.keys(this.menuStructure[this.state.currentMenu.get("_id")]);
			}

			if (pages === undefined) return;

			var indexOfPage = _.indexOf(pages, this.state.currentPage.model.get("_id"));
			
			if (this.config._isContinuous == "local" || this.config._isContinuous == "global" ) {
				if (indexOfPage === 0 && indexOfPage == pages.length - 1 && this.config._isContinuous == "local") {
					this.state.isFirstPage = true;
					this.state.isLastPage = true;
				} else {
					this.state.isLastPage = false;
					this.state.isFirstPage = false;
				}
			} else {
				if (indexOfPage === 0) this.state.isFirstPage = true;
				if (indexOfPage == pages.length - 1) this.state.isLastPage = true;
			}

		}
	});
	quicknav = new quicknav();

	Adapt.on("app:dataReady", function() {
		var menus = Adapt.contentObjects.where({_type: "menu"});
		_.each(menus, function(menu) {
			var id = menu.get("_id");
			quicknav.menuStructure[id] = {};
			var pages = Adapt.contentObjects.where({_type: "page", _parentId: id });
			_.each(pages, function(page) {
				quicknav.menuStructure[id][page.get("_id")] = page;
			});
		});
	});

	Adapt.on("pageView:postRender", function(pageView) {
		var pageModel = pageView.model;
		if (pageModel.get("_quicknav") === undefined) return;
		var config = pageModel.get("_quicknav");
		if (config._isEnabled !== true && config._isEnabled !== undefined) return;

		var blocks = pageModel.findDescendants("blocks");

		var parentId = pageModel.get("_parentId");
		quicknav.state.currentMenu = Adapt.contentObjects.findWhere({_id: parentId});
		quicknav.state.currentPage = pageView;
		quicknav.state.lastBlock = blocks.last();
		quicknav.config = config;
	});

	Adapt.on('blockView:postRender', function(blockView) {
		if (quicknav.state.lastBlock === undefined) return;
		if (blockView.model.get("_id") !== quicknav.state.lastBlock.get("_id")) return;

		var element = blockView.$el.parent();

		quicknav.position();

		var quickNavView = new QuickNavView({model:{ config: quicknav.config, state: quicknav.state}});
		quickNavView.parent = quicknav;
		quickNavView.undelegateEvents();

		if (quicknav.config._injectIntoSelector) {
			var injectInto = element.find(quicknav.config._injectIntoSelector);
			if (injectInto.length > 0) {
				injectInto.append(quickNavView.$el);
			} else {
				element.append(quickNavView.$el);
			}
		} else {
			var injectInto = element.find(".quicknav-component");
			if (injectInto.length > 0) {
				injectInto.append(quickNavView.$el);
			} else {
				element.append(quickNavView.$el);
			}
		}
		
		quickNavView.delegateEvents();



	});

	return quicknav;

})
;
define('extensions/adapt-search/js/searchDrawerItemView',[
    'coreJS/adapt',
], function(Adapt) {

    var SearchDrawerItemView = Backbone.View.extend({

        className: 'drawer-item-search',

        events: {
            'click .start-search':'search',
            'keyup .search-box':'search'            
        },        

        initialize: function(options) {

            this.listenTo(Adapt, 'drawer:empty', this.remove);
            this.render();
           
            this.search = _.debounce(_.bind(this.search, this), 1000);
            if(options.query){
              this.$(".search-box").val(options.query);
            }

        },

        render: function() {

            var data = this.model.toJSON();
           
            var template = Handlebars.templates['searchBox']
            $(this.el).html(template(data));

            return this;
        },

        search: function(event) {

          if(event) event.preventDefault();
          var searchVal = this.$(".search-box").val();
          console.log("search: " + searchVal);

          Adapt.trigger("search:filterTerms", searchVal);          
      }

    });

    return SearchDrawerItemView;
})
;
/*
* adapt-keepScrollPosition
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Oliver Foster <oliver.foster@kineo.com>, Tom Greenfield
*/

define('extensions/adapt-search/js/search-algorithm',[ 
	"coreJS/adapt",
	"coreModels/adaptModel"
], function(Adapt, AdaptModel) {

	if (!AdaptModel.prototype.getParents) {

		AdaptModel.prototype.getParents = function(shouldIncludeChild) {
		    var parents = [];
		    var context = this;

		    if (shouldIncludeChild) parents.push(context);

		    while (context.has("_parentId")) {
		        context = context.getParent();
		        parents.push(context);
		    }

		    return parents.length ? new Backbone.Collection(parents) : null;
		}

	}

	var searchDefaults = { //override in course.json "_search": {}

		_searchAttributes: [
			{
				"_attributeName": "_search",
				"_level": 1,
				"_allowTextPreview": false
			},
			{
				"_attributeName": "_keywords",
				"_level": 1,
				"_allowTextPreview": false
			},
			{
				"_attributeName": "keywords",
				"_level": 1,
				"_allowTextPreview": false
			},
			{
				"_attributeName": "displayTitle",
				"_level": 2,
				"_allowTextPreview": true
			},
			{
				"_attributeName": "title",
				"_level": 2,
				"_allowTextPreview": false
			},
			{
				"_attributeName": "body",
				"_level": 3,
				"_allowTextPreview": true
			},
			{
				"_attributeName": "alt",
				"_level": 4,
				"_allowTextPreview": false
			},
			{
				"_attributeName": "_alt",
				"_level": 4,
				"_allowTextPreview": false
			},
			{
				"_attributeName": "_items",
				"_level": 5,
				"_allowTextPreview": false
			},
			{
				"_attributeName": "items",
				"_level": 5,
				"_allowTextPreview": false
			},
			{
				"_attributeName": "text",
				"_level": 5,
				"_allowTextPreview": true
			}
		],

		_hideComponents: [
			"blank"
		],

		_hideTypes: [

		],

		_ignoreWords: [
			"a","an","and","are","as","at","be","by","for",
			"from","has","he","in","is","it","its","of","on",
			"that","the","to","was","were","will","wish","",
		],

		_wordBoundaryCharacters: [ " ", ".", ":" ],

		_scoreQualificationThreshold: 20,
		_minimumWordLength: 2,
		_frequencyImportance: 5

	};


	var search = _.extend({

		model: null,

		_searchableModels: null,
		_wordIndex: null,

		_regularExpressions: {
			matchNotWordBoundaries: /[^\ \.\:]+/g,
			trimReplaceNonWordCharacters: /^\W+|\W+$/g,
			trimReplaceWhitespace: /^\s+|\s+$/g,
			escapeRegExp: function (str) {
			  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
			}
		},

		initialize: function() {
			this.setupListeners();
		},

		setupListeners: function() {
			this.listenToOnce(Adapt, "app:dataReady", this.onDataReady);
		},

		onDataReady: function() {
			this.setupConfig();
			this._searchableModels = this.collectModelTexts();
			this.makeModelTextProfiles();
			this.indexTextProfiles();
			Adapt.trigger("search-algorithm:ready");
		},

		setupConfig: function() {
			var model = Adapt.course.get("_search") || {};
			//make sure defaults are injected, but original model reference is maintained
			var modelWithDefaults = _.extend(searchDefaults, model);

			Adapt.course.set("_search", modelWithDefaults);

			this.model = new Backbone.Model(modelWithDefaults);

			var wordBoundaryCharacters = this.model.get("_wordBoundaryCharacters");
			this._regularExpressions.matchNotWordBoundaries = new RegExp( '[^\\' + wordBoundaryCharacters.join('\\') + ']+', 'g' );

		},

		collectModelTexts: function() {

			var searchAttributes = this.model.get("_searchAttributes");
			var hideComponents = this.model.get("_hideComponents");
			var hideTypes = this.model.get("_hideTypes");
			var regularExpressions = this._regularExpressions;


			function combineAdaptModels() {
				var rtn = []
					.concat(Adapt.contentObjects.models)
					.concat(Adapt.articles.models)
					.concat(Adapt.blocks.models)
					.concat(Adapt.components.models);

				var filtered = _.filter(rtn, function(model) {
					var type = model.get("_type");
					if (_.contains(hideTypes, component)) return false;

					if (type == "component") {
						var component = model.get("_component");
						if (_.contains(hideComponents, component)) return false;
					}

					var displayTitle = model.get("displayTitle").replace(regularExpressions.trimReplaceWhitespace, "");
					var title = model.get("title").replace(regularExpressions.trimReplaceWhitespace, "");

					if (!displayTitle && !title) return false;

					return true;
				});

				return filtered;
			}

			function getSearchableModels() {
				var adaptModels = combineAdaptModels();

				var searchable = [];
				for (var i = 0, l = adaptModels.length; i < l; i++) {
					var model = adaptModels[i];
					if (!isModelSearchable(model)) continue;
					var json = model.toJSON();
					var searchProfile = {
						"_raw": recursivelyCollectModelTexts(json)
					};
					model.set("_searchProfile", searchProfile)
					searchable.push(model);
				}

				return new Backbone.Collection(searchable);
			}

			function isModelSearchable(model) {
				var trail = model.getParents(true);
				var config = model.get("_search");
				if (config && config._isDisabled) return false;

				var firstDisabledTrailItem = trail.find(function(item) {
					var config = item.get("_search");
					if (!config) return false;
					if (config && !config._isDisabled) return false;
					return true;
				});
				return firstDisabledTrailItem === undefined;
			}

			function recursivelyCollectModelTexts(json, level) {
				var texts = [];
				for (var i = 0, l = searchAttributes.length; i < l; i++) {
					var attributeObject = searchAttributes[i];
					if (!json[attributeObject._attributeName]) continue;
					switch (typeof json[attributeObject._attributeName]) {
					case "object":
						if (json[attributeObject._attributeName] instanceof Array) {
							for (var sa = 0, sal = json[attributeObject._attributeName].length; sa < sal; sa++) {
								switch (typeof json[attributeObject._attributeName][sa]) {
								case "object":
									texts = texts.concat(recursivelyCollectModelTexts(json[attributeObject._attributeName][sa], attributeObject._level));		
									break;
								case "string":
									addString(json[attributeObject._attributeName][sa], attributeObject._level, attributeObject);
								}
							}
						} else {
							texts = texts.concat(recursivelyCollectModelTexts(json[attributeObject._attributeName], attributeObject._level));
						}
						break;
					case "string":
						addString(json[attributeObject._attributeName], level, attributeObject);
						break;
					}
				}
				return texts;

				function addString(string, level, attributeObject) {
					var textLevel = level || attributeObject._level;
					var text = $("<div>"+string.replace(regularExpressions.trimReplaceWhitespace, "")+"</div>").text();
					text = text.replace(regularExpressions.trimReplaceWhitespace,"");
					if (!text) return;
					texts.push({
						score: 1/textLevel,
						text: text,
						searchAttribute: attributeObject
					});
				}
			}

			return getSearchableModels();

		},

		makeModelTextProfiles: function() {
      		// Handle _ignoreWords as a special case to support the authoring tool
      		var ignoreWords = this.model.get('_ignoreWords') instanceof Array 
        		? this.model.get("_ignoreWords")
        		: this.model.get("_ignoreWords").split(',');
        
			var regularExpressions = this._regularExpressions;
			var searchAttributes = this.model.get("_searchAttributes");
			var minimumWordLength = this.model.get("_minimumWordLength");

			var scores = _.uniq(_.pluck(searchAttributes, "_level"));
			scores = _.map(scores, function(l) { return 1/l; });

			for (var i = 0, l = this._searchableModels.models.length; i < l; i++) {
				var item = this._searchableModels.models[i];
				var profile = item.get("_searchProfile");
				makeModelPhraseProfile(profile);
				makeModelPhraseWordAndWordProfile(profile);
			}

			function makeModelPhraseProfile(profile) {
				profile._phrases = [];
				var phrases = _.groupBy(profile._raw, function(phrase) {
					return phrase.text;
				});
				for (var p in phrases) {
					var bestItem = _.max(phrases[p], function(item) {
						return item.score;
					});
					profile._phrases.push({
						searchAttribute: bestItem.searchAttribute,
						phrase: bestItem.text,
						score: bestItem.score,
						words: []
					});
				}
				return profile;
			}

			function makeModelPhraseWordAndWordProfile(profile) {
				profile._words = [];
				for (var l = 0, ll = scores.length; l < ll; l++) {
					var score = scores[l];
					var phrases = _.where(profile._phrases, { score: score });
					var scoreWords = [];
					for (var i = 0, pl = phrases.length; i < pl; i++) {
						var phraseObject = phrases[i];
						var chunks = phraseObject.phrase.match(regularExpressions.matchNotWordBoundaries);
						var words = _.map(chunks, function(chunk) {
							return chunk.replace(regularExpressions.trimReplaceNonWordCharacters, "");
						});
						phraseObject.words = _.countBy(words, function (word) { return word.toLowerCase(); });
						phraseObject.words = _.omit(phraseObject.words, ignoreWords);
						scoreWords = scoreWords.concat(words);
					}
					scoreWords = _.filter(scoreWords, function(word) { return word.length >= minimumWordLength; });
					scoreWords = _.countBy(scoreWords, function (word) { return word.toLowerCase(); });
					scoreWords = _.omit(scoreWords, ignoreWords);
					for (var word in scoreWords) {
						profile._words.push({
							word: word,
							score: score,
							count: scoreWords[word]
						});
					}
				}
				return profile;
			}

		},

		indexTextProfiles: function() {

			this._wordIndex = {};

			for (var i = 0, il = this._searchableModels.models.length; i < il; i++) {
				var item = this._searchableModels.models[i];
				var id = item.get("_id");
				var searchProfile = item.get("_searchProfile");

				for (var w = 0, wl = searchProfile._words.length; w < wl; w++) {
					var word = searchProfile._words[w].word;
					if (Object.prototype.hasOwnProperty && !this._wordIndex.hasOwnProperty(word)) {
						this._wordIndex[word] = [];
					} else {
						this._wordIndex[word] = this._wordIndex[word] || [];
					}
					this._wordIndex[word].push(id);
				}
				
			}

			for (var word in this._wordIndex) {
				this._wordIndex[word] = _.uniq(this._wordIndex[word]);
			}

		},

		find: function(findPhrase) {

			/*
			returns [
					{
						score: (float)score     = bestPhraseAttributeScore * (wordOccurencesInSection * frequencyMultiplier)
						model: model,
						foundWords: {
							"foundWord": (int)occurencesInSection
						},
						foundPhrases: [
							{
								"score": (float)score   = (1/attributeLevel)
								"phrase": "Test phrase",
								"words": {
									"Test": (int)occurencesInPhrase,
									"phrase": (int)occurencesInPhrase
								}
							}
						]
					}
				];
			*/

			var regularExpressions = this._regularExpressions;
			var wordIndex = this._wordIndex;
      		// Handle _ignoreWords as a special case to support the authoring tool
      		var ignoreWords = this.model.get('_ignoreWords') instanceof Array  
        		? this.model.get("_ignoreWords")
        		: this.model.get("_ignoreWords").split(',');
			var scoreQualificationThreshold = this.model.get("_scoreQualificationThreshold");
			var minimumWordLength = this.model.get("_minimumWordLength");
			var frequencyImportance = this.model.get("_frequencyImportance");

			var json = this._searchableModels.toJSON();

			function getFindPhraseWords(findPhrase) {
				var findChunks = findPhrase.match(regularExpressions.matchNotWordBoundaries);
				var findWords = _.map(findChunks, function(chunk) {
					return chunk.replace(regularExpressions.trimReplaceNonWordCharacters,"");
				});
				findWords = _.countBy(findWords, function(word){ return word.toLowerCase(); });
				findWords = _.omit(findWords, ignoreWords);
				findWords = _.omit(findWords, function(count, item) {
					return item.length < minimumWordLength;
				});
				return findWords;
			}

			function getMatchingIdScoreObjects(findWords) {
				var matchingIdScoreObjects = {};
 
				for (var findWord in findWords) {
					for (var indexWord in wordIndex) {
						//allow only start matches on findWord beginning with indexWord i.e. find: oneness begins with index: one 
						var rIndexWord = new RegExp("^"+regularExpressions.escapeRegExp(indexWord),"g");
						//allow all matches on indexWord containing findWord i.e. index: someone contains find: one, index: anti-money contains find: money
						var rFindWord = new RegExp(regularExpressions.escapeRegExp(findWord),"g");

						var isIndexMatch = rIndexWord.test(findWord);
						var isFindMatch = rFindWord.test(indexWord);

						var isFullMatch = findWord == indexWord;
						var isPartMatch = isIndexMatch || isFindMatch;

						if (!isFullMatch && !isPartMatch) continue;

						var partMatchRatio = 1;
						if (isPartMatch && !isFullMatch) {
							if (findWord.length > indexWord.length) partMatchRatio = indexWord.length/findWord.length;
							else partMatchRatio = findWord.length / indexWord.length
						}

						updateIdScoreObjectsForWord(matchingIdScoreObjects, indexWord, isFullMatch, partMatchRatio);
						
					}
				}
				return _.values(matchingIdScoreObjects);
			}

			function updateIdScoreObjectsForWord(matchingIdScoreObjects, word, isFullMatch, partMatchRatio) {

				for (var i = 0, l = wordIndex[word].length; i < l; i++) {
					var id = wordIndex[word][i];
					var model = _.findWhere(json, {_id: id});
					
					if (matchingIdScoreObjects[id] === undefined) {
						matchingIdScoreObjects[id] = {
							score: 0,
							foundWords: {},
							foundPhrases: null,
							model: Adapt.findById(id)
						};
					}

					if (matchingIdScoreObjects[id].foundWords[word] === undefined) matchingIdScoreObjects[id].foundWords[word] = 0;

					var allPhraseWordRatingObjects = _.where(model._searchProfile._words, { word: word });
					var wordFrequency = _.reduce(allPhraseWordRatingObjects, function(memo, item) { return memo + item.count; }, 0);
					var wordFrequencyHitScore = _.reduce(allPhraseWordRatingObjects, function(memo, item) { 
						var frequencyBonus = (item.score * item.count) / frequencyImportance;
						return memo + item.score + frequencyBonus;
					}, 0);

					matchingIdScoreObjects[id].foundWords[word]+=wordFrequency;

					if (isFullMatch) {
						matchingIdScoreObjects[id].score += wordFrequencyHitScore;
					} else {
						matchingIdScoreObjects[id].score += wordFrequencyHitScore * partMatchRatio;
					}
				}
			}

			function filterAndSortQualifyingMatches(matchingIdScoreObjects) {
				var qualifyingScoreThreshold = 1/scoreQualificationThreshold;
				var qualifyingMatches = _.filter(matchingIdScoreObjects, function(item) {
					//remove items which don't meet the score threshold
					return item.score >= qualifyingScoreThreshold;
				});
				qualifyingMatches = _.sortBy(qualifyingMatches, function(item) {
					//sort by highest score first
					return 1 / item.score;
				});
				return qualifyingMatches;
			}

			function mapSearchPhrasesToMatchingWords(matchingIdScoreObjects) {
				for (var i = 0, l = matchingIdScoreObjects.length; i < l; i++) {
					var matchingPhrases = [];
					var scoreObject = matchingIdScoreObjects[i];
					var foundWords = _.keys(scoreObject.foundWords);
					var modelPhrases = scoreObject.model.get("_searchProfile")._phrases;
					for (var p = 0, lp = modelPhrases.length; p < lp; p++) {
						var modelPhrase = modelPhrases[p];
						if (!modelPhrase.searchAttribute._allowTextPreview) continue;

						if (_.intersection(foundWords, _.keys(modelPhrase.words)).length > 0) {
							matchingPhrases.push(modelPhrase);
						}
					}
					scoreObject.foundPhrases = matchingPhrases;
				}
			}

			var findWords = getFindPhraseWords(findPhrase);
			var matchingIdScoreObjects = getMatchingIdScoreObjects(findWords);
			mapSearchPhrasesToMatchingWords(matchingIdScoreObjects);
			var qualifyingMatchedScoreObjects = filterAndSortQualifyingMatches(matchingIdScoreObjects);
						
			return qualifyingMatchedScoreObjects;
		}

	}, Backbone.Events);


	search.initialize();	

	window.search = search;

	return search;


});
define('extensions/adapt-search/js/searchResultsView',['require','backbone','coreJS/adapt','./search-algorithm'],function(require){
    var Backbone = require('backbone');
    var Adapt = require('coreJS/adapt');
    var SearchAlgorithm = require('./search-algorithm');

    var replaceTagsRegEx = /\<{1}[^\>]+\>/g;
    var replaceEndTagsRegEx = /\<{1}\/{1}[^\>]+\>/g;
    	
	var SearchResultsView = Backbone.View.extend({

        className : 'search-results inactive',
        
        initialize: function(options) {

          this.listenTo(Adapt, 'drawer:empty', this.remove);    
          this.listenTo(Adapt, 'search:termsFiltered', _.bind(this.updateResults, this));      
          this.render();  

          if(options.searchObject){
            this.updateResults(options.searchObject);
          }          
        },        

        events: {
          "click [data-id]":"navigateToResultPage"
        },

        render: function() {
            
            var template = Handlebars.templates['searchResults'];
            $(this.el).html(template());

            return this;
        },


        updateResults : function(searchObject){            

            this.$el.removeClass('inactive');
            var formattedResults = this.formatResults(searchObject);
            this.renderResults(formattedResults);
        },

        formatResults : function(searchObject){

            var resultsLimit = Math.min(5, searchObject.searchResults.length);            
            var formattedResults = [];

            for(var i=0;i<resultsLimit;i++){
              formattedResults.push(this.formatResult(searchObject.searchResults[i], searchObject.query));
            }

            searchObject.formattedResults = formattedResults;
            
            return searchObject;
        },

        formatResult : function(result, query){


            var foundWords = _.keys(result.foundWords).join(" ");
            var title = result.model.get("title");
            var displayTitle = result.model.get("displayTitle");
            var body = result.model.get("body");
            var previewWords = this.model.get("_previewWords");
            var previewCharacters = this.model.get("_previewCharacters");
            var wordBoundaryCharacters = this.model.get("_wordBoundaryCharacters");
            var wordBoundaryRegEx = "\\"+wordBoundaryCharacters.join("\\");

            //trim whitespace
            title = title.replace(SearchAlgorithm._regularExpressions.trimReplaceWhitespace,"");
            displayTitle = displayTitle.replace(SearchAlgorithm._regularExpressions.trimReplaceWhitespace,"");
            body = body.replace(SearchAlgorithm._regularExpressions.trimReplaceWhitespace,"");

            //strip tags
            title = this.stripTags(title);
            displayTitle = this.stripTags(displayTitle);
            body = this.stripTags(body);
            
            var searchTitle = "";
            var textPreview = "";

            //select title
            if (!title) {
                searchTitle = $("<div>"+displayTitle+"</div>").text() || "No title found";
            } else {
                searchTitle = $("<div>"+title+"</div>").text();
            }

            //select preview text
            if (result.foundPhrases.length > 0) {

                var phrase = result.foundPhrases[0].phrase;
                //strip tags
                phrase = this.stripTags(phrase);

                var lowerPhrase = phrase.toLowerCase();
                var lowerSearchTitle = searchTitle.toLowerCase();

                if (lowerPhrase == lowerSearchTitle && result.foundPhrases.length > 1) {
                    phrase = result.foundPhrases[1].phrase;
                    //strip tags
                    phrase = this.stripTags(phrase);
                    lowerPhrase = phrase.toLowerCase();
                }
                
                if (lowerPhrase == lowerSearchTitle) {
                    //if the search phrase and title are the same
                    var finder = new RegExp("(([^"+wordBoundaryRegEx+"]*["+wordBoundaryRegEx+"]{1}){1,"+previewWords+"}|.{0,"+previewCharacters+"})", "i");
                    if (body) {
                        textPreview = body.match(finder)[0] + "...";
                    }
                } else {
                    var wordMap = _.map(result.foundWords, function(count, word) {
                        return { word: word, count: count};
                    });
                    _.sortBy(wordMap, function(item) {
                        return item.count;
                    });
                    var wordIndex = 0;
                    var wordInPhraseStartPosition = lowerPhrase.indexOf(wordMap[wordIndex].word);
                    while(wordInPhraseStartPosition == -1) {
                        wordIndex++;
                        if (wordIndex == wordMap.length) throw "search: cannot find word in phrase";
                        wordInPhraseStartPosition = lowerPhrase.indexOf(wordMap[wordIndex].word);
                    } 
                    var regex = new RegExp("(([^"+wordBoundaryRegEx+"]*["+wordBoundaryRegEx+"]{1}){1,"+previewWords+"}|.{0,"+previewCharacters+"})"+SearchAlgorithm._regularExpressions.escapeRegExp(wordMap[wordIndex].word)+"((["+wordBoundaryRegEx+"]{1}[^"+wordBoundaryRegEx+"]*){1,"+previewWords+"}|.{0,"+previewCharacters+"})", "i");
                    var snippet = phrase.match(regex)[0];
                    var snippetIndexInPhrase = phrase.indexOf(snippet);
                    if (snippet.length == phrase.length) {
                        textPreview = snippet;
                    } else if (snippetIndexInPhrase === 0) {
                        textPreview = snippet + "...";
                    } else if (snippetIndexInPhrase + snippet.length == phrase.length) {
                        textPreview = "..." + snippet;
                    } else {
                        textPreview = "..." + snippet + "...";
                    }
                }
            
            } else {

                var finder = new RegExp("(([^"+wordBoundaryRegEx+"]*["+wordBoundaryRegEx+"]{1}){1,"+previewWords+"}|.{0,"+previewCharacters+"})", "i");
                if (body) {
                    textPreview = body.match(finder)[0] + "...";
                }

            }

            var searchTitleTagged = tag(result.foundWords, searchTitle);
            var textPreviewTagged = tag(result.foundWords, textPreview);

            return {
                searchTitleTagged: searchTitleTagged,
                searchTitle: searchTitle,
                foundWords: foundWords,
                textPreview: textPreview,
                textPreviewTagged: textPreviewTagged,
                id: result.model.get('_id')
            };

            function tag(words, text) {
                var initial = "";
                 _.each(words, function(count, word) {
                    var wordPos = text.toLowerCase().indexOf(word);
                    if (wordPos < 0) return;
                    initial += text.slice(0, wordPos);
                    var highlighted = text.slice(wordPos, wordPos+word.length);
                    initial +="<span class='found'>"+highlighted+"</span>";
                    text = text.slice(wordPos+word.length, text.length);
                });
                initial+=text;
                return initial;
            }
        },

        stripTags: function (text) {
            text = $("<span>"+text+"</span>").html();
            text = text.replace(replaceEndTagsRegEx, " ");
            text = text.replace(replaceTagsRegEx, "");
            return text;
        },

        renderResults : function(results){

            var template = Handlebars.templates['searchResultsContent'];
            this.$('.search-results-content').html(template(results));
        },

        navigateToResultPage: function(event) {
            event.preventDefault();
            var blockID = $(event.currentTarget).attr("data-id");            
            
            Adapt.navigateToElement("." + blockID);
            Adapt.trigger('drawer:closeDrawer');
        }

	});

	 return SearchResultsView;

});
/*
* adapt-search
* License - https://github.com/cgkineo/adapt-search/blob/master/LICENSE
* Maintainers - Gavin McMaster <gavin.mcmaster@kineo.com>
*/
define('extensions/adapt-search/js/adapt-search',[
    'coreJS/adapt',
    './searchDrawerItemView',
    './searchResultsView',
    './search-algorithm'
], function(Adapt, SearchDrawerItemView, SearchResultsView, SearchAlgorithm){

    var lastSearchQuery = null;
    var lastSearchObject = null;
    var isSearchShown = false;

    var searchConfigDefault = {
        _previewWords: 15,
        _previewCharacters: 30,
        _showHighlights: true,
        _showFoundWords: true,
        title: "Search",
        description: "Type in search words",
        placeholder: "",
        noResultsMessage: "Sorry, no results were found",
        awaitingResultsMessage: "Formulating results..."
    };

    Adapt.on('search-algorithm:ready', function(){
        Adapt.course.set('_search', _.extend(searchConfigDefault, Adapt.course.get('_search')) );

        var searchConfig = Adapt.course.get('_search');
        searchConfig.title = searchConfig.title || 'search';
        searchConfig.description = searchConfig.description || 'description';

        var drawerObject = {
            title: searchConfig.title,
            description: searchConfig.description,
            className: 'search-drawer'
        };

        Adapt.drawer.addItem(drawerObject, 'resources:showSearch');
    });

    Adapt.on('resources:showSearch', function() {
        if (isSearchShown) return;

        var searchConfig = Adapt.course.get('_search');
        searchConfig = new Backbone.Model(searchConfig);

        var template = Handlebars.templates['searchSingleItem'];
        var $element = $(template(searchConfig.toJSON()));

        Adapt.drawer.triggerCustomView($element, true);

        Adapt.trigger("search:draw");

    });

    Adapt.on('drawer:openedItemView search:draw', function(){

        isSearchShown = true;

        var searchConfig = Adapt.course.get('_search');
        searchConfig = new Backbone.Model(searchConfig);

        var $searchDrawerButton = $(".search-drawer");

        if ($searchDrawerButton.is(":not(div)")) {
            var $replacementButton = $("<div></div>");
            $replacementButton.attr("class", $searchDrawerButton.attr("class"));
            $searchDrawerButton.children().appendTo($replacementButton);
            $searchDrawerButton.replaceWith($replacementButton);
        }

        $('.drawer-inner .search-drawer').append(new SearchDrawerItemView({model:searchConfig, query: lastSearchQuery}).el);
        $('.drawer-inner .search-drawer').append(new SearchResultsView({model:searchConfig, searchObject: lastSearchObject}).el);
        
    });

    Adapt.on('drawer:closed', function() {
        isSearchShown = false;
    });

    Adapt.on('search:filterTerms', function(query){
        var searchConfig = Adapt.course.get('_search');

        lastSearchQuery = query;

        if (query.length === 0) {

            var searchObject = _.extend({}, searchConfig, {
                query: query,
                searchResults: [],
                isAwaitingResults: false,
                isBlank: true
            });

        } else if (query.length < searchConfig._minimumWordLength) {

            var searchObject = _.extend({}, searchConfig, {
                query: query,
                searchResults: [],
                isAwaitingResults: true,
                isBlank: false
            });
        } else {

            var results = SearchAlgorithm.find(query);

            var searchObject = _.extend({}, searchConfig, {
                query: query,
                searchResults: results,
                isAwaitingResults: false,
                isBlank: false
            });
        }

        lastSearchObject = searchObject;

        Adapt.trigger('search:termsFiltered', searchObject);
    });

    Adapt.once('drawer:noItems', function(){
        $('.navigation-drawer-toggle-button').removeClass('display-none');
    });

});

define('components/adapt-contrib-accordion/js/adapt-contrib-accordion',['require','coreViews/componentView','coreJS/adapt'],function(require) {

    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var Accordion = ComponentView.extend({

        events: {
            'click .accordion-item-title': 'toggleItem'
        },

        toggleSpeed: 200,

        preRender: function() {
            // Checks to see if the accordion should be reset on revisit
            this.checkIfResetOnRevisit();
        },

        postRender: function() {
            this.setReadyStatus();
        },

        // Used to check if the accordion should reset on revisit
        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);

                _.each(this.model.get('_items'), function(item) {
                    item._isVisited = false;
                });
            }
        },

        toggleItem: function(event) {
            event.preventDefault();

            var $toggleButton = $(event.currentTarget);
            var $accordionItem = $toggleButton.parent('.accordion-item');
            var isCurrentlyExpanded = $toggleButton.hasClass('selected');

            if (this.model.get('_shouldCollapseItems') === false) {
                // Close and reset the selected Accordion item only
                this.closeItem($accordionItem);
            } else {
                // Close and reset all Accordion items
                var allAccordionItems = this.$('.accordion-item');
                var count = allAccordionItems.length;
                for (var i = 0; i < count; i++) {
                    this.closeItem($(allAccordionItems[i]));
                }
            }

            if (!isCurrentlyExpanded) {
                this.openItem($accordionItem);
            }
        },

        closeItem: function($itemEl) {
            if (!$itemEl) {
                return false;
            }

            var $body = $('.accordion-item-body', $itemEl).first();
            var $button = $('button', $itemEl).first();
            var $icon = $('.accordion-item-title-icon', $itemEl).first();

            $body.stop(true, true).slideUp(this.toggleSpeed);
            $button.removeClass('selected');
            $button.attr('aria-expanded', false);
            $icon.addClass('icon-plus');
            $icon.removeClass('icon-minus');
        },

        openItem: function($itemEl) {
            if (!$itemEl) {
                return false;
            }

            var $body = $('.accordion-item-body', $itemEl).first();
            var $button = $('button', $itemEl).first();
            var $icon = $('.accordion-item-title-icon', $itemEl).first();

            $body = $body.stop(true, true).slideDown(this.toggleSpeed, function() {
                $body.a11y_focus();
            });

            $button.addClass('selected');
            $button.attr('aria-expanded', true);

            this.setVisited($itemEl.index());
            $button.addClass('visited');

            $icon.removeClass('icon-plus');
            $icon.addClass('icon-minus');
        },

        setVisited: function(index) {
            var item = this.model.get('_items')[index];
            item._isVisited = true;
            this.checkCompletionStatus();
        },

        getVisitedItems: function() {
            return _.filter(this.model.get('_items'), function(item) {
                return item._isVisited;
            });
        },

        checkCompletionStatus: function() {
            if (this.getVisitedItems().length == this.model.get('_items').length) {
                this.setCompletionStatus();
            }
        }

    });

    Adapt.register('accordion', Accordion);

    return Accordion;

});

define('components/adapt-contrib-assessmentResults/js/adapt-contrib-assessmentResults',['require','coreViews/componentView','coreJS/adapt'],function(require) {

    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var AssessmentResults = ComponentView.extend({

        events: {
            'inview': 'onInview',
            'click .results-retry-button button': 'onRetry'
        },

        preRender: function () {
            if (this.model.setLocking) this.model.setLocking("_isVisible", false);

            this.saveOriginalTexts();

            this.setupEventListeners();
            this.setupModelResetEvent();
            this.checkIfComplete();
            this.checkIfVisible();
        },

        saveOriginalTexts: function() {
            this.model.set({
                "originalTitle": this.model.get("title"),
                "originalBody": this.model.get("body"),
                "originalInstruction": this.model.get("instruction")
            });
        },

        checkIfVisible: function() {
            
            if (!Adapt.assessment) {
                return false;
            }

            var isVisibleBeforeCompletion = this.model.get("_isVisibleBeforeCompletion") || false;
            var isVisible = false;

            var wasVisible = this.model.get("_isVisible");

            var assessmentModel = Adapt.assessment.get(this.model.get("_assessmentId"));
            if (!assessmentModel || assessmentModel.length === 0) return;

            var state = assessmentModel.getState();
            var isComplete = state.isComplete;
            var isAttemptInProgress = state.attemptInProgress;
            var attemptsSpent = state.attemptsSpent;
            var hasHadAttempt = (!isAttemptInProgress && attemptsSpent > 0);
            
            isVisible = (isVisibleBeforeCompletion && !isComplete) || hasHadAttempt;

            if (!wasVisible && isVisible) isVisible = false;

            this.model.set('_isVisible', isVisible, {pluginName: "assessmentResults"});
        },

        checkIfComplete: function() {
            
            if (!Adapt.assessment) {
                return false;
            }

            var assessmentModel = Adapt.assessment.get(this.model.get("_assessmentId"));
            if (!assessmentModel || assessmentModel.length === 0) return;

            var state = assessmentModel.getState();
            var isComplete = state.isComplete;
            if (isComplete) {
                this.onAssessmentsComplete(state);
            } else {
                this.model.reset('hard', true);
            }
        },

        setupModelResetEvent: function() {
            if (this.model.onAssessmentsReset) return;
            this.model.onAssessmentsReset = function(state) {
                if (this.get("_assessmentId") === undefined || 
                    this.get("_assessmentId") != state.id) return;

                this.reset('hard', true);
            };
            this.model.listenTo(Adapt, 'assessments:reset', this.model.onAssessmentsReset);
        },

        postRender: function() {
            this.setReadyStatus();
        },

        setupEventListeners: function() {
            this.listenTo(Adapt, 'assessments:complete', this.onAssessmentsComplete);
            this.listenToOnce(Adapt, 'remove', this.onRemove);
        },

        removeEventListeners: function() {
            this.stopListening(Adapt, 'assessments:complete', this.onAssessmentsComplete);
            this.stopListening(Adapt, 'remove', this.onRemove);
        },

        onAssessmentsComplete: function(state) {
            if (this.model.get("_assessmentId") === undefined || 
                this.model.get("_assessmentId") != state.id) return;

            this.model.set("_state", state);
            
            var feedbackBand = this.getFeedbackBand();
            
            this.setFeedback(feedbackBand);
            
            this.addClassesToArticle(feedbackBand);

            this.render();
            
            this.show();
        },

        onAssessmentComplete: function(state) {
            this.model.set("_state", state);
            
            var feedbackBand = this.getFeedbackBand();
            
            this.setFeedback(feedbackBand);
            
            this.addClassesToArticle(feedbackBand);

            this.render();
            
            this.show();
        },

        onInview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }
                
                if (this._isVisibleTop || this._isVisibleBottom) {
                    this.setCompletionStatus();
                    this.$el.off("inview");
                }
            }
        },

        onRetry: function() {
            var state = this.model.get("_state");
            var assessmentModel = Adapt.assessment.get(state.id);

            this.restoreOriginalTexts();

            assessmentModel.reset();
        },

        restoreOriginalTexts: function() {
            this.model.set({
                "title": this.model.get("originalTitle"),
                "body": this.model.get("originalBody"),
                "instruction": this.model.get("originalInstruction")
            });
        },
        
        show: function() {
             if(!this.model.get('_isVisible')) {
                 this.model.set('_isVisible', true, {pluginName: "assessmentResults"});
             }
        },

        setFeedback: function(feedbackBand) {

            var completionBody = this.model.get("_completionBody");

            var state = this.model.get("_state");
            state.feedbackBand = feedbackBand;
            state.feedback = feedbackBand.feedback;

            this.checkRetryEnabled();

            completionBody = this.stringReplace(completionBody, state);

            this.model.set("body", completionBody);

        },
        
        /**
         * If there are classes specified for the feedback band, apply them to the containing article
         * This allows for custom styling based on the band the user's score falls into
         */
        addClassesToArticle: function(feedbackBand) {
            
            if(!feedbackBand.hasOwnProperty('_classes')) return;
            
            this.$el.parents('.article').addClass(feedbackBand._classes);
        },

        getFeedbackBand: function() {
            var state = this.model.get("_state");
            var scoreProp = state.isPercentageBased ? 'scoreAsPercent' : 'score';
            var bands = _.sortBy(this.model.get("_bands"), '_score');
            
            for (var i = (bands.length - 1); i >= 0; i--) {
                if (state[scoreProp] >= bands[i]._score) {
                    return bands[i];
                }
            }

            return "";
        },

        checkRetryEnabled: function() {
            var state = this.model.get("_state");

            var assessmentModel = Adapt.assessment.get(state.id);
            if (!assessmentModel.canResetInPage()) return false;

            var isRetryEnabled = state.feedbackBand._allowRetry !== false;
            var isAttemptsLeft = (state.attemptsLeft > 0 || state.attemptsLeft === "infinite");

            var showRetry = isRetryEnabled && isAttemptsLeft;
            this.model.set("_isRetryEnabled", showRetry);

            if (showRetry) {
                var retryFeedback =  this.model.get("_retry").feedback;
                retryFeedback = this.stringReplace(retryFeedback, state);
                this.model.set("retryFeedback", retryFeedback);
            } else {
                this.model.set("retryFeedback", "");
            }
        },

        stringReplace: function(string, context) {
            //use handlebars style escaping for string replacement
            //only supports unescaped {{{ attributeName }}} and html escaped {{ attributeName }}
            //will string replace recursively until no changes have occured

            var changed = true;
            while (changed) {
                changed = false;
                for (var k in context) {
                    var contextValue = context[k];

                    switch (typeof contextValue) {
                    case "object":
                        continue;
                    case "number":
                        contextValue = Math.floor(contextValue);
                        break;
                    }

                    var regExNoEscaping = new RegExp("((\\{\\{\\{){1}[\\ ]*"+k+"[\\ ]*(\\}\\}\\}){1})","g");
                    var regExEscaped = new RegExp("((\\{\\{){1}[\\ ]*"+k+"[\\ ]*(\\}\\}){1})","g");

                    var preString = string;

                    string = string.replace(regExNoEscaping, contextValue);
                    var escapedText = $("<p>").text(contextValue).html();
                    string = string.replace(regExEscaped, escapedText);

                    if (string != preString) changed = true;

                }
            }

            return string;
        },

        onRemove: function() {
            if (this.model.unsetLocking) this.model.unsetLocking("_isVisible");

            this.removeEventListeners();
        }
        
    }, {
        template: 'assessmentResults'
    });
    
    Adapt.register("assessmentResults", AssessmentResults);
    
    return AssessmentResults;
});

define('components/adapt-contrib-assessmentResultsTotal/js/adapt-contrib-assessmentResultsTotal',['require','coreViews/componentView','coreJS/adapt'],function(require) {

    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var AssessmentResultsTotal = ComponentView.extend({

        events: {
            'inview': 'onInview'
        },

        preRender: function () {
            this.setupEventListeners();
            this.setupModelResetEvent();
            this.checkIfVisible();
        },

        checkIfVisible: function() {

            var wasVisible = this.model.get("_isVisible");
            var isVisibleBeforeCompletion = this.model.get("_isVisibleBeforeCompletion") || false;

            var isVisible = wasVisible && isVisibleBeforeCompletion;

            var assessmentArticleModels = Adapt.assessment.get();
            if (assessmentArticleModels.length === 0) return;

            var isComplete = this.isComplete();

            if (!isVisibleBeforeCompletion) isVisible = isVisible || isComplete;

            this.model.set('_isVisible', isVisible);

            // if assessment(s) already complete then render
            if (isComplete) this.onAssessmentComplete(Adapt.assessment.getState());
        },
        
        isComplete: function() {
            var isComplete = false;

            var assessmentArticleModels = Adapt.assessment.get();
            if (assessmentArticleModels.length === 0) return;

            for (var i = 0, l = assessmentArticleModels.length; i < l; i++) {
                var articleModel = assessmentArticleModels[i];
                var assessmentState = articleModel.getState();
                isComplete = assessmentState.isComplete;
                if (!isComplete) break;
            }

            if (!isComplete) {
                this.model.reset("hard", true);
            }
            
            return isComplete;
        },

        setupModelResetEvent: function() {
            if (this.model.onAssessmentsReset) return;
            this.model.onAssessmentsReset = function(state) {
                this.reset('hard', true);
            };
            this.model.listenTo(Adapt, 'assessments:reset', this.model.onAssessmentsReset);
        },

        postRender: function() {
            this.setReadyStatus();
        },
        setupEventListeners: function() {
            this.listenTo(Adapt, 'assessment:complete', this.onAssessmentComplete);
            this.listenToOnce(Adapt, 'remove', this.onRemove);
        },

        removeEventListeners: function() {;
            this.stopListening(Adapt, 'assessment:complete', this.onAssessmentComplete);
            this.stopListening(Adapt, 'remove', this.onRemove);
        },

        onAssessmentComplete: function(state) {
            this.model.set("_state", state);
            this.setFeedback();

            //show feedback component
            this.render();
            if(!this.model.get('_isVisible')) this.model.set('_isVisible', true);
            
        },

        onInview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }
                
                if (this._isVisibleTop || this._isVisibleBottom) {
                    this.setCompletionStatus();
                    this.$el.off("inview");
                }
            }
        },

        setFeedback: function() {

            var completionBody = this.model.get("_completionBody");
            var feedbackBand = this.getFeedbackBand();

            var state = this.model.get("_state");
            state.feedbackBand = feedbackBand;
            state.feedback = feedbackBand.feedback;

            completionBody = this.stringReplace(completionBody, state);

            this.model.set("body", completionBody);

        },

        getFeedbackBand: function() {
            var state = this.model.get("_state");

            var bands = this.model.get("_bands");
            var scoreAsPercent = state.scoreAsPercent;
            
            for (var i = (bands.length - 1); i >= 0; i--) {
                if (scoreAsPercent >= bands[i]._score) {
                    return bands[i];
                }
            }

            return "";
        },

        stringReplace: function(string, context) {
            //use handlebars style escaping for string replacement
            //only supports unescaped {{{ attributeName }}} and html escaped {{ attributeName }}
            //will string replace recursively until no changes have occured

            var changed = true;
            while (changed) {
                changed = false;
                for (var k in context) {
                    var contextValue = context[k];

                    switch (typeof contextValue) {
                    case "object":
                        continue;
                    case "number":
                        contextValue = Math.floor(contextValue);
                        break;
                    }

                    var regExNoEscaping = new RegExp("((\\{\\{\\{){1}[\\ ]*"+k+"[\\ ]*(\\}\\}\\}){1})","g");
                    var regExEscaped = new RegExp("((\\{\\{){1}[\\ ]*"+k+"[\\ ]*(\\}\\}){1})","g");

                    var preString = string;

                    string = string.replace(regExNoEscaping, contextValue);
                    var escapedText = $("<p>").text(contextValue).html();
                    string = string.replace(regExEscaped, escapedText);

                    if (string != preString) changed = true;

                }
            }

            return string;
        },

        onRemove: function() {
            this.removeEventListeners();
        }
        
    });
    
    Adapt.register("assessmentResultsTotal", AssessmentResultsTotal);
    
});

define('components/adapt-contrib-blank/js/adapt-contrib-blank',['require','coreViews/componentView','coreJS/adapt'],function(require) {

    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var Blank = ComponentView.extend({


        preRender: function() {
            this.$el.addClass("no-state");
            // Checks to see if the blank should be reset on revisit
            this.checkIfResetOnRevisit();
        },

        postRender: function() {
            this.setReadyStatus();
            this.$('.component-inner').on('inview', _.bind(this.inview, this));
        },

        // Used to check if the blank should reset on revisit
        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        },

        inview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }

                if (this._isVisibleTop && this._isVisibleBottom) {
                    this.$('.component-inner').off('inview');
                    this.setCompletionStatus();
                }

            }
        }

    });

    Adapt.register('blank', Blank);

    return Blank;

});

define('components/adapt-contrib-mcq/js/adapt-contrib-mcq',['require','coreViews/questionView','coreJS/adapt'],function(require) {
    var QuestionView = require('coreViews/questionView');
    var Adapt = require('coreJS/adapt');

    var Mcq = QuestionView.extend({

        events: {
            'focus .mcq-item input':'onItemFocus',
            'blur .mcq-item input':'onItemBlur',
            'change .mcq-item input':'onItemSelected',
            'keyup .mcq-item input':'onKeyPress'
        },

        resetQuestionOnRevisit: function() {
            this.setAllItemsEnabled(true);
            this.resetQuestion();
        },

        setupQuestion: function() {
            // if only one answer is selectable, we should display radio buttons not checkboxes
            this.model.set("_isRadio", (this.model.get("_selectable") == 1) );
            
            this.model.set('_selectedItems', []);

            this.setupQuestionItemIndexes();

            this.setupRandomisation();
            
            this.restoreUserAnswers();
        },

        setupQuestionItemIndexes: function() {
            var items = this.model.get("_items");
            if (items && items.length > 0) {
                for (var i = 0, l = items.length; i < l; i++) {
                    if (items[i]._index === undefined) items[i]._index = i;
                }
            }
        },

        setupRandomisation: function() {
            if (this.model.get('_isRandom') && this.model.get('_isEnabled')) {
                this.model.set("_items", _.shuffle(this.model.get("_items")));
            }
        },

        restoreUserAnswers: function() {
            if (!this.model.get("_isSubmitted")) return;

            var selectedItems = [];
            var items = this.model.get("_items");
            var userAnswer = this.model.get("_userAnswer");
            _.each(items, function(item, index) {
                item._isSelected = userAnswer[item._index];
                if (item._isSelected) {
                    selectedItems.push(item)
                }
            });

            this.model.set("_selectedItems", selectedItems);

            this.setQuestionAsSubmitted();
            this.markQuestion();
            this.setScore();
            this.showMarking();
            this.setupFeedback();
        },

        disableQuestion: function() {
            this.setAllItemsEnabled(false);
        },

        enableQuestion: function() {
            this.setAllItemsEnabled(true);
        },

        setAllItemsEnabled: function(isEnabled) {
            _.each(this.model.get('_items'), function(item, index){
                var $itemLabel = this.$('label').eq(index);
                var $itemInput = this.$('input').eq(index);

                if (isEnabled) {
                    $itemLabel.removeClass('disabled');
                    $itemInput.prop('disabled', false);
                } else {
                    $itemLabel.addClass('disabled');
                    $itemInput.prop('disabled', true);
                }
            }, this);
        },

        onQuestionRendered: function() {
            this.setReadyStatus();
        },

        onKeyPress: function(event) {
            if (event.which === 13) { //<ENTER> keypress
                this.onItemSelected(event);
            }
        },

        onItemFocus: function(event) {
            if(this.model.get('_isEnabled') && !this.model.get('_isSubmitted')){
                $("label[for='"+$(event.currentTarget).attr('id')+"']").addClass('highlighted');
            }
        },
        
        onItemBlur: function(event) {
            $("label[for='"+$(event.currentTarget).attr('id')+"']").removeClass('highlighted');
        },

        onItemSelected: function(event) {
            if(this.model.get('_isEnabled') && !this.model.get('_isSubmitted')){
                var selectedItemObject = this.model.get('_items')[$(event.currentTarget).parent('.component-item').index()];
                this.toggleItemSelected(selectedItemObject, event);
            }
        },

        toggleItemSelected:function(item, clickEvent) {
            var selectedItems = this.model.get('_selectedItems');
            var itemIndex = _.indexOf(this.model.get('_items'), item),
                $itemLabel = this.$('label').eq(itemIndex),
                $itemInput = this.$('input').eq(itemIndex),
                selected = !$itemLabel.hasClass('selected');
            
                if(selected) {
                    if(this.model.get('_selectable') === 1){
                        this.$('label').removeClass('selected');
                        this.$('input').prop('checked', false);
                        this.deselectAllItems();
                        selectedItems[0] = item;
                    } else if(selectedItems.length < this.model.get('_selectable')) {
                     selectedItems.push(item);
                 } else {
                    clickEvent.preventDefault();
                    return;
                }
                $itemLabel.addClass('selected');
                $itemLabel.a11y_selected(true);
            } else {
                selectedItems.splice(_.indexOf(selectedItems, item), 1);
                $itemLabel.removeClass('selected');
                $itemLabel.a11y_selected(false);
            }
            $itemInput.prop('checked', selected);
            item._isSelected = selected;
            this.model.set('_selectedItems', selectedItems);
        },

        // check if the user is allowed to submit the question
        canSubmit: function() {
            var count = 0;

            _.each(this.model.get('_items'), function(item) {
                if (item._isSelected) {
                    count++;
                }
            }, this);

            return (count > 0) ? true : false;

        },

        // Blank method to add functionality for when the user cannot submit
        // Could be used for a popup or explanation dialog/hint
        onCannotSubmit: function() {},

        // This is important for returning or showing the users answer
        // This should preserve the state of the users answers
        storeUserAnswer: function() {
            var userAnswer = [];

            var items = this.model.get('_items').slice(0);
            items.sort(function(a, b) {
                return a._index - b._index;
            });

            _.each(items, function(item, index) {
                userAnswer.push(item._isSelected);
            }, this);
            this.model.set('_userAnswer', userAnswer);
        },

        isCorrect: function() {

            var numberOfRequiredAnswers = 0;
            var numberOfCorrectAnswers = 0;
            var numberOfIncorrectAnswers = 0;

            _.each(this.model.get('_items'), function(item, index) {

                var itemSelected = (item._isSelected || false);

                if (item._shouldBeSelected) {
                    numberOfRequiredAnswers ++;

                    if (itemSelected) {
                        numberOfCorrectAnswers ++;
                        
                        item._isCorrect = true;

                        this.model.set('_isAtLeastOneCorrectSelection', true);
                    }

                } else if (!item._shouldBeSelected && itemSelected) {
                    numberOfIncorrectAnswers ++;
                }

            }, this);

            this.model.set('_numberOfCorrectAnswers', numberOfCorrectAnswers);
            this.model.set('_numberOfRequiredAnswers', numberOfRequiredAnswers);

            // Check if correct answers matches correct items and there are no incorrect selections
            var answeredCorrectly = (numberOfCorrectAnswers === numberOfRequiredAnswers) && (numberOfIncorrectAnswers === 0);
            return answeredCorrectly;
        },

        // Sets the score based upon the questionWeight
        // Can be overwritten if the question needs to set the score in a different way
        setScore: function() {
            var questionWeight = this.model.get("_questionWeight");
            var answeredCorrectly = this.model.get('_isCorrect');
            var score = answeredCorrectly ? questionWeight : 0;
            this.model.set('_score', score);
        },

        setupFeedback: function() {

            if (this.model.get('_isCorrect')) {
                this.setupCorrectFeedback();
            } else if (this.isPartlyCorrect()) {
                this.setupPartlyCorrectFeedback();
            } else {
                // apply individual item feedback
                if((this.model.get('_selectable') === 1) && this.model.get('_selectedItems')[0].feedback) {
                    this.setupIndividualFeedback(this.model.get('_selectedItems')[0]);
                    return;
                } else {
                    this.setupIncorrectFeedback();
                }
            }
        },

        setupIndividualFeedback: function(selectedItem) {
             this.model.set({
                 feedbackTitle: this.model.get('title'),
                 feedbackMessage: selectedItem.feedback
             });
        },

        // This is important and should give the user feedback on how they answered the question
        // Normally done through ticks and crosses by adding classes
        showMarking: function() {
            if (!this.model.get('_canShowMarking')) return;

            _.each(this.model.get('_items'), function(item, i) {
                var $item = this.$('.component-item').eq(i);
                $item.removeClass('correct incorrect').addClass(item._isCorrect ? 'correct' : 'incorrect');
            }, this);
        },

        isPartlyCorrect: function() {
            return this.model.get('_isAtLeastOneCorrectSelection');
        },

        resetUserAnswer: function() {
            this.model.set({_userAnswer: []});
        },

        // Used by the question view to reset the look and feel of the component.
        resetQuestion: function() {

            this.deselectAllItems();
            this.resetItems();
        },

        deselectAllItems: function() {
            this.$el.a11y_selected(false);
            _.each(this.model.get('_items'), function(item) {
                item._isSelected = false;
            }, this);
        },

        resetItems: function() {
            this.$('.component-item label').removeClass('selected');
            this.$('.component-item').removeClass('correct incorrect');
            this.$('input').prop('checked', false);
            this.model.set({
                _selectedItems: [],
                _isAtLeastOneCorrectSelection: false
            });
        },

        showCorrectAnswer: function() {
            _.each(this.model.get('_items'), function(item, index) {
                this.setOptionSelected(index, item._shouldBeSelected);
            }, this);
        },

        setOptionSelected:function(index, selected) {
            var $itemLabel = this.$('label').eq(index);
            var $itemInput = this.$('input').eq(index);
            if (selected) {
                $itemLabel.addClass('selected');
                $itemInput.prop('checked', true);
            } else {
                $itemLabel.removeClass('selected');
                $itemInput.prop('checked', false);
            }
        },

        hideCorrectAnswer: function() {
            _.each(this.model.get('_items'), function(item, index) {
                this.setOptionSelected(index, this.model.get('_userAnswer')[item._index]);
            }, this);
        },

        /**
        * used by adapt-contrib-spoor to get the user's answers in the format required by the cmi.interactions.n.student_response data field
        * returns the user's answers as a string in the format "1,5,2"
        */
        getResponse:function() {
            var selected = _.where(this.model.get('_items'), {'_isSelected':true});
            var selectedIndexes = _.pluck(selected, '_index');
            // indexes are 0-based, we need them to be 1-based for cmi.interactions
            for (var i = 0, count = selectedIndexes.length; i < count; i++) {
                selectedIndexes[i]++;
            }
            return selectedIndexes.join(',');
        },

        /**
        * used by adapt-contrib-spoor to get the type of this question in the format required by the cmi.interactions.n.type data field
        */
        getResponseType:function() {
            return "choice";
        }

    });

    Adapt.register("mcq", Mcq);

    return Mcq;
});

define('components/adapt-contrib-gmcq/js/adapt-contrib-gmcq',['require','components/adapt-contrib-mcq/js/adapt-contrib-mcq','coreJS/adapt'],function(require) {
    var Mcq = require('components/adapt-contrib-mcq/js/adapt-contrib-mcq');
    var Adapt = require('coreJS/adapt');

    var Gmcq = Mcq.extend({

        events: function() {

            var events = {
                'focus .gmcq-item input': 'onItemFocus',
                'blur .gmcq-item input': 'onItemBlur',
                'change .gmcq-item input': 'onItemSelected',
                'keyup .gmcq-item input':'onKeyPress'
            };

            if ($('html').hasClass('ie8')) {

                var ie8Events = {
                    'click label img': 'forceChangeEvent'
                };

                events = _.extend(events, ie8Events);
            }

            return events;

        },

        onItemSelected: function(event) {

            var selectedItemObject = this.model.get('_items')[$(event.currentTarget).parent('.gmcq-item').index()];

            if (this.model.get('_isEnabled') && !this.model.get('_isSubmitted')) {
                this.toggleItemSelected(selectedItemObject, event);
            }

        },

        setupQuestion: function() {
            // if only one answer is selectable, we should display radio buttons not checkboxes
            this.model.set("_isRadio", (this.model.get("_selectable") == 1) );

            this.model.set('_selectedItems', []);

            this.setupQuestionItemIndexes();

            this.setupRandomisation();

            this.restoreUserAnswers();

            this.listenTo(Adapt, {
                'device:changed': this.resizeImage,
                'device:resize': this.onDeviceResize
            });

        },

        onQuestionRendered: function() {

            this.resizeImage(Adapt.device.screenSize);
            this.setUpColumns();

            this.$('label').imageready(_.bind(function() {
                this.setReadyStatus();
            }, this));

        },
        
        onDeviceResize: function() {
            this.setUpColumns();
        },

        resizeImage: function(width) {

            var imageWidth = width === 'medium' ? 'small' : width;

            this.$('label').each(function(index) {
                var src = $(this).find('img').attr('data-' + imageWidth);
                $(this).find('img').attr('src', src);
            });

        },

        setUpColumns: function() {
            var columns = this.model.get('_columns');

            if (!columns) return;

            if (Adapt.device.screenSize === 'large') {
                this.$el.addClass('gmcq-column-layout');
                this.$('.gmcq-item').css('width', (100 / columns) + '%');
            } else {
                this.$el.removeClass('gmcq-column-layout');
                this.$('.gmcq-item').css('width', '');
            }
        },

        // hack for IE8
        forceChangeEvent: function(event) {

            $("#" + $(event.currentTarget).closest("label").attr("for")).change();

        }

    }, {
        template: 'gmcq'
    });

    Adapt.register("gmcq", Gmcq);

    return Gmcq;

});

define('components/adapt-contrib-graphic/js/adapt-contrib-graphic',['require','coreViews/componentView','coreJS/adapt'],function(require) {

    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var Graphic = ComponentView.extend({

        preRender: function() {
            this.listenTo(Adapt, 'device:changed', this.resizeImage);

            // Checks to see if the graphic should be reset on revisit
            this.checkIfResetOnRevisit();
        },

        postRender: function() {
            this.resizeImage(Adapt.device.screenSize, true);
        },

        // Used to check if the graphic should reset on revisit
        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        },

        inview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }

                if (this._isVisibleTop && this._isVisibleBottom) {
                    this.$('.component-widget').off('inview');
                    this.setCompletionStatus();
                }

            }
        },

        remove: function() {
          // Remove any 'inview' listener attached.
          this.$('.component-widget').off('inview');

          ComponentView.prototype.remove.apply(this, arguments);
        },

        resizeImage: function(width, setupInView) {
            var imageWidth = width === 'medium' ? 'small' : width;
            var imageSrc = (this.model.get('_graphic')) ? this.model.get('_graphic')[imageWidth] : '';
            this.$('.graphic-widget img').attr('src', imageSrc);

            this.$('.graphic-widget').imageready(_.bind(function() {
                this.setReadyStatus();

                if (setupInView) {
                    // Bind 'inview' once the image is ready.
                    this.$('.component-widget').on('inview', _.bind(this.inview, this));
                }
            }, this));
        }
    });

    Adapt.register('graphic', Graphic);

    return Graphic;

});

define('components/adapt-contrib-hotgraphic/js/adapt-contrib-hotgraphic',['require','coreViews/componentView','coreJS/adapt'],function(require) {

    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var HotGraphic = ComponentView.extend({

        isPopupOpen: false,
        
        initialize: function() {
            this.listenTo(Adapt, 'remove', this.remove);
            this.listenTo(this.model, 'change:_isVisible', this.toggleVisibility);
            this.listenTo(Adapt, 'accessibility:toggle', this.onAccessibilityToggle);
            
            this.model.set('_globals', Adapt.course.get('_globals'));
            
            _.bindAll(this, 'onKeyUp');
            
            this.preRender();
            
            if (this.model.get('_canCycleThroughPagination') === undefined) {
                this.model.set('_canCycleThroughPagination', false);
            }
            if (Adapt.device.screenSize == 'large') {
                this.render();
            } else {
                this.reRender();
            }
        },

        events: function() {
            return {
                'click .hotgraphic-graphic-pin': 'onPinClicked',
                'click .hotgraphic-popup-done': 'closePopup',
                'click .hotgraphic-popup-nav .back': 'previousHotGraphic',
                'click .hotgraphic-popup-nav .next': 'nextHotGraphic'
            }
        },

        preRender: function() {
            this.listenTo(Adapt, 'device:changed', this.reRender, this);

            // Checks to see if the hotgraphic should be reset on revisit
            this.checkIfResetOnRevisit();
        },

        postRender: function() {
            this.renderState();
            this.$('.hotgraphic-widget').imageready(_.bind(function() {
                this.setReadyStatus();
            }, this));

            this.setupEventListeners();
        },

        // Used to check if the hotgraphic should reset on revisit
        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);

                _.each(this.model.get('_items'), function(item) {
                    item._isVisited = false;
                });
            }
        },

        reRender: function() {
            if (Adapt.device.screenSize != 'large') {
                this.replaceWithNarrative();
            }
        },

        inview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }

                if (this._isVisibleTop && this._isVisibleBottom) {
                    this.$('.component-inner').off('inview');
                    this.setCompletionStatus();
                }
            }
        },

        replaceWithNarrative: function() {
            if (!Adapt.componentStore.narrative) throw "Narrative not included in build";
            var Narrative = Adapt.componentStore.narrative;

            var model = this.prepareNarrativeModel();
            var newNarrative = new Narrative({ model: model });
            var $container = $(".component-container", $("." + this.model.get("_parentId")));

            newNarrative.reRender();
            newNarrative.setupNarrative();
            $container.append(newNarrative.$el);
            Adapt.trigger('device:resize');
            _.defer(_.bind(function () {
                this.remove();
            }, this));
        },

        prepareNarrativeModel: function() {
            var model = this.model;
            model.set('_component', 'narrative');
            model.set('_wasHotgraphic', true);
            model.set('originalBody', model.get('body'));
            model.set('originalInstruction', model.get('instruction'));
            if (model.get('mobileBody')) {
                model.set('body', model.get('mobileBody'));
            }
            if (model.get('mobileInstruction')) {
                model.set('instruction', model.get('mobileInstruction'));
            }

            return model;
        },

        applyNavigationClasses: function (index) {
            var $nav = this.$('.hotgraphic-popup-nav'),
                itemCount = this.$('.hotgraphic-item').length;

            $nav.removeClass('first').removeClass('last');
            this.$('.hotgraphic-popup-done').a11y_cntrl_enabled(true);
            if(index <= 0 && !this.model.get('_canCycleThroughPagination')) {
                this.$('.hotgraphic-popup-nav').addClass('first');
                this.$('.hotgraphic-popup-controls.back').a11y_cntrl_enabled(false);
                this.$('.hotgraphic-popup-controls.next').a11y_cntrl_enabled(true);
            } else if (index >= itemCount-1 && !this.model.get('_canCycleThroughPagination')) {
                this.$('.hotgraphic-popup-nav').addClass('last');
                this.$('.hotgraphic-popup-controls.back').a11y_cntrl_enabled(true);
                this.$('.hotgraphic-popup-controls.next').a11y_cntrl_enabled(false);
            } else {
                this.$('.hotgraphic-popup-controls.back').a11y_cntrl_enabled(true);
                this.$('.hotgraphic-popup-controls.next').a11y_cntrl_enabled(true);
            }
            var classes = this.model.get("_items")[index]._classes 
                ? this.model.get("_items")[index]._classes
                : '';  // _classes has not been defined
      
            this.$('.hotgraphic-popup').attr('class', 'hotgraphic-popup ' + 'item-' + index + ' ' + classes);

        },

        onPinClicked: function (event) {
            if(event) event.preventDefault();
            
            this.$('.hotgraphic-popup-inner').a11y_on(false);
            this.$('.hotgraphic-item').hide().removeClass('active');
            
            var $currentHotSpot = this.$('.' + $(event.currentTarget).data('id'));
            $currentHotSpot.show().addClass('active');
            
            var currentIndex = this.$('.hotgraphic-item.active').index();
            this.setVisited(currentIndex);
            
            this.openPopup();
           
            this.applyNavigationClasses(currentIndex);
        },
        
        openPopup: function() {
            var currentIndex = this.$('.hotgraphic-item.active').index();
            this.$('.hotgraphic-popup-count .current').html(currentIndex + 1);
            this.$('.hotgraphic-popup-count .total').html(this.$('.hotgraphic-item').length);
            this.$('.hotgraphic-popup').attr('class', 'hotgraphic-popup item-' + currentIndex).show();
            this.$('.hotgraphic-popup-inner .active').a11y_on(true);
            
            this.isPopupOpen = true;
              
            Adapt.trigger('popup:opened',  this.$('.hotgraphic-popup-inner'));

            this.$('.hotgraphic-popup-inner .active').a11y_focus();
            
            this.setupEscapeKey();
        },

        closePopup: function(event) {
            if(event) event.preventDefault();
            
            this.$('.hotgraphic-popup').hide();
            
            this.isPopupOpen = false;
            
            Adapt.trigger('popup:closed',  this.$('.hotgraphic-popup-inner'));
        },

        previousHotGraphic: function (event) {
            event.preventDefault();
            var currentIndex = this.$('.hotgraphic-item.active').index();

            if (currentIndex === 0 && !this.model.get('_canCycleThroughPagination')) {
                return;
            } else if (currentIndex === 0 && this.model.get('_canCycleThroughPagination')) {
                currentIndex = this.model.get('_items').length;
            }

            this.$('.hotgraphic-item.active').hide().removeClass('active');
            this.$('.hotgraphic-item').eq(currentIndex-1).show().addClass('active');
            this.setVisited(currentIndex-1);
            this.$('.hotgraphic-popup-count .current').html(currentIndex);
            this.$('.hotgraphic-popup-inner').a11y_on(false);

            this.applyNavigationClasses(currentIndex-1);
            this.$('.hotgraphic-popup-inner .active').a11y_on(true);
            this.$('.hotgraphic-popup-inner .active').a11y_focus();
        },

        nextHotGraphic: function (event) {
            event.preventDefault();
            var currentIndex = this.$('.hotgraphic-item.active').index();
            if (currentIndex === (this.model.get('_items').length-1) && !this.model.get('_canCycleThroughPagination')) {
                return;
            } else if (currentIndex === (this.model.get('_items').length-1) && this.model.get('_canCycleThroughPagination')) {
                currentIndex = -1;
            }
            this.$('.hotgraphic-item.active').hide().removeClass('active');
            this.$('.hotgraphic-item').eq(currentIndex+1).show().addClass('active');
            this.setVisited(currentIndex+1);
            this.$('.hotgraphic-popup-count .current').html(currentIndex+2);
            this.$('.hotgraphic-popup-inner').a11y_on(false);

            this.applyNavigationClasses(currentIndex+1);
            this.$('.hotgraphic-popup-inner .active').a11y_on(true);
            this.$('.hotgraphic-popup-inner .active').a11y_focus();
        },

        setVisited: function(index) {
            var item = this.model.get('_items')[index];
            item._isVisited = true;

            var $pin = this.$('.hotgraphic-graphic-pin').eq(index);
            $pin.addClass('visited');
            // append the word 'visited.' to the pin's aria-label
            var visitedLabel = this.model.get('_globals')._accessibility._ariaLabels.visited + ".";
            $pin.attr('aria-label', function(index, val) {return val + " " + visitedLabel});

            $.a11y_alert("visited");

            this.checkCompletionStatus();
        },

        getVisitedItems: function() {
            return _.filter(this.model.get('_items'), function(item) {
                return item._isVisited;
            });
        },

        checkCompletionStatus: function() {
            if (this.getVisitedItems().length == this.model.get('_items').length) {
                this.trigger('allItems');
            }
        },

        onCompletion: function() {
            this.setCompletionStatus();
            if (this.completionEvent && this.completionEvent != 'inview') {
                this.off(this.completionEvent, this);
            }
        },

        setupEventListeners: function() {
            this.completionEvent = (!this.model.get('_setCompletionOn')) ? 'allItems' : this.model.get('_setCompletionOn');
            if (this.completionEvent !== 'inview') {
                this.on(this.completionEvent, _.bind(this.onCompletion, this));
            } else {
                this.$('.component-widget').on('inview', _.bind(this.inview, this));
            }
        },
        
        setupEscapeKey: function() {
            var hasAccessibility = Adapt.config.has('_accessibility') && Adapt.config.get('_accessibility')._isActive;

            if (!hasAccessibility && this.isPopupOpen) {
                $(window).on("keyup", this.onKeyUp);
            } else {
                $(window).off("keyup", this.onKeyUp);
            }
        },

        onAccessibilityToggle: function() {
            this.setupEscapeKey();
        },

        onKeyUp: function(event) {
            if (event.which != 27) return;
            
            event.preventDefault();

            this.closePopup();
        }

    });

    Adapt.register('hotgraphic', HotGraphic);

    return HotGraphic;

});
define('components/adapt-contrib-matching/js/adapt-contrib-matching',['require','coreViews/questionView','coreJS/adapt'],function(require) {

    var QuestionView = require('coreViews/questionView');
    var Adapt = require('coreJS/adapt');

    var Matching = QuestionView.extend({

        // Used by questionView to disable the question during submit and complete stages
        disableQuestion: function() {
            this.$('.matching-select').prop('disabled', true);
        },

        // Used by questionView to enable the question during interactions
        enableQuestion: function() {
            this.$('.matching-select').prop('disabled', false);
        },

        // Used by questionView to reset the question when revisiting the component
        resetQuestionOnRevisit: function() {
            this.resetQuestion();
        },

        setupQuestion: function() {
            this.setupItemIndexes();
            
            this.restoreUserAnswers();

            this.setupRandomisation();
        },

        setupItemIndexes: function() {

            _.each(this.model.get("_items"), function(item, index) {
                if (item._index == undefined) {
                    item._index = index;
                    item._selected = false;
                }
                _.each(item._options, function(option, index) {
                    if (option._index == undefined) {
                        option._index = index;
                        option._isSelected = false;
                    }
                });
            });

        },

        restoreUserAnswers: function() {
            if (!this.model.get("_isSubmitted")) return;

            var userAnswer = this.model.get("_userAnswer");

            _.each(this.model.get("_items"), function(item, index) {
                _.each(item._options, function(option, index) {
                    if (option._index == userAnswer[item._index]) {
                        option._isSelected = true;
                        item._selected = option;
                    }
                });
            });

            this.setQuestionAsSubmitted();
            this.markQuestion();
            this.setScore();
            this.showMarking();
            this.setupFeedback();
        },

        setupRandomisation: function() {
            if (this.model.get('_isRandom') && this.model.get('_isEnabled')) {
                _.each(this.model.get('_items'), function(item) {
                    item._options = _.shuffle(item._options);
                });
            }
        },

        onQuestionRendered: function() {
            this.setReadyStatus();
        },

        canSubmit: function() {

            var canSubmit = true;

            $('.matching-select option:selected', this.el).each(_.bind(function(index, element) {

                var $element = $(element);

                if ($element.index() == 0) {
                    canSubmit = false;
                    $element.parent('.matching-select').addClass('error');
                }
            }, this));

            return canSubmit;
        },

        // Blank method for question to fill out when the question cannot be submitted
        onCannotSubmit: function() {
            //TODO have this highlight all the drop-downs the user has yet to select.
            //Currently it just highlights the first one, even if that one has been selected
        },

        storeUserAnswer: function() {

            var userAnswer = new Array(this.model.get('_items').length);
            var tempUserAnswer = new Array(this.model.get('_items').length);

            _.each(this.model.get('_items'), function(item, index) {

                var $selectedOption = this.$('.matching-select option:selected').eq(index);
                var optionIndex = $selectedOption.index() - 1;

                item._options[optionIndex]._isSelected = true;
                item._selected = item._options[optionIndex];

                tempUserAnswer[item._index] = optionIndex;
                userAnswer[item._index] = item._options[optionIndex]._index;
            }, this);

            this.model.set('_userAnswer', userAnswer);
            this.model.set('_tempUserAnswer', tempUserAnswer);
        },

        isCorrect: function() {

            var numberOfCorrectAnswers = 0;

            _.each(this.model.get('_items'), function(item, index) {

                if (item._selected && item._selected._isCorrect) {
                    numberOfCorrectAnswers++;
                    item._isCorrect = true;
                    this.model.set('_numberOfCorrectAnswers', numberOfCorrectAnswers);
                    this.model.set('_isAtLeastOneCorrectSelection', true);
                } else {
                    item._isCorrect = false;
                }

            }, this);

            this.model.set('_numberOfCorrectAnswers', numberOfCorrectAnswers);

            if (numberOfCorrectAnswers === this.model.get('_items').length) {
                return true;
            } else {
                return false;
            }

        },

        setScore: function() {
            var questionWeight = this.model.get("_questionWeight");

            if (this.model.get('_isCorrect')) {
                this.model.set('_score', questionWeight);
                return;
            }

            var numberOfCorrectAnswers = this.model.get('_numberOfCorrectAnswers');
            var itemLength = this.model.get('_items').length;

            var score = questionWeight * numberOfCorrectAnswers / itemLength;

            this.model.set('_score', score);
        },

        // This is important and should give the user feedback on how they answered the question
        // Normally done through ticks and crosses by adding classes
        showMarking: function() {
            if (!this.model.get('_canShowMarking')) return;

            _.each(this.model.get('_items'), function(item, i) {

                var $item = this.$('.matching-item').eq(i);
                $item.removeClass('correct incorrect').addClass(item._isCorrect ? 'correct' : 'incorrect');
            }, this);
        },

        // Used by the question to determine if the question is incorrect or partly correct
        // Should return a boolean
        isPartlyCorrect: function() {
            return this.model.get('_isAtLeastOneCorrectSelection');
        },

        resetUserAnswer: function() {
            this.model.set({_userAnswer: []});
        },

        // Used by the question view to reset the look and feel of the component.
        resetQuestion: function() {

            this.$('.matching-select option').prop('selected', false);
            
            this.$(".matching-item").removeClass("correct").removeClass("incorrect");
            
            this.model.set('_isAtLeastOneCorrectSelection', false);
            
            _.each(this.$('.matching-select'), function(item) {
                this.selectOption($(item), 0);
            }, this);
            
            _.each(this.model.get("_items"), function(item, index) {
                _.each(item._options, function(option, index) {
                    option._isSelected = false;
                });
            });
        },

        showCorrectAnswer: function() {

            _.each(this.model.get('_items'), function(item, index) {

                var correctOptionIndex;

                _.each(item._options, function(option, optionIndex) {
                    if (option._isCorrect) {
                        correctOptionIndex = optionIndex + 1;
                    }
                }, this);

                var $parent = this.$('.matching-select').eq(index);

                this.selectOption($parent, correctOptionIndex);
            }, this);
        },

        hideCorrectAnswer: function() {

            for (var i = 0, count = this.model.get('_items').length; i < count; i++) {
                var $parent = this.$('.matching-select').eq(i);

                var index = this.model.has('_tempUserAnswer')
                  ? this.model.get('_tempUserAnswer')[i] + 1
                  : this.model.get('_userAnswer')[i] + 1;

                $('option', $parent).eq(index).prop('selected', true);

                this.selectOption($parent, index);
            }
        },

        selectOption: function($parent, optionIndex) {
            $("option", $parent).eq(optionIndex).prop('selected', true);
        },

        /**
        * Used by adapt-contrib-spoor to get the user's answers in the format required by the cmi.interactions.n.student_response data field
        * Returns the user's answers as a string in the format "1.1#2.3#3.2" assuming user selected option 1 in drop-down 1, option 3 in drop-down 2
        * and option 2 in drop-down 3. The '#' character will be changed to either ',' or '[,]' by adapt-contrib-spoor, depending on which SCORM version is being used.
        */
        getResponse: function() {

            var userAnswer = this.model.get('_userAnswer');
            var responses = [];

            for(var i = 0, count = userAnswer.length; i < count; i++) {
                responses.push((i + 1) + "." + (userAnswer[i] + 1));// convert from 0-based to 1-based counting
            }
            
            return responses.join('#');
        },

        /**
        * Used by adapt-contrib-spoor to get the type of this question in the format required by the cmi.interactions.n.type data field
        */
        getResponseType: function() {
            return "matching";
        }

    });

    Adapt.register("matching", Matching);

    return Matching;

});

/*!
 *
 * MediaElement.js
 * HTML5 <video> and <audio> shim and player
 * http://mediaelementjs.com/
 *
 * Creates a JavaScript object that mimics HTML5 MediaElement API
 * for browsers that don't understand HTML5 or can't play the provided codec
 * Can play MP4 (H.264), Ogg, WebM, FLV, WMV, WMA, ACC, and MP3
 *
 * Copyright 2010-2014, John Dyer (http://j.hn)
 * License: MIT
 *
 */
// Namespace
var mejs = mejs || {};

// version number
mejs.version = '2.21.2'; 


// player number (for missing, same id attr)
mejs.meIndex = 0;

// media types accepted by plugins
mejs.plugins = {
	silverlight: [
		{version: [3,0], types: ['video/mp4','video/m4v','video/mov','video/wmv','audio/wma','audio/m4a','audio/mp3','audio/wav','audio/mpeg']}
	],
	flash: [
		{version: [9,0,124], types: ['video/mp4','video/m4v','video/mov','video/flv','video/rtmp','video/x-flv','audio/flv','audio/x-flv','audio/mp3','audio/m4a','audio/mpeg', 'video/dailymotion', 'video/x-dailymotion', 'application/x-mpegURL']}
		// 'video/youtube', 'video/x-youtube', 
		// ,{version: [12,0], types: ['video/webm']} // for future reference (hopefully!)
	],
	youtube: [
		{version: null, types: ['video/youtube', 'video/x-youtube', 'audio/youtube', 'audio/x-youtube']}
	],
	vimeo: [
		{version: null, types: ['video/vimeo', 'video/x-vimeo']}
	]
};

/*
Utility methods
*/
mejs.Utility = {
	encodeUrl: function(url) {
		return encodeURIComponent(url); //.replace(/\?/gi,'%3F').replace(/=/gi,'%3D').replace(/&/gi,'%26');
	},
	escapeHTML: function(s) {
		return s.toString().split('&').join('&amp;').split('<').join('&lt;').split('"').join('&quot;');
	},
	absolutizeUrl: function(url) {
		var el = document.createElement('div');
		el.innerHTML = '<a href="' + this.escapeHTML(url) + '">x</a>';
		return el.firstChild.href;
	},
	getScriptPath: function(scriptNames) {
		var
			i = 0,
			j,
			codePath = '',
			testname = '',
			slashPos,
			filenamePos,
			scriptUrl,
			scriptPath,			
			scriptFilename,
			scripts = document.getElementsByTagName('script'),
			il = scripts.length,
			jl = scriptNames.length;
			
		// go through all <script> tags
		for (; i < il; i++) {
			scriptUrl = scripts[i].src;
			slashPos = scriptUrl.lastIndexOf('/');
			if (slashPos > -1) {
				scriptFilename = scriptUrl.substring(slashPos + 1);
				scriptPath = scriptUrl.substring(0, slashPos + 1);
			} else {
				scriptFilename = scriptUrl;
				scriptPath = '';			
			}
			
			// see if any <script> tags have a file name that matches the 
			for (j = 0; j < jl; j++) {
				testname = scriptNames[j];
				filenamePos = scriptFilename.indexOf(testname);
				if (filenamePos > -1) {
					codePath = scriptPath;
					break;
				}
			}
			
			// if we found a path, then break and return it
			if (codePath !== '') {
				break;
			}
		}
		
		// send the best path back
		return codePath;
	},
	/*
	 * Calculate the time format to use. We have a default format set in the
	 * options but it can be imcomplete. We ajust it according to the media
	 * duration.
	 *
	 * We support format like 'hh:mm:ss:ff'.
	 */
	calculateTimeFormat: function(time, options, fps) {
		if (time < 0) {
			time = 0;
		}

		if(typeof fps == 'undefined') {
		    fps = 25;
		}

		var format = options.timeFormat,
			firstChar = format[0],
			firstTwoPlaces = (format[1] == format[0]),
			separatorIndex = firstTwoPlaces? 2: 1,
			separator = ':',
			hours = Math.floor(time / 3600) % 24,
			minutes = Math.floor(time / 60) % 60,
			seconds = Math.floor(time % 60),
			frames = Math.floor(((time % 1)*fps).toFixed(3)),
			lis = [
				[frames, 'f'],
				[seconds, 's'],
				[minutes, 'm'],
				[hours, 'h']
			];

		// Try to get the separator from the format
		if (format.length < separatorIndex) {
			separator = format[separatorIndex];
		}

		var required = false;

		for (var i=0, len=lis.length; i < len; i++) {
			if (format.indexOf(lis[i][1]) !== -1) {
				required=true;
			}
			else if (required) {
				var hasNextValue = false;
				for (var j=i; j < len; j++) {
					if (lis[j][0] > 0) {
						hasNextValue = true;
						break;
					}
				}

				if (! hasNextValue) {
					break;
				}

				if (!firstTwoPlaces) {
					format = firstChar + format;
				}
				format = lis[i][1] + separator + format;
				if (firstTwoPlaces) {
					format = lis[i][1] + format;
				}
				firstChar = lis[i][1];
			}
		}
		options.currentTimeFormat = format;
	},
	/*
	 * Prefix the given number by zero if it is lower than 10.
	 */
	twoDigitsString: function(n) {
		if (n < 10) {
			return '0' + n;
		}
		return String(n);
	},
	secondsToTimeCode: function(time, options) {
		if (time < 0) {
			time = 0;
		}

		// Maintain backward compatibility with method signature before v2.18.
		if (typeof options !== 'object') {
			var format = 'm:ss';
			format = arguments[1] ? 'hh:mm:ss' : format; // forceHours
			format = arguments[2] ? format + ':ff' : format; // showFrameCount

			options = {
				currentTimeFormat: format,
				framesPerSecond: arguments[3] || 25
			};
		}

		var fps = options.framesPerSecond;
		if(typeof fps === 'undefined') {
			fps = 25;
		}

		var format = options.currentTimeFormat,
			hours = Math.floor(time / 3600) % 24,
			minutes = Math.floor(time / 60) % 60,
			seconds = Math.floor(time % 60),
			frames = Math.floor(((time % 1)*fps).toFixed(3));
			lis = [
				[frames, 'f'],
				[seconds, 's'],
				[minutes, 'm'],
				[hours, 'h']
			];

		var res = format;
		for (i=0,len=lis.length; i < len; i++) {
			res = res.replace(lis[i][1]+lis[i][1], this.twoDigitsString(lis[i][0]));
			res = res.replace(lis[i][1], lis[i][0]);
		}
		return res;
	},
	
	timeCodeToSeconds: function(hh_mm_ss_ff, forceHours, showFrameCount, fps){
		if (typeof showFrameCount == 'undefined') {
		    showFrameCount=false;
		} else if(typeof fps == 'undefined') {
		    fps = 25;
		}
	
		var tc_array = hh_mm_ss_ff.split(":"),
			tc_hh = parseInt(tc_array[0], 10),
			tc_mm = parseInt(tc_array[1], 10),
			tc_ss = parseInt(tc_array[2], 10),
			tc_ff = 0,
			tc_in_seconds = 0;
		
		if (showFrameCount) {
		    tc_ff = parseInt(tc_array[3])/fps;
		}
		
		tc_in_seconds = ( tc_hh * 3600 ) + ( tc_mm * 60 ) + tc_ss + tc_ff;
		
		return tc_in_seconds;
	},
	

	convertSMPTEtoSeconds: function (SMPTE) {
		if (typeof SMPTE != 'string') 
			return false;

		SMPTE = SMPTE.replace(',', '.');
		
		var secs = 0,
			decimalLen = (SMPTE.indexOf('.') != -1) ? SMPTE.split('.')[1].length : 0,
			multiplier = 1;
		
		SMPTE = SMPTE.split(':').reverse();
		
		for (var i = 0; i < SMPTE.length; i++) {
			multiplier = 1;
			if (i > 0) {
				multiplier = Math.pow(60, i); 
			}
			secs += Number(SMPTE[i]) * multiplier;
		}
		return Number(secs.toFixed(decimalLen));
	},	
	
	/* borrowed from SWFObject: http://code.google.com/p/swfobject/source/browse/trunk/swfobject/src/swfobject.js#474 */
	removeSwf: function(id) {
		var obj = document.getElementById(id);
		if (obj && /object|embed/i.test(obj.nodeName)) {
			if (mejs.MediaFeatures.isIE) {
				obj.style.display = "none";
				(function(){
					if (obj.readyState == 4) {
						mejs.Utility.removeObjectInIE(id);
					} else {
						setTimeout(arguments.callee, 10);
					}
				})();
			} else {
				obj.parentNode.removeChild(obj);
			}
		}
	},
	removeObjectInIE: function(id) {
		var obj = document.getElementById(id);
		if (obj) {
			for (var i in obj) {
				if (typeof obj[i] == "function") {
					obj[i] = null;
				}
			}
			obj.parentNode.removeChild(obj);
		}		
	},
    determineScheme: function(url) {
        if (url && url.indexOf("://") != -1) {
            return url.substr(0, url.indexOf("://")+3);
        }
        return "//"; // let user agent figure this out
    }
};


// Core detector, plugins are added below
mejs.PluginDetector = {

	// main public function to test a plug version number PluginDetector.hasPluginVersion('flash',[9,0,125]);
	hasPluginVersion: function(plugin, v) {
		var pv = this.plugins[plugin];
		v[1] = v[1] || 0;
		v[2] = v[2] || 0;
		return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
	},

	// cached values
	nav: window.navigator,
	ua: window.navigator.userAgent.toLowerCase(),

	// stored version numbers
	plugins: [],

	// runs detectPlugin() and stores the version number
	addPlugin: function(p, pluginName, mimeType, activeX, axDetect) {
		this.plugins[p] = this.detectPlugin(pluginName, mimeType, activeX, axDetect);
	},

	// get the version number from the mimetype (all but IE) or ActiveX (IE)
	detectPlugin: function(pluginName, mimeType, activeX, axDetect) {

		var version = [0,0,0],
			description,
			i,
			ax;

		// Firefox, Webkit, Opera
		if (typeof(this.nav.plugins) != 'undefined' && typeof this.nav.plugins[pluginName] == 'object') {
			description = this.nav.plugins[pluginName].description;
			if (description && !(typeof this.nav.mimeTypes != 'undefined' && this.nav.mimeTypes[mimeType] && !this.nav.mimeTypes[mimeType].enabledPlugin)) {
				version = description.replace(pluginName, '').replace(/^\s+/,'').replace(/\sr/gi,'.').split('.');
				for (i=0; i<version.length; i++) {
					version[i] = parseInt(version[i].match(/\d+/), 10);
				}
			}
		// Internet Explorer / ActiveX
		} else if (typeof(window.ActiveXObject) != 'undefined') {
			try {
				ax = new ActiveXObject(activeX);
				if (ax) {
					version = axDetect(ax);
				}
			}
			catch (e) { }
		}
		return version;
	}
};

// Add Flash detection
mejs.PluginDetector.addPlugin('flash','Shockwave Flash','application/x-shockwave-flash','ShockwaveFlash.ShockwaveFlash', function(ax) {
	// adapted from SWFObject
	var version = [],
		d = ax.GetVariable("$version");
	if (d) {
		d = d.split(" ")[1].split(",");
		version = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
	}
	return version;
});

// Add Silverlight detection
mejs.PluginDetector.addPlugin('silverlight','Silverlight Plug-In','application/x-silverlight-2','AgControl.AgControl', function (ax) {
	// Silverlight cannot report its version number to IE
	// but it does have a isVersionSupported function, so we have to loop through it to get a version number.
	// adapted from http://www.silverlightversion.com/
	var v = [0,0,0,0],
		loopMatch = function(ax, v, i, n) {
			while(ax.isVersionSupported(v[0]+ "."+ v[1] + "." + v[2] + "." + v[3])){
				v[i]+=n;
			}
			v[i] -= n;
		};
	loopMatch(ax, v, 0, 1);
	loopMatch(ax, v, 1, 1);
	loopMatch(ax, v, 2, 10000); // the third place in the version number is usually 5 digits (4.0.xxxxx)
	loopMatch(ax, v, 2, 1000);
	loopMatch(ax, v, 2, 100);
	loopMatch(ax, v, 2, 10);
	loopMatch(ax, v, 2, 1);
	loopMatch(ax, v, 3, 1);

	return v;
});
// add adobe acrobat
/*
PluginDetector.addPlugin('acrobat','Adobe Acrobat','application/pdf','AcroPDF.PDF', function (ax) {
	var version = [],
		d = ax.GetVersions().split(',')[0].split('=')[1].split('.');

	if (d) {
		version = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
	}
	return version;
});
*/
// necessary detection (fixes for <IE9)
mejs.MediaFeatures = {
	init: function() {
		var
			t = this,
			d = document,
			nav = mejs.PluginDetector.nav,
			ua = mejs.PluginDetector.ua.toLowerCase(),
			i,
			v,
			html5Elements = ['source','track','audio','video'];

		// detect browsers (only the ones that have some kind of quirk we need to work around)
		t.isiPad = (ua.match(/ipad/i) !== null);
		t.isiPhone = (ua.match(/iphone/i) !== null);
		t.isiOS = t.isiPhone || t.isiPad;
		t.isAndroid = (ua.match(/android/i) !== null);
		t.isBustedAndroid = (ua.match(/android 2\.[12]/) !== null);
		t.isBustedNativeHTTPS = (location.protocol === 'https:' && (ua.match(/android [12]\./) !== null || ua.match(/macintosh.* version.* safari/) !== null));
		t.isIE = (nav.appName.toLowerCase().indexOf("microsoft") != -1 || nav.appName.toLowerCase().match(/trident/gi) !== null);
		t.isChrome = (ua.match(/chrome/gi) !== null);
		t.isChromium = (ua.match(/chromium/gi) !== null);
		t.isFirefox = (ua.match(/firefox/gi) !== null);
		t.isWebkit = (ua.match(/webkit/gi) !== null);
		t.isGecko = (ua.match(/gecko/gi) !== null) && !t.isWebkit && !t.isIE;
		t.isOpera = (ua.match(/opera/gi) !== null);
		t.hasTouch = ('ontouchstart' in window); //  && window.ontouchstart != null); // this breaks iOS 7

		// Borrowed from `Modernizr.svgasimg`, sources:
		// - https://github.com/Modernizr/Modernizr/issues/687
		// - https://github.com/Modernizr/Modernizr/pull/1209/files
		t.svgAsImg = !!document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1');

		// create HTML5 media elements for IE before 9, get a <video> element for fullscreen detection
		for (i=0; i<html5Elements.length; i++) {
			v = document.createElement(html5Elements[i]);
		}

		t.supportsMediaTag = (typeof v.canPlayType !== 'undefined' || t.isBustedAndroid);

		// Fix for IE9 on Windows 7N / Windows 7KN (Media Player not installer)
		try{
			v.canPlayType("video/mp4");
		}catch(e){
			t.supportsMediaTag = false;
		}

		t.supportsPointerEvents = (function() {
			// TAKEN FROM MODERNIZR
			var element = document.createElement('x'),
				documentElement = document.documentElement,
				getComputedStyle = window.getComputedStyle,
				supports;
			if(!('pointerEvents' in element.style)){
				return false;
			}
			element.style.pointerEvents = 'auto';
			element.style.pointerEvents = 'x';
			documentElement.appendChild(element);
			supports = getComputedStyle &&
				getComputedStyle(element, '').pointerEvents === 'auto';
			documentElement.removeChild(element);
			return !!supports;
		})();


		 // Older versions of Firefox can't move plugins around without it resetting,
		t.hasFirefoxPluginMovingProblem = false;

		// detect native JavaScript fullscreen (Safari/Firefox only, Chrome still fails)

		// iOS
		t.hasiOSFullScreen = (typeof v.webkitEnterFullscreen !== 'undefined');

		// W3C
		t.hasNativeFullscreen = (typeof v.requestFullscreen !== 'undefined');

		// webkit/firefox/IE11+
		t.hasWebkitNativeFullScreen = (typeof v.webkitRequestFullScreen !== 'undefined');
		t.hasMozNativeFullScreen = (typeof v.mozRequestFullScreen !== 'undefined');
		t.hasMsNativeFullScreen = (typeof v.msRequestFullscreen !== 'undefined');

		t.hasTrueNativeFullScreen = (t.hasWebkitNativeFullScreen || t.hasMozNativeFullScreen || t.hasMsNativeFullScreen);
		t.nativeFullScreenEnabled = t.hasTrueNativeFullScreen;

		// Enabled?
		if (t.hasMozNativeFullScreen) {
			t.nativeFullScreenEnabled = document.mozFullScreenEnabled;
		} else if (t.hasMsNativeFullScreen) {
			t.nativeFullScreenEnabled = document.msFullscreenEnabled;
		}

		if (t.isChrome) {
			t.hasiOSFullScreen = false;
		}

		if (t.hasTrueNativeFullScreen) {

			t.fullScreenEventName = '';
			if (t.hasWebkitNativeFullScreen) {
				t.fullScreenEventName = 'webkitfullscreenchange';

			} else if (t.hasMozNativeFullScreen) {
				t.fullScreenEventName = 'mozfullscreenchange';

			} else if (t.hasMsNativeFullScreen) {
				t.fullScreenEventName = 'MSFullscreenChange';
			}

			t.isFullScreen = function() {
				if (t.hasMozNativeFullScreen) {
					return d.mozFullScreen;

				} else if (t.hasWebkitNativeFullScreen) {
					return d.webkitIsFullScreen;

				} else if (t.hasMsNativeFullScreen) {
					return d.msFullscreenElement !== null;
				}
			}

			t.requestFullScreen = function(el) {

				if (t.hasWebkitNativeFullScreen) {
					el.webkitRequestFullScreen();

				} else if (t.hasMozNativeFullScreen) {
					el.mozRequestFullScreen();

				} else if (t.hasMsNativeFullScreen) {
					el.msRequestFullscreen();

				}
			}

			t.cancelFullScreen = function() {
				if (t.hasWebkitNativeFullScreen) {
					document.webkitCancelFullScreen();

				} else if (t.hasMozNativeFullScreen) {
					document.mozCancelFullScreen();

				} else if (t.hasMsNativeFullScreen) {
					document.msExitFullscreen();

				}
			}

		}


		// OS X 10.5 can't do this even if it says it can :(
		if (t.hasiOSFullScreen && ua.match(/mac os x 10_5/i)) {
			t.hasNativeFullScreen = false;
			t.hasiOSFullScreen = false;
		}

	}
};
mejs.MediaFeatures.init();

/*
extension methods to <video> or <audio> object to bring it into parity with PluginMediaElement (see below)
*/
mejs.HtmlMediaElement = {
	pluginType: 'native',
	isFullScreen: false,

	setCurrentTime: function (time) {
		this.currentTime = time;
	},

	setMuted: function (muted) {
		this.muted = muted;
	},

	setVolume: function (volume) {
		this.volume = volume;
	},

	// for parity with the plugin versions
	stop: function () {
		this.pause();
	},

	// This can be a url string
	// or an array [{src:'file.mp4',type:'video/mp4'},{src:'file.webm',type:'video/webm'}]
	setSrc: function (url) {
		
		// Fix for IE9 which can't set .src when there are <source> elements. Awesome, right?
		var 
			existingSources = this.getElementsByTagName('source');
		while (existingSources.length > 0){
			this.removeChild(existingSources[0]);
		}
	
		if (typeof url == 'string') {
			this.src = url;
		} else {
			var i, media;

			for (i=0; i<url.length; i++) {
				media = url[i];
				if (this.canPlayType(media.type)) {
					this.src = media.src;
					break;
				}
			}
		}
	},

	setVideoSize: function (width, height) {
		this.width = width;
		this.height = height;
	}
};

/*
Mimics the <video/audio> element by calling Flash's External Interface or Silverlights [ScriptableMember]
*/
mejs.PluginMediaElement = function (pluginid, pluginType, mediaUrl) {
	this.id = pluginid;
	this.pluginType = pluginType;
	this.src = mediaUrl;
	this.events = {};
	this.attributes = {};
};

// JavaScript values and ExternalInterface methods that match HTML5 video properties methods
// http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/fl/video/FLVPlayback.html
// http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html
mejs.PluginMediaElement.prototype = {

	// special
	pluginElement: null,
	pluginType: '',
	isFullScreen: false,

	// not implemented :(
	playbackRate: -1,
	defaultPlaybackRate: -1,
	seekable: [],
	played: [],

	// HTML5 read-only properties
	paused: true,
	ended: false,
	seeking: false,
	duration: 0,
	error: null,
	tagName: '',

	// HTML5 get/set properties, but only set (updated by event handlers)
	muted: false,
	volume: 1,
	currentTime: 0,

	// HTML5 methods
	play: function () {
		if (this.pluginApi != null) {
			if (this.pluginType == 'youtube' || this.pluginType == 'vimeo') {
				this.pluginApi.playVideo();
			} else {
				this.pluginApi.playMedia();
			}
			this.paused = false;
		}
	},
	load: function () {
		if (this.pluginApi != null) {
			if (this.pluginType == 'youtube' || this.pluginType == 'vimeo') {
			} else {
				this.pluginApi.loadMedia();
			}
			
			this.paused = false;
		}
	},
	pause: function () {
		if (this.pluginApi != null) {
			// PATCH -- Prevent looping video on Vimeo and YouTube
			// See: https://github.com/johndyer/mediaelement/issues/1795
			if (this.pluginType == 'youtube' || this.pluginType == 'vimeo') {
					this.pluginApi.pauseVideo();
			} else {
					this.pluginApi.pauseMedia();
			}	
			
			this.paused = true;
		}
	},
	stop: function () {
		if (this.pluginApi != null) {
			if (this.pluginType == 'youtube' || this.pluginType == 'vimeo') {
				this.pluginApi.stopVideo();
			} else {
				this.pluginApi.stopMedia();
			}	
			this.paused = true;
		}
	},
	canPlayType: function(type) {
		var i,
			j,
			pluginInfo,
			pluginVersions = mejs.plugins[this.pluginType];

		for (i=0; i<pluginVersions.length; i++) {
			pluginInfo = pluginVersions[i];

			// test if user has the correct plugin version
			if (mejs.PluginDetector.hasPluginVersion(this.pluginType, pluginInfo.version)) {

				// test for plugin playback types
				for (j=0; j<pluginInfo.types.length; j++) {
					// find plugin that can play the type
					if (type == pluginInfo.types[j]) {
						return 'probably';
					}
				}
			}
		}

		return '';
	},
	
	positionFullscreenButton: function(x,y,visibleAndAbove) {
		if (this.pluginApi != null && this.pluginApi.positionFullscreenButton) {
			this.pluginApi.positionFullscreenButton(Math.floor(x),Math.floor(y),visibleAndAbove);
		}
	},
	
	hideFullscreenButton: function() {
		if (this.pluginApi != null && this.pluginApi.hideFullscreenButton) {
			this.pluginApi.hideFullscreenButton();
		}		
	},	
	

	// custom methods since not all JavaScript implementations support get/set

	// This can be a url string
	// or an array [{src:'file.mp4',type:'video/mp4'},{src:'file.webm',type:'video/webm'}]
	setSrc: function (url) {
		if (typeof url == 'string') {
			this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(url));
			this.src = mejs.Utility.absolutizeUrl(url);
		} else {
			var i, media;

			for (i=0; i<url.length; i++) {
				media = url[i];
				if (this.canPlayType(media.type)) {
					this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(media.src));
					this.src = mejs.Utility.absolutizeUrl(media.src);
					break;
				}
			}
		}

	},
	setCurrentTime: function (time) {
		if (this.pluginApi != null) {
			if (this.pluginType == 'youtube' || this.pluginType == 'vimeo') {
				this.pluginApi.seekTo(time);
			} else {
				this.pluginApi.setCurrentTime(time);
			}				
			
			
			
			this.currentTime = time;
		}
	},
	setVolume: function (volume) {
		if (this.pluginApi != null) {
			// same on YouTube and MEjs
			if (this.pluginType == 'youtube') {
				this.pluginApi.setVolume(volume * 100);
			} else {
				this.pluginApi.setVolume(volume);
			}
			this.volume = volume;
		}
	},
	setMuted: function (muted) {
		if (this.pluginApi != null) {
			if (this.pluginType == 'youtube') {
				if (muted) {
					this.pluginApi.mute();
				} else {
					this.pluginApi.unMute();
				}
				this.muted = muted;
				this.dispatchEvent({type:'volumechange'});
			} else {
				this.pluginApi.setMuted(muted);
			}
			this.muted = muted;
		}
	},

	// additional non-HTML5 methods
	setVideoSize: function (width, height) {
		
		//if (this.pluginType == 'flash' || this.pluginType == 'silverlight') {
			if (this.pluginElement && this.pluginElement.style) {
				this.pluginElement.style.width = width + 'px';
				this.pluginElement.style.height = height + 'px';
			}
			if (this.pluginApi != null && this.pluginApi.setVideoSize) {
				this.pluginApi.setVideoSize(width, height);
			}
		//}
	},

	setFullscreen: function (fullscreen) {
		if (this.pluginApi != null && this.pluginApi.setFullscreen) {
			this.pluginApi.setFullscreen(fullscreen);
		}
	},
	
	enterFullScreen: function() {
		if (this.pluginApi != null && this.pluginApi.setFullscreen) {
			this.setFullscreen(true);
		}		
		
	},
	
	exitFullScreen: function() {
		if (this.pluginApi != null && this.pluginApi.setFullscreen) {
			this.setFullscreen(false);
		}
	},	

	// start: fake events
	addEventListener: function (eventName, callback, bubble) {
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(callback);
	},
	removeEventListener: function (eventName, callback) {
		if (!eventName) { this.events = {}; return true; }
		var callbacks = this.events[eventName];
		if (!callbacks) return true;
		if (!callback) { this.events[eventName] = []; return true; }
		for (var i = 0; i < callbacks.length; i++) {
			if (callbacks[i] === callback) {
				this.events[eventName].splice(i, 1);
				return true;
			}
		}
		return false;
	},	
	dispatchEvent: function (event) {
		var i,
			args,
			callbacks = this.events[event.type];

		if (callbacks) {
			for (i = 0; i < callbacks.length; i++) {
				callbacks[i].apply(this, [event]);
			}
		}
	},
	// end: fake events
	
	// fake DOM attribute methods
	hasAttribute: function(name){
		return (name in this.attributes);  
	},
	removeAttribute: function(name){
		delete this.attributes[name];
	},
	getAttribute: function(name){
		if (this.hasAttribute(name)) {
			return this.attributes[name];
		}
		return '';
	},
	setAttribute: function(name, value){
		this.attributes[name] = value;
	},

	remove: function() {
		mejs.Utility.removeSwf(this.pluginElement.id);

		//non-existant function call
		//mejs.MediaPluginBridge.unregisterPluginElement(this.pluginElement.id);
	}
};

/*
Default options
*/
mejs.MediaElementDefaults = {
	// allows testing on HTML5, flash, silverlight
	// auto: attempts to detect what the browser can do
	// auto_plugin: prefer plugins and then attempt native HTML5
	// native: forces HTML5 playback
	// shim: disallows HTML5, will attempt either Flash or Silverlight
	// none: forces fallback view
	mode: 'auto',
	// remove or reorder to change plugin priority and availability
	plugins: ['flash','silverlight','youtube','vimeo'],
	// shows debug errors on screen
	enablePluginDebug: false,
	// use plugin for browsers that have trouble with Basic Authentication on HTTPS sites
	httpsBasicAuthSite: false,
	// overrides the type specified, useful for dynamic instantiation
	type: '',
	// path to Flash and Silverlight plugins
	pluginPath: mejs.Utility.getScriptPath(['mediaelement.js','mediaelement.min.js','mediaelement-and-player.js','mediaelement-and-player.min.js']),
	// name of flash file
	flashName: 'flashmediaelement.swf',
	// streamer for RTMP streaming
	flashStreamer: '',
	// set to 'always' for CDN version
	flashScriptAccess: 'sameDomain',	
	// turns on the smoothing filter in Flash
	enablePluginSmoothing: false,
	// enabled pseudo-streaming (seek) on .mp4 files
	enablePseudoStreaming: false,
	// start query parameter sent to server for pseudo-streaming
	pseudoStreamingStartQueryParam: 'start',
	// name of silverlight file
	silverlightName: 'silverlightmediaelement.xap',
	// default if the <video width> is not specified
	defaultVideoWidth: 480,
	// default if the <video height> is not specified
	defaultVideoHeight: 270,
	// overrides <video width>
	pluginWidth: -1,
	// overrides <video height>
	pluginHeight: -1,
	// additional plugin variables in 'key=value' form
	pluginVars: [],	
	// rate in milliseconds for Flash and Silverlight to fire the timeupdate event
	// larger number is less accurate, but less strain on plugin->JavaScript bridge
	timerRate: 250,
	// initial volume for player
	startVolume: 0.8,
	success: function () { },
	error: function () { }
};

/*
Determines if a browser supports the <video> or <audio> element
and returns either the native element or a Flash/Silverlight version that
mimics HTML5 MediaElement
*/
mejs.MediaElement = function (el, o) {
	return mejs.HtmlMediaElementShim.create(el,o);
};

mejs.HtmlMediaElementShim = {

	create: function(el, o) {
		var
			options = {},
			htmlMediaElement = (typeof(el) == 'string') ? document.getElementById(el) : el,
			tagName = htmlMediaElement.tagName.toLowerCase(),
			isMediaTag = (tagName === 'audio' || tagName === 'video'),
			src = (isMediaTag) ? htmlMediaElement.getAttribute('src') : htmlMediaElement.getAttribute('href'),
			poster = htmlMediaElement.getAttribute('poster'),
			autoplay =  htmlMediaElement.getAttribute('autoplay'),
			preload =  htmlMediaElement.getAttribute('preload'),
			controls =  htmlMediaElement.getAttribute('controls'),
			playback,
			prop;

		// extend options
		for (prop in mejs.MediaElementDefaults) {
			options[prop] = mejs.MediaElementDefaults[prop];
		}
		for (prop in o) {
			options[prop] = o[prop];
		}		
		

		// clean up attributes
		src = 		(typeof src == 'undefined' 	|| src === null || src == '') ? null : src;		
		poster =	(typeof poster == 'undefined' 	|| poster === null) ? '' : poster;
		preload = 	(typeof preload == 'undefined' 	|| preload === null || preload === 'false') ? 'none' : preload;
		autoplay = 	!(typeof autoplay == 'undefined' || autoplay === null || autoplay === 'false');
		controls = 	!(typeof controls == 'undefined' || controls === null || controls === 'false');

		// test for HTML5 and plugin capabilities
		playback = this.determinePlayback(htmlMediaElement, options, mejs.MediaFeatures.supportsMediaTag, isMediaTag, src);
		playback.url = (playback.url !== null) ? mejs.Utility.absolutizeUrl(playback.url) : '';
        playback.scheme = mejs.Utility.determineScheme(playback.url);

		if (playback.method == 'native') {
			// second fix for android
			if (mejs.MediaFeatures.isBustedAndroid) {
				htmlMediaElement.src = playback.url;
				htmlMediaElement.addEventListener('click', function() {
					htmlMediaElement.play();
				}, false);
			}
		
			// add methods to native HTMLMediaElement
			return this.updateNative(playback, options, autoplay, preload);
		} else if (playback.method !== '') {
			// create plugin to mimic HTMLMediaElement
			
			return this.createPlugin( playback,  options, poster, autoplay, preload, controls);
		} else {
			// boo, no HTML5, no Flash, no Silverlight.
			this.createErrorMessage( playback, options, poster );
			
			return this;
		}
	},
	
	determinePlayback: function(htmlMediaElement, options, supportsMediaTag, isMediaTag, src) {
		var
			mediaFiles = [],
			i,
			j,
			k,
			l,
			n,
			type,
			result = { method: '', url: '', htmlMediaElement: htmlMediaElement, isVideo: (htmlMediaElement.tagName.toLowerCase() != 'audio'), scheme: ''},
			pluginName,
			pluginVersions,
			pluginInfo,
			dummy,
			media;
			
		// STEP 1: Get URL and type from <video src> or <source src>

		// supplied type overrides <video type> and <source type>
		if (typeof options.type != 'undefined' && options.type !== '') {
			
			// accept either string or array of types
			if (typeof options.type == 'string') {
				mediaFiles.push({type:options.type, url:src});
			} else {
				
				for (i=0; i<options.type.length; i++) {
					mediaFiles.push({type:options.type[i], url:src});
				}
			}

		// test for src attribute first
		} else if (src !== null) {
			type = this.formatType(src, htmlMediaElement.getAttribute('type'));
			mediaFiles.push({type:type, url:src});

		// then test for <source> elements
		} else {
			// test <source> types to see if they are usable
			for (i = 0; i < htmlMediaElement.childNodes.length; i++) {
				n = htmlMediaElement.childNodes[i];
				if (n.nodeType == 1 && n.tagName.toLowerCase() == 'source') {
					src = n.getAttribute('src');
					type = this.formatType(src, n.getAttribute('type'));
					media = n.getAttribute('media');

					if (!media || !window.matchMedia || (window.matchMedia && window.matchMedia(media).matches)) {
						mediaFiles.push({type:type, url:src});
					}
				}
			}
		}
		
		// in the case of dynamicly created players
		// check for audio types
		if (!isMediaTag && mediaFiles.length > 0 && mediaFiles[0].url !== null && this.getTypeFromFile(mediaFiles[0].url).indexOf('audio') > -1) {
			result.isVideo = false;
		}
		

		// STEP 2: Test for playback method
		
		// special case for Android which sadly doesn't implement the canPlayType function (always returns '')
		if (mejs.MediaFeatures.isBustedAndroid) {
			htmlMediaElement.canPlayType = function(type) {
				return (type.match(/video\/(mp4|m4v)/gi) !== null) ? 'maybe' : '';
			};
		}		
		
		// special case for Chromium to specify natively supported video codecs (i.e. WebM and Theora) 
		if (mejs.MediaFeatures.isChromium) { 
			htmlMediaElement.canPlayType = function(type) { 
				return (type.match(/video\/(webm|ogv|ogg)/gi) !== null) ? 'maybe' : ''; 
			}; 
		}

		// test for native playback first
		if (supportsMediaTag && (options.mode === 'auto' || options.mode === 'auto_plugin' || options.mode === 'native')  && !(mejs.MediaFeatures.isBustedNativeHTTPS && options.httpsBasicAuthSite === true)) {
						
			if (!isMediaTag) {

				// create a real HTML5 Media Element 
				dummy = document.createElement( result.isVideo ? 'video' : 'audio');			
				htmlMediaElement.parentNode.insertBefore(dummy, htmlMediaElement);
				htmlMediaElement.style.display = 'none';
				
				// use this one from now on
				result.htmlMediaElement = htmlMediaElement = dummy;
			}
				
			for (i=0; i<mediaFiles.length; i++) {
				// normal check
				if (mediaFiles[i].type == "video/m3u8" || htmlMediaElement.canPlayType(mediaFiles[i].type).replace(/no/, '') !== ''
					// special case for Mac/Safari 5.0.3 which answers '' to canPlayType('audio/mp3') but 'maybe' to canPlayType('audio/mpeg')
					|| htmlMediaElement.canPlayType(mediaFiles[i].type.replace(/mp3/,'mpeg')).replace(/no/, '') !== ''
					// special case for m4a supported by detecting mp4 support
					|| htmlMediaElement.canPlayType(mediaFiles[i].type.replace(/m4a/,'mp4')).replace(/no/, '') !== '') {
					result.method = 'native';
					result.url = mediaFiles[i].url;
					break;
				}
			}			
			
			if (result.method === 'native') {
				if (result.url !== null) {
					htmlMediaElement.src = result.url;
				}
			
				// if `auto_plugin` mode, then cache the native result but try plugins.
				if (options.mode !== 'auto_plugin') {
					return result;
				}
			}
		}

		// if native playback didn't work, then test plugins
		if (options.mode === 'auto' || options.mode === 'auto_plugin' || options.mode === 'shim') {
			for (i=0; i<mediaFiles.length; i++) {
				type = mediaFiles[i].type;

				// test all plugins in order of preference [silverlight, flash]
				for (j=0; j<options.plugins.length; j++) {

					pluginName = options.plugins[j];
			
					// test version of plugin (for future features)
					pluginVersions = mejs.plugins[pluginName];				
					
					for (k=0; k<pluginVersions.length; k++) {
						pluginInfo = pluginVersions[k];
					
						// test if user has the correct plugin version
						
						// for youtube/vimeo
						if (pluginInfo.version == null || 
							
							mejs.PluginDetector.hasPluginVersion(pluginName, pluginInfo.version)) {

							// test for plugin playback types
							for (l=0; l<pluginInfo.types.length; l++) {
								// find plugin that can play the type
								if (type.toLowerCase() == pluginInfo.types[l].toLowerCase()) {
									result.method = pluginName;
									result.url = mediaFiles[i].url;
									return result;
								}
							}
						}
					}
				}
			}
		}
		
		// at this point, being in 'auto_plugin' mode implies that we tried plugins but failed.
		// if we have native support then return that.
		if (options.mode === 'auto_plugin' && result.method === 'native') {
			return result;
		}

		// what if there's nothing to play? just grab the first available
		if (result.method === '' && mediaFiles.length > 0) {
			result.url = mediaFiles[0].url;
		}

		return result;
	},

	formatType: function(url, type) {
		// if no type is supplied, fake it with the extension
		if (url && !type) {		
			return this.getTypeFromFile(url);
		} else {
			// only return the mime part of the type in case the attribute contains the codec
			// see http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html#the-source-element
			// `video/mp4; codecs="avc1.42E01E, mp4a.40.2"` becomes `video/mp4`
			
			if (type && ~type.indexOf(';')) {
				return type.substr(0, type.indexOf(';')); 
			} else {
				return type;
			}
		}
	},
	
	getTypeFromFile: function(url) {
		url = url.split('?')[0];
		var
			ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase(),
			av = /(mp4|m4v|ogg|ogv|m3u8|webm|webmv|flv|wmv|mpeg|mov)/gi.test(ext) ? 'video/' : 'audio/';
		return this.getTypeFromExtension(ext, av);
	},
	
	getTypeFromExtension: function(ext, av) {
		av = av || '';
		
		switch (ext) {
			case 'mp4':
			case 'm4v':
			case 'm4a':
			case 'f4v':
			case 'f4a':
				return av + 'mp4';
			case 'flv':
				return av + 'x-flv';
			case 'webm':
			case 'webma':
			case 'webmv':	
				return av + 'webm';
			case 'ogg':
			case 'oga':
			case 'ogv':	
				return av + 'ogg';
			case 'm3u8':
				return 'application/x-mpegurl';
			case 'ts':
				return av + 'mp2t';
			default:
				return av + ext;
		}
	},

	createErrorMessage: function(playback, options, poster) {
		var 
			htmlMediaElement = playback.htmlMediaElement,
			errorContainer = document.createElement('div'),
			errorContent = options.customError;
			
		errorContainer.className = 'me-cannotplay';

		try {
			errorContainer.style.width = htmlMediaElement.width + 'px';
			errorContainer.style.height = htmlMediaElement.height + 'px';
		} catch (e) {}

		if (!errorContent) {
			errorContent = '<a href="' + playback.url + '">';

			if (poster !== '') {
				errorContent += '<img src="' + poster + '" width="100%" height="100%" alt="" />';
			}

			errorContent += '<span>' + mejs.i18n.t('Download File') + '</span></a>';
		}

		errorContainer.innerHTML = errorContent;

		htmlMediaElement.parentNode.insertBefore(errorContainer, htmlMediaElement);
		htmlMediaElement.style.display = 'none';

		options.error(htmlMediaElement);
	},

	createPlugin:function(playback, options, poster, autoplay, preload, controls) {
		var 
			htmlMediaElement = playback.htmlMediaElement,
			width = 1,
			height = 1,
			pluginid = 'me_' + playback.method + '_' + (mejs.meIndex++),
			pluginMediaElement = new mejs.PluginMediaElement(pluginid, playback.method, playback.url),
			container = document.createElement('div'),
			specialIEContainer,
			node,
			initVars;

		// copy tagName from html media element
		pluginMediaElement.tagName = htmlMediaElement.tagName

		// copy attributes from html media element to plugin media element
		for (var i = 0; i < htmlMediaElement.attributes.length; i++) {
			var attribute = htmlMediaElement.attributes[i];
			if (attribute.specified) {
				pluginMediaElement.setAttribute(attribute.name, attribute.value);
			}
		}

		// check for placement inside a <p> tag (sometimes WYSIWYG editors do this)
		node = htmlMediaElement.parentNode;

		while (node !== null && node.tagName != null && node.tagName.toLowerCase() !== 'body' && 
				node.parentNode != null && node.parentNode.tagName != null && node.parentNode.constructor != null && node.parentNode.constructor.name === "ShadowRoot") {
			if (node.parentNode.tagName.toLowerCase() === 'p') {
				node.parentNode.parentNode.insertBefore(node, node.parentNode);
				break;
			}
			node = node.parentNode;
		}

		if (playback.isVideo) {
			width = (options.pluginWidth > 0) ? options.pluginWidth : (options.videoWidth > 0) ? options.videoWidth : (htmlMediaElement.getAttribute('width') !== null) ? htmlMediaElement.getAttribute('width') : options.defaultVideoWidth;
			height = (options.pluginHeight > 0) ? options.pluginHeight : (options.videoHeight > 0) ? options.videoHeight : (htmlMediaElement.getAttribute('height') !== null) ? htmlMediaElement.getAttribute('height') : options.defaultVideoHeight;
		
			// in case of '%' make sure it's encoded
			width = mejs.Utility.encodeUrl(width);
			height = mejs.Utility.encodeUrl(height);
		
		} else {
			if (options.enablePluginDebug) {
				width = 320;
				height = 240;
			}
		}

		// register plugin
		pluginMediaElement.success = options.success;
		
		// add container (must be added to DOM before inserting HTML for IE)
		container.className = 'me-plugin';
		container.id = pluginid + '_container';
		
		if (playback.isVideo) {
				htmlMediaElement.parentNode.insertBefore(container, htmlMediaElement);
		} else {
				document.body.insertBefore(container, document.body.childNodes[0]);
		}
		
		if (playback.method === 'flash' || playback.method === 'silverlight') {

			// flash/silverlight vars
			initVars = [
				'id=' + pluginid,
				'isvideo=' + ((playback.isVideo) ? "true" : "false"),
				'autoplay=' + ((autoplay) ? "true" : "false"),
				'preload=' + preload,
				'width=' + width,
				'startvolume=' + options.startVolume,
				'timerrate=' + options.timerRate,
				'flashstreamer=' + options.flashStreamer,
				'height=' + height,
				'pseudostreamstart=' + options.pseudoStreamingStartQueryParam];
	
			if (playback.url !== null) {
				if (playback.method == 'flash') {
					initVars.push('file=' + mejs.Utility.encodeUrl(playback.url));
				} else {
					initVars.push('file=' + playback.url);
				}
			}
			if (options.enablePluginDebug) {
				initVars.push('debug=true');
			}
			if (options.enablePluginSmoothing) {
				initVars.push('smoothing=true');
			}
			if (options.enablePseudoStreaming) {
				initVars.push('pseudostreaming=true');
			}
			if (controls) {
				initVars.push('controls=true'); // shows controls in the plugin if desired
			}
			if (options.pluginVars) {
				initVars = initVars.concat(options.pluginVars);
			}		
			
			// call from plugin
			window[pluginid + '_init'] = function() {
				switch (pluginMediaElement.pluginType) {
					case 'flash':
						pluginMediaElement.pluginElement = pluginMediaElement.pluginApi = document.getElementById(pluginid);
						break;
					case 'silverlight':
						pluginMediaElement.pluginElement = document.getElementById(pluginMediaElement.id);
						pluginMediaElement.pluginApi = pluginMediaElement.pluginElement.Content.MediaElementJS;
						break;
				}
	
				if (pluginMediaElement.pluginApi != null && pluginMediaElement.success) {
					pluginMediaElement.success(pluginMediaElement, htmlMediaElement);
				}
			}
			
			// event call from plugin
			window[pluginid + '_event'] = function(eventName, values) {
		
				var
					e,
					i,
					bufferedTime;
		        
				// fake event object to mimic real HTML media event.
				e = {
					type: eventName,
					target: pluginMediaElement
				};
		
				// attach all values to element and event object
				for (i in values) {
					pluginMediaElement[i] = values[i];
					e[i] = values[i];
				}
		
				// fake the newer W3C buffered TimeRange (loaded and total have been removed)
				bufferedTime = values.bufferedTime || 0;
		
				e.target.buffered = e.buffered = {
					start: function(index) {
						return 0;
					},
					end: function (index) {
						return bufferedTime;
					},
					length: 1
				};
		
				pluginMediaElement.dispatchEvent(e);
			}			
			
			
		}

		switch (playback.method) {
			case 'silverlight':
				container.innerHTML =
'<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + pluginid + '" name="' + pluginid + '" width="' + width + '" height="' + height + '" class="mejs-shim">' +
'<param name="initParams" value="' + initVars.join(',') + '" />' +
'<param name="windowless" value="true" />' +
'<param name="background" value="black" />' +
'<param name="minRuntimeVersion" value="3.0.0.0" />' +
'<param name="autoUpgrade" value="true" />' +
'<param name="source" value="' + options.pluginPath + options.silverlightName + '" />' +
'</object>';
					break;

			case 'flash':

				if (mejs.MediaFeatures.isIE) {
					specialIEContainer = document.createElement('div');
					container.appendChild(specialIEContainer);
					specialIEContainer.outerHTML =
'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" ' +
'id="' + pluginid + '" width="' + width + '" height="' + height + '" class="mejs-shim">' +
'<param name="movie" value="' + options.pluginPath + options.flashName + '?' + (new Date().getTime()) + '" />' +
'<param name="flashvars" value="' + initVars.join('&amp;') + '" />' +
'<param name="quality" value="high" />' +
'<param name="bgcolor" value="#000000" />' +
'<param name="wmode" value="transparent" />' +
'<param name="allowScriptAccess" value="' + options.flashScriptAccess + '" />' +
'<param name="allowFullScreen" value="true" />' +
'<param name="scale" value="default" />' + 
'</object>';

				} else {

					container.innerHTML =
'<embed id="' + pluginid + '" name="' + pluginid + '" ' +
'play="true" ' +
'loop="false" ' +
'quality="high" ' +
'bgcolor="#000000" ' +
'wmode="transparent" ' +
'allowScriptAccess="' + options.flashScriptAccess + '" ' +
'allowFullScreen="true" ' +
'type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" ' +
'src="' + options.pluginPath + options.flashName + '" ' +
'flashvars="' + initVars.join('&') + '" ' +
'width="' + width + '" ' +
'height="' + height + '" ' +
'scale="default"' + 
'class="mejs-shim"></embed>';
				}
				break;
			
			case 'youtube':
			
				
				var videoId;
				// youtu.be url from share button
				if (playback.url.lastIndexOf("youtu.be") != -1) {
					videoId = playback.url.substr(playback.url.lastIndexOf('/')+1);
					if (videoId.indexOf('?') != -1) {
						videoId = videoId.substr(0, videoId.indexOf('?'));
					}
				}
				else {
					videoId = playback.url.substr(playback.url.lastIndexOf('=')+1);
				}
				youtubeSettings = {
						container: container,
						containerId: container.id,
						pluginMediaElement: pluginMediaElement,
						pluginId: pluginid,
						videoId: videoId,
						height: height,
						width: width,
                        scheme: playback.scheme
					};				
				
				// favor iframe version of YouTube
				if (window.postMessage) {
					mejs.YouTubeApi.enqueueIframe(youtubeSettings);		
				} else if (mejs.PluginDetector.hasPluginVersion('flash', [10,0,0]) ) {
					mejs.YouTubeApi.createFlash(youtubeSettings, options);
				}
				
				break;
			
			// DEMO Code. Does NOT work.
			case 'vimeo':
				var player_id = pluginid + "_player";
				pluginMediaElement.vimeoid = playback.url.substr(playback.url.lastIndexOf('/')+1);
				
				container.innerHTML ='<iframe src="' + playback.scheme + 'player.vimeo.com/video/' + pluginMediaElement.vimeoid + '?api=1&portrait=0&byline=0&title=0&player_id=' + player_id + '" width="' + width +'" height="' + height +'" frameborder="0" class="mejs-shim" id="' + player_id + '" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
				if (typeof($f) == 'function') { // froogaloop available
					var player = $f(container.childNodes[0]),
						playerState = -1;
					
					player.addEvent('ready', function() {
		
						player.playVideo = function() {
							player.api( 'play' );
						} 
						player.stopVideo = function() {
							player.api( 'unload' );
						} 
						player.pauseVideo = function() {
							player.api( 'pause' );
						} 
						player.seekTo = function( seconds ) {
							player.api( 'seekTo', seconds );
						}
						player.setVolume = function( volume ) {
							player.api( 'setVolume', volume );
						}
						player.setMuted = function( muted ) {
							if( muted ) {
								player.lastVolume = player.api( 'getVolume' );
								player.api( 'setVolume', 0 );
							} else {
								player.api( 'setVolume', player.lastVolume );
								delete player.lastVolume;
							}
						}
						// parity with YT player
						player.getPlayerState = function() {
							return playerState;
						}			

						function createEvent(player, pluginMediaElement, eventName, e) {
							var event = {
								type: eventName,
								target: pluginMediaElement
							};
							if (eventName == 'timeupdate') {
								pluginMediaElement.currentTime = event.currentTime = e.seconds;
								pluginMediaElement.duration = event.duration = e.duration;
							}
							pluginMediaElement.dispatchEvent(event);
						}

						player.addEvent('play', function() {
							playerState = 1;
							createEvent(player, pluginMediaElement, 'play');
							createEvent(player, pluginMediaElement, 'playing');
						});

						player.addEvent('pause', function() {
							playerState = 2;							
							createEvent(player, pluginMediaElement, 'pause');
						});

						player.addEvent('finish', function() {
							playerState = 0;							
							createEvent(player, pluginMediaElement, 'ended');
						});

						player.addEvent('playProgress', function(e) {
							createEvent(player, pluginMediaElement, 'timeupdate', e);
						});
						
						player.addEvent('seek', function(e) {
							playerState = 3;
							createEvent(player, pluginMediaElement, 'seeked', e);
						});	
						
						player.addEvent('loadProgress', function(e) {
							playerState = 3;
							createEvent(player, pluginMediaElement, 'progress', e);
						});												

						pluginMediaElement.pluginElement = container;
						pluginMediaElement.pluginApi = player;

						pluginMediaElement.success(pluginMediaElement, pluginMediaElement.pluginElement);						
					});
				}
				else {
					console.warn("You need to include froogaloop for vimeo to work");
				}
				break;			
		}
		// hide original element
		htmlMediaElement.style.display = 'none';
		// prevent browser from autoplaying when using a plugin
		htmlMediaElement.removeAttribute('autoplay');
		
		return pluginMediaElement;
	},

	updateNative: function(playback, options, autoplay, preload) {
		
		var htmlMediaElement = playback.htmlMediaElement,
			m;
		
		
		// add methods to video object to bring it into parity with Flash Object
		for (m in mejs.HtmlMediaElement) {
			htmlMediaElement[m] = mejs.HtmlMediaElement[m];
		}

		/*
		Chrome now supports preload="none"
		if (mejs.MediaFeatures.isChrome) {
		
			// special case to enforce preload attribute (Chrome doesn't respect this)
			if (preload === 'none' && !autoplay) {
			
				// forces the browser to stop loading (note: fails in IE9)
				htmlMediaElement.src = '';
				htmlMediaElement.load();
				htmlMediaElement.canceledPreload = true;

				htmlMediaElement.addEventListener('play',function() {
					if (htmlMediaElement.canceledPreload) {
						htmlMediaElement.src = playback.url;
						htmlMediaElement.load();
						htmlMediaElement.play();
						htmlMediaElement.canceledPreload = false;
					}
				}, false);
			// for some reason Chrome forgets how to autoplay sometimes.
			} else if (autoplay) {
				htmlMediaElement.load();
				htmlMediaElement.play();
			}
		}
		*/

		// fire success code
		options.success(htmlMediaElement, htmlMediaElement);
		
		return htmlMediaElement;
	}
};

/*
 - test on IE (object vs. embed)
 - determine when to use iframe (Firefox, Safari, Mobile) vs. Flash (Chrome, IE)
 - fullscreen?
*/

// YouTube Flash and Iframe API
mejs.YouTubeApi = {
	isIframeStarted: false,
	isIframeLoaded: false,
	loadIframeApi: function(yt) {
		if (!this.isIframeStarted) {
			var tag = document.createElement('script');
			tag.src = yt.scheme + "www.youtube.com/player_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			this.isIframeStarted = true;
		}
	},
	iframeQueue: [],
	enqueueIframe: function(yt) {
		
		if (this.isLoaded) {
			this.createIframe(yt);
		} else {
			this.loadIframeApi(yt);
			this.iframeQueue.push(yt);
		}
	},
	createIframe: function(settings) {
		
		var
		pluginMediaElement = settings.pluginMediaElement,	
		player = new YT.Player(settings.containerId, {
			height: settings.height,
			width: settings.width,
			videoId: settings.videoId,
			playerVars: {controls:0,wmode:'transparent'},
			events: {
				'onReady': function() {
					
					// wrapper to match
					player.setVideoSize = function(width, height) {
						player.setSize(width, height);
					}
					
					// hook up iframe object to MEjs
					settings.pluginMediaElement.pluginApi = player;
					settings.pluginMediaElement.pluginElement = document.getElementById(settings.containerId);
					
					// init mejs
					pluginMediaElement.success(pluginMediaElement, pluginMediaElement.pluginElement);
					
					// create timer
					setInterval(function() {
						mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'timeupdate');
					}, 250);					
				},
				'onStateChange': function(e) {
					
					mejs.YouTubeApi.handleStateChange(e.data, player, pluginMediaElement);
					
				}
			}
		});
	},
	
	createEvent: function (player, pluginMediaElement, eventName) {
		var event = {
			type: eventName,
			target: pluginMediaElement
		};

		if (player && player.getDuration) {
			
			// time 
			pluginMediaElement.currentTime = event.currentTime = player.getCurrentTime();
			pluginMediaElement.duration = event.duration = player.getDuration();
			
			// state
			event.paused = pluginMediaElement.paused;
			event.ended = pluginMediaElement.ended;			
			
			// sound
			event.muted = player.isMuted();
			event.volume = player.getVolume() / 100;
			
			// progress
			event.bytesTotal = player.getVideoBytesTotal();
			event.bufferedBytes = player.getVideoBytesLoaded();
			
			// fake the W3C buffered TimeRange
			var bufferedTime = event.bufferedBytes / event.bytesTotal * event.duration;
			
			event.target.buffered = event.buffered = {
				start: function(index) {
					return 0;
				},
				end: function (index) {
					return bufferedTime;
				},
				length: 1
			};

		}
		
		// send event up the chain
		pluginMediaElement.dispatchEvent(event);
	},	
	
	iFrameReady: function() {
		
		this.isLoaded = true;
		this.isIframeLoaded = true;
		
		while (this.iframeQueue.length > 0) {
			var settings = this.iframeQueue.pop();
			this.createIframe(settings);
		}	
	},
	
	// FLASH!
	flashPlayers: {},
	createFlash: function(settings) {
		
		this.flashPlayers[settings.pluginId] = settings;
		
		/*
		settings.container.innerHTML =
			'<object type="application/x-shockwave-flash" id="' + settings.pluginId + '" data="' + settings.scheme + 'www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=' + settings.pluginId  + '&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0" ' +
				'width="' + settings.width + '" height="' + settings.height + '" style="visibility: visible; " class="mejs-shim">' +
				'<param name="allowScriptAccess" value="sameDomain">' +
				'<param name="wmode" value="transparent">' +
			'</object>';
		*/

		var specialIEContainer,
			youtubeUrl = settings.scheme + 'www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=' + settings.pluginId  + '&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0';
			
		if (mejs.MediaFeatures.isIE) {
			
			specialIEContainer = document.createElement('div');
			settings.container.appendChild(specialIEContainer);
			specialIEContainer.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + settings.scheme + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" ' +
'id="' + settings.pluginId + '" width="' + settings.width + '" height="' + settings.height + '" class="mejs-shim">' +
	'<param name="movie" value="' + youtubeUrl + '" />' +
	'<param name="wmode" value="transparent" />' +
	'<param name="allowScriptAccess" value="' + options.flashScriptAccess + '" />' +
	'<param name="allowFullScreen" value="true" />' +
'</object>';
		} else {
		settings.container.innerHTML =
			'<object type="application/x-shockwave-flash" id="' + settings.pluginId + '" data="' + youtubeUrl + '" ' +
				'width="' + settings.width + '" height="' + settings.height + '" style="visibility: visible; " class="mejs-shim">' +
				'<param name="allowScriptAccess" value="' + options.flashScriptAccess + '">' +
				'<param name="wmode" value="transparent">' +
			'</object>';
		}		
		
	},
	
	flashReady: function(id) {
		var
			settings = this.flashPlayers[id],
			player = document.getElementById(id),
			pluginMediaElement = settings.pluginMediaElement;
		
		// hook up and return to MediaELementPlayer.success	
		pluginMediaElement.pluginApi = 
		pluginMediaElement.pluginElement = player;
		
		settings.success(pluginMediaElement, pluginMediaElement.pluginElement);
		
		// load the youtube video
		player.cueVideoById(settings.videoId);
		
		var callbackName = settings.containerId + '_callback';
		
		window[callbackName] = function(e) {
			mejs.YouTubeApi.handleStateChange(e, player, pluginMediaElement);
		}
		
		player.addEventListener('onStateChange', callbackName);
		
		setInterval(function() {
			mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'timeupdate');
		}, 250);
		
		mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'canplay');
	},
	
	handleStateChange: function(youTubeState, player, pluginMediaElement) {
		switch (youTubeState) {
			case -1: // not started
				pluginMediaElement.paused = true;
				pluginMediaElement.ended = true;
				mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'loadedmetadata');
				//createYouTubeEvent(player, pluginMediaElement, 'loadeddata');
				break;
			case 0:
				pluginMediaElement.paused = false;
				pluginMediaElement.ended = true;
				mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'ended');
				break;
			case 1:
				pluginMediaElement.paused = false;
				pluginMediaElement.ended = false;				
				mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'play');
				mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'playing');
				break;
			case 2:
				pluginMediaElement.paused = true;
				pluginMediaElement.ended = false;				
				mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'pause');
				break;
			case 3: // buffering
				mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'progress');
				break;
			case 5:
				// cued?
				break;						
			
		}			
		
	}
}
// IFRAME
window.onYouTubePlayerAPIReady = function() {
	mejs.YouTubeApi.iFrameReady();
};
// FLASH
window.onYouTubePlayerReady = function(id) {
	mejs.YouTubeApi.flashReady(id);
};

window.mejs = mejs;
window.MediaElement = mejs.MediaElement;

/*
 * Adds Internationalization and localization to mediaelement.
 *
 * This file does not contain translations, you have to add them manually.
 * The schema is always the same: me-i18n-locale-[IETF-language-tag].js
 *
 * Examples are provided both for german and chinese translation.
 *
 *
 * What is the concept beyond i18n?
 *   http://en.wikipedia.org/wiki/Internationalization_and_localization
 *
 * What langcode should i use?
 *   http://en.wikipedia.org/wiki/IETF_language_tag
 *   https://tools.ietf.org/html/rfc5646
 *
 *
 * License?
 *
 *   The i18n file uses methods from the Drupal project (drupal.js):
 *     - i18n.methods.t() (modified)
 *     - i18n.methods.checkPlain() (full copy)
 *
 *   The Drupal project is (like mediaelementjs) licensed under GPLv2.
 *    - http://drupal.org/licensing/faq/#q1
 *    - https://github.com/johndyer/mediaelement
 *    - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 *
 *
 * @author
 *   Tim Latz (latz.tim@gmail.com)
 *
 *
 * @params
 *  - context - document, iframe ..
 *  - exports - CommonJS, window ..
 *
 */
;(function(context, exports, undefined) {
    "use strict";

    var i18n = {
        "locale": {
            // Ensure previous values aren't overwritten.
            "language" : (exports.i18n && exports.i18n.locale.language) || '',
            "strings" : (exports.i18n && exports.i18n.locale.strings) || {}
        },
        "ietf_lang_regex" : /^(x\-)?[a-z]{2,}(\-\w{2,})?(\-\w{2,})?$/,
        "methods" : {}
    };
// start i18n


    /**
     * Get language, fallback to browser's language if empty
     *
     * IETF: RFC 5646, https://tools.ietf.org/html/rfc5646
     * Examples: en, zh-CN, cmn-Hans-CN, sr-Latn-RS, es-419, x-private
     */
    i18n.getLanguage = function () {
        var language = i18n.locale.language || window.navigator.userLanguage || window.navigator.language;
        return i18n.ietf_lang_regex.exec(language) ? language : null;

        //(WAS: convert to iso 639-1 (2-letters, lower case))
        //return language.substr(0, 2).toLowerCase();
    };

    // i18n fixes for compatibility with WordPress
    if ( typeof mejsL10n != 'undefined' ) {
        i18n.locale.language = mejsL10n.language;
    }



    /**
     * Encode special characters in a plain-text string for display as HTML.
     */
    i18n.methods.checkPlain = function (str) {
        var character, regex,
        replace = {
            '&': '&amp;',
            '"': '&quot;',
            '<': '&lt;',
            '>': '&gt;'
        };
        str = String(str);
        for (character in replace) {
            if (replace.hasOwnProperty(character)) {
                regex = new RegExp(character, 'g');
                str = str.replace(regex, replace[character]);
            }
        }
        return str;
    };

    /**
     * Translate strings to the page language or a given language.
     *
     *
     * @param str
     *   A string containing the English string to translate.
     *
     * @param options
     *   - 'context' (defaults to the default context): The context the source string
     *     belongs to.
     *
     * @return
     *   The translated string, escaped via i18n.methods.checkPlain()
     */
    i18n.methods.t = function (str, options) {

        // Fetch the localized version of the string.
        if (i18n.locale.strings && i18n.locale.strings[options.context] && i18n.locale.strings[options.context][str]) {
            str = i18n.locale.strings[options.context][str];
        }

        return i18n.methods.checkPlain(str);
    };


    /**
     * Wrapper for i18n.methods.t()
     *
     * @see i18n.methods.t()
     * @throws InvalidArgumentException
     */
    i18n.t = function(str, options) {

        if (typeof str === 'string' && str.length > 0) {

            // check every time due language can change for
            // different reasons (translation, lang switcher ..)
            var language = i18n.getLanguage();

            options = options || {
                "context" : language
            };

            return i18n.methods.t(str, options);
        }
        else {
            throw {
                "name" : 'InvalidArgumentException',
                "message" : 'First argument is either not a string or empty.'
            };
        }
    };

// end i18n
    exports.i18n = i18n;
}(document, mejs));

// i18n fixes for compatibility with WordPress
;(function(exports, undefined) {

    "use strict";

    if ( typeof mejsL10n != 'undefined' ) {
        exports[mejsL10n.language] = mejsL10n.strings;
    }

}(mejs.i18n.locale.strings));

/*!
 *
 * MediaElementPlayer
 * http://mediaelementjs.com/
 *
 * Creates a controller bar for HTML5 <video> add <audio> tags
 * using jQuery and MediaElement.js (HTML5 Flash/Silverlight wrapper)
 *
 * Copyright 2010-2013, John Dyer (http://j.hn/)
 * License: MIT
 *
 */
if (typeof jQuery != 'undefined') {
	mejs.$ = jQuery;
} else if (typeof Zepto != 'undefined') {
	mejs.$ = Zepto;

	// define `outerWidth` method which has not been realized in Zepto
	Zepto.fn.outerWidth = function(includeMargin) {
		var width = $(this).width();
		if (includeMargin) {
			width += parseInt($(this).css('margin-right'), 10);
			width += parseInt($(this).css('margin-left'), 10);
		}
		return width
	}

} else if (typeof ender != 'undefined') {
	mejs.$ = ender;
}
(function ($) {

	// default player values
	mejs.MepDefaults = {
		// url to poster (to fix iOS 3.x)
		poster: '',
		// When the video is ended, we can show the poster.
		showPosterWhenEnded: false,
		// default if the <video width> is not specified
		defaultVideoWidth: 480,
		// default if the <video height> is not specified
		defaultVideoHeight: 270,
		// if set, overrides <video width>
		videoWidth: -1,
		// if set, overrides <video height>
		videoHeight: -1,
		// default if the user doesn't specify
		defaultAudioWidth: 400,
		// default if the user doesn't specify
		defaultAudioHeight: 30,

		// default amount to move back when back key is pressed
		defaultSeekBackwardInterval: function(media) {
			return (media.duration * 0.05);
		},
		// default amount to move forward when forward key is pressed
		defaultSeekForwardInterval: function(media) {
			return (media.duration * 0.05);
		},

		// set dimensions via JS instead of CSS
		setDimensions: true,

		// width of audio player
		audioWidth: -1,
		// height of audio player
		audioHeight: -1,
		// initial volume when the player starts (overrided by user cookie)
		startVolume: 0.8,
		// useful for <audio> player loops
		loop: false,
		// rewind to beginning when media ends
                autoRewind: true,
		// resize to media dimensions
		enableAutosize: true,

		/*
		 * Time format to use. Default: 'mm:ss'
		 * Supported units:
		 *   h: hour
		 *   m: minute
		 *   s: second
		 *   f: frame count
		 * When using 'hh', 'mm', 'ss' or 'ff' we always display 2 digits.
		 * If you use 'h', 'm', 's' or 'f' we display 1 digit if possible.
		 *
		 * Example to display 75 seconds:
		 * Format 'mm:ss': 01:15
		 * Format 'm:ss': 1:15
		 * Format 'm:s': 1:15
		 */
		timeFormat: '',
		// forces the hour marker (##:00:00)
		alwaysShowHours: false,
		// show framecount in timecode (##:00:00:00)
		showTimecodeFrameCount: false,
		// used when showTimecodeFrameCount is set to true
		framesPerSecond: 25,

		// automatically calculate the width of the progress bar based on the sizes of other elements
		autosizeProgress : true,
		// Hide controls when playing and mouse is not over the video
		alwaysShowControls: false,
		// Display the video control
		hideVideoControlsOnLoad: false,
		// Enable click video element to toggle play/pause
		clickToPlayPause: true,
		// force iPad's native controls
		iPadUseNativeControls: false,
		// force iPhone's native controls
		iPhoneUseNativeControls: false,
		// force Android's native controls
		AndroidUseNativeControls: false,
		// features to show
		features: ['playpause','current','progress','duration','tracks','volume','fullscreen'],
		// only for dynamic
		isVideo: true,

		// turns keyboard support on and off for this instance
		enableKeyboard: true,

		// whenthis player starts, it will pause other players
		pauseOtherPlayers: true,

		// array of keyboard actions such as play pause
		keyActions: [
				{
						keys: [
								32, // SPACE
								179 // GOOGLE play/pause button
							  ],
						action: function(player, media) {
								if (media.paused || media.ended) {
										media.play();
								} else {
										media.pause();
								}
						}
				},
				{
						keys: [38], // UP
						action: function(player, media) {
								player.container.find('.mejs-volume-slider').css('display','block');
								if (player.isVideo) {
										player.showControls();
										player.startControlsTimer();
								}

								var newVolume = Math.min(media.volume + 0.1, 1);
								media.setVolume(newVolume);
						}
				},
				{
						keys: [40], // DOWN
						action: function(player, media) {
								player.container.find('.mejs-volume-slider').css('display','block');
								if (player.isVideo) {
										player.showControls();
										player.startControlsTimer();
								}

								var newVolume = Math.max(media.volume - 0.1, 0);
								media.setVolume(newVolume);
						}
				},
				{
						keys: [
								37, // LEFT
								227 // Google TV rewind
						],
						action: function(player, media) {
								if (!isNaN(media.duration) && media.duration > 0) {
										if (player.isVideo) {
												player.showControls();
												player.startControlsTimer();
										}

										// 5%
										var newTime = Math.max(media.currentTime - player.options.defaultSeekBackwardInterval(media), 0);
										media.setCurrentTime(newTime);
								}
						}
				},
				{
						keys: [
								39, // RIGHT
								228 // Google TV forward
						],
						action: function(player, media) {
								if (!isNaN(media.duration) && media.duration > 0) {
										if (player.isVideo) {
												player.showControls();
												player.startControlsTimer();
										}

										// 5%
										var newTime = Math.min(media.currentTime + player.options.defaultSeekForwardInterval(media), media.duration);
										media.setCurrentTime(newTime);
								}
						}
				},
				{
						keys: [70], // F
						action: function(player, media) {
								if (typeof player.enterFullScreen != 'undefined') {
										if (player.isFullScreen) {
												player.exitFullScreen();
										} else {
												player.enterFullScreen();
										}
								}
						}
				},
				{
						keys: [77], // M
						action: function(player, media) {
								player.container.find('.mejs-volume-slider').css('display','block');
								if (player.isVideo) {
										player.showControls();
										player.startControlsTimer();
								}
								if (player.media.muted) {
										player.setMuted(false);
								} else {
										player.setMuted(true);
								}
						}
				}
		]
	};

	mejs.mepIndex = 0;

	mejs.players = {};

	// wraps a MediaElement object in player controls
	mejs.MediaElementPlayer = function(node, o) {
		// enforce object, even without "new" (via John Resig)
		if ( !(this instanceof mejs.MediaElementPlayer) ) {
			return new mejs.MediaElementPlayer(node, o);
		}

		var t = this;

		// these will be reset after the MediaElement.success fires
		t.$media = t.$node = $(node);
		t.node = t.media = t.$media[0];

		if(!t.node) {
			return
		}

		// check for existing player
		if (typeof t.node.player != 'undefined') {
			return t.node.player;
		}


		// try to get options from data-mejsoptions
		if (typeof o == 'undefined') {
			o = t.$node.data('mejsoptions');
		}

		// extend default options
		t.options = $.extend({},mejs.MepDefaults,o);

		if (!t.options.timeFormat) {
			// Generate the time format according to options
			t.options.timeFormat = 'mm:ss';
			if (t.options.alwaysShowHours) {
				t.options.timeFormat = 'hh:mm:ss';
			}
			if (t.options.showTimecodeFrameCount) {
				t.options.timeFormat += ':ff';
			}
		}

		mejs.Utility.calculateTimeFormat(0, t.options, t.options.framesPerSecond || 25);

		// unique ID
		t.id = 'mep_' + mejs.mepIndex++;

		// add to player array (for focus events)
		mejs.players[t.id] = t;

		// start up
		t.init();

		return t;
	};

	// actual player
	mejs.MediaElementPlayer.prototype = {

		hasFocus: false,

		controlsAreVisible: true,

		init: function() {

			var
				t = this,
				mf = mejs.MediaFeatures,
				// options for MediaElement (shim)
				meOptions = $.extend(true, {}, t.options, {
					success: function(media, domNode) { t.meReady(media, domNode); },
					error: function(e) { t.handleError(e);}
				}),
				tagName = t.media.tagName.toLowerCase();

			t.isDynamic = (tagName !== 'audio' && tagName !== 'video');

			if (t.isDynamic) {
				// get video from src or href?
				t.isVideo = t.options.isVideo;
			} else {
				t.isVideo = (tagName !== 'audio' && t.options.isVideo);
			}

			// use native controls in iPad, iPhone, and Android
			if ((mf.isiPad && t.options.iPadUseNativeControls) || (mf.isiPhone && t.options.iPhoneUseNativeControls)) {

				// add controls and stop
				t.$media.attr('controls', 'controls');

				// attempt to fix iOS 3 bug
				//t.$media.removeAttr('poster');
                                // no Issue found on iOS3 -ttroxell

				// override Apple's autoplay override for iPads
				if (mf.isiPad && t.media.getAttribute('autoplay') !== null) {
					t.play();
				}

			} else if (mf.isAndroid && t.options.AndroidUseNativeControls) {

				// leave default player

			} else {

				// DESKTOP: use MediaElementPlayer controls

				// remove native controls
				t.$media.removeAttr('controls');
				var videoPlayerTitle = t.isVideo ?
					mejs.i18n.t('Video Player') : mejs.i18n.t('Audio Player');
				// insert description for screen readers
				$('<span class="mejs-offscreen">' + videoPlayerTitle + '</span>').insertBefore(t.$media);
				// build container
				t.container =
					$('<div id="' + t.id + '" class="mejs-container ' + (mejs.MediaFeatures.svgAsImg ? 'svg' : 'no-svg') +
					  '" tabindex="0" role="application" aria-label="' + videoPlayerTitle + '">'+
						'<div class="mejs-inner">'+
							'<div class="mejs-mediaelement"></div>'+
							'<div class="mejs-layers"></div>'+
							'<div class="mejs-controls"></div>'+
							'<div class="mejs-clear"></div>'+
						'</div>' +
					'</div>')
					.addClass(t.$media[0].className)
					.insertBefore(t.$media)
					.focus(function ( e ) {
						if( !t.controlsAreVisible ) {
							t.showControls(true);
							var playButton = t.container.find('.mejs-playpause-button > button');
							playButton.focus();
						}
					});

				// add classes for user and content
				t.container.addClass(
					(mf.isAndroid ? 'mejs-android ' : '') +
					(mf.isiOS ? 'mejs-ios ' : '') +
					(mf.isiPad ? 'mejs-ipad ' : '') +
					(mf.isiPhone ? 'mejs-iphone ' : '') +
					(t.isVideo ? 'mejs-video ' : 'mejs-audio ')
				);


				// move the <video/video> tag into the right spot
				t.container.find('.mejs-mediaelement').append(t.$media);

				// needs to be assigned here, after iOS remap
				t.node.player = t;

				// find parts
				t.controls = t.container.find('.mejs-controls');
				t.layers = t.container.find('.mejs-layers');

				// determine the size

				/* size priority:
					(1) videoWidth (forced),
					(2) style="width;height;"
					(3) width attribute,
					(4) defaultVideoWidth (for unspecified cases)
				*/

				var tagType = (t.isVideo ? 'video' : 'audio'),
					capsTagName = tagType.substring(0,1).toUpperCase() + tagType.substring(1);



				if (t.options[tagType + 'Width'] > 0 || t.options[tagType + 'Width'].toString().indexOf('%') > -1) {
					t.width = t.options[tagType + 'Width'];
				} else if (t.media.style.width !== '' && t.media.style.width !== null) {
					t.width = t.media.style.width;
				} else if (t.media.getAttribute('width') !== null) {
					t.width = t.$media.attr('width');
				} else {
					t.width = t.options['default' + capsTagName + 'Width'];
				}

				if (t.options[tagType + 'Height'] > 0 || t.options[tagType + 'Height'].toString().indexOf('%') > -1) {
					t.height = t.options[tagType + 'Height'];
				} else if (t.media.style.height !== '' && t.media.style.height !== null) {
					t.height = t.media.style.height;
				} else if (t.$media[0].getAttribute('height') !== null) {
					t.height = t.$media.attr('height');
				} else {
					t.height = t.options['default' + capsTagName + 'Height'];
				}

				// set the size, while we wait for the plugins to load below
				t.setPlayerSize(t.width, t.height);

				// create MediaElementShim
				meOptions.pluginWidth = t.width;
				meOptions.pluginHeight = t.height;
			}

			// create MediaElement shim
			mejs.MediaElement(t.$media[0], meOptions);

			if (typeof(t.container) != 'undefined' && t.controlsAreVisible){
				// controls are shown when loaded
				t.container.trigger('controlsshown');
			}
		},

		showControls: function(doAnimation) {
			var t = this;

			doAnimation = typeof doAnimation == 'undefined' || doAnimation;

			if (t.controlsAreVisible)
				return;

			if (doAnimation) {
				t.controls
					.removeClass('mejs-offscreen')
					.stop(true, true).fadeIn(200, function() {
						t.controlsAreVisible = true;
						t.container.trigger('controlsshown');
					});

				// any additional controls people might add and want to hide
				t.container.find('.mejs-control')
					.removeClass('mejs-offscreen')
					.stop(true, true).fadeIn(200, function() {t.controlsAreVisible = true;});

			} else {
				t.controls
					.removeClass('mejs-offscreen')
					.css('display','block');

				// any additional controls people might add and want to hide
				t.container.find('.mejs-control')
					.removeClass('mejs-offscreen')
					.css('display','block');

				t.controlsAreVisible = true;
				t.container.trigger('controlsshown');
			}

			t.setControlsSize();

		},

		hideControls: function(doAnimation) {
			var t = this;

			doAnimation = typeof doAnimation == 'undefined' || doAnimation;

			if (!t.controlsAreVisible || t.options.alwaysShowControls || t.keyboardAction)
				return;

			if (doAnimation) {
				// fade out main controls
				t.controls.stop(true, true).fadeOut(200, function() {
					$(this)
						.addClass('mejs-offscreen')
						.css('display','block');

					t.controlsAreVisible = false;
					t.container.trigger('controlshidden');
				});

				// any additional controls people might add and want to hide
				t.container.find('.mejs-control').stop(true, true).fadeOut(200, function() {
					$(this)
						.addClass('mejs-offscreen')
						.css('display','block');
				});
			} else {

				// hide main controls
				t.controls
					.addClass('mejs-offscreen')
					.css('display','block');

				// hide others
				t.container.find('.mejs-control')
					.addClass('mejs-offscreen')
					.css('display','block');

				t.controlsAreVisible = false;
				t.container.trigger('controlshidden');
			}
		},

		controlsTimer: null,

		startControlsTimer: function(timeout) {

			var t = this;

			timeout = typeof timeout != 'undefined' ? timeout : 1500;

			t.killControlsTimer('start');

			t.controlsTimer = setTimeout(function() {
				//
				t.hideControls();
				t.killControlsTimer('hide');
			}, timeout);
		},

		killControlsTimer: function(src) {

			var t = this;

			if (t.controlsTimer !== null) {
				clearTimeout(t.controlsTimer);
				delete t.controlsTimer;
				t.controlsTimer = null;
			}
		},

		controlsEnabled: true,

		disableControls: function() {
			var t= this;

			t.killControlsTimer();
			t.hideControls(false);
			this.controlsEnabled = false;
		},

		enableControls: function() {
			var t= this;

			t.showControls(false);

			t.controlsEnabled = true;
		},


		// Sets up all controls and events
		meReady: function(media, domNode) {


			var t = this,
				mf = mejs.MediaFeatures,
				autoplayAttr = domNode.getAttribute('autoplay'),
				autoplay = !(typeof autoplayAttr == 'undefined' || autoplayAttr === null || autoplayAttr === 'false'),
				featureIndex,
				feature;

			// make sure it can't create itself again if a plugin reloads
			if (t.created) {
				return;
			} else {
				t.created = true;
			}

			t.media = media;
			t.domNode = domNode;

			if (!(mf.isAndroid && t.options.AndroidUseNativeControls) && !(mf.isiPad && t.options.iPadUseNativeControls) && !(mf.isiPhone && t.options.iPhoneUseNativeControls)) {

				// two built in features
				t.buildposter(t, t.controls, t.layers, t.media);
				t.buildkeyboard(t, t.controls, t.layers, t.media);
				t.buildoverlays(t, t.controls, t.layers, t.media);

				// grab for use by features
				t.findTracks();

				// add user-defined features/controls
				for (featureIndex in t.options.features) {
					feature = t.options.features[featureIndex];
					if (t['build' + feature]) {
						try {
							t['build' + feature](t, t.controls, t.layers, t.media);
						} catch (e) {
							// TODO: report control error
							//throw e;
							
							
						}
					}
				}

				t.container.trigger('controlsready');

				// reset all layers and controls
				t.setPlayerSize(t.width, t.height);
				t.setControlsSize();


				// controls fade
				if (t.isVideo) {

					if (mejs.MediaFeatures.hasTouch) {

						// for touch devices (iOS, Android)
						// show/hide without animation on touch

						t.$media.bind('touchstart', function() {


							// toggle controls
							if (t.controlsAreVisible) {
								t.hideControls(false);
							} else {
								if (t.controlsEnabled) {
									t.showControls(false);
								}
							}
						});

					} else {

						// create callback here since it needs access to current
						// MediaElement object
						t.clickToPlayPauseCallback = function() {
							//

							if (t.options.clickToPlayPause) {
								if (t.media.paused) {
									t.play();
								} else {
									t.pause();
								}
							}
						};

						// click to play/pause
						t.media.addEventListener('click', t.clickToPlayPauseCallback, false);

						// show/hide controls
						t.container
							.bind('mouseenter', function () {
								if (t.controlsEnabled) {
									if (!t.options.alwaysShowControls ) {
										t.killControlsTimer('enter');
										t.showControls();
										t.startControlsTimer(2500);
									}
								}
							})
							.bind('mousemove', function() {
								if (t.controlsEnabled) {
									if (!t.controlsAreVisible) {
										t.showControls();
									}
									if (!t.options.alwaysShowControls) {
										t.startControlsTimer(2500);
									}
								}
							})
							.bind('mouseleave', function () {
								if (t.controlsEnabled) {
									if (!t.media.paused && !t.options.alwaysShowControls) {
										t.startControlsTimer(1000);
									}
								}
							});
					}

					if(t.options.hideVideoControlsOnLoad) {
						t.hideControls(false);
					}

					// check for autoplay
					if (autoplay && !t.options.alwaysShowControls) {
						t.hideControls();
					}

					// resizer
					if (t.options.enableAutosize) {
						t.media.addEventListener('loadedmetadata', function(e) {
							// if the <video height> was not set and the options.videoHeight was not set
							// then resize to the real dimensions
							if (t.options.videoHeight <= 0 && t.domNode.getAttribute('height') === null && !isNaN(e.target.videoHeight)) {
								t.setPlayerSize(e.target.videoWidth, e.target.videoHeight);
								t.setControlsSize();
								t.media.setVideoSize(e.target.videoWidth, e.target.videoHeight);
							}
						}, false);
					}
				}

				// EVENTS

				// FOCUS: when a video starts playing, it takes focus from other players (possibily pausing them)
				media.addEventListener('play', function() {
					var playerIndex;

					// go through all other players
					for (playerIndex in mejs.players) {
						var p = mejs.players[playerIndex];
						if (p.id != t.id && t.options.pauseOtherPlayers && !p.paused && !p.ended) {
							p.pause();
						}
						p.hasFocus = false;
					}

					t.hasFocus = true;
				},false);


				// ended for all
				t.media.addEventListener('ended', function (e) {
					if(t.options.autoRewind) {
						try{
							t.media.setCurrentTime(0);
                            // Fixing an Android stock browser bug, where "seeked" isn't fired correctly after ending the video and jumping to the beginning
                            window.setTimeout(function(){
                                $(t.container).find('.mejs-overlay-loading').parent().hide();
                            }, 20);
						} catch (exp) {

						}
					}
					t.media.pause();

					if (t.setProgressRail) {
						t.setProgressRail();
					}
					if (t.setCurrentRail) {
						t.setCurrentRail();
					}

					if (t.options.loop) {
						t.play();
					} else if (!t.options.alwaysShowControls && t.controlsEnabled) {
						t.showControls();
					}
				}, false);

				// resize on the first play
				t.media.addEventListener('loadedmetadata', function(e) {
					if (t.updateDuration) {
						t.updateDuration();
					}
					if (t.updateCurrent) {
						t.updateCurrent();
					}

					if (!t.isFullScreen) {
						t.setPlayerSize(t.width, t.height);
						t.setControlsSize();
					}
				}, false);

				// Only change the time format when necessary
				var duration = null;
				t.media.addEventListener('timeupdate',function() {
					if (duration !== this.duration) {
						duration = this.duration;
						mejs.Utility.calculateTimeFormat(duration, t.options, t.options.framesPerSecond || 25);
						
						// make sure to fill in and resize the controls (e.g., 00:00 => 01:13:15
						if (t.updateDuration) {
							t.updateDuration();
						}
						if (t.updateCurrent) {
							t.updateCurrent();
						}
						t.setControlsSize();
						
					}
				}, false);

				t.container.focusout(function (e) {
					if( e.relatedTarget ) { //FF is working on supporting focusout https://bugzilla.mozilla.org/show_bug.cgi?id=687787
						var $target = $(e.relatedTarget);
						if (t.keyboardAction && $target.parents('.mejs-container').length === 0) {
							t.keyboardAction = false;
							t.hideControls(true);
						}
					}
				});

				// webkit has trouble doing this without a delay
				setTimeout(function () {
					t.setPlayerSize(t.width, t.height);
					t.setControlsSize();
				}, 50);

				// adjust controls whenever window sizes (used to be in fullscreen only)
				t.globalBind('resize', function() {

					// don't resize for fullscreen mode
					if ( !(t.isFullScreen || (mejs.MediaFeatures.hasTrueNativeFullScreen && document.webkitIsFullScreen)) ) {
						t.setPlayerSize(t.width, t.height);
					}

					// always adjust controls
					t.setControlsSize();
				});

				// This is a work-around for a bug in the YouTube iFrame player, which means
				//  we can't use the play() API for the initial playback on iOS or Android;
				//  user has to start playback directly by tapping on the iFrame.
				if (t.media.pluginType == 'youtube' && ( mf.isiOS || mf.isAndroid ) ) {
					t.container.find('.mejs-overlay-play').hide();
                    t.container.find('.mejs-poster').hide();
				}
			}

			// force autoplay for HTML5
			if (autoplay && media.pluginType == 'native') {
				t.play();
			}


			if (t.options.success) {

				if (typeof t.options.success == 'string') {
					window[t.options.success](t.media, t.domNode, t);
				} else {
					t.options.success(t.media, t.domNode, t);
				}
			}
		},

		handleError: function(e) {
			var t = this;

			if (t.controls) {
				t.controls.hide();
			}

			// Tell user that the file cannot be played
			if (t.options.error) {
				t.options.error(e);
			}
		},

		setPlayerSize: function(width,height) {
			var t = this;

			if( !t.options.setDimensions ) {
				return false;
			}

			if (typeof width != 'undefined') {
				t.width = width;
			}

			if (typeof height != 'undefined') {
				t.height = height;
			}

			// detect 100% mode - use currentStyle for IE since css() doesn't return percentages
			if (t.height.toString().indexOf('%') > 0 || (t.$node.css('max-width') !== 'none' && t.$node.css('max-width') !== 't.width') || (t.$node[0].currentStyle && t.$node[0].currentStyle.maxWidth === '100%')) {

				// do we have the native dimensions yet?
				var nativeWidth = (function() {
					if (t.isVideo) {
						if (t.media.videoWidth && t.media.videoWidth > 0) {
							return t.media.videoWidth;
						} else if (t.media.getAttribute('width') !== null) {
							return t.media.getAttribute('width');
						} else {
							return t.options.defaultVideoWidth;
						}
					} else {
						return t.options.defaultAudioWidth;
					}
				})();

				var nativeHeight = (function() {
					if (t.isVideo) {
						if (t.media.videoHeight && t.media.videoHeight > 0) {
							return t.media.videoHeight;
						} else if (t.media.getAttribute('height') !== null) {
							return t.media.getAttribute('height');
						} else {
							return t.options.defaultVideoHeight;
						}
					} else {
						return t.options.defaultAudioHeight;
					}
				})();

				var
					parentWidth = t.container.parent().closest(':visible').width(),
					parentHeight = t.container.parent().closest(':visible').height(),
					newHeight = t.isVideo || !t.options.autosizeProgress ? parseInt(parentWidth * nativeHeight/nativeWidth, 10) : nativeHeight;

				// When we use percent, the newHeight can't be calculated so we get the container height
				if (isNaN(newHeight)) {
					newHeight = parentHeight;
				}

				if (t.container.parent().length > 0 && t.container.parent()[0].tagName.toLowerCase() === 'body') { // && t.container.siblings().count == 0) {
					parentWidth = $(window).width();
					newHeight = $(window).height();
				}

				if ( newHeight && parentWidth ) {

					// set outer container size
					t.container
						.width(parentWidth)
						.height(newHeight);

					// set native <video> or <audio> and shims
					t.$media.add(t.container.find('.mejs-shim'))
						.width('100%')
						.height('100%');

					// if shim is ready, send the size to the embeded plugin
					if (t.isVideo) {
						if (t.media.setVideoSize) {
							t.media.setVideoSize(parentWidth, newHeight);
						}
					}

					// set the layers
					t.layers.children('.mejs-layer')
						.width('100%')
						.height('100%');
				}


			} else {

				t.container
					.width(t.width)
					.height(t.height);

				t.layers.children('.mejs-layer')
					.width(t.width)
					.height(t.height);

			}

		},

		setControlsSize: function() {
			var t = this,
				usedWidth = 0,
				railWidth = 0,
				rail = t.controls.find('.mejs-time-rail'),
				total = t.controls.find('.mejs-time-total'),
				others = rail.siblings(),
				lastControl = others.last(),
				lastControlPosition = null;

			// skip calculation if hidden
			if (!t.container.is(':visible') || !rail.length || !rail.is(':visible')) {
				return;
			}


			// allow the size to come from custom CSS
			if (t.options && !t.options.autosizeProgress) {
				// Also, frontends devs can be more flexible
				// due the opportunity of absolute positioning.
				railWidth = parseInt(rail.css('width'), 10);
			}

			// attempt to autosize
			if (railWidth === 0 || !railWidth) {

				// find the size of all the other controls besides the rail
				others.each(function() {
					var $this = $(this);
					if ($this.css('position') != 'absolute' && $this.is(':visible')) {
						usedWidth += $(this).outerWidth(true);
					}
				});

				// fit the rail into the remaining space
				railWidth = t.controls.width() - usedWidth - (rail.outerWidth(true) - rail.width());
			}

			// resize the rail,
			// but then check if the last control (say, the fullscreen button) got pushed down
			// this often happens when zoomed
			do {
				// outer area
				rail.width(railWidth);
				// dark space
				total.width(railWidth - (total.outerWidth(true) - total.width()));

				if (lastControl.css('position') != 'absolute') {
					lastControlPosition = lastControl.length ? lastControl.position() : null;
					railWidth--;
				}
			} while (lastControlPosition !== null && lastControlPosition.top.toFixed(2) > 0 && railWidth > 0);

			t.container.trigger('controlsresize');
		},


		buildposter: function(player, controls, layers, media) {
			var t = this,
				poster =
				$('<div class="mejs-poster mejs-layer">' +
				'</div>')
					.appendTo(layers),
				posterUrl = player.$media.attr('poster');

			// prioriy goes to option (this is useful if you need to support iOS 3.x (iOS completely fails with poster)
			if (player.options.poster !== '') {
				posterUrl = player.options.poster;
			}

			// second, try the real poster
			if ( posterUrl ) {
				t.setPoster(posterUrl);
			} else {
				poster.hide();
			}

			media.addEventListener('play',function() {
				poster.hide();
			}, false);

			if(player.options.showPosterWhenEnded && player.options.autoRewind){
				media.addEventListener('ended',function() {
					poster.show();
				}, false);
			}
		},

		setPoster: function(url) {
			var t = this,
				posterDiv = t.container.find('.mejs-poster'),
				posterImg = posterDiv.find('img');

			if (posterImg.length === 0) {
				posterImg = $('<img width="100%" height="100%" alt="" />').appendTo(posterDiv);
			}

			posterImg.attr('src', url);
			posterDiv.css({'background-image' : 'url(' + url + ')'});
		},

		buildoverlays: function(player, controls, layers, media) {
            var t = this;
			if (!player.isVideo)
				return;

			var
			loading =
				$('<div class="mejs-overlay mejs-layer">'+
					'<div class="mejs-overlay-loading"><span></span></div>'+
				'</div>')
				.hide() // start out hidden
				.appendTo(layers),
			error =
				$('<div class="mejs-overlay mejs-layer">'+
					'<div class="mejs-overlay-error"></div>'+
				'</div>')
				.hide() // start out hidden
				.appendTo(layers),
			// this needs to come last so it's on top
			bigPlay =
				$('<div class="mejs-overlay mejs-layer mejs-overlay-play">'+
					'<div class="mejs-overlay-button"></div>'+
				'</div>')
				.appendTo(layers)
				.bind('click', function() {  // Removed 'touchstart' due issues on Samsung Android devices where a tap on bigPlay started and immediately stopped the video
					if (t.options.clickToPlayPause) {
						if (media.paused) {
							media.play();
						}
					}
				});

			/*
			if (mejs.MediaFeatures.isiOS || mejs.MediaFeatures.isAndroid) {
				bigPlay.remove();
				loading.remove();
			}
			*/


			// show/hide big play button
			media.addEventListener('play',function() {
				bigPlay.hide();
				loading.hide();
				controls.find('.mejs-time-buffering').hide();
				error.hide();
			}, false);

			media.addEventListener('playing', function() {
				bigPlay.hide();
				loading.hide();
				controls.find('.mejs-time-buffering').hide();
				error.hide();
			}, false);

			media.addEventListener('seeking', function() {
				loading.show();
				controls.find('.mejs-time-buffering').show();
			}, false);

			media.addEventListener('seeked', function() {
				loading.hide();
				controls.find('.mejs-time-buffering').hide();
			}, false);

			media.addEventListener('pause',function() {
				if (!mejs.MediaFeatures.isiPhone) {
					bigPlay.show();
				}
			}, false);

			media.addEventListener('waiting', function() {
				loading.show();
				controls.find('.mejs-time-buffering').show();
			}, false);


			// show/hide loading
			media.addEventListener('loadeddata',function() {
				// for some reason Chrome is firing this event
				//if (mejs.MediaFeatures.isChrome && media.getAttribute && media.getAttribute('preload') === 'none')
				//	return;

				loading.show();
				controls.find('.mejs-time-buffering').show();
                // Firing the 'canplay' event after a timeout which isn't getting fired on some Android 4.1 devices (https://github.com/johndyer/mediaelement/issues/1305)
                if (mejs.MediaFeatures.isAndroid) {
                    media.canplayTimeout = window.setTimeout(
                        function() {
                            if (document.createEvent) {
                                var evt = document.createEvent('HTMLEvents');
                                evt.initEvent('canplay', true, true);
                                return media.dispatchEvent(evt);
                            }
                        }, 300
                    );
                }
			}, false);
			media.addEventListener('canplay',function() {
				loading.hide();
				controls.find('.mejs-time-buffering').hide();
                clearTimeout(media.canplayTimeout); // Clear timeout inside 'loadeddata' to prevent 'canplay' to fire twice
			}, false);

			// error handling
			media.addEventListener('error',function(e) {
				t.handleError(e);
				loading.hide();
				bigPlay.hide();
				error.show();
				error.find('.mejs-overlay-error').html("Error loading this resource");
			}, false);

			media.addEventListener('keydown', function(e) {
				t.onkeydown(player, media, e);
			}, false);
		},

		buildkeyboard: function(player, controls, layers, media) {

				var t = this;

				t.container.keydown(function () {
					t.keyboardAction = true;
				});

				// listen for key presses
				t.globalBind('keydown', function(event) {
					player.hasFocus = $(event.target).closest('.mejs-container').length !== 0
						&& $(event.target).closest('.mejs-container').attr('id') === player.$media.closest('.mejs-container').attr('id');
					return t.onkeydown(player, media, event);
				});


				// check if someone clicked outside a player region, then kill its focus
				t.globalBind('click', function(event) {
					player.hasFocus = $(event.target).closest('.mejs-container').length !== 0;
				});

		},
		onkeydown: function(player, media, e) {
			if (player.hasFocus && player.options.enableKeyboard) {
				// find a matching key
				for (var i = 0, il = player.options.keyActions.length; i < il; i++) {
					var keyAction = player.options.keyActions[i];

					for (var j = 0, jl = keyAction.keys.length; j < jl; j++) {
						if (e.keyCode == keyAction.keys[j]) {
							if (typeof(e.preventDefault) == "function") e.preventDefault();
							keyAction.action(player, media, e.keyCode, e);
							return false;
						}
					}
				}
			}

			return true;
		},

		findTracks: function() {
			var t = this,
				tracktags = t.$media.find('track');

			// store for use by plugins
			t.tracks = [];
			tracktags.each(function(index, track) {

				track = $(track);

				t.tracks.push({
					srclang: (track.attr('srclang')) ? track.attr('srclang').toLowerCase() : '',
					src: track.attr('src'),
					kind: track.attr('kind'),
					label: track.attr('label') || '',
					entries: [],
					isLoaded: false
				});
			});
		},
		changeSkin: function(className) {
			this.container[0].className = 'mejs-container ' + className;
			this.setPlayerSize(this.width, this.height);
			this.setControlsSize();
		},
		play: function() {
			this.load();
			this.media.play();
		},
		pause: function() {
			try {
				this.media.pause();
			} catch (e) {}
		},
		load: function() {
			if (!this.isLoaded) {
				this.media.load();
			}

			this.isLoaded = true;
		},
		setMuted: function(muted) {
			this.media.setMuted(muted);
		},
		setCurrentTime: function(time) {
			this.media.setCurrentTime(time);
		},
		getCurrentTime: function() {
			return this.media.currentTime;
		},
		setVolume: function(volume) {
			this.media.setVolume(volume);
		},
		getVolume: function() {
			return this.media.volume;
		},
		setSrc: function(src) {
			this.media.setSrc(src);
		},
		remove: function() {
			var t = this, featureIndex, feature;

			t.container.prev('.mejs-offscreen').remove();

			// invoke features cleanup
			for (featureIndex in t.options.features) {
				feature = t.options.features[featureIndex];
				if (t['clean' + feature]) {
					try {
						t['clean' + feature](t);
					} catch (e) {
						// TODO: report control error
						//throw e;
						//
						//
					}
				}
			}

			// grab video and put it back in place
			if (!t.isDynamic) {
				t.$media.prop('controls', true);
				// detach events from the video
				// TODO: detach event listeners better than this;
				//       also detach ONLY the events attached by this plugin!
				t.$node.clone().insertBefore(t.container).show();
				t.$node.remove();
			} else {
				t.$node.insertBefore(t.container);
			}

			if (t.media.pluginType !== 'native') {
				t.media.remove();
			}

			// Remove the player from the mejs.players object so that pauseOtherPlayers doesn't blow up when trying to pause a non existance flash api.
			delete mejs.players[t.id];

			if (typeof t.container == 'object') {
				t.container.remove();
			}
			t.globalUnbind();
			delete t.node.player;
		},
		rebuildtracks: function(){
			var t = this;
			t.findTracks();
			t.buildtracks(t, t.controls, t.layers, t.media);
		},
		resetSize: function(){
			var t = this;
			// webkit has trouble doing this without a delay
			setTimeout(function () {
				//
				t.setPlayerSize(t.width, t.height);
				t.setControlsSize();
			}, 50);
		}
	};

	(function(){
		var rwindow = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;

		function splitEvents(events, id) {
			// add player ID as an event namespace so it's easier to unbind them all later
			var ret = {d: [], w: []};
			$.each((events || '').split(' '), function(k, v){
				var eventname = v + '.' + id;
				if (eventname.indexOf('.') === 0) {
					ret.d.push(eventname);
					ret.w.push(eventname);
				}
				else {
					ret[rwindow.test(v) ? 'w' : 'd'].push(eventname);
				}
			});
			ret.d = ret.d.join(' ');
			ret.w = ret.w.join(' ');
			return ret;
		}

		mejs.MediaElementPlayer.prototype.globalBind = function(events, data, callback) {
    		var t = this;
			var doc = t.node ? t.node.ownerDocument : document;

			events = splitEvents(events, t.id);
			if (events.d) $(doc).bind(events.d, data, callback);
			if (events.w) $(window).bind(events.w, data, callback);
		};

		mejs.MediaElementPlayer.prototype.globalUnbind = function(events, callback) {
			var t = this;
			var doc = t.node ? t.node.ownerDocument : document;

			events = splitEvents(events, t.id);
			if (events.d) $(doc).unbind(events.d, callback);
			if (events.w) $(window).unbind(events.w, callback);
		};
	})();

	// turn into jQuery plugin
	if (typeof $ != 'undefined') {
		$.fn.mediaelementplayer = function (options) {
			if (options === false) {
				this.each(function () {
					var player = $(this).data('mediaelementplayer');
					if (player) {
						player.remove();
					}
					$(this).removeData('mediaelementplayer');
				});
			}
			else {
				this.each(function () {
					$(this).data('mediaelementplayer', new mejs.MediaElementPlayer(this, options));
				});
			}
			return this;
		};


		$(document).ready(function() {
			// auto enable using JSON attribute
			$('.mejs-player').mediaelementplayer();
		});
	}

	// push out to window
	window.MediaElementPlayer = mejs.MediaElementPlayer;

})(mejs.$);

(function($) {

	$.extend(mejs.MepDefaults, {
		playText: mejs.i18n.t('Play'),
		pauseText: mejs.i18n.t('Pause')
	});

	// PLAY/pause BUTTON
	$.extend(MediaElementPlayer.prototype, {
		buildplaypause: function(player, controls, layers, media) {
			var 
				t = this,
				op = t.options,
				play = 
				$('<div class="mejs-button mejs-playpause-button mejs-play" >' +
					'<button type="button" aria-controls="' + t.id + '" title="' + op.playText + '" aria-label="' + op.playText + '"></button>' +
				'</div>')
				.appendTo(controls)
				.click(function(e) {
					e.preventDefault();
				
					if (media.paused) {
						media.play();
					} else {
						media.pause();
					}
					
					return false;
				}),
				play_btn = play.find('button');


			function togglePlayPause(which) {
				if ('play' === which) {
					play.removeClass('mejs-play').addClass('mejs-pause');
					play_btn.attr({
						'title': op.pauseText,
						'aria-label': op.pauseText
					});
				} else {
					play.removeClass('mejs-pause').addClass('mejs-play');
					play_btn.attr({
						'title': op.playText,
						'aria-label': op.playText
					});
				}
			};
			togglePlayPause('pse');


			media.addEventListener('play',function() {
				togglePlayPause('play');
			}, false);
			media.addEventListener('playing',function() {
				togglePlayPause('play');
			}, false);


			media.addEventListener('pause',function() {
				togglePlayPause('pse');
			}, false);
			media.addEventListener('paused',function() {
				togglePlayPause('pse');
			}, false);
		}
	});
	
})(mejs.$);

(function($) {

	$.extend(mejs.MepDefaults, {
		stopText: 'Stop'
	});

	// STOP BUTTON
	$.extend(MediaElementPlayer.prototype, {
		buildstop: function(player, controls, layers, media) {
			var t = this;

			$('<div class="mejs-button mejs-stop-button mejs-stop">' +
					'<button type="button" aria-controls="' + t.id + '" title="' + t.options.stopText + '" aria-label="' + t.options.stopText + '"></button>' +
				'</div>')
				.appendTo(controls)
				.click(function() {
					if (!media.paused) {
						media.pause();
					}
					if (media.currentTime > 0) {
						media.setCurrentTime(0);
                        media.pause();
						controls.find('.mejs-time-current').width('0px');
						controls.find('.mejs-time-handle').css('left', '0px');
						controls.find('.mejs-time-float-current').html( mejs.Utility.secondsToTimeCode(0, player.options));
						controls.find('.mejs-currenttime').html( mejs.Utility.secondsToTimeCode(0, player.options));
						layers.find('.mejs-poster').show();
					}
				});
		}
	});
	
})(mejs.$);

(function($) {

	$.extend(mejs.MepDefaults, {
		progessHelpText: mejs.i18n.t(
		'Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.')
	});

	// progress/loaded bar
	$.extend(MediaElementPlayer.prototype, {
		buildprogress: function(player, controls, layers, media) {

			$('<div class="mejs-time-rail">' +
				'<span  class="mejs-time-total mejs-time-slider">' +
				//'<span class="mejs-offscreen">' + this.options.progessHelpText + '</span>' +
					'<span class="mejs-time-buffering"></span>' +
					'<span class="mejs-time-loaded"></span>' +
					'<span class="mejs-time-current"></span>' +
					'<span class="mejs-time-handle"></span>' +
					'<span class="mejs-time-float">' +
						'<span class="mejs-time-float-current">00:00</span>' +
						'<span class="mejs-time-float-corner"></span>' +
					'</span>' +
				'</span>' +
			'</div>')
				.appendTo(controls);
			controls.find('.mejs-time-buffering').hide();

			var 
				t = this,
				total = controls.find('.mejs-time-total'),
				loaded  = controls.find('.mejs-time-loaded'),
				current  = controls.find('.mejs-time-current'),
				handle  = controls.find('.mejs-time-handle'),
				timefloat  = controls.find('.mejs-time-float'),
				timefloatcurrent  = controls.find('.mejs-time-float-current'),
                slider = controls.find('.mejs-time-slider'),
				handleMouseMove = function (e) {
					
                    var offset = total.offset(),
						width = total.width(),
						percentage = 0,
						newTime = 0,
						pos = 0,
                        x;
                    
                    // mouse or touch position relative to the object
					if (e.originalEvent && e.originalEvent.changedTouches) {
						x = e.originalEvent.changedTouches[0].pageX;
					} else if (e.changedTouches) { // for Zepto
						x = e.changedTouches[0].pageX;
					} else {
						x = e.pageX;
					}

					if (media.duration) {
						if (x < offset.left) {
							x = offset.left;
						} else if (x > width + offset.left) {
							x = width + offset.left;
						}
						
						pos = x - offset.left;
						percentage = (pos / width);
						newTime = (percentage <= 0.02) ? 0 : percentage * media.duration;

						// seek to where the mouse is
						if (mouseIsDown && newTime !== media.currentTime) {
							media.setCurrentTime(newTime);
						}

						// position floating time box
						if (!mejs.MediaFeatures.hasTouch) {
								timefloat.css('left', pos);
								timefloatcurrent.html( mejs.Utility.secondsToTimeCode(newTime, player.options) );
								timefloat.show();
						}
					}
				},
				mouseIsDown = false,
				mouseIsOver = false,
				lastKeyPressTime = 0,
				startedPaused = false,
				autoRewindInitial = player.options.autoRewind;
            // Accessibility for slider
            var updateSlider = function (e) {

				var seconds = media.currentTime,
					timeSliderText = mejs.i18n.t('Time Slider'),
					time = mejs.Utility.secondsToTimeCode(seconds, player.options),
					duration = media.duration;

				slider.attr({
					'aria-label': timeSliderText,
					'aria-valuemin': 0,
					'aria-valuemax': duration,
					'aria-valuenow': seconds,
					'aria-valuetext': time,
					'role': 'slider',
					'tabindex': 0
				});

			};

				var restartPlayer = function () {
				var now = new Date();
				if (now - lastKeyPressTime >= 1000) {
					media.play();
				}
			};

			slider.bind('focus', function (e) {
				player.options.autoRewind = false;
			});

			slider.bind('blur', function (e) {
				player.options.autoRewind = autoRewindInitial;
			});

			slider.bind('keydown', function (e) {

				if ((new Date() - lastKeyPressTime) >= 1000) {
					startedPaused = media.paused;
				}

				var keyCode = e.keyCode,
					duration = media.duration,
					seekTime = media.currentTime,
					seekForward  = player.options.defaultSeekForwardInterval(duration),
					seekBackward = player.options.defaultSeekBackwardInterval(duration);

				switch (keyCode) {
				case 37: // left
				case 40: // Down
					seekTime -= seekBackward;
					break;
				case 39: // Right
				case 38: // Up
					seekTime += seekForward;
					break;
				case 36: // Home
					seekTime = 0;
					break;
				case 35: // end
					seekTime = duration;
					break;
				case 32: // space
				case 13: // enter
					media.paused ? media.play() : media.pause();
					return;
				default:
					return;
				}

				seekTime = seekTime < 0 ? 0 : (seekTime >= duration ? duration : Math.floor(seekTime));
				lastKeyPressTime = new Date();
				if (!startedPaused) {
					media.pause();
				}

				if (seekTime < media.duration && !startedPaused) {
					setTimeout(restartPlayer, 1100);
				}

				media.setCurrentTime(seekTime);

				e.preventDefault();
				e.stopPropagation();
				return false;
			});


			// handle clicks
			//controls.find('.mejs-time-rail').delegate('span', 'click', handleMouseMove);
			total
				.bind('mousedown touchstart', function (e) {
					// only handle left clicks or touch
					if (e.which === 1 || e.which === 0) {
						mouseIsDown = true;
						handleMouseMove(e);
						t.globalBind('mousemove.dur touchmove.dur', function(e) {
							handleMouseMove(e);
						});
						t.globalBind('mouseup.dur touchend.dur', function (e) {
							mouseIsDown = false;
							timefloat.hide();
							t.globalUnbind('.dur');
						});
					}
				})
				.bind('mouseenter', function(e) {
					mouseIsOver = true;
					t.globalBind('mousemove.dur', function(e) {
						handleMouseMove(e);
					});
					if (!mejs.MediaFeatures.hasTouch) {
						timefloat.show();
					}
				})
				.bind('mouseleave',function(e) {
					mouseIsOver = false;
					if (!mouseIsDown) {
						t.globalUnbind('.dur');
						timefloat.hide();
					}
				});

			// loading
			media.addEventListener('progress', function (e) {
				player.setProgressRail(e);
				player.setCurrentRail(e);
			}, false);

			// current time
			media.addEventListener('timeupdate', function(e) {
				player.setProgressRail(e);
				player.setCurrentRail(e);
				updateSlider(e);
			}, false);
			
			t.container.on('controlsresize', function() {
				player.setProgressRail();
				player.setCurrentRail();
			});
			
			// store for later use
			t.loaded = loaded;
			t.total = total;
			t.current = current;
			t.handle = handle;
		},
		setProgressRail: function(e) {

			var
				t = this,
				target = (e !== undefined) ? e.target : t.media,
				percent = null;

			// newest HTML5 spec has buffered array (FF4, Webkit)
			if (target && target.buffered && target.buffered.length > 0 && target.buffered.end && target.duration) {
				// account for a real array with multiple values - always read the end of the last buffer
				percent = target.buffered.end(target.buffered.length - 1) / target.duration;
			} 
			// Some browsers (e.g., FF3.6 and Safari 5) cannot calculate target.bufferered.end()
			// to be anything other than 0. If the byte count is available we use this instead.
			// Browsers that support the else if do not seem to have the bufferedBytes value and
			// should skip to there. Tested in Safari 5, Webkit head, FF3.6, Chrome 6, IE 7/8.
			else if (target && target.bytesTotal !== undefined && target.bytesTotal > 0 && target.bufferedBytes !== undefined) {
				percent = target.bufferedBytes / target.bytesTotal;
			}
			// Firefox 3 with an Ogg file seems to go this way
			else if (e && e.lengthComputable && e.total !== 0) {
				percent = e.loaded / e.total;
			}

			// finally update the progress bar
			if (percent !== null) {
				percent = Math.min(1, Math.max(0, percent));
				// update loaded bar
				if (t.loaded && t.total) {
					t.loaded.width(t.total.width() * percent);
				}
			}
		},
		setCurrentRail: function() {

			var t = this;
		
			if (t.media.currentTime !== undefined && t.media.duration) {

				// update bar and handle
				if (t.total && t.handle) {
					var 
						newWidth = Math.round(t.total.width() * t.media.currentTime / t.media.duration),
						handlePos = newWidth - Math.round(t.handle.outerWidth(true) / 2);

					t.current.width(newWidth);
					t.handle.css('left', handlePos);
				}
			}

		}
	});
})(mejs.$);

(function($) {
	
	// options
	$.extend(mejs.MepDefaults, {
		duration: -1,
		timeAndDurationSeparator: '<span> | </span>'
	});


	// current and duration 00:00 / 00:00
	$.extend(MediaElementPlayer.prototype, {
		buildcurrent: function(player, controls, layers, media) {
			var t = this;
			
			$('<div class="mejs-time" role="timer" aria-live="off">' +
					'<span class="mejs-currenttime">' + 
						mejs.Utility.secondsToTimeCode(0, player.options) +
                    '</span>'+
				'</div>')
			.appendTo(controls);
			
			t.currenttime = t.controls.find('.mejs-currenttime');

			media.addEventListener('timeupdate',function() {
				player.updateCurrent();
			}, false);
		},


		buildduration: function(player, controls, layers, media) {
			var t = this;
			
			if (controls.children().last().find('.mejs-currenttime').length > 0) {
				$(t.options.timeAndDurationSeparator +
					'<span class="mejs-duration">' + 
						mejs.Utility.secondsToTimeCode(t.options.duration, t.options) +
					'</span>')
					.appendTo(controls.find('.mejs-time'));
			} else {

				// add class to current time
				controls.find('.mejs-currenttime').parent().addClass('mejs-currenttime-container');
				
				$('<div class="mejs-time mejs-duration-container">'+
					'<span class="mejs-duration">' + 
						mejs.Utility.secondsToTimeCode(t.options.duration, t.options) +
					'</span>' +
				'</div>')
				.appendTo(controls);
			}
			
			t.durationD = t.controls.find('.mejs-duration');

			media.addEventListener('timeupdate',function() {
				player.updateDuration();
			}, false);
		},
		
		updateCurrent:  function() {
			var t = this;
			
			var currentTime = t.media.currentTime;
			
			if (isNaN(currentTime)) {
				currentTime = 0;
			}

			if (t.currenttime) {
				t.currenttime.html(mejs.Utility.secondsToTimeCode(currentTime, t.options));
			}
		},
		
		updateDuration: function() {
			var t = this;
			
			var duration = t.media.duration;
			if (t.options.duration > 0) {
				duration = t.options.duration;
			}
			
			if (isNaN(duration)) {
				duration = 0;
			}

			//Toggle the long video class if the video is longer than an hour.
			t.container.toggleClass("mejs-long-video", duration > 3600);
			
			if (t.durationD && duration > 0) {
				t.durationD.html(mejs.Utility.secondsToTimeCode(duration, t.options));
			}		
		}
	});

})(mejs.$);

(function($) {

	$.extend(mejs.MepDefaults, {
		muteText: mejs.i18n.t('Mute Toggle'),
        allyVolumeControlText: mejs.i18n.t('Use Up/Down Arrow keys to increase or decrease volume.'),
		hideVolumeOnTouchDevices: true,
		
		audioVolume: 'horizontal',
		videoVolume: 'vertical'
	});

	$.extend(MediaElementPlayer.prototype, {
		buildvolume: function(player, controls, layers, media) {
				
			// Android and iOS don't support volume controls
			if ((mejs.MediaFeatures.isAndroid || mejs.MediaFeatures.isiOS) && this.options.hideVolumeOnTouchDevices)
				return;
			
			var t = this,
				mode = (t.isVideo) ? t.options.videoVolume : t.options.audioVolume,
				mute = (mode == 'horizontal') ?
				
				// horizontal version
				$('<div class="mejs-button mejs-volume-button mejs-mute">' +
					'<button type="button" aria-controls="' + t.id + 
						'" title="' + t.options.muteText + 
						'" aria-label="' + t.options.muteText +
					'"></button>'+
				'</div>' +
                  '<a href="javascript:void(0);" class="mejs-horizontal-volume-slider">' + // outer background
					'<span class="mejs-offscreen">' + t.options.allyVolumeControlText + '</span>' +
					'<div class="mejs-horizontal-volume-total"></div>'+ // line background
					'<div class="mejs-horizontal-volume-current"></div>'+ // current volume
					'<div class="mejs-horizontal-volume-handle"></div>'+ // handle
				'</a>'
				)
					.appendTo(controls) :
				
				// vertical version
				$('<div class="mejs-button mejs-volume-button mejs-mute">'+
					'<button type="button" aria-controls="' + t.id + 
						'" title="' + t.options.muteText + 
						'" aria-label="' + t.options.muteText + 
					'"></button>'+
					'<a href="javascript:void(0);" class="mejs-volume-slider">'+ // outer background
						'<span class="mejs-offscreen">' + t.options.allyVolumeControlText + '</span>' +                  
						'<div class="mejs-volume-total"></div>'+ // line background
						'<div class="mejs-volume-current"></div>'+ // current volume
						'<div class="mejs-volume-handle"></div>'+ // handle
					'</a>'+
				'</div>')
					.appendTo(controls),
			volumeSlider = t.container.find('.mejs-volume-slider, .mejs-horizontal-volume-slider'),
			volumeTotal = t.container.find('.mejs-volume-total, .mejs-horizontal-volume-total'),
			volumeCurrent = t.container.find('.mejs-volume-current, .mejs-horizontal-volume-current'),
			volumeHandle = t.container.find('.mejs-volume-handle, .mejs-horizontal-volume-handle'),

			positionVolumeHandle = function(volume, secondTry) {

				if (!volumeSlider.is(':visible') && typeof secondTry == 'undefined') {
					volumeSlider.show();
					positionVolumeHandle(volume, true);
					volumeSlider.hide();
					return;
				}

				// correct to 0-1
				volume = Math.max(0,volume);
				volume = Math.min(volume,1);

				// ajust mute button style
				if (volume === 0) {
					mute.removeClass('mejs-mute').addClass('mejs-unmute');
					mute.children('button').attr('title', mejs.i18n.t('Unmute')).attr('aria-label', mejs.i18n.t('Unmute'));
				} else {
					mute.removeClass('mejs-unmute').addClass('mejs-mute');
					mute.children('button').attr('title', mejs.i18n.t('Mute')).attr('aria-label', mejs.i18n.t('Mute'));
				}

                // top/left of full size volume slider background
                var totalPosition = volumeTotal.position();
				// position slider 
				if (mode == 'vertical') {
					var
                    // height of the full size volume slider background
						totalHeight = volumeTotal.height(),

                        // the new top position based on the current volume
						// 70% volume on 100px height == top:30px
						newTop = totalHeight - (totalHeight * volume);
	
					// handle
					volumeHandle.css('top', Math.round(totalPosition.top + newTop - (volumeHandle.height() / 2)));
	
					// show the current visibility
					volumeCurrent.height(totalHeight - newTop );
					volumeCurrent.css('top', totalPosition.top + newTop);
				} else {
                    var
						// height of the full size volume slider background
						totalWidth = volumeTotal.width(),
						
						// the new left position based on the current volume
						newLeft = totalWidth * volume;
	
					// handle
					volumeHandle.css('left', Math.round(totalPosition.left + newLeft - (volumeHandle.width() / 2)));
	
					// rezize the current part of the volume bar
					volumeCurrent.width( Math.round(newLeft) );
				}
			},
			handleVolumeMove = function(e) {
				
				var volume = null,
					totalOffset = volumeTotal.offset();
				
				// calculate the new volume based on the moust position
				if (mode === 'vertical') {
				
					var
						railHeight = volumeTotal.height(),
						newY = e.pageY - totalOffset.top;
						
					volume = (railHeight - newY) / railHeight;
						
					// the controls just hide themselves (usually when mouse moves too far up)
					if (totalOffset.top === 0 || totalOffset.left === 0) {
						return;
                    }
					
				} else {
					var
						railWidth = volumeTotal.width(),
						newX = e.pageX - totalOffset.left;
						
					volume = newX / railWidth;
				}
				
				// ensure the volume isn't outside 0-1
				volume = Math.max(0,volume);
				volume = Math.min(volume,1);
				
				// position the slider and handle
				positionVolumeHandle(volume);
				
				// set the media object (this will trigger the volumechanged event)
				if (volume === 0) {
					media.setMuted(true);
				} else {
					media.setMuted(false);
				}
				media.setVolume(volume);
			},
			mouseIsDown = false,
			mouseIsOver = false;

			// SLIDER
			
			mute
				.hover(function() {
					volumeSlider.show();
					mouseIsOver = true;
				}, function() {
					mouseIsOver = false;
						
					if (!mouseIsDown && mode == 'vertical')	{
						volumeSlider.hide();
					}
				});
            
            var updateVolumeSlider = function (e) {

                var volume = Math.floor(media.volume*100);

				volumeSlider.attr({
					'aria-label': mejs.i18n.t('Volume Slider'),
					'aria-valuemin': 0,
					'aria-valuemax': 100,
					'aria-valuenow': volume,
					'aria-valuetext': volume+'%',
					'role': 'slider',
					'tabindex': 0
				});

			};
			
			volumeSlider
				.bind('mouseover', function() {
					mouseIsOver = true;	
				})
				.bind('mousedown', function (e) {
					handleVolumeMove(e);
					t.globalBind('mousemove.vol', function(e) {
						handleVolumeMove(e);
					});
					t.globalBind('mouseup.vol', function () {
						mouseIsDown = false;
						t.globalUnbind('.vol');

						if (!mouseIsOver && mode == 'vertical') {
							volumeSlider.hide();
						}
					});
					mouseIsDown = true;
						
					return false;
				})
				.bind('keydown', function (e) {
					var keyCode = e.keyCode;
					var volume = media.volume;
					switch (keyCode) {
                        case 38: // Up
                            volume = Math.min(volume + 0.1, 1);
                            break;
                        case 40: // Down
                            volume = Math.max(0, volume - 0.1);
                            break;
                        default:
                            return true;
                    }

					mouseIsDown = false;
					positionVolumeHandle(volume);
					media.setVolume(volume);
					return false;
				});

			// MUTE button
			mute.find('button').click(function() {
				media.setMuted( !media.muted );
			});
            
            //Keyboard input
            mute.find('button').bind('focus', function () {
				volumeSlider.show();
			});

			// listen for volume change events from other sources
			media.addEventListener('volumechange', function(e) {
				if (!mouseIsDown) {
					if (media.muted) {
						positionVolumeHandle(0);
						mute.removeClass('mejs-mute').addClass('mejs-unmute');
					} else {
						positionVolumeHandle(media.volume);
						mute.removeClass('mejs-unmute').addClass('mejs-mute');
					}
				}
				updateVolumeSlider(e);
			}, false);
			
			// mutes the media and sets the volume icon muted if the initial volume is set to 0
			if (player.options.startVolume === 0) {
				media.setMuted(true);
			}
			
			// shim gets the startvolume as a parameter, but we have to set it on the native <video> and <audio> elements
			if (media.pluginType === 'native') {
				media.setVolume(player.options.startVolume);
			}
			
			t.container.on('controlsresize', function() {
				positionVolumeHandle(media.volume);
			});
		}
	});
	
})(mejs.$);

(function($) {

	$.extend(mejs.MepDefaults, {
		usePluginFullScreen: true,
		newWindowCallback: function() { return '';},
		fullscreenText: mejs.i18n.t('Fullscreen')
	});

	$.extend(MediaElementPlayer.prototype, {

		isFullScreen: false,

		isNativeFullScreen: false,

		isInIframe: false,
							
		// Possible modes
		// (1) 'native-native' 	HTML5 video  + browser fullscreen (IE10+, etc.)
		// (2) 'plugin-native' 	plugin video + browser fullscreen (fails in some versions of Firefox)
		// (3) 'fullwindow' 	Full window (retains all UI)
		// usePluginFullScreen = true
		// (4) 'plugin-click' 	Flash 1 - click through with pointer events
		// (5) 'plugin-hover' 	Flash 2 - hover popup in flash (IE6-8)		
		fullscreenMode: '',

		buildfullscreen: function(player, controls, layers, media) {

			if (!player.isVideo)
				return;
				
			player.isInIframe = (window.location != window.parent.location);	
		
			// detect on start
			media.addEventListener('play', function() { player.detectFullscreenMode(); });
				
			// build button
			var t = this,
				hideTimeout = null,
				fullscreenBtn =
					$('<div class="mejs-button mejs-fullscreen-button">' +
						'<button type="button" aria-controls="' + t.id + '" title="' + t.options.fullscreenText + '" aria-label="' + t.options.fullscreenText + '"></button>' +
					'</div>')
					.appendTo(controls)
					.on('click', function() {
						
						// toggle fullscreen
						var isFullScreen = (mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen()) || player.isFullScreen;
	
						if (isFullScreen) {
							player.exitFullScreen();
						} else {
							player.enterFullScreen();
						}
					})										
					.on('mouseover', function() {
						
						// very old browsers with a plugin
						if (t.fullscreenMode == 'plugin-hover') {						
							if (hideTimeout !== null) {
								clearTimeout(hideTimeout);
								delete hideTimeout;
							}
	
							var buttonPos = fullscreenBtn.offset(),
								containerPos = player.container.offset();
	
							media.positionFullscreenButton(buttonPos.left - containerPos.left, buttonPos.top - containerPos.top, true);
						}

					})
					.on('mouseout', function() {

						if (t.fullscreenMode == 'plugin-hover') {						
							if (hideTimeout !== null) {
								clearTimeout(hideTimeout);
								delete hideTimeout;
							}
	
							hideTimeout = setTimeout(function() {
								media.hideFullscreenButton();
							}, 1500);
						}

					});

					

			player.fullscreenBtn = fullscreenBtn;

			t.globalBind('keydown',function (e) {
				if (e.keyCode == 27 && ((mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen()) || t.isFullScreen)) {
					player.exitFullScreen();
				}
			});
			
			t.normalHeight = 0;
			t.normalWidth = 0;					
					
			// setup native fullscreen event
			if (mejs.MediaFeatures.hasTrueNativeFullScreen) {

				// chrome doesn't alays fire this in an iframe
				var fullscreenChanged = function(e) {
					if (player.isFullScreen) {
						if (mejs.MediaFeatures.isFullScreen()) {
							player.isNativeFullScreen = true;
							// reset the controls once we are fully in full screen
							player.setControlsSize();
						} else {
							player.isNativeFullScreen = false;
							// when a user presses ESC
							// make sure to put the player back into place
							player.exitFullScreen();
						}
					}
				};

				player.globalBind(mejs.MediaFeatures.fullScreenEventName, fullscreenChanged);
			}

		},
		
		detectFullscreenMode: function() {
			
			var t = this,
				mode = '',
				features = mejs.MediaFeatures;
			
			if (features.hasTrueNativeFullScreen && t.media.pluginType === 'native') {
				mode = 'native-native';
			} else if (features.hasTrueNativeFullScreen && t.media.pluginType !== 'native' && !features.hasFirefoxPluginMovingProblem) {
				mode = 'plugin-native';					
			} else if (t.usePluginFullScreen) { 
				if (mejs.MediaFeatures.supportsPointerEvents) {
					mode = 'plugin-click';
					// this needs some special setup
					t.createPluginClickThrough();				
				} else { 
					mode = 'plugin-hover';
				}
				
			} else {
				mode = 'fullwindow';
			}
			
			
			t.fullscreenMode = mode;		
			return mode;
		},
		
		isPluginClickThroughCreated: false,
		
		createPluginClickThrough: function() {
				
			var t = this;
			
			// don't build twice
			if (t.isPluginClickThroughCreated) {
				return;
			}	

			// allows clicking through the fullscreen button and controls down directly to Flash

			/*
			 When a user puts his mouse over the fullscreen button, we disable the controls so that mouse events can go down to flash (pointer-events)
			 We then put a divs over the video and on either side of the fullscreen button
			 to capture mouse movement and restore the controls once the mouse moves outside of the fullscreen button
			*/

			var fullscreenIsDisabled = false,
				restoreControls = function() {
					if (fullscreenIsDisabled) {
						// hide the hovers
						for (var i in hoverDivs) {
							hoverDivs[i].hide();
						}

						// restore the control bar
						t.fullscreenBtn.css('pointer-events', '');
						t.controls.css('pointer-events', '');

						// prevent clicks from pausing video
						t.media.removeEventListener('click', t.clickToPlayPauseCallback);

						// store for later
						fullscreenIsDisabled = false;
					}
				},
				hoverDivs = {},
				hoverDivNames = ['top', 'left', 'right', 'bottom'],
				i, len,
				positionHoverDivs = function() {
					var fullScreenBtnOffsetLeft = fullscreenBtn.offset().left - t.container.offset().left,
						fullScreenBtnOffsetTop = fullscreenBtn.offset().top - t.container.offset().top,
						fullScreenBtnWidth = fullscreenBtn.outerWidth(true),
						fullScreenBtnHeight = fullscreenBtn.outerHeight(true),
						containerWidth = t.container.width(),
						containerHeight = t.container.height();

					for (i in hoverDivs) {
						hoverDivs[i].css({position: 'absolute', top: 0, left: 0}); //, backgroundColor: '#f00'});
					}

					// over video, but not controls
					hoverDivs['top']
						.width( containerWidth )
						.height( fullScreenBtnOffsetTop );

					// over controls, but not the fullscreen button
					hoverDivs['left']
						.width( fullScreenBtnOffsetLeft )
						.height( fullScreenBtnHeight )
						.css({top: fullScreenBtnOffsetTop});

					// after the fullscreen button
					hoverDivs['right']
						.width( containerWidth - fullScreenBtnOffsetLeft - fullScreenBtnWidth )
						.height( fullScreenBtnHeight )
						.css({top: fullScreenBtnOffsetTop,
							 left: fullScreenBtnOffsetLeft + fullScreenBtnWidth});

					// under the fullscreen button
					hoverDivs['bottom']
						.width( containerWidth )
						.height( containerHeight - fullScreenBtnHeight - fullScreenBtnOffsetTop )
						.css({top: fullScreenBtnOffsetTop + fullScreenBtnHeight});
				};

			t.globalBind('resize', function() {
				positionHoverDivs();
			});

			for (i = 0, len = hoverDivNames.length; i < len; i++) {
				hoverDivs[hoverDivNames[i]] = $('<div class="mejs-fullscreen-hover" />').appendTo(t.container).mouseover(restoreControls).hide();
			}

			// on hover, kill the fullscreen button's HTML handling, allowing clicks down to Flash
			fullscreenBtn.on('mouseover',function() {

				if (!t.isFullScreen) {

					var buttonPos = fullscreenBtn.offset(),
						containerPos = player.container.offset();

					// move the button in Flash into place
					media.positionFullscreenButton(buttonPos.left - containerPos.left, buttonPos.top - containerPos.top, false);

					// allows click through
					t.fullscreenBtn.css('pointer-events', 'none');
					t.controls.css('pointer-events', 'none');

					// restore click-to-play
					t.media.addEventListener('click', t.clickToPlayPauseCallback);

					// show the divs that will restore things
					for (i in hoverDivs) {
						hoverDivs[i].show();
					}

					positionHoverDivs();

					fullscreenIsDisabled = true;
				}

			});

			// restore controls anytime the user enters or leaves fullscreen
			media.addEventListener('fullscreenchange', function(e) {
				t.isFullScreen = !t.isFullScreen;
				// don't allow plugin click to pause video - messes with
				// plugin's controls
				if (t.isFullScreen) {
					t.media.removeEventListener('click', t.clickToPlayPauseCallback);
				} else {
					t.media.addEventListener('click', t.clickToPlayPauseCallback);
				}
				restoreControls();
			});


			// the mouseout event doesn't work on the fullscren button, because we already killed the pointer-events
			// so we use the document.mousemove event to restore controls when the mouse moves outside the fullscreen button

			t.globalBind('mousemove', function(e) {

				// if the mouse is anywhere but the fullsceen button, then restore it all
				if (fullscreenIsDisabled) {

					var fullscreenBtnPos = fullscreenBtn.offset();


					if (e.pageY < fullscreenBtnPos.top || e.pageY > fullscreenBtnPos.top + fullscreenBtn.outerHeight(true) ||
						e.pageX < fullscreenBtnPos.left || e.pageX > fullscreenBtnPos.left + fullscreenBtn.outerWidth(true)
						) {

						fullscreenBtn.css('pointer-events', '');
						t.controls.css('pointer-events', '');

						fullscreenIsDisabled = false;
					}
				}
			});


			t.isPluginClickThroughCreated = true;
		},		

		cleanfullscreen: function(player) {
			player.exitFullScreen();
		},

        containerSizeTimeout: null,

		enterFullScreen: function() {

			var t = this;

			if (mejs.MediaFeatures.hasiOSFullScreen) {
				t.media.webkitEnterFullscreen();
				return;
			}

			// set it to not show scroll bars so 100% will work
            $(document.documentElement).addClass('mejs-fullscreen');

			// store sizing
			t.normalHeight = t.container.height();
			t.normalWidth = t.container.width();



			// attempt to do true fullscreen
			if (t.fullscreenMode === 'native-native' || t.fullscreenMode === 'plugin-native') {

				mejs.MediaFeatures.requestFullScreen(t.container[0]);
				//return;

				if (t.isInIframe) {
					// sometimes exiting from fullscreen doesn't work
					// notably in Chrome <iframe>. Fixed in version 17
					setTimeout(function checkFullscreen() {

						if (t.isNativeFullScreen) {
							var percentErrorMargin = 0.002, // 0.2%
								windowWidth = $(window).width(),
								screenWidth = screen.width,
								absDiff = Math.abs(screenWidth - windowWidth),
								marginError = screenWidth * percentErrorMargin;

							// check if the video is suddenly not really fullscreen
							if (absDiff > marginError) {
								// manually exit
								t.exitFullScreen();
							} else {
								// test again
								setTimeout(checkFullscreen, 500);
							}
						}
						
					}, 1000);
				}
				
			} else if (t.fullscreeMode == 'fullwindow') {				
				// move into position
				
			}			
			
			// make full size
			t.container
				.addClass('mejs-container-fullscreen')
				.width('100%')
				.height('100%');
				//.css({position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', width: '100%', height: '100%', 'z-index': 1000});

			// Only needed for safari 5.1 native full screen, can cause display issues elsewhere
			// Actually, it seems to be needed for IE8, too
			//if (mejs.MediaFeatures.hasTrueNativeFullScreen) {
				t.containerSizeTimeout = setTimeout(function() {
					t.container.css({width: '100%', height: '100%'});
					t.setControlsSize();
				}, 500);
			//}

			if (t.media.pluginType === 'native') {
				t.$media
					.width('100%')
					.height('100%');
			} else {
				t.container.find('.mejs-shim')
					.width('100%')
					.height('100%');	
				
				setTimeout(function() {
					var win = $(window),
						winW = win.width(),
						winH = win.height();
							
					t.media.setVideoSize(winW,winH);			
				}, 500);
			}

			t.layers.children('div')
				.width('100%')
				.height('100%');

			if (t.fullscreenBtn) {
				t.fullscreenBtn
					.removeClass('mejs-fullscreen')
					.addClass('mejs-unfullscreen');
			}

			t.setControlsSize();
			t.isFullScreen = true;

			t.container.find('.mejs-captions-text').css('font-size', screen.width / t.width * 1.00 * 100 + '%');
			t.container.find('.mejs-captions-position').css('bottom', '45px');

			t.container.trigger('enteredfullscreen');
		},

		exitFullScreen: function() {

			var t = this;

            // Prevent container from attempting to stretch a second time
            clearTimeout(t.containerSizeTimeout);

			// firefox can't adjust plugins
			/*
			if (t.media.pluginType !== 'native' && mejs.MediaFeatures.isFirefox) {
				t.media.setFullscreen(false);
				//player.isFullScreen = false;
				return;
			}
			*/

			// come out of native fullscreen
			if (mejs.MediaFeatures.hasTrueNativeFullScreen && (mejs.MediaFeatures.isFullScreen() || t.isFullScreen)) {
				mejs.MediaFeatures.cancelFullScreen();
			}

			// restore scroll bars to document
            $(document.documentElement).removeClass('mejs-fullscreen');

			t.container
				.removeClass('mejs-container-fullscreen')
				.width(t.normalWidth)
				.height(t.normalHeight);

			if (t.media.pluginType === 'native') {
				t.$media
					.width(t.normalWidth)
					.height(t.normalHeight);
			} else {
				t.container.find('.mejs-shim')
					.width(t.normalWidth)
					.height(t.normalHeight);

				t.media.setVideoSize(t.normalWidth, t.normalHeight);
			}

			t.layers.children('div')
				.width(t.normalWidth)
				.height(t.normalHeight);

			t.fullscreenBtn
				.removeClass('mejs-unfullscreen')
				.addClass('mejs-fullscreen');

			t.setControlsSize();
			t.isFullScreen = false;

			t.container.find('.mejs-captions-text').css('font-size','');
			t.container.find('.mejs-captions-position').css('bottom', '');

			t.container.trigger('exitedfullscreen');
		}
	});

})(mejs.$);

(function($) {

	// Speed
	$.extend(mejs.MepDefaults, {

		// We also support to pass object like this:
		// [{name: 'Slow', value: '0.75'}, {name: 'Normal', value: '1.00'}, ...]
		speeds: ['2.00', '1.50', '1.25', '1.00', '0.75'],

		defaultSpeed: '1.00',
		
		speedChar: 'x'

	});

	$.extend(MediaElementPlayer.prototype, {

		buildspeed: function(player, controls, layers, media) {
			var t = this;

			if (t.media.pluginType == 'native') {
				var 
					speedButton = null,
					speedSelector = null,
					playbackSpeed = null,
					inputId = null;

				var speeds = [];
				var defaultInArray = false;
				for (var i=0, len=t.options.speeds.length; i < len; i++) {
					var s = t.options.speeds[i];
					if (typeof(s) === 'string'){
						speeds.push({
							name: s + t.options.speedChar,
							value: s
						});
						if(s === t.options.defaultSpeed) {
							defaultInArray = true;
						}
					}
					else {
						speeds.push(s);
						if(s.value === t.options.defaultSpeed) {
							defaultInArray = true;
						}
					}
				}

				if (!defaultInArray) {
					speeds.push({
						name: t.options.defaultSpeed + t.options.speedChar,
						value: t.options.defaultSpeed
					});
				}

				speeds.sort(function(a, b) {
					return parseFloat(b.value) - parseFloat(a.value);
				});

				var getSpeedNameFromValue = function(value) {
					for(i=0,len=speeds.length; i <len; i++) {
						if (speeds[i].value === value) {
							return speeds[i].name;
						}
					}
				};

				var html = '<div class="mejs-button mejs-speed-button">' +
							'<button type="button">' + getSpeedNameFromValue(t.options.defaultSpeed) + '</button>' +
							'<div class="mejs-speed-selector">' +
							'<ul>';

				for (i = 0, il = speeds.length; i<il; i++) {
					inputId = t.id + '-speed-' + speeds[i].value;
					html += '<li>' + 
								'<input type="radio" name="speed" ' + 
											'value="' + speeds[i].value + '" ' +
											'id="' + inputId + '" ' +
											(speeds[i].value === t.options.defaultSpeed ? ' checked' : '') +
											' />' +
								'<label for="' + inputId + '" ' +
											(speeds[i].value === t.options.defaultSpeed ? ' class="mejs-speed-selected"' : '') +
											'>' + speeds[i].name + '</label>' +
							'</li>';
				}
				html += '</ul></div></div>';

				speedButton = $(html).appendTo(controls);
				speedSelector = speedButton.find('.mejs-speed-selector');

				playbackSpeed = t.options.defaultSpeed;

				media.addEventListener('loadedmetadata', function(e) {
					if (playbackSpeed) {
						media.playbackRate = parseFloat(playbackSpeed);
					}
				}, true);

				speedSelector
					.on('click', 'input[type="radio"]', function() {
						var newSpeed = $(this).attr('value');
						playbackSpeed = newSpeed;
						media.playbackRate = parseFloat(newSpeed);
						speedButton.find('button').html(getSpeedNameFromValue(newSpeed));
						speedButton.find('.mejs-speed-selected').removeClass('mejs-speed-selected');
						speedButton.find('input[type="radio"]:checked').next().addClass('mejs-speed-selected');
					});
				speedButton
					.one( 'mouseenter focusin', function() {
						speedSelector
							.height(
								speedButton.find('.mejs-speed-selector ul').outerHeight(true) +
								speedButton.find('.mejs-speed-translations').outerHeight(true))
							.css('top', (-1 * speedSelector.height()) + 'px');
					});
			}
		}
	});

})(mejs.$);

(function($) {

	// add extra default options
	$.extend(mejs.MepDefaults, {
		// this will automatically turn on a <track>
		startLanguage: '',

		tracksText: mejs.i18n.t('Captions/Subtitles'),

		// By default, no WAI-ARIA live region - don't make a
		// screen reader speak captions over an audio track.
		tracksAriaLive: false,

		// option to remove the [cc] button when no <track kind="subtitles"> are present
		hideCaptionsButtonWhenEmpty: true,

		// If true and we only have one track, change captions to popup
		toggleCaptionsButtonWhenOnlyOne: false,

		// #id or .class
		slidesSelector: ''
	});

	$.extend(MediaElementPlayer.prototype, {

		hasChapters: false,

		cleartracks: function(player, controls, layers, media){
			if(player) {
				if(player.captions) player.captions.remove();
				if(player.chapters) player.chapters.remove();
				if(player.captionsText) player.captionsText.remove();
				if(player.captionsButton) player.captionsButton.remove();
			}
		},
		buildtracks: function(player, controls, layers, media) {
			if (player.tracks.length === 0)
				return;

			var t = this,
				attr = t.options.tracksAriaLive ?
					'role="log" aria-live="assertive" aria-atomic="false"' : '',
				i;

			if (t.domNode.textTracks) { // if browser will do native captions, prefer mejs captions, loop through tracks and hide
				for (i = t.domNode.textTracks.length - 1; i >= 0; i--) {
					t.domNode.textTracks[i].mode = "hidden";
				}
			}
			t.cleartracks(player, controls, layers, media);
			player.chapters =
					$('<div class="mejs-chapters mejs-layer"></div>')
						.prependTo(layers).hide();
			player.captions =
					$('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position mejs-captions-position-hover" ' +
					attr + '><span class="mejs-captions-text"></span></div></div>')
						.prependTo(layers).hide();
			player.captionsText = player.captions.find('.mejs-captions-text');
			player.captionsButton =
					$('<div class="mejs-button mejs-captions-button">'+
						'<button type="button" aria-controls="' + t.id + '" title="' + t.options.tracksText + '" aria-label="' + t.options.tracksText + '"></button>'+
						'<div class="mejs-captions-selector">'+
							'<ul>'+
								'<li>'+
									'<input type="radio" name="' + player.id + '_captions" id="' + player.id + '_captions_none" value="none" checked="checked" />' +
									'<label for="' + player.id + '_captions_none">' + mejs.i18n.t('None') +'</label>'+
								'</li>'	+
							'</ul>'+
						'</div>'+
					'</div>')
						.appendTo(controls);


			var subtitleCount = 0;
			for (i=0; i<player.tracks.length; i++) {
				if (player.tracks[i].kind == 'subtitles') {
					subtitleCount++;
				}
			}

			// if only one language then just make the button a toggle
			if (t.options.toggleCaptionsButtonWhenOnlyOne && subtitleCount == 1){
				// click
				player.captionsButton.on('click',function() {
					if (player.selectedTrack === null) {
						lang = player.tracks[0].srclang;
					} else {
						lang = 'none';
					}
					player.setTrack(lang);
				});
			} else {
				// hover or keyboard focus
				player.captionsButton.on( 'mouseenter focusin', function() {
					$(this).find('.mejs-captions-selector').removeClass('mejs-offscreen');
				})

				// handle clicks to the language radio buttons
				.on('click','input[type=radio]',function() {
					lang = this.value;
					player.setTrack(lang);
				});

				player.captionsButton.on( 'mouseleave focusout', function() {
					$(this).find(".mejs-captions-selector").addClass("mejs-offscreen");
				});

			}

			if (!player.options.alwaysShowControls) {
				// move with controls
				player.container
					.bind('controlsshown', function () {
						// push captions above controls
						player.container.find('.mejs-captions-position').addClass('mejs-captions-position-hover');

					})
					.bind('controlshidden', function () {
						if (!media.paused) {
							// move back to normal place
							player.container.find('.mejs-captions-position').removeClass('mejs-captions-position-hover');
						}
					});
			} else {
				player.container.find('.mejs-captions-position').addClass('mejs-captions-position-hover');
			}

			player.trackToLoad = -1;
			player.selectedTrack = null;
			player.isLoadingTrack = false;

			// add to list
			for (i=0; i<player.tracks.length; i++) {
				if (player.tracks[i].kind == 'subtitles') {
					player.addTrackButton(player.tracks[i].srclang, player.tracks[i].label);
				}
			}

			// start loading tracks
			player.loadNextTrack();

			media.addEventListener('timeupdate',function(e) {
				player.displayCaptions();
			}, false);

			if (player.options.slidesSelector !== '') {
				player.slidesContainer = $(player.options.slidesSelector);

				media.addEventListener('timeupdate',function(e) {
					player.displaySlides();
				}, false);

			}

			media.addEventListener('loadedmetadata', function(e) {
				player.displayChapters();
			}, false);

			player.container.hover(
				function () {
					// chapters
					if (player.hasChapters) {
						player.chapters.removeClass('mejs-offscreen');
						player.chapters.fadeIn(200).height(player.chapters.find('.mejs-chapter').outerHeight());
					}
				},
				function () {
					if (player.hasChapters && !media.paused) {
						player.chapters.fadeOut(200, function() {
							$(this).addClass('mejs-offscreen');
							$(this).css('display','block');
						});
					}
				});

			t.container.on('controlsresize', function() {
				t.adjustLanguageBox();
			});

			// check for autoplay
			if (player.node.getAttribute('autoplay') !== null) {
				player.chapters.addClass('mejs-offscreen');
			}
		},

		setTrack: function(lang){

			var t = this,
				i;

			if (lang == 'none') {
				t.selectedTrack = null;
				t.captionsButton.removeClass('mejs-captions-enabled');
			} else {
				for (i=0; i<t.tracks.length; i++) {
					if (t.tracks[i].srclang == lang) {
						if (t.selectedTrack === null)
							t.captionsButton.addClass('mejs-captions-enabled');
						t.selectedTrack = t.tracks[i];
						t.captions.attr('lang', t.selectedTrack.srclang);
						t.displayCaptions();
						break;
					}
				}
			}
		},

		loadNextTrack: function() {
			var t = this;

			t.trackToLoad++;
			if (t.trackToLoad < t.tracks.length) {
				t.isLoadingTrack = true;
				t.loadTrack(t.trackToLoad);
			} else {
				// add done?
				t.isLoadingTrack = false;

				t.checkForTracks();
			}
		},

		loadTrack: function(index){
			var
				t = this,
				track = t.tracks[index],
				after = function() {

					track.isLoaded = true;

					t.enableTrackButton(track.srclang, track.label);

					t.loadNextTrack();

				};


			$.ajax({
				url: track.src,
				dataType: "text",
				success: function(d) {

					// parse the loaded file
					if (typeof d == "string" && (/<tt\s+xml/ig).exec(d)) {
						track.entries = mejs.TrackFormatParser.dfxp.parse(d);
					} else {
						track.entries = mejs.TrackFormatParser.webvtt.parse(d);
					}

					after();

					if (track.kind == 'chapters') {
						t.media.addEventListener('play', function(e) {
							if (t.media.duration > 0) {
								t.displayChapters(track);
							}
						}, false);
					}

					if (track.kind == 'slides') {
						t.setupSlides(track);
					}
				},
				error: function() {
					t.removeTrackButton(track.srclang);
					t.loadNextTrack();
				}
			});
		},

		enableTrackButton: function(lang, label) {
			var t = this;

			if (label === '') {
				label = mejs.language.codes[lang] || lang;
			}

			t.captionsButton
				.find('input[value=' + lang + ']')
					.prop('disabled',false)
				.siblings('label')
					.html( label );

			// auto select
			if (t.options.startLanguage == lang) {
				$('#' + t.id + '_captions_' + lang).prop('checked', true).trigger('click');
			}

			t.adjustLanguageBox();
		},

		removeTrackButton: function(lang) {
			var t = this;

			t.captionsButton.find('input[value=' + lang + ']').closest('li').remove();

			t.adjustLanguageBox();
		},

		addTrackButton: function(lang, label) {
			var t = this;
			if (label === '') {
				label = mejs.language.codes[lang] || lang;
			}

			t.captionsButton.find('ul').append(
				$('<li>'+
					'<input type="radio" name="' + t.id + '_captions" id="' + t.id + '_captions_' + lang + '" value="' + lang + '" disabled="disabled" />' +
					'<label for="' + t.id + '_captions_' + lang + '">' + label + ' (loading)' + '</label>'+
				'</li>')
			);

			t.adjustLanguageBox();

			// remove this from the dropdownlist (if it exists)
			t.container.find('.mejs-captions-translations option[value=' + lang + ']').remove();
		},

		adjustLanguageBox:function() {
			var t = this;
			// adjust the size of the outer box
			t.captionsButton.find('.mejs-captions-selector').height(
				t.captionsButton.find('.mejs-captions-selector ul').outerHeight(true) +
				t.captionsButton.find('.mejs-captions-translations').outerHeight(true)
			);
		},

		checkForTracks: function() {
			var
				t = this,
				hasSubtitles = false;

			// check if any subtitles
			if (t.options.hideCaptionsButtonWhenEmpty) {
				for (i=0; i<t.tracks.length; i++) {
					if (t.tracks[i].kind == 'subtitles' && t.tracks[i].isLoaded) {
						hasSubtitles = true;
						break;
					}
				}

				if (!hasSubtitles) {
					t.captionsButton.hide();
					t.setControlsSize();
				}
			}
		},

		displayCaptions: function() {

			if (typeof this.tracks == 'undefined')
				return;

			var
				t = this,
				i,
				track = t.selectedTrack;

			if (track !== null && track.isLoaded) {
				for (i=0; i<track.entries.times.length; i++) {
					if (t.media.currentTime >= track.entries.times[i].start && t.media.currentTime <= track.entries.times[i].stop) {
						// Set the line before the timecode as a class so the cue can be targeted if needed
						t.captionsText.html(track.entries.text[i]).attr('class', 'mejs-captions-text ' + (track.entries.times[i].identifier || ''));
						t.captions.show().height(0);
						return; // exit out if one is visible;
					}
				}
				t.captions.hide();
			} else {
				t.captions.hide();
			}
		},

		setupSlides: function(track) {
			var t = this;

			t.slides = track;
			t.slides.entries.imgs = [t.slides.entries.text.length];
			t.showSlide(0);

		},

		showSlide: function(index) {
			if (typeof this.tracks == 'undefined' || typeof this.slidesContainer == 'undefined') {
				return;
			}

			var t = this,
				url = t.slides.entries.text[index],
				img = t.slides.entries.imgs[index];

			if (typeof img == 'undefined' || typeof img.fadeIn == 'undefined') {

				t.slides.entries.imgs[index] = img = $('<img src="' + url + '">')
						.on('load', function() {
							img.appendTo(t.slidesContainer)
								.hide()
								.fadeIn()
								.siblings(':visible')
									.fadeOut();

						});

			} else {

				if (!img.is(':visible') && !img.is(':animated')) {

					//

					img.fadeIn()
						.siblings(':visible')
							.fadeOut();
				}
			}

		},

		displaySlides: function() {

			if (typeof this.slides == 'undefined')
				return;

			var
				t = this,
				slides = t.slides,
				i;

			for (i=0; i<slides.entries.times.length; i++) {
				if (t.media.currentTime >= slides.entries.times[i].start && t.media.currentTime <= slides.entries.times[i].stop){

					t.showSlide(i);

					return; // exit out if one is visible;
				}
			}
		},

		displayChapters: function() {
			var
				t = this,
				i;

			for (i=0; i<t.tracks.length; i++) {
				if (t.tracks[i].kind == 'chapters' && t.tracks[i].isLoaded) {
					t.drawChapters(t.tracks[i]);
					t.hasChapters = true;
					break;
				}
			}
		},

		drawChapters: function(chapters) {
			var
				t = this,
				i,
				dur,
				//width,
				//left,
				percent = 0,
				usedPercent = 0;

			t.chapters.empty();

			for (i=0; i<chapters.entries.times.length; i++) {
				dur = chapters.entries.times[i].stop - chapters.entries.times[i].start;
				percent = Math.floor(dur / t.media.duration * 100);
				if (percent + usedPercent > 100 || // too large
					i == chapters.entries.times.length-1 && percent + usedPercent < 100) // not going to fill it in
					{
					percent = 100 - usedPercent;
				}
				//width = Math.floor(t.width * dur / t.media.duration);
				//left = Math.floor(t.width * chapters.entries.times[i].start / t.media.duration);
				//if (left + width > t.width) {
				//	width = t.width - left;
				//}

				t.chapters.append( $(
					'<div class="mejs-chapter" rel="' + chapters.entries.times[i].start + '" style="left: ' + usedPercent.toString() + '%;width: ' + percent.toString() + '%;">' +
						'<div class="mejs-chapter-block' + ((i==chapters.entries.times.length-1) ? ' mejs-chapter-block-last' : '') + '">' +
							'<span class="ch-title">' + chapters.entries.text[i] + '</span>' +
							'<span class="ch-time">' + mejs.Utility.secondsToTimeCode(chapters.entries.times[i].start, t.options) + '&ndash;' + mejs.Utility.secondsToTimeCode(chapters.entries.times[i].stop, t.options) + '</span>' +
						'</div>' +
					'</div>'));
				usedPercent += percent;
			}

			t.chapters.find('div.mejs-chapter').click(function() {
				t.media.setCurrentTime( parseFloat( $(this).attr('rel') ) );
				if (t.media.paused) {
					t.media.play();
				}
			});

			t.chapters.show();
		}
	});



	mejs.language = {
		codes:  {
			af:'Afrikaans',
			sq:'Albanian',
			ar:'Arabic',
			be:'Belarusian',
			bg:'Bulgarian',
			ca:'Catalan',
			zh:'Chinese',
			'zh-cn':'Chinese Simplified',
			'zh-tw':'Chinese Traditional',
			hr:'Croatian',
			cs:'Czech',
			da:'Danish',
			nl:'Dutch',
			en:'English',
			et:'Estonian',
			fl:'Filipino',
			fi:'Finnish',
			fr:'French',
			gl:'Galician',
			de:'German',
			el:'Greek',
			ht:'Haitian Creole',
			iw:'Hebrew',
			hi:'Hindi',
			hu:'Hungarian',
			is:'Icelandic',
			id:'Indonesian',
			ga:'Irish',
			it:'Italian',
			ja:'Japanese',
			ko:'Korean',
			lv:'Latvian',
			lt:'Lithuanian',
			mk:'Macedonian',
			ms:'Malay',
			mt:'Maltese',
			no:'Norwegian',
			fa:'Persian',
			pl:'Polish',
			pt:'Portuguese',
			// 'pt-pt':'Portuguese (Portugal)',
			ro:'Romanian',
			ru:'Russian',
			sr:'Serbian',
			sk:'Slovak',
			sl:'Slovenian',
			es:'Spanish',
			sw:'Swahili',
			sv:'Swedish',
			tl:'Tagalog',
			th:'Thai',
			tr:'Turkish',
			uk:'Ukrainian',
			vi:'Vietnamese',
			cy:'Welsh',
			yi:'Yiddish'
		}
	};

	/*
	Parses WebVTT format which should be formatted as
	================================
	WEBVTT

	1
	00:00:01,1 --> 00:00:05,000
	A line of text

	2
	00:01:15,1 --> 00:02:05,000
	A second line of text

	===============================

	Adapted from: http://www.delphiki.com/html5/playr
	*/
	mejs.TrackFormatParser = {
		webvtt: {
			pattern_timecode: /^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,

			parse: function(trackText) {
				var
					i = 0,
					lines = mejs.TrackFormatParser.split2(trackText, /\r?\n/),
					entries = {text:[], times:[]},
					timecode,
					text,
					identifier;
				for(; i<lines.length; i++) {
					timecode = this.pattern_timecode.exec(lines[i]);

					if (timecode && i<lines.length) {
						if ((i - 1) >= 0 && lines[i - 1] !== '') {
							identifier = lines[i - 1];
						}
						i++;
						// grab all the (possibly multi-line) text that follows
						text = lines[i];
						i++;
						while(lines[i] !== '' && i<lines.length){
							text = text + '\n' + lines[i];
							i++;
						}
						text = $.trim(text).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>");
						// Text is in a different array so I can use .join
						entries.text.push(text);
						entries.times.push(
						{
							identifier: identifier,
							start: (mejs.Utility.convertSMPTEtoSeconds(timecode[1]) === 0) ? 0.200 : mejs.Utility.convertSMPTEtoSeconds(timecode[1]),
							stop: mejs.Utility.convertSMPTEtoSeconds(timecode[3]),
							settings: timecode[5]
						});
					}
					identifier = '';
				}
				return entries;
			}
		},
		// Thanks to Justin Capella: https://github.com/johndyer/mediaelement/pull/420
		dfxp: {
			parse: function(trackText) {
				trackText = $(trackText).filter("tt");
				var
					i = 0,
					container = trackText.children("div").eq(0),
					lines = container.find("p"),
					styleNode = trackText.find("#" + container.attr("style")),
					styles,
					text,
					entries = {text:[], times:[]};


				if (styleNode.length) {
					var attributes = styleNode.removeAttr("id").get(0).attributes;
					if (attributes.length) {
						styles = {};
						for (i = 0; i < attributes.length; i++) {
							styles[attributes[i].name.split(":")[1]] = attributes[i].value;
						}
					}
				}

				for(i = 0; i<lines.length; i++) {
					var style;
					var _temp_times = {
						start: null,
						stop: null,
						style: null
					};
					if (lines.eq(i).attr("begin")) _temp_times.start = mejs.Utility.convertSMPTEtoSeconds(lines.eq(i).attr("begin"));
					if (!_temp_times.start && lines.eq(i-1).attr("end")) _temp_times.start = mejs.Utility.convertSMPTEtoSeconds(lines.eq(i-1).attr("end"));
					if (lines.eq(i).attr("end")) _temp_times.stop = mejs.Utility.convertSMPTEtoSeconds(lines.eq(i).attr("end"));
					if (!_temp_times.stop && lines.eq(i+1).attr("begin")) _temp_times.stop = mejs.Utility.convertSMPTEtoSeconds(lines.eq(i+1).attr("begin"));
					if (styles) {
						style = "";
						for (var _style in styles) {
							style += _style + ":" + styles[_style] + ";";
						}
					}
					if (style) _temp_times.style = style;
					if (_temp_times.start === 0) _temp_times.start = 0.200;
					entries.times.push(_temp_times);
					text = $.trim(lines.eq(i).html()).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>");
					entries.text.push(text);
					if (entries.times.start === 0) entries.times.start = 2;
				}
				return entries;
			}
		},
		split2: function (text, regex) {
			// normal version for compliant browsers
			// see below for IE fix
			return text.split(regex);
		}
	};

	// test for browsers with bad String.split method.
	if ('x\n\ny'.split(/\n/gi).length != 3) {
		// add super slow IE8 and below version
		mejs.TrackFormatParser.split2 = function(text, regex) {
			var
				parts = [],
				chunk = '',
				i;

			for (i=0; i<text.length; i++) {
				chunk += text.substring(i,i+1);
				if (regex.test(chunk)) {
					parts.push(chunk.replace(regex, ''));
					chunk = '';
				}
			}
			parts.push(chunk);
			return parts;
		};
	}

})(mejs.$);

/*
* ContextMenu Plugin
* 
*
*/

(function($) {

$.extend(mejs.MepDefaults,
	{ 'contextMenuItems': [
		// demo of a fullscreen option
		{ 
			render: function(player) {
				
				// check for fullscreen plugin
				if (typeof player.enterFullScreen == 'undefined')
					return null;
			
				if (player.isFullScreen) {
					return mejs.i18n.t('Turn off Fullscreen');
				} else {
					return mejs.i18n.t('Go Fullscreen');
				}
			},
			click: function(player) {
				if (player.isFullScreen) {
					player.exitFullScreen();
				} else {
					player.enterFullScreen();
				}
			}
		}
		,
		// demo of a mute/unmute button
		{ 
			render: function(player) {
				if (player.media.muted) {
					return mejs.i18n.t('Unmute');
				} else {
					return mejs.i18n.t('Mute');
				}
			},
			click: function(player) {
				if (player.media.muted) {
					player.setMuted(false);
				} else {
					player.setMuted(true);
				}
			}
		},
		// separator
		{
			isSeparator: true
		}
		,
		// demo of simple download video
		{ 
			render: function(player) {
				return mejs.i18n.t('Download Video');
			},
			click: function(player) {
				window.location.href = player.media.currentSrc;
			}
		}	
	]}
);


	$.extend(MediaElementPlayer.prototype, {
		buildcontextmenu: function(player, controls, layers, media) {
			
			// create context menu
			player.contextMenu = $('<div class="mejs-contextmenu"></div>')
								.appendTo($('body'))
								.hide();
			
			// create events for showing context menu
			player.container.bind('contextmenu', function(e) {
				if (player.isContextMenuEnabled) {
					e.preventDefault();
					player.renderContextMenu(e.clientX-1, e.clientY-1);
					return false;
				}
			});
			player.container.bind('click', function() {
				player.contextMenu.hide();
			});	
			player.contextMenu.bind('mouseleave', function() {

				//
				player.startContextMenuTimer();
				
			});		
		},

		cleancontextmenu: function(player) {
			player.contextMenu.remove();
		},
		
		isContextMenuEnabled: true,
		enableContextMenu: function() {
			this.isContextMenuEnabled = true;
		},
		disableContextMenu: function() {
			this.isContextMenuEnabled = false;
		},
		
		contextMenuTimeout: null,
		startContextMenuTimer: function() {
			//
			
			var t = this;
			
			t.killContextMenuTimer();
			
			t.contextMenuTimer = setTimeout(function() {
				t.hideContextMenu();
				t.killContextMenuTimer();
			}, 750);
		},
		killContextMenuTimer: function() {
			var timer = this.contextMenuTimer;
			
			//
			
			if (timer != null) {				
				clearTimeout(timer);
				delete timer;
				timer = null;
			}
		},		
		
		hideContextMenu: function() {
			this.contextMenu.hide();
		},
		
		renderContextMenu: function(x,y) {
			
			// alway re-render the items so that things like "turn fullscreen on" and "turn fullscreen off" are always written correctly
			var t = this,
				html = '',
				items = t.options.contextMenuItems;
			
			for (var i=0, il=items.length; i<il; i++) {
				
				if (items[i].isSeparator) {
					html += '<div class="mejs-contextmenu-separator"></div>';
				} else {
				
					var rendered = items[i].render(t);
				
					// render can return null if the item doesn't need to be used at the moment
					if (rendered != null) {
						html += '<div class="mejs-contextmenu-item" data-itemindex="' + i + '" id="element-' + (Math.random()*1000000) + '">' + rendered + '</div>';
					}
				}
			}
			
			// position and show the context menu
			t.contextMenu
				.empty()
				.append($(html))
				.css({top:y, left:x})
				.show();
				
			// bind events
			t.contextMenu.find('.mejs-contextmenu-item').each(function() {
							
				// which one is this?
				var $dom = $(this),
					itemIndex = parseInt( $dom.data('itemindex'), 10 ),
					item = t.options.contextMenuItems[itemIndex];
				
				// bind extra functionality?
				if (typeof item.show != 'undefined')
					item.show( $dom , t);
				
				// bind click action
				$dom.click(function() {			
					// perform click action
					if (typeof item.click != 'undefined')
						item.click(t);
					
					// close
					t.contextMenu.hide();				
				});				
			});	
			
			// stop the controls from hiding
			setTimeout(function() {
				t.killControlsTimer('rev3');	
			}, 100);
						
		}
	});
	
})(mejs.$);
(function($) {
	// skip back button

	$.extend(mejs.MepDefaults, {
		skipBackInterval: 30,
		// %1 will be replaced with skipBackInterval in this string
		skipBackText: mejs.i18n.t('Skip back %1 seconds')
	});

	$.extend(MediaElementPlayer.prototype, {
		buildskipback: function(player, controls, layers, media) {
			var
				t = this,
				// Replace %1 with skip back interval
				backText = t.options.skipBackText.replace('%1', t.options.skipBackInterval),
				// create the loop button
				loop =
				$('<div class="mejs-button mejs-skip-back-button">' +
					'<button type="button" aria-controls="' + t.id + '" title="' + backText + '" aria-label="' + backText + '">' + t.options.skipBackInterval + '</button>' +
				'</div>')
				// append it to the toolbar
				.appendTo(controls)
				// add a click toggle event
				.click(function() {
					media.setCurrentTime(Math.max(media.currentTime - t.options.skipBackInterval, 0));
					$(this).find('button').blur();
				});
		}
	});

})(mejs.$);

/**
 * Postroll plugin
 */
(function($) {

	$.extend(mejs.MepDefaults, {
		postrollCloseText: mejs.i18n.t('Close')
	});

	// Postroll
	$.extend(MediaElementPlayer.prototype, {
		buildpostroll: function(player, controls, layers, media) {
			var
				t = this,
				postrollLink = t.container.find('link[rel="postroll"]').attr('href');

			if (typeof postrollLink !== 'undefined') {
				player.postroll =
					$('<div class="mejs-postroll-layer mejs-layer"><a class="mejs-postroll-close" onclick="$(this).parent().hide();return false;">' + t.options.postrollCloseText + '</a><div class="mejs-postroll-layer-content"></div></div>').prependTo(layers).hide();

				t.media.addEventListener('ended', function (e) {
					$.ajax({
						dataType: 'html',
						url: postrollLink,
						success: function (data, textStatus) {
							layers.find('.mejs-postroll-layer-content').html(data);
						}
					});
					player.postroll.show();
				}, false);
			}
		}
	});

})(mejs.$);
define("components/adapt-contrib-media/js/mediaelement-and-player", function(){});

/*Accessible closed captions*/


(function($) {

	// add extra default options
	$.extend(mejs.MepDefaults, {
		// this will automatically turn on a <track>
		startLanguage: '',

		tracksText: mejs.i18n.t('Captions/Subtitles'),

		// By default, no WAI-ARIA live region - don't make a
		// screen reader speak captions over an audio track.
		tracksAriaLive: false,

		// option to remove the [cc] button when no <track kind="subtitles"> are present
		hideCaptionsButtonWhenEmpty: true,

		// If true and we only have one track, change captions to popup
		toggleCaptionsButtonWhenOnlyOne: false,

		// #id or .class
		slidesSelector: ''
	});

	$.extend(MediaElementPlayer.prototype, {

		hasChapters: false,

		cleartracks: function(player, controls, layers, media){
			if(player) {
				if(player.captions) player.captions.remove();
				if(player.chapters) player.chapters.remove();
				if(player.captionsText) player.captionsText.remove();
				if(player.captionsButton) player.captionsButton.remove();
			}
		},
		buildtracks: function(player, controls, layers, media) {
			if (player.tracks.length === 0)
				return;

			var t = this,
				attr = t.options.tracksAriaLive ?
					'role="log" aria-live="assertive" aria-atomic="false"' : '',
				i;

			if (t.domNode.textTracks) { // if browser will do native captions, prefer mejs captions, loop through tracks and hide
				for (i = t.domNode.textTracks.length - 1; i >= 0; i--) {
					t.domNode.textTracks[i].mode = "hidden";
				}
			}
			t.cleartracks(player, controls, layers, media);
			player.chapters =
					$('<div class="mejs-chapters mejs-layer"></div>')
						.prependTo(layers).hide();
			player.captions =
					$('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position mejs-captions-position-hover" ' +
					attr + '><span class="mejs-captions-text"></span></div></div>')
						.prependTo(layers).hide();
			player.captionsText = player.captions.find('.mejs-captions-text');
			player.captionsButton =
					$('<div class="mejs-button mejs-captions-button">'+
						'<button type="button" aria-controls="' + t.id + '" title="' + t.options.tracksText + '" aria-label="' + t.options.tracksText + '"></button>'+
						'<div class="mejs-captions-selector">'+
							'<ul>'+
								'<li>'+
									'<input type="checkbox" name="' + player.id + '_captions" id="' + player.id + '_captions_none" value="none" checked="checked" />' +
									'<label for="' + player.id + '_captions_none">' + mejs.i18n.t('None') +'</label>'+
								'</li>'	+
							'</ul>'+
						'</div>'+
					'</div>')
						.appendTo(controls);


			var subtitleCount = 0;
			for (i=0; i<player.tracks.length; i++) {
				if (player.tracks[i].kind == 'subtitles') {
					subtitleCount++;
				}
			}

			// if only one language then just make the button a toggle
			if (t.options.toggleCaptionsButtonWhenOnlyOne && subtitleCount == 1){
				// click
				player.captionsButton.on('click',function() {
					if (player.selectedTrack === null) {
						lang = player.tracks[0].srclang;
					} else {
						lang = 'none';
					}
					player.setTrack(lang);
				});
			} else {
				// hover or keyboard focus
				player.captionsButton.on( 'click', function(e) {
					$(this).find('.mejs-captions-selector').removeClass('mejs-offscreen').css("visibility", "visible");
					setTimeout(function() {
                    	$($(e.currentTarget).find(".mejs-captions-selector").find("input[type=checkbox]")[0]).focus();
                	}, 250);
				})

				// handle clicks to the language checkbox buttons
				.on('click keyup','input[type=checkbox]',function(e) {
					
					e.stopPropagation();
                	if (e.type==="keyup" && (e.which!==32&&e.which!==13)) return;
                	$(this).parents(".mejs-captions-selector").find("input[type=checkbox]").prop("checked", false);
                	$(this).prop("checked",true);

					lang = this.value;
					player.setTrack(lang);


					if (e.type==="keyup") {
	                    $(this).parents(".mejs-captions-button").find("button").focus();
	                }

	                $(this).parents(".mejs-captions-selector").addClass('mejs-offscreen').css("visibility", "hidden");

				});

			}

			if (!player.options.alwaysShowControls) {
				// move with controls
				player.container
					.bind('controlsshown', function () {
						// push captions above controls
						player.container.find('.mejs-captions-position').addClass('mejs-captions-position-hover');

					})
					.bind('controlshidden', function () {
						if (!media.paused) {
							// move back to normal place
							player.container.find('.mejs-captions-position').removeClass('mejs-captions-position-hover');
						}
					});
			} else {
				player.container.find('.mejs-captions-position').addClass('mejs-captions-position-hover');
			}

			player.trackToLoad = -1;
			player.selectedTrack = null;
			player.isLoadingTrack = false;

			// add to list
			for (i=0; i<player.tracks.length; i++) {
				if (player.tracks[i].kind == 'subtitles') {
					player.addTrackButton(player.tracks[i].srclang, player.tracks[i].label);
				}
			}

			// start loading tracks
			player.loadNextTrack();

			media.addEventListener('timeupdate',function(e) {
				player.displayCaptions();
			}, false);

			if (player.options.slidesSelector !== '') {
				player.slidesContainer = $(player.options.slidesSelector);

				media.addEventListener('timeupdate',function(e) {
					player.displaySlides();
				}, false);

			}

			media.addEventListener('loadedmetadata', function(e) {
				player.displayChapters();
			}, false);

			player.container.hover(
				function () {
					// chapters
					if (player.hasChapters) {
						player.chapters.removeClass('mejs-offscreen');
						player.chapters.fadeIn(200).height(player.chapters.find('.mejs-chapter').outerHeight());
					}
				},
				function () {
					if (player.hasChapters && !media.paused) {
						player.chapters.fadeOut(200, function() {
							$(this).addClass('mejs-offscreen');
							$(this).css('display','block');
						});
					}
				});

			t.container.on('controlsresize', function() {
				t.adjustLanguageBox();
			});

			// check for autoplay
			if (player.node.getAttribute('autoplay') !== null) {
				player.chapters.addClass('mejs-offscreen');
			}
		},

		setTrack: function(lang){

			var t = this,
				i;

			if (lang == 'none') {
				t.selectedTrack = null;
				t.captionsButton.removeClass('mejs-captions-enabled');
			} else {
				for (i=0; i<t.tracks.length; i++) {
					if (t.tracks[i].srclang == lang) {
						if (t.selectedTrack === null)
							t.captionsButton.addClass('mejs-captions-enabled');
						t.selectedTrack = t.tracks[i];
						t.captions.attr('lang', t.selectedTrack.srclang);
						t.displayCaptions();
						break;
					}
				}
			}
		},

		loadNextTrack: function() {
			var t = this;

			t.trackToLoad++;
			if (t.trackToLoad < t.tracks.length) {
				t.isLoadingTrack = true;
				t.loadTrack(t.trackToLoad);
			} else {
				// add done?
				t.isLoadingTrack = false;

				t.checkForTracks();
			}
		},

		loadTrack: function(index){
			var
				t = this,
				track = t.tracks[index],
				after = function() {

					track.isLoaded = true;

					t.enableTrackButton(track.srclang, track.label);

					t.loadNextTrack();

				};


			$.ajax({
				url: track.src,
				dataType: "text",
				success: function(d) {

					// parse the loaded file
					if (typeof d == "string" && (/<tt\s+xml/ig).exec(d)) {
						track.entries = mejs.TrackFormatParser.dfxp.parse(d);
					} else {
						track.entries = mejs.TrackFormatParser.webvtt.parse(d);
					}

					after();

					if (track.kind == 'chapters') {
						t.media.addEventListener('play', function(e) {
							if (t.media.duration > 0) {
								t.displayChapters(track);
							}
						}, false);
					}

					if (track.kind == 'slides') {
						t.setupSlides(track);
					}
				},
				error: function() {
					t.removeTrackButton(track.srclang);
					t.loadNextTrack();
				}
			});
		},

		enableTrackButton: function(lang, label) {
			var t = this;

			if (label === '') {
				label = mejs.language.codes[lang] || lang;
			}

			t.captionsButton
				.find('input[value=' + lang + ']')
					.prop('disabled',false)
				.siblings('label')
					.html( label );

			// auto select
			if (t.options.startLanguage == lang) {
				$('#' + t.id + '_captions_' + lang).prop('checked', true).trigger('click');
			}

			t.adjustLanguageBox();
		},

		removeTrackButton: function(lang) {
			var t = this;

			t.captionsButton.find('input[value=' + lang + ']').closest('li').remove();

			t.adjustLanguageBox();
		},

		addTrackButton: function(lang, label) {
			var t = this;
			if (label === '') {
				label = mejs.language.codes[lang] || lang;
			}

			t.captionsButton.find('ul').append(
				$('<li>'+
					'<input type="checkbox" name="' + t.id + '_captions" id="' + t.id + '_captions_' + lang + '" value="' + lang + '" disabled="disabled" />' +
					'<label for="' + t.id + '_captions_' + lang + '">' + label + ' (loading)' + '</label>'+
				'</li>')
			);

			t.adjustLanguageBox();

			// remove this from the dropdownlist (if it exists)
			t.container.find('.mejs-captions-translations option[value=' + lang + ']').remove();
		},

		adjustLanguageBox:function() {
			var t = this;
			// adjust the size of the outer box
			t.captionsButton.find('.mejs-captions-selector').height(
				t.captionsButton.find('.mejs-captions-selector ul').outerHeight(true) +
				t.captionsButton.find('.mejs-captions-translations').outerHeight(true)
			);
		},

		checkForTracks: function() {
			var
				t = this,
				hasSubtitles = false;

			// check if any subtitles
			if (t.options.hideCaptionsButtonWhenEmpty) {
				for (i=0; i<t.tracks.length; i++) {
					if (t.tracks[i].kind == 'subtitles' && t.tracks[i].isLoaded) {
						hasSubtitles = true;
						break;
					}
				}

				if (!hasSubtitles) {
					t.captionsButton.hide();
					t.setControlsSize();
				}
			}
		},

		displayCaptions: function() {

			if (typeof this.tracks == 'undefined')
				return;

			var
				t = this,
				i,
				track = t.selectedTrack;

			if (track !== null && track.isLoaded) {
				for (i=0; i<track.entries.times.length; i++) {
					if (t.media.currentTime >= track.entries.times[i].start && t.media.currentTime <= track.entries.times[i].stop) {
						// Set the line before the timecode as a class so the cue can be targeted if needed
						t.captionsText.html(track.entries.text[i]).attr('class', 'mejs-captions-text ' + (track.entries.times[i].identifier || ''));
						t.captions.show().height(0);
						return; // exit out if one is visible;
					}
				}
				t.captions.hide();
			} else {
				t.captions.hide();
			}
		},

		setupSlides: function(track) {
			var t = this;

			t.slides = track;
			t.slides.entries.imgs = [t.slides.entries.text.length];
			t.showSlide(0);

		},

		showSlide: function(index) {
			if (typeof this.tracks == 'undefined' || typeof this.slidesContainer == 'undefined') {
				return;
			}

			var t = this,
				url = t.slides.entries.text[index],
				img = t.slides.entries.imgs[index];

			if (typeof img == 'undefined' || typeof img.fadeIn == 'undefined') {

				t.slides.entries.imgs[index] = img = $('<img src="' + url + '">')
						.on('load', function() {
							img.appendTo(t.slidesContainer)
								.hide()
								.fadeIn()
								.siblings(':visible')
									.fadeOut();

						});

			} else {

				if (!img.is(':visible') && !img.is(':animated')) {

					//

					img.fadeIn()
						.siblings(':visible')
							.fadeOut();
				}
			}

		},

		displaySlides: function() {

			if (typeof this.slides == 'undefined')
				return;

			var
				t = this,
				slides = t.slides,
				i;

			for (i=0; i<slides.entries.times.length; i++) {
				if (t.media.currentTime >= slides.entries.times[i].start && t.media.currentTime <= slides.entries.times[i].stop){

					t.showSlide(i);

					return; // exit out if one is visible;
				}
			}
		},

		displayChapters: function() {
			var
				t = this,
				i;

			for (i=0; i<t.tracks.length; i++) {
				if (t.tracks[i].kind == 'chapters' && t.tracks[i].isLoaded) {
					t.drawChapters(t.tracks[i]);
					t.hasChapters = true;
					break;
				}
			}
		},

		drawChapters: function(chapters) {
			var
				t = this,
				i,
				dur,
				//width,
				//left,
				percent = 0,
				usedPercent = 0;

			t.chapters.empty();

			for (i=0; i<chapters.entries.times.length; i++) {
				dur = chapters.entries.times[i].stop - chapters.entries.times[i].start;
				percent = Math.floor(dur / t.media.duration * 100);
				if (percent + usedPercent > 100 || // too large
					i == chapters.entries.times.length-1 && percent + usedPercent < 100) // not going to fill it in
					{
					percent = 100 - usedPercent;
				}
				//width = Math.floor(t.width * dur / t.media.duration);
				//left = Math.floor(t.width * chapters.entries.times[i].start / t.media.duration);
				//if (left + width > t.width) {
				//	width = t.width - left;
				//}

				t.chapters.append( $(
					'<div class="mejs-chapter" rel="' + chapters.entries.times[i].start + '" style="left: ' + usedPercent.toString() + '%;width: ' + percent.toString() + '%;">' +
						'<div class="mejs-chapter-block' + ((i==chapters.entries.times.length-1) ? ' mejs-chapter-block-last' : '') + '">' +
							'<span class="ch-title">' + chapters.entries.text[i] + '</span>' +
							'<span class="ch-time">' + mejs.Utility.secondsToTimeCode(chapters.entries.times[i].start, t.options) + '&ndash;' + mejs.Utility.secondsToTimeCode(chapters.entries.times[i].stop, t.options) + '</span>' +
						'</div>' +
					'</div>'));
				usedPercent += percent;
			}

			t.chapters.find('div.mejs-chapter').click(function() {
				t.media.setCurrentTime( parseFloat( $(this).attr('rel') ) );
				if (t.media.paused) {
					t.media.play();
				}
			});

			t.chapters.show();
		}
	});



	mejs.language = {
		codes:  {
			af:'Afrikaans',
			sq:'Albanian',
			ar:'Arabic',
			be:'Belarusian',
			bg:'Bulgarian',
			ca:'Catalan',
			zh:'Chinese',
			'zh-cn':'Chinese Simplified',
			'zh-tw':'Chinese Traditional',
			hr:'Croatian',
			cs:'Czech',
			da:'Danish',
			nl:'Dutch',
			en:'English',
			et:'Estonian',
			fl:'Filipino',
			fi:'Finnish',
			fr:'French',
			gl:'Galician',
			de:'German',
			el:'Greek',
			ht:'Haitian Creole',
			iw:'Hebrew',
			hi:'Hindi',
			hu:'Hungarian',
			is:'Icelandic',
			id:'Indonesian',
			ga:'Irish',
			it:'Italian',
			ja:'Japanese',
			ko:'Korean',
			lv:'Latvian',
			lt:'Lithuanian',
			mk:'Macedonian',
			ms:'Malay',
			mt:'Maltese',
			no:'Norwegian',
			fa:'Persian',
			pl:'Polish',
			pt:'Portuguese',
			// 'pt-pt':'Portuguese (Portugal)',
			ro:'Romanian',
			ru:'Russian',
			sr:'Serbian',
			sk:'Slovak',
			sl:'Slovenian',
			es:'Spanish',
			sw:'Swahili',
			sv:'Swedish',
			tl:'Tagalog',
			th:'Thai',
			tr:'Turkish',
			uk:'Ukrainian',
			vi:'Vietnamese',
			cy:'Welsh',
			yi:'Yiddish'
		}
	};

	/*
	Parses WebVTT format which should be formatted as
	================================
	WEBVTT

	1
	00:00:01,1 --> 00:00:05,000
	A line of text

	2
	00:01:15,1 --> 00:02:05,000
	A second line of text

	===============================

	Adapted from: http://www.delphiki.com/html5/playr
	*/
	mejs.TrackFormatParser = {
		webvtt: {
			pattern_timecode: /^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,

			parse: function(trackText) {
				var
					i = 0,
					lines = mejs.TrackFormatParser.split2(trackText, /\r?\n/),
					entries = {text:[], times:[]},
					timecode,
					text,
					identifier;
				for(; i<lines.length; i++) {
					timecode = this.pattern_timecode.exec(lines[i]);

					if (timecode && i<lines.length) {
						if ((i - 1) >= 0 && lines[i - 1] !== '') {
							identifier = lines[i - 1];
						}
						i++;
						// grab all the (possibly multi-line) text that follows
						text = lines[i];
						i++;
						while(lines[i] !== '' && i<lines.length){
							text = text + '\n' + lines[i];
							i++;
						}
						text = $.trim(text).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>");
						// Text is in a different array so I can use .join
						entries.text.push(text);
						entries.times.push(
						{
							identifier: identifier,
							start: (mejs.Utility.convertSMPTEtoSeconds(timecode[1]) === 0) ? 0.200 : mejs.Utility.convertSMPTEtoSeconds(timecode[1]),
							stop: mejs.Utility.convertSMPTEtoSeconds(timecode[3]),
							settings: timecode[5]
						});
					}
					identifier = '';
				}
				return entries;
			}
		},
		// Thanks to Justin Capella: https://github.com/johndyer/mediaelement/pull/420
		dfxp: {
			parse: function(trackText) {
				trackText = $(trackText).filter("tt");
				var
					i = 0,
					container = trackText.children("div").eq(0),
					lines = container.find("p"),
					styleNode = trackText.find("#" + container.attr("style")),
					styles,
					text,
					entries = {text:[], times:[]};


				if (styleNode.length) {
					var attributes = styleNode.removeAttr("id").get(0).attributes;
					if (attributes.length) {
						styles = {};
						for (i = 0; i < attributes.length; i++) {
							styles[attributes[i].name.split(":")[1]] = attributes[i].value;
						}
					}
				}

				for(i = 0; i<lines.length; i++) {
					var style;
					var _temp_times = {
						start: null,
						stop: null,
						style: null
					};
					if (lines.eq(i).attr("begin")) _temp_times.start = mejs.Utility.convertSMPTEtoSeconds(lines.eq(i).attr("begin"));
					if (!_temp_times.start && lines.eq(i-1).attr("end")) _temp_times.start = mejs.Utility.convertSMPTEtoSeconds(lines.eq(i-1).attr("end"));
					if (lines.eq(i).attr("end")) _temp_times.stop = mejs.Utility.convertSMPTEtoSeconds(lines.eq(i).attr("end"));
					if (!_temp_times.stop && lines.eq(i+1).attr("begin")) _temp_times.stop = mejs.Utility.convertSMPTEtoSeconds(lines.eq(i+1).attr("begin"));
					if (styles) {
						style = "";
						for (var _style in styles) {
							style += _style + ":" + styles[_style] + ";";
						}
					}
					if (style) _temp_times.style = style;
					if (_temp_times.start === 0) _temp_times.start = 0.200;
					entries.times.push(_temp_times);
					text = $.trim(lines.eq(i).html()).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>");
					entries.text.push(text);
					if (entries.times.start === 0) entries.times.start = 2;
				}
				return entries;
			}
		},
		split2: function (text, regex) {
			// normal version for compliant browsers
			// see below for IE fix
			return text.split(regex);
		}
	};

	// test for browsers with bad String.split method.
	if ('x\n\ny'.split(/\n/gi).length != 3) {
		// add super slow IE8 and below version
		mejs.TrackFormatParser.split2 = function(text, regex) {
			var
				parts = [],
				chunk = '',
				i;

			for (i=0; i<text.length; i++) {
				chunk += text.substring(i,i+1);
				if (regex.test(chunk)) {
					parts.push(chunk.replace(regex, ''));
					chunk = '';
				}
			}
			parts.push(chunk);
			return parts;
		};
	}

})(mejs.$);
define("components/adapt-contrib-media/js/mediaelement-and-player-accessible-captions", function(){});

define('components/adapt-contrib-media/js/adapt-contrib-media',['require','components/adapt-contrib-media/js/mediaelement-and-player','components/adapt-contrib-media/js/mediaelement-and-player-accessible-captions','coreViews/componentView','coreJS/adapt'],function(require) {

    var mep = require('components/adapt-contrib-media/js/mediaelement-and-player');
    require('components/adapt-contrib-media/js/mediaelement-and-player-accessible-captions');

    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var froogaloopAdded = false;
    
    // The following function is used to to prevent a memory leak in Internet Explorer 
    // See: http://javascript.crockford.com/memory/leak.html
    function purge(d) {
        var a = d.attributes, i, l, n;
        if (a) {
            for (i = a.length - 1; i >= 0; i -= 1) {
                n = a[i].name;
                if (typeof d[n] === 'function') {
                    d[n] = null;
                }
            }
        }
        a = d.childNodes;
        if (a) {
            l = a.length;
            for (i = 0; i < l; i += 1) {
                purge(d.childNodes[i]);
            }
        }
    }

    var Media = ComponentView.extend({

        events: {
            "click .media-inline-transcript-button": "onToggleInlineTranscript"
        },

        preRender: function() {
            this.listenTo(Adapt, 'device:resize', this.onScreenSizeChanged);
            this.listenTo(Adapt, 'device:changed', this.onDeviceChanged);
            this.listenTo(Adapt, 'accessibility:toggle', this.onAccessibilityToggle);

            if (this.model.get('_media').source) {
                // Remove the protocol for streaming service.
                // This prevents conflicts with HTTP/HTTPS
                var media = this.model.get('_media');

                media.source = media.source.replace(/^https?\:/, "");

                this.model.set('_media', media); 
            }

            this.checkIfResetOnRevisit();
        },

        postRender: function() {
            this.setupPlayer();
        },


        setupPlayer: function() {
            if (!this.model.get('_playerOptions')) this.model.set('_playerOptions', {});

            var modelOptions = this.model.get('_playerOptions');

            if (modelOptions.pluginPath === undefined) modelOptions.pluginPath = 'assets/';
            if(modelOptions.features === undefined) {
                modelOptions.features = ['playpause','progress','current','duration'];
                if (this.model.get('_useClosedCaptions')) {
                    modelOptions.features.unshift('tracks');
                }
                if (this.model.get("_allowFullScreen") && !$("html").is(".ie9")) {
                    modelOptions.features.push('fullscreen');
                }
            }

            modelOptions.success = _.bind(this.onPlayerReady, this);

            if (this.model.get('_useClosedCaptions')) {
                modelOptions.startLanguage = this.model.get('_startLanguage') === undefined ? 'en' : this.model.get('_startLanguage');
            }

            var hasAccessibility = Adapt.config.has('_accessibility') && Adapt.config.get('_accessibility')._isActive
                ? true
                : false;

            if (hasAccessibility) {
                modelOptions.alwaysShowControls = true;
                modelOptions.hideVideoControlsOnLoad = false;
            }

            if (modelOptions.alwaysShowControls === undefined) {
                modelOptions.alwaysShowControls = false;
            }
            if (modelOptions.hideVideoControlsOnLoad === undefined) {
                modelOptions.hideVideoControlsOnLoad = true;
            }

            this.addMediaTypeClass();

            this.addThirdPartyFixes(modelOptions, _.bind(function createPlayer() {
                // create the player
                this.$('audio, video').mediaelementplayer(modelOptions);

                // We're streaming - set ready now, as success won't be called above
                try {
                    if (this.model.get('_media').source) {
                        this.$('.media-widget').addClass('external-source');
                    }
                } catch (e) {
                    console.log("ERROR! No _media property found in components.json for component " + this.model.get('_id'));
                } finally {
                    this.setReadyStatus();
                }
            }, this));
        },

        addMediaTypeClass: function() {
            var media = this.model.get("_media");
            if (media && media.type) {
                var typeClass = media.type.replace(/\//, "-");
                this.$(".media-widget").addClass(typeClass);
            }
        },

        addThirdPartyFixes: function(modelOptions, callback) {
            var media = this.model.get("_media");
            if (!media) return callback();

            switch (media.type) {
                case "video/vimeo":
                    modelOptions.alwaysShowControls = false;
                    modelOptions.hideVideoControlsOnLoad = true;
                    modelOptions.features = [];
                    if (froogaloopAdded) return callback();
                    Modernizr.load({
                        load: "assets/froogaloop.js",
                        complete: function() {
                            froogaloopAdded = true;
                            callback();
                        }
                    });
                    break;
                default:
                    callback();
            }
        },

        setupEventListeners: function() {
            this.completionEvent = (!this.model.get('_setCompletionOn')) ? 'play' : this.model.get('_setCompletionOn');

            if (this.completionEvent !== 'inview') {
                this.onCompletion = _.bind(this.onCompletion, this);
                this.mediaElement.addEventListener(this.completionEvent, this.onCompletion);
            } else {
                this.$('.component-widget').on('inview', _.bind(this.inview, this));
            }
        },

        // Overrides the default play/pause functionality to stop accidental playing on touch devices
        setupPlayPauseToggle: function() {
            // bit sneaky, but we don't have a this.mediaElement.player ref on iOS devices
            var player = this.mediaElement.player;

            if (!player) {
                console.log("Media.setupPlayPauseToggle: OOPS! there's no player reference.");
                return;
            }

            // stop the player dealing with this, we'll do it ourselves
            player.options.clickToPlayPause = false;

            this.onOverlayClick = _.bind(this.onOverlayClick, this);
            this.onMediaElementClick = _.bind(this.onMediaElementClick, this);

            // play on 'big button' click
            this.$('.mejs-overlay-button').on("click", this.onOverlayClick);

            // pause on player click
            this.$('.mejs-mediaelement').on("click", this.onMediaElementClick);
        },

        onOverlayClick: function() {
            var player = this.mediaElement.player;
            if (!player) return;

            player.play();
        },

        onMediaElementClick: function(event) {
            var player = this.mediaElement.player;
            if (!player) return;

            var isPaused = player.media.paused;
            if(!isPaused) player.pause();
        },

        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        },

        inview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }

                if (this._isVisibleTop && this._isVisibleBottom) {
                    this.$('.component-inner').off('inview');
                    this.setCompletionStatus();
                }
            }
        },

        remove: function() {
            this.$('.mejs-overlay-button').off("click", this.onOverlayClick);
            this.$('.mejs-mediaelement').off("click", this.onMediaElementClick);

            var modelOptions = this.model.get('_playerOptions');
            delete modelOptions.success;

            var media = this.model.get("_media");
            if (media) {
                switch (media.type) {
                case "video/vimeo":
                    this.$("iframe")[0].isRemoved = true;
                }
            }

            if ($("html").is(".ie8")) {
                var obj = this.$("object")[0];
                if (obj) {
                    obj.style.display = "none";
                }
            }
            if (this.mediaElement && this.mediaElement.player) {
                if (this.completionEvent !== 'inview') {
                    this.mediaElement.removeEventListener(this.completionEvent, this.onCompletion);
                }

                var player_id = this.mediaElement.player.id;

                purge(this.$el[0]);
                this.mediaElement.player.remove();

                if (mejs.players[player_id]) {
                    delete mejs.players[player_id];
                }
            }
            if (this.mediaElement) {
                this.mediaElement.src = "";
                $(this.mediaElement.pluginElement).remove();
                delete this.mediaElement;
            }
            ComponentView.prototype.remove.call(this);
        },

        onCompletion: function() {
            this.setCompletionStatus();

            // removeEventListener needs to pass in the method to remove the event in firefox and IE10
            this.mediaElement.removeEventListener(this.completionEvent, this.onCompletion);
        },

        onDeviceChanged: function() {
            if (this.model.get('_media').source) {
                this.$('.mejs-container').width(this.$('.component-widget').width());
            }
        },

        onPlayerReady: function (mediaElement, domObject) {
            this.mediaElement = mediaElement;

            if (!this.mediaElement.player) {
                this.mediaElement.player =  mejs.players[this.$('.mejs-container').attr('id')];
            }

            var hasTouch = mejs.MediaFeatures.hasTouch;
            if (hasTouch) {
                this.setupPlayPauseToggle();
            }

            this.addThirdPartyAfterFixes();

            this.setReadyStatus();
            this.setupEventListeners();
        },

        addThirdPartyAfterFixes: function() {
            var media = this.model.get("_media");
            switch (media.type) {
            case "video/vimeo":
                this.$(".mejs-container").attr("tabindex", 0);
            }
        },

        onScreenSizeChanged: function() {
            this.$('audio, video').width(this.$('.component-widget').width());
        },

        onAccessibilityToggle: function() {
           this.showControls();
        },

        onToggleInlineTranscript: function(event) {
            if (event) event.preventDefault();
            var $transcriptBodyContainer = this.$(".media-inline-transcript-body-container");
            var $button = this.$(".media-inline-transcript-button");

            if ($transcriptBodyContainer.hasClass("inline-transcript-open")) {
                $transcriptBodyContainer.slideUp(function() {
                    $(window).resize();
                });
                $transcriptBodyContainer.removeClass("inline-transcript-open");
                $button.html(this.model.get("_transcript").inlineTranscriptButton);
            } else {
                $transcriptBodyContainer.slideDown(function() {
                    $(window).resize();
                }).a11y_focus();
                $transcriptBodyContainer.addClass("inline-transcript-open");
                $button.html(this.model.get("_transcript").inlineTranscriptCloseButton);
                if (this.model.get('_transcript')._setCompletionOnView !== false) {
                    this.setCompletionStatus();
                }
            }
        },

        showControls: function() {
            var hasAccessibility = Adapt.config.has('_accessibility') && Adapt.config.get('_accessibility')._isActive
                ? true
                : false;

            if (hasAccessibility) {
                if (!this.mediaElement.player) return;

                var player = this.mediaElement.player;

                player.options.alwaysShowControls = true;
                player.options.hideVideoControlsOnLoad = false;
                player.enableControls();
                player.showControls();

                this.$('.mejs-playpause-button button').attr({
                    "role": "button"
                });
                var screenReaderVideoTagFix = $("<div role='region' aria-label='.'>");
                this.$('.mejs-playpause-button').prepend(screenReaderVideoTagFix);

                this.$('.mejs-time, .mejs-time-rail').attr({
                    "aria-hidden": "true"
                });
            }
        }
    });

    Adapt.register('media', Media);

    return Media;

});
define('components/adapt-contrib-narrative/js/adapt-contrib-narrative',['require','coreViews/componentView','coreJS/adapt'],function(require) {

    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var Narrative = ComponentView.extend({

        events: {
            'click .narrative-strapline-title': 'openPopup',
            'click .narrative-controls': 'onNavigationClicked',
            'click .narrative-indicators .narrative-progress': 'onProgressClicked'
        },

        preRender: function() {
            this.listenTo(Adapt, 'device:changed', this.reRender, this);
            this.listenTo(Adapt, 'device:resize', this.resizeControl, this);
            this.listenTo(Adapt, 'notify:closed', this.closeNotify, this);
            this.setDeviceSize();

            // Checks to see if the narrative should be reset on revisit
            this.checkIfResetOnRevisit();
        },

        setDeviceSize: function() {
            if (Adapt.device.screenSize === 'large') {
                this.$el.addClass('desktop').removeClass('mobile');
                this.model.set('_isDesktop', true);
            } else {
                this.$el.addClass('mobile').removeClass('desktop');
                this.model.set('_isDesktop', false)
            }
        },

        postRender: function() {
            this.renderState();
            this.$('.narrative-slider').imageready(_.bind(function() {
                this.setReadyStatus();
            }, this));
            this.setupNarrative();
        },

        // Used to check if the narrative should reset on revisit
        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
                this.model.set({_stage: 0});

                _.each(this.model.get('_items'), function(item) {
                    item._isVisited = false;
                });
            }
        },

        setupNarrative: function() {
            this.setDeviceSize();
            if(!this.model.has('_items') || !this.model.get('_items').length) return;
            this.model.set('_marginDir', 'left');
            if (Adapt.config.get('_defaultDirection') == 'rtl') {
                this.model.set('_marginDir', 'right');
            }
            this.model.set('_itemCount', this.model.get('_items').length);

            this.model.set('_active', true);

            if (this.model.get('_stage')) {
                this.setStage(this.model.get('_stage'), true);
            } else {
                this.setStage(0, true);
            }
            this.calculateWidths();

            if (Adapt.device.screenSize !== 'large' && !this.model.get('_wasHotgraphic')) {
                this.replaceInstructions();
            }
            this.setupEventListeners();
            
            // if hasNavigationInTextArea set margin left 
            var hasNavigationInTextArea = this.model.get('_hasNavigationInTextArea');
            if (hasNavigationInTextArea == true) {
                var indicatorWidth = this.$('.narrative-indicators').width();
                var marginLeft = indicatorWidth / 2;
                
                this.$('.narrative-indicators').css({
                    marginLeft: '-' + marginLeft + 'px'
                });
            }
        },

        calculateWidths: function() {
            var slideWidth = this.$('.narrative-slide-container').width();
            var slideCount = this.model.get('_itemCount');
            var marginRight = this.$('.narrative-slider-graphic').css('margin-right');
            var extraMargin = marginRight === '' ? 0 : parseInt(marginRight);
            var fullSlideWidth = (slideWidth + extraMargin) * slideCount;

            this.$('.narrative-slider-graphic').width(slideWidth);
            this.$('.narrative-strapline-header').width(slideWidth);
            this.$('.narrative-strapline-title').width(slideWidth);

            this.$('.narrative-slider').width(fullSlideWidth);
            this.$('.narrative-strapline-header-inner').width(fullSlideWidth);

            var stage = this.model.get('_stage');
            var margin = -(stage * slideWidth);

            this.$('.narrative-slider').css(('margin-' + this.model.get('_marginDir')), margin);
            this.$('.narrative-strapline-header-inner').css(('margin-' + this.model.get('_marginDir')), margin);

            this.model.set('_finalItemLeft', fullSlideWidth - slideWidth);
        },

        resizeControl: function() {
            var wasDesktop = this.model.get('_isDesktop');
            this.setDeviceSize();
            if (wasDesktop != this.model.get('_isDesktop')) this.replaceInstructions();
            this.calculateWidths();
            this.evaluateNavigation();
        },

        reRender: function() {
            if (this.model.get('_wasHotgraphic') && Adapt.device.screenSize == 'large') {
                this.replaceWithHotgraphic();
            } else {
                this.resizeControl();
            }
        },

        closeNotify: function() {
            this.evaluateCompletion()
        },

        replaceInstructions: function() {
            if (Adapt.device.screenSize === 'large') {
                this.$('.narrative-instruction-inner').html(this.model.get('instruction')).a11y_text();
            } else if (this.model.get('mobileInstruction') && !this.model.get('_wasHotgraphic')) {
                this.$('.narrative-instruction-inner').html(this.model.get('mobileInstruction')).a11y_text();
            }
        },

        replaceWithHotgraphic: function() {
            if (!Adapt.componentStore.hotgraphic) throw "Hotgraphic not included in build";
            var Hotgraphic = Adapt.componentStore.hotgraphic;
            
            var model = this.prepareHotgraphicModel();
            var newHotgraphic = new Hotgraphic({ model: model });
            var $container = $(".component-container", $("." + this.model.get("_parentId")));

            $container.append(newHotgraphic.$el);
            this.remove();
            $.a11y_update();
            _.defer(function() {
                Adapt.trigger('device:resize');
            });
        },

        prepareHotgraphicModel: function() {
            var model = this.model;
            model.set('_component', 'hotgraphic');
            model.set('body', model.get('originalBody'));
            model.set('instruction', model.get('originalInstruction'));
            return model;
        },

        moveSliderToIndex: function(itemIndex, animate, callback) {
            var extraMargin = parseInt(this.$('.narrative-slider-graphic').css('margin-right'));
            var movementSize = this.$('.narrative-slide-container').width() + extraMargin;
            var marginDir = {};
            if (animate && !Adapt.config.get('_disableAnimation')) {
                marginDir['margin-' + this.model.get('_marginDir')] = -(movementSize * itemIndex);
                this.$('.narrative-slider').velocity("stop", true).velocity(marginDir);
                this.$('.narrative-strapline-header-inner').velocity("stop", true).velocity(marginDir, {complete:callback});
            } else {
                marginDir['margin-' + this.model.get('_marginDir')] = -(movementSize * itemIndex);
                this.$('.narrative-slider').css(marginDir);
                this.$('.narrative-strapline-header-inner').css(marginDir);
                callback();
            }
        },

        setStage: function(stage, initial) {
            this.model.set('_stage', stage);
            if (this.model.get('_isDesktop')) {
                // Set the visited attribute for large screen devices
                var currentItem = this.getCurrentItem(stage);
                currentItem._isVisited = true;
            }

            this.$('.narrative-progress:visible').removeClass('selected').eq(stage).addClass('selected');
            this.$('.narrative-slider-graphic').children('.controls').a11y_cntrl_enabled(false);
            this.$('.narrative-slider-graphic').eq(stage).children('.controls').a11y_cntrl_enabled(true);
            this.$('.narrative-content-item').addClass('narrative-hidden').a11y_on(false).eq(stage).removeClass('narrative-hidden').a11y_on(true);
            this.$('.narrative-strapline-title').a11y_cntrl_enabled(false).eq(stage).a11y_cntrl_enabled(true);

            this.evaluateNavigation();
            this.evaluateCompletion();

            this.moveSliderToIndex(stage, !initial, _.bind(function() {
                if (this.model.get('_isDesktop')) {
                    if (!initial) this.$('.narrative-content-item').eq(stage).a11y_focus();
                } else {
                    if (!initial) this.$('.narrative-strapline-title').a11y_focus();
                }
            }, this));
        },

        constrainStage: function(stage) {
            if (stage > this.model.get('_items').length - 1) {
                stage = this.model.get('_items').length - 1;
            } else if (stage < 0) {
                stage = 0;
            }
            return stage;
        },

        constrainXPosition: function(previousLeft, newLeft, deltaX) {
            if (newLeft > 0 && deltaX > 0) {
                newLeft = previousLeft + (deltaX / (newLeft * 0.1));
            }
            var finalItemLeft = this.model.get('_finalItemLeft');
            if (newLeft < -finalItemLeft && deltaX < 0) {
                var distance = Math.abs(newLeft + finalItemLeft);
                newLeft = previousLeft + (deltaX / (distance * 0.1));
            }
            return newLeft;
        },

        evaluateNavigation: function() {
            var currentStage = this.model.get('_stage');
            var itemCount = this.model.get('_itemCount');
            if (currentStage == 0) {
                this.$('.narrative-controls').addClass('narrative-hidden');

                if (itemCount > 1) {
                    this.$('.narrative-control-right').removeClass('narrative-hidden');
                }
            } else {
                this.$('.narrative-control-left').removeClass('narrative-hidden');

                if (currentStage == itemCount - 1) {
                    this.$('.narrative-control-right').addClass('narrative-hidden');
                } else {
                    this.$('.narrative-control-right').removeClass('narrative-hidden');
                }
            }

        },

        getNearestItemIndex: function() {
            var currentPosition = parseInt(this.$('.narrative-slider').css('margin-left'));
            var graphicWidth = this.$('.narrative-slider-graphic').width();
            var absolutePosition = currentPosition / graphicWidth;
            var stage = this.model.get('_stage');
            var relativePosition = stage - Math.abs(absolutePosition);

            if (relativePosition < -0.3) {
                stage++;
            } else if (relativePosition > 0.3) {
                stage--;
            }

            return this.constrainStage(stage);
        },

        getCurrentItem: function(index) {
            return this.model.get('_items')[index];
        },

        getVisitedItems: function() {
            return _.filter(this.model.get('_items'), function(item) {
                return item._isVisited;
            });
        },

        evaluateCompletion: function() {
            if (this.getVisitedItems().length === this.model.get('_items').length) {
                this.trigger('allItems');
            } 
        },

        moveElement: function($element, deltaX) {
            var previousLeft = parseInt($element.css('margin-left'));
            var newLeft = previousLeft + deltaX;

            newLeft = this.constrainXPosition(previousLeft, newLeft, deltaX);
            $element.css(('margin-' + this.model.get('_marginDir')), newLeft + 'px');
        },

        openPopup: function(event) {
            event.preventDefault();
            var currentItem = this.getCurrentItem(this.model.get('_stage'));
            var popupObject = {
                title: currentItem.title,
                body: currentItem.body
            };

            // Set the visited attribute for small and medium screen devices
            currentItem._isVisited = true;

            Adapt.trigger('notify:popup', popupObject);
        },

        onNavigationClicked: function(event) {

            if (!this.model.get('_active')) return;

            var stage = this.model.get('_stage');
            var numberOfItems = this.model.get('_itemCount');

            if ($(event.currentTarget).hasClass('narrative-control-right')) {
                stage++;
            } else if ($(event.currentTarget).hasClass('narrative-control-left')) {
                stage--;
            }
            stage = (stage + numberOfItems) % numberOfItems;
            this.setStage(stage);
        },
        
        onProgressClicked: function(event) {
            event.preventDefault();
            var clickedIndex = $(event.target).index();
            this.setStage(clickedIndex);
        },

        inview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }

                if (this._isVisibleTop && this._isVisibleBottom) {
                    this.$('.component-inner').off('inview');
                    this.setCompletionStatus();
                }
            }
        },

        onCompletion: function() {
            this.setCompletionStatus();
            if (this.completionEvent && this.completionEvent != 'inview') {
                this.off(this.completionEvent, this);
            }
        },

        setupEventListeners: function() {
            this.completionEvent = (!this.model.get('_setCompletionOn')) ? 'allItems' : this.model.get('_setCompletionOn');
            if (this.completionEvent !== 'inview' && this.model.get('_items').length > 1) {
                this.on(this.completionEvent, _.bind(this.onCompletion, this));
            } else {
                this.$('.component-widget').on('inview', _.bind(this.inview, this));
            }
        }

    });

    Adapt.register('narrative', Narrative);

    return Narrative;

});

/*! rangeslider.js - v2.1.1 | (c) 2016 @andreruffert | MIT license | https://github.com/andreruffert/rangeslider.js */
(function(factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('components/adapt-contrib-slider/js/rangeslider.js',['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {
    'use strict';

    // Polyfill Number.isNaN(value)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
    Number.isNaN = Number.isNaN || function(value) {
        return typeof value === 'number' && value !== value;
    };

    /**
     * Range feature detection
     * @return {Boolean}
     */
    function supportsRange() {
        var input = document.createElement('input');
        input.setAttribute('type', 'range');
        return input.type !== 'text';
    }

    var pluginName = 'rangeslider',
        pluginIdentifier = 0,
        hasInputRangeSupport = supportsRange(),
        defaults = {
            polyfill: true,
            orientation: 'horizontal',
            rangeClass: 'rangeslider',
            disabledClass: 'rangeslider--disabled',
            horizontalClass: 'rangeslider--horizontal',
            verticalClass: 'rangeslider--vertical',
            fillClass: 'rangeslider__fill',
            handleClass: 'rangeslider__handle',
            startEvent: ['mousedown', 'touchstart', 'pointerdown'],
            moveEvent: ['mousemove', 'touchmove', 'pointermove'],
            endEvent: ['mouseup', 'touchend', 'pointerup']
        },
        constants = {
            orientation: {
                horizontal: {
                    dimension: 'width',
                    direction: 'left',
                    directionStyle: 'left',
                    coordinate: 'x'
                },
                vertical: {
                    dimension: 'height',
                    direction: 'top',
                    directionStyle: 'bottom',
                    coordinate: 'y'
                }
            }
        };

    /**
     * Delays a function for the given number of milliseconds, and then calls
     * it with the arguments supplied.
     *
     * @param  {Function} fn   [description]
     * @param  {Number}   wait [description]
     * @return {Function}
     */
    function delay(fn, wait) {
        var args = Array.prototype.slice.call(arguments, 2);
        return setTimeout(function(){ return fn.apply(null, args); }, wait);
    }

    /**
     * Returns a debounced function that will make sure the given
     * function is not triggered too much.
     *
     * @param  {Function} fn Function to debounce.
     * @param  {Number}   debounceDuration OPTIONAL. The amount of time in milliseconds for which we will debounce the function. (defaults to 100ms)
     * @return {Function}
     */
    function debounce(fn, debounceDuration) {
        debounceDuration = debounceDuration || 100;
        return function() {
            if (!fn.debouncing) {
                var args = Array.prototype.slice.apply(arguments);
                fn.lastReturnVal = fn.apply(window, args);
                fn.debouncing = true;
            }
            clearTimeout(fn.debounceTimeout);
            fn.debounceTimeout = setTimeout(function(){
                fn.debouncing = false;
            }, debounceDuration);
            return fn.lastReturnVal;
        };
    }

    /**
     * Check if a `element` is visible in the DOM
     *
     * @param  {Element}  element
     * @return {Boolean}
     */
    function isHidden(element) {
        return (
            element && (
                element.offsetWidth === 0 ||
                element.offsetHeight === 0 ||
                // Also Consider native `<details>` elements.
                element.open === false
            )
        );
    }

    /**
     * Get hidden parentNodes of an `element`
     *
     * @param  {Element} element
     * @return {[type]}
     */
    function getHiddenParentNodes(element) {
        var parents = [],
            node    = element.parentNode;

        while (isHidden(node)) {
            parents.push(node);
            node = node.parentNode;
        }
        return parents;
    }

    /**
     * Returns dimensions for an element even if it is not visible in the DOM.
     *
     * @param  {Element} element
     * @param  {String}  key     (e.g. offsetWidth …)
     * @return {Number}
     */
    function getDimension(element, key) {
        var hiddenParentNodes       = getHiddenParentNodes(element),
            hiddenParentNodesLength = hiddenParentNodes.length,
            inlineStyle             = [],
            dimension               = element[key];

        // Used for native `<details>` elements
        function toggleOpenProperty(element) {
            if (typeof element.open !== 'undefined') {
                element.open = (element.open) ? false : true;
            }
        }

        if (hiddenParentNodesLength) {
            for (var i = 0; i < hiddenParentNodesLength; i++) {

                // Cache style attribute to restore it later.
                inlineStyle[i] = hiddenParentNodes[i].style.cssText;

                // visually hide
                if (hiddenParentNodes[i].style.setProperty) {
                    hiddenParentNodes[i].style.setProperty('display', 'block', 'important');
                } else {
                    hiddenParentNodes[i].style.cssText += ';display: block !important';
                }
                hiddenParentNodes[i].style.height = '0';
                hiddenParentNodes[i].style.overflow = 'hidden';
                hiddenParentNodes[i].style.visibility = 'hidden';
                toggleOpenProperty(hiddenParentNodes[i]);
            }

            // Update dimension
            dimension = element[key];

            for (var j = 0; j < hiddenParentNodesLength; j++) {

                // Restore the style attribute
                hiddenParentNodes[j].style.cssText = inlineStyle[j];
                toggleOpenProperty(hiddenParentNodes[j]);
            }
        }
        return dimension;
    }

    /**
     * Returns the parsed float or the default if it failed.
     *
     * @param  {String}  str
     * @param  {Number}  defaultValue
     * @return {Number}
     */
    function tryParseFloat(str, defaultValue) {
        var value = parseFloat(str);
        return Number.isNaN(value) ? defaultValue : value;
    }

    /**
     * Capitalize the first letter of string
     *
     * @param  {String} str
     * @return {String}
     */
    function ucfirst(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }

    /**
     * Plugin
     * @param {String} element
     * @param {Object} options
     */
    function Plugin(element, options) {
        this.$window            = $(window);
        this.$document          = $(document);
        this.$element           = $(element);
        this.options            = $.extend( {}, defaults, options );
        this.polyfill           = this.options.polyfill;
        this.orientation        = this.$element[0].getAttribute('data-orientation') || this.options.orientation;
        this.onInit             = this.options.onInit;
        this.onSlide            = this.options.onSlide;
        this.onSlideEnd         = this.options.onSlideEnd;
        this.DIMENSION          = constants.orientation[this.orientation].dimension;
        this.DIRECTION          = constants.orientation[this.orientation].direction;
        this.DIRECTION_STYLE    = constants.orientation[this.orientation].directionStyle;
        this.COORDINATE         = constants.orientation[this.orientation].coordinate;

        // Plugin should only be used as a polyfill
        if (this.polyfill) {
            // Input range support?
            if (hasInputRangeSupport) { return false; }
        }

        this.identifier = 'js-' + pluginName + '-' +(pluginIdentifier++);
        this.startEvent = this.options.startEvent.join('.' + this.identifier + ' ') + '.' + this.identifier;
        this.moveEvent  = this.options.moveEvent.join('.' + this.identifier + ' ') + '.' + this.identifier;
        this.endEvent   = this.options.endEvent.join('.' + this.identifier + ' ') + '.' + this.identifier;
        this.toFixed    = (this.step + '').replace('.', '').length - 1;
        this.$fill      = $('<div class="' + this.options.fillClass + '" />');
        this.$handle    = $('<div class="' + this.options.handleClass + '" />');
        this.$range     = $('<div class="' + this.options.rangeClass + ' ' + this.options[this.orientation + 'Class'] + '" id="' + this.identifier + '" />').insertAfter(this.$element).prepend(this.$fill, this.$handle);

        // visually hide the input
        this.$element.css({
            'position': 'absolute',
            'width': '1px',
            'height': '1px',
            'overflow': 'hidden',
            'opacity': '0'
        });

        // Store context
        this.handleDown = $.proxy(this.handleDown, this);
        this.handleMove = $.proxy(this.handleMove, this);
        this.handleEnd  = $.proxy(this.handleEnd, this);

        this.init();

        // Attach Events
        var _this = this;
        this.$window.on('resize.' + this.identifier, debounce(function() {
            // Simulate resizeEnd event.
            delay(function() { _this.update(false, false); }, 300);
        }, 20));

        this.$document.on(this.startEvent, '#' + this.identifier + ':not(.' + this.options.disabledClass + ')', this.handleDown);

        // Listen to programmatic value changes
        this.$element.on('change.' + this.identifier, function(e, data) {
            if (data && data.origin === _this.identifier) {
                return;
            }

            var value = e.target.value,
                pos = _this.getPositionFromValue(value);
            _this.setPosition(pos);
        });
    }

    Plugin.prototype.init = function() {
        this.update(true, false);

        if (this.onInit && typeof this.onInit === 'function') {
            this.onInit();
        }
    };

    Plugin.prototype.update = function(updateAttributes, triggerSlide) {
        updateAttributes = updateAttributes || false;

        if (updateAttributes) {
            this.min    = tryParseFloat(this.$element[0].getAttribute('min'), 0);
            this.max    = tryParseFloat(this.$element[0].getAttribute('max'), 100);
            this.value  = tryParseFloat(this.$element[0].value, Math.round(this.min + (this.max-this.min)/2));
            this.step   = tryParseFloat(this.$element[0].getAttribute('step'), 1);
        }

        this.handleDimension    = getDimension(this.$handle[0], 'offset' + ucfirst(this.DIMENSION));
        this.rangeDimension     = getDimension(this.$range[0], 'offset' + ucfirst(this.DIMENSION));
        this.maxHandlePos       = this.rangeDimension - this.handleDimension;
        this.grabPos            = this.handleDimension / 2;
        this.position           = this.getPositionFromValue(this.value);

        // Consider disabled state
        if (this.$element[0].disabled) {
            this.$range.addClass(this.options.disabledClass);
        } else {
            this.$range.removeClass(this.options.disabledClass);
        }

        this.setPosition(this.position, triggerSlide);
    };

    Plugin.prototype.handleDown = function(e) {
        this.$document.on(this.moveEvent, this.handleMove);
        this.$document.on(this.endEvent, this.handleEnd);

        // If we click on the handle don't set the new position
        if ((' ' + e.target.className + ' ').replace(/[\n\t]/g, ' ').indexOf(this.options.handleClass) > -1) {
            return;
        }

        var pos         = this.getRelativePosition(e),
            rangePos    = this.$range[0].getBoundingClientRect()[this.DIRECTION],
            handlePos   = this.getPositionFromNode(this.$handle[0]) - rangePos,
            setPos      = (this.orientation === 'vertical') ? (this.maxHandlePos - (pos - this.grabPos)) : (pos - this.grabPos);

        this.setPosition(setPos);

        if (pos >= handlePos && pos < handlePos + this.handleDimension) {
            this.grabPos = pos - handlePos;
        }
    };

    Plugin.prototype.handleMove = function(e) {
        e.preventDefault();
        var pos = this.getRelativePosition(e);
        var setPos = (this.orientation === 'vertical') ? (this.maxHandlePos - (pos - this.grabPos)) : (pos - this.grabPos);
        this.setPosition(setPos);
    };

    Plugin.prototype.handleEnd = function(e) {
        e.preventDefault();
        this.$document.off(this.moveEvent, this.handleMove);
        this.$document.off(this.endEvent, this.handleEnd);

        // Ok we're done fire the change event
        this.$element.trigger('change', { origin: this.identifier });

        if (this.onSlideEnd && typeof this.onSlideEnd === 'function') {
            this.onSlideEnd(this.position, this.value);
        }
    };

    Plugin.prototype.cap = function(pos, min, max) {
        if (pos < min) { return min; }
        if (pos > max) { return max; }
        return pos;
    };

    Plugin.prototype.setPosition = function(pos, triggerSlide) {
        var value, newPos;

        if (triggerSlide === undefined) {
            triggerSlide = true;
        }

        // Snapping steps
        value = this.getValueFromPosition(this.cap(pos, 0, this.maxHandlePos));
        newPos = this.getPositionFromValue(value);

        // Update ui
        this.$fill[0].style[this.DIMENSION] = value == this.max ? '100%' : (newPos + this.grabPos) + 'px';
        this.$handle[0].style[this.DIRECTION_STYLE] = newPos + 'px';
        this.setValue(value);

        // Update globals
        this.position = newPos;
        this.value = value;

        if (triggerSlide && this.onSlide && typeof this.onSlide === 'function') {
            this.onSlide(newPos, value);
        }
    };

    // Returns element position relative to the parent
    Plugin.prototype.getPositionFromNode = function(node) {
        var i = 0;
        while (node !== null) {
            i += node.offsetLeft;
            node = node.offsetParent;
        }
        return i;
    };

    Plugin.prototype.getRelativePosition = function(e) {
        // Get the offset DIRECTION relative to the viewport
        var ucCoordinate = ucfirst(this.COORDINATE),
            rangePos = this.$range[0].getBoundingClientRect()[this.DIRECTION],
            pageCoordinate = 0;

        if (typeof e['page' + ucCoordinate] !== 'undefined') {
            pageCoordinate = e['client' + ucCoordinate];
        }
        else if (typeof e.originalEvent['client' + ucCoordinate] !== 'undefined') {
            pageCoordinate = e.originalEvent['client' + ucCoordinate];
        }
        else if (e.originalEvent.touches && e.originalEvent.touches[0] && typeof e.originalEvent.touches[0]['client' + ucCoordinate] !== 'undefined') {
            pageCoordinate = e.originalEvent.touches[0]['client' + ucCoordinate];
        }
        else if(e.currentPoint && typeof e.currentPoint[this.COORDINATE] !== 'undefined') {
            pageCoordinate = e.currentPoint[this.COORDINATE];
        }

        return pageCoordinate - rangePos;
    };

    Plugin.prototype.getPositionFromValue = function(value) {
        var percentage, pos;
        percentage = (value - this.min)/(this.max - this.min);
        pos = (!Number.isNaN(percentage)) ? percentage * this.maxHandlePos : 0;
        return pos;
    };

    Plugin.prototype.getValueFromPosition = function(pos) {
        var percentage, value;
        percentage = ((pos) / (this.maxHandlePos || 1));
        value = this.step * Math.round(percentage * (this.max - this.min) / this.step) + this.min;
        return Number((value).toFixed(this.toFixed));
    };

    Plugin.prototype.setValue = function(value) {
        if (value === this.value && this.$element[0].value !== '') {
            return;
        }

        // Set the new value and fire the `input` event
        this.$element
            .val(value)
            .trigger('input', { origin: this.identifier });
    };

    Plugin.prototype.destroy = function() {
        this.$document.off('.' + this.identifier);
        this.$window.off('.' + this.identifier);

        this.$element
            .off('.' + this.identifier)
            .removeAttr('style')
            .removeData('plugin_' + pluginName);

        // Remove the generated markup
        if (this.$range && this.$range.length) {
            this.$range[0].parentNode.removeChild(this.$range[0]);
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function() {
            var $this = $(this),
                data  = $this.data('plugin_' + pluginName);

            // Create a new instance.
            if (!data) {
                $this.data('plugin_' + pluginName, (data = new Plugin(this, options)));
            }

            // Make it possible to access methods from public.
            // e.g `$element.rangeslider('method');`
            if (typeof options === 'string') {
                data[options].apply(data, args);
            }
        });
    };

    return 'rangeslider.js is available in jQuery context e.g $(selector).rangeslider(options);';

}));

define('components/adapt-contrib-slider/js/adapt-contrib-slider',[
  'coreViews/questionView',
  'coreJS/adapt',
  './rangeslider.js'
], function(QuestionView, Adapt, Rangeslider) {

    var Slider = QuestionView.extend({

        tempValue:true,

        events: {
            'click .slider-scale-number': 'onNumberSelected',
            'focus input[type="range"]':'onHandleFocus',
            'blur input[type="range"]':'onHandleBlur'
        },

        // Used by the question to reset the question when revisiting the component
        resetQuestionOnRevisit: function() {
            this.setAllItemsEnabled(true);
            this.deselectAllItems();
            this.resetQuestion();
        },

        // Used by question to setup itself just before rendering
        setupQuestion: function() {
            if(!this.model.get('_items')) {
                this.setupModelItems();
            }

            this.restoreUserAnswers();
            if (this.model.get('_isSubmitted')) return;

            this.selectItem(0, true);
        },

        setupRangeslider: function () {
            this.$sliderScaleMarker = this.$('.slider-scale-marker');
            this.$slider = this.$('input[type="range"]');

            if(this.model.has('_scaleStep')) {
                this.$slider.attr({"step": this.model.get('_scaleStep')});
            }

            this.$slider.rangeslider({
                polyfill: false,
                onSlide: _.bind(this.handleSlide, this)
            });
            this.oldValue = 0;
            
            if (this._deferEnable) {
                this.setAllItemsEnabled(true);
            }
        },

        handleSlide: function (position, value) {
            if (this.oldValue === value) {
               return;
            }
            if(this.model.get('_marginDir') == 'right'){
                if(this.tempValue && (this.model.get('_userAnswer') == undefined)){
                    value = this.model.get('_items').length - value + 1;
                    this.tempValue = false;
                    var tempPixels = this.mapIndexToPixels(value);
                    var rangeSliderWidth = this.$('.rangeslider').width();
                    var handleLeft = parseInt(this.$('.rangeslider__handle').css('left'));
                    var sliderWidth = this.$('.rangeslider__fill').width();
                    handleLeft = rangeSliderWidth - handleLeft -this.$('.rangeslider__handle').width();
                    sliderWidth = rangeSliderWidth - sliderWidth;
                    this.$('.rangeslider__handle').css('left',handleLeft);
                    this.$('.rangeslider__fill').width(sliderWidth);
                }
            }
            var itemIndex = this.getIndexFromValue(value);
            var pixels = this.mapIndexToPixels(itemIndex);
            this.selectItem(itemIndex, false);
            this.animateToPosition(pixels);
            this.oldValue = value;
            this.tempValue = true;
        },

        setupModelItems: function() {
            var items = [];
            var answer = this.model.get('_correctAnswer');
            var range = this.model.get('_correctRange');
            var start = this.model.get('_scaleStart');
            var end = this.model.get('_scaleEnd');
            var step = this.model.get('_scaleStep') || 1;

            for (var i = start; i <= end; i += step) {
                if (answer) {
                    items.push({value: i, selected: false, correct: (i == answer)});
                } else {
                    items.push({value: i, selected: false, correct: (i >= range._bottom && i <= range._top)});
                }
            }

            this.model.set('_items', items);
            this.model.set('_marginDir', (Adapt.config.get('_defaultDirection') === 'rtl' ? 'right' : 'left'));
        },

        restoreUserAnswers: function() {
            if (!this.model.get('_isSubmitted')) {
                this.model.set({
                    _selectedItem: {},
                    _userAnswer: undefined
                });
                return;
            };

            var items = this.model.get('_items');
            var userAnswer = this.model.get('_userAnswer');
            for (var i = 0, l = items.length; i < l; i++) {
                var item = items[i];
                if (item.value == userAnswer) {
                    this.model.set('_selectedItem', item);
                    this.selectItem(this.getIndexFromValue(item.value), true);
                    break;
                }
            }

            this.setQuestionAsSubmitted();
            this.markQuestion();
            this.setScore();
            this.showMarking();
            this.setupFeedback();
        },

        // Used by question to disable the question during submit and complete stages
        disableQuestion: function() {
            this.setAllItemsEnabled(false);
        },

        // Used by question to enable the question during interactions
        enableQuestion: function() {
            this.setAllItemsEnabled(true);
        },

        setAllItemsEnabled: function(isEnabled) {
            if (isEnabled) {
                if (this.$slider) {
                    this.$('.slider-widget').removeClass('disabled');
                    this.$slider.prop('disabled', false);
                    this.$slider.rangeslider('update', true);
                } else {
                    this._deferEnable = true; // slider is not yet ready
                }
            } else {
                this.$('.slider-widget').addClass('disabled');
                this.$slider.prop('disabled', true);
                this.$slider.rangeslider('update', true);
            }
        },

        // Used by question to setup itself just after rendering
        onQuestionRendered: function() {
            this.setupRangeslider();
            this.setScalePositions();
            this.onScreenSizeChanged();
            this.showScaleMarker(true);
            this.listenTo(Adapt, 'device:resize', this.onScreenSizeChanged);
            this.setAltText(this.model.get('_scaleStart'));
            this.setReadyStatus();
        },

        // this should make the slider handle, slider marker and slider bar to animate to give position
        animateToPosition: function(newPosition) {
            if (!this.$sliderScaleMarker) return;

            if(this.model.get('_marginDir') == 'right'){
                this.$sliderScaleMarker
                  .velocity('stop')
                  .velocity({
                    right: newPosition
                  }, {
                    duration: 200,
                    easing: "linear"
                  });
            }
            else{
                this.$sliderScaleMarker
                  .velocity('stop')
                  .velocity({
                    left: newPosition
                  }, {
                    duration: 200,
                    easing: "linear"
                  });
            }
        },

        // this shoud give the index of item using given slider value
        getIndexFromValue: function(itemValue) {
            var scaleStart = this.model.get('_scaleStart'),
                scaleEnd = this.model.get('_scaleEnd');
            return Math.floor(this.mapValue(itemValue, scaleStart, scaleEnd, 0, this.model.get('_items').length - 1));
        },

        // this should set given value to slider handle
        setAltText: function(value) {
            this.$('.slider-handle').attr('aria-valuenow', value);
        },

        mapIndexToPixels: function(value, $widthObject) {
            var numberOfItems = this.model.get('_items').length,
                width = $widthObject ? $widthObject.width() : this.$('.slider-scaler').width();

            return Math.round(this.mapValue(value, 0, numberOfItems - 1, 0, width));
        },

        mapPixelsToIndex: function(value) {
            var numberOfItems = this.model.get('_items').length,
                width = this.$('.slider-sliderange').width();

            return Math.round(this.mapValue(value, 0, width, 0, numberOfItems - 1));
        },

        normalise: function(value, low, high) {
            var range = high - low;
            return (value - low) / range;
        },

        mapValue: function(value, inputLow, inputHigh, outputLow, outputHigh) {
            var normal = this.normalise(value, inputLow, inputHigh);
            return normal * (outputHigh - outputLow) + outputLow;
        },

        onHandleFocus: function(event) {
            event.preventDefault();
            this.$slider.on('keydown', _.bind(this.onKeyDown, this));
        },

        onHandleBlur: function(event) {
            event.preventDefault();
            this.$slider.off('keydown');
        },

        onKeyDown: function(event) {
            if(event.which == 9) return; // tab key
            event.preventDefault();

            var newItemIndex = this.getIndexFromValue(this.model.get('_selectedItem').value);

            switch (event.which) {
                case 40: // ↓ down
                case 37: // ← left
                    newItemIndex = Math.max(newItemIndex - 1, 0);
                    break;
                case 38: // ↑ up
                case 39: // → right
                    newItemIndex = Math.min(newItemIndex + 1, this.model.get('_items').length - 1);
                    break;
            }

            this.selectItem(newItemIndex);
            if(typeof newItemIndex == 'number') this.showScaleMarker(true);
            this.animateToPosition(this.mapIndexToPixels(newItemIndex));
            this.setSliderValue(this.getValueFromIndex(newItemIndex));
            this.setAltText(this.getValueFromIndex(newItemIndex));
        },

        onNumberSelected: function(event) {
            event.preventDefault();
            this.tempValue = false;

            if (this.model.get('_isInteractionComplete')) {
              return;
            }

            // when component is not reset, selecting a number should be prevented
            if (this.$slider.prop('disabled')) {
              return;
            }

            var itemValue = parseInt($(event.currentTarget).attr('data-id'));
            var index = this.getIndexFromValue(itemValue);
            this.selectItem(index);
            this.animateToPosition(this.mapIndexToPixels(index));
            this.setAltText(itemValue);
            this.setSliderValue(itemValue)
        },

        getValueFromIndex: function(index) {
          return this.model.get('_items')[index].value;
        },

        resetControlStyles: function() {
            this.$('.slider-handle').empty();
            this.showScaleMarker(false);
            this.$('.slider-bar').animate({width:'0px'});
            this.setSliderValue(this.model.get('_items')[0].value);
        },

        /**
        * allow the user to submit immediately; the slider handle may already be in the position they want to choose
        */
        canSubmit: function() {
            return true;
        },

        // Blank method for question to fill out when the question cannot be submitted
        onCannotSubmit: function() {},

        //This preserves the state of the users answers for returning or showing the users answer
        storeUserAnswer: function() {
            this.model.set('_userAnswer', this.model.get('_selectedItem').value);
        },

        isCorrect: function() {
            var numberOfCorrectAnswers = 0;

            _.each(this.model.get('_items'), function(item, index) {
                if(item.selected && item.correct)  {
                    this.model.set('_isAtLeastOneCorrectSelection', true);
                    numberOfCorrectAnswers++;
                }
            }, this);

            this.model.set('_numberOfCorrectAnswers', numberOfCorrectAnswers);

            return this.model.get('_isAtLeastOneCorrectSelection') ? true : false;
        },

        // Used to set the score based upon the _questionWeight
        setScore: function() {
            var numberOfCorrectAnswers = this.model.get('_numberOfCorrectAnswers');
            var questionWeight = this.model.get('_questionWeight');
            var score = questionWeight * numberOfCorrectAnswers;
            this.model.set('_score', score);
        },

        setSliderValue: function (value) {
          if (this.$slider) {
            this.$slider.val(value).change();
          }
        },

        // This is important and should give the user feedback on how they answered the question
        // Normally done through ticks and crosses by adding classes
        showMarking: function() {
            if (!this.model.get('_canShowMarking')) return;

            this.$('.slider-widget').removeClass('correct incorrect')
                .addClass(this.model.get('_selectedItem').correct ? 'correct' : 'incorrect');
        },

        isPartlyCorrect: function() {
            return this.model.get('_isAtLeastOneCorrectSelection');
        },

        // Used by the question view to reset the stored user answer
        resetUserAnswer: function() {
            this.model.set({
                _selectedItem: {},
                _userAnswer: undefined
            });
        },

        // Used by the question view to reset the look and feel of the component.
        // This could also include resetting item data
        resetQuestion: function() {
            this.selectItem(0, true);
            this.animateToPosition(0);
            this.resetControlStyles();
            this.showScaleMarker(true);
            this.setAltText(this.model.get('_scaleStart'));
        },

        setScalePositions: function() {
            var numberOfItems = this.model.get('_items').length;
            _.each(this.model.get('_items'), function(item, index) {
                var normalisedPosition = this.normalise(index, 0, numberOfItems -1);
                this.$('.slider-scale-number').eq(index).data('normalisedPosition', normalisedPosition);
            }, this);
        },

        showScale: function () {
            this.$('.slider-markers').empty();
            if (this.model.get('_showScale') === false) {
                this.$('.slider-markers').eq(0).css({display: 'none'});
                this.model.get('_showScaleIndicator')
                    ? this.$('.slider-scale-numbers').eq(0).css({visibility: 'hidden'})
                    : this.$('.slider-scale-numbers').eq(0).css({display: 'none'});
            } else {
                var $scaler = this.$('.slider-scaler');
                var $markers = this.$('.slider-markers');
                for (var i = 0, count = this.model.get('_items').length; i < count; i++) {
                    $markers.append("<div class='slider-line component-item-color'>");
                    $('.slider-line', $markers).eq(i).css({left: this.mapIndexToPixels(i, $scaler) + 'px'});
                }
                var scaleWidth = $scaler.width(),
                    $numbers = this.$('.slider-scale-number');
                for (var i = 0, count = this.model.get('_items').length; i < count; i++) {
                    var $number = $numbers.eq(i),
                        newLeft = Math.round($number.data('normalisedPosition') * scaleWidth);
                    if($('html').hasClass('ie9') && this.model.get('_marginDir')=='right'){
						$number.css({right: newLeft});
					}
					else{
						$number.css({left: newLeft});
                    }
                }
            }
        },

        //Labels are enabled in slider.hbs. Here we manage their containing div.
        showLabels: function () {
            if(!this.model.get('labelStart') && !this.model.get('labelEnd')) {
                this.$('.slider-scale-labels').eq(0).css({display: 'none'});
            }
        },

        remapSliderBar: function() {
            var $scaler = this.$('.slider-scaler');
            var currentIndex = this.getIndexFromValue(this.model.get('_selectedItem').value);
            var left = this.mapIndexToPixels(currentIndex, $scaler);
            this.$('.slider-handle').css({left: left + 'px'});
            this.$('.slider-scale-marker').css({left: left + 'px'});
            this.$('.slider-bar').width(left);
        },

        onScreenSizeChanged: function() {
            this.showScale();
            this.showLabels();
            this.remapSliderBar();
            if (this.$('.slider-widget').hasClass('show-user-answer')) {
                this.hideCorrectAnswer();
            } else if (this.$('.slider-widget').hasClass('show-correct-answer')) {
                this.showCorrectAnswer();
            }
        },

        showCorrectAnswer: function() {
            var answers = [];

            if(this.model.has('_correctAnswer')) {
                var correctAnswer = this.model.get('_correctAnswer');
            }

            if (this.model.has('_correctRange')) {
                var bottom = this.model.get('_correctRange')._bottom;
                var top = this.model.get('_correctRange')._top;
                var step = (this.model.has('_scaleStep') ? this.model.get('_scaleStep') : 1);
            }

            this.showScaleMarker(false);

            //are we dealing with a single correct answer or a range?
            if (correctAnswer) {
                answers.push(correctAnswer);
            } else if (bottom !== undefined && top !== undefined) {
                var answer = this.model.get('_correctRange')._bottom;
                var topOfRange = this.model.get('_correctRange')._top;
                while(answer <= topOfRange) {
                    answers.push(answer);
                    answer += step;
                }
            } else {
                console.log("adapt-contrib-slider::WARNING: no correct answer or correct range set in JSON")
            }

            var middleAnswer = answers[Math.floor(answers.length / 2)];
            this.animateToPosition(this.mapIndexToPixels(this.getIndexFromValue(middleAnswer)));

            this.showModelAnswers(answers);

            this.setSliderValue(middleAnswer);
        },

        showModelAnswers: function(correctAnswerArray) {
            var $parentDiv = this.$('.slider-modelranges');
            _.each(correctAnswerArray, function(correctAnswer, index) {
                $parentDiv.append($("<div class='slider-model-answer component-item-color component-item-text-color'>"));

                var $element = $(this.$('.slider-modelranges .slider-model-answer')[index]),
                    startingLeft = this.mapIndexToPixels(this.getIndexFromValue(this.model.get('_selectedItem').value));

                if(this.model.get('_showNumber')) $element.html(correctAnswer);

                $element.css({left:startingLeft}).fadeIn(0, _.bind(function() {
                    $element.animate({left: this.mapIndexToPixels(this.getIndexFromValue(correctAnswer))});
                }, this));
            }, this);
        },

        // Used by the question to display the users answer and
        // hide the correct answer
        // Should use the values stored in storeUserAnswer
        hideCorrectAnswer: function() {
            var userAnswerIndex = this.getIndexFromValue(this.model.get('_userAnswer'));
            this.$('.slider-modelranges').empty();

            this.showScaleMarker(true);
            this.selectItem(userAnswerIndex, true);
            this.animateToPosition(this.mapIndexToPixels(userAnswerIndex));
            this.setSliderValue(this.model.get('_userAnswer'));
        },

        // according to given item index this should make the item as selected
        selectItem: function(itemIndex, noFocus) {
            this.$el.a11y_selected(false);
            _.each(this.model.get('_items'), function(item, index) {
                item.selected = (index == itemIndex);
                if(item.selected) {
                    this.model.set('_selectedItem', item);
                    this.$('.slider-scale-number[data-id="'+item.value+'"]').a11y_selected(true, noFocus);
                }
            }, this);
            this.showNumber(true);
        },

        // this should reset the selected state of each item
        deselectAllItems: function() {
            _.each(this.model.get('_items'), function(item) {
                item.selected = false;
            }, this);
        },

        // this makes the marker visible or hidden
        showScaleMarker: function(show) {
            var $scaleMarker = this.$('.slider-scale-marker');
            if (this.model.get('_showScaleIndicator')) {
                this.showNumber(show);
                if(show) {
                    $scaleMarker.addClass('display-block');
                } else {
                    $scaleMarker.removeClass('display-block');
                }
            }
        },

        // this should add the current slider value to the marker
        showNumber: function(show) {
            var $scaleMarker = this.$('.slider-scale-marker');
            if(this.model.get('_showNumber')) {
                if(show) {
                    $scaleMarker.html(this.model.get('_selectedItem').value);
                } else {
                    $scaleMarker.html = "";
                }
            }
        },

        /**
        * Used by adapt-contrib-spoor to get the user's answers in the format required by the cmi.interactions.n.student_response data field
        */
        getResponse:function() {
            return this.model.get('_userAnswer').toString();
        },

        /**
        * Used by adapt-contrib-spoor to get the type of this question in the format required by the cmi.interactions.n.type data field
        */
        getResponseType:function() {
            return "numeric";
        }

    });

    Adapt.register('slider', Slider);

    return Slider;
});

define('components/adapt-contrib-text/js/adapt-contrib-text',['require','coreViews/componentView','coreJS/adapt'],function(require) {

    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var Text = ComponentView.extend({

        preRender: function() {
            this.checkIfResetOnRevisit();
        },

        postRender: function() {
            this.setReadyStatus();

            this.setupInview();
        },

        setupInview: function() {
            var selector = this.getInviewElementSelector();

            if (!selector) {
                this.setCompletionStatus();
            } else {
                this.model.set('inviewElementSelector', selector);
                this.$(selector).on('inview', _.bind(this.inview, this));
            }
        },

        /**
         * determines which element should be used for inview logic - body, instruction or title - and returns the selector for that element
         */
        getInviewElementSelector: function() {
            if(this.model.get('body')) return '.component-body';

            if(this.model.get('instruction')) return '.component-instruction';
            
            if(this.model.get('displayTitle')) return '.component-title';

            return null;
        },

        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        },

        inview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }

                if (this._isVisibleTop && this._isVisibleBottom) {
                    this.$(this.model.get('inviewElementSelector')).off('inview');
                    this.setCompletionStatus();
                }
            }
        },

        remove: function() {
            if(this.model.has('inviewElementSelector')) {
                this.$(this.model.get('inviewElementSelector')).off('inview');
            }
            
            ComponentView.prototype.remove.call(this);
        }
    },
    {
        template: 'text'
    });

    Adapt.register('text', Text);

    return Text;
});

define('components/adapt-contrib-textInput/js/adapt-contrib-textInput',['require','coreViews/questionView','coreJS/adapt'],function(require) {
    var QuestionView = require('coreViews/questionView');
    var Adapt = require('coreJS/adapt');

    var genericAnswerIndexOffset = 65536;

    var TextInput = QuestionView.extend({
        events: {
            "focus input":"clearValidationError"
        },

        resetQuestionOnRevisit: function() {
            this.setAllItemsEnabled(false);
            this.resetQuestion();
        },

        setupQuestion: function() {
            this.model.set( '_genericAnswerIndexOffset', genericAnswerIndexOffset );
            this.setupItemIndexes();
            this.restoreUserAnswer();

            this.setupRandomisation();
        },

        setupRandomisation: function() {
            if (this.model.get('_isRandom') && this.model.get('_isEnabled')) {
                this.model.set("_items", _.shuffle(this.model.get("_items")));
            }
        },

        setupItemIndexes: function() {
            
            _.each(this.model.get('_items'), function(item, index) {

                if (item._index === undefined) item._index = index;
                if (item._answerIndex === undefined) item._answerIndex = -1;

            });

        },

        restoreUserAnswer: function() {
            if (!this.model.get("_isSubmitted")) return;

            var userAnswer = this.model.get("_userAnswer");
            var genericAnswers = this.model.get("_answers");
            _.each(this.model.get("_items"), function(item) {
                var answerIndex = userAnswer[item._index];
                if (answerIndex >= genericAnswerIndexOffset) {
                    item.userAnswer = genericAnswers[answerIndex - genericAnswerIndexOffset];
                    item._answerIndex = answerIndex;
                } else if (answerIndex > -1) {
                    item.userAnswer = item._answers[answerIndex];
                    item._answerIndex = answerIndex;
                } else {
                    if (item.userAnswer === undefined) item.userAnswer = "******";
                    item._answerIndex = -1;
                }
                if (item.userAnswer instanceof Array) item.userAnswer = item.userAnswer[0];
            });

            this.setQuestionAsSubmitted();
            this.markQuestion();
            this.setScore();
            this.showMarking();
            this.setupFeedback();
        },  

        disableQuestion: function() {
            this.setAllItemsEnabled(false);
        },

        enableQuestion: function() {
            this.setAllItemsEnabled(true);
        },

        setAllItemsEnabled: function(isEnabled) {
            _.each(this.model.get('_items'), function(item, index) {
                var $itemInput = this.$('input').eq(index);

                if (isEnabled) {
                    $itemInput.prop('disabled', false);
                } else {
                    $itemInput.prop('disabled', true);
                }
            }, this);
        },

        onQuestionRendered: function() {
            this.setReadyStatus();
        },

        clearValidationError: function() {
            this.$(".textinput-item-textbox").removeClass("textinput-validation-error");
        },

        // Use to check if the user is allowed to submit the question
        canSubmit: function() {
            var canSubmit = true;
            this.$(".textinput-item-textbox").each(function() {
                if ($(this).val() == "") {
                    canSubmit = false;
                }
            });
            return canSubmit;
        },

        // Blank method for question to fill out when the question cannot be submitted
        onCannotSubmit: function() {
            this.showValidationError();
        },

        showValidationError: function() {
            this.$(".textinput-item-textbox").addClass("textinput-validation-error");
        },

        //This preserve the state of the users answers for returning or showing the users answer
        storeUserAnswer: function() {
            var items = this.model.get('_items');
            _.each(items, function(item, index) {
                item.userAnswer = this.$('.textinput-item-textbox').eq(index).val();
            }, this);

            this.isCorrect();

            var userAnswer = new Array( items.length );
            _.each(items, function(item, index) {
                userAnswer[ item._index ] = item._answerIndex;
            });
            this.model.set("_userAnswer", userAnswer);
        },

        isCorrect: function() {
            if(this.model.get('_answers')) this.markGenericAnswers();
            else this.markSpecificAnswers();
            // do we have any _isCorrect == false?
            return !_.contains(_.pluck(this.model.get("_items"),"_isCorrect"), false);
        },

        // Allows the learner to give answers into any input, ignoring the order.
        // (this excludes any inputs which have their own specific answers).
        markGenericAnswers: function() {
            var numberOfCorrectAnswers = 0;
            var correctAnswers = this.model.get('_answers').slice();
            var usedAnswerIndexes = [];
            _.each(this.model.get('_items'), function(item, itemIndex) {
                _.each(correctAnswers, function(answerGroup, answerIndex) {
                    if(this.checkAnswerIsCorrect(answerGroup, item.userAnswer)) {
                        if (_.indexOf(usedAnswerIndexes, answerIndex) > -1) return;
                        usedAnswerIndexes.push(answerIndex);
                        item._isCorrect = true;
                        item._answerIndex = answerIndex + genericAnswerIndexOffset;
                        numberOfCorrectAnswers++;
                        this.model.set('_numberOfCorrectAnswers', numberOfCorrectAnswers);
                        this.model.set('_isAtLeastOneCorrectSelection', true);
                    }
                }, this);
                if(!item._isCorrect) item._isCorrect = false;
            }, this);
        },

        // Marks any items which have answers specific to it
        // (i.e. item has a _answers array)
        markSpecificAnswers: function() {
            var numberOfCorrectAnswers = 0;
            var numberOfSpecificAnswers = 0;
            _.each(this.model.get('_items'), function(item, index) {
                if(!item._answers) return;
                var userAnswer = item.userAnswer || ""; 
                if (this.checkAnswerIsCorrect(item["_answers"], userAnswer)) {
                    numberOfCorrectAnswers++;
                    item._isCorrect = true;
                    item._answerIndex = _.indexOf(item["_answers"], this.cleanupUserAnswer(userAnswer));
                    this.model.set('_numberOfCorrectAnswers', numberOfCorrectAnswers);
                    this.model.set('_isAtLeastOneCorrectSelection', true);
                } else {
                    item._isCorrect = false;
                    item._answerIndex = -1;
                }
                numberOfSpecificAnswers++;
            }, this);
        },

        checkAnswerIsCorrect: function(possibleAnswers, userAnswer) {
            var uAnswer = this.cleanupUserAnswer(userAnswer);
            var matched = _.filter(possibleAnswers, function(cAnswer){
                return this.cleanupUserAnswer(cAnswer) == uAnswer;
            }, this);
            
            var answerIsCorrect = matched && matched.length > 0;
            if (answerIsCorrect) this.model.set('_hasAtLeastOneCorrectSelection', true);
            return answerIsCorrect;
        },

        cleanupUserAnswer: function(userAnswer) {
            if (this.model.get('_allowsAnyCase')) {
                userAnswer = userAnswer.toLowerCase();
            }
            if (this.model.get('_allowsPunctuation')) {
                userAnswer = userAnswer.replace(/[\.,-\/#!$£%\^&\*;:{}=\-_`~()]/g, "");
                //remove any orphan double spaces and replace with single space (B & Q)->(B  Q)->(B Q)
                userAnswer = userAnswer.replace(/(  +)+/g, " ");
            }
            // removes whitespace from beginning/end (leave any in the middle)
            return $.trim(userAnswer);
        },

        // Used to set the score based upon the _questionWeight
        setScore: function() {
            var numberOfCorrectAnswers = this.model.get('_numberOfCorrectAnswers');
            var questionWeight = this.model.get("_questionWeight");
            var itemLength = this.model.get('_items').length;

            var score = questionWeight * numberOfCorrectAnswers / itemLength;

            this.model.set('_score', score);
        },

        // This is important and should give the user feedback on how they answered the question
        // Normally done through ticks and crosses by adding classes
        showMarking: function() {
            if (!this.model.get('_canShowMarking')) return;

            _.each(this.model.get('_items'), function(item, i) {
                var $item = this.$('.textinput-item').eq(i);
                $item.removeClass('correct incorrect').addClass(item._isCorrect ? 'correct' : 'incorrect');
            }, this);
        },

        isPartlyCorrect: function() {
            return this.model.get('_isAtLeastOneCorrectSelection');
        },

        resetUserAnswer: function() {
            _.each(this.model.get('_items'), function(item) {
                item["_isCorrect"] = false;
                item["userAnswer"] = "";
            }, this);
        },

        // Used by the question view to reset the look and feel of the component.
        resetQuestion: function() {
            this.$('.textinput-item-textbox').prop('disabled', !this.model.get('_isEnabled')).val('');

            this.model.set({
                _isAtLeastOneCorrectSelection: false,
                _isCorrect: undefined
            });
        },

        showCorrectAnswer: function() {
            
            if(this.model.get('_answers'))  {
                
                var correctAnswers = this.model.get('_answers');
                _.each(this.model.get('_items'), function(item, index) {
                    this.$(".textinput-item-textbox").eq(index).val(correctAnswers[index][0]);
                }, this);
                
            } else {
                _.each(this.model.get('_items'), function(item, index) {
                    this.$(".textinput-item-textbox").eq(index).val(item._answers[0]);
                }, this);
            }
            
        },

        hideCorrectAnswer: function() {
            _.each(this.model.get('_items'), function(item, index) {
                this.$(".textinput-item-textbox").eq(index).val(item.userAnswer);
            }, this);
        },

        /**
        * used by adapt-contrib-spoor to get the user's answers in the format required by the cmi.interactions.n.student_response data field
        * returns the user's answers as a string in the format "answer1[,]answer2[,]answer3"
        * the use of [,] as an answer delimiter is from the SCORM 2004 specification for the fill-in interaction type
        */
        getResponse: function() {
            return _.pluck(this.model.get('_items'), 'userAnswer').join('[,]');
        },

        /**
        * used by adapt-contrib-spoor to get the type of this question in the format required by the cmi.interactions.n.type data field
        */
        getResponseType: function() {
            return "fill-in";
        }
    });

    Adapt.register("textinput", TextInput);

    return TextInput;
});


define('components/adapt-hotgrid/js/adapt-hotgrid',['require','coreViews/componentView','coreJS/adapt'],function(require) {

    var ComponentView = require("coreViews/componentView");
    var Adapt = require("coreJS/adapt");

    var Hotgrid = ComponentView.extend({
 
        events: {
            "click .hotgrid-item-image":"onItemClicked"
        },
        
        isPopupOpen: false,
        
        preRender: function () {
            var items = this.model.get('_items');
            _.each(items, function(item) {
                if (item._graphic.srcHover && item._graphic.srcVisited) {
                    item._graphic.hasImageStates = true;
                }
            }, this);
            
            this.listenTo(Adapt, 'device:changed', this.resizeControl);
            
            this.setDeviceSize();
        },

        setDeviceSize: function() {
            if (Adapt.device.screenSize === 'large') {
                this.$el.addClass('desktop').removeClass('mobile');
                this.model.set('_isDesktop', true);
            } else {
                this.$el.addClass('mobile').removeClass('desktop');
                this.model.set('_isDesktop', false)
            }
        },

        postRender: function() {
            this.setUpColumns();
            this.$('.hotgrid-widget').imageready(_.bind(function() {
                this.setReadyStatus();
            }, this));
        },

        resizeControl: function() {
            this.setDeviceSize();
            this.render();
        },

        setUpColumns: function() {
            var columns = this.model.get('_columns');

           if (columns && Adapt.device.screenSize === 'large') {
                this.$('.hotgrid-grid-item').css('width', (100 / columns) + '%');
            }
        },

        onItemClicked: function(event) {
            if (event) event.preventDefault();

            var $link = $(event.currentTarget);
            var $item = $link.parent();
            var itemModel = this.model.get('_items')[$item.index()];

            if(!itemModel.visited) {
                $item.addClass("visited");
                itemModel.visited = true;
                // append the word 'visited.' to the link's aria-label
                var visitedLabel = this.model.get('_globals')._accessibility._ariaLabels.visited + ".";
                $link.attr('aria-label', function(index,val) {return val + " " + visitedLabel});
            }

            this.showItemContent(itemModel);

        },

        showItemContent: function(itemModel) {
			if(this.isPopupOpen) return;// ensure multiple clicks don't open multiple notify popups

            Adapt.trigger("notify:popup", {
                title: itemModel.title,
                body: "<div class='hotgrid-notify-container'><div class='hotgrid-notify-body'>" + itemModel.body + "</div>" +
					"<img class='hotgrid-notify-graphic' src='" +
                    itemModel._itemGraphic.src + "' alt='" +
                    itemModel._itemGraphic.alt + "'/></div>"
            });

            this.isPopupOpen = true;

            Adapt.once("notify:closed", _.bind(function() {
                this.isPopupOpen = false;
                this.evaluateCompletion();
            }, this));
        },
        
        getVisitedItems: function() {
            return _.filter(this.model.get('_items'), function(item) {
                return item.visited;
            });
        },

        evaluateCompletion: function() {
            if (this.getVisitedItems().length == this.model.get('_items').length) {
                this.setCompletionStatus();
            }
        }
        
    },{
        template: "hotgrid"
    });
    
    Adapt.register("hotgrid", Hotgrid);
    
    return Hotgrid;

});

define('components/adapt-narrativeStrip/js/adapt-narrativeStrip',[ "coreJS/adapt", "coreViews/componentView" ], function(Adapt, ComponentView) {

    var Narrative = ComponentView.extend({

        events: {
            'click .ns-controls':'onNavigationClicked'
        },

        preRender: function () {
            this.listenTo(Adapt, 'device:resize', this.resizeControl, this);
            this.setDeviceSize();            
        },

        setDeviceSize: function() {
            if (Adapt.device.screenSize === 'large') {
                this.$el.addClass('desktop').removeClass('mobile');
                this.model.set('_isDesktop', true);
            } else {
                this.$el.addClass('mobile').removeClass('desktop');
                this.model.set('_isDesktop', false)
            }
        },

        postRender: function() {
            this.setupImages();
            this.setupNarrative();
        },

        setupImages: function() {
            var _items = this.model.get("_items");
            var _images = this.model.get("_images");

            var splitHeight = _items.length;
            var images = _images.length;
            var imagesSplit = 0;

            var thisHandle = this;

            var height = undefined;
            var width = undefined;

            var imagesToLoadCount = 0;
            var imagesLoadedCount = 0;

            _.each(_images, function(image) {
                var imageObj = new Image();
                $(imageObj).bind("load", function(event) {
                    imagesSplit++;

                    var imgHeight = imageObj.naturalHeight;
                    var imgWidth = imageObj.naturalWidth;

                    height = height || imageObj.naturalHeight;
                    width = width || imageObj.naturalWidth;

                    var finalHeight = height / splitHeight;

                    var offsetTop = 0;
                    var offsetLeft = 0;
                    var newHeight = height;

                    if (imgWidth != width) newHeight = (width/imgWidth) * imgHeight;

                    var canvas = document.createElement("canvas");
                    if (typeof G_vmlCanvasManager != 'undefined') G_vmlCanvasManager.initElement(canvas);
                    canvas.width = width; 
                    canvas.style.width = "100%"; 
                    canvas.height = finalHeight; 

                    var ctx = canvas.getContext("2d");

                    for (var s = 0; s < splitHeight; s++) {
                        ctx.drawImage(imageObj, 0, 0, imgWidth, imgHeight, 0 + offsetLeft, -(s * finalHeight) + offsetTop, width, newHeight);
                        var imageURL = canvas.toDataURL();

                        var img = document.createElement("img");
                        thisHandle.$('.item-'+s+'.ns-slide-container .i'+image._id).append(img);
                        imagesToLoadCount++;
                        $(img).bind("load", function() {
                            imagesLoadedCount++;

                            if (imagesToLoadCount == imagesLoadedCount) {
                                thisHandle.setReadyStatus();
                                $(window).resize();
                            }
                        });
                        img.src = imageURL;

                    }

                    if (imagesSplit == images) {
                        thisHandle.calculateWidths();
                    }

                });
                imageObj.src = image.src;
            });
        },

        setupNarrative: function() {

        	this.completionEvent = this.model.get('_setCompletionOn') || false; 

            if(this.completionEvent === 'inview'){
                this.$('.component-widget').on('inview', _.bind(this.inview, this));
            }

            this.setDeviceSize();
            
            var _items = this.model.get("_items");
            var thisHandle = this;
            _.each(_items, function(item, index) {
                item._itemCount = item._subItems.length;
                if (item._stage) {
                    thisHandle.setStage(index, item._stage, true);
                } else {
                    thisHandle.setStage(index, (item._initialItemIndex || 0) );
                }
            });
            
            this.model.set('_active', true);

        },

        calculateWidths: function() {
            //calc widths for each item
            var _items = this.model.get("_items");
            _.each(_items, function(item, index) {
                var slideWidth = this.$('.ns-slide-container').width();
                var slideCount = item._itemCount;
                var marginRight = this.$('.ns-slider-graphic').css('margin-right');

                var extraMargin = marginRight === "" ? 0 : parseInt(marginRight);
                var fullSlideWidth = (slideWidth + extraMargin) * slideCount;
                var iconWidth = this.$('.ns-popup-open').outerWidth();
                var $headerInner = this.$(".item-" + index)
                    .find(".ns-strapline-header-inner");

                this.$('.item-'+index+'.ns-slide-container .ns-slider-graphic').width(slideWidth)
                this.$('.ns-strapline-header').width(slideWidth);
                this.$('.ns-strapline-title').width(slideWidth);

                this.$('.item-'+index+'.ns-slide-container .ns-slider').width(fullSlideWidth);
                $headerInner.width(fullSlideWidth);

                var stage = item._stage;//this.model.get('_stage');
                var margin = -(stage * slideWidth);

                this.$('.item-'+index+'.ns-slide-container .ns-slider').css('margin-left', margin);
                $headerInner.css("margin-left", margin);

                item._finalItemLeft = fullSlideWidth - slideWidth;
            });

            _.each(this.$('.ns-slider-graphic'), function(item) {
                $(item).attr("height","").css("height","");
            });
        },

        resizeControl: function() {
            this.setDeviceSize();
            this.calculateWidths();
            var _items = this.model.get("_items");
            var thisHandle = this;
            _.each(_items, function(item, index) {
                thisHandle.evaluateNavigation(index);
            });
        },

        moveSliderToIndex: function(itemIndex, stage, animate) {
            var extraMargin = parseInt(this.$('.item-'+itemIndex+'.ns-slide-container .ns-slider-graphic').css('margin-right')),
                movementSize = this.$('.item-'+itemIndex+'.ns-slide-container').width()+extraMargin;

            if(animate) {
                this.$('.item-'+itemIndex+'.ns-slide-container .ns-slider').stop().animate({'margin-left': -(movementSize * stage)});
                this.$('.item-'+itemIndex+' .ns-strapline-header .ns-strapline-header-inner').stop(true, true).animate({'margin-left': -(movementSize * stage)});
            } else {
                this.$('.item-'+itemIndex+'.ns-slide-container .ns-slider').css({'margin-left': -(movementSize * stage)});
                this.$('.item-'+itemIndex+' .ns-strapline-header .ns-strapline-header-inner').css({'margin-left': -(movementSize * stage)});
            }
        },

        setStage: function(itemIndex, stage, initial) {
            var item = this.model.get('_items')[itemIndex];

            item._stage = stage;
            item._subItems[stage].isComplete = true;

            this.$('.ns-progress').removeClass('selected').eq(stage).addClass('selected');
            this.$('.item-'+itemIndex+'.ns-slide-container .ns-slider-graphic').children('.controls').attr('tabindex', -1);
            this.$('.item-'+itemIndex+'.ns-slide-container .ns-slider-graphic').eq(stage).children('.controls').attr('tabindex', 0);

            this.evaluateNavigation(itemIndex);
            this.evaluateCompletion();

            this.moveSliderToIndex(itemIndex, stage, !initial);
        },

        evaluateNavigation: function(itemIndex) {
            var item = this.model.get('_items')[itemIndex];
            var currentStage = item._stage;
            var itemCount = item._itemCount;

            if (currentStage == 0) {
                this.$('.item-'+itemIndex+'.ns-slide-container .ns-control-left').addClass('ns-hidden');

                if (itemCount > 1) {
                    this.$('.item-'+itemIndex+'.ns-slide-container .ns-control-right').removeClass('ns-hidden');
                }
            } else {
                this.$('.item-'+itemIndex+'.ns-slide-container .ns-control-left').removeClass('ns-hidden');

                if (currentStage == itemCount - 1) {
                    this.$('.item-'+itemIndex+'.ns-slide-container .ns-control-right').addClass('ns-hidden');
                } else {
                    this.$('.item-'+itemIndex+'.ns-slide-container .ns-control-right').removeClass('ns-hidden');
                }
            }
        },

        evaluateCompletion: function() {
            if(this.completionEvent === 'inview') return;

            var items = this.model.get('_items');
            var isComplete = true;

            for(var i=0,item=null;item=items[i];i++){

                for(var j=0,subItem=null;subItem=item._subItems[j];j++){
                    if(!subItem.isComplete){
                        isComplete = false;
                        break;
                    }
                }
                
                if(!isComplete) break;                
            }

            if(isComplete) this.setCompletionStatus();
        },

        onNavigationClicked: function(event) {
            event.preventDefault();

            var $target = $(event.currentTarget);

            if ($target.hasClass('disabled')) return;

            if (!this.model.get('_active')) return;

			var selectedItemIndex = $target.parent('.component-item').index();
            var selectedItemObject = this.model.get('_items')[selectedItemIndex];

            var stage = selectedItemObject._stage,
                numberOfItems = selectedItemObject._itemCount;

            if ($target.hasClass('ns-control-right')) {
                stage++;
                if (stage == numberOfItems-1) {
                    $('.ns-control-left').focus();
                }
            } else if ($target.hasClass('ns-control-left')) {
                stage--;
                if (stage == 0) {
                    $('.ns-control-right').focus();
                }
            }
            stage = (stage + numberOfItems) % numberOfItems;
            this.setStage(selectedItemIndex, stage);
        },

        inview: function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                if (visiblePartY === 'top') {
                    this._isVisibleTop = true;
                } else if (visiblePartY === 'bottom') {
                    this._isVisibleBottom = true;
                } else {
                    this._isVisibleTop = true;
                    this._isVisibleBottom = true;
                }

                if (this._isVisibleTop && this._isVisibleBottom) {                    
                    this.$('.component-inner').off('inview');
                    this.setCompletionStatus();
                }
            }
        }

    });

    Adapt.register("narrativeStrip", Narrative);

    return Narrative;

});

/*!
 * Draggabilly PACKAGED v1.1.2
 * Make that shiz draggable
 * http://draggabilly.desandro.com
 * MIT license
 */

/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {



// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'classie/classie',classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );

/*!
 * EventEmitter v4.2.2 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

(function () {
	

	/**
	 * Class for managing events.
	 * Can be extended to provide event functionality in other classes.
	 *
	 * @class EventEmitter Manages event registering and emitting.
	 */
	function EventEmitter() {}

	// Shortcuts to improve speed and size

	// Easy access to the prototype
	var proto = EventEmitter.prototype;

	/**
	 * Finds the index of the listener for the event in it's storage array.
	 *
	 * @param {Function[]} listeners Array of listeners to search through.
	 * @param {Function} listener Method to look for.
	 * @return {Number} Index of the specified listener, -1 if not found
	 * @api private
	 */
	function indexOfListener(listeners, listener) {
		var i = listeners.length;
		while (i--) {
			if (listeners[i].listener === listener) {
				return i;
			}
		}

		return -1;
	}

	/**
	 * Alias a method while keeping the context correct, to allow for overwriting of target method.
	 *
	 * @param {String} name The name of the target method.
	 * @return {Function} The aliased method
	 * @api private
	 */
	function alias(name) {
		return function aliasClosure() {
			return this[name].apply(this, arguments);
		};
	}

	/**
	 * Returns the listener array for the specified event.
	 * Will initialise the event object and listener arrays if required.
	 * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	 * Each property in the object response is an array of listener functions.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Function[]|Object} All listener functions for the event.
	 */
	proto.getListeners = function getListeners(evt) {
		var events = this._getEvents();
		var response;
		var key;

		// Return a concatenated array of all matching events if
		// the selector is a regular expression.
		if (typeof evt === 'object') {
			response = {};
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					response[key] = events[key];
				}
			}
		}
		else {
			response = events[evt] || (events[evt] = []);
		}

		return response;
	};

	/**
	 * Takes a list of listener objects and flattens it into a list of listener functions.
	 *
	 * @param {Object[]} listeners Raw listener objects.
	 * @return {Function[]} Just the listener functions.
	 */
	proto.flattenListeners = function flattenListeners(listeners) {
		var flatListeners = [];
		var i;

		for (i = 0; i < listeners.length; i += 1) {
			flatListeners.push(listeners[i].listener);
		}

		return flatListeners;
	};

	/**
	 * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Object} All listener functions for an event in an object.
	 */
	proto.getListenersAsObject = function getListenersAsObject(evt) {
		var listeners = this.getListeners(evt);
		var response;

		if (listeners instanceof Array) {
			response = {};
			response[evt] = listeners;
		}

		return response || listeners;
	};

	/**
	 * Adds a listener function to the specified event.
	 * The listener will not be added if it is a duplicate.
	 * If the listener returns true then it will be removed after it is called.
	 * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListener = function addListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var listenerIsWrapped = typeof listener === 'object';
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
				listeners[key].push(listenerIsWrapped ? listener : {
					listener: listener,
					once: false
				});
			}
		}

		return this;
	};

	/**
	 * Alias of addListener
	 */
	proto.on = alias('addListener');

	/**
	 * Semi-alias of addListener. It will add a listener that will be
	 * automatically removed after it's first execution.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addOnceListener = function addOnceListener(evt, listener) {
		return this.addListener(evt, {
			listener: listener,
			once: true
		});
	};

	/**
	 * Alias of addOnceListener.
	 */
	proto.once = alias('addOnceListener');

	/**
	 * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	 * You need to tell it what event names should be matched by a regex.
	 *
	 * @param {String} evt Name of the event to create.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvent = function defineEvent(evt) {
		this.getListeners(evt);
		return this;
	};

	/**
	 * Uses defineEvent to define multiple events.
	 *
	 * @param {String[]} evts An array of event names to define.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvents = function defineEvents(evts) {
		for (var i = 0; i < evts.length; i += 1) {
			this.defineEvent(evts[i]);
		}
		return this;
	};

	/**
	 * Removes a listener function from the specified event.
	 * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to remove the listener from.
	 * @param {Function} listener Method to remove from the event.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListener = function removeListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var index;
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				index = indexOfListener(listeners[key], listener);

				if (index !== -1) {
					listeners[key].splice(index, 1);
				}
			}
		}

		return this;
	};

	/**
	 * Alias of removeListener
	 */
	proto.off = alias('removeListener');

	/**
	 * Adds listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	 * You can also pass it a regular expression to add the array of listeners to all events that match it.
	 * Yeah, this function does quite a bit. That's probably a bad thing.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListeners = function addListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(false, evt, listeners);
	};

	/**
	 * Removes listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be removed.
	 * You can also pass it a regular expression to remove the listeners from all events that match it.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListeners = function removeListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(true, evt, listeners);
	};

	/**
	 * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	 * The first argument will determine if the listeners are removed (true) or added (false).
	 * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be added/removed.
	 * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	 *
	 * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
		var i;
		var value;
		var single = remove ? this.removeListener : this.addListener;
		var multiple = remove ? this.removeListeners : this.addListeners;

		// If evt is an object then pass each of it's properties to this method
		if (typeof evt === 'object' && !(evt instanceof RegExp)) {
			for (i in evt) {
				if (evt.hasOwnProperty(i) && (value = evt[i])) {
					// Pass the single listener straight through to the singular method
					if (typeof value === 'function') {
						single.call(this, i, value);
					}
					else {
						// Otherwise pass back to the multiple function
						multiple.call(this, i, value);
					}
				}
			}
		}
		else {
			// So evt must be a string
			// And listeners must be an array of listeners
			// Loop over it and pass each one to the multiple method
			i = listeners.length;
			while (i--) {
				single.call(this, evt, listeners[i]);
			}
		}

		return this;
	};

	/**
	 * Removes all listeners from a specified event.
	 * If you do not specify an event then all listeners will be removed.
	 * That means every event will be emptied.
	 * You can also pass a regex to remove all events that match it.
	 *
	 * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeEvent = function removeEvent(evt) {
		var type = typeof evt;
		var events = this._getEvents();
		var key;

		// Remove different things depending on the state of evt
		if (type === 'string') {
			// Remove all listeners for the specified event
			delete events[evt];
		}
		else if (type === 'object') {
			// Remove all events matching the regex.
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					delete events[key];
				}
			}
		}
		else {
			// Remove all listeners in all events
			delete this._events;
		}

		return this;
	};

	/**
	 * Emits an event of your choice.
	 * When emitted, every listener attached to that event will be executed.
	 * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	 * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	 * So they will not arrive within the array on the other side, they will be separate.
	 * You can also pass a regular expression to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {Array} [args] Optional array of arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emitEvent = function emitEvent(evt, args) {
		var listeners = this.getListenersAsObject(evt);
		var listener;
		var i;
		var key;
		var response;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				i = listeners[key].length;

				while (i--) {
					// If the listener returns true then it shall be removed from the event
					// The function is executed either with a basic call or an apply if there is an args array
					listener = listeners[key][i];
					response = listener.listener.apply(this, args || []);
					if (response === this._getOnceReturnValue() || listener.once === true) {
						this.removeListener(evt, listener.listener);
					}
				}
			}
		}

		return this;
	};

	/**
	 * Alias of emitEvent
	 */
	proto.trigger = alias('emitEvent');

	/**
	 * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	 * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {...*} Optional additional arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emit = function emit(evt) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(evt, args);
	};

	/**
	 * Sets the current value to check against when executing listeners. If a
	 * listeners return value matches the one set here then it will be removed
	 * after execution. This value defaults to true.
	 *
	 * @param {*} value The new value to check for when executing listeners.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.setOnceReturnValue = function setOnceReturnValue(value) {
		this._onceReturnValue = value;
		return this;
	};

	/**
	 * Fetches the current value to check against when executing listeners. If
	 * the listeners return value matches this one then it should be removed
	 * automatically. It will return true by default.
	 *
	 * @return {*|Boolean} The current value to check for or the default, true.
	 * @api private
	 */
	proto._getOnceReturnValue = function _getOnceReturnValue() {
		if (this.hasOwnProperty('_onceReturnValue')) {
			return this._onceReturnValue;
		}
		else {
			return true;
		}
	};

	/**
	 * Fetches the events object and creates one if required.
	 *
	 * @return {Object} The events storage object.
	 * @api private
	 */
	proto._getEvents = function _getEvents() {
		return this._events || (this._events = {});
	};

	// Expose the class either via AMD, CommonJS or the global object
	if (typeof define === 'function' && define.amd) {
		define('eventEmitter/EventEmitter',[],function () {
			return EventEmitter;
		});
	}
	else if (typeof module === 'object' && module.exports){
		module.exports = EventEmitter;
	}
	else {
		this.EventEmitter = EventEmitter;
	}
}.call(this));

/*!
 * eventie v1.0.3
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false */

( function( window ) {



var docElem = document.documentElement;

var bind = function() {};

if ( docElem.addEventListener ) {
  bind = function( obj, type, fn ) {
    obj.addEventListener( type, fn, false );
  };
} else if ( docElem.attachEvent ) {
  bind = function( obj, type, fn ) {
    obj[ type + fn ] = fn.handleEvent ?
      function() {
        var event = window.event;
        // add event.target
        event.target = event.target || event.srcElement;
        fn.handleEvent.call( fn, event );
      } :
      function() {
        var event = window.event;
        // add event.target
        event.target = event.target || event.srcElement;
        fn.call( obj, event );
      };
    obj.attachEvent( "on" + type, obj[ type + fn ] );
  };
}

var unbind = function() {};

if ( docElem.removeEventListener ) {
  unbind = function( obj, type, fn ) {
    obj.removeEventListener( type, fn, false );
  };
} else if ( docElem.detachEvent ) {
  unbind = function( obj, type, fn ) {
    obj.detachEvent( "on" + type, obj[ type + fn ] );
    try {
      delete obj[ type + fn ];
    } catch ( err ) {
      // can't delete window object properties
      obj[ type + fn ] = undefined;
    }
  };
}

var eventie = {
  bind: bind,
  unbind: unbind
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'eventie/eventie',eventie );
} else {
  // browser global
  window.eventie = eventie;
}

})( this );

/*!
 * getStyleProperty by kangax
 * http://perfectionkills.com/feature-testing-css-properties/
 */

/*jshint browser: true, strict: true, undef: true */
/*globals define: false */

( function( window ) {



var prefixes = 'Webkit Moz ms Ms O'.split(' ');
var docElemStyle = document.documentElement.style;

function getStyleProperty( propName ) {
  if ( !propName ) {
    return;
  }

  // test standard property first
  if ( typeof docElemStyle[ propName ] === 'string' ) {
    return propName;
  }

  // capitalize
  propName = propName.charAt(0).toUpperCase() + propName.slice(1);

  // test vendor specific properties
  var prefixed;
  for ( var i=0, len = prefixes.length; i < len; i++ ) {
    prefixed = prefixes[i] + propName;
    if ( typeof docElemStyle[ prefixed ] === 'string' ) {
      return prefixed;
    }
  }
}

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'get-style-property/get-style-property',[],function() {
    return getStyleProperty;
  });
} else {
  // browser global
  window.getStyleProperty = getStyleProperty;
}

})( window );

/**
 * getSize v1.1.4
 * measure size of elements
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false */

( function( window, undefined ) {



// -------------------------- helpers -------------------------- //

var defView = document.defaultView;

var getStyle = defView && defView.getComputedStyle ?
  function( elem ) {
    return defView.getComputedStyle( elem, null );
  } :
  function( elem ) {
    return elem.currentStyle;
  };

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') === -1 && !isNaN( num );
  return isValid && num;
}

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0, len = measurements.length; i < len; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}



function defineGetSize( getStyleProperty ) {

// -------------------------- box sizing -------------------------- //

var boxSizingProp = getStyleProperty('boxSizing');
var isBoxSizeOuter;

/**
 * WebKit measures the outer-width on style.width on border-box elems
 * IE & Firefox measures the inner-width
 */
( function() {
  if ( !boxSizingProp ) {
    return;
  }

  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style[ boxSizingProp ] = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );

  isBoxSizeOuter = getStyleSize( style.width ) === 200;
  body.removeChild( div );
})();


// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  // use querySeletor if elem is string
  if ( typeof elem === 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem !== 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display === 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = !!( boxSizingProp &&
    style[ boxSizingProp ] && style[ boxSizingProp ] === 'border-box' );

  // get all measurements
  for ( var i=0, len = measurements.length; i < len; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

}

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'get-size/get-size',[ 'get-style-property/get-style-property' ], defineGetSize );
} else {
  // browser global
  window.getSize = defineGetSize( window.getStyleProperty );
}

})( window );

/*!
 * Draggabilly v1.1.2
 * Make that shiz draggable
 * http://draggabilly.desandro.com
 * MIT license
 */

( function( window ) {



// vars
var document = window.document;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

function noop() {}

// ----- get style ----- //

var defView = document.defaultView;

var getStyle = defView && defView.getComputedStyle ?
  function( elem ) {
    return defView.getComputedStyle( elem, null );
  } :
  function( elem ) {
    return elem.currentStyle;
  };


// http://stackoverflow.com/a/384380/182183
var isElement = ( typeof HTMLElement === 'object' ) ?
  function isElementDOM2( obj ) {
    return obj instanceof HTMLElement;
  } :
  function isElementQuirky( obj ) {
    return obj && typeof obj === 'object' &&
      obj.nodeType === 1 && typeof obj.nodeName === 'string';
  };

// -------------------------- requestAnimationFrame -------------------------- //

// https://gist.github.com/1866474

var lastTime = 0;
var prefixes = 'webkit moz ms o'.split(' ');
// get unprefixed rAF and cAF, if present
var requestAnimationFrame = window.requestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame;
// loop through vendor prefixes and get prefixed rAF and cAF
var prefix;
for( var i = 0; i < prefixes.length; i++ ) {
  if ( requestAnimationFrame && cancelAnimationFrame ) {
    break;
  }
  prefix = prefixes[i];
  requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
  cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] ||
                            window[ prefix + 'CancelRequestAnimationFrame' ];
}

// fallback to setTimeout and clearTimeout if either request/cancel is not supported
if ( !requestAnimationFrame || !cancelAnimationFrame )  {
  requestAnimationFrame = function( callback ) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
    var id = window.setTimeout( function() {
      callback( currTime + timeToCall );
    }, timeToCall );
    lastTime = currTime + timeToCall;
    return id;
  };

  cancelAnimationFrame = function( id ) {
    window.clearTimeout( id );
  };
}

// -------------------------- definition -------------------------- //

function draggabillyDefinition( classie, EventEmitter, eventie, getStyleProperty, getSize ) {

// -------------------------- support -------------------------- //

var transformProperty = getStyleProperty('transform');
// TODO fix quick & dirty check for 3D support
var is3d = !!getStyleProperty('perspective');

// --------------------------  -------------------------- //

function Draggabilly( element, options ) {
  // querySelector if string
  this.element = typeof element === 'string' ?
    document.querySelector( element ) : element;

  this.options = extend( {}, this.options );
  extend( this.options, options );

  this._create();
}

// inherit EventEmitter methods
extend( Draggabilly.prototype, EventEmitter.prototype );

Draggabilly.prototype.options = {
};

Draggabilly.prototype._create = function() {

  // properties
  this.position = {};
  this._getPosition();

  this.startPoint = { x: 0, y: 0 };
  this.dragPoint = { x: 0, y: 0 };

  this.startPosition = extend( {}, this.position );

  // set relative positioning
  var style = getStyle( this.element );
  if ( style.position !== 'relative' && style.position !== 'absolute' ) {
    this.element.style.position = 'relative';
  }

  this.enable();
  this.setHandles();

};

/**
 * set this.handles and bind start events to 'em
 */
Draggabilly.prototype.setHandles = function() {
  this.handles = this.options.handle ?
    this.element.querySelectorAll( this.options.handle ) : [ this.element ];

  this.bindHandles( true );
};

// -------------------------- bind -------------------------- //

/**
 * @param {Boolean} isBind - will unbind if falsey
 */
Draggabilly.prototype.bindHandles = function( isBind ) {
  var binder;
  if ( window.navigator.pointerEnabled ) {
    binder = this.bindPointer;
  } else if ( window.navigator.msPointerEnabled ) {
    binder = this.bindMSPointer;
  } else {
    binder = this.bindMouseTouch;
  }
  // munge isBind, default to true
  isBind = isBind === undefined ? true : !!isBind;
  for ( var i=0, len = this.handles.length; i < len; i++ ) {
    var handle = this.handles[i];
    binder.call( this, handle, isBind );
  }
};

Draggabilly.prototype.bindPointer = function( handle, isBind ) {
  // W3C Pointer Events, IE11. See https://coderwall.com/p/mfreca
  var bindMethod = isBind ? 'bind' : 'unbind';
  eventie[ bindMethod ]( handle, 'pointerdown', this );
  // disable scrolling on the element
  handle.style.touchAction = isBind ? 'none' : '';
};

Draggabilly.prototype.bindMSPointer = function( handle, isBind ) {
  // IE10 Pointer Events
  var bindMethod = isBind ? 'bind' : 'unbind';
  eventie[ bindMethod ]( handle, 'MSPointerDown', this );
  // disable scrolling on the element
  handle.style.msTouchAction = isBind ? 'none' : '';
};

Draggabilly.prototype.bindMouseTouch = function( handle, isBind ) {
  // listen for both, for devices like Chrome Pixel
  //   which has touch and mouse events
  var bindMethod = isBind ? 'bind' : 'unbind';
  eventie[ bindMethod ]( handle, 'mousedown', this );
  eventie[ bindMethod ]( handle, 'touchstart', this );
  // TODO re-enable img.ondragstart when unbinding
  if ( isBind ) {
    disableImgOndragstart( handle );
  }
};

// remove default dragging interaction on all images in IE8
// IE8 does its own drag thing on images, which messes stuff up

function noDragStart() {
  return false;
}

// TODO replace this with a IE8 test
var isIE8 = 'attachEvent' in document.documentElement;

// IE8 only
var disableImgOndragstart = !isIE8 ? noop : function( handle ) {

  if ( handle.nodeName === 'IMG' ) {
    handle.ondragstart = noDragStart;
  }

  var images = handle.querySelectorAll('img');
  for ( var i=0, len = images.length; i < len; i++ ) {
    var img = images[i];
    img.ondragstart = noDragStart;
  }
};

// -------------------------- position -------------------------- //

// get left/top position from style
Draggabilly.prototype._getPosition = function() {
  // properties
  var style = getStyle( this.element );

  var x = parseInt( style.left, 10 );
  var y = parseInt( style.top, 10 );

  // clean up 'auto' or other non-integer values
  this.position.x = isNaN( x ) ? 0 : x;
  this.position.y = isNaN( y ) ? 0 : y;

  this._addTransformPosition( style );
};

// add transform: translate( x, y ) to position
Draggabilly.prototype._addTransformPosition = function( style ) {
  if ( !transformProperty ) {
    return;
  }
  var transform = style[ transformProperty ];
  // bail out if value is 'none'
  if ( transform.indexOf('matrix') !== 0 ) {
    return;
  }
  // split matrix(1, 0, 0, 1, x, y)
  var matrixValues = transform.split(',');
  // translate X value is in 12th or 4th position
  var xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4;
  var translateX = parseInt( matrixValues[ xIndex ], 10 );
  // translate Y value is in 13th or 5th position
  var translateY = parseInt( matrixValues[ xIndex + 1 ], 10 );
  this.position.x += translateX;
  this.position.y += translateY;
};

// -------------------------- events -------------------------- //

// trigger handler methods for events
Draggabilly.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// returns the touch that we're keeping track of
Draggabilly.prototype.getTouch = function( touches ) {
  for ( var i=0, len = touches.length; i < len; i++ ) {
    var touch = touches[i];
    if ( touch.identifier === this.pointerIdentifier ) {
      return touch;
    }
  }
};

// ----- start event ----- //

Draggabilly.prototype.onmousedown = function( event ) {
  // dismiss clicks from right or middle buttons
  var button = event.button;
  if ( button && ( button !== 0 && button !== 1 ) ) {
    return;
  }
  this.dragStart( event, event );
};

Draggabilly.prototype.ontouchstart = function( event ) {
  // disregard additional touches
  if ( this.isDragging ) {
    return;
  }

  this.dragStart( event, event.changedTouches[0] );
};

Draggabilly.prototype.onMSPointerDown =
Draggabilly.prototype.onpointerdown = function( event ) {
  // disregard additional touches
  if ( this.isDragging ) {
    return;
  }

  this.dragStart( event, event );
};

function setPointerPoint( point, pointer ) {
  point.x = pointer.pageX !== undefined ? pointer.pageX : pointer.clientX;
  point.y = pointer.pageY !== undefined ? pointer.pageY : pointer.clientY;
}

// hash of events to be bound after start event
var postStartEvents = {
  mousedown: [ 'mousemove', 'mouseup' ],
  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
  MSPointerDown: [ 'MSPointerMove', 'MSPointerUp', 'MSPointerCancel' ]
};

/**
 * drag start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
Draggabilly.prototype.dragStart = function( event, pointer ) {
  if ( !this.isEnabled ) {
    return;
  }

  if ( event.preventDefault ) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }

  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;

  this._getPosition();

  this.measureContainment();

  // point where drag began
  setPointerPoint( this.startPoint, pointer );
  // position _when_ drag began
  this.startPosition.x = this.position.x;
  this.startPosition.y = this.position.y;

  // reset left/top style
  this.setLeftTop();

  this.dragPoint.x = 0;
  this.dragPoint.y = 0;

  // bind move and end events
  this._bindEvents({
    // get proper events to match start event
    events: postStartEvents[ event.type ],
    // IE8 needs to be bound to document
    node: event.preventDefault ? window : document
  });

  classie.add( this.element, 'is-dragging' );

  // reset isDragging flag
  this.isDragging = true;

  this.emitEvent( 'dragStart', [ this, event, pointer ] );

  // start animation
  this.animate();
};

Draggabilly.prototype._bindEvents = function( args ) {
  for ( var i=0, len = args.events.length; i < len; i++ ) {
    var event = args.events[i];
    eventie.bind( args.node, event, this );
  }
  // save these arguments
  this._boundEvents = args;
};

Draggabilly.prototype._unbindEvents = function() {
  var args = this._boundEvents;
  // IE8 can trigger dragEnd twice, check for _boundEvents
  if ( !args || !args.events ) {
    return;
  }

  for ( var i=0, len = args.events.length; i < len; i++ ) {
    var event = args.events[i];
    eventie.unbind( args.node, event, this );
  }
  delete this._boundEvents;
};

Draggabilly.prototype.measureContainment = function() {
  var containment = this.options.containment;
  if ( !containment ) {
    return;
  }

  this.size = getSize( this.element );
  var elemRect = this.element.getBoundingClientRect();

  // use element if element
  var container = isElement( containment ) ? containment :
    // fallback to querySelector if string
    typeof containment === 'string' ? document.querySelector( containment ) :
    // otherwise just `true`, use the parent
    this.element.parentNode;

  this.containerSize = getSize( container );
  var containerRect = container.getBoundingClientRect();

  this.relativeStartPosition = {
    x: elemRect.left - containerRect.left,
    y: elemRect.top  - containerRect.top
  };
};

// ----- move event ----- //

Draggabilly.prototype.onmousemove = function( event ) {
  this.dragMove( event, event );
};

Draggabilly.prototype.onMSPointerMove =
Draggabilly.prototype.onpointermove = function( event ) {
  if ( event.pointerId === this.pointerIdentifier ) {
    this.dragMove( event, event );
  }
};

Draggabilly.prototype.ontouchmove = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this.dragMove( event, touch );
  }
};

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
Draggabilly.prototype.dragMove = function( event, pointer ) {

  setPointerPoint( this.dragPoint, pointer );
  var dragX = this.dragPoint.x - this.startPoint.x;
  var dragY = this.dragPoint.y - this.startPoint.y;

  var grid = this.options.grid;
  var gridX = grid && grid[0];
  var gridY = grid && grid[1];

  dragX = applyGrid( dragX, gridX );
  dragY = applyGrid( dragY, gridY );

  dragX = this.containDrag( 'x', dragX, gridX );
  dragY = this.containDrag( 'y', dragY, gridY );

  // constrain to axis
  dragX = this.options.axis === 'y' ? 0 : dragX;
  dragY = this.options.axis === 'x' ? 0 : dragY;

  this.position.x = this.startPosition.x + dragX;
  this.position.y = this.startPosition.y + dragY;
  // set dragPoint properties
  this.dragPoint.x = dragX;
  this.dragPoint.y = dragY;

  this.emitEvent( 'dragMove', [ this, event, pointer ] );
};

function applyGrid( value, grid, method ) {
  method = method || 'round';
  return grid ? Math[ method ]( value / grid ) * grid : value;
}

Draggabilly.prototype.containDrag = function( axis, drag, grid ) {
  if ( !this.options.containment ) {
    return drag;
  }
  var measure = axis === 'x' ? 'width' : 'height';

  var rel = this.relativeStartPosition[ axis ];
  var min = applyGrid( -rel, grid, 'ceil' );
  var max = this.containerSize[ measure ] - rel - this.size[ measure ];
  max = applyGrid( max, grid, 'floor' );
  return  Math.min( max, Math.max( min, drag ) );
};

// ----- end event ----- //

Draggabilly.prototype.onmouseup = function( event ) {
  this.dragEnd( event, event );
};

Draggabilly.prototype.onMSPointerUp =
Draggabilly.prototype.onpointerup = function( event ) {
  if ( event.pointerId === this.pointerIdentifier ) {
    this.dragEnd( event, event );
  }
};

Draggabilly.prototype.ontouchend = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this.dragEnd( event, touch );
  }
};

/**
 * drag end
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
Draggabilly.prototype.dragEnd = function( event, pointer ) {
  this.isDragging = false;

  delete this.pointerIdentifier;

  // use top left position when complete
  if ( transformProperty ) {
    this.element.style[ transformProperty ] = '';
    this.setLeftTop();
  }

  // remove events
  this._unbindEvents();

  classie.remove( this.element, 'is-dragging' );

  this.emitEvent( 'dragEnd', [ this, event, pointer ] );

};

// ----- cancel event ----- //

// coerce to end event

Draggabilly.prototype.onMSPointerCancel =
Draggabilly.prototype.onpointercancel = function( event ) {
  if ( event.pointerId === this.pointerIdentifier ) {
    this.dragEnd( event, event );
  }
};

Draggabilly.prototype.ontouchcancel = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  this.dragEnd( event, touch );
};

// -------------------------- animation -------------------------- //

Draggabilly.prototype.animate = function() {
  // only render and animate if dragging
  if ( !this.isDragging ) {
    return;
  }

  this.positionDrag();

  var _this = this;
  requestAnimationFrame( function animateFrame() {
    _this.animate();
  });

};

// transform translate function
var translate = is3d ?
  function( x, y ) {
    return 'translate3d( ' + x + 'px, ' + y + 'px, 0)';
  } :
  function( x, y ) {
    return 'translate( ' + x + 'px, ' + y + 'px)';
  };

// left/top positioning
Draggabilly.prototype.setLeftTop = function() {
  this.element.style.left = this.position.x + 'px';
  this.element.style.top  = this.position.y + 'px';
};

Draggabilly.prototype.positionDrag = transformProperty ?
  function() {
    // position with transform
    this.element.style[ transformProperty ] = translate( this.dragPoint.x, this.dragPoint.y );
  } : Draggabilly.prototype.setLeftTop;

// -----  ----- //

Draggabilly.prototype.enable = function() {
  this.isEnabled = true;
};

Draggabilly.prototype.disable = function() {
  this.isEnabled = false;
  if ( this.isDragging ) {
    this.dragEnd();
  }
};

Draggabilly.prototype.destroy = function() {
  this.disable();
  // reset styles
  if ( transformProperty ) {
    this.element.style[ transformProperty ] = '';
  }
  this.element.style.left = '';
  this.element.style.top = '';
  this.element.style.position = '';
  // unbind handles
  this.bindHandles( false );
};

// -----  ----- //

return Draggabilly;

} // end definition

// -------------------------- transport -------------------------- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'components/adapt-ppq/js/draggabilly',[
      'classie/classie',
      'eventEmitter/EventEmitter',
      'eventie/eventie',
      'get-style-property/get-style-property',
      'get-size/get-size'
    ],
    draggabillyDefinition );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = draggabillyDefinition(
    require('desandro-classie'),
    require('wolfy87-eventemitter'),
    require('eventie'),
    require('desandro-get-style-property'),
    require('get-size')
  );
} else {
  // browser global
  window.Draggabilly = draggabillyDefinition(
    window.classie,
    window.EventEmitter,
    window.eventie,
    window.getStyleProperty,
    window.getSize
  );
}

})( window );


define('components/adapt-ppq/js/adapt-ppq',['require','coreViews/questionView','coreJS/adapt','components/adapt-ppq/js/draggabilly'],function(require) {

	var QuestionView = require('coreViews/questionView');
	var Adapt = require('coreJS/adapt');
    var Draggabilly = require('components/adapt-ppq/js/draggabilly');

    var PPQ = QuestionView.extend({

        events: {
            "click .ppq-pinboard":"placePin",
            "click .ppq-icon": "preventDefault"
        },

        preventDefault: function(event) {
            event.preventDefault();
        },

        preRender:function(){
            QuestionView.prototype.preRender.apply(this);
            if (this.model.get("_selectable")) {
                var selectors = [];
                for (var i = 0, l = parseInt(this.model.get("_selectable")); i < l; i++) {
                    selectors.push(i)
                }
                this.model.set("_selectors", selectors);
            }
            this.setLayout();
            this.listenTo(Adapt, 'device:changed', this.handleDeviceChanged);
            this.listenTo(Adapt, 'device:resize', this.handleDeviceResize);
        },

        postRender: function() {
            QuestionView.prototype.postRender.apply(this);

            var thisHandle = this;
            //Wait for pinboard image to load then set ready. If already complete show completed state.
            this.$('.ppq-pinboard-container-inner').imageready(_.bind(function() {

                var $pins = this.$el.find('.ppq-pin');
                $pins.each(function(index, item) {
                    item.dragObj = new Draggabilly(item, {
                        containment: true
                    });
                    if (thisHandle.model.get("_isSubmitted")) {
                        item.dragObj.disable();
                    } else {
                        item.dragObj.on('dragStart', _.bind(thisHandle.onDragStart, thisHandle));
                        item.dragObj.on('dragEnd',  _.bind(thisHandle.onDragEnd, thisHandle));
                    }
                });



                this.setReadyStatus();
                if (this.model.get("_isComplete") && this.model.get("_isInteractionsComplete")) {
                    this.showCompletedState();
                }
            }, this));
        },

        updateButtons: function() {
            QuestionView.prototype.updateButtons.apply(this);

            if (this.model.get("_isSubmitted")) {
                 var $pins = this.$el.find('.ppq-pin');
                $pins.each(function(index, item) {
                    item.dragObj.disable();
                });
                this.model.set("_countCorrect",this.$(".item-correct").length);
            }

            //this.model.get('_buttonState') == 'submit' ? this.$('.ppq-reset-pins').show() : this.$('.ppq-reset-pins').hide();
        },

        showCompletedState: function() {

            //show the user answer then apply classes to set the view to a completed state
            this.hideCorrectAnswer();
            this.$(".ppq-pin").addClass("in-use");
            this.$(".ppq-widget").addClass("submitted disabled show-user-answer");
            if (this.model.get("_isCorrect")) {
                this.$(".ppq-widget").addClass("correct");
            }
        },

        handleDeviceChanged: function() {

            this.$el.css("display:block");
            
            //Currently causes layout to change from desktop to mobile even if completed.
            this.setLayout();

            var props, isDesktop = this.model.get('desktopLayout');

            _.each(this.model.get('_items'), function(item, index) {
                props = isDesktop ? item.desktop : item.mobile;
                this.$('.ppq-correct-zone').eq(index).css({left:props.left+'%', top:props.top+'%', width:props.width+'%', height:props.height+'%'});
            }, this);

            props = isDesktop ? this.model.get('_pinboardDesktop') : this.model.get('_pinboardMobile');

            this.$('.ppq-pinboard').attr({src:props.src, title:props.title, alt:props.alt});

            this.handleDeviceResize();

            if (this.model.get("_isComplete")) {
                var width = parseInt(this.$('.ppq-pinboard').width(),10),
                height = parseInt(this.$('.ppq-pinboard').height(),10);

                var $pins = this.$(".ppq-pin");
                var countCorrect = this.model.get("_countCorrect");
                var currentLayoutItems = this.getItemsForCurrentLayout(this.model.get("_items"));

                var moved = 0;
                var uas = this.model.get("_userAnswer");
                _.each(currentLayoutItems, _.bind(function(item) {
                    var $pin = $($pins[moved]);
                    var top = 0;
                    var left = 0;
                    var uaObj;
                    if (moved < countCorrect) {
                        top = ((height/ 100) * (item.top + (item.height/2))) - ($pin.height() / 1.05);
                        left = ((width / 100) * (item.left + (item.width / 2))) - ($pin.width() / 1.05);
                        $pin.css({
                            top: top + 'px',
                            left: left + 'px'
                        });

                    } else {
                        
                        var inpos = true;
                        while(inpos == true) {
                            inpos = false;
                            top = (Math.random() * 80) + 10;
                            left = (Math.random() * 80) + 10;
                            top = ((height/ 100) * top) - ($pin.height() / 1.05);
                            left = ((width/ 100) * left) - ($pin.width() / 1.05);

                            var atop = top - ($pin.height());
                            var aleft = left - ($pin.width() /2);

                            $pin.css({
                                top: top + 'px',
                                left: left + 'px'
                            });

                            inpos = this.isInCorrectZone($pin, undefined, currentLayoutItems);
                        }

                    }

                    uaObj = {
                            top: (100/height) * top,
                            left: (100/width) * left
                        };
                    uas[moved] = uaObj;

                    moved++;
                }, this))
                this.model.set("_userAnswer", uas);
            }

            this.handleDeviceResize();
        },

        handleDeviceResize: function() {
            this.$el.css("display:block");
            // Calls resetPins then if complete adds back classes that are required to show the completed state.
            this.resetPins();
            if (this.model.get("_isComplete")) {
                this.$(".ppq-pin").addClass("in-use");
                if (this.$(".ppq-widget").hasClass("show-user-answer")) {
                    this.hideCorrectAnswer();
                } else {
                    this.showCorrectAnswer();
                }
            }
        },

        setLayout: function() {

            //Setlayout for view. This is also called when device changes.
            if (Adapt.device.screenSize == "medium" || Adapt.device.screenSize == "large") {
                this.model.set({
                    desktopLayout:true
                });
            } else if (Adapt.device.screenSize == "small") {
                this.model.set({
                    desktopLayout:false
                });
            }
            
        },

        placePin: function(event) {
            event.preventDefault();

            //Handles click event on the pinboard image to place pins
            var $pin = this.$('.ppq-pin:not(.in-use):first');
            if ($pin.length === 0) return;

            var offset = this.$('.ppq-pinboard').offset();

            var clickY = ( event.clientY < offset.top ? event.pageY : event.clientY );
            var clickX = ( event.clientX < offset.left ? event.pageX : event.clientX );

            var relX = (clickX - offset.left) - ($pin.width() / 2);
            var relY = ((clickY - offset.top)) - $pin.height();

            $pin.css({
                top:relY + 'px',
                left:relX + 'px'
            }).addClass('in-use');
            $pin.addClass('in-use');

            var isDuplicate = this.isDuplicatePin($pin);
            if (isDuplicate) {
                $pin.removeClass('in-use');
                $pin.css({
                    top: "initial",
                    left: "initial"
                });
            }
        },

        resetQuestion: function() {
            this.resetPins();
            this.model.set({
                _isAtLeastOneCorrectSelection: false
            });

            var $pins = this.$el.find('.ppq-pin');
            $pins.each(function(index, item) {
                if (item.dragObj) item.dragObj.enable();
            });
        },

        resetPins: function(event) {

            //the class "in-use" is what makes the pins visible
            if (event) event.preventDefault();
            this.$(".ppq-pin").removeClass("in-use correct incorrect");
        },

        canSubmit: function() {
            if (this.model.get("_selectable")) {
                if(this.$(".ppq-pin.in-use").length == this.model.get("_selectors").length) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if(this.$(".ppq-pin.in-use").length == this.model.get("_items").length) {
                    return true;
                } else {
                    return false;
                }
            }
        },

        storeUserAnswer:function()
        {
            var pins = this.$(".ppq-pin");

            // User answers aren't stored in the items array. Instead we create a new array with userAnswer objects.
            var userAnswers = [];

            _.each(pins, function(pin) {
               // userAnswer stores the return value from getUserAnswer and adds that to the userAnswers array.
               var userAnswer = this.getUserAnswer($(pin));
               userAnswers.push(userAnswer);
            }, this);

            this.model.set('_userAnswer', userAnswers);
        },

        isCorrect: function() {
            var correctCount = 0;
            var pins = this.$(".ppq-pin");

            // There are both desktop and mobile items but nested in the same items object.
            // So we need to store the currentLayoutItems locally to check answers against the current layout.
            var currentLayoutItems = this.getItemsForCurrentLayout(this.model.get("_items"));

            // Loop through the currentLayoutItems and check each answer
            _.each(currentLayoutItems, function(item, index) {
                _.each(pins, function(pin, pIndex) {
                    var $pin = $(pin);
                    var isCorrect = this.isInCorrectZone($pin, item);
                    if (isCorrect) {
                        item._isPlacementCorrect = true;
                        correctCount++;
                        this.model.set('_isAtLeastOneCorrectSelection', true);
                   } else {
                        item._isPlacementCorrect = false;
                   }
                }, this);
            }, this);

            if (this.model.get("_selectable")) {
                return correctCount == this.model.get("_selectors").length;
            } else {
                return correctCount == currentLayoutItems.length;
            }
        },

        isPartlyCorrect: function() {
            return this.model.get('_isAtLeastOneCorrectSelection');
        },

        getItemsForCurrentLayout: function(items) {

            // Returns an array of items based on current layout
            var currentLayoutItems = [];
            _.each(items, function(item) {
                var newItem;
                if (this.model.get("desktopLayout")) {
                    newItem = item.desktop;
                } else {
                    newItem = item.mobile;
                }
                newItem._isCorrect = item._isCorrect;
                currentLayoutItems.push(newItem);
            }, this);
            return currentLayoutItems;
        },

        isInCorrectZone: function($pin, item, items){
            var width = parseInt(this.$('.ppq-pinboard').width(),10),
                height = parseInt(this.$('.ppq-pinboard').height(),10),
                pinLeft = parseFloat($pin.css("left")) + (parseFloat($pin.css("width")) / 2),
                pinTop = parseFloat($pin.css("top")) + parseFloat($pin.css("height")),
                inCorrectZone = false;
            var pinId = $pin.attr("data-id");

            if(item) {
                var top = (item.top/100)*height,
                    left = (item.left/100)*width,
                    bottom = top + (item.height/100)*height,
                    right = left + (item.width/100)*width;
                inCorrectZone = pinLeft > left && pinLeft < right && pinTop < bottom && pinTop > top;
                inCorrectZone = inCorrectZone  && item._isCorrect !== false;
                return inCorrectZone;
            } else {
                for (var i = 0; i < items.length; i++) {
                    var item = items[i],
                        top = (item.top/100)*height,
                        left = (item.left/100)*width,
                        bottom = top + (item.height/100)*height,
                        right = left + (item.width/100)*width;
                    inCorrectZone = pinLeft > left && pinLeft < right && pinTop < bottom && pinTop > top;
                    inCorrectZone = inCorrectZone  && item._isCorrect !== false;
                    if(inCorrectZone) break;
                }
                return inCorrectZone;
            }
        },

        getPinZone: function($pin, items){
            var width = parseInt(this.$('.ppq-pinboard').width(),10),
                height = parseInt(this.$('.ppq-pinboard').height(),10),
                pinLeft = parseFloat($pin.css("left")) + (parseFloat($pin.css("width")) / 2),
                pinTop = parseFloat($pin.css("top")) + parseFloat($pin.css("height")),
                inCorrectZone = false;
            var pinId = $pin.attr("data-id");

            for (var i = 0; i < items.length; i++) {
                var item = items[i],
                    top = (item.top/100)*height,
                    left = (item.left/100)*width,
                    bottom = top + (item.height/100)*height,
                    right = left + (item.width/100)*width;
                inCorrectZone = pinLeft > left && pinLeft < right && pinTop < bottom && pinTop > top;
                if(inCorrectZone) return i;
            }
            return -1;
        },

        getUserAnswer: function($pin) {

            // Returns a user answer object that gets added to a userAnswers array
            var left = parseFloat($pin.css("left")),
                top = parseFloat($pin.css("top")),
                width = parseInt(this.$('.ppq-pinboard').width(),10),
                height = parseInt(this.$('.ppq-pinboard').height(),10);
            return {
                left: (100/width) * left,
                top: (100/height) * top
            }
        },

        showMarking:function()
        {
            this.hideCorrectAnswer();
        },

        hideCorrectAnswer: function() {
            var width = parseInt(this.$('.ppq-pinboard').width(),10),
                height = parseInt(this.$('.ppq-pinboard').height(),10);
            var pins = this.$(".ppq-pin");
            var userAnswers = this.model.get("_userAnswer");
            var currentLayoutItems = this.getItemsForCurrentLayout(this.model.get("_items"));

            _.each(userAnswers, function(userAnswer, index) {
                var $pin = $(pins[index])
                $pin.css({
                    top:(height/100) * userAnswer.top + "px",
                    left:(width/100) *userAnswer.left + "px"
                });

                // Reset classes then apply correct incorrect
                $pin.removeClass("item-correct item-incorrect");
                if (this.isInCorrectZone($pin, null, currentLayoutItems)) {
                    $pin.addClass("item-correct");
                } else {
                    $pin.addClass("item-incorrect");
                }
            }, this);
        },

        showCorrectAnswer: function() {
            var width = parseInt(this.$('.ppq-pinboard').width(),10),
                height = parseInt(this.$('.ppq-pinboard').height(),10);
            var pins = this.$(".ppq-pin"),
                answers = this.getItemsForCurrentLayout(this.model.get("_items"));
            _.each(answers, function(item, index) {
                var $pin = $(pins[index]);
                $pin.css({
                    top: ((height/ 100) * (item.top + (item.height/2))) - ($pin.height() / 2 ) + 'px',
                    left: ((width / 100) * (item.left + (item.width / 2))) - ($pin.width() / 2) + 'px'
                });
                $pin.removeClass("item-incorrect").addClass("item-correct");
            });
        },

        onDragStart: function(event) {
            console.log("Drag Start");
            var $pin = $(event.element);
            var pos = {
                top: $pin.css("top"),
                left: $pin.css("left")
            };
            $pin.attr("data-prev", JSON.stringify(pos));
        },

        onDragEnd: function(event) {
            console.log("Drag End");

            var $pin = $(event.element);

            var isDuplicate = this.isDuplicatePin($pin);
            if (isDuplicate) {
                console.log("Duplicate!")
                var pos = JSON.parse($pin.attr("data-prev"));
                $pin.css(pos);
            }
        },

        isDuplicatePin: function($pin) {
            var pins = this.$(".ppq-pin");
            var currentLayoutItems = this.getItemsForCurrentLayout(this.model.get("_items"));

            var pinZone = this.getPinZone($pin, currentLayoutItems);
            var pinDataId = $pin.attr("data-id");

            var populatedZones = {};
            for (var i = 0, l = pins.length; i < l; i++) {
                var $curPin = $(pins[i]);
                var curPinDataId = $curPin.attr("data-id");
                //if (curPinDataId === pinDataId ) continue;
                var zone = this.getPinZone($curPin, currentLayoutItems);
                if (populatedZones[zone] === undefined) populatedZones[zone] = [];
                populatedZones[zone].push(curPinDataId);
            }

            if (populatedZones[pinZone].length > 1 && pinZone > -1) return true;
            return false;
            
        }

    });

    Adapt.register("ppq", PPQ);

    return PPQ;

});

define('components/adapt-questionStrip/js/adapt-questionStrip',[ "coreJS/adapt", "coreViews/questionView" ], function(Adapt, QuestionView) {

    var QuestionStrip = QuestionView.extend({

        events: function() {
            return _.extend({}, QuestionView.prototype.events, {
                'click .qs-controls':'onNavigationClicked'
            });
        },

        setDeviceSize: function() {
            if (Adapt.device.screenSize === 'large') {
                this.$el.addClass('desktop').removeClass('mobile');
                this.model.set('_isDesktop', true);
            } else {
                this.$el.addClass('mobile').removeClass('desktop');
                this.model.set('_isDesktop', false)
            }
        },

        // Used by question to disable the question during submit and complete stages
        disableQuestion: function() {
            this.$('.qs-controls').addClass('disabled');
        },

        // Used by question to enable the question during interactions
        enableQuestion: function() {
            this.$('.qs-controls').removeClass('disabled');
        },

        // Used by the question to reset the question when revisiting the component
        resetQuestionOnRevisit: function() {
            this.resetQuestion();
        },

        setupQuestion: function() {
            this.listenTo(Adapt, 'device:resize', this.resizeControl, this);
            this.setDeviceSize();
            this.restoreUserAnswers();
        },

        restoreUserAnswers: function() {
            if (!this.model.get("_isSubmitted")) return;

            var userAnswer = this.model.get("_userAnswer");

            _.each(this.model.get("_items"), function(item, index) {
                item._stage = userAnswer[index];
            });

            this.setQuestionAsSubmitted();
            this.markQuestion();
            this.setScore();
            this.showMarking();
            this.setupFeedback();
        },

        storeUserAnswer: function() {

            var userAnswer = new Array(this.model.get('_items').length);

            _.each(this.model.get('_items'), function(item, index) {
                userAnswer[index] = item._stage;
            }, this);
            
            this.model.set('_userAnswer', userAnswer);

        },

        onQuestionRendered: function() {
            this.setupImages();
            this.setupNarrative();
        },

        canSubmit: function() {
            return true;
        },

        isCorrect: function() {

            var numberOfCorrectAnswers = 0;

            _.each(this.model.get('_items'), function(item, index) {

                if (item.hasOwnProperty('_stage') && item._subItems[item._stage]._isCorrect) {
                    numberOfCorrectAnswers ++;
                    item._isCorrect = true;
                    this.model.set('_numberOfCorrectAnswers', numberOfCorrectAnswers);
                    this.model.set('_isAtLeastOneCorrectSelection', true);
                } else {
                    item._isCorrect = false;
                }

            }, this);

            this.model.set('_numberOfCorrectAnswers', numberOfCorrectAnswers);

            if (numberOfCorrectAnswers === this.model.get('_items').length) {
                return true;
            } else {
                return false;
            }

        },

        setScore: function() {
            var questionWeight = this.model.get("_questionWeight");

            if (this.model.get('_isCorrect')) {
                this.model.set('_score', questionWeight);
                return;
            }
            
            var numberOfCorrectAnswers = this.model.get('_numberOfCorrectAnswers');
            var itemLength = this.model.get('_items').length;

            var score = questionWeight * numberOfCorrectAnswers / itemLength;

            this.model.set('_score', score);
        },

        showMarking: function() {

            _.each(this.model.get('_items'), function(item, i) {

                var $item = this.$('.component-item').eq(i);
                $item.removeClass('correct incorrect').addClass(item._isCorrect ? 'correct' : 'incorrect');

            }, this);

        },

        isPartlyCorrect: function() {
            return this.model.get('_isAtLeastOneCorrectSelection');
        },

        resetUserAnswer: function() {
            this.model.set({_userAnswer: []});
        },

        resetQuestion: function() {
            this.$(".component-item").removeClass("correct").removeClass("incorrect");
            this.model.set('_isAtLeastOneCorrectSelection', false);
            _.each(this.model.get("_items"), function(item, index) {
                this.setStage(index, item.hasOwnProperty('_initialItemIndex') ? item._initialItemIndex : 0);
            }, this);
        },

        showCorrectAnswer: function() {

            _.each(this.model.get('_items'), function(item, index) {

                _.each(item._subItems, function(option, optionIndex) {
                    if (option._isCorrect) {
                        this.setStage(index, optionIndex);
                    }
                }, this);

            }, this);

        },

        hideCorrectAnswer: function() {
            
            _.each(this.model.get('_items'), function(item, index) {
                this.setStage(index, this.model.get('_userAnswer')[index]);
            }, this);
        },

        setupImages: function() {
            var _items = this.model.get("_items");
            var _images = this.model.get("_images");

            var splitHeight = _items.length;
            var images = _images.length;
            var imagesSplit = 0;

            var thisHandle = this;

            var height = undefined;
            var width = undefined;
            
            var imagesToLoadCount = 0;
            var imagesLoadedCount = 0;

            _.each(_images, function(image) {
                var imageObj = new Image();
                $(imageObj).bind("load", function(event) {
                    imagesSplit++;

                    var imgHeight = imageObj.naturalHeight;
                    var imgWidth = imageObj.naturalWidth;

                    height = height || imageObj.naturalHeight;
                    width = width || imageObj.naturalWidth;

                    var finalHeight = height / splitHeight;

                    var offsetTop = 0;
                    var offsetLeft = 0;
                    var newHeight = height;

                    if (imgWidth != width) newHeight = (width/imgWidth) * imgHeight;

                    var canvas = document.createElement("canvas");
                    if (typeof G_vmlCanvasManager != 'undefined') G_vmlCanvasManager.initElement(canvas);
                    canvas.width = width; 
                    canvas.style.width = "100%"; 
                    canvas.height = finalHeight; 

                    var ctx = canvas.getContext("2d");

                    for (var s = 0; s < splitHeight; s++) {
                        ctx.drawImage(imageObj, 0, 0, imgWidth, imgHeight, 0 + offsetLeft, -(s * finalHeight) + offsetTop, width, newHeight);
                        var imageURL = canvas.toDataURL();

                        var img = document.createElement("img");
                        thisHandle.$('.item-'+s+'.qs-slide-container .i'+image._id).append(img);
                        imagesToLoadCount++;
                        $(img).bind("load", function() {
                            imagesLoadedCount++;

                            if (imagesToLoadCount == imagesLoadedCount) {
                                thisHandle.setReadyStatus();
                                $(window).resize();
                            }
                        });
                        img.src = imageURL;

                    }

                    if (imagesSplit == images) {
                        thisHandle.calculateWidths();
                    }

                });
                imageObj.src = image.src;
            });
        },

        setupNarrative: function() {
            this.setDeviceSize();
            
            var _items = this.model.get("_items");
            var thisHandle = this;
            _.each(_items, function(item, index) {
                item._itemCount = item._subItems.length;
                if (item.hasOwnProperty('_stage')) {
                    thisHandle.setStage(index, item._stage, true);
                } else {
                    thisHandle.setStage(index, item.hasOwnProperty('_initialItemIndex') ? item._initialItemIndex : 0);
                }
            });
            
            this.model.set('_active', true);

        },

        calculateWidths: function() {
            //calc widths for each item
            var _items = this.model.get("_items");
            _.each(_items, function(item, index) {
                var slideWidth = this.$('.qs-slide-container').width();
                var slideCount = item._itemCount;
                var marginRight = this.$('.qs-slider-graphic').css('margin-right');

                var extraMargin = marginRight === "" ? 0 : parseInt(marginRight);
                var fullSlideWidth = (slideWidth + extraMargin) * slideCount;
                var iconWidth = this.$('.qs-popup-open').outerWidth();
                var $headerInner = this.$(".item-" + index)
                    .find(".qs-strapline-header-inner");

                this.$('.item-'+index+'.qs-slide-container .qs-slider-graphic').width(slideWidth)
                this.$('.qs-strapline-header').width(slideWidth);
                this.$('.qs-strapline-title').width(slideWidth);

                this.$('.item-'+index+'.qs-slide-container .qs-slider').width(fullSlideWidth);
                $headerInner.width(fullSlideWidth);

                var stage = item._stage;//this.model.get('_stage');
                var margin = -(stage * slideWidth);

                this.$('.item-'+index+'.qs-slide-container .qs-slider').css('margin-left', margin);
                $headerInner.css("margin-left", margin);

                item._finalItemLeft = fullSlideWidth - slideWidth;
            });

            _.each(this.$('.qs-slider-graphic'), function(item) {
                $(item).attr("height","").css("height","");
            });
        },

        resizeControl: function() {
            this.setDeviceSize();
            this.calculateWidths();
            var _items = this.model.get("_items");
            var thisHandle = this;
            _.each(_items, function(item, index) {
                thisHandle.evaluateNavigation(index);
            });
        },

        moveSliderToIndex: function(itemIndex, stage, animate) {
            var extraMargin = parseInt(this.$('.item-'+itemIndex+'.qs-slide-container .qs-slider-graphic').css('margin-right')),
                movementSize = this.$('.item-'+itemIndex+'.qs-slide-container').width()+extraMargin;

            if(animate) {
                this.$('.item-'+itemIndex+'.qs-slide-container .qs-slider').stop().animate({'margin-left': -(movementSize * stage)});
                this.$('.item-'+itemIndex+' .qs-strapline-header .qs-strapline-header-inner').stop(true, true).animate({'margin-left': -(movementSize * stage)});
            } else {
                this.$('.item-'+itemIndex+'.qs-slide-container .qs-slider').css({'margin-left': -(movementSize * stage)});
                this.$('.item-'+itemIndex+' .qs-strapline-header .qs-strapline-header-inner').css({'margin-left': -(movementSize * stage)});
            }
        },

        setStage: function(itemIndex, stage, initial) {
            var item = this.model.get('_items')[itemIndex];
            item._stage = stage;
            item.visited = true;

            this.$('.qs-progress').removeClass('selected').eq(stage).addClass('selected');
            this.$('.item-'+itemIndex+'.qs-slide-container .qs-slider-graphic').children('.controls').attr('tabindex', -1);
            this.$('.item-'+itemIndex+'.qs-slide-container .qs-slider-graphic').eq(stage).children('.controls').attr('tabindex', 0);

            this.evaluateNavigation(itemIndex);

            this.moveSliderToIndex(itemIndex, stage, !initial);
        },

        evaluateNavigation: function(itemIndex) {
            var item = this.model.get('_items')[itemIndex];
            var currentStage = item._stage;
            var itemCount = item._itemCount;
            if (currentStage == 0) {
                this.$('.item-'+itemIndex+'.qs-slide-container .qs-control-left').addClass('qs-hidden');

                if (itemCount > 1) {
                    this.$('.item-'+itemIndex+'.qs-slide-container .qs-control-right').removeClass('qs-hidden');
                }
            } else {
                this.$('.item-'+itemIndex+'.qs-slide-container .qs-control-left').removeClass('qs-hidden');

                if (currentStage == itemCount - 1) {
                    this.$('.item-'+itemIndex+'.qs-slide-container .qs-control-right').addClass('qs-hidden');
                } else {
                    this.$('.item-'+itemIndex+'.qs-slide-container .qs-control-right').removeClass('qs-hidden');
                }
            }

        },

        getVisitedItems: function() {
          return _.filter(this.model.get('_items'), function(item) {
                return item.visited;
          });
        },

        onNavigationClicked: function(event) {
            event.preventDefault();

            var $target = $(event.currentTarget);

            if ($target.hasClass('disabled')) return;

            if (!this.model.get('_active')) return;

            var selectedItemIndex = $target.parent('.component-item').index();
            var selectedItemObject = this.model.get('_items')[selectedItemIndex];

            var stage = selectedItemObject._stage,
                numberOfItems = selectedItemObject._itemCount;

            if ($target.hasClass('qs-control-right')) {
                stage++;
                if (stage == numberOfItems-1) {
                    $('.qs-control-left').focus();
                }
            } else if ($target.hasClass('qs-control-left')) {
                stage--;
                if (stage == 0) {
                    $('.qs-control-right').focus();
                }
            }
            stage = (stage + numberOfItems) % numberOfItems;
            this.setStage(selectedItemIndex, stage);
        }

    });

    Adapt.register("questionStrip", QuestionStrip);

    return QuestionStrip;

});

define('components/adapt-tabs/js/adapt-tabs',['require','coreViews/componentView','coreJS/adapt'],function(require) {

	var ComponentView = require('coreViews/componentView');
	var Adapt = require('coreJS/adapt');

	var Tabs = ComponentView.extend({

		events: {
			'click .tabs-navigation-item': 'onTabItemClicked'
		},
		
		preRender: function() {
		},

		postRender: function() {
			this.setReadyStatus();
			this.setLayout();
			this.listenTo(Adapt, 'device:resize', this.setLayout);
			this.showContentItemAtIndex(0, true);
			this.setTabSelectedAtIndex(0);
		},

		setLayout: function() {
			this.$el.removeClass("tab-layout-left tab-layout-top");
			if (Adapt.device.screenSize == 'large') {
				var tabLayout = this.model.get('_tabLayout');
				this.$el.addClass("tab-layout-" + tabLayout);
				if (tabLayout === 'top') {
					this.setTabLayoutTop();
				} else if (tabLayout === 'left') {
					this.setTabLayoutLeft();
				}
			} else {
				this.$el.addClass("tab-layout-left");
				this.setTabLayoutLeft();
			}
		},

		setTabLayoutTop: function() {
			var itemsLength = this.model.get('_items').length;
			var itemWidth = 100 / itemsLength;

			this.$('.tabs-navigation-item').css({
				width: itemWidth + '%'
			});
		},

		setTabLayoutLeft: function() {
			this.$('.tabs-navigation-item').css({
				width: 100 + '%'
			});
		},

		onTabItemClicked: function(event) {
			event.preventDefault();
			var index = $(event.currentTarget).index();
			this.showContentItemAtIndex(index);
			this.setTabSelectedAtIndex(index);
			this.setVisited($(event.currentTarget).index());
		},

		showContentItemAtIndex: function(index, skipFocus) {
			var $contentItems = this.$('.tab-content');

			$contentItems.removeClass('active').velocity({
				opacity: 0,
				translateY: '20px'
			}, {
				duration: 0,
				display: 'none'
			});

			var $contentItem = $contentItems.eq(index);
			$contentItem.velocity({
				opacity: 1,
				translateY: '0'
			}, {
				duration: 300,
				display: 'block',
				complete: _.bind(complete,this)
			});

			function complete() {
				if (skipFocus) return;
	            $contentItem.addClass('active').a11y_focus();
			}
		},

		setTabSelectedAtIndex: function(index) {
			var $navigationItem = this.$('.tabs-navigation-item-inner');
			$navigationItem.removeClass('selected').eq(index).addClass('selected visited').attr('aria-label', this.model.get("_items")[index].tabTitle + ". Visited");
			this.setVisited(index);
		},

		setVisited: function(index) {
			var item = this.model.get('_items')[index];
			item._isVisited = true;
			this.checkCompletionStatus();
		},

		getVisitedItems: function() {
			return _.filter(this.model.get('_items'), function(item) {
				return item._isVisited;
			});
		},

		checkCompletionStatus: function() {
			if (this.getVisitedItems().length == this.model.get('_items').length) {
				this.setCompletionStatus();
			}
		}
	},{
      template: 'tabs'
   });
	
	Adapt.register("tabs", Tabs);

	return Tabs;
	
});

define('menu/adapt-filterMenu/js/adapt-filterMenuItemView',[ "core/js/views/adaptView", "core/js/adapt" ], function(AdaptView, Adapt) {

	var FilterMenuItemView = AdaptView.extend({

		className: function() {
			var classes = "filter-menu-item";
			var modelClasses = this.model.get("_classes");

			if (modelClasses) classes += " " + modelClasses;
			if (this.model.get("_type") === "resource") classes += " resource";
			if (this.model.get("_isOptional")) classes += " optional";
			if (this.model.get("_isVisited") || this.isVisited()) classes += " visited";
			if (this.model.get("_isComplete")) classes += " completed";
			if (this.model.get("_isLocked")) classes += " locked";
			if (this.model.get("_isPinned")) classes += " pinned";

			return classes;
		},

		events: {
			"click .filter-menu-item-button": "onItemClick",
			"change input": "togglePin"
		},

		initialize: function() {
			this.listenTo(Adapt, "filterMenu:reRender", this.remove);

			AdaptView.prototype.initialize.call(this);
		},

		postRender: function() {
			this.setReadyStatus();
			this.trigger("ready");
		},

		isVisited: function() {
			var components = this.model.findDescendants("components");

			return components.findWhere("_isComplete", true);
		},

		onItemClick: function() {
			if (this.model.get("_isLocked")) return;

			if (this.model.get("_type") === "resource") this.openResource();
			else Adapt.navigateToElement(this.model.get("_id"));
		},

		togglePin: function() {
			var suspendData = Adapt.offlineStorage.get("filterMenu") || {};
			var id = this.model.get("_id");
			var isPinned = !this.model.get("_isPinned");

			this.model.set("_isPinned", isPinned);
			this.$el.toggleClass("pinned");
			Adapt.trigger("filterMenu:filter");

			if (!suspendData.pinned) suspendData.pinned = [];

			if (isPinned) suspendData.pinned.push(id);
			else suspendData.pinned = _.without(suspendData.pinned, id);

			Adapt.offlineStorage.set("filterMenu", suspendData);
		},

		openResource: function() {
			top.open(this.model.get("_url"));

			if (this.model.get("_isComplete")) return;

			this.setResourceCompletionStatus();
			Adapt.trigger("filterMenu:filter").trigger("filterMenu:updateProgress");
		},

		setResourceCompletionStatus: function() {
			var suspendData = Adapt.offlineStorage.get("filterMenu") || {};

			this.model.set("_isComplete", true);
			this.$el.addClass("completed");

			if (!suspendData.resources) suspendData.resources = [];

			suspendData.resources.push(this.model.get("_id"));
			Adapt.offlineStorage.set("filterMenu", suspendData);
		}

	}, { template: "filterMenuItem", type: "menu" });

	return FilterMenuItemView;

});
define('menu/adapt-filterMenu/js/adapt-filterMenuStripView',[
	"core/js/views/adaptView",
	"core/js/adapt",
	"menu/adapt-filterMenu/js/adapt-filterMenuItemView"
], function(AdaptView, Adapt, FilterMenuItemView) {

	var FilterMenuStripView = AdaptView.extend({

		queuedItems: 0,

		className: function() {
			var classes = "filter-menu-strip";
			var modelClasses = this.model.get("_classes");

			if (modelClasses) classes += " " + modelClasses;

			return classes;
		},

		attributes: function() {
			return { "data-strip": this.model.get("_id") };
		},

		events: {
			"click .filter-menu-control": "onControlClick",
			"focus .filter-menu-item .aria-label": "onItemFocus"
		},

		initialize: function() {
			if (!Adapt.device.touch) {
				this.listenTo(Adapt, "device:resize", this.onDeviceResize);
			}

			this.listenTo(Adapt, {
				"filterMenu:reRender": this.remove,
				"filterMenu:updateProgress": this.setProgress
			});

			AdaptView.prototype.initialize.call(this);
		},

		preRender: function() {
			this.$el.css("opacity", 0);
		},

		postRender: function() {
			this.$el.velocity({ opacity: 1 }, "fast");
			this.setUpItems();
			this.setProgress();
			this.setControlsVisibility();
		},

		onControlClick: function(event) {
			var direction = $(event.currentTarget).hasClass("left") ? "left" : "right";

			this.scroll(direction);
		},

		onItemFocus: function(event) {
			var $item = $(event.currentTarget).parents(".filter-menu-item");

			this.$(".filter-menu-items-container").scrollLeft($item.position().left);
			this.setControlsVisibility();
		},

		onDeviceResize: function() {
			this.setControlsVisibility();
		},

		setControlsVisibility: function(scrollLeft) {
			if (Adapt.device.touch) return;

			var $container = this.$(".filter-menu-items-container");
			var $controls = this.$(".filter-menu-control");
			var scrollWidth = this.$(".filter-menu-items")[0].scrollWidth;

			if (scrollLeft === undefined) scrollLeft = $container.scrollLeft();

			var showLeftControl = scrollLeft > 0;
			var showRightControl = scrollLeft + $container.width() < scrollWidth;

			$controls.filter(".left").toggleClass("display-none", !showLeftControl);
			$controls.filter(".right").toggleClass("display-none", !showRightControl);
		},

		scroll: function(direction) {
			var itemLeft;
			var $container = this.$(".filter-menu-items-container");
			var scrollLeft = $container.scrollLeft();
			var width = $container.width();

			this.$(".filter-menu-item").each(function() {
				var $item = $(this);

				itemLeft = $item.position().left;

				switch (direction) {
					case "left":
						if (itemLeft > scrollLeft - width) return false;
						break;
					case "right":
						if (itemLeft + $item.width() > scrollLeft + width) return false;
				}
			});

			this.setControlsVisibility(itemLeft);
			$container.animate({ scrollLeft: itemLeft });
		},

		setUpItems: function() {
			var items = this.model.get("_items");
			var $container = this.$(".filter-menu-items");

			for (var i = 0, j = items.length; i < j; i++) {
				var item = items[i];

				if (item.get("_isFiltered")) continue;

				var view = new FilterMenuItemView({ model: item });

				this.queuedItems++;
				this.listenToOnce(view, "ready", this.onItemReady);
				$container.append(view.$el);
			}

			this.$el.toggleClass("empty", !this.queuedItems);

			if (!this.queuedItems) this.setReadyStatus();
		},

		setReadyStatus: function() {
			Adapt.trigger("filterMenu:stripReady");
		},

		onItemReady: function() {
			this.queuedItems--;

			if (!this.queuedItems) this.setReadyStatus();
		},

		setProgress: function() {
			if (!this.model.get("_isProgressEnabled")) return;

			var $bar = this.$(".filter-menu-strip-progress-bar");
			var $aria = $bar.siblings("span");
			var globals = this.model.get("_globals");
			var percentage = this.getProgress();

			if (!$aria.length) {
				$aria = $("<span/>").attr({
					"class": "aria-label prevent-default",
					role: "region",
					tabindex: 0
				}).insertBefore($bar);
			}

			$aria.text(globals._menu._filterMenu.progressAria + percentage);
			$bar.width(percentage);
		},

		getProgress: function() {
			var items = new Backbone.Collection(this.model.get("_items"));
			var completed = items.where({ _isOptional: false, _isComplete: true });
			var mandatory = items.where({ _isOptional: false });

			return parseInt(completed.length / mandatory.length * 100, 10) + "%";
		},

		remove: function() {
			this._isRemoved = true;
			this.stopListening().$el.remove();
		}

	}, { template: "filterMenuStrip" });

	return FilterMenuStripView;

});
define('menu/adapt-filterMenu/js/adapt-filterMenuDashboardView',[ "core/js/adapt" ], function(Adapt) {

	var FilterMenuDashboardView = Backbone.View.extend({

		className: "filter-menu-dashboard display-none",

		events: {
			"change input": "filter",
			"click .filter-menu-dashboard-close": "toggleDashboard"
		},

		initialize: function() {
			this.model.get("_dashboard")._globals = Adapt.course.get("_globals");
			this.renderNavigation();
			this.setUpTags();
			this.listenTo(Adapt, {
				"accessibility:toggle": this.render,
				"router:menu": this.onMenuRoute,
				"router:page": this.onPageRoute,
				"navigation:toggleFilterDashboard": this.toggleDashboard,
				"navigation:disableFilters": this.disableFilters,
				"filterMenu:filter": this.filter
			}).render();
		},

		render: function() {
			var template = Handlebars.templates.filterMenuDashboard;
			var data = this.model.get("_dashboard");

			$("body").append(this.$el.html(template(data)));
		},

		renderNavigation: function() {
			var template = Handlebars.templates.filterMenuDashboardNavigation;
			var data = this.model.get("_dashboard");

			$(".navigation-inner").prepend(template(data));
		},

		setUpTags: function() {
			var tagsMap = {};

			this.getMenuItems().each(function(item) {
				var tags = item.get("_tags");

				if (!tags) return;

				for (var i = 0, j = tags.length; i < j; i++) {
					var tag = tags[i];

					if (!tagsMap[tag]) tagsMap[tag] = [];

					tagsMap[tag].push(item);
				}
			});

			this.model.get("_dashboard")._tags._items = tagsMap;
		},

		onMenuRoute: function(model) {
			$(".filter-menu-dashboard-navigation")
				.toggleClass("display-none", !model.has("_filterMenu"));
		},

		onPageRoute: function() {
			this.$el.add(".filter-menu-dashboard-navigation").addClass("display-none");
			$(".filter-menu-dashboard-button").removeClass("selected");
		},

		toggleDashboard: function() {
			this.$el.toggleClass("display-none");
			$(".filter-menu-dashboard-button").toggleClass("selected");

			if (this.$el.hasClass("display-none")) return Adapt.trigger("popup:closed");

			Adapt.trigger("popup:opened", this.$el.a11y_focus());
			$("body").scrollEnable();
		},

		disableFilters: function() {
			this.$el.find("input").prop("checked", false);
			this.filter();
			$(".filter-menu-dashboard-navigation").next().a11y_focus();
		},

		filter: _.debounce(function() {
			var activeFilters = this.getActiveFilters();
			var activeTags = this.getActiveTags();
			var isFiltering = !_.isEmpty(activeFilters) || !_.isEmpty(activeTags);
			var shouldFilter = function(item) {
				var tags = item.get("_tags");

				for (var attribute in activeFilters) {
					if (activeFilters.hasOwnProperty(attribute) &&
						item.get(attribute) === activeFilters[attribute]) {
						return true;
					}
				}

				for (var i = 0, j = activeTags.length; i < j; i++) {
					if (!_.contains(tags, activeTags[i])) return true;
				}

				return false;
			};
			var shouldTriggerRender = false;

			$(".filter-menu-dashboard-navigation").toggleClass("filtered", isFiltering);

			this.getMenuItems().each(function(item) {
				var isFiltered = shouldFilter(item);

				if (item.get("_isFiltered") === isFiltered) return;
				
				item.set("_isFiltered", isFiltered);
				shouldTriggerRender = true;
			});

			if (!shouldTriggerRender) return;

			this.listenToOnce(Adapt, "filterMenu:ready", _.bind(function() {
				this.$el.a11y_only();
			}, this));

			Adapt.trigger("filterMenu:reRender");
		}, 250),

		getActiveFilters: function() {
			var filters = this.model.get("_dashboard")._filters._items;
			var $checkboxes = this.$(".dashboard-filters").find("input");
			var activeFilters = {};

			for (var i = 0, j = filters.length; i < j; i++) {
				if (!$checkboxes.eq(i).is(":checked")) continue;

				var filter = filters[i];

				activeFilters[filter._attribute] = filter._value || false;
			}

			return activeFilters;
		},

		getActiveTags: function() {
			var tags = this.model.get("_dashboard")._tags._items;
			var $checkboxes = this.$(".dashboard-tags").find("input");
			var activeTags = [];

			for (var tag in tags) {
				if (tags.hasOwnProperty(tag) &&
					$checkboxes.filter("[data-tag='" + tag + "']").is(":checked")) {
					activeTags.push(tag);
				}
			}

			return activeTags;
		},

		getMenuItems: function() {
			var strips = this.model.get("_strips");
			var menuItems = new Backbone.Collection();

			for (var i = 0, j = strips.length; i < j; i++) {
				menuItems.add(strips[i]._items);
			}

			return menuItems;
		}

	});

	return FilterMenuDashboardView;

});
define('menu/adapt-filterMenu/js/adapt-filterMenu',[
	"core/js/views/menuView",
	"core/js/adapt",
	"menu/adapt-filterMenu/js/adapt-filterMenuStripView",
	"core/js/models/adaptModel",
	"menu/adapt-filterMenu/js/adapt-filterMenuDashboardView"
], function(MenuView, Adapt, FilterMenuStripView, AdaptModel, FilterMenuDashboardView) {

	var FilterMenuView = MenuView.extend({

		queuedStrips: 0,

		initialize: function() {
			Adapt.trigger("filterMenu:filter");
			this.listenTo(Adapt, {
				"filterMenu:reRender": this.onReRender,
				"filterMenu:stripReady": this.onStripReady,
				"filterMenu:ready": this.setReadyStatus,
				"filterMenu:updateProgress": this.setProgress
			}).$el.addClass("filter-menu-container");

			MenuView.prototype.initialize.call(this);
		},

		postRender: function() {
			this.setUpStrips();
		},

		onReRender: function() {
			this.render().setProgress();
		},

		onStripReady: function() {
			this.queuedStrips--;

			if (this.queuedStrips) return;

			this.setProgress();
			Adapt.trigger("filterMenu:ready");
		},

		setUpStrips: function() {
			var strips = this.model.get("_filterMenu")._strips;
			var $inner = this.$(".filter-menu-strips");

			for (var i = 0, j = strips.length; i < j; i++) {
				this.queuedStrips++;

				$inner.append(new FilterMenuStripView({
					model: new Backbone.Model(strips[i])
				}).$el);
			}
		},

		setProgress: function() {
			if (!this.model.get("_filterMenu")._isProgressEnabled) return;

			var $bar = this.$(".filter-menu-progress-bar");
			var $aria = $bar.siblings("span");
			var globals = this.model.get("_globals")._menu._filterMenu;
			var percentage = this.getProgress();

			if (!$aria.length) {
				$aria = $("<span/>").attr({
					"class": "aria-label prevent-default",
					role: "region",
					tabindex: 0
				}).insertBefore($bar);
			}

			$aria.text(globals.progressAria + percentage);
			$bar.width(percentage);
			this.$(".filter-menu-progress-text").html(percentage + globals.progress);
		},

		getProgress: function() {
			var strips = this.model.get("_filterMenu")._strips;
			var items = new Backbone.Collection();

			for (var i = 0, j = strips.length; i < j; i++) {
				items.add(strips[i]._items);
			}

			var completed = items.where({ _isOptional: false, _isComplete: true });
			var mandatory = items.where({ _isOptional: false });

			return parseInt(completed.length / mandatory.length * 100, 10) + "%";
		}

	}, { template: "filterMenu" });

	function setUpModels(config) {
		var strips = config._strips;

		for (var i = 0, j = strips.length; i < j; i++) {
			var items = strips[i]._items;

			for (var k = 0, l = items.length; k < l; k++) {
				items[k] = getModel(items[k]);
			}
		}
	}

	function getModel(item) {
		var id = item._id;
		var model = item._type === "resource" ?
			new AdaptModel(item):
			Adapt.findById(id);

		if (!model) throw "Filter Menu: ID \"" + id + "\" not found";

		var suspendData = Adapt.offlineStorage.get("filterMenu");

		return model.set({
			_tags: item._tags,
			_isFiltered: false,
			_isPinned: suspendData && _.contains(suspendData.pinned, id) || false,
			_isComplete: suspendData && _.contains(suspendData.resources, id) || false
		});
	}

	Adapt.once("adapt:start", function() {
		var course = Adapt.course;
		var menuRoot = course.has("_filterMenu") ?
			course :
			Adapt.contentObjects.find("_filterMenu");

		if (!menuRoot) return;

		var config = menuRoot.get("_filterMenu");
		var dashboard = config._dashboard;

		setUpModels(config);

		if (dashboard && dashboard._isEnabled) {
			new FilterMenuDashboardView({ model: new Backbone.Model(config) });
		}
		
		Adapt.on("router:menu", function(model) {
			if (model.get("_id") === menuRoot.get("_id")) {
				$("#wrapper").append(new FilterMenuView({ model: model }).$el);
			}
		});
	});

});
define('theme/adapt-kineo-theme/js/theme-page',['require','coreJS/adapt','backbone'],function(require) {
	
	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');
	
	var ThemePageView = Backbone.View.extend({

		initialize: function() {
			this.setStyles();
			this.listenTo(Adapt, 'device:changed', this.setStyles);
			this.listenTo(Adapt, 'remove', this.onRemove);
		},

		events: {
			"click .page-header-scroll-button-inner": "onScrollButtonClicked"
		},

		setStyles: function() {
			this.setThemePalette();
			this.addPageClasses();
			this.setBackground();
			this.setMinHeight();
		},

		setThemePalette: function() {
			var themePalette = this.model.get('_themePageConfig')._themePalette;

			$('html').removeClass(Adapt.course._last);

			if (themePalette) {
				$('html').addClass(themePalette);
				Adapt.course._last = themePalette;
			}
		},

		onRemove: function() {
			this.remove();
			
			var themePalette = this.model.get('_themePageConfig')._themePalette;

			if (themePalette) {
				$('html').removeClass(themePalette);
			}
		},

		addPageClasses: function() {
			var pageClasses = this.model.get('_classes');

			if (pageClasses) {
				this.$el.addClass(pageClasses);
			}
		},

		setBackground: function() {
			var pageHeader = this.model.get('_themePageConfig')._pageHeader;
			var pageFooter = this.model.get('_themePageConfig')._pageFooter;

			if (pageHeader) {
				var backgroundColor = this.model.get('_themePageConfig')._pageHeader._backgroundColor;

				if (backgroundColor) {
					this.$('.page-header').css({
						backgroundColor: backgroundColor
					});
				};

				var backgroundImage = '';
				var backgroundImages = this.model.get('_themePageConfig')._pageHeader._backgroundImage;

				if (backgroundImages) {
					if (Adapt.device.screenSize == 'large') {
						backgroundImage = backgroundImages._large;
					} else if (Adapt.device.screenSize == 'medium') {
						backgroundImage = backgroundImages._medium;
					} else {
						backgroundImage = backgroundImages._small;
					};

					this.$('.page-header').css({
						backgroundImage: 'url(' + backgroundImage + ')'
					});

				}
			};

			if (pageFooter) {
				var backgroundColor = this.model.get('_themePageConfig')._pageFooter._backgroundColor;
				
				if (backgroundColor) {
					this.$('.page-footer').css({
						backgroundColor: backgroundColor
					});
				};

				var backgroundImage = '';
				var backgroundImages = this.model.get('_themePageConfig')._pageFooter._backgroundImage;

				if (backgroundImages) {
					if (Adapt.device.screenSize == 'large') {
						backgroundImage = backgroundImages._large;
					} else if (Adapt.device.screenSize == 'medium') {
						backgroundImage = backgroundImages._medium;
					} else {
						backgroundImage = backgroundImages._small;
					};

					this.$('.page-footer').css({
						backgroundImage: 'url(' + backgroundImage + ')'
					});

				}
			}
		},

		setMinHeight: function() {
			var pageHeader = this.model.get('_themePageConfig')._pageHeader;
			var pageFooter = this.model.get('_themePageConfig')._pageFooter;

			if (pageHeader) {
				var minHeight = 0;
				var minHeights = this.model.get('_themePageConfig')._pageHeader._minimumHeights;

				if (minHeights) {
					if (Adapt.device.screenSize == 'large') {
						minHeight = minHeights._large;
					} else if (Adapt.device.screenSize == 'medium') {
						minHeight = minHeights._medium;
					} else {
						minHeight = minHeights._small;
					}
				}

				this.$('.page-header').css({
					minHeight: minHeight + "px"
				});
			};

			if (pageFooter) {
				var minHeight = 0;
				var minHeights = this.model.get('_themePageConfig')._pageFooter._minimumHeights;

				if (minHeights) {
					if (Adapt.device.screenSize == 'large') {
						minHeight = minHeights._large;
					} else if (Adapt.device.screenSize == 'medium') {
						minHeight = minHeights._medium;
					} else {
						minHeight = minHeights._small;
					}
				}

				this.$('.page-footer').css({
					minHeight: minHeight + "px"
				});
			}
		},

		onScrollButtonClicked: function(event) {
			if (event) event.preventDefault();

			var offset = this.$('.page-header').height();
			
			$("html, body").velocity("scroll", {
				duration: 800,
				offset: offset + "px",
				mobileHA: false 
			});
		}

	});

	return ThemePageView;
});

define('theme/adapt-kineo-theme/js/theme-article',['require','coreJS/adapt','backbone'],function(require) {
	
	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');

	var ThemeArticleView = Backbone.View.extend({

		initialize: function() {
			this.setStyles();
			this.listenTo(Adapt, 'device:resize', this.setStyles);
			this.listenTo(Adapt, 'remove', this.remove);
		},

		setStyles: function() {
			this.setBackground();
		},

		setBackground: function() {
			var backgroundImage = '';
			var backgroundImages = this.model.get('_themeArticleConfig')._backgroundImage;

			var backgroundColor = this.model.get('_themeArticleConfig')._backgroundColor;

			if (backgroundColor) {
				this.$el.css({
					backgroundColor: backgroundColor
				});
			}
			
			if (backgroundImages) {
				if (Adapt.device.screenSize == 'large') {
					backgroundImage = backgroundImages._large;
				} else if (Adapt.device.screenSize == 'medium') {
					backgroundImage = backgroundImages._medium;
				} else {
					backgroundImage = backgroundImages._small;
				}

				this.$el.addClass('article-image').css({
					backgroundImage: 'url(' + backgroundImage + ')'
				});
				
			}
		}

	});

	return ThemeArticleView;

});

define('theme/adapt-kineo-theme/js/theme-block',['require','coreJS/adapt','backbone'],function(require) {
	
	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');

	var ThemeBlockView = Backbone.View.extend({

		initialize: function() {
			this.setStyles();
			this.listenTo(Adapt, 'device:resize', this.setStyles);
			this.listenTo(Adapt, 'remove', this.remove);
		},

		setStyles: function() {
			this.setBackground();
			this.setMinHeight();
			this.setDividerBlock();
		},

		setBackground: function() {
			var backgroundImage = '';
			var backgroundImages = this.model.get('_themeBlockConfig')._backgroundImage;

			var backgroundColor = this.model.get('_themeBlockConfig')._backgroundColor;

			if (backgroundColor) {
				this.$el.css({
					backgroundColor: backgroundColor
				});
			}
			
			if (backgroundImages) {

				if (Adapt.device.screenSize == 'large') {
					backgroundImage = backgroundImages._large;
				} else if (Adapt.device.screenSize == 'medium') {
					backgroundImage = backgroundImages._medium;
				} else {
					backgroundImage = backgroundImages._small;
				};

				this.$el.addClass('block-image').css({
					backgroundImage: 'url(' + backgroundImage + ')'
				});

			}
		},

		setMinHeight: function() {
			var minHeight = 0;
			var minHeights = this.model.get('_themeBlockConfig')._minimumHeights;

			if (minHeights) {

				if(Adapt.device.screenSize == 'large') {
					minHeight = minHeights._large;
				} else if (Adapt.device.screenSize == 'medium') {
					minHeight = minHeights._medium;
				} else {
					minHeight = minHeights._small;
				}
			}

			this.$el.css({
				minHeight: minHeight + "px"
			});
		},

		setDividerBlock: function() {
			var dividerBlock = this.model.get('_themeBlockConfig')._isDividerBlock;

			if (dividerBlock) {
				this.$el.addClass('divider-block');
			}
		}
	});

	return ThemeBlockView;

});

define('theme/adapt-kineo-theme/js/vanilla',['require','coreJS/adapt','backbone','./theme-page','./theme-article','./theme-block'],function(require) {
	
	var Adapt = require('coreJS/adapt');
	var Backbone = require('backbone');
	var ThemePage = require('./theme-page');
	var ThemeArticle = require('./theme-article');
	var ThemeBlock = require('./theme-block');
	var currentPage;
	
	// themeConfig page helper
	// =======================
	Adapt.on('pageView:preRender', function(view) {
		currentPage = view.model;
	});
	
	Adapt.on('remove', function(view) {
		currentPage = undefined;
	});
	
	Adapt.once("app:dataReady" , function() { 
		Handlebars.registerHelper("themeConfig", function(options){	
			// console.log(currentPage);
			if (!currentPage) return;
			options.data.root._theme = _.extend({}, currentPage.get("_theme"), options.data.root._theme);
		});
	});
	
	// Page View
	// =========
	Adapt.on('pageView:postRender', function(view) {
		var theme = view.model.get('_theme');

		if (theme) {
			new ThemePage({
				model: new Backbone.Model({
					_themePageConfig: theme
				}),
				el: view.$el
			});
		}
		
	});

	// Article View
	// ============
	Adapt.on('articleView:postRender', function(view) {
		var theme = view.model.get('_theme');
		
		if (theme) {
			new ThemeArticle({
				model: new Backbone.Model({
					_themeArticleConfig: theme
				}),
				el: view.$el
			});
		}
		
	});

	// Block View
	// ==========
	Adapt.on('blockView:postRender', function(view) {
		var theme = view.model.get('_theme');
		
		if (theme) {
			new ThemeBlock({
				model: new Backbone.Model({
					_themeBlockConfig: theme
				}),
				el: view.$el
			});
		}
	});
});

define('bundles',[
	"extensions/adapt-article-reveal/js/adapt-article-reveal",
	"extensions/adapt-articleBlockSlider/js/articleBlockSlider",
	"extensions/adapt-background-switcher/js/adapt-contrib-background-switcher",
	"extensions/adapt-contrib-assessment/js/adapt-assessmentArticleExtension",
	"extensions/adapt-contrib-bookmarking/js/adapt-contrib-bookmarking",
	"extensions/adapt-contrib-pageLevelProgress/js/adapt-contrib-pageLevelProgress",
	"extensions/adapt-contrib-resources/js/adapt-contrib-resources",
	"extensions/adapt-contrib-spoor/js/adapt-contrib-spoor",
	"extensions/adapt-contrib-trickle/js/adapt-contrib-trickle",
	"extensions/adapt-contrib-triggered/js/adapt-contrib-triggered",
	"extensions/adapt-contrib-tutor/js/adapt-contrib-tutor",
	"extensions/adapt-devtools/js/adapt-devtools",
	"extensions/adapt-hint/js/adapt-hint",
	"extensions/adapt-inspector/js/adapt-inspector",
	"extensions/adapt-pageIncompletePrompt/js/adapt-pageIncompletePrompt",
	"extensions/adapt-prototype/js/adapt-prototype",
	"extensions/adapt-quicknav/js/adapt-quicknav",
	"extensions/adapt-search/js/adapt-search",
	"components/adapt-contrib-accordion/js/adapt-contrib-accordion",
	"components/adapt-contrib-assessmentResults/js/adapt-contrib-assessmentResults",
	"components/adapt-contrib-assessmentResultsTotal/js/adapt-contrib-assessmentResultsTotal",
	"components/adapt-contrib-blank/js/adapt-contrib-blank",
	"components/adapt-contrib-gmcq/js/adapt-contrib-gmcq",
	"components/adapt-contrib-graphic/js/adapt-contrib-graphic",
	"components/adapt-contrib-hotgraphic/js/adapt-contrib-hotgraphic",
	"components/adapt-contrib-matching/js/adapt-contrib-matching",
	"components/adapt-contrib-mcq/js/adapt-contrib-mcq",
	"components/adapt-contrib-media/js/adapt-contrib-media",
	"components/adapt-contrib-narrative/js/adapt-contrib-narrative",
	"components/adapt-contrib-slider/js/adapt-contrib-slider",
	"components/adapt-contrib-text/js/adapt-contrib-text",
	"components/adapt-contrib-textInput/js/adapt-contrib-textInput",
	"components/adapt-hotgrid/js/adapt-hotgrid",
	"components/adapt-narrativeStrip/js/adapt-narrativeStrip",
	"components/adapt-ppq/js/adapt-ppq",
	"components/adapt-questionStrip/js/adapt-questionStrip",
	"components/adapt-tabs/js/adapt-tabs",
	"menu/adapt-filterMenu/js/adapt-filterMenu",
	"theme/adapt-kineo-theme/js/vanilla"
],function(){});

//# sourceMappingURL=bundles.js.map
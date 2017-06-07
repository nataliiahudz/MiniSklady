(function($){

    "use strict";
	jQuery(window).bind("debouncedresize", function() {
			
			iframesHeight();
			
			// Isotope | Relayout
			jQuery('.masonry.isotope').isotope();
			jQuery('.masonry.gallery').isotope( 'layout');
		
			// Zoom Box | Vertical Align
			zoomBoxVerticalAlign();
			
		});
	/* ---------------------------------------------------------------------------
	 * Zoom Box | Vertical Align
	 * --------------------------------------------------------------------------- */
	function zoomBoxVerticalAlign(){
		jQuery('body:not(.style-simple) .zoom_box').each(function(){
			
            var el = jQuery(this);
            var elH = el.height(); 
            var desc = el.find('.desc_wrap');
            var descH = desc.height(); 
            
            var padding = ( elH - descH ) / 2;
            
            desc.css( 'padding-top', padding +'px' );

        });
	}
	zoomBoxVerticalAlign();
		
			/* ---------------------------------------------------------------------------
		 * Iframe height
		 * --------------------------------------------------------------------------- */		
		function iframeHeight( item, ratio ){
			var itemW = item.width();
			var itemH = itemW * ratio;
			if( itemH < 147 ) itemH = 147;
			item.height(itemH);
		}
		
		function iframesHeight(){
			iframeHeight(jQuery(".blog_wrapper .post-photo-wrapper .mfn-jplayer, .blog_wrapper .post-photo-wrapper iframe, .post-related .mfn-jplayer, .post-related iframe, .blog_slider_ul .mfn-jplayer, .blog_slider_ul iframe"), 0.78);	// blog - list			
			iframeHeight(jQuery(".single-post .single-photo-wrapper .mfn-jplayer, .single-post .single-photo-wrapper iframe" ), 0.4);	// blog - single
			
			iframeHeight(jQuery(".section-portfolio-header .mfn-jplayer, .section-portfolio-header iframe" ), 0.4);	// portfolio - single
		}
		iframesHeight();
		
	
    /* ---------------------------------------------------------------------------
	 * Sticky header
	 * --------------------------------------------------------------------------- */
    var topBarTop = '61px';
    var mfn_header_height = 0;
    
    // header height
    function mfn_stickyH(){
    	if( jQuery('body').hasClass('header-below') ){
	    	// header below slider
	    	mfn_header_height = jQuery('.mfn-main-slider').innerHeight() + jQuery('#Header').innerHeight();
	    } else {
	    	// default
	    	mfn_header_height = jQuery('#Top_bar').innerHeight() + jQuery('#Action_bar').innerHeight();
	    }
    }
    
    // init
	function mfn_sticky(){
		if( jQuery('body').hasClass('sticky-header') ){	
			var start_y = mfn_header_height;
			var window_y = jQuery(window).scrollTop();
	
			if( window_y > start_y ){
				if( ! (jQuery('#Top_bar').hasClass('is-sticky'))){
					
					jQuery('.header-classic .header_placeholder').css('height', jQuery('#Top_bar').innerHeight() - jQuery('#Action_bar').innerHeight());
					jQuery('.header-stack   .header_placeholder').css('height', 71);
					jQuery('.header-below   .header_placeholder').css('height', jQuery('#Top_bar').innerHeight());
					jQuery('.minimalist-header .header_placeholder').css('height', jQuery('#Top_bar').innerHeight());
					
					jQuery('#Top_bar')
						.addClass('is-sticky')
						.css('top',-60)
						.animate({
							'top': jQuery('#wpadminbar').innerHeight()
						},300);
				}
			}
			else {
				if(jQuery('#Top_bar').hasClass('is-sticky')) {
					jQuery('.header_placeholder').css('height',0);
					jQuery('#Top_bar')
						.removeClass('is-sticky')
						.css('top', topBarTop);
				}	
			}
		}
	}
	
	
	/* ---------------------------------------------------------------------------
	 * Sidebar height
	 * --------------------------------------------------------------------------- */
	function mfn_sidebar(){
		if( jQuery('.with_aside .four.columns').length ){
			var maxH = jQuery('#Content .sections_group').height() - 20
			jQuery('.with_aside .four.columns .widget-area').each(function(){
				jQuery(this).css( 'min-height', 0 );
				if( jQuery(this).height() > maxH ){
					maxH = jQuery(this).height();
				}
			});
			jQuery('.with_aside .four.columns .widget-area').css( 'min-height', maxH + 'px' );
		}
	}
	
	
		/* ---------------------------------------------------------------------------
		 * Overlay menu
		 * --------------------------------------------------------------------------- */
		jQuery('.overlay-menu-toggle').click(function(e){
			e.preventDefault();
			
			jQuery(this).toggleClass('focus');
			jQuery('#Overlay').stop(true,true).fadeToggle(500);
			
			var menuH = jQuery('#Overlay nav').height() / 2;
			jQuery('#Overlay nav').css( 'margin-top', '-' + menuH + 'px' );	
		});
		
	/* ---------------------------------------------------------------------------
	 * Sliding Footer | Height
	 * --------------------------------------------------------------------------- */
	function mfn_footer(){
		if( jQuery('.footer-fixed #Footer, .footer-sliding #Footer').length ){
			var footerH = jQuery('#Footer').height();
			jQuery('#Content').css( 'margin-bottom', footerH + 'px' );
		}
	}
	
	
	/* ---------------------------------------------------------------------------
	 * Header width
	 * --------------------------------------------------------------------------- */
	function mfn_header(){
		var rightW = jQuery('.top_bar_right').innerWidth();
		var parentW = jQuery('#Top_bar .one').innerWidth() - 10;
		var leftW = parentW - rightW;
		jQuery('.top_bar_left, .menu > li > ul.mfn-megamenu ').width( leftW );
	}
	
	
	/* ---------------------------------------------------------------------------
	 * Full Screen Section
	 * --------------------------------------------------------------------------- */
	function mfn_sectionH(){
		var windowH = jQuery(window).height();
		jQuery('.section.full-screen').each(function(){
			var section = jQuery(this);
			var wrapper = jQuery('.section_wrapper',section);
			section
				.css('padding', 0)
				.height( windowH );
			var padding = ( windowH - wrapper.height() ) / 2;
			wrapper.css('padding-top', padding + 20);			// 20 = column margin-bottom / 2
		});
	}
	
	
	/* ---------------------------------------------------------------------------
	 * # Hash smooth navigation
	 * --------------------------------------------------------------------------- */
	function hashNav(){
		
		// # window.location.hash
		var hash = window.location.hash;
		
		if( hash && jQuery(hash).length ){	
			
			var stickyH = jQuery('.sticky-header #Top_bar').innerHeight();
			var tabsHeaderH = jQuery(hash).siblings('.ui-tabs-nav').innerHeight();
			
			jQuery('html, body').animate({ 
				scrollTop: jQuery(hash).offset().top - stickyH - tabsHeaderH
			}, 500);
		}
	}
	
	
	/* ---------------------------------------------------------------------------
	 * One Page | Scroll Active
	 * --------------------------------------------------------------------------- */
	function onePageActive(){
		if( jQuery('body').hasClass('one-page') ){
			
			var stickyH = jQuery('.sticky-header #Top_bar').innerHeight();
	
			var winTop = jQuery(window).scrollTop();
			var offset = stickyH + 1; // offset top
	
	        var visible = jQuery('[data-id]').filter(function(ndx, div){
	            return winTop >= jQuery(div).offset().top - offset &&
	            winTop < jQuery(div).offset().top - offset + jQuery(div).outerHeight()
	        });
	        
	        var newActive = visible.first().attr('id');        
	        var active = '[data-hash="#'+ newActive +'"]';
	        
	        if( newActive ){
		        var menu = jQuery('#menu');
		        menu.find('li').removeClass('current-menu-item currenet-menu-parent current-menu-ancestor current_page_item current_page_parent current_page_ancestor');
		        jQuery( active, menu ).closest('li').addClass('current-menu-item');
	        }
	        
		}
	}
	
	
	/* ---------------------------------------------------------------------------
	 * niceScroll | Padding right fix for short content
	 * --------------------------------------------------------------------------- */
	function niceScrollFix(){ 
		var el = jQuery('body > .nicescroll-rails');
		if( el.length ){
			if( el.is(":visible") ){
				jQuery('body').addClass('nice-scroll');
			} else {
				jQuery('body').removeClass('nice-scroll');
			}
		}
	}

	
	/* --------------------------------------------------------------------------------------------------------------------------
	 * jQuery(document).ready
	 * ----------------------------------------------------------------------------------------------------------------------- */
	jQuery(document).ready(function(){
	
		topBarTop = parseInt(jQuery('#Top_bar').css('top'), 10);
		if( topBarTop < 0 ) topBarTop = 61;
		topBarTop = topBarTop + 'px';

		
		
		/* ---------------------------------------------------------------------------
		 * TwentyTwenty [ before_after ]
		 * --------------------------------------------------------------------------- */
		jQuery('.before_after.twentytwenty-container').twentytwenty();	
		

		/* ---------------------------------------------------------------------------
		 * Content sliders
		 * --------------------------------------------------------------------------- */
		mfnSliderContent();
		mfnSliderOffer();
		mfnSliderOfferThumb();
		mfnSliderBlog();
		mfnSliderClients();
		mfnSliderPortfolio();
		mfnSliderShop();
		mfnSliderTestimonials();
		
		
		/* ---------------------------------------------------------------------------
		 * Responsive menu
		 * --------------------------------------------------------------------------- */
		jQuery('.responsive-menu-toggle').click(function(e){
			e.preventDefault();
			var el = jQuery(this)
			var menu = jQuery('#Top_bar #menu');
			var menuWrap = menu.closest('.menu_wrapper');
			el.toggleClass('active');
			
			if( el.hasClass('is-sticky') && el.hasClass('active') ){
				var top = 0;
				if( menuWrap.length ) top = menuWrap.offset().top;
				jQuery('body,html').animate({
					scrollTop: top
				}, 200);
			}

			menu.stop(true,true).slideToggle(200);
		});
		
		
		/* ---------------------------------------------------------------------------
		 * Main menu
		 * --------------------------------------------------------------------------- */
		
		// Muffin Menu -------------------------------
		jQuery("#menu > ul.menu").muffingroup_menu({
			arrows	: true
		});
		
		jQuery("#secondary-menu > ul.secondary-menu").muffingroup_menu();
		
		mfn_stickyH()
		mfn_sticky();

		
		/* ---------------------------------------------------------------------------
		 * Menu | OnePage - remove active
		 * Works with .scroll class
		 * Since 4.8 replaced with admin option: Page Options / One Page [function: onePageMenu()]
		 * --------------------------------------------------------------------------- */
		function onePageScroll(){
			if( ! jQuery('body').hasClass('one-page') ){
				var menu = jQuery('#menu');
				
				if( menu.find('li.scroll').length > 1 ){
					menu.find('li.current-menu-item:not(:first)').removeClass('current-menu-item currenet-menu-parent current-menu-ancestor current_page_item current_page_parent current_page_ancestor');
					
					// menu item click
					menu.find('a').click(function(){
						jQuery(this).closest('li').siblings('li').removeClass('current-menu-item currenet-menu-parent current-menu-ancestor current_page_item current_page_parent current_page_ancestor');
						jQuery(this).closest('li').addClass('current-menu-item');
					});
				}
			}
		}
		onePageScroll();
		
		
		/* ---------------------------------------------------------------------------
		 * One Page | Menu with Active on Scroll
		 * --------------------------------------------------------------------------- */
		function onePageMenu(){
			if( jQuery('body').hasClass('one-page') ){
				
				var menu = jQuery('#menu');
				
				// remove active
				menu.find('li').removeClass('current-menu-item currenet-menu-parent current-menu-ancestor current_page_item current_page_parent current_page_ancestor');

				// add attr [data-hash]
				jQuery('a[href]', menu).each(function(){	

					// data-hash
					var url = jQuery(this).attr('href');
					var hash = '#' + url.split('#')[1];
					if( hash && jQuery(hash).length ){	// check if element with specified ID exists
						jQuery(this).attr('data-hash',hash);
						jQuery(hash).attr('data-id',hash);
					}
					
				});
				
				// click
				jQuery('#menu a[data-hash]').click(function(e){
					e.preventDefault(); // only with: body.one-page
					
					// active
					menu.find('li').removeClass('current-menu-item');
					jQuery(this).closest('li').addClass('current-menu-item');
	
					var hash = jQuery(this).attr('data-hash');
					var stickyH = 0;
					var tabsHeaderH = jQuery(hash).siblings('.ui-tabs-nav').innerHeight();

					// FIX | sticky top bar height
					var topBar = jQuery('.sticky-header #Top_bar');
					if( topBar.hasClass('is-sticky') ){
						stickyH = jQuery('.sticky-header #Top_bar').innerHeight();
					} else {
						topBar.addClass('is-sticky');
						stickyH = jQuery('.sticky-header #Top_bar').innerHeight();
						topBar.removeClass('is-sticky');
					}	

					// FIX | responsive 
					var responsive = jQuery('.responsive-menu-toggle');
					if( responsive.length ){
						if( responsive.is(":visible") ){
							stickyH = 0;
						}
					}

					jQuery('html, body').animate({ 
						scrollTop: jQuery(hash).offset().top - stickyH - tabsHeaderH
					}, 500);
					
				});
				
			}
		};
		onePageMenu();

		
			
		/* ---------------------------------------------------------------------------
		 * Creative Header
		 * --------------------------------------------------------------------------- */
		var cHeader 	= 'body:not(.header-open) #Header_creative';
		var cHeaderEl 	= $( cHeader );
		var cHeaderCurrnet;
		
		function creativeHeader(){
			
			$('.creative-menu-toggle').click(function(e){
				e.preventDefault();
				
				cHeaderEl.addClass('active')
				
				if( $('body').hasClass('header-rtl') ){
					cHeaderEl.animate({ 'right':-1 }, 500);
				} else {
					cHeaderEl.animate({ 'left':-1 }, 500);
				}
				
				
				cHeaderEl.find('.creative-wrapper').fadeIn(500);
				cHeaderEl.find('.creative-menu-toggle, .creative-social').fadeOut(500);
			});
		
		}
		creativeHeader();
		
		$(document).on('mouseenter', cHeader, function() {
			cHeaderCurrnet = 1;
		})
		
		$(document).on('mouseleave', cHeader, function() {
			cHeaderCurrnet = null;
		    setTimeout(function(){
		    	if ( ! cHeaderCurrnet ){
		    		
		    		cHeaderEl.removeClass('active');

		    		if( $('body').hasClass('header-rtl') ){
						cHeaderEl.animate({ 'right':-200 }, 500);
					} else {
						cHeaderEl.animate({ 'left':-200 }, 500);
					}
		    		
		    		cHeaderEl.find('.creative-wrapper').fadeOut(500);
		    		cHeaderEl.find('.creative-menu-toggle, .creative-social').fadeIn(500);
		    	}
		    }, 1000);
		});


		
		/* ---------------------------------------------------------------------------
		 * Maintenance
		 * --------------------------------------------------------------------------- */
        jQuery('.downcount').each(function(){
            var el = jQuery(this);
           	el.downCount({
    			date	: el.attr('data-date'),
    			offset	: el.attr('data-offset')
    		});  
        }); 
        
        
        /* ---------------------------------------------------------------------------
         * Tooltip Image
         * --------------------------------------------------------------------------- */
        jQuery('.tooltip-img').hover(function(){
        	 jQuery('.tooltip-content').stop(true,true).show();
        },function(){
        	jQuery('.tooltip-content').stop(true,true).hide();
        });

        
        /* ---------------------------------------------------------------------------
		 * Popup Contact
		 * --------------------------------------------------------------------------- */
		jQuery("#popup_contact > a.button").click(function(e){
			e.preventDefault();
			jQuery(this).parent().toggleClass('focus');
		});
		

        /* ---------------------------------------------------------------------------
		 * niceScroll
		 * --------------------------------------------------------------------------- */
        if( jQuery('body').hasClass('nice-scroll-on') 
        	&& jQuery(window).width() > 767
        	&& ! navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/))
        {console.log("ceVA");
        	jQuery('html').niceScroll({
        		autohidemode		: false,
        		cursorborder		: 0,
        		cursorborderradius	: 5,
        		cursorcolor			: '#222222',
        		cursorwidth			: 10,
        		horizrailenabled	: false,
        		mousescrollstep		: ( window.mfn_nicescroll ) ? window.mfn_nicescroll : 40,
        		scrollspeed			: 60
        	});
        	
        	jQuery('body').removeClass('nice-scroll-on').addClass('nice-scroll');
        	niceScrollFix();
	    }

        
        /* ---------------------------------------------------------------------------
		 * WP Gallery
		 * --------------------------------------------------------------------------- */
		jQuery('.gallery-icon > a')
			.wrap('<div class="image_frame scale-with-grid"><div class="image_wrapper"></div></div>')
			.prepend('<div class="mask"></div>')
			.attr('rel', 'prettyphoto[gallery]')
			.attr('data-rel', 'prettyphoto[gallery]')
			.children('img' )
				.css('height', 'auto')
				.css('width', '100%');
		

		/* ---------------------------------------------------------------------------
		 * PrettyPhoto
		 * --------------------------------------------------------------------------- */

		if( ( typeof(window.mfn_prettyphoto) !== 'undefined' && ! window.mfn_prettyphoto.disable )  ){
			jQuery('a[rel^="prettyphoto"],a.woocommerce-main-image.zoom, .prettyphoto, a[data-rel^="prettyPhoto[product-gallery]"]').prettyPhoto({
				default_width	: window.mfn_prettyphoto.width ? window.mfn_prettyphoto.width : 500,
				default_height	: window.mfn_prettyphoto.height ? window.mfn_prettyphoto.height : 344,
				show_title		: false,
				deeplinking		: false,
				social_tools	: false
			});
		}
		
        
		/* ---------------------------------------------------------------------------
		 * Black & White
		 * --------------------------------------------------------------------------- */
        jQuery('.greyscale .image_wrapper > a, .greyscale .client_wrapper .gs-wrapper, .greyscale.portfolio-photo a').has('img').BlackAndWhite({
    		hoverEffect		: true,
    		intensity		: 1			// opacity: 0, 0.1, ... 1
    	});
		

		/* ---------------------------------------------------------------------------
		 * Sliding Top
		 * --------------------------------------------------------------------------- */
		jQuery(".sliding-top-control").click(function(e){
			e.preventDefault();
			jQuery('#Sliding-top .widgets_wrapper').slideToggle();
			jQuery('#Sliding-top').toggleClass('active');
		});
		
		
		/* ---------------------------------------------------------------------------
		 * Header Search
		 * --------------------------------------------------------------------------- */
		jQuery("#search_button, #Top_bar .icon_close").click(function(e){
			e.preventDefault();
			jQuery('#Top_bar .search_wrapper').fadeToggle();
		});
	
		
		/* ---------------------------------------------------------------------------
		 * Alert
		 * --------------------------------------------------------------------------- */
		jQuery('.alert .close').click(function(e){
			e.preventDefault();
			jQuery(this).closest('.alert').hide(300);
		});
		
		
		/* ---------------------------------------------------------------------------
		 * Buttons - mark Buttons with Icon & Label
		 * --------------------------------------------------------------------------- */
		jQuery('a.button_js').each(function(){
			var btn = jQuery(this);
			if( btn.find('.button_icon').length && btn.find('.button_label').length ){
				btn.addClass('kill_the_icon');
			}
		});
		
		
		/* ---------------------------------------------------------------------------
		 * Posts sticky navigation
		 * --------------------------------------------------------------------------- */
		jQuery('.fixed-nav').appendTo('body');
		
		
		/* ---------------------------------------------------------------------------
		 * Feature List
		 * --------------------------------------------------------------------------- */
		jQuery('.feature_list ul li:nth-child(4n):not(:last-child)').after('<hr />');
		
		
		/* ---------------------------------------------------------------------------
		 * IE fixes
		 * --------------------------------------------------------------------------- */
		function checkIE(){
			// IE 9
			var ua = window.navigator.userAgent;
	        var msie = ua.indexOf("MSIE ");
	        if( msie > 0 && parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 9 ){
	        	jQuery("body").addClass("ie");
			}
		}
		checkIE();
		
		
		/* ---------------------------------------------------------------------------
		 * Paralex Backgrounds
		 * --------------------------------------------------------------------------- */
		var ua = navigator.userAgent,
		isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);
		if( ! isMobileWebkit && jQuery(window).width() >= 768 ){
			$.stellar({
				horizontalScrolling	: false,
				responsive			: true
			});
		}
		
		
		/* ---------------------------------------------------------------------------
		 * Ajax | Load More
		 * --------------------------------------------------------------------------- */
		jQuery('.pager_load_more').click(function(e){
			e.preventDefault();
			
			var el = jQuery(this);
			var pager = el.closest('.pager_lm');
			var href = el.attr('href');
			
			// index | for many items on the page
			var index = jQuery('.lm_wrapper').index(el.closest('.isotope_wrapper').find('.lm_wrapper'));

			el.fadeOut(50);
			pager.addClass('loading');
			
			$.get( href, function(data){

				// content
				var content = jQuery('.lm_wrapper:eq('+ index +')', data).wrapInner('').html();

				if( jQuery('.lm_wrapper:eq('+ index +')').hasClass('isotope') ){
					// isotope
					jQuery('.lm_wrapper:eq('+ index +')').append( jQuery(content) ).isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });
				} else {
					// default
					jQuery( content ).hide().appendTo('.lm_wrapper:eq('+ index +')').fadeIn(1000);
				}
				
				// next page link
				href = jQuery( '.pager_load_more:eq('+ index +')', data ).attr('href');		
				pager.removeClass('loading');					
				if( href ){
					el.fadeIn();
					el.attr( 'href', href );
				}

				// refresh some staff -------------------------------
				mfn_jPlayer();
				iframesHeight();	
				mfn_sidebar();
				
				// isotope fix: second resize
				setTimeout(function(){
					jQuery('.lm_wrapper.isotope').isotope( 'reLayout');
				},1000);				
				
			});

		});
	
		
		/* ---------------------------------------------------------------------------
		 * Blog & Portfolio filters
		 * --------------------------------------------------------------------------- */
		jQuery('.filters_buttons .open').click(function(e){
			e.preventDefault();
			var type = jQuery(this).closest('li').attr('class');
			jQuery('.filters_wrapper').show(200);
			jQuery('.filters_wrapper ul.'+ type).show(200);
			jQuery('.filters_wrapper ul:not(.'+ type +')').hide();
		});
		
		jQuery('.filters_wrapper .close a').click(function(e){
			e.preventDefault();
			jQuery('.filters_wrapper').hide(200);
		});
		
		
		/* ---------------------------------------------------------------------------
		 * Portfolio List - next/prev buttons
		 * --------------------------------------------------------------------------- */
		jQuery('.portfolio_next_js').click(function(e){
			e.preventDefault();
			
			var stickyH = jQuery('#Top_bar.is-sticky').innerHeight();
			var item = jQuery(this).closest('.portfolio-item').next();
			
			if( item.length ){
				jQuery('html, body').animate({ 
					scrollTop: item.offset().top - stickyH
				}, 500);
			}
		});
		
		jQuery('.portfolio_prev_js').click(function(e){
			e.preventDefault();
			
			var stickyH = jQuery('#Top_bar.is-sticky').innerHeight();
			var item = jQuery(this).closest('.portfolio-item').prev();
			
			if( item.length ){
				jQuery('html, body').animate({ 
					scrollTop: item.offset().top - stickyH
				}, 500);
			}
		});
		
		
		/* ---------------------------------------------------------------------------
		 * Tabs
		 * --------------------------------------------------------------------------- */

		if(typeof(tabs) !== 'undefined'){
		jQuery(".jq-tabs").tabs();
		}

		
		/* ---------------------------------------------------------------------------
		 * Smooth scroll
		 * --------------------------------------------------------------------------- */
		jQuery('li.scroll > a, a.scroll').click(function(){
			var url = jQuery(this).attr('href');
			var hash = '#' + url.split('#')[1];
			
			var stickyH = jQuery('.sticky-header #Top_bar').innerHeight();
			var tabsHeaderH = jQuery(hash).siblings('.ui-tabs-nav').innerHeight();
			
			if( hash && jQuery(hash).length ){
				jQuery('html, body').animate({ 
					scrollTop: jQuery(hash).offset().top - stickyH - tabsHeaderH
				}, 500);
			}
		});

		
		/* ---------------------------------------------------------------------------
		 * Muffin Accordion & FAQ
		 * --------------------------------------------------------------------------- */
		jQuery('.mfn-acc').each(function(){
			var el = jQuery(this);
			
			if( el.hasClass('openAll') ){
				// show all -----------
				
				el.find('.question')
					.addClass("active")
					.children(".answer")
						.show();
				
			} else {
				// show one -----------
				
				var active_tab = el.attr('data-active-tab');
				if( el.hasClass('open1st') ) active_tab = 1;
				
				if( active_tab ){
					el.find('.question').eq( active_tab - 1 )
						.addClass("active")
						.children(".answer")
							.show();
				}
				
			}	
		});

		jQuery(".mfn-acc .question > .title").click(function(){		
			if(jQuery(this).parent().hasClass("active")) {
				jQuery(this).parent().removeClass("active").children(".answer").slideToggle(200);
			}
			else
			{
				if( ! jQuery(this).closest('.mfn-acc').hasClass('toggle') ){
					jQuery(this).parents(".mfn-acc").children().each(function() {
						if(jQuery(this).hasClass("active")) {
							jQuery(this).removeClass("active").children(".answer").slideToggle(200);
						}
					});
				}
				jQuery(this).parent().addClass("active");
				jQuery(this).next(".answer").slideToggle(200);
			}
		});

		
		/* ---------------------------------------------------------------------------
		 * jPlayer
		 * --------------------------------------------------------------------------- */
		function mfn_jPlayer(){
			jQuery('.mfn-jplayer').each(function(){
				var m4v = jQuery(this).attr('data-m4v');
				var poster = jQuery(this).attr('data-img');
				var swfPath = jQuery(this).attr('data-swf');
				var cssSelectorAncestor = '#' + jQuery(this).closest('.mfn-jcontainer').attr('id');
				
				jQuery(this).jPlayer({
					ready	: function () {
						jQuery(this).jPlayer('setMedia', {
							m4v		: m4v,
							poster	: poster
						});
					},
					play	: function () { // To avoid both jPlayers playing together.
						jQuery(this).jPlayer('pauseOthers');
					},
					size: {
						cssClass	: 'jp-video-360p',
						width		: '100%',
						height		: '360px'
					},
					swfPath				: swfPath,
					supplied			: 'm4v',
					cssSelectorAncestor	: cssSelectorAncestor,
					wmode				: 'opaque'
				});
			});
		}
		mfn_jPlayer();
		
		
		/* ---------------------------------------------------------------------------
		 * Love
		 * --------------------------------------------------------------------------- */
		/*jQuery('.mfn-love').click(function() {
			var el = jQuery(this);
			if( el.hasClass('loved') ) return false;
			
			var post = {
				action: 'mfn_love',
				post_id: el.attr('data-id')
			};
			
			$.post(window.mfn_ajax, post, function(data){
				el.find('.label').html(data);
				el.addClass('loved');
			});

			return false;
		});	*/
		
		
		/* ---------------------------------------------------------------------------
		 * Go to top
		 * --------------------------------------------------------------------------- */	
		jQuery('#back_to_top').click(function(){
			jQuery('body,html').animate({
				scrollTop: 0
			}, 500);
			return false;
		});		
		
		
		/* ---------------------------------------------------------------------------
		 * Section navigation
		 * --------------------------------------------------------------------------- */	
		jQuery('.section .section-nav').click(function(){
			var el = jQuery(this);
			var section = el.closest('.section');

			if( el.hasClass('prev') ){
				// Previous Section -------------
				if( section.prev().length ){	
					jQuery('html, body').animate({
						scrollTop: section.prev().offset().top
					}, 500);
				}
			} else {
				// Next Section -----------------
				if( section.next().length ){	
					jQuery('html, body').animate({
						scrollTop: section.next().offset().top
					}, 500);
				}			
			}
		});
		
		
		/* ---------------------------------------------------------------------------
		 * WooCommerce
		 * --------------------------------------------------------------------------- */	
		function addToCart(){
			jQuery('body').on('click', '.add_to_cart_button', function(){
				jQuery(this)
					.closest('.product')
						.addClass('adding-to-cart')
						.removeClass('added-to-cart');
			});

			jQuery('body').bind('added_to_cart', function() {
				jQuery('.adding-to-cart')
					.removeClass('adding-to-cart')
					.addClass('added-to-cart');
			});
		}
		addToCart();
		
		
		/* ---------------------------------------------------------------------------
		 * Iframe height
		 * --------------------------------------------------------------------------- */		
		function iframeHeight( item, ratio ){
			var itemW = item.width();
			var itemH = itemW * ratio;
			if( itemH < 147 ) itemH = 147;
			item.height(itemH);
		}
		
		function iframesHeight(){
			iframeHeight(jQuery(".blog_wrapper .post-photo-wrapper .mfn-jplayer, .blog_wrapper .post-photo-wrapper iframe, .post-related .mfn-jplayer, .post-related iframe, .blog_slider_ul .mfn-jplayer, .blog_slider_ul iframe"), 0.78);	// blog - list			
			iframeHeight(jQuery(".single-post .single-photo-wrapper .mfn-jplayer, .single-post .single-photo-wrapper iframe" ), 0.4);	// blog - single
			
			iframeHeight(jQuery(".section-portfolio-header .mfn-jplayer, .section-portfolio-header iframe" ), 0.4);	// portfolio - single
		}
		iframesHeight();

		
		/* ---------------------------------------------------------------------------
		 * Debouncedresize
		 * --------------------------------------------------------------------------- */
		jQuery(window).bind("debouncedresize", function() {
			
			iframesHeight();	
			jQuery('.masonry.isotope,.isotope').isotope();
			
			// carouFredSel wrapper Height set
			mfn_carouFredSel_height();
			
			// Sidebar Height
			mfn_sidebar();
			
			// Sliding Footer | Height
			mfn_footer();
			
			// Header Width
			mfn_header();
			
			// Full Screen Section
			mfn_sectionH();
			
			// niceScroll | Padding right fix for short content
			niceScrollFix();
		});
		
		/* ---------------------------------------------------------------------------
		 * isotope
		 * --------------------------------------------------------------------------- 
		function isotopeFilter( domEl, isoWrapper ){
			var filter = domEl.attr('data-rel');
			isoWrapper.isotope({ filter: filter });
		}
		
		jQuery('.isotope-filters .filters_wrapper').find('li:not(.close) a').click(function(e){
			e.preventDefault();
			isotopeFilter( jQuery(this), jQuery('.isotope') );
		});
		jQuery('.isotope-filters .filters_buttons').find('li.reset a').click(function(e){
			e.preventDefault();
			isotopeFilter( jQuery(this), jQuery('.isotope') );
		});
		
		// carouFredSel wrapper | Height
		mfn_carouFredSel_height();
		
		// Sidebar | Height
		mfn_sidebar();
		
		// Sliding Footer | Height
		mfn_footer();
		
		// Header | Width
		mfn_header();

		// Full Screen Section
		mfn_sectionH();
		
		// Navigation | Hash
		hashNav();
	});
	*/
	
		/* ---------------------------------------------------------------------------
		 * Isotope
		 * --------------------------------------------------------------------------- */
		
		// Isotope | Fiters
		function isotopeFilter( domEl, isoWrapper ){
			var filter = domEl.attr('data-rel');
			isoWrapper.isotope({ filter: filter });
		}
		
		// Isotope | Fiters | Click
		$('.isotope-filters .filters_wrapper').find('li:not(.close) a').click(function(e){
			e.preventDefault();

			var filters = $(this).closest('.isotope-filters');
			var parent  = filters.attr('data-parent');
			
			if( parent ){
				parent = filters.closest( '.' + parent );
				var isoWrapper = parent.find('.isotope').first()
			} else {
				var isoWrapper = $('.isotope');
			}
			
			filters.find('li').removeClass('current-cat');
			$(this).closest('li').addClass('current-cat');

			isotopeFilter( $(this), isoWrapper );
		});

		
		// Isotope | Fiters | Reset
		$('.isotope-filters .filters_buttons').find('li.reset a').click(function(e){
			e.preventDefault();
			
			$('.isotope-filters .filters_wrapper').find('li').removeClass('current-cat');
			isotopeFilter( $(this), $('.isotope') );
		});
		
		
		// carouFredSel wrapper | Height
		mfn_carouFredSel_height();
		
		// Sidebar | Height
		mfn_sidebar();
		
		// Sliding Footer | Height
		mfn_footer();
		
		// Header | Width
		mfn_header();

		// Full Screen Section
		mfn_sectionH();
		
		// Navigation | Hash
		hashNav();
		
		// Equal Columns | Height
		//mfn_equalH();
	});
	
	/* --------------------------------------------------------------------------------------------------------------------------
	 * jQuery(window).scroll
	 * ----------------------------------------------------------------------------------------------------------------------- */
	jQuery(window).scroll(function(){
		
			mfn_stickyH();

		mfn_sticky();
		onePageActive();
	});
	
	
	/* --------------------------------------------------------------------------------------------------------------------------
	 * jQuery(window).load
	 * ----------------------------------------------------------------------------------------------------------------------- */
	jQuery(window).load(function(){
		
		

		/* ---------------------------------------------------------------------------
		 * Isotope
		 * --------------------------------------------------------------------------- */
		// Portfolio - Isotope
		jQuery('.portfolio_wrapper  .isotope:not(.masonry-flat)').isotope({
			itemSelector	: '.portfolio-item',
			layoutMode		: 'fitRows'
		});
		
		// Portfolio - Masonry Flat
		jQuery('.portfolio_wrapper .masonry-flat').isotope({
			itemSelector	: '.portfolio-item',
			masonry			: {
			      columnWidth: 1
		    }
		});

		// Blog & Portfolio - Masonry
		jQuery('.masonry.isotope').isotope({
			itemSelector	: '.isotope-item',
			layoutMode		: 'masonry'
		});

		
		/* ---------------------------------------------------------------------------
		 * Chart
		 * --------------------------------------------------------------------------- */
		jQuery('.chart').waypoint({
			offset		: '100%',
			triggerOnce	: true,
			handler		: function(){
				var color = jQuery(this).attr('data-color');
				jQuery(this).easyPieChart({
					animate		: 1000,
					barColor	: color,
					lineCap		: 'circle',
					lineWidth	: 8,
					size		: 140,
					scaleColor	: false,
					trackColor	: '#f8f8f8'
				});
			}
		});
		
		
		/* ---------------------------------------------------------------------------
		 * Skills
		 * --------------------------------------------------------------------------- */
		jQuery('.bars_list').waypoint({
			offset		: '100%',
			triggerOnce	: true,
			handler		: function(){
				jQuery(this).addClass('hover');
			}
		});
		
		
		/* ---------------------------------------------------------------------------
		 * Progress Icons
		 * --------------------------------------------------------------------------- */
		jQuery('.progress_icons').waypoint({
			offset		: '100%',
			triggerOnce	: true,
			handler		: function(){
				
				var el = jQuery(this);
				var active = el.attr('data-active');
				var color = el.attr('data-color');
				var icon = el.find('.progress_icon');
				var timeout = 200;		// timeout in milliseconds
				
				icon.each(function(i){
					if( i < active ){
						var time = (i+1) * timeout; 
						setTimeout(function(){
							jQuery(icon[i])
								.addClass('themebg')
								.css('background-color',color);
						},time );	
						
					}
				});
				
			}
		});
		
		
		/* ---------------------------------------------------------------------------
		 * Animate Math [counter, quick_fact, etc.]
		 * --------------------------------------------------------------------------- */
		jQuery('.animate-math .number').waypoint({
			offset		: '100%',
			triggerOnce	: true,
			handler		: function(){
				var el			= jQuery(this);
				var duration	= Math.floor((Math.random()*1000)+1000);
				var to			= el.attr('data-to');

				jQuery({property:0}).animate({property:to}, {
					duration	: duration,
					easing		:'linear',
					step		: function() {
						el.text(Math.floor(this.property));
					},
					complete	: function() {
						el.text(this.property);
					}
				});
			}
		});
		
		
		// carouFredSel wrapper | Height
		mfn_carouFredSel_height();
		
		// Sidebar | Height
		mfn_sidebar();
		
		// Sliding Footer | Height
		mfn_footer();
		
		// Header | Width
		mfn_header();

		// Full Screen Section
		mfn_sectionH();
		
		// Navigation | Hash
		hashNav();
		
		// niceScroll | Padding right fix for short content
		niceScrollFix();
	});
	

	/* --------------------------------------------------------------------------------------------------------------------------
	 * jQuery(document).mouseup
	 * ----------------------------------------------------------------------------------------------------------------------- */
	jQuery(document).mouseup(function(e){
		
		// search
		if( jQuery("#searchform").has(e.target).length === 0 ){
			if( jQuery("#searchform").hasClass('focus') ){
				jQuery(this).find('.icon_close').click();
			}
		}
		
	});
	
	
	/* ---------------------------------------------------------------------------
	 * Sliders configuration
	 * --------------------------------------------------------------------------- */
	
	// carouFredSel wrapper Height set -------------------------------------------
	function mfn_carouFredSel_height(){
		jQuery('.caroufredsel_wrapper > ul').each(function(){
			var el = jQuery(this);
			var maxH = 0;
			el.children('li').each(function(){				
				if( jQuery(this).innerHeight() > maxH ){
					maxH = jQuery(this).innerHeight();
				}
			});
//			console.log(maxH);
			el.closest('.caroufredsel_wrapper').height( maxH );
		});
		
	}
	
	// --- Slider ----------------------------------------------------------------
function mfnSliderContent(){	
		$('.content_slider_ul').each(function(){

			if( $(this).closest('.content_slider').hasClass('carousel') ){
				var style = { min:1, max:6};
			} else {
				var style = 1;
			}

			// Init carouFredSel
			$( this ).carouFredSel({
				circular	: true,
				responsive	: true,
				items		: {
					width	: 380,
					visible	: style
				},
				scroll		: {
					duration	: 500,
					easing		: 'swing'
				},
				prev        : {
					button		: function(){
						return $(this).closest('.content_slider').find('.slider_prev');
					}
				},
				next        : {
					button		: function(){
						return $(this).closest('.content_slider').find('.slider_next');
					}
				},
				pagination	: {
					container	: function(){
						return $(this).closest('.content_slider').find('.slider_pagination');
					}
				},
				auto		: {
					play			: window.mfn_sliders.slider ? true : false,
					timeoutDuration	: window.mfn_sliders.slider ? window.mfn_sliders.slider : 2500,
				},
				swipe		: {
					onTouch		: true,
					onMouse		: true,
					onBefore	: function(){
						$(this).find('a').addClass('disable');
						$(this).find('li').trigger('mouseleave');
					},
					onAfter		: function(){
						$(this).find('a').removeClass('disable');
					}
				}
			});
			
			// Disable accidental clicks while swiping
			$(this).on('click', 'a.disable', function() {
				return false; 
			});
		});
	}
	
	
	
	// --- Testimonials ----------------------------------------------------------------
	function mfnSliderTestimonials(){	
		$('.testimonials_slider_ul').each(function(){
			
			// Init carouFredSel
			$(this).carouFredSel({
				circular	: true,
				responsive	: true,
				items		: {
					visible	: 1,
					width	: 100
				},
				scroll		: {
					duration	: 500,
					easing		: 'swing'
				},
				prev        : {
					button		: function(){
						return $(this).closest('.testimonials_slider').find('.slider_prev');
					}
				},
				next        : {
					button		: function(){
						return $(this).closest('.testimonials_slider').find('.slider_next');
					}
				},
				pagination	: {
					container	: function(){
						return $(this).closest('.testimonials_slider').find('.slider_pager');
					},
					anchorBuilder : false
				},
				auto		: {
					play			: window.mfn_sliders.testimonials ? true : false,
					timeoutDuration	: window.mfn_sliders.testimonials ? window.mfn_sliders.testimonials : 2500,
				},
				swipe		: {
					onTouch		: true,
					onMouse		: true,
					onBefore	: function(){
						$(this).find('a').addClass('disable');
						$(this).find('li').trigger('mouseleave');
					},
					onAfter		: function(){
						$(this).find('a').removeClass('disable');
					}
				}
			});
			
			// Disable accidental clicks while swiping
			$(this).on('click', 'a.disable', function() {
				return false; 
			});
		});
	}
	
	
	// --- Offer -----------------------------------------------------------------
	function mfnSliderOffer(){	
		jQuery('.offer_ul').each(function(){
			
			// Init carouFredSel
			jQuery(this).carouFredSel({
				circular	: true,
				responsive	: true,
				items		: {
					visible	: 1,
					width	: 100
				},
				scroll		: {
					duration	: 500,
					easing		: 'swing',
					onAfter		: function(){
						jQuery(this).closest('.offer').find('.current').text(jQuery(this).triggerHandler("currentPosition")+1);
					}
				},
				prev        : {
					button		: function(){
						return jQuery(this).closest('.offer').find('.slider_prev');
					}
				},
				next        : {
					button		: function(){
						return jQuery(this).closest('.offer').find('.slider_next');
					}
				},
				auto		: {
					play			: window.mfn_sliders.offer ? true : false,
					timeoutDuration	: window.mfn_sliders.offer ? window.mfn_sliders.offer : 2500,
				},
				swipe		: {
					onTouch		: true,
					onMouse		: true,
					onBefore	: function(){
						jQuery(this).find('a').addClass('disable');
						jQuery(this).find('li').trigger('mouseleave');
					},
					onAfter		: function(){
						jQuery(this).find('a').removeClass('disable');
						jQuery(this).closest('.offer').find('.current').text(jQuery(this).triggerHandler("currentPosition")+1);
					}
				}
			});
			
			// Disable accidental clicks while swiping
			jQuery(this).on('click', 'a.disable', function() {
				return false; 
			});
			
			// Items count
			var count = jQuery(this).children('.offer_li').length;
			jQuery(this).closest('.offer').find('.count').text(count);
		});
	}
	
	
	// --- Offer Thumb -----------------------------------------------------------------
	function mfnSliderOfferThumb_Pager(nr) {
		var thumb = jQuery('.offer_thumb').find('.offer_thumb_li:eq('+ (nr-1) +') .thumbnail img').attr('src');			
	    return '<a href="#'+ nr +'"><img src="'+ thumb +'" alt="'+ nr +'" /></a>';
	}
	
	function mfnSliderOfferThumb(){	
		jQuery('.offer_thumb_ul').each(function(){
			
			// Init carouFredSel
			jQuery(this).carouFredSel({
				circular	: true,
				responsive	: true,
				items		: {
					visible	: 1,
					width	: 100
				},
				pagination	: {
				 	container		: jQuery(this).closest('.offer_thumb').find('.slider_pagination'),
				 	anchorBuilder	: mfnSliderOfferThumb_Pager
				},
				scroll		: {
					duration	: 500,
					easing		: 'swing',
					onAfter		: function(){
						jQuery(this).closest('.offer_thumb').find('.current').text(jQuery(this).triggerHandler("currentPosition")+1);
					}
				},
				auto		: {
					play			: window.mfn_sliders.offer ? true : false,
					timeoutDuration	: window.mfn_sliders.offer ? window.mfn_sliders.offer : 2500,
				},
				swipe		: {
					onTouch		: true,
					onMouse		: true,
					onBefore	: function(){
						jQuery(this).find('a').addClass('disable');
						jQuery(this).find('li').trigger('mouseleave');
					},
					onAfter		: function(){
						jQuery(this).find('a').removeClass('disable');
						jQuery(this).closest('.offer_thumb').find('.current').text(jQuery(this).triggerHandler("currentPosition")+1);
					}
				}
			});
			
			// Disable accidental clicks while swiping
			jQuery(this).on('click', 'a.disable', function() {
				return false; 
			});
		});
	}
	
	
	// --- Blog ------------------------------------------------------------------	
	function mfnSliderBlog(){	
		jQuery('.blog_slider_ul').each(function(){
			
			// Init carouFredSel
			jQuery(this).carouFredSel({
				circular	: true,
				responsive	: true,
				items		: {
					width : 380,
					visible	: {
						min		: 1,
						max		: 4
					}
				},
				scroll		: {
					duration	: 500,
					easing		: 'swing'
				},
				prev        : {
					button		: function(){
						return jQuery(this).closest('.blog_slider').find('.slider_prev');
					}
				},
				next        : {
					button		: function(){
						return jQuery(this).closest('.blog_slider').find('.slider_next');
					}
				},
				pagination	: {
					container	: function(){
						return jQuery(this).closest('.blog_slider').find('.slider_pagination');
					}
				},
				auto		: {
					play			: window.mfn_sliders.blog ? true : false,
					timeoutDuration	: window.mfn_sliders.blog ? window.mfn_sliders.blog : 2500,
				},
				swipe		: {
					onTouch		: true,
					onMouse		: true,
					onBefore	: function(){
						jQuery(this).find('a').addClass('disable');
						jQuery(this).find('li').trigger('mouseleave');
					},
					onAfter		: function(){
						jQuery(this).find('a').removeClass('disable');
					}
				}
			});
			
			// Disable accidental clicks while swiping
			jQuery(this).on('click', 'a.disable', function() {
				return false; 
			});
		});
	}
	
	
	// --- Clients ------------------------------------------------------------------	
	function mfnSliderClients(){	
		jQuery('.clients_slider_ul').each(function(){
			
			// Init carouFredSel
			jQuery(this).carouFredSel({
				circular	: true,
				responsive	: true,
				items		: {
					width : 380,
					visible	: {
						min		: 1,
						max		: 4
					}
				},
				scroll		: {
					duration	: 500,
					easing		: 'swing'
				},
				prev        : {
					button		: function(){
						return jQuery(this).closest('.clients_slider').find('.slider_prev');
					}
				},
				next        : {
					button		: function(){
						return jQuery(this).closest('.clients_slider').find('.slider_next');
					}
				},
				pagination	: {
					container	: function(){
						return jQuery(this).closest('.clients_slider').find('.slider_pagination');
					}
				},
				auto		: {
					play			: window.mfn_sliders.clients ? true : false,
					timeoutDuration	: window.mfn_sliders.clients ? window.mfn_sliders.clients : 2500,
				},
				swipe		: {
					onTouch		: true,
					onMouse		: true,
					onBefore	: function(){
						jQuery(this).find('a').addClass('disable');
						jQuery(this).find('li').trigger('mouseleave');
					},
					onAfter		: function(){
						jQuery(this).find('a').removeClass('disable');
					}
				}
			});
			
			// Disable accidental clicks while swiping
			jQuery(this).on('click', 'a.disable', function() {
				return false; 
			});
		});
	}
	
	
	// --- Shop ------------------------------------------------------------------	
	function mfnSliderShop(){	
		jQuery('.shop_slider_ul').each(function(){
			
			// Init carouFredSel
			jQuery(this).carouFredSel({
				circular	: true,
				responsive	: true,
				items		: {
					width : 380,
					visible	: {
						min		: 1,
						max		: 4
					}
				},
				scroll		: {
					duration	: 500,
					easing		: 'swing'
				},
				prev        : {
					button		: function(){
						return jQuery(this).closest('.shop_slider').find('.slider_prev');
					}
				},
				next        : {
					button		: function(){
						return jQuery(this).closest('.shop_slider').find('.slider_next');
					}
				},
				pagination	: {
					container	: function(){
						return jQuery(this).closest('.shop_slider').find('.slider_pagination');
					}
				},
				auto		: {
					play			: window.mfn_sliders.shop ? true : false,
					timeoutDuration	: window.mfn_sliders.shop ? window.mfn_sliders.shop : 2500,
				},
				swipe		: {
					onTouch		: true,
					onMouse		: true,
					onBefore	: function(){
						jQuery(this).find('a').addClass('disable');
						jQuery(this).find('li').trigger('mouseleave');
					},
					onAfter		: function(){
						jQuery(this).find('a').removeClass('disable');
					}
				}
			});
			
			// Disable accidental clicks while swiping
			jQuery(this).on('click', 'a.disable', function() {
//				return false; 
			});
		});
	}
	
	
	// --- Portfolio -------------------------------------------------------------
	function mfnSliderPortfolio(){	
		jQuery('.portfolio_slider_ul').each(function(){
			
			// Init carouFredSel
			jQuery(this).carouFredSel({
				circular	: true,
				responsive	: true,
				items		: {
					width : 380,
					visible	: {
						min		: 1,
						max		: 5
					}
				},
				scroll		: {
					duration	: 600,
					easing		: 'swing'
				},
				prev        : {
					button		: function(){
						return jQuery(this).closest('.portfolio_slider').find('.slider_prev');
					}
				},
				next        : {
					button		: function(){
						return jQuery(this).closest('.portfolio_slider').find('.slider_next');
					}
				},
				auto		: {
					play			: window.mfn_sliders.portfolio ? true : false,
					timeoutDuration	: window.mfn_sliders.portfolio ? window.mfn_sliders.portfolio : 2500,
				},
				swipe		: {
					onTouch		: true,
					onMouse		: true,
					onBefore	: function(){
						jQuery(this).find('a').addClass('disable');
						jQuery(this).find('li').trigger('mouseleave');
					},
					onAfter		: function(){
						jQuery(this).find('a').removeClass('disable');
					}
				}
			});
			
			// Disable accidental clicks while swiping
			jQuery(this).on('click', 'a.disable', function() {
				return false; 
			});
		});
	}

window.mfn_nicescroll = 25;
			window.mfn_prettyphoto = {
				disable : 0,
				width : 0,
				height : 0
			};
			window.mfn_sliders = {
				blog : 0,
				clients : 0,
				offer : 10000,
				portfolio : 0,
				shop : 0,
				slider : 6000,
				testimonials : 7000
		
		};
	



				jQuery(document).ready(function($) {
					jQuery('.masonry.isotope,.isotope').isotope();
					
					jQuery('#configurator .control').click(function(e) {
						e.preventDefault();
						if (jQuery('#configurator').hasClass('active')) {
							jQuery('#configurator').removeClass('active').animate({
								'right' : -272
							}, 500);
						} else {
							jQuery('#configurator').addClass('active').animate({
								'right' : -1
							}, 500);
						}
					});
					jQuery('#mfn-demo-panel .control').click(function(e) {
						e.preventDefault();
						if (jQuery('#mfn-demo-panel').hasClass('active')) {
							jQuery('#mfn-demo-panel').removeClass('active').animate({
								'right' : -367
							}, 500);
						} else {
							jQuery('#mfn-demo-panel').addClass('active').animate({
								'right' : -1
							}, 500);
						}
					});
	
	demosSliderH();
		/* ---------------------------------------------------------------------------
		 * niceScroll
		 * --------------------------------------------------------------------------- */ 
		jQuery(".demos-slider").niceScroll({
    		autohidemode		: false,
    		cursorborder		: 0,
    		cursorborderradius	: 5,
    		cursorcolor			: '#222222',
    		cursorwidth			: 0,
    		horizrailenabled	: false,
    		mousescrollstep		: 40,
    		scrollspeed			: 60
    	});
		
		
		/* ---------------------------------------------------------------------------
		 * Paralex Backgrounds
		 * --------------------------------------------------------------------------- */
		if (typeof stellar !== 'undefined' && $.isFunction(stellar)) {
		var ua = navigator.userAgent,
		isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);
		
		if( ! isMobileWebkit && jQuery(window).width() >= 768 ){
			
			if( window.mfn_parallax == 'stellar' ){
				
				// Stellar
				jQuery.stellar({
					horizontalScrolling	: false,
					responsive			: true
				});
		
			} else {

				// Enllax
				jQuery(window).enllax();
				
			}

		} else {
			
			jQuery('.section[data-enllax-ratio], .section[data-stellar-ratio]').css( 'background-attachment' , 'scroll' );
		
		}
		}
		
	
		

				});

				
})(jQuery);

 function demosSliderH(){
    	var panel = jQuery('#mfn-demo-panel');
		var panelH = panel.height() - panel.find('.header').height();
		jQuery(".demos-slider").height(panelH);
    }

/**
 * Statement: Just shut the fuck up!In case you hadn’t noticed, I’m a bit of a stickler for terminology.You motherfucker!!!
 * 
 * Describe: The javascript boot file of the announcement page (~/announcement/index.html).
 * 
 * Further changes, comments: ~
 * 
 * Docs: ~
 * 
 * Original Author: Tony ( Shen Weizhong ).
 * 
 * Version: 0.1.0
 * 
 * Creation Date: 2013.10.21 18:09 ( Tony ).
 * 
 * Last update: 2013.10.21 218:09 ( Tony ).
 * 
 * License: ~
 * 
 * Copyright: ~
 */

(function (window, document, requirejs, require) {
	
	'use strict';
	
	var boot = boot || {};
	
	boot.getAgent = function () {
		
		return navigator.userAgent.toLowerCase();
		
	};
	
	boot.isIE = function(userAgent) {
		
		var agent = userAgent || this.getAgent();
		
		return !!agent.match(/msie/i);
		
	};
	
	boot.isGteIE9 = function(userAgent) {
		
		var agent = userAgent || this.getAgent(),
			
			match = agent.match(/msie\D*([\.\d]*)/i),
			
			version = 0;
		
		if (match && match[1]) {
			
			version = match[1];
			
		}
		
		return version >= 9;
		
	};
	
	boot.req = function (jquery) {
		
		requirejs.config({
			
			baseUrl: '../CDN',
			
			enforceDefine: false,
			
			paths: {
				
				'jquery': jquery,
				
				'cdnjs': 'ajax/libs/js'
				
			},
			
			waitSeconds: 60,
			
			map: {
				
				'*': {'jquery': 'cdnjs/jquery_private/jquery.private.min'},
				
				'cdnjs/jquery_private/jquery.private.min': {'jquery': 'jquery'}
				
			}
			
		});
		
		require([
			
			'cdnjs/modernizr_amd/modernizr.min',
			
			'jquery',
			
			'cdnjs/jquery_easing/1.3/jquery.easing.min',
			
			'cdnjs/jquery_cookie/1.3.1/jquery.cookie.min',
			
			'cdnjs/gridder/0.1.0/gridder',
			
			'cdnjs/jquery_title_modify/title.modify'
			
		], function (modernizr, SJ, easing, cookie, gridder, modifyTitle) {
			
			SJ(function ($) {
				
				var directoryPanel = $('.directoryPanel'),
					
					directoryContainer = directoryPanel.children('ul'),
					
					directoryUnit = directoryContainer.children('li'),
					
					articleHeader = directoryUnit.children('ul').eq(0),
					
					articleContent = directoryUnit.children('ul').eq(1);
				
				$('.directoryPanel > ul > li > ul.artTitleContainer').on('click', function () {
					
					var that = $(this),
						
						trig = that.next();
					
					trig.slideToggle({
						
						duration: 1000,
						
						easing: 'easeOutQuart'
						
					});
					
				});
				
				$('.directoryPanel > ul > li > ul > .articleContent > span.slideUp').on('click', function () {
					
					var that = $(this);
					
					that.closest('ul').slideUp();
					
				});
				
				/**
				 * Development dependency: grid system.
				 */
				
				gridder;
				
				
				
				/**
				 * Title modify component( Public ) test.
				 */
				
				modifyTitle();
				
			});
			
		});
		
	};
	
	boot.judgement = function (opts) {
		
		if (this.isIE()) {
			
			this.isGteIE9() ? this.req(opts.jq2x) : this.req(opts.jq1x);
			
		} else {
			
			this.req(opts.jq2x);
			
		}
		
	};
	
	/*             ___   ___
				 \  \  \  \
	   (___)   ___\__\__\__\__
	   (o o)   |  O O O O O O|
	  --\ /----+-------------+-------/
	  |  O                          /
	   \                           /
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ => moo__Steerage ...
	*/
	
	boot.judgement({
		
		jq1x: 'ajax/libs/js/jquery/1.10.2/jquery.min',
		
		jq2x: 'ajax/libs/js/jquery/2.0.3/jquery.min'
		
	});
	
}(window, document, requirejs, require));
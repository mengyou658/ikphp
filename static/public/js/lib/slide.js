define("widget/slide",["jquery"],function(c){var a={duration:500,prevBtn:"",nextBtn:"",nav:"",pause:c.noop,onTurnTo:c.noop,play:false,interval:3000};function b(d,e){this.options=c.extend({},a,e);this.init(d)}c.extend(b.prototype,{init:function(d){this.screen=d;this.slideList=this.screen.find(".slide-list");this.slides=this.slideList.find(".item");this.slideCount=this.slides.length;this.screenWidth=this.slideList.width();var e={};c(["first","last"]).each(c.proxy(function(g,f){e[f]=this.slides[f]().clone().addClass("clone")},this));this.slideList.append(e.first).prepend(e.last);this.slideList.css({width:this.screenWidth*(this.slideCount+2),left:-this.screenWidth});this.index=1;this.nav=this.options.nav;if(this.nav){this.controls=this.nav.find("[data-index]");this.controlIndex=1;this.controls.eq(0).addClass("active")}this.nextBtn=this.options.nextBtn;this.prevBtn=this.options.prevBtn;this.listen();this.delay=this.options.interval+this.options.duration;this.play()},listen:function(){var d=this;if(this.nav){this.controls.click(function(h){var g=c(h.currentTarget),f=g.data("index");if(f===d.targetIndex){return}d.targetIndex=f;d.pause();d.turnTo(f)})}if(this.prevBtn){this.prevBtn.click(function(f){f.preventDefault();d.prev()})}if(this.nextBtn){this.nextBtn.click(function(f){f.preventDefault();d.next()})}this.screen.on("mouseenter",c.proxy(this.pause,this)).on("mouseleave",c.proxy(this.play,this))},turnTo:function(e,d){var f=c.proxy(function(){this.isPlaying=false;this.play();if(d){e=this.move(d)}this.turnEnd(e)},this);this.moveControl(d||e);this.isPlaying=true;this.slideList.stop().animate({left:-e*this.screenWidth},this.options.duration,f)},moveControl:function(e){if(this.controlIndex===e){return}var d=this.nav.find(".active"),f=this.controls.eq(e-1);d.removeClass("active");f.addClass("active");this.controlIndex=e},turnEnd:function(d){this.index=d;this.targetIndex=null;if(this.options.onTurnTo){this.options.onTurnTo.apply(this,arguments)}},play:function(d){if(!this.delay||this.interval){return}this.interval=setInterval(c.proxy(this.next,this),this.delay);return this},pause:function(d){if(!this.delay){return}clearInterval(this.interval);this.interval=null;return this},move:function(d){this.slideList.css({left:-d*this.screenWidth});return d},slide:function(i){if(this.isPlaying){return}var h=i==="next",g=h?1:-1,f=this.index+g,e=h?f>this.slideCount:f<=0,d=f;if(e){d=h?1:this.slideCount;this.turnTo(f,d)}else{this.turnTo(f)}this.targetIndex=d},next:function(){this.pause().slide("next")},prev:function(d){this.pause().slide("prev")}});return b});
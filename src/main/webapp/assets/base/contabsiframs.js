define(function(require) {
	require('jquery');
	$(function() {
	    function f(l) {
	        var k = 0;
	        $(l).each(function() {
	            k += $(this).outerWidth(true)
	        });
	        return k
	    }
	    function g(n) {
	        var o = f($(n).prevAll()),
	        q = f($(n).nextAll());
	        var l = f($(".content-tabs",parent.document).children().not(".J_menuTabs"));
	        var k = $(".content-tabs",parent.document).outerWidth(true) - l;
	        var p = 0;
	        if ($(".page-tabs-content",parent.document).outerWidth() < k) {
	            p = 0
	        } else {
	            if (q <= (k - $(n).outerWidth(true) - $(n).next().outerWidth(true))) {
	                if ((k - $(n).next().outerWidth(true)) > q) {
	                    p = o;
	                    var m = n;
	                    while ((p - $(m).outerWidth()) > ($(".page-tabs-content",parent.document).outerWidth() - k)) {
	                        p -= $(m).prev().outerWidth();
	                        m = $(m).prev()
	                    }
	                }
	            } else {
	                if (o > (k - $(n).outerWidth(true) - $(n).prev().outerWidth(true))) {
	                    p = o - $(n).prev().outerWidth(true)
	                }
	            }
	        }
	        $(".page-tabs-content",parent.document).animate({
	            marginLeft: 0 - p + "px"
	        },
	        "fast")
	    }
	    function a() {
	        var o = Math.abs(parseInt($(".page-tabs-content",parent.document).css("margin-left")));
	        var l = f($(".content-tabs",parent.document).children().not(".J_menuTabs"));
	        var k = $(".content-tabs",parent.document).outerWidth(true) - l;
	        var p = 0;
	        if ($(".page-tabs-content").width() < k) {
	            return false
	        } else {
	            var m = $(".J_menuTab:first");
	            var n = 0;
	            while ((n + $(m).outerWidth(true)) <= o) {
	                n += $(m).outerWidth(true);
	                m = $(m).next()
	            }
	            n = 0;
	            if (f($(m).prevAll()) > k) {
	                while ((n + $(m).outerWidth(true)) < (k) && m.length > 0) {
	                    n += $(m).outerWidth(true);
	                    m = $(m).prev()
	                }
	                p = f($(m).prevAll())
	            }
	        }
	        $(".page-tabs-content").animate({
	            marginLeft: 0 - p + "px"
	        },
	        "fast")
	    }
	    function b() {
	        var o = Math.abs(parseInt($(".page-tabs-content").css("margin-left")));
	        var l = f($(".content-tabs",parent.document).children().not(".J_menuTabs"));
	        var k = $(".content-tabs",parent.document).outerWidth(true) - l;
	        var p = 0;
	        if ($(".page-tabs-content",parent.document).width() < k) {
	            return false
	        } else {
	            var m = $(".J_menuTab:first",parent.document);
	            var n = 0;
	            while ((n + $(m).outerWidth(true)) <= o) {
	                n += $(m).outerWidth(true);
	                m = $(m).next()
	            }
	            n = 0;
	            while ((n + $(m).outerWidth(true)) < (k) && m.length > 0) {
	                n += $(m).outerWidth(true);
	                m = $(m).next()
	            }
	            p = f($(m).prevAll());
	            if (p > 0) {
	                $(".page-tabs-content",parent.document).animate({
	                    marginLeft: 0 - p + "px"
	                },
	                "fast")
	            }
	        }
	    }
	    $(".J_menuItem").each(function(k) {
	        if (!$(this).attr("data-index")) {
	            $(this).attr("data-index", "item-"+k);
	        }
	    });
	    function c() {
	        var o = $(this).attr("href"),
	        m = $(this).data("index"),
	        l = $.trim($(this).text()),
	        k = true;
	        if (o == undefined || $.trim(o).length == 0) {
	            return false
	        }
	        $(".J_menuTab",parent.document).each(function() {
	            if ($(this).data("id") == o) {
	                if (!$(this).hasClass("active")) {
	                    $(this).addClass("active").siblings(".J_menuTab").removeClass("active");
	                    g(this);
	                    $(".J_mainContent .J_iframe",parent.document).each(function() {
	                        if ($(this).data("id") == o) {
	                            $(this).show().siblings(".J_iframe").hide();
	                            return false
	                        }
	                    })
	                }
	                k = false;
	                return false
	            }
	        });
	        if (k) {
	            var p = '<a href="javascript:;" class="active J_menuTab" data-id="' + o + '">' + l + ' <i class="fa fa-times-circle"></i></a>';
	            $(".J_menuTab",parent.document).removeClass("active");
	            var n = '<iframe class="J_iframe" name="iframe' + m + '" width="100%" height="100%" src="' + o + '" frameborder="0" data-id="' + o + '" seamless></iframe>';
	            $(".J_mainContent",parent.document).find("iframe.J_iframe").hide().parents(".J_mainContent").append(n);
	            $(".J_menuTabs .page-tabs-content",parent.document).append(p);
	            g($(".J_menuTab.active",parent.document))
	        }
	        return false
	    }
	    
	    $(document).on("click",".J_menuItem", c);
	});
	
});
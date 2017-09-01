/*
 * @Author: xuyuexiong
 * @Date:   2017-08-04 17:14:55
 * @Last Modified by:   xuyuexiong
 * @Last Modified time: 2017-09-01 11:31:34
 */

$(function() {
    //导航条高亮

    $('.navlist li').hover(function() {
        $('.navlist li a').removeClass('nav_active');
        $(this).addClass('current').siblings().removeClass('current');
        $(this).prev("li").addClass('prev').siblings().removeClass('prev');
        navlinewidth = $(this).width();
        offsetli = $(this).position().left;
        navWidth = $('.first_nav').width();
        navRight = $('.first_nav').width() - offsetli - $(this).width();
        index = $('.navlist li').index(this);

        //二级菜单位置
        if (index < 5) {
            $('.sNav div').eq(index).css('left', 1200 - navWidth + offsetli);
        } else if (index >= 5 && index < 9) {
            $('.sNav div').eq(index).css('right', navRight);
        }

        $(".navline").css({ 'width': navlinewidth }).stop().animate({ 'left': offsetli }, 200);

    });

    //二级菜单
    var li = $(".navlist li");
    var div = $(".sNav>div");
    var speed = 500;

    //初始化二级菜单
    $(div).eq($('.nav_active').parent().index()).show().siblings().hide();

    $(li).hover(function() {
        index = $(li).index(this);
        Show(index);
    });

    function Show(index) {
        $(li).eq(index).children().addClass("current").parents().siblings().children().removeClass("current");
        if (index > -1 && index < 9) {
            var number = $(div).eq(index).children().children().length;
            if (number > 1) {
                $(".second_nav").stop(true, true).slideDown("fast");
                $(div).eq(index).show().siblings().hide();
            } else {
                $(".second_nav").stop(true, false).slideUp();
            }
        }
    };

    //轮播图插件
    $('#slider').nivoSlider({
        effect: 'sliceUpDownLeft',
        slices: 20,
        animSpeed: 500,
        pauseTime: 4000,
        directionNav: false,
        controlNav: false,
        pauseOnHover: false
    });

})
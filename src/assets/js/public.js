/*
* @Author: xuyuexiong
* @Date:   2017-08-04 17:14:55
* @Last Modified by:   xuyuexiong
* @Last Modified time: 2017-08-04 17:35:00
*/

$(function(){
	//导航条高亮
    $('.navlist li').hover(function() {
        $('.navlist li').removeClass('nav_active');
        $(this).addClass('current').siblings().removeClass('current');
        $(this).prev("li").addClass('prev').siblings().removeClass('prev');
        navlinewidth = $(this).width();
        offsetli = $(this).position().left;
        offsettop = $(this).position().top;

        $(".navline").css('top', offsettop);
        $(".navline").css({ 'width': navlinewidth }).stop().animate({ 'left': offsetli }, 200);

    });

    //二级菜单
    var li = $(".navlist li");
    var div = $(".sNav>div");
    var speed = 500;

    //初始化二级菜单
    $(div).eq($('.nav_active').index()).show().siblings().hide();
    
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

    //底部导航
    $.get('../../shared/footer.html', function(data) {
        $('footer').html(data);
    });
})
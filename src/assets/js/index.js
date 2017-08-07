$(function() {
    //获取屏幕高度和宽度
    var height = $(window).height();
    var viewWidth = $(window).width();

    //初始化轮播图插件
    // var swiper = new Swiper('.swiper-container', {
    //     pagination: '.swiper-pagination',
    //     nextButton: '.swiper-button-next',
    //     prevButton: '.swiper-button-prev',
    //     slidesPerView: 1,
    //     paginationClickable: true,
    //     spaceBetween: 0,
    //     loop: true,
    //     autoplay: 4000,
    //     speed: 1000,
    //     autoplayDisableOnInteraction: false,

    // });

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

    $(li).hover(function() {
        index = $(li).index(this);
        Show(index);
    });

    $(".navbg").hover(function() {}, function() {
        $(".second_nav").stop(true, false).slideUp();
    }).trigger("mouseleave");

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

    //合作伙伴商标变色
    var time
    $('.partnerlogo img').hover(function() {
        var str = $(this).attr('src');
        if (str.indexOf("color") < 0) {
            var ar = str.split('.');
            ar[ar.length - 2] = ar[ar.length - 2] + '_color';
            ar = ar.join('.');
        }
        $(this).attr('src', ar);
        var thisObj = $(this)
        var n = 0.2;
        time = setInterval(function() {
            n = n + 0.02;
            thisObj.css("opacity", n);
            if (n > 1) {
                clearInterval(time)
            }
        }, 10)
    }, function() {
        var ar = $(this).attr('src').split("_")[0] + ".png";
        $(this).attr('src', ar);
        clearInterval(time)
        $(this).css("opacity", 1);
    });

    //底部导航
    $.get('../../shared/footer.html', function(data) {
        $('footer').html(data);
    });

    //移动端导航
    $('.hamburger').click(function() {
        $('.hamburger').toggleClass('on');
        $('.gnb_wrap').toggleClass('on');

    });
})

//当改变窗口大小时，刷新页面
// $(window).resize(function() {
//     window.location.reload();
// });
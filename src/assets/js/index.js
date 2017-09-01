$(function() {

    //导航条高亮
    $(".navline").css('left', $('.navlist').position().left);
    $(".navline").width($('.navlist li').width());
    $(".navline").show();

    $('.navlist li').hover(function() {
        $('.navlist li').removeClass('nav_active');
        $(this).addClass('current').siblings().removeClass('current');
        $(this).prev("li").addClass('prev').siblings().removeClass('prev');
        navlinewidth = $(this).width();
        offsetli = $(this).position().left;
        $(".navline").stop().animate({ left: offsetli, width: navlinewidth }, 300);
        // $(".navline").css({ 'width': navlinewidth }).css('left', offsetli);

        navWidth = $('.first_nav').width();
        navRight = $('.first_nav').width() - offsetli - $(this).width();
        index = $('.navlist li').index(this);

        //二级菜单位置
        if (index < 5) {
            $('.sNav div').eq(index).css('left', 1200 - navWidth + offsetli);
        } else if (index >= 5 && index < 9) {
            $('.sNav div').eq(index).css('right', navRight);
        }


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
                // alert('a') b
            } else {
                $(".second_nav").stop(true, false).slideUp();
            }
        }
    };

    //合作伙伴商标变色
    var time
    $('.partnerlogo img').hover(function() {

        var str = $(this).attr('data-src');
        var src_color = str.split('|');

        $(this).attr('src', src_color[1]);
        var thisObj = $(this)
        var n = 0.2;
        time = setInterval(function() {
            n = n + 0.03;
            thisObj.css("opacity", n);
            if (n > 1) {
                clearInterval(time)
            }
        }, 10)
    }, function() {
        var str = $(this).attr('data-src');
        var src_color = str.split('|');
        $(this).attr('src', src_color[0]);

        clearInterval(time)
        $(this).css("opacity", 1);
    });

    //星星效果
    if (!window.addEventListener) return;

    var canvas = document.querySelector("#starCanvas");
    var context = canvas.getContext("2d");

    var stars = {},
        particleIndex = 0,
        settings = {
            r: 900, // 根据是设计稿确定的轨迹半径
            height: 260, // 露出的圆弧的高度
            density: 500,
            maxLife: 100,
            groundLevel: canvas.height,
            leftWall: 0,
            rightWall: canvas.width,
            alpha: 0.0,
            maxAlpha: 1
        };

    var getMinRandom = function() {
        var rand = Math.random();
        // step的大小决定了星星靠近地球的聚拢程度，
        // step = Math.ceil(2 / (1 - rand))就聚拢很明显
        var step = Math.ceil(1 / (2 - rand));
        var arr = [];
        for (var i = 0; i < step; i++) {
            arr.push(Math.random());
        }

        return Math.min.apply(null, arr);
    };

    function resizeCanvas() {
        canvas.width = 1920;
        canvas.height = 800;
        settings.rightWall = canvas.width;
        settings.groundLevel = canvas.height;
        settings.height = 260 + (canvas.height - 800) / 2;
        redraw();
    }

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    function redraw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "rgba(0,0,0,0)";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function Star() {
        // 圆的轨迹方程式为：(x-a)²+(y-b)²=r²
        // 因此，已知x, 则y = Math.sqrt(r² - (x-a)²) + b;
        // 其中，圆心是(a, b)
        // 在本例子中
        // 圆心坐标是(canvas.width/2, canvas.height - 600 + r);
        var a = canvas.width / 2,
            b = canvas.height - settings.height + settings.r;
        // 因此，已知横坐标随机
        this.x = Math.floor(Math.random() * canvas.width);
        // 纵坐标需要在圆弧以上
        // 越往上，越稀疏
        this.offsety = getMinRandom() * (canvas.height - settings.height);
        this.y = b - Math.sqrt(settings.r * settings.r - (this.x - a) * (this.x - a)) - this.offsety;

        this.vx = Math.random() * 0.2 + 0.15; // 水平偏移，也是移动速度

        // 星星的尺寸
        this.particleSize = 1.2 + (Math.random() + 0.1 / 4);
        particleIndex++;
        stars[particleIndex] = this;
        this.alpha = 0.0;
        this.maxAlpha = 0.2 + (this.y / canvas.height) * Math.random() * 0.8;
        this.alphaAction = 1;
    }

    Star.prototype.draw = function() {
        // 横坐标移动
        this.x += this.vx;
        // 根据切线方向进行偏移
        // y坐标
        this.y = canvas.height - settings.height + settings.r - Math.sqrt(settings.r * settings.r - (this.x - canvas.width / 2) * (this.x - canvas.width / 2)) - this.offsety;

        // 透明度慢慢起来
        if (this.alphaAction == 1) {
            if (this.alpha < this.maxAlpha) {
                this.alpha += 0.025;
            } else {
                this.alphaAction = -1;
            }
        } else {
            if (this.alpha > 0.2) {
                this.alpha -= 0.01;
            } else {
                this.alphaAction = 1;
            }
        }

        if (this.x + (this.particleSize * 2) >= settings.rightWall) {
            // x到左侧
            this.x = this.x - settings.rightWall;
        }

        // 绘制星星
        context.beginPath();
        context.fillStyle = "rgba(255,255,255," + this.alpha.toString() + ")";
        context.arc(this.x, this.y, this.particleSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }

    function render() {

        redraw();

        // 星星的数目
        // IE下CUP性能有限，数目小
        var length = 400;
        if (!history.pushState) {
            // IE9
            length = 300;
        } else if (document.msHidden != undefined) {
            // IE10+
            length = 400;
        }

        if (Object.keys(stars).length > length) {
            settings.density = 0;
        }

        for (var i = 0; i < settings.density; i++) {
            if (Math.random() > 0.97) {
                new Star();
            }
        }

        // 星星实时移动
        for (var i in stars) {
            stars[i].draw();
        }

        requestAnimationFrame(render);
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(fn) {
            setTimeout(fn, 17);
        };
    }

    render();
})
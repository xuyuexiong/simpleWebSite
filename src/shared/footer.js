$(function(){
	
	//二维码弹框
	$(".footer").on('mouseover', '.weixin_rq', function(event) {
	    event.preventDefault();
	    $('.hide_weixin').css('display','block');
	    /* Act on the event */
	});
	$(".footer").on('mouseleave', '.weixin_rq', function(event) {
	    event.preventDefault();
	    $('.hide_weixin').css('display','none');
	    /* Act on the event */
	});

	$(".footer").on('mouseover', '.flm_rq', function(event) {
	    event.preventDefault();
	    $('.hide_flm').css('display','block');
	    /* Act on the event */
	});
	$(".footer").on('mouseleave', '.flm_rq', function(event) {
	    event.preventDefault();
	    $('.hide_flm').css('display','none');
	    /* Act on the event */
	});
       
})
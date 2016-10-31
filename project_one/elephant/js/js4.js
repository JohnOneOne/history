var mm=new IScroll("#main");
$(".main_ul").on("click","li",function(){
	$(this).css({
		"border":"none",
		"background":"#fff"
	}).siblings().css({
		"border":"",
		"background":""
	})
})
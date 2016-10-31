var vv=document.createElement('span');
	$(vv).appendTo('i');
$(".main_li").on("tap","i",function(){
	$(this).find('span').css({
		"display":"block"
	}).parents("small").siblings().find('span').css({
		"display":"none"
	})
})
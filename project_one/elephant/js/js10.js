$("#cc").on("tap",function(){
	if($("#cc").attr("checked")==true){
		$(this).next().text("✔");
		var txt=$(".hide").find("input").val();
		$(".hide").css({
			"display":"none"
		})
		console.log(txt);
		$(".show").find("input").val(txt);
		$(".show").css({
			"display":"block"
		})
	}else{
		$(this).next().text("");
		$(".show").css({
			"display":"none"
		})
		var text=$(".show").find("input").val();
		$(".hide").css({
			"display":"block"
		})
		$(".hide").find("input").val(text);
	}
})
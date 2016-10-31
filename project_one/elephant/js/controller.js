angular.module('myApp')
		.controller("refresh",refresh)
		.controller("swiper",swiper)
		.controller("render",render)
		.controller("sub",sub)

function refresh(){
	setTimeout(function(){
		var scroller=new IScroll("#main");
		scroller.refresh();
	},50)
}
function swiper(){
	var swiper=new Swiper(".bo",{
		pagination:".swiper-pagination",
		autoplay:1000,
		loop:true,
		autoplayDisableOnInteraction:false  
	});
}

function render($scope,$http){
	console.log('123')
	$http.post("json/data.json")
		 .success(function(res){
		 	$scope.data=res;
		 	console.log(res)
		 })
}

//判断验证
function sub($scope,$location,apiService){
	$scope.submit = function(){
	apiService.login('http://localhost:3001/login',{
		username:$scope.username,
		userpwd:$scope.userpwd
	},"jsonp")
	.success(function(res){
			if(res.code == 0){
				$location.url('/head_Page')
			}
	})
	}
}
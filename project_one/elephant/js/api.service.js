function apiService($http){
	function toStr(params){
		var arr=[];
			for(i in params){
				arr.push(i+"="+params[i])
			}
			//console.log(arr);
			return "?"+arr.join("&");
	}

	function fecth(url, params,method){
		var params = params || {};
		var method = method.toUpperCase();
		if(method == "POST"){
			return $http.post(url,params)
		}else if(method == "JSONP"){
			//?callback='JSON_CALLBACK
			//var url = url.split("?");
			var newParams = toStr(params);
			return $http.jsonp(url+newParams+"&callback='JSON_CALLBACK'");
		}else{
			var urlParams = toStr(params);
			return $http.get(url+urlParams);
		}
	}

	this.login=function(url, params,method){
		return fecth(url, params,method);
	}
}
angular.module("myApp")
		.service("apiService",apiService)
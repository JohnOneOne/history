function pageTitle($rootScope){
  return{
    restrict:"A",
    link:function(scope,element){
      $rootScope.$on('$stateChangeStart',function(event,toState){
          var title=""
          if(toState.data&&toState.data.title){
              title+=toState.data.title;
          }
          element.text(title);
      })
    }
  }
}

angular.module('myApp')
      .directive('pageTitle',pageTitle)
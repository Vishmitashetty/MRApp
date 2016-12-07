(function () {

    angular.module("movie",[])
   .controller("movieapp", function ($scope, $http) {
       
       
       $scope.getData = function () {

           var i;
           var n = 0;
           var dat = new Array();
          var m = document.getElementById("type").value; //type value(movie,series)
           var array = $scope.searchparams.split(','); // converting string to array
           var count = 0;
           //looping through each string
           for (i = 0; i < array.length; i++) {
               var searchword = array[i];
               var len = array[i].length;
               if (len != null) {

                   $http.get('https://www.omdbapi.com/?s=' + array[i] + '&type=' + m).success(function (data) {                  
                       $scope.datas = data;
                       console.log(data);
                       

                       //iterating through response data array of object
                       angular.forEach(data.Search, function (obj) {
                           document.getElementById("result").style.display = 'block';

                           $http.get('https://www.omdbapi.com/?i=' + obj.imdbID + '&plot=short&r=json&tomatoes=true').success(function (response) {

                               //storing data in array for each object

                               dat[count] = response;
                               console.log(response);
                               count++;
                           })
                           $scope.child = dat;
                       });


                   }).error(function (data) {
                       $scope.error = "An error has occured while adding! " + data;
                   });

                  

               }
             
           }
       }
   })

})();

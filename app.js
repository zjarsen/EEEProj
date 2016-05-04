angular.module('heatApp', [])
	.controller('HeatMapController', function($scope, $http) {
		var heatList = this;
		var $startTime = 0;
		var $endTime = 0;
		var $vid = 0;

    	heatList.calculate = function() {
			var sdate = new Date(heatList.startDate);
			var stime = new Date(heatList.startTime);
			var edate = new Date(heatList.endDate);
			var etime = new Date(heatList.endTime);
			heatList.date = sdate.toLocaleString('en-US',{timeZone:'Asia/Shanghai'});
			heatList.time = stime.toLocaleString('en-US',{timeZone:'Asia/Shanghai'});
			var newsTime = new Date(stime.toLocaleString('en-US',{timeZone:'Asia/Shanghai'}));
			var newsDate = new Date(sdate.toLocaleString('en-US',{timeZone:'Asia/Shanghai'}));
			var neweTime = new Date(etime.toLocaleString('en-US',{timeZone:'Asia/Shanghai'}));
			var neweDate = new Date(edate.toLocaleString('en-US',{timeZone:'Asia/Shanghai'}));
			$scope.startTime = newsTime.getTime();
			$scope.startDate = newsDate.getTime();

			$startTime = String(newsDate.getTime()-newsTime.getTime());
			$endTime = String(neweDate.getTime()-neweTime.getTime());
			$scope.finalTime = $startTime;
			$vid = heatList.vid;

			connect();
    	};

		function connect(){
    		$http.post("http://128.199.217.9:8081/records/", {"id":"","start":$startTime,"end":$endTime,"vid":$vid})
    		.then(function(response){
				$scope.greeting = response.data;
				x = response.data;
				var ave = 0.0;
				for(var i=0;i<x.length;i++) {
					var obj = x[i];
					ave += parseFloat(obj['speed'])/200;
				}
				ave = ave / x.length;
				$scope.average = ave;
			});
    	};



	});
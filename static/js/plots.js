var NUMBER_OF_POINTS = 15;

function createPlots(){
	var canvas
	canvas = document.getElementById('temp-canvas'),
	    temp_ctx = canvas.getContext('2d'),
	    temp_startingData = {
	      labels: Array.apply(null, Array(NUMBER_OF_POINTS)).map(Number.prototype.valueOf,0),// new Array(20),
	      datasets: [
	          {
	              fillColor: "rgba(220,220,220,0.2)",
	              strokeColor: "rgba(220,220,220,1)",
	              pointColor: "rgba(220,220,220,1)",
	              pointStrokeColor: "#fff",
	                data: Array.apply(null, Array(NUMBER_OF_POINTS)).map(Number.prototype.valueOf,0)
	          }
	      ]
	    };
	canvas = document.getElementById('hum-canvas'),
	    hum_ctx = canvas.getContext('2d'),
	    hum_startingData = {
	      labels: Array.apply(null, Array(NUMBER_OF_POINTS)).map(Number.prototype.valueOf,0),// new Array(20),
	      datasets: [
	          {
	              fillColor: "rgba(220,220,220,0.2)",
	              strokeColor: "rgba(220,220,220,1)",
	              pointColor: "rgba(220,220,220,1)",
	              pointStrokeColor: "#fff",
	                data: Array.apply(null, Array(NUMBER_OF_POINTS)).map(Number.prototype.valueOf,0)
	          }
	      ]
	    };
	canvas = document.getElementById('lum-canvas'),
	    lum_ctx = canvas.getContext('2d'),
	    lum_startingData = {
	      labels: Array.apply(null, Array(NUMBER_OF_POINTS)).map(Number.prototype.valueOf,0),// new Array(20),
	      datasets: [
	          {
	              fillColor: "rgba(220,220,220,0.2)",
	              strokeColor: "rgba(220,220,220,1)",
	              pointColor: "rgba(220,220,220,1)",
	              pointStrokeColor: "#fff",
	                data: Array.apply(null, Array(NUMBER_OF_POINTS)).map(Number.prototype.valueOf,0)
	          }
	      ]
	    };


	// Reduce the animation steps for demo clarity.
	var temp_chart = new Chart(temp_ctx).Line(temp_startingData, {animationSteps: 15});
	var hum_chart = new Chart(hum_ctx).Line(hum_startingData, {animationSteps: 15});
	var lum_chart = new Chart(lum_ctx).Line(lum_startingData, {animationSteps: 15});


	var prevTime = undefined;

	setInterval(function(){
		// retrieve last measure and append to collection of measures
		var last_request = new XMLHttpRequest()
		last_request.open("GET", "/last_datum", false);
		last_request.send();
		var measure = JSON.parse(last_request.response);

		// Add two random numbers for each dataset
		if (prevTime!=measure.time) {
			var correctedTemp = parseInt(measure.temperature) + (Math.random()-0.5)*1;
			temp_chart.addData([correctedTemp], measure.time);

			var correctedHum = parseInt(measure.humidity) + (Math.random()-0.5)*1;
			hum_chart.addData([correctedHum], measure.time);

			var correctedLum = parseInt(measure.brightness) + (Math.random()-0.5)*1;
			lum_chart.addData([correctedLum], measure.time);

			prevTime = measure.time;

			// Remove the first point so we dont just add values forever
			temp_chart.removeData();
			hum_chart.removeData();
			lum_chart.removeData();

		}
	}, 1000);
}

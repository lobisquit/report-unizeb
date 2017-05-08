function createPlots(){
	var canvas = document.getElementById('temp-canvas'),
	    ctx = canvas.getContext('2d'),
	    startingData = {
	      labels: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],// new Array(20),
	      datasets: [
	          {
	              fillColor: "rgba(220,220,220,0.2)",
	              strokeColor: "rgba(220,220,220,1)",
	              pointColor: "rgba(220,220,220,1)",
	              pointStrokeColor: "#fff",
	            //   data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	          }
	      ]
	    };

	// Reduce the animation steps for demo clarity.
	var temp_chart = new Chart(ctx).Line(startingData, {animationSteps: 15});

	var prevTime = undefined;

	setInterval(function(){
		// retrieve last measure and append to collection of measures
		var last_request = new XMLHttpRequest()
		last_request.open("GET", "/last_datum", false);
		last_request.send();
		var measure = JSON.parse(last_request.response);

		// Add two random numbers for each dataset
		if (true) {
			var correctedTemp = parseInt(measure.temperature) + Math.random()*2-1
			temp_chart.addData([correctedTemp], measure.time);
			prevTime = measure.time
			// Remove the first point so we dont just add values forever
			temp_chart.removeData();
		}
	}, 500);
}

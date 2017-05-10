var NUMBER_OF_POINTS = 60;
var ANIMATION_SECONDS = 2;


Chart.defaults.global.animationSteps = Math.round(ANIMATION_SECONDS * 1000 / 17);

function createPlots(){
	var canvas
	canvas = document.getElementById('temp-canvas'),
		temp_ctx = canvas.getContext('2d'),
		temp_startingData = {
			labels: Array.apply(null, Array(NUMBER_OF_POINTS)).map(Number.prototype.valueOf,0),
			datasets: [
				{
					fillColor: "rgba(237, 72, 47,0.2)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(220,220,220,1)",
					pointStrokeColor: "#fff",
					data: Array.apply(null, Array(NUMBER_OF_POINTS)).map(Number.prototype.valueOf,0)
				}
			],
			title: {
				display: true,
				text: 'Custom Chart Title'
			}
		};

	var temp_options = {
		title: {
			display: true,
			text: 'Custom Chart Title',
			position: 'left'
		},
		legend: {
			display: true,
			text: 'prova',
			labels: {
					fontColor: 'rgb(255, 99, 132)'
			}
		},
	}

	canvas = document.getElementById('hum-canvas'),
		hum_ctx = canvas.getContext('2d'),
		hum_startingData = {
			labels: Array.apply(null, Array(NUMBER_OF_POINTS)).map(Number.prototype.valueOf,0),
			datasets: [
				{
					fillColor: "rgba(58, 162, 232,0.2)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(220,220,220,1)",
					pointStrokeColor: "#fff",
					data: Array.apply(null, Array(NUMBER_OF_POINTS)).map(Number.prototype.valueOf,0)
				}
			],
		};
	canvas = document.getElementById('lum-canvas'),
		lum_ctx = canvas.getContext('2d'),
		lum_startingData = {
			labels: Array.apply(null, Array(NUMBER_OF_POINTS)).map(Number.prototype.valueOf,0),
			datasets: [
				{
					fillColor: "rgba(34, 139, 34,0.2)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(220,220,220,1)",
					pointStrokeColor: "#fff",
					data: Array.apply(null, Array(NUMBER_OF_POINTS)).map(Number.prototype.valueOf,0)
				}
			],
			options: {
				title: {
					display: true,
					text: 'Custom Chart Title'
				}
			}
		};


	// Reduce the animation steps for demo clarity.
	var temp_chart = new Chart(temp_ctx).Line(temp_startingData, temp_options);
	var hum_chart = new Chart(hum_ctx).Line(hum_startingData, {});
	var lum_chart = new Chart(lum_ctx).Line(lum_startingData);

	var prevTime = undefined;

	setInterval(function(){
		// retrieve last measure and append to collection of measures
		var last_request = new XMLHttpRequest()
		last_request.open("GET", "/last_datum", false);
		last_request.send();
		var measure = JSON.parse(last_request.response);

		// Add two random numbers for each dataset
		if (measure.temperature < 1000 & measure.humidity < 1000 & measure.brightness < 1000) {
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
		}
	}, 1000);
}

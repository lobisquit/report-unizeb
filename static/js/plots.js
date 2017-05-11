var NUMBER_OF_POINTS = 60;
var ANIMATION_SECONDS = 0.1;

function createPlots() {
	Chart.defaults.global.animationSteps = Math.round(ANIMATION_SECONDS * 1000 / 17);

	var options = {

		responsive: false,
		maintainAspectRatio: false
	};


	var temp_data = {
		labels: Array.apply(null, Array(NUMBER_OF_POINTS)).map(Number.prototype.valueOf,0),
		datasets: [
			{
				label: "Temperature",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: Array.apply(null, Array(NUMBER_OF_POINTS)).map(Number.prototype.valueOf,0)
			},
		]
	};
	var temp_options = options;
	var temp_ctx = document.getElementById("temp-canvas").getContext("2d");
	var temp_chart = new Chart(temp_ctx).Line(temp_data, options);

	var hum_data = {
		labels: Array.apply(null, Array(NUMBER_OF_POINTS)).map(Number.prototype.valueOf,0),
		datasets: [
			{
				label: "Umidità",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: Array.apply(null, Array(NUMBER_OF_POINTS)).map(Number.prototype.valueOf,0)
			},
		]
	};
	var hum_options = options;
	var hum_ctx = document.getElementById("hum-canvas").getContext("2d");
	var hum_chart = new Chart(hum_ctx).Line(hum_data, options);

	var lum_data = {
		labels: Array.apply(null, Array(NUMBER_OF_POINTS)).map(Number.prototype.valueOf,0),
		datasets: [
			{
				label: "Luminosità",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: Array.apply(null, Array(NUMBER_OF_POINTS)).map(Number.prototype.valueOf,0)
			},
		]
	};
	var lum_options = options;
	var lum_ctx = document.getElementById("lum-canvas").getContext("2d");
	var lum_chart = new Chart(lum_ctx).Line(lum_data, options);

	// Add new values

	var prevTime = undefined;

	setInterval(function(){
		// retrieve last measure and append to collection of measures
		var last_request = new XMLHttpRequest()
		last_request.open("GET", "/last_datum", false);
		last_request.send();
		var measure = JSON.parse(last_request.response);

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

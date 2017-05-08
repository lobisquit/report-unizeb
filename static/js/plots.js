function createPlots(){
	var canvas = document.getElementById('temp-canvas'),
	    ctx = canvas.getContext('2d'),
	    startingData = {
	      labels: [1, 2, 3, 4, 5, 6, 7],
	      datasets: [
	          {
	              fillColor: "rgba(220,220,220,0.2)",
	              strokeColor: "rgba(220,220,220,1)",
	              pointColor: "rgba(220,220,220,1)",
	              pointStrokeColor: "#fff",
	              data: [65, 59, 80, 81, 56, 55, 40]
	          },
	          {
	              fillColor: "rgba(151,187,205,0.2)",
	              strokeColor: "rgba(151,187,205,1)",
	              pointColor: "rgba(151,187,205,1)",
	              pointStrokeColor: "#fff",
	              data: [28, 48, 40, 19, 86, 27, 90]
	          }
	      ]
	    },
	    latestLabel = startingData.labels[6];

	// Reduce the animation steps for demo clarity.
	var myLiveChart = new Chart(ctx).Line(startingData, {animationSteps: 15});
}


setInterval(function(){
  // Add two random numbers for each dataset
  myLiveChart.addData([Math.random() * 100, Math.random() * 100], ++latestLabel);
  // Remove the first point so we dont just add values forever
  myLiveChart.removeData();
}, 5000);





// setInterval(function() {
// 	// retrieve last measure and append to collection of measures
// 	var last_request = new XMLHttpRequest()
// 	last_request.open("GET", "/last_datum", false);
// 	last_request.send();
//
// 	var measure = JSON.parse(last_request.response);
//
// 	// Add two random numbers for each dataset
//     myLiveChart.addData([measure.temperature], ++latestLabel);
//     // Remove the first point so we dont just add values forever
//     myLiveChart.removeData();
// }, 1000);
//
// var canvas = document.getElementById('temp1'),
//     ctx = canvas.getContext('2d'),
//     startingData = {
//       labels: [0,0,0,0,0,0,0,0,0],
//       datasets: [
//           {
//               fillColor: "rgba(220,220,220,0.2)",
//               strokeColor: "rgba(220,220,220,1)",
//               pointColor: "rgba(220,220,220,1)",
//               pointStrokeColor: "#fff",
//               data: [65, 59, 80, 81, 56, 55, 40]
//           },
//           {
//               fillColor: "rgba(151,187,205,0.2)",
//               strokeColor: "rgba(151,187,205,1)",
//               pointColor: "rgba(151,187,205,1)",
//               pointStrokeColor: "#fff",
//               data: [28, 48, 40, 19, 86, 27, 90]
//           }
//       ]
//     },
//     latestLabel = startingData.labels[8];
//
// // Reduce the animation steps for demo clarity.
// var myLiveChart = new Chart(ctx).Line(startingData, {animationSteps: 15});
// fitToContainer(temp1_canvas);

// Random data, just for testing purposes
var temp = new TimeSeries();
var hum = new TimeSeries();
var brightness = new TimeSeries();
setInterval(function() {
	var json = getJSON("http://unizeb.herokuapp.com/last_datum", function(err, data) {});
	console.log(json);

	obj = JSON.parse(json);
	console.log(obj);
	temp.append(new Date().getTime(), obj.temperature);
	hum.append(new Date().getTime(), obj.humidity);
	bright.append(new Date().getTime(), obj.humidity);
}, 1000);

// while (true) {
// 	var request = 0;
// 	jQuery.ajax({
// 		url: { url:  window.location.pathname },
// 		type: 'POST',
// 		cache: false,
// 		data: JSON.stringify(request),
// 		contentType: 'application/json',
// 		processData: false,
// 		success: on_request_success,
// 		error: on_request_error
// 	});
// }

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
};

function on_request_success(response) {
	console.debug('response', response);
}

function on_request_error(r, text_status, error_thrown) {
	console.debug('error', text_status + ", " + error_thrown + ":\n" + r.responseText);
}

function createPlots(){
	var smoothie = new SmoothieChart({
		grid: { strokeStyle: 'rgb(125, 0, 0)',
		fillStyle: 'rgb(60, 0, 0)',
		lineWidth: 1,
		millisPerLine: 250,
		verticalSections: 6,
		responsive: true} });
	smoothie.addTimeSeries(temp, {
		strokeStyle: 'rgb(0, 255, 0)',
		fillStyle: 'rgba(0, 255, 0, 0.4)',
		lineWidth: 3 });
	temp1_canvas = document.getElementById("temp1");
	fitToContainer(temp1_canvas);
	smoothie.streamTo(temp1_canvas, 1000);

	smoothie = new SmoothieChart({
		grid: { strokeStyle: 'rgb(125, 0, 0)',
		fillStyle: 'rgb(60, 0, 0)',
		lineWidth: 1,
		millisPerLine: 250,
		verticalSections: 6,
		responsive: true} });
	smoothie.addTimeSeries(hum, {
		strokeStyle: 'rgb(140, 0, 120)',
		fillStyle: 'rgba(140, 0, 120, 0.4)',
		lineWidth: 3 });
	hum1_canvas = document.getElementById("hum1");
	fitToContainer(hum1_canvas);
	smoothie.streamTo(hum1_canvas, 1000);
}


/* Make a canvas visually fill the positioned parent object */
function fitToContainer(canvas){
	canvas.style.width ='100%';
	canvas.style.height='100%';
	canvas.width	= canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
}

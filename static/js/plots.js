// Random data, just for testing purposes
var temp = new TimeSeries();
var hum = new TimeSeries();
var brightness = new TimeSeries();
setInterval(function() {
	// retrieve last measure and append to collection of measures
	var last_request = new XMLHttpRequest()
	last_request.open("GET", "/last_datum", false);
	last_request.send();

	var measure = JSON.parse(last_request.response);

	temp.append(new Date().getTime(), measure.temperature);
	hum.append(new Date().getTime(), measure.humidity);
	brightness.append(new Date().getTime(), measure.brightness);
}, 1000);

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

// Random data, just for testing purposes
var line1 = new TimeSeries();
var line2 = new TimeSeries();
var line3 = new TimeSeries();
setInterval(function() {
	line1.append(new Date().getTime(), Math.random());
	line2.append(new Date().getTime(), Math.random());
	line3.append(new Date().getTime(), Math.random());
}, 1000);

function createPlots(){
	var smoothie

	smoothie = new SmoothieChart({
		grid: { strokeStyle: 'rgb(125, 0, 0)',
		fillStyle: 'rgb(60, 0, 0)',
		lineWidth: 1,
		millisPerLine: 250,
		verticalSections: 6,
		responsive: true} });
	smoothie.addTimeSeries(line1, {
		strokeStyle: 'rgb(0, 255, 0)',
		fillStyle: 'rgba(0, 255, 0, 0.4)',
		lineWidth: 3 });
	smoothie.addTimeSeries(line2, {
		strokeStyle: 'rgb(255, 0, 255)',
		fillStyle: 'rgba(255, 0, 255, 0.3)',
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
	smoothie.addTimeSeries(line3, {
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

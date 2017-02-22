// Initialization
var c = document.getElementById("world");
var ctx = c.getContext('2d');
var height = $(window).height() * 0.9;
var width = $(window).width();
c.height = height;
c.width = width;
ctx.fillStyle = '#000000';
ctx.fillRect(0,0,width,height);
ctx.font = "italic 24px arial";
ctx.textAlign = "center";
var rid = 0;

// Backend Functions
var getRandomColor = function() {
    var newColor = 'rgb(' + Math.floor(Math.random() * 256) + ',' +
	Math.floor(Math.random() * 256) + ',' + 
	Math.floor(Math.random() * 256) + ')';
    return newColor;
}
var clear = function(color) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = color;
}

// Animations
var breathe = function(e) {
    window.cancelAnimationFrame(rid);
    var color = getRandomColor();
    var r = 0;
    var dr = 0;
    var cycle = 0;
    var circle = function() {
	clear(color);
	ctx.beginPath();
	ctx.arc(width/2, height/2, r/10, 0, 2*Math.PI);
	ctx.fill();
	r += dr;
	cycle += 1;
	if (cycle % 35 == 0) {
	    if (dr > 8) 
		dr = -1 * dr;
	    else
		dr += 1;	
	    cycle = cycle % 10;
	}
	ctx.fillStyle = "#202020";
	if (dr < 0) 
	    ctx.fillText("Breathe Out", width/2, height * 0.75);
	else 
	    ctx.fillText("Breathe In", width/2, height * 0.75);

	rid = window.requestAnimationFrame(circle);
    }
    circle();
    ctx.fillStyle = '#000000';
}

var screensaver = function(e) {
    window.cancelAnimationFrame(rid);
    var color = getRandomColor();
    var x, y;
    x = Math.floor(Math.random() * (width - 100));
    y = Math.floor(Math.random() * (height - 100));
    var dx, dy;
    dx = 2;
    dy = 2;
    var bounce = function() {
	clear(color);
	ctx.fillRect(x, y, 100, 100);
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("DVD", x + 50, y + 42);
	ctx.fillText("VIDEO", x + 50, y + 72);
	ctx.fillStyle = color;
	if (x < 0 || x > width - 100) {
	    dx *= -1;
	    color = getRandomColor();
	}
	if (y < 0 || y > height - 100) {
	    dy *= -1;
	    color = getRandomColor();
	}
	x += dx;
	y += dy;
	rid = window.requestAnimationFrame(bounce);
    }
    bounce();
    ctx.fillStyle = '#000000';
}

var stop = function(e) {
    window.cancelAnimationFrame(rid);
}

// Adding Event Listeners
var b1 = document.getElementById("circle");
b1.addEventListener("click", breathe);
var b2 = document.getElementById("dvd");
b2.addEventListener("click", screensaver);
var b3 = document.getElementById("stop");
b3.addEventListener("click", stop);

console.log("Loaded js.");

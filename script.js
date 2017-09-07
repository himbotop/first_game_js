var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var keys = {
	'Left' : 37,
	'Right' : 39,
	'Space' : 32
};

var keyDown = {};

var setKey = function (keyCode) {
	keyDown[keyCode] = true;
};

var clearKey = function (keyCode) {
	keyDown[keyCode] = false;
};

var isKeyDown = function (keyName) {
	return keyDown[keys[keyName]] == true;
};


window.onkeydown = function (e) {
	setKey(e.keyCode);
};

window.onkeyup = function (e) {
	clearKey(e.keyCode);
};	


var drawRect = function (x, y, sizeX, sizeY, color) {
	ctx.beginPath();
	ctx.rect(x, y, sizeX, sizeY);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
};

var drawPlayer = function (x) {
	ctx.beginPath();
	ctx.rect(x, 145, 50, 5);
	ctx.rect(x+10, 140, 30, 5);
	ctx.rect(x+23, 135, 5, 5);
	ctx.fillStyle = "rgb(173, 105, 82)";
	ctx.fill();
	ctx.closePath();
};

var Destruction = function () {
	for(var i = 0; i < shots.length; i++) {
		for(var j = 0; j < ships.length; j++) {
			if(~~shots[i].y == ~~ships[j].y+5 && shots[i].x+5 >= ships[j].x && shots[i].x <= ships[j].x+10) {
				ships.splice(j, 1);
				shots.splice(i, 1);
				break;
			}
		}
	}
};

var shipsGeneration = function () {
	if( countShips > 30) {
		ships.push({
			x : Math.floor(Math.random() * (600 - 0 + 1)) + 0,
			y : 0
		});
		countShips = 0;
	}
	countShips++;

	for(var i = 0; i < ships.length; i++) {

		drawRect(ships[i].x, ships[i].y, 10, 10, "rgb(22, 105, 67)");
		ships[i].y += .3;
	}
};

var shotsGeneration = function () {
	if(isKeyDown('Space')) {
		var length = shots.length;
		if(length > 0) {
			if( (shots[length-1].y + 7) < 130) {
				shots.push({
					x : xPlayer+23,
					y : 130
				});
			}              
		} else {
			shots.push({
				x : xPlayer+23,
				y : 130
			});
		}
		
	}

	for(var i = 0; i < shots.length; i++) {

		drawRect(shots[i].x, shots[i].y, 5, 5, "rgb(195, 55, 67)");
		shots[i].y -= 2;
	}
};

var Player = function () {
	if(isKeyDown('Left')) {
		xPlayer-=4;
	}
	if(isKeyDown('Right')) {
		xPlayer+=4;
	}
	drawPlayer(xPlayer);
};

var ships = [];
var shots = [];
var countShips = 0;
var xPlayer = 120;

var main = function () {
	
	ctx.clearRect(0, 0, 600, 400);

	Destruction();

	shipsGeneration();

	shotsGeneration();
	
	Player();

	requestAnimationFrame(main);	
};

main();
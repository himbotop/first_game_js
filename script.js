var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;



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
  ctx.rect(x, 395, 50, 5);
  ctx.rect(x+10, 390, 30, 5);
  ctx.rect(x+23, 385, 5, 5);
  ctx.fillStyle = "rgb(173, 105, 82)";
  ctx.fill();
  ctx.closePath();
};

var Destruction = function () {
  for(var i = 0; i < shots.length; i++) {
    for(var j = 0; j < ships.length; j++) {
      if(shots[i].y < ships[j].y+10 && shots[i].x+5 > ships[j].x && shots[i].x < ships[j].x+10) {
        ships.splice(j, 1);
        shots.splice(i, 1);
        countLevel++;
        break;
      }
    }
  }
  for(var i = 0; i < shots.length; i++) {
      if(shots[i].y < 0) {
        shots.splice(i, 1);
    }
  }
};

var shipsGeneration = function (time) {
  if( countShips > densityShips && ships.length < numberShips) {
    ships.push({
      t : speedShips*1000,//время падения 
      ts : time,//время старта
      x : Math.random() * 590|0,
      y : 0
    });
    countShips = 0;
  }
  countShips++;

  for(var i = 0; i < ships.length; i++) {
    var s = ships[i], p = (time-s.ts)/s.t;
    if(p < 1)s.y = p*400|0;
    else {
    	gameStop--;
    	ships = [];
    	countLevel = 0;
    	break;
    }

    drawRect(s.x, s.y, 10, 10, "rgb(22, 105, 67)");

  }
};

var shotsGeneration = function (frameTime) {
  if(isKeyDown('Space')  && !playStop) {
    var length = shots.length;
    if(length > 0) {
      if( (shots[length-1].y + 7) < 380) {
        shots.push({
          x : xPlayer+23,
          y : 380
        });
      }
    } else {
      shots.push({
        x : xPlayer+23,
        y : 380
      });
    }

  }

  for(var i = 0; i < shots.length; i++) {

    drawRect(shots[i].x, shots[i].y, 5, 5, "rgb(195, 55, 67)");
    shots[i].y -= (frameTime / 1000) * speedShots;
  }
};

var Player = function (frameTime) {
 	if(isKeyDown('Left') && !playStop) {
   		xPlayer -= (frameTime / 1000) * speedPlayer;
 	}
  	if(isKeyDown('Right') && !playStop) {
    	xPlayer += (frameTime / 1000) * speedPlayer;
  	}
  drawPlayer(xPlayer);
};

var gameStopControl = function () {
	if(gameStop > 0) {
		statusGame.innerHTML = "Осталось попыток: "+gameStop;
	} else {
		statusGame.innerHTML = "Вы проиграли!";
		playStop = true;
		Level = 1;
		document.getElementById('level').innerHTML = "Уровень игры "+Level;
		pGame.style.display = 'block';
	}

};

var play = function () {
	document.getElementById('game').onclick = function () {
		ships = [];
		shots = [];
		densityShips = 0;
		xPlayer = 120;
		lastTime = 0;
		countShips = 0;
		gameStop = 3;
		playStop = false;
		speedPlayer = 200;
		densityShips = 30;
		numberShips = 20;
		speedShips = 15; 
		speedShots = 150;
		pGame.style.display = 'none';
	};	
};


var setLevelMap = function () {
	if(countLevel == levelMap[Level].countLevel) {
		speedPlayer = levelMap[Level].speedPlayer; // скорость передвижения игрока
		densityShips = levelMap[Level].densityShips; // плотность кораблей
		numberShips = levelMap[Level].numberShips; // количество кораблей
		speedShips = levelMap[Level].speedShips; // скорость посадки кораблей
		speedShots = levelMap[Level].speedShots; // скорость пуль
		document.getElementById('level').innerHTML = "Уровень игры "+Level;
		Level++;
		countLevel = 0;
		ships = [];
		gameStop = 3;
	}
	if(Level == 4) {
		Level = 1;
	}
};

var levelMap = {
	1 : {
		countLevel : 20,
		speedPlayer : 200,
		densityShips : 30,
		numberShips : 20,
		speedShips : 10,
		speedShots : 150
	},
	2 : {
		countLevel : 40,
		speedPlayer : 200,
		densityShips : 30,
		numberShips : 40,
		speedShips : 8,
		speedShots : 150
	},
	3 : {
		countLevel : 60,
		speedPlayer : 200,
		densityShips : 30,
		numberShips : 60,
		speedShips : 5,
		speedShots : 150
	}
};

var Level = 1;

var ships = [];
var shots = [];
var densityShips = 0;
var xPlayer = 120;
var lastTime = 0;
var countShips = 0;
var gameStop = 3;
var playStop = false; 
var statusGame = document.getElementById("statusGame");
var pGame = document.getElementById("pGame");
pGame.style.display = 'none';

var countLevel = 20;

var speedPlayer = 0; // скорость передвижения игрока
var densityShips = 0; // плотность кораблей
var numberShips = 0; // количество кораблей
var speedShips = 0; // скорость посадки кораблей
var speedShots = 0; // скорость пуль

var main = function (time) {
	
  ctx.clearRect(0, 0, 600, 400);
  drawRect(0, 0, 600, 400, "rgb(36, 177, 219)");

  var startTime = time;
  var frameTime = time - lastTime;

  setLevelMap();
  console.log(Level);

  gameStopControl();

  if(playStop){
  	 play();
  }

  Destruction();

  shipsGeneration(time);

  shotsGeneration(frameTime);

  Player(frameTime);

  lastTime = startTime;

  requestAnimationFrame(main);
};

main();

//console.log(levelMap[Level].countLevel);

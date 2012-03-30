PlayerCommand = { DontMove : 0, GoRight : 1, GoLeft : 2 };

var BORDER_LIMIT_PERC = 1;
var REFRESH_RATE_MS = 42;
var REFRESHES_BEETWEEN_BOMBS = 60;
var BOMB_DIMENSION_PERC = 10;
var PLAYER_WIDTH_PERC = 20;

var isPaused = false;
var playerCommand;
var currentPlayerLeftPerc;
var loopRepeats;
var bombsLeft;
var bombsTop;
var activeBombs;

function Start()
{
	AddEventListeners();
	RestartGame();
	MainLoop();
}

function PauseGame()
{	
	isPaused = !isPaused;
	
	var pButton = document.getElementById("ppButton");
	
	if (isPaused)
		pButton.src = "PlayButton.png";
	else
		pButton.src = "PauseButton.png";
}

function RestartGame()
{
	playerCommand = PlayerCommand.DontMove;
	currentPlayerLeftPerc = 40;
	loopRepeats = 1;
	bombsLeft = [0,0,0,0,0];
	bombsTop = [0,0,0,0,0];
	activeBombs = [false, false, false, false, false];
	
	document.getElementById("player").style.left = currentPlayerLeftPerc + "%";
	
	SaveToCSS(0);
	SaveToCSS(1);
	SaveToCSS(2);
	SaveToCSS(3);
	SaveToCSS(4);
}

function GenerateBomb(bombId)
{
	if (activeBombs[bombId] == false)
	{
		bombsTop[bombId] = 0;
		bombsLeft[bombId] = Math.floor(Math.random() * (100 - (BOMB_DIMENSION_PERC + (2 * BORDER_LIMIT_PERC)))) + BORDER_LIMIT_PERC;
		activeBombs[bombId] = true;
		return true;
	}
	return false;
}

function ProccessFallingItem(bombId)
{
	if (activeBombs[bombId] == true)
	{
		bombsTop[bombId]++;
		if (bombsTop[bombId] == 100 - (BOMB_DIMENSION_PERC + BORDER_LIMIT_PERC))
			activeBombs[bombId] = false;
	}
}

function SaveToCSS(bombId)
{
	var bomb = document.getElementById("bomb" + (bombId + 1));
	bomb.style.top = bombsTop[bombId] + "%";
	bomb.style.left = bombsLeft[bombId] + "%";
	if ((activeBombs[bombId] == true))
		bomb.style.display = "block";
	else
		bomb.style.display = "none";
}

function MainLoop()
{
	setTimeout(function () { MainLoop(); }, REFRESH_RATE_MS);
		
	if (!isPaused)
	{
		var bombGenerated = false;
		for (var i = 0;i < 5;i++)
		{
			if (!bombGenerated)
				if (loopRepeats % REFRESHES_BEETWEEN_BOMBS == 0)
					bombGenerated = GenerateBomb(i);
			
			ProccessFallingItem(i);
			SaveToCSS(i);
		}
		
		if (playerCommand == PlayerCommand.GoRight)
		{
				if (currentPlayerLeftPerc < 100 - (PLAYER_WIDTH_PERC + BORDER_LIMIT_PERC))
					currentPlayerLeftPerc++;
		}
		else if (playerCommand == PlayerCommand.GoLeft)
		{
				if (currentPlayerLeftPerc > BORDER_LIMIT_PERC)
					currentPlayerLeftPerc--;
		}
		
		document.getElementById("player").style.left = currentPlayerLeftPerc + "%";
		
		loopRepeats++;
	}
}

function isCollide(a, b)
{
    return !(((a.y + a.height) < (b.y)) || (a.y > (b.y + b.height)) || ((a.x + a.width) < b.x) || (a.x > (b.x + b.width)));
}

function AddEventListeners()
{
	document.getElementById("aRight").addEventListener("mousedown", function () { playerCommand = PlayerCommand.GoRight; });
	document.getElementById("aLeft").addEventListener("mousedown", function () { playerCommand = PlayerCommand.GoLeft; });
	
	document.getElementById("aRight").addEventListener("mouseup", function () { playerCommand = PlayerCommand.DontMove; });
	document.getElementById("aLeft").addEventListener("mouseup", function () { playerCommand = PlayerCommand.DontMove; });
	
	document.getElementById("aRight").addEventListener("mouseout", function () { playerCommand = PlayerCommand.DontMove; });
	document.getElementById("aLeft").addEventListener("mouseout", function () { playerCommand = PlayerCommand.DontMove; });
	
	document.getElementById("ppButton").addEventListener("click", function () { PauseGame(); });
	document.getElementById("rsButton").addEventListener("click", function () { RestartGame(); });
}
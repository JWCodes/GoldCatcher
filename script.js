PlayerCommand = { DontMove : 0, GoRight : 1, GoLeft : 2 };

var BORDER_LIMIT_PERC = 1;
var REFRESH_RATE_MS = 42;
var REFRESHES_BEETWEEN_FALLS = 60;
var BOMB_DIMENSION_PERC = 10;
var PLAYER_WIDTH_PERC = 20;
var PLAYER_HEIGHT_PERC = 16;
var PLAYER_Y = 21;
var BOMBS_COUNT = 5;

var isPaused = false;
var playerCommand;
var currentPlayerLeftPerc;
var loopRepeats;
var fallingItems = [0,0,0,0,0,0,0,0];

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
	
	for (var i = 0;i < BOMBS_COUNT;i++)
	{
		fallingItems[i] = new Object();
		fallingItems[i].Top = 0;
		fallingItems[i].Left = 0;
		fallingItems[i].Active = false;
		SaveToCSS(i);
	}
	
	document.getElementById("player").style.left = currentPlayerLeftPerc + "%";
}

function GenerateItem(itemId)
{
	if (itemId > BOMBS_COUNT)
		return false;
		
	if (fallingItems[itemId].Active == false)
	{
		fallingItems[itemId].Top = 0;
		fallingItems[itemId].Left = Math.floor(Math.random() * (100 - (BOMB_DIMENSION_PERC + (2 * BORDER_LIMIT_PERC)))) + BORDER_LIMIT_PERC;
		fallingItems[itemId].Active = true;
		return true;
	}
	return false;
}

function ProccessFallingItem(itemId)
{
	if (fallingItems[itemId].Active == true)
	{
		fallingItems[itemId].Top++;
		if (fallingItems[itemId].Top == 100 - (BOMB_DIMENSION_PERC + BORDER_LIMIT_PERC))
			fallingItems[itemId].Active = false;
	}
}

function SaveToCSS(itemId)
{
	var item = document.getElementById("bomb" + (itemId + 1));
		
	item.style.top = fallingItems[itemId].Top + "%";
	item.style.left = fallingItems[itemId].Left + "%";
	
	if ((fallingItems[itemId].Active == true))
		item.style.display = "block";
	else
		item.style.display = "none";
}

function MainLoop()
{
	setTimeout(function () { MainLoop(); }, REFRESH_RATE_MS);
		
	if (!isPaused)
	{	
		ProccessGameLogics();
		ProccessPlayerMovement();
		loopRepeats++;
	}
}

function ProccessGameLogics()
{
	for (var i = 0;i < BOMBS_COUNT - 1;i++);
	{
		var bombGenerated = false;
		if ((!bombGenerated))
				bombGenerated = GenerateItem(i);
				
		ProccessFallingItem(i);
		SaveToCSS(i);
	}
}

function ProccessPlayerMovement()
{
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
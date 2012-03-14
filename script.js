Message = { NoMessage : 0, GoRight : 1, GoLeft : 2 };

var message;
var currentPlayerLeftPerc = 40;

function Start()
{
	AddEventListeners();
	MainLoop();
}

function MainLoop()
{
	setTimeout(function () { MainLoop() }, 42);
	
	switch (message)
	{
		case Message.GoRight:
			if (currentPlayerLeftPerc < 90)
				currentPlayerLeftPerc++;
		break;
		case Message.GoLeft:
			if (currentPlayerLeftPerc > 1)
				currentPlayerLeftPerc--;
		break;
	}
	
	document.getElementById("player").style.left = currentPlayerLeftPerc + "%";
}

function AddEventListeners()
{
	document.getElementById("aRight").addEventListener("mousedown", function () { message = Message.GoRight; });
	document.getElementById("aLeft").addEventListener("mousedown", function () { message = Message.GoLeft; });
	
	document.getElementById("aRight").addEventListener("mouseup", function () { message = Message.NoMessage; });
	document.getElementById("aLeft").addEventListener("mouseup", function () { message = Message.NoMessage; });
	
	document.getElementById("aRight").addEventListener("mouseout", function () { message = Message.NoMessage; });
	document.getElementById("aLeft").addEventListener("mouseout", function () { message = Message.NoMessage; });
}
Message = { NoMessage : 0, GoRight : 1, GoLeft : 2 };

var message;
var currentPlayerLeftPerc = 40;

function Start()
{
	AddEventListeners();
	setTimeout(function () { GenerateBomb(); }, 3000);
	MainLoop();
}

function GenerateBomb()
{
	setTimeout(function () { GenerateBomb(); }, 3000);
	
	var bomb1 = document.getElementById("bomb1");
	var bomb2 = document.getElementById("bomb2");
	var bomb3 = document.getElementById("bomb3");
	var bomb4 = document.getElementById("bomb4");
	var bomb5 = document.getElementById("bomb5");
	
	if (bomb1.style.top == "1%")
	{
		bomb1.style.left = Math.floor(Math.random() * 101) + "%";
		return;
	}
	else if (bomb2.style.top == "0%")
	{
		bomb2.style.left = Math.floor(Math.random() * 101) + "%";
		return;
	}
	else if (bomb3.style.top == "0%")
	{
		bomb3.style.left = Math.floor(Math.random() * 101) + "%";
		return;
	}
	else if (bomb4.style.top == "0%")
	{
		bomb4.style.left = Math.floor(Math.random() * 101) + "%";
		return;
	}
	else if (bomb5.style.top == "0%")
	{
		bomb5.style.left = Math.floor(Math.random() * 101) + "%";
		return;
	}
}

function MainLoop()
{
	setTimeout(function () { MainLoop(); }, 42);
	
	switch (message)
	{
		case Message.GoRight:
			if (currentPlayerLeftPerc < 79)
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
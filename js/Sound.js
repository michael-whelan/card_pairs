var Sound=function ()
{
		
};


Sound.prototype.playBoop = function()
{
	var boop = new Audio("assets/boop.wav");

  boop.play();
};


Sound.prototype.playWin = function()
{
	var winAudio = new Audio("assets/victory.wav");

    winAudio.play();
};

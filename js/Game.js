var canvas, ctx;


function Game (){
	this.winnings = 0;
	this.reset()
}

Game.prototype.reset = function(){
	this.state = "start";
	this.betval = 0;
	this.cardHolder = [];
	this.xinit =100;
	this.yinit = 100;
	var that = this;
	this.flipped = [];
	this.timer =120;
	this.endMessage = "";
}
Game.prototype.initWorld = function(){
	var numCards = 24;
	var across=8;
	var down=3;
	var count=0;
	var selCards = this.fillCards(numCards);
	var x = this.xinit;
	var y = this.yinit;
	for(var i =0; i < down; ++i){
		for(var j = 0; j < across; ++j){
			var card = new Card(x,y,count,selCards[count]);
			this.cardHolder.push(card);
			x = (j+1)*60+this.xinit;
			++count;
		}
		x = this.xinit;
		y = (i+1)*95+this.yinit; 		
	}

	this.startTimer();
}



Game.prototype.initCanvas=function () { 
	canvas = document.createElement('canvas'); 
	ctx = canvas.getContext('2d'); 
	document.body.appendChild(canvas);
	//set canvas to size of the screen.
	canvas.width = 900; 
	canvas.height = 500;
	canvas.addEventListener("mousedown",updateTouch,false);
}

Game.prototype.startTimer = function() {
	setInterval(function () {
		if(game.timer > 0){
			--game.timer;
		}
			
    }, 1000);
}


Game.prototype.fillCards=function(numCards){
	var suits = new Array("H", "C", "S", "D");
	var cards = new Array();

	var cnt = 0;
	for(i=0; i<4; ++i){
		for(j=1; j<=13; ++j){
			cards[++cnt] = suits[i] + j;
		}
	}

	var selectCards = [];
	for(var i =0; i < numCards/2; ++i){
		var ret = this.getRandCard(cards);
		var card = ret[0];
		selectCards.push(card);
		selectCards.push(card);

		cards.splice(ret[1],1);
	}

	return this.shuffle(selectCards);
}


Game.prototype.getRandCard=function (selection) {
	var card =  Math.floor(Math.random() * (selection.length - 1) ) + 1;
	return [selection[card],card];
}


Game.prototype.shuffle=function (a) {
	 var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


function updateTouch(e){ 
	if(game.flipped.length <2){
		for(var i = 0; i < game.cardHolder.length; ++i){
			var card = game.cardHolder[i];
			if(e.clientX > card.x && e.clientX < card.x+card.width){
				if(e.clientY > card.y && e.clientY < card.y+card.height){
					card.flip = true;
					if(!(game.flipped.indexOf(card) > -1)){
						game.flipped.push(card);
					}

					if(game.flipped.length ==2){
						if(card.type == game.flipped[0].type){
							game.updateScore();
						}
					}
				}
			}
		}
	}
} 



Game.prototype.updateScore = function(){
	for(var i = 0; i < this.flipped.length; ++i){
		var card = this.flipped[i];
		console.log(card);
		this.cardHolder.splice(this.cardHolder.indexOf(card),1);
	}
	this.flipped = [];
}


Game.prototype.doWin= function(){
	this.state="end";
	this.endMessage = "Well done you have won "+this.betval*2;
	this.winnings += this.betval*2;
}





var countdown = 50;
Game.prototype.update = function(){
	if(this.state == "game"){
		var flipTimer;
		if(this.flipped.length > 1){
			flipTimer = true;
		}
		if(flipTimer){
			--countdown;
		}
		if(countdown< 0){
			countdown = 50;
			flipTimer=false;
			while(this.flipped.length > 0){
				this.flipped[0].flip = false;
				this.flipped.shift();
			} 
		}

		if(this.cardHolder.length <=0){
			this.doWin();
		}
		else if(this.timer <=0){
			this.state="end";
			this.endMessage = "You lose. Yopu are out of time";
		}



		//remove
		if(KeyController.isKeyDown(Key.SPACE)){
			this.doWin();
		}

	}
	else if(this.state == "start"){
		if(KeyController.isKeyDown(Key.UP)){
			++this.betval;
		}
		else if (KeyController.isKeyDown(Key.DOWN) && this.betval > 0){
			--this.betval;	
		}


		if(this.betval > 0 && KeyController.isKeyDown(Key.ENTER)){
			this.state = "game";
			this.initWorld();
			this.winnings -= this.betval
		}
	}
	else if(this.state == "end"){
		if(KeyController.isKeyDown(Key.ENTER)){
			this.reset();
		}
	}
}



Game.prototype.gameLoop = function (){
   var GAME_RUNNING=0;
	  game.update();
	  game.draw();
	  
	  window.requestAnimFrame(game.gameLoop);
}

Game.prototype.draw =function (){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.font = 'italic 40pt Calibri';
	ctx.textBaseline = "top";
	ctx.lineWidth = 4;
	ctx.strokeRect(10,10,800,400);
	if(this.winnings > -1){
		ctx.fillStyle=rgb(0,0,0);
	}else{
		ctx.fillStyle=rgb(255,0,0);
	}
	ctx.fillText("Winnings: "+ this.winnings,690,100, 110,20);
	if(this.state == "game"){
		ctx.fillStyle=rgb(0,0,0);
		ctx.fillText(this.timer,770,20, 30,20);
		ctx.fillText("Bet: "+ this.betval,750,60, 50,20);
		for(var i =0; i < this.cardHolder.length; ++i){
			this.cardHolder[i].draw(ctx);
		}
	}
	else if(this.state == "start"){
		ctx.fillStyle=rgb(0,0,0);
		ctx.fillText("Select a bet and press enter",250,200, 250,20);
		ctx.fillText("Bet: "+ this.betval,250,240, 50,20);
	}
	else if(this.state == "end"){
		ctx.fillStyle=rgb(0,0,0);
		ctx.fillText(this.endMessage,250,200, 250,20);
		ctx.fillText("Press Enter to play again",250,260, 250,20);
	}
}


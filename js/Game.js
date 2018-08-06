var canvas, ctx;


function Game (){
	this.cardHolder = [];
	this.xinit =100;
	this.yinit =50;
	var that = this;
	this.flipped = [];
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
			//x = (j+2)*50)+10;
			x = (j+1)*60+this.xinit;
			++count;
		}
		x = this.xinit;
		y = (i+1)*95+50; 		
	}
	console.log(this.cardHolder);
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


Game.prototype.initCanvas=function () { 
	canvas = document.createElement('canvas'); 
	ctx = canvas.getContext('2d'); 
	document.body.appendChild(canvas);
	//set canvas to size of the screen.
	canvas.width = window.innerWidth -20; 
	canvas.height = window.innerHeight - 200;
	canvas.addEventListener("mousedown",updateTouch,false);
}

function updateTouch(e){ 
	if(game.flipped.length <2){
		for(var i = 0; i < game.cardHolder.length; ++i){
			var card = game.cardHolder[i];
			if(e.clientX > card.x && e.clientX < card.x+card.width){
				if(e.clientY > card.y && e.clientY < card.y+card.height){
					card.flip = true;
					game.flipped.push(card);
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



var countdown = 80;
Game.prototype.update = function(){
	var startTimer;
	if(this.flipped.length > 1){
		startTimer = true;
	}
	if(startTimer){
		--countdown;
	}
	if(countdown< 0){
		countdown = 80;
		startTimer=false;
		while(this.flipped.length > 0){
			this.flipped[0].flip = false;
			this.flipped.shift();
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
	ctx.fillStyle=rgb(255,0,0);
	ctx.lineWidth = 4;
	ctx.strokeRect(10,10,800,400);
	for(var i =0; i < this.cardHolder.length; ++i){
		this.cardHolder[i].draw(ctx);
	}
}


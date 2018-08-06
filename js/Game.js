var canvas, ctx;


function Game (){
	this.cardHolder = [];
	this.xinit =100;
	this.yinit =50;
}

Game.prototype.initWorld = function(){
	var numCards = 21;
	var across=7;
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
	for(var i =0; i < numCards; ++i){
		var card =  Math.floor(Math.random() * (52 - 1) ) + 1;
		selectCards.push(cards[card]);
	}
	return selectCards;
}


Game.prototype.getRandCard=function () {
	var card =  Math.floor(Math.random() * (52 - 1) ) + 1;
	return this.cards[card];
}


Game.prototype.initCanvas=function () { 
	canvas = document.createElement('canvas'); 
	ctx = canvas.getContext('2d'); 
	document.body.appendChild(canvas);
	//set canvas to size of the screen.
	canvas.width = window.innerWidth -20; 
	canvas.height = window.innerHeight - 200;
	canvas.addEventListener("mousedown",mouseClick,false);
}

function mouseClick(e){ 
	console.log(e.clientX, e.clientY);

} 


Game.prototype.update = function(){

}



Game.prototype.gameLoop = function (){
   var GAME_RUNNING=0;
	  game.update();
	  game.draw();
	  
	  window.requestAnimFrame(game.gameLoop);
}

Game.prototype.draw =function (){

	ctx.font = 'italic 40pt Calibri';
	ctx.textBaseline = "top";

	ctx.fillStyle=rgb(255,0,0);
	ctx.lineWidth = 4;
	ctx.strokeRect(10,10,800,400);
	for(var i =0; i < this.cardHolder.length; ++i){
		this.cardHolder[i].draw(ctx);
	}
		//this.player.draw(ctx);	
		//this.brickR[i].draw(ctx);


}


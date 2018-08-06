var Card = function(x,y,index,type){
	this.x =x;
	this.y = y;
	this.type = type;
	this.width = 50;
	this.height = 85;
}



Card.prototype.draw = function(ctx){
	ctx.fillStyle=rgb(255,0,0);	
	ctx.fillRect(this.x,this.y,this.width,this.height);
};


Card.prototype.update = function(){
	
}
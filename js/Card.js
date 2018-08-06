var Card = function(x,y,index,type){
	this.x =x;
	this.y = y;
	this.type = type;
	this.width = 50;
	this.height = 85;
	this.flip = false;
	this.index =index;
}


Card.prototype.draw = function(ctx){
	ctx.fillStyle=rgb(255,0,0);	
	ctx.fillRect(this.x,this.y,this.width,this.height);
	if(this.flip){
		ctx.fillStyle=rgb(0,0,0);
		ctx.fillText(this.type,this.x,this.y, 30,20);
	}
};


Card.prototype.update = function(){
	
}
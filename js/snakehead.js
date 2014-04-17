function SnakeHead(x,y){
	this.x=x;
	this.y=y;
	this.previous = null;
}
SnakeHead.prototype = Object.create(SnakePart.prototype);
SnakeHead.prototype.ySpeed = -16;

SnakeHead.prototype.updatePosition = function(){
	this.x += this.xSpeed;
	this.y += this.ySpeed;
}
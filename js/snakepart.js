function SnakePart(x,y,prev){
	this.x = x;
	this.y = y;
	this.previous = prev;
}
SnakePart.prototype = Object.create(GameObject.prototype);
SnakePart.prototype.color = "#000000";
SnakePart.prototype.type = 'snake';

SnakePart.prototype.updatePosition = function(){
	this.x = this.previous.x;
	this.y = this.previous.y;
	
	
};
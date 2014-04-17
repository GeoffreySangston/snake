function Apple(x,y){
	this.x=x;
	this.y=y;
}
Apple.prototype = Object.create(GameObject.prototype);
Apple.prototype.color = "#FF0000";
Apple.prototype.type = 'apple';
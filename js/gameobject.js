function GameObject(){
	this.x = 0;
	this.y = 0;
}

GameObject.prototype.width = 16;
GameObject.prototype.height = 16;
GameObject.prototype.color = "";
GameObject.prototype.xSpeed = 0;
GameObject.prototype.ySpeed = 0;

GameObject.prototype.collides = function(gameObject){
	return (this.x == gameObject.x && this.y == gameObject.y);
};

GameObject.prototype.updatePosition = function(){

};
function Renderer(gameWindow,gameContext){
	this.canvas = gameWindow;
	this.context = gameContext;
}
var drawn = false;
Renderer.prototype.draw = function(object){
	this.context.fillStyle = object.color;
	this.context.fillRect(object.x,object.y,object.width,object.height);

	
}
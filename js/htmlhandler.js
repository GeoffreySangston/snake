function HTMLHandler(){
	this.gameWindow = document.querySelector("canvas");
	this.gameContext = this.gameWindow.getContext("2d");
}

HTMLHandler.prototype.setGameSize = function(x,y){
	this.gameWindow.width = x;
	this.gameWindow.height = y;
};
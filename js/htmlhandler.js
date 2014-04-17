function HTMLHandler(){
	this.gameWindow = document.querySelector("#canvas");
	this.gameContext = this.gameWindow.getContext("2d");
	
	this.scoreDisplay = document.querySelector("#page-score");
}

HTMLHandler.prototype.setGameSize = function(x,y){
	this.gameWindow.width = x;
	this.gameWindow.height = y;
};

HTMLHandler.prototype.updateScore = function(score){
	this.scoreDisplay.innerText = score;
};
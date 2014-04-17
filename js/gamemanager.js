function GameManager(HTMLHandler,InputHandler,Renderer){
	this.TILESWIDE = 30;
	this.TILESHIGH = 30;
	this.GAMEWIDTH = GameObject.prototype.width*this.TILESWIDE;
	this.GAMEHEIGHT = GameObject.prototype.height*this.TILESHIGH;

	this.htmlHandler = new HTMLHandler;
	this.inputHandler = new InputHandler;
	this.renderer = new Renderer(this.htmlHandler.gameWindow,this.htmlHandler.gameContext);
	
	this.inputHandler.on("turn",this.turn.bind(this));
	
	this.lose;
	this.gameObjects;
	this.SNAKEHEADINDEX = 0;
	this.SNAKETAILINDEX = 0;
	
	this.collisions;
	this.good = true;
	
	
	this.htmlHandler.setGameSize(this.GAMEWIDTH,this.GAMEHEIGHT);
	
	this.start();

	
}

GameManager.prototype.objectInPlay = function(object){
	return ((object.x >= 0 && object.x+object.width <= this.GAMEWIDTH) && (object.y >= 0 && object.y+object.height <= this.GAMEHEIGHT));
};

GameManager.prototype.turn = function(key){
	switch(key){
		case this.inputHandler.UP:
			if(!(this.gameObjects[this.SNAKEHEADINDEX].ySpeed == 16)){
				this.gameObjects[this.SNAKEHEADINDEX].xSpeed = 0;
				this.gameObjects[this.SNAKEHEADINDEX].ySpeed = -16;
			}
			break;
		case this.inputHandler.RIGHT:
			if(!(this.gameObjects[this.SNAKEHEADINDEX].xSpeed == -16)){
				this.gameObjects[this.SNAKEHEADINDEX].xSpeed = 16;
				this.gameObjects[this.SNAKEHEADINDEX].ySpeed = 0;
			}
			break;
		case this.inputHandler.DOWN:
			if(!(this.gameObjects[this.SNAKEHEADINDEX].ySpeed == -16)){
				this.gameObjects[this.SNAKEHEADINDEX].xSpeed = 0;
				this.gameObjects[this.SNAKEHEADINDEX].ySpeed = 16;
			}
			break;
		case this.inputHandler.LEFT:
			if(!(this.gameObjects[this.SNAKEHEADINDEX].xSpeed == 16)){
				this.gameObjects[this.SNAKEHEADINDEX].xSpeed = -16;
				this.gameObjects[this.SNAKEHEADINDEX].ySpeed = 0;
			}
			break;
	}
};


GameManager.prototype.start = function(){
	this.setup();
	this.gameloop();
};

GameManager.prototype.setup = function(){
	this.startTime = Date.now()
	this.ticks = 0;

	this.gameObjects = [];
		
	this.collisions = [];

	this.lose = false;
	this.score = 0;
	
	this.SNAKEHEADINDEX = 0;
	this.SNAKETAILINDEX = 0;
	
	this.gameObjects.push(new SnakeHead(this.GAMEWIDTH/2,this.GAMEHEIGHT/2));
	
	this.addNewApple();

	
	
};

GameManager.prototype.gameloop = function(){
	this.htmlHandler.gameContext.clearRect(0,0,this.GAMEWIDTH,this.GAMEHEIGHT);
	if(this.lose){
		this.start();
	}
	
	if((Date.now() - this.startTime)/16.66 >= 1 + this.ticks){
		this.gameLogic();
		
		this.ticks++;
	}
	this.render();
	window.requestAnimationFrame(this.gameloop.bind(this));
};


GameManager.prototype.updatePositions = function(){
	if(this.ticks%3 == 0){
		for(var i = this.gameObjects.length-1; i >= 0; i--){
	
			this.gameObjects[i].updatePosition();

		}
	}
};

GameManager.prototype.checkCollisions = function(){
	for(var i = this.gameObjects.length-1; i > 0; i--){
		if(this.gameObjects[i].collides(this.gameObjects[this.SNAKEHEADINDEX])){
			this.collisions.push({type: this.gameObjects[i].type, objectIndex: i});
		}
	}
	if(!this.objectInPlay(this.gameObjects[this.SNAKEHEADINDEX])){
		this.collisions.push({type: 'wall', objectIndex: -1});
	}
};
GameManager.prototype.actCollisions = function(){
	for(var i = this.collisions.length-1; i >= 0; i--){
		if(this.collisions[i].type == 'apple'){
			this.gameObjects[this.collisions[i].objectIndex].x = -5000;
			this.score++;
			
			this.gameObjects.splice(this.collisions[i].objectIndex,1);
			this.addNewApple();
			
			this.addNewSnakePart();
			
		} else if(this.collisions[i].type == 'snake') {
			if(this.score > 1){
				this.lose = true;
			}
		} else if(this.collisions[i].type =='wall'){
			this.lose = true;
		}
	}
	this.collisions.length = 0;
};

GameManager.prototype.addNewApple = function(){
	var x = 16*Math.floor((Math.random()*this.TILESWIDE)+0);
	var y = 16*Math.floor((Math.random()*this.TILESHIGH)+0);
	
	this.gameObjects.push(new Apple(x,y));
};

GameManager.prototype.addNewSnakePart = function(){
	this.gameObjects.push(new SnakePart(this.gameObjects[this.SNAKETAILINDEX].x,this.gameObjects[this.SNAKETAILINDEX].y,this.gameObjects[this.SNAKETAILINDEX]));
	this.SNAKETAILINDEX = this.gameObjects.length-1-1; // the extra - one is to account for the apple which will be spliced out therefore subtracting by one
	
};


GameManager.prototype.gameLogic = function(){
	this.checkCollisions();
	this.actCollisions();
	this.updatePositions()
};
GameManager.prototype.render = function(){
	for(var i = this.gameObjects.length-1; i >= 0; i--){
	
		this.renderer.draw(this.gameObjects[i]);

	}
};

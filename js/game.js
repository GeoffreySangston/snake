// makes it wait for browser to load to render
window.requestAnimationFrame(function() {
	new GameManager(HTMLHandler,InputHandler,Renderer);
});
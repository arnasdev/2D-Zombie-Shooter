/* Player Object */
function Player(xPos, yPos, pWidth, pHeight)
{
    /* private member variables */
	
    var x = xPos;
    var y = yPos;
	var width = pWidth;
	var height = pHeight;
	
	var acc = 2;
	
	var velY = 0;
    var velX = 0;
	
    var speed = 2; // max speed
    var friction = .97; // friction
	

    /* public methods */
    this.move = move;
    function move()
    {
		if(map[37] && map[38]){ 	// left && up
			if(velX > 0 || velY > 0){
				velX = -5;
				velY = -5;
			}
			if (velX > -speed && velY > -speed) {
				velX = velX - acc;
				velY = velY - acc;
			}
		}
		else if(map[38] && map[39]){ 	// right && up
			if(velX < 0 || velY > 0){
				velX = 0;
				velY = 0;
			}
			if (velX < speed && velY > -speed) {
				velX = velX + acc;
				velY = velY - acc;
			}
		}
		else if(map[37] && map[40]){ 	// left && down
			if(velX > 0 || velY < 0){
				velX = 0;
				velY = 0;
			}
			if (velX > -speed && velY < speed) {
				velX = velX - acc;
				velY = velY + acc;
			}
		}
		else if(map[39] && map[40]){ 	// right && down
			if(velX < 0 || velY < 0){
				velX = 0;
				velY = 0;
			}
			if (velX < speed && velY < speed) {
				velX = velX + acc;
				velY = velY + acc;
			}
		}
		
		else if(map[37]){ 					// left
			if(velX > 0){
				velX = 0;
			}
			if (velX > -speed) {
				velX = velX - acc;
			}
		}
		else if(map[39]){ 				// right
			if(velX < 0){
				velX = 0;
			}
			if (velX < speed) {
				velX = velX + acc;
			}
		}
		else if(map[38]){ 				// up
			if(velY > 0){
				velY = 0;
			}
			if (velY > -speed) {
				velY = velY - acc;
			}
		}
		else if(map[40]){ 				// down
			if(velY < 0){
				velY = 0;
			}
			if (velY < speed) {
				velY = velY + acc;
			}
		}
		
    }

    this.destroy = destroy;
    function destroy(){
		
    }

    this.draw = draw;
    function draw(){
		fctx.fillStyle = "#ff9922";
        fctx.fillRect(x-1, y-1, width, height);
        
    }

    this.setX = setX;
    function setX(newX){
        x = newX;
    }

	this.setY = setY;
    function setY(newY){
        y = newY;
    }
	
    this.getX = getX;
    function getX(){
        return x;
    }

    this.getY = getY;
    function getY(){
        return y;
    }
	
	// Updates players position
	this.updatePlayer = updatePlayer;
	function updatePlayer(){
		// apply some friction to y velocity.
		velY *= friction;
		y += velY;

		// apply some friction to x velocity.
		velX *= friction;
		x += velX;
		
	}
	
	// Called whenever we want to change directions quickly
	function resetVelocity(){
		velX = 0;
		velY = 0;
	}
	
}
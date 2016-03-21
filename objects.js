/* Player Object */
function Player(xPos, yPos, pWidth, pHeight)
{
    /* private member variables */
	
    var x = (xPos-1)*64;
    var y = (yPos-1)*64;
	var width = pWidth;
	var height = pHeight;
	var playerImage = 5;
	
	var acc = .1;
	
	var velY = 0;
    var velX = 0;
	
    var speed = 1; // max speed
    var friction = .97; // friction
	

    /* public methods */
    this.move = move;
    function move()
    {	
		/*
			if(velX < 0 || velY > 0){
				velX = 0;
				velY = 0;
			}
		*/
		
		if(map[37] && map[38]){ 	// left && up
			if (velX > -speed && velY > -speed) {
				velX -= acc;
				velY -= acc;
			}
		}
		if(map[38] && map[39]){ 	// right && up
			if (velX < speed && velY > -speed) {
				velX += acc;
				velY -= acc;
			}
		}
		if(map[37] && map[40]){ 	// left && down
			if (velX > -speed && velY < speed) {
				velX -= acc;
				velY += acc;
			}
		}
		if(map[39] && map[40]){ 	// right && down
			if (velX < speed && velY < speed) {
				velX += acc;
				velY += acc;
			}
		}
		
		if(map[37]){ 					// left
			if (velX > -speed) {
				velX -= acc;
			}
		}
		if(map[39]){ 				// right
			if (velX < speed) {
				velX += acc;
			}
		}
		if(map[38]){ 				// up
			if (velY > -speed) {
				velY -= acc;
			}
		}
		if(map[40]){ 				// down
			if (velY < speed) {
				velY += acc;
			}
		}
		updatePlayer();
    }

    this.destroy = destroy;
    function destroy(){
		
    }

    this.draw = draw;
    function draw(){
		var tile = 4;
		var tileRow = (tile / imageNumTiles) | 0; // Bitwise OR operation
		var tileCol = (tile % imageNumTiles) | 0;
				
		
		fctx.drawImage(tileset, 
							 (tileCol * tileSize), 
							 (tileRow * tileSize), 
							 tileSize, 
							 tileSize, 
							 (x), 
							 (y), 
							 tileSize, 
							 tileSize);
        //fctx.fillRect(x, y, width, height);
		//console.log("X: "+x+"\nY: "+y);
        
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
		// Make movement
		
			
		var nextX = x + velX;
		var nextY = y + velY;
		
		if(collisionTest(nextX,nextY)){
			y += velY;
			x += velX;
		}
		
		velY *= friction;
		velX *= friction;
		
		//y += velY;
		//x += velX;
		// Apply frictions
		
		
	}
	
	// Called whenever we want to change directions quickly
	function resetVelocity(){
		velX = 0;
		velY = 0;
	}
	
}

function collisionTest(xPos, yPos){
	xPos = parseInt(xPos/64);
	yPos = parseInt(yPos/64);
	
	if(mapData[xPos][yPos] == 1){
		console.log("X: "+xPos+"\nY: "+yPos);
		
		/*
		resetVelocity();
		x = xPos+1;
		y = yPos+1;
		updatePlayer();
		*/
		return false;
	}
	return true;
}

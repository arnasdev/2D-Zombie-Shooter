/* Bullet Object */
function Bullet(velX, velY, damage, fade){
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
							 width, 
							 height);
	}
}

/* Weapon Object */
function Weapon(fireRate, damage, automatic, soundPath){
	// fireRate
	// 1.00: Semi-automatic (shot and stop)
	// 0.05: Minigun like  
	// Values are between 0 and 1
	var fireRate = fireRate;
	var damage = damage;
	var automatic = automatic;
	
	var sounds = [];
	var index = 0;
	
	for (var i = 0; i < 4; i++){
		sounds.push(new Audio(soundPath));
	} 
	
	this.getfireRate = getfireRate;
    function getfireRate(){
        return fireRate;
    }
	
	this.getAutomatic = getAutomatic;
    function getAutomatic(){
        return automatic;
    }

	this.fire = fire;
	function fire(){
		playSoundEvent();
	}
	
	function playSoundEvent() {
		if (window.chrome) sounds[index].load()
		sounds[index].play()
		index = (index + 1) % sounds.length
	}
}

/* Player Object */
function Player(xPos, yPos, pWidth, pHeight)
{
    /* private member variables */
    var x = (xPos)*64;
    var y = (yPos)*64;
	var width = pWidth;
	var height = pHeight;
	var playerImage = 5;
	var weapon = shotgun;
	
	var acc = .2;
	
	var velY = 0;
    var velX = 0;
	
    var speed = 1; // max speed
    var friction = .97; // friction
	

    /* public methods */
    this.move = move;
    function move()
    {	
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
	
	this.checkShoot = checkShoot;
    function checkShoot(){
		// If the left mouse button is clicked
		if(mouseMap[1]){
			// Single fire
			if(weapon.getAutomatic() == false){
				if(typeof singlefireInterval == 'undefined' || singlefireInterval == null){
					shoot();
					singlefireInterval = setInterval(singleFireInterval, weapon.getfireRate() * 1000);
				}
				
			}
			
			// Allows rapid firing of non semi-automatic weapons
			if(weapon.getAutomatic() == true){
				if(typeof singlefireInterval == 'undefined' || singlefireInterval == null){
					shoot();
					automaticInterval = setInterval(shoot, weapon.getfireRate() * 1000);
				}
			}
		}
		// If the left mouse button is not clicked, rapid firing stops
		else{
			if(automaticInterval != null){
				clearInterval(automaticInterval);
				automaticInterval = null;
				
				// Stops automatic weapons being able to fire straight away after you let go of the mouse button
				singlefireInterval = setInterval(singleFireInterval, weapon.getfireRate() * 1000);
			}
		}
	}
	
	this.singleFireInterval = singleFireInterval;
	function singleFireInterval(){
		clearInterval(singlefireInterval);
		singlefireInterval = null;
	}
	
	this.shoot = shoot;
	function shoot(){
		weapon.fire();
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
					  width, 
					  height);
        
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
	
	this.setWeapon = setWeapon;
	function setWeapon(newWeapon){
		weapon = newWeapon;
	}
	
	// Updates players position
	this.updatePlayer = updatePlayer;
	function updatePlayer(){
		// Make movement
		if(velX != 0 || velY != 0){
			var nextX = x + velX;
			var nextY = y + velY;
			
			if(collisionTest(nextX,nextY)){
				y += velY;
				x += velX;
				
				velY *= friction;
				velX *= friction;
				
				// Since velocity gets infinitely smaller to 0, need to reset it at some point
				if(velX > 0){
					if(velX < .1){
						velX = 0;
					}
				}
				else{
					if((-1* velX) < .1){
						velX = 0;
					}
				}
				if(velY > 0){
					if(velY < .1){
						velY = 0;
					}
				}
				else{
					if((-1* velY) < .1){
						velY = 0;
					}
				}
			}	
		}
	}
	
	// Called whenever we want to stop movement
	function resetVelocity(){
		resetXVelocity();
		resetYVelocity();
		
	}
	
	function resetXVelocity(){
		velX = 0;
	}
	
	function resetYVelocity(){
		velY = 0;
	}
	
	function realToTile(realCoordX, realCoordY){
		var tileCoordX = parseInt(realCoordX/64);
		var tileCoordY = parseInt(realCoordY/64);
		
		var coords = [tileCoordX, tileCoordY];
		return coords;
	}

	function tileToReal(tileCoordX, tileCoordY){
		var realCoordX = tileCoordX * 64;
		var realCoordY = tileCoordY * 64;
		
		var coords = [realCoordX, realCoordY];
		return coords;
	}

	// Pass through the players next position before it updates for collision test
	function collisionTest(xPos, yPos){
		// All coordinates in this function are real coordinates - converted from tile coordinates/passed as parameter
		
		// Player info
		playerX = getX();
		playerY = getY();
		playerWidth = width;
		playerHeight = height;
		
		// Next position info
		tileX = xPos;
		tileY = yPos;
		tileWidth = tileSize;
		tileHeight = tileSize;
		
		
		//var up; //38
		//var down; //40
		//var left; //37
		//var right; // 39
		
		// Next position tile coordinates
		mapCoordX = parseInt(xPos/64);
		mapCoordY = parseInt(yPos/64);
		
		
		var bottomLeft = realToTile(tileX, tileY+playerHeight);
		var bottomRight = realToTile(tileX+playerWidth, tileY+playerHeight);
		var topRight = realToTile(tileX+playerWidth, tileY);
		var topLeft = realToTile(tileX, tileY);
		
		// Collision for bottom left corner
		if(mapData[bottomLeft[0]][bottomLeft[1]] == 1){
			
			xCoord = bottomLeft[0] * 64;	// These coordinates represent the top-left corner of the tile the player is colliding with
			yCoord = bottomLeft[1] * 64;
			
			// Collision below player
			if(playerY+playerHeight < yCoord && playerX > xCoord && playerX < xCoord+tileSize){
				resetYVelocity();
			}
			
			// Collision left of player
			else{
				resetXVelocity();
			}
		}
		
		// Collision for bottom right corner
		if(mapData[bottomRight[0]][bottomRight[1]] == 1){
			
			
			xCoord = bottomRight[0] * 64;	// These coordinates represent the top-left corner of the tile the player is colliding with
			yCoord = bottomRight[1] * 64;
			
			// Collision below player
			if(playerY+playerHeight < yCoord && playerX+playerWidth > xCoord && playerX+playerWidth < xCoord+tileSize){
				resetYVelocity();
			}
			
			// Collision right of player
			else{
				resetXVelocity();
			}
		}
		
		// Collision for top right corner
		if(mapData[topRight[0]][topRight[1]] == 1){
				
			xCoord = topRight[0] * 64;	// These coordinates represent the top-left corner of the tile the player is colliding with
			yCoord = topRight[1] * 64;
			
			// Collision above player
			if(playerX+playerWidth > xCoord && playerY > yCoord && playerX+playerWidth < xCoord+tileSize){
				resetYVelocity();
			}
		
			// Collision right of player
			else{
				resetXVelocity();
			}
		}
		
		// Collision for top left corner
		if(mapData[topLeft[0]][topLeft[1]] == 1){
			
			xCoord = topLeft[0] * 64;	// These coordinates represent the top-left corner of the tile the player is colliding with
			yCoord = topLeft[1] * 64;
			// Collision above player
			if(playerY > yCoord && playerX > xCoord && playerX < xCoord + tileSize){
				resetYVelocity();
			}
			// Collision left of player
			else{
				resetXVelocity();
			}
			
		}
		return true;
	}
	
}


function Zombie(xPos, yPos, zWidth, zHeight, tile){
	/* private member variables */
    var x = (xPos)*64;
    var y = (yPos)*64;
	var width = zWidth;
	var height = zHeight;
	console.log(tile);
	var zombieImage = tile;
	
	var acc = .05;
	
	var velY = 0;
    var velX = 0;
	
    var speed = 2; // max speed
    var friction = .95; // friction
	
	    /* public methods */
    this.move = move;
    function move()
    {	// down
		if(y < characters[0].getY()){
			if (velY < speed) {
				velY += acc;
			}
		}
		//up
		else if(y > characters[0].getY()){
			if (velY > -speed) {
				velY -= acc;
			}
		}
		// right
		if(x < characters[0].getX()){
			if (velX < speed) {
				velX += acc;
			}
		}
		// left
		else if(x > characters[0].getX()){
			if (velX > -speed) {
				velX -= acc;
			}
		}
		updateZombie();
    }

    this.destroy = destroy;
    function destroy(){
		
    }

    this.draw = draw;
    function draw(){
		var tile = zombieImage;
		var tileRow = (tile / imageNumTiles) | 0; // Bitwise OR operation
		var tileCol = (tile % imageNumTiles) | 0;
				
		
		fctx.drawImage(tileset, 
							 (tileCol * tileSize), 
							 (tileRow * tileSize), 
							 tileSize, 
							 tileSize, 
							 (x), 
							 (y), 
							 width, 
							 height);
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
	this.updateZombie = updateZombie;
	function updateZombie(){
		// Make movement
		
		if(velX != 0 || velY != 0){
			var nextX = x + velX;
			var nextY = y + velY;
			
			//if(collisionTest(nextX,nextY)){
				y += velY;
				x += velX;
				
				velY *= friction;
				velX *= friction;
				
				// Since velocity gets infinitely smaller to 0, need to reset it at some point
				if(velX > 0){
					if(velX < acc/2){
						velX = 0;
					}
				}
				else{
					if((-1* velX) < acc/2){
						velX = 0;
					}
				}
				if(velY > 0){
					if(velY < acc/2){
						velY = 0;
					}
				}
				else{
					if((-1* velY) < acc/2){
						velY = 0;
					}
				}
			//}	
		}
	}
	
	return this;
}
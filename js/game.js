
var player;
var cursors;

let planet_size = 50;
var planet_description = init_planet(planet_size);
let pixel_size = 6;
let frame = 1;
let canvas_size = planet_size * pixel_size * frame * 2;
var game = new Phaser.Game(canvas_size, canvas_size, Phaser.CANVAS, 'phaser-example', { create: create, update: update, render: render });


function listener (arg1, arg2, arg3) {

	console.log('listner', arg1, arg2, arg3);
	console.log(arg2.interactiveCandidates.length);
	console.log(arg2.interactiveCandidates);

}

function on_panet_render(arg)
{
	if ( !player)
	{
 		player = game.add.sprite(canvas_size / 2, canvas_size/2, 'planet');
		player.anchor.set(0.5);
    	player.inputEnabled = true;

		// player.events.onInputDown.add(listener, this);
		player.events.onInputUp.add(listener, this);

    	game.physics.arcade.enable(player);
		console.log('on_panet_render', game);
    	// player.events.onInputDown.add(listener, game);
 	}
 	else
 	{
    	player.loadTexture(arg);
    	counter = 0;

 	}
}

function mouseWheel(event) {
  console.log(event);
  if(game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP) {
	planet_description.enchanceScale(1.01);
  } else {
	planet_description.enchanceScale(0.99);
  }
}

function mouseDown(event) {
  console.log(event);
}


function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#2d2d2d';


    let planet_data = planet_description.render();
	game.create.texture('planet', planet_data, pixel_size, pixel_size, 0, true, on_panet_render);
	console.log('create', this);

    cursors = game.input.keyboard.createCursorKeys();

	// game.input.onUp.add(listener, this);

  	// game.input.mouse.mouseWheelCallback = mouseWheel;
  	// game.input.mouse.mouseDownCallback = mouseDown;
  	// game.input.mouse.mouseUpCallback = mouseDown;
}

var counter = 0;



function update() {
	// console.log(counter);
	if (counter == 5)
	{
		let skip = false;
		// console.log('init deformation')
		if (deformation_complete == false)
		{
			// deformate_planet(planet_description);
			// deformate_planet(planet_description);
			// deformate_planet(planet_description);
			// deformate_planet(planet_description);
			// deformate_planet(planet_description);
		}
		// else if (wind_complete == false)
		// {
		// 	wind_planet(planet_description);
		// }
		// else if (water_complete == false)
		// {
		// 	water_planet(planet_description);
		// }
		// else if (chill_complete == false)
		// {
		// 	chill_planet(planet_description);
		// }
		// else if (plant_complete == false)
		// {
		// 	plant_planet(planet_description);
		// }
		else
		{
			skip = true;
		}
		// skip = true;

		if (skip == false && planet_description.render_required)
		{
		    let planet_data = planet_description.render();
			game.create.texture('planet1', planet_data, 6, 6, 0, true, on_panet_render);
			counter++;
		}
	}
	else
	{
		counter++;
	}

    if (cursors.right.isDown)
    {
		planet_description.rotateAlpha(0.01);
	}

    else if (cursors.left.isDown)
    {
		planet_description.rotateAlpha(-0.01);
	}

    if (cursors.up.isDown)
    {
		planet_description.rotateBeta(0.01);
	}

    else if (cursors.down.isDown)
    {
		planet_description.rotateBeta(-0.01);
		// planet_description.enchanceScale(0.99);
		
	}

	// if ( player)
	// {

	//     player.body.velocity.x = 0;
	//     player.body.velocity.y = 0;

	//     if (cursors.left.isDown)
	//     {
	//         player.body.velocity.x = -200;
	//         player.scale.x = 1;
	//     }
	//     else if (cursors.right.isDown)
	//     {

	//         player.body.velocity.x = 200;
	//         player.scale.x = -1;
	//     }

	//     if (cursors.up.isDown)
	//     {
	//         player.body.velocity.y = -200;
	//     }
	//     else if (cursors.down.isDown)
	//     {
	//         player.body.velocity.y = 200;
	//     }
	// }
}

function render() {

    var name = (game.input.activePointer.targetObject) ? game.input.activePointer.targetObject.sprite.key : 'none';

    game.debug.text("Pointer Target: " + name, 32, 32);

}
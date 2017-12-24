"use strict";
var player;
let player_shadow_1;
let player_shadow_2;
let player_shadow_3;
var cursors;

let planet_size = 50;
var planet_description = init_planet(planet_size);
let pixel_size = 6;
let frame = 1;
let canvas_size = planet_size * pixel_size * frame * 2;
var game = new Phaser.Game(canvas_size, canvas_size, Phaser.CANVAS, 'phaser-example', { create: create, update: update, render: render });


function listener (arg1, arg2, arg3) {

	console.log('listner', arg1, arg2, arg3);
	// console.log(arg2.interactiveCandidates.length);
	// console.log(arg2.interactiveCandidates);
	// console.log(arg2.x, arg2.y);
	// console.log(arg2.screenX, arg2.screenY);
	// console.log(arg2.pageX, arg2.pageY);
	// console.log(arg2.pageX, arg2.pageY);

	let dx = (arg2.x - arg1.position.x + arg1.anchor.x * arg1.texture.width * arg1.scale.x) / arg1.scale.x;
	let dy = (arg2.y - arg1.position.y + arg1.anchor.y * arg1.texture.height * arg1.scale.y) / arg1.scale.y;
	let cx = Math.round(dx / pixel_size);
	let cy = Math.round(dy / pixel_size);
	let targets = planet_description.reverse_matrix[cy][cx]
	for (let i = 0; i < targets.length; ++i)
	{
		targets[i].height += 1;
	}
	// planet_description.reverse_matrix[cy][cx].height += 1;
	// console.log(planet_description.reverse_matrix[cy][cx].height);

	console.log(dx, dy);

}

function on_panet_render(arg)
{
	if ( !player)
	{
 		// player = game.add.sprite(0, 0, 'planet');
 		player = game.add.sprite(canvas_size / 2, canvas_size/2, 'planet');
		player.anchor.set(0.5);

    	player.inputEnabled = true;
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

function on_shadow_render_1(arg)
{
	if ( !player_shadow_1)
	{
    	player_shadow_1 = game.add.sprite(canvas_size / 2, canvas_size/2, 'player_shadow_1');
		player_shadow_1.anchor.set(0.5);
		player_shadow_1.alpha = 0.3;


		console.log('on_player_shadow_1_render', game);
 	}
 	else
 	{
    	player_shadow_1.loadTexture(arg);

    	// counter = 0;
 	}
 }

function on_shadow_render_2(arg)
{
	if ( !player_shadow_2)
	{
    	player_shadow_2 = game.add.sprite(canvas_size / 2, canvas_size/2, 'player_shadow_2');
		player_shadow_2.anchor.set(0.5);
		player_shadow_2.alpha = 0.5;


		console.log('on_player_shadow_1_render', game);
 	}
 	else
 	{
    	player_shadow_2.loadTexture(arg);
 	}
 }

function on_shadow_render_3(arg)
{
	if ( !player_shadow_3)
	{
    	player_shadow_3 = game.add.sprite(canvas_size / 2, canvas_size/2, 'player_shadow_3');
		player_shadow_3.anchor.set(0.5);
		player_shadow_3.alpha = 0.7;


		console.log('on_player_shadow_1_render', game);
 	}
 	else
 	{
    	player_shadow_3.loadTexture(arg);
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
	generateTexture(game, 'planet1', planet_data, 6, 6, on_panet_render);
	// game.create.texture('planet', planet_data, pixel_size, pixel_size, 0, true, on_panet_render);
	// game.create.texture('player_shadow_1', planet_description.shadow_matrix_1, pixel_size, pixel_size, 0, true, on_shadow_render_1);
	// game.create.texture('player_shadow_2', planet_description.shadow_matrix_2, pixel_size, pixel_size, 0, true, on_shadow_render_2);
	// game.create.texture('player_shadow_3', planet_description.shadow_matrix_3, pixel_size, pixel_size, 0, true, on_shadow_render_3);
	console.log('create', this);

    cursors = game.input.keyboard.createCursorKeys();

	// game.input.onUp.add(listener, this);

  	// game.input.mouse.mouseWheelCallback = mouseWheel;
  	// game.input.mouse.mouseDownCallback = mouseDown;
  	// game.input.mouse.mouseUpCallback = mouseDown;
}

var counter = 0;

let deformation_complete = false;

function update() {
	// console.log(counter);
	if (counter == 5)
	{
		let skip = false;
		// console.log('init deformation')
		if (deformation_complete == false)
		{
			deformation_complete = deformate_planet(planet_description);
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

		if (skip == false || planet_description.render_required)
		{
		    let planet_data = planet_description.render();
			// game.create.texture('planet1', planet_data, 6, 6, 0, true, on_panet_render);
			generateTexture(game, 'planet1', planet_data, 6, 6, on_panet_render);
			// game.create.texture('player_shadow_1_', planet_description.shadow_matrix_1, pixel_size, pixel_size, 0, true, on_shadow_render_1);
			// game.create.texture('player_shadow_2_', planet_description.shadow_matrix_2, pixel_size, pixel_size, 0, true, on_shadow_render_2);
			// game.create.texture('player_shadow_3_', planet_description.shadow_matrix_3, pixel_size, pixel_size, 0, true, on_shadow_render_3);
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

    // var name = (game.input.activePointer.targetObject) ? game.input.activePointer.targetObject.sprite.key : 'none';

    // game.debug.text("Pointer Target: " + name, 32, 32);

}
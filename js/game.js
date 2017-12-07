var game = new Phaser.Game(400, 400, Phaser.CANVAS, 'phaser-example', { create: create, update: update });

var player;
var cursors;

let planet_size = 50;
var planet_description = init_planet(planet_size);

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#2d2d2d';


    var planet_data = render_planet(planet_description);
	game.create.texture('planet', planet_data, 6, 6, 0, true, on_panet_render);

    cursors = game.input.keyboard.createCursorKeys();
}

var counter = 0;

function update() {
	// console.log(counter);
	if (counter == 2)
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

		if (skip == false)
		{
		    var planet_data = render_planet(planet_description);
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
		planet_description.alpha += 0.01;
	}

    else if (cursors.left.isDown)
    {
		planet_description.alpha -= 0.01;
	}

    else if (cursors.up.isDown)
    {
		planet_description.beta += 0.01;
	}

    else if (cursors.down.isDown)
    {
		planet_description.beta -= 0.01;
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

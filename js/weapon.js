
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

// function preload() {

//     game.load.image('bullet', 'assets/sprites/bullet.png');
//     game.load.image('ship', 'assets/sprites/shmup-ship.png');

// }

// var sprite;
// var weapon;
// var cursors;
// var fireButton;

// function create() {

//     //  Creates 30 bullets, using the 'bullet' graphic
//     weapon = game.add.weapon(30, 'bullet');
// 	// weapon.fireFrom.set(14, 0);

//     //  The bullet will be automatically killed when it leaves the world bounds
//     weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

//     //  Because our bullet is drawn facing up, we need to offset its rotation:
//     weapon.bulletAngleOffset = 90;

//     //  The speed at which the bullet is fired
//     weapon.bulletSpeed = 400;

//     //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
//     weapon.fireRate = 60;

//     //  Add a variance to the bullet angle by +- this value
//     weapon.bulletAngleVariance = 10;

//     sprite = this.add.sprite(320, 500, 'ship');

//     game.physics.arcade.enable(sprite);
//     sprite.body.allowRotation = true;
//     sprite.name = 'car';
//     sprite.anchor.set(0.5);

//     //  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
//     weapon.trackSprite(sprite, 0, 0);

//     cursors = this.input.keyboard.createCursorKeys();

//     fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

// }

// function update() {

//     sprite.body.velocity.x = 0;
//     sprite.body.angularVelocity = 0;

//     if (cursors.left.isDown)
//     {
//         sprite.body.velocity.x = -200;
//     }
//     else if (cursors.right.isDown)
//     {
//         sprite.body.velocity.x = 200;
//     }
//     else if (cursors.down.isDown)
//     {
//         sprite.body.angularVelocity = 200;
//     }
//     else if (cursors.up.isDown)
//     {
//         sprite.body.angularVelocity = -200;
//     }

//     if (fireButton.isDown)
//     {
//         weapon.fire();
//     }

// }

// function render() {

//     weapon.debug();

// }
var game = new Phaser.Game(900, 900, Phaser.CANVAS, 'phaser-example', { create: create, update: update });

var player;
var cursors;

function FUCK_YOU_MORONS(arg)
{
    console.log(arg);
 	game.add.sprite(200, 200, 'planet');
}

function printArg(arg)
{
    console.log(arg);
 	player = game.add.sprite(300, 300, 'phaserDude');
	player.anchor.set(0.5);
	game.physics.arcade.enable(player);
 	bobAdded = true;
}

function on_panet_render(arg)
{
	// console.log(arg);

	if ( !player)
	{
 		player = game.add.sprite(0, 0, 'planet');
    	game.physics.arcade.enable(player);
 	}
 	else
 	{
    	player.loadTexture(arg);
    	counter = 0;

 	}
}


var forest = ['B', 'A'];
var water = ['C', 'D', 'E', 'F'];
// var sand = ['8', '7', '6', '5'];

var sand = ['5', '6', '7', '8', 'F', '2'];
var ice = 'F';
var snow = '2';
// var sand = ['2', 'F', '8', '7', '6', '5'];

let start_height = 2;
var empty_description = [false, start_height, false, 0.1, 0];
var empty_visual = '.';

var planet_visual;
var deformate_amount = 4;
let planet_size = 150;
var planet_description = init_planet(planet_size);
let planet_total_area = Math.round(planet_size * planet_size * Math.PI / 4);

var deformators = []
let deformator_angle_variance = Math.PI / 30;
let deformator_step_max = 1;
let deformator_step_min = 0.3;
let deformator_power_max = 2.0;
let deformator_power_min = -2.0;
let deformator_split_chance = 10;
let deformator_split_angle = Math.PI / 4;
let deformation_complete = false;
let target_deformation_factor_reached = false;
let total_deformation = 0;
let deformation_factor = 0.;
let target_deformation_factor = 1.0;

let wind_complete = false;
let wind_factor = 0.03;
let wind_iterations = 0;
let target_wind_iterations = 15;

function print_matrix(matrix)
{
	var res = '';
    matrix.forEach(function (row) {
        res += row.join(' ') + '\n';
    });
	console.log (res);
}

function init_matrix(size, value)
{
	let matrix = [];
	for(let i = 0; i < size; ++i)
	{
		let row = [];
		for(let i = 0; i < size; ++i)
		{
			row.push(value.slice());
		}
		matrix.push(row);
	}
	return matrix
}

function init_planet(size)
{

	let matrix = init_matrix(size, empty_description);

	// var coef = 1.3;

	// var size2 = size / 2.;
	// var size2_2 = size2 * size2;
	// var size2_22 = size2_2 / coef;
	// var size2_23 = size2_22 / coef;
	// var size2_24 = size2_23 / coef;

 //    matrix.forEach(function (row, i) {
 //    	var dx = size2 - i - 0.5;
 //    	var dx_2 = dx * dx;
 //    	row.forEach(function (cell, j) {
	//     	var dy = size2 - j - 0.5;
	//     	var dy_2 = dy * dy;
	//     	var dr_2 = dx_2 + dy_2;
 //    		if (dr_2 < size2_24)
 //    		{
 //    			matrix[i][j] = '8';
 //    		}
 //    		else if (dr_2 < size2_23)
 //    		{
 //    			matrix[i][j] = '7';
 //    		}
 //    		else if (dr_2 < size2_22)
 //    		{
 //    			matrix[i][j] = '6';
 //    		}
 //    		else 
	// 		if (dr_2 < size2_2)
 //    		{
 //    			matrix[i][j] = '5';
 //    		}
 //        	// console.log(i, j, dr_2, size2_2);
	// 		// print_matrix(matrix);
 //    	});
 //    });
	// print_matrix(matrix);

	// console.log (matrix);
	return matrix;
}


function render_planet(planet)
{
	console.log('render_planet');
	let size = planet.length;
	let matrix;
	if (!planet_visual)
	{
		planet_visual = init_matrix(size, empty_visual);
	}
	var coef = 1.3;

	var size2 = size / 2.;
	var size2_2 = size2 * size2;
	var size2_22 = size2_2 / coef;
	var size2_23 = size2_22 / coef;
	var size2_24 = size2_23 / coef;
	// print_matrix(planet);
	// print_matrix(planet_visual);

    planet.forEach(function (row, i) {
    	var dx = size2 - i - 0.5;
    	var dx_2 = dx * dx;
    	row.forEach(function (cell, j) {
	    	var dy = size2 - j - 0.5;
	    	var dy_2 = dy * dy;
	    	var dr_2 = dx_2 + dy_2;
    		if (dr_2 < size2_2)
    		{
    			let frozen = planet[i][j][3] < 0;
    			planet[i][j][0] = true;
    			if (frozen == false)
    			{
	    			let skip = false;
	    			let height = Math.round(cell[1]);
	    			let target = sand;
	    			if (planet[i][j][2])
	    			{
	    				target = water;
	    			}
	    			else if (planet[i][j][4] >= 0.1)
	    			{
	    				target = forest;
	    				let density = Math.max(Math.min(Math.round(planet[i][j][4]), target.length - 1), 0);
	    				// console.log(i, j, density);
    					planet_visual[i][j] = target[density];
    					// console.log(i, j, density, target[density]);
	    				skip = true;
	    			}

	    			if (skip == false)
	    			{
		    			height = Math.max(Math.min(height, target.length - 1), 0);
						planet_visual[i][j] = target[height];
					}
    			}
    			else
    			{
    				if (planet[i][j][2])
    				{
    					planet_visual[i][j] = ice;
    				}
    				else
    				{
    					planet_visual[i][j] = snow;	
    				}
    			}
        		// console.log(i, j, cell[0], '' + (5 + cell[0]));
    		}
    		// else if (dr_2 < size2_23)
    		// {
    		// 	planet_visual[i][j] = '7';
    		// }
    		// else if (dr_2 < size2_22)
    		// {
    		// 	planet_visual[i][j] = '6';
    		// }
    		// else if (dr_2 < size2_2)
    		// {
    		// 	planet_visual[i][j] = '5';
    		// }
        	// console.log(i, j, dr_2, size2_2);
			// print_matrix(matrix);
    	});
    });
	// print_matrix(planet);
	// print_matrix(planet_visual);
    return planet_visual;
}


function randomPlanetPosition(size)
{
	let size2 = size / 2;
	let range = Math.random() * size2 - 1;
	let angle = randomAngle();
	let x = Math.round(Math.sin(angle) * range) + size2;
	let y = Math.round(Math.cos(angle) * range) + size2;
	return {'x':x, 'y':y};
}

function randomAngle()
{
	return Math.random() * Math.PI * 2;
}

function random(from, to) {
	let delta = to - from;
	return from + Math.random() * delta;
}

function shatter(planet, x, y, power)
{
	planet[x][y][1] += power;
	total_deformation += Math.abs(power);
	deformation_factor = total_deformation / planet_total_area;
	if(deformation_factor >= target_deformation_factor)
	{
		console.log('!!! target deformation reached');
		target_deformation_factor_reached = true;
	}
}

function in_planet(planet, x, y)
{
	let size = planet.length;
	// console.log(size, x, y);
	if (x >= size || y >= size || x < 0 || y < 0)
	{
		return false;
	}
	return planet[x][y][0];

}
function random_shatter_power()
{

	if (Math.random() < 0.7)
	{
		return random(deformator_power_min, deformator_power_min/3);
	}
	else
	{
		return random(deformator_power_max/3, deformator_power_max);	
	}
}

function deformate_planet(planet)
{
	let size = planet.length;
	// console.log('deformate_planet start')
	if (deformators.length < deformate_amount * 2)
	{
		if( target_deformation_factor_reached == false)
		{
			console.log('init deformate_planet', deformate_amount);
			for(let i = 0; i < deformate_amount; ++i)
			{
				console.log('add one');
				let deformator = randomPlanetPosition(size);
				deformator['v'] = random(deformator_step_min, deformator_step_max);
				deformator['p'] = random_shatter_power();
				
				deformator['lx'] = deformator['x'];
				deformator['ly'] = deformator['y'];
				deformator['a'] = randomAngle();
				let deformatorTwin = Object.assign({}, deformator); 
				deformatorTwin['a'] += Math.PI;
				if (deformatorTwin['a'] > Math.PI * 2)
				{
					deformatorTwin['a'] -= Math.PI * 2;
				}
				deformators.push(deformator);
				deformators.push(deformatorTwin);
				shatter(planet, deformator['x'], deformator['y'], deformator['p']);
			}
		}
		else
		{
			console.log('!!! deformation complete');
			deformation_complete = true;
		}
	}
	console.log('deformate_planet', deformators);
	var i = deformators.length;
	let size_2 = size / 2;
	let size_22 = size_2 * size_2;
	while (i--) {
	    deformator = deformators[i];
		// console.log('pre', deformator);
    	deformator['x'] += deformator['v'] * Math.sin(deformator['a']);
    	deformator['y'] += deformator['v'] * Math.cos(deformator['a']);
    	deformator['a'] += random(-deformator_angle_variance, deformator_angle_variance);
		// console.log('post', deformator);
    	let x = Math.round(deformator['x']);
    	let y = Math.round(deformator['y']);
    	// if (x >= size || y >= size || x < 0 || y < 0)
    	// {
    	// 	// console.log('remove');
     //    	deformators.splice(i, 1);
     //    	continue;
    	// }
    	// let dx = size_2 - x - 0.5;
    	// let dy = size_2 - y - 0.5;
    	// let range = dx * dx + dy * dy;
    	// if (range > size_22)
    	// {
     //    	deformators.splice(i, 1);
     //    	continue;
    	// }
    	if (!in_planet(planet, x, y))
    	{
        	deformators.splice(i, 1);
        	continue;
    	}
    	if (x != deformator['lx'] || y != deformator['ly'])
    	{
			deformator['lx'] = x;
			deformator['ly'] = y;
			// console.log('break', x, y);
			shatter(planet, x, y, deformator['p']);
    	}
    	if (Math.random() * 100 < deformator_split_chance - deformators.length)
    	{
			let deformatorTwin = Object.assign({}, deformator); 
    		deformator['a'] += deformator_split_angle;
			deformator['v'] = random(deformator_step_min, deformator_step_max);
			deformator['p'] = random_shatter_power();
    		deformatorTwin['a'] -= deformator_split_angle;
			deformatorTwin['v'] = random(deformator_step_min, deformator_step_max);
			deformatorTwin['p'] = random_shatter_power();
			deformators.push(deformatorTwin);
    	}

    	if (deformation_factor > target_deformation_factor * 2 / 3 && 
    		Math.random() < deformation_factor / (target_deformation_factor * 10))
    	{
        	deformators.splice(i, 1);
        	continue;
    	}
    };
	// console.log('deformate_planet');
	// print_matrix(planet);
	// let size = planet.length;
	// var size2 = size / 2;
	// for(let i = 0; i < deformate_amount; ++i)
	// {
	// 	let range = Math.random() * size2 - 1;
	// 	let angle = Math.random() * Math.PI * 2;
	// 	let x = Math.round(Math.sin(angle) * range) + size2;
	// 	let y = Math.round(Math.cos(angle) * range) + size2;
	// 	console.log('def', x, y);
	// 	planet[x][y][0] += 1;
	// }
	// print_matrix(planet);
	
}

function swap(planet, x1, y1, x2, y2)
{
	let p1 = planet[x1][y1][1];
	let p2 = planet[x2][y2][1];
	let delta = p1 - p2;
	let moving = delta * wind_factor;
	planet[x1][y1][1] -= moving;
	planet[x2][y2][1] += moving;
}

function wind_planet(planet)
{
	let size = planet.length;
	let x = size;
	while (x--) {
		let y = size;
		while (y--) {

    		if (in_planet(planet, x, y))
    		{
	    		if (in_planet(planet, x, y-1))
	    		{
	    			swap(planet, x, y-1, x, y);
	    		}
	    		if (in_planet(planet, x-1, y))
	    		{
	    			swap(planet, x-1, y, x, y);
	    		}
	    	}

		}
	}

	wind_iterations++;
	if (wind_iterations >= target_wind_iterations)
	{
		wind_complete = true;
		
	}
	
}

let water_level = 0;
let water_step = 0.1;
let water_cells = 0;
let water_polus_factor = 1;
let target_water_factor = 0.5;
let water_complete = false;

function water_planet(planet)
{
	let size = planet.length;
	let size_2 = size / 2;
	let x = size;

	while (x--) {
		let y = size;
		while (y--) {

    		if (in_planet(planet, x, y))
    		{
    			if (planet[x][y][2])
    			{
    				continue;
    			}
				let shift = Math.abs(size_2 - x) / size_2;
    			height = planet[x][y][1] - shift * water_polus_factor;
    			if (height < water_level)
    			{
    				planet[x][y][2] = true;
    				water_cells += 1;
    			}
	    	}

		}
	}
	water_level += water_step;

	if (water_cells / planet_total_area >= target_water_factor)
	{
		water_complete = true;
		
	}
}

let chill_complete = false;
let chill_polus_factor = 1;
let chill_height_factor = 0.1;
let chill_power = 0.01;
let chill_iterations = 0;
let target_chill_iterations = 13;

function chill_planet(planet)
{
	let size = planet.length;
	let size_2 = size / 2;
	let x = size;

	let log = true;

	while (x--) {
		let y = size;
		while (y--) {

    		if (in_planet(planet, x, y))
			{
				let shift = Math.abs(size_2 - x) / size_2;
				let height = planet[x][y][1];
				let delta_height = Math.abs(height - start_height);
				let chill_abs = (shift * chill_polus_factor - delta_height * chill_height_factor) * chill_power;
				if (log)
				{
					log = false;
					// console.log(x, y, chill_abs);
				}
    			planet[x][y][3] -= chill_abs;
	    	}

		}
	}
	chill_iterations++;
	if (chill_iterations >= target_chill_iterations)
	{
		chill_complete = true;
		
	}
}

let plant_seeds = planet_total_area * (1 - target_water_factor) / 10;
let plant_complete = false;
let plant_iterations = 0;
let target_plant_iterations = 30;
let plant_tempreture_factor = 5;
let plant_height_factor = 20;

function plant(planet, x, y)
{
	planet[x][y][4] += 0.01;
}

function plant_planet(planet)
{
	let size = planet.length;
	for (let i = 0; i < plant_seeds; i++) {
		let x = Math.round(random(0, size));
		let y = Math.round(random(0, size));
		if (in_planet(planet, x, y) && planet[x][y][2] == false)
		{
			plant(planet, x, y);
		}
		else
		{
			i--;
		}
		
	}
	plant_seeds = 0;


	// let size = planet.length;
	let x = size;
	while (x--) {
		let y = size;
		while (y--) {

    		if (in_planet(planet, x, y) && planet[x][y][4] > 0)
    		{
    			// console.log('plant cell', x, y, planet[x][y][4]);
				let height = planet[x][y][1];
				let delta_height = Math.abs(height - start_height);
				let tempreture = planet[x][y][3];
				planet[x][y][4] += tempreture * plant_tempreture_factor / (1 + delta_height * plant_height_factor);
    			// console.log('plant grown', tempreture, delta_height, planet[x][y][4]);
				if (planet[x][y][4] > 0.2 && Math.random() < planet[x][y][4] / 3)
				{
					let neighbours = [[x,y-1], [x, y+1], [x-1,y], [x+1,y]];
					planet[x][y][4] = 0.1;
    				// console.log('plantsplosion', planet[x][y][4], neighbours);

    				neighbours.forEach(function (cell, i) {
						let cx = cell[0];
						let cy = cell[1];
    					// console.log('neighbour', i + ':', cx, cy);
			    		if (in_planet(planet, cx, cy) && planet[cx][cy][2] == false)
			    		{
    						// console.log('neighbour is valid', planet[cx][cy]);
			    			plant(planet, cx, cy);
    						// console.log('neighbour infected', planet[cx][cy]);
			    		}
    				});
				} 
	    	}

		}
	}

	plant_iterations++;
	if (plant_iterations >= target_plant_iterations)
	{
		plant_complete = true;
		
	}

	// plant_complete = true;
}

function habit_planet(planet)
{
	
}


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
	if (counter == 10)
	{
		let skip = false;
		// console.log('init deformation')
		if (deformation_complete == false)
		{
			deformate_planet(planet_description);
			deformate_planet(planet_description);
			deformate_planet(planet_description);
			deformate_planet(planet_description);
			deformate_planet(planet_description);
		}
		else if (wind_complete == false)
		{
			wind_planet(planet_description);
		}
		else if (water_complete == false)
		{
			water_planet(planet_description);
		}
		else if (chill_complete == false)
		{
			chill_planet(planet_description);
		}
		else if (plant_complete == false)
		{
			plant_planet(planet_description);
		}
		else
		{
			skip = true;
		}
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

	if ( player)
	{

	    player.body.velocity.x = 0;
	    player.body.velocity.y = 0;

	    if (cursors.left.isDown)
	    {
	        player.body.velocity.x = -200;
	        player.scale.x = 1;
	    }
	    else if (cursors.right.isDown)
	    {
	        player.body.velocity.x = 200;
	        player.scale.x = -1;
	    }

	    if (cursors.up.isDown)
	    {
	        player.body.velocity.y = -200;
	    }
	    else if (cursors.down.isDown)
	    {
	        player.body.velocity.y = 200;
	    }
	}
}

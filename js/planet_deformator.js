

function normalize(angle)
{
	while (angle > Math.PI)
	{
		angle -= 2 * Math.PI;
	}
	while (angle < -Math.PI)
	{
		angle += 2 * Math.PI;
	}
	return angle;
}



function deformate_planet(planet)
{
	console.log('deformate_planet', planet.deformators);

	// if (!planet.deformators || planet.deformators.length < deformate_amount * 2)
	// {

	if (!planet.deformators)
	{
		planet.deformators = [];
	}

	for (let i = 0; i < planet.deformators.length; ++i)
	{
		let deformator = planet.deformators[i];
		// console.log('deformator', deformator);
		let target_neighbour = null;
		let min_delta = 2 * Math.PI;
		for (let j = 0; j < deformator.cell.neighbours.length; ++j)
		{

			let neighbour = deformator.cell.neighbours[j];
			let delta = Math.abs(normalize(neighbour.angle - deformator.angle));
			if (delta < min_delta)
			{
				min_delta = delta;
				target_neighbour = neighbour;
			}

		}
		// console.log('target_neighbour', target_neighbour);

		if (target_neighbour)
		{
			deformator.cell.height = 0;
			deformator.cell = target_neighbour.cell;
		}
		// console.log('deformator');
		// console.log(deformator.cell);
		// console.log(deformator.cell.neighbours);
	}
	return false;
}

// var deformators = []
// var deformate_amount = 4;
// let deformator_angle_variance = Math.PI / 30;
// let deformator_step_max = 1;
// let deformator_step_min = 0.3;
// let deformator_power_max = 2.0;
// let deformator_power_min = -2.0;
// let deformator_split_chance = 10;
// let deformator_split_angle = Math.PI / 4;
// let deformation_complete = false;
// let target_deformation_factor_reached = false;
// let total_deformation = 0;
// let deformation_factor = 0.;
// let target_deformation_factor = 1.0;


// function random_shatter_power()
// {

// 	if (Math.random() < 0.7)
// 	{
// 		return random(deformator_power_min, deformator_power_min/3);
// 	}
// 	else
// 	{
// 		return random(deformator_power_max/3, deformator_power_max);	
// 	}
// }

// function shatter(planet, x, y, power)
// {
// 	planet[x][y][1] += power;
// 	total_deformation += Math.abs(power);
// 	deformation_factor = total_deformation / planet_total_area;
// 	if(deformation_factor >= target_deformation_factor)
// 	{
// 		console.log('!!! target deformation reached');
// 		target_deformation_factor_reached = true;
// 	}
// }

// function deformate_planet(planet)
// {
// 	let size = planet.length;
// 	// console.log('deformate_planet start')
// 	if (deformators.length < deformate_amount * 2)
// 	{
// 		if( target_deformation_factor_reached == false)
// 		{
// 			console.log('init deformate_planet', deformate_amount);
// 			for(let i = 0; i < deformate_amount; ++i)
// 			{
// 				console.log('add one');
// 				let deformator = randomPlanetPosition(size);
// 				deformator['v'] = random(deformator_step_min, deformator_step_max);
// 				deformator['p'] = random_shatter_power();
				
// 				deformator['lx'] = deformator['x'];
// 				deformator['ly'] = deformator['y'];
// 				deformator['a'] = randomAngle();
// 				let deformatorTwin = Object.assign({}, deformator); 
// 				deformatorTwin['a'] += Math.PI;
// 				if (deformatorTwin['a'] > Math.PI * 2)
// 				{
// 					deformatorTwin['a'] -= Math.PI * 2;
// 				}
// 				deformators.push(deformator);
// 				deformators.push(deformatorTwin);
// 				shatter(planet, deformator['x'], deformator['y'], deformator['p']);
// 			}
// 		}
// 		else
// 		{
// 			console.log('!!! deformation complete');
// 			deformation_complete = true;
// 		}
// 	}
// 	console.log('deformate_planet', deformators);
// 	var i = deformators.length;
// 	let size_2 = size / 2;
// 	let size_22 = size_2 * size_2;
// 	while (i--) {
// 	    deformator = deformators[i];
// 		// console.log('pre', deformator);
//     	deformator['x'] += deformator['v'] * Math.sin(deformator['a']);
//     	deformator['y'] += deformator['v'] * Math.cos(deformator['a']);
//     	deformator['a'] += random(-deformator_angle_variance, deformator_angle_variance);
// 		// console.log('post', deformator);
//     	let x = Math.round(deformator['x']);
//     	let y = Math.round(deformator['y']);

//     	if (!in_planet(planet, x, y))
//     	{
//         	deformators.splice(i, 1);
//         	continue;
//     	}
//     	if (x != deformator['lx'] || y != deformator['ly'])
//     	{
// 			deformator['lx'] = x;
// 			deformator['ly'] = y;
// 			// console.log('break', x, y);
// 			shatter(planet, x, y, deformator['p']);
//     	}
//     	if (Math.random() * 100 < deformator_split_chance - deformators.length)
//     	{
// 			let deformatorTwin = Object.assign({}, deformator); 
//     		deformator['a'] += deformator_split_angle;
// 			deformator['v'] = random(deformator_step_min, deformator_step_max);
// 			deformator['p'] = random_shatter_power();
//     		deformatorTwin['a'] -= deformator_split_angle;
// 			deformatorTwin['v'] = random(deformator_step_min, deformator_step_max);
// 			deformatorTwin['p'] = random_shatter_power();
// 			deformators.push(deformatorTwin);
//     	}

//     	if (deformation_factor > target_deformation_factor * 2 / 3 && 
//     		Math.random() < deformation_factor / (target_deformation_factor * 10))
//     	{
//         	deformators.splice(i, 1);
//         	continue;
//     	}
//     };
	
// }
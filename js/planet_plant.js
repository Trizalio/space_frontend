let plant_seeds = 10;//planet_total_area * (1 - target_water_factor) / 10;
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
}

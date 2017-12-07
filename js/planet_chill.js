
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


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
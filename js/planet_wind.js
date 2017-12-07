
let wind_complete = false;
let wind_factor = 0.03;
let wind_iterations = 0;
let target_wind_iterations = 15;

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


function on_panet_render(arg)
{
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

var sand = ['5', '6', '7', '8', 'F', '2'];
var ice = 'F';
var snow = '2';

let start_height = 2;
var empty_description = [false, start_height, false, 0.1, 0];

var empty_description = ['.'];
var empty_visual = '.';

function print_matrix(matrix)
{
	console.log (matrix);
	var res = '';
    matrix.forEach(function (row) {
        res += row.join(' ') + '\n';
    });
	console.log (res);
}

function init_matrix(size_x, size_y, value)
{
	console.log('init_matrix', size_x, size_y, value);
	let matrix = [];
	for(let i = 0; i < size_y; ++i)
	{
		let row = [];
		for(let j = 0; j < size_x; ++j)
		{
			row.push(value.slice());
		}
		matrix.push(row);
	}
	console.log('init_matrix');
	print_matrix(matrix);
	return matrix
}


// function in_planet(planet, x, y)
// {
// 	let size = planet.length;
// 	// console.log(size, x, y);
// 	if (x >= size || y >= size || x < 0 || y < 0)
// 	{
// 		return false;
// 	}
// 	return planet[x][y][0];
// }


function in_planet(planet, dx, dy)
{
	// console.log('in_planet', planet.radius, x, y);
	// let horisontal_radius = planet.radius * Math.PI;
	dx /= Math.PI;
	let dr = dx * dx  + dy * dy;
	let res = dr < planet.radius * planet.radius;
	// console.log('dx', dx, 'dy', dy, 'dr', dr, 'res', res);
	return res;
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


function init_planet(size)
{
	console.log('init_planet', size, size * Math.PI);
	let logic_matrix = init_matrix(size * Math.PI, size, empty_description);
	let visual_matrix = init_matrix(size+1, size, empty_visual);
	planet = {
		visual_matrix:visual_matrix, 
		surface_matrix:logic_matrix, 
		diameter:size, 
		radius:size/2., 
		area:size * Math.PI / 4, 
		workers:[],
		alpha:0,
		beta:0,
		// in_planet:function(x,y){return in_planet(planet,x,y);},
		randomPlanetPosition:function(){return randomPlanetPosition(size);},
		render:function(){return render_planet(planet);},
		forEachCell:function(callback){
			let horisontal_radius = planet.radius * Math.PI;
			let i = planet.surface_matrix.length;
			let max_steps = 100;
			let step = 0;
			while(i--)
			{
				// console.log('i', i, 'step', step);

				// step++;
				// if (step > max_steps)
				// {
				// 	break;
				// }
				
				let j = planet.surface_matrix[i].length;
				while(j--)
				{
					// console.log('i', i, 'j', j, 'step', step);
					// step++;
					// if (step > max_steps)
					// {
					// 	break;
					// }
    		// planet.surface_matrix.forEach(function (row, i) {
    			// row.forEach(function (cell, j) {
    				let x = j + 0.5 - horisontal_radius;
    				let y = i + 0.5 - planet.radius;
    				if (in_planet(planet, x, y))
    				{
    					let current_horisontal_radius = Math.sqrt(planet.radius * planet.radius - y * y) * Math.PI;
	    				let b = y * Math.PI / planet.radius;
	    				let a = x / current_horisontal_radius * Math.PI;
	    				// console.log(horisontal_radius,'x',planet.radius,' ',current_horisontal_radius, ' ', x,y,'->',a,b)
	    				callback(a, b, planet.surface_matrix[i][j]);
    				}
    				// break;
				}
    		}
		},
	};
	planet.forEachCell(function (a, b, cell)
	{
		// console.log('forEachCell', a, b, cell);
		// let sa = '+' + Math.round(a);
		// if (a < 0)
		// {
		// 	sa = '' + Math.round(a);
		// }
		// let sb = '+' + Math.round(b);
		// if (b < 0)
		// {
		// 	sb= '' + Math.round(b);
		// }
		cell[0] = Math.random() * 8 + 1;
	})
	// print_matrix(planet.surface_matrix);
	return planet;
}


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

function render_planet(planet)
{
	
    planet.visual_matrix.forEach(function (row, i) {
    	row.forEach(function (cell, j) {
    		planet.visual_matrix[i][j] = [];
    	})
    })


	console.log('render_planet', planet.alpha);
	let horisontal_radius = planet.radius * Math.PI;

    planet.forEachCell(function (a, b, cell) {
		// console.log('render_planet forEachCell', a, b);
    	let absolute_a = a + planet.alpha;
    	let absolute_b = b + planet.beta;
		// console.log('render_planet forEachCell', absolute_a, absolute_b);
    	absolute_a = normalize(absolute_a);
    	absolute_b = normalize(absolute_b);
    	if (absolute_a > Math.PI / 2 || absolute_a < -Math.PI / 2)
    	{
			// console.log('return forEachCell');
    		return;
    	}
		// console.log('render_planet forEachCell, absolute_a, absolute_b', absolute_a, absolute_b);
    	let y = absolute_b * planet.radius / Math.PI;
		let current_horisontal_radius = Math.sqrt(planet.radius * planet.radius - y * y);
    	let x = current_horisontal_radius * Math.sin(absolute_a);
		// console.log('render_planet forEachCell, x, y, planet.radius', x, y, planet.radius);
    	let j = Math.round(x - 0.5 + planet.radius);
    	let i = Math.round(y - 0.5 + planet.radius);
		// console.log('render_planet forEachCell, i, j', i, j);
		// console.log('render_planet forEachCell', a, b, cell, '->', i, j);
		planet.visual_matrix[i][j].push( cell[0] );
    });

    planet.visual_matrix.forEach(function (row, i) {
    	row.forEach(function (cell, j) {
    		let sum = 0;
    		let arr = planet.visual_matrix[i][j];
    		if (arr.length)
    		{
				for( let k = 0; k < arr.length; k++ ){
				    sum += arr[k];
				}

				let  avg = sum / arr.length;
				// avg = arr.length;
	    		planet.visual_matrix[i][j] = '' + Math.round(avg);
	    	}
	    	else
	    	{
	    		planet.visual_matrix[i][j] = empty_visual;
	    	}
    	})
    })


	// print_matrix(planet.visual_matrix);
    return planet.visual_matrix;

}

// function render_planet(planet)
// {
// 	console.log('render_planet');
// 	let size = planet.length;
// 	let matrix;
// 	var coef = 1.3;

// 	var size2 = size / 2.;
// 	var size2_2 = size2 * size2;
// 	var size2_22 = size2_2 / coef;
// 	var size2_23 = size2_22 / coef;
// 	var size2_24 = size2_23 / coef;

//     planet.surface_matrix.forEach(function (row, i) {
//     	var dx = size2 - i - 0.5;
//     	var dx_2 = dx * dx;
//     	row.forEach(function (cell, j) {
// 	    	var dy = size2 - j - 0.5;
// 	    	var dy_2 = dy * dy;
// 	    	var dr_2 = dx_2 + dy_2;
//     		if (dr_2 < size2_2)
//     		{
//     			let frozen = planet[i][j][3] < 0;
//     			planet[i][j][0] = true;
//     			if (frozen == false)
//     			{
// 	    			let skip = false;
// 	    			let height = Math.round(cell[1]);
// 	    			let target = sand;
// 	    			if (planet[i][j][2])
// 	    			{
// 	    				target = water;
// 	    			}
// 	    			else if (planet[i][j][4] >= 0.1)
// 	    			{
// 	    				target = forest;
// 	    				let density = Math.max(Math.min(Math.round(planet[i][j][4]), target.length - 1), 0);
//     					planet.visual_matrix[i][j] = target[density];
// 	    				skip = true;
// 	    			}

// 	    			if (skip == false)
// 	    			{
// 		    			height = Math.max(Math.min(height, target.length - 1), 0);
// 						planet.visual_matrix[i][j] = target[height];
// 					}
//     			}
//     			else
//     			{
//     				if (planet[i][j][2])
//     				{
//     					planet.visual_matrix[i][j] = ice;
//     				}
//     				else
//     				{
//     					planet.visual_matrix[i][j] = snow;	
//     				}
//     			}
//     		}
//     	});
//     });
// 	// print_matrix(planet.visual_matrix);
//     return planet.visual_matrix;
// }

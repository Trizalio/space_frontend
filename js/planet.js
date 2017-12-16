



var forest = ['B', 'A'];
var water = ['C', 'D', 'E', 'F'];

var sand = ['5', '6', '7', '8', 'F', '2'];
var ice = 'F';
var snow = '2';

let start_height = 2;
var empty_description = [false, start_height, false, 0.1, 0];

// var empty_description = ['\\../'];
var empty_description = {'color':'.'};
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

function print_matrix2(matrix, field_name, wrapper)
{
	// console.log (matrix);
	var res = '   ';
	let first = true;
    matrix.forEach(function (row, i) {
    	line = ('' + i % 10)[0] + '  ';
    	row.forEach(function (cell, j) {
    		if (first)
    		{
    			res += ('' + j % 10) + ' ';
    		}
    		let value = cell[field_name];
    		line += wrapper(value) + ' ';
    	});
		if (first)
		{
			res +=  '\n';
		}
    	res +=  '\n' + line;

		first = false;
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
			row.push(Object.assign({}, value));
		}
		matrix.push(row);
	}
	console.log('init_matrix');
	// print_matrix(matrix);
	return matrix
}



function in_planet(planet, dx, dy)
{
	// console.log('in_planet', planet.radius, x, y);
	// let horisontal_radius = planet.radius * Math.PI;
	dx /= Math.PI;
	dy /= Math.PI / 2;
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

function pair_to_text(a, b)
{
	let ra = Math.round(a);
	let sa = '+' + ra;
	if (ra < 0)
	{
		sa = '' + ra;
	}
	let rb = Math.round(b);
	let sb = '+' + rb;
	if (rb < 0)
	{
		sb = '' + rb;
	}
	return sa + sb;
}

let letters = ['1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
let line_width = 0.03;
let lines_on_planet = 12;
let line_step = Math.PI * 2 / lines_on_planet;
let lines_start = line_step - line_width;

function init_planet(size)
{
	let logic_matrix_width = Math.ceil(size * Math.PI);
	let logic_matrix_height = Math.ceil(size * Math.PI / 2);
	console.log('init_planet', logic_matrix_width, logic_matrix_height);
	let logic_matrix = init_matrix(logic_matrix_width, logic_matrix_height, empty_description);



	let visual_matrix = init_matrix(size + 2, size + 2, empty_visual);
	planet = {
		visual_matrix:visual_matrix, 
		surface_matrix:logic_matrix, 
		diameter:size, 
		radius:size/2., 
		area:size * Math.PI, 
		workers:[],
		alpha:-0.17,
		beta:-0.53,
		scale:0.8,
		render_required:true
	};

	// let horisontal_radius = planet.radius * Math.PI;
	// let vertical_radius = planet.radius * Math.PI / 2;


	let horisontal_radius = logic_matrix_width / 2;
	let vertical_radius = logic_matrix_height / 2;

	planet.rotateAlpha = function(delta_angle){
		planet.alpha += delta_angle; planet.render_required = true;
	};
	planet.rotateBeta = function(delta_angle){
		planet.beta += delta_angle; planet.render_required = true;
	};
	planet.enchanceScale = function(delta_scale){
		planet.scale *= delta_scale; 
		if(planet.scale > 1){
			planet.scale = 1;
		}
		planet.render_required = true;
	};
	planet.randomPlanetPosition = function(){
		return randomPlanetPosition(size);
	};
	planet.render = function(){
		return render_planet(planet);
	};
	planet.forEachCell = function(callback){
		// let horisontal_radius = planet.radius * Math.PI;
		// let vertical_radius = planet.radius * Math.PI / 2;
		// let i = planet.surface_matrix.length;
		// let max_steps = 100;
		// let step = 0;


	    planet.surface_matrix.forEach(function (row, i) {
	    	row.forEach(function (cell, j) {
	    		if ('a' in cell)
	    		{
	    			callback(cell['a'], cell['b'], planet.surface_matrix[i][j]);
	    		}
		// while(i--)
		// {
			
			// let j = planet.surface_matrix[i].length;
			// while(j--)
			// {
		// planet.surface_matrix.forEach(function (row, i) {
			// row.forEach(function (cell, j) {
				// let x = j + 0.5 - horisontal_radius;
				// let y = i + 0.5 - vertical_radius;
				// if (in_planet(planet, x, y))
				// {
				// 	let current_horisontal_radius = Math.sqrt(vertical_radius * vertical_radius - y * y) * 2;
    // 				let b = y / (planet.radius);
    // 				let a = x / current_horisontal_radius * Math.PI;
    // 				// console.log(horisontal_radius,'x',planet.radius,' ',current_horisontal_radius, ' ', x,y,'->',a,b)
    // 				callback(a, b, planet.surface_matrix[i][j]);
				// }
				// break;
			});
		});
		
	};

    planet.surface_matrix.forEach(function (row, i) {
    	row.forEach(function (cell, j) {
    		// cell['neighbours'] 
			let x = j + 0.5 - horisontal_radius;
			let y = i + 0.5 - vertical_radius;
			if (in_planet(planet, x, y))
			{
				let current_horisontal_radius = Math.sqrt(vertical_radius * vertical_radius - y * y) * 2;
				let b = y / (planet.radius);
				let a = x / current_horisontal_radius * Math.PI;
				cell['a'] = a;
				cell['b'] = b;
				cell['tx'] = x;
				cell['ty'] = y;

			}
	
		});
	});
    planet.surface_matrix.forEach(function (row, i) {
    	row.forEach(function (cell, j) {
    		if ('a' in cell)
    		{
				cell['neighbours'] = [];
    		}
    	});
    });
    function pad(num, size){ return ('000000000' + num).substr(-size); };
	print_matrix2(planet.surface_matrix, 'a', function(val){return ('' + Math.abs(val * 0 + 1))[0]});
	// print_matrix2(planet.surface_matrix, 'tx', function(val){return pad(('' + Math.round(Math.abs(val) * 100) % 1000),3)});
	// print_matrix2(planet.surface_matrix, 'ty', function(val){return ('' + Math.abs(val) % 10)});
	print_matrix2(planet.surface_matrix, 'a', function(val){return ('' + Math.abs(val * 3))[0]});
	print_matrix2(planet.surface_matrix, 'b', function(val){return ('' + Math.abs(val * 6))[0]});

    wrapping = {};
    planet.surface_matrix.forEach(function (row, i) {
    	let min_j = row.length;
    	let max_j = -1;
    	row.forEach(function (cell, j) {
    		if ('a' in cell)
    		{
    			if (j < min_j)
    			{
    				min_j = j;
    			}

    			if (j > max_j)
    			{
    				max_j = j;
    			}
    		}
    	});
    	wrapping[i] = {min:min_j, max:max_j};
    });
	console.log('wrapping', wrapping);

    wrap = function(i, j)
    {
    	if (j in wrapping)
    	{
    		limits = wrapping[j];
    		ri = i;
    		if (i < limits.min)
    		{
    			ri = limits.max;
    		}
    		else if (i > limits.max)
    		{
    			ri = limits.min;
    		}

    		if (ri != i)
    		{
    			console.log('wrap', i,j,'->', ri, j);
    		}
    		return ri;
    	}
    	else
    	{
    		return null;
    	}
    }

 //    neighbours_order = [[1,1], [1,0], [1,-1], [0,1]];
 //    planet.surface_matrix.forEach(function (row, i) {
 //    	row.forEach(function (cell, j) {
 //    		if ('a' in cell)
 //    		{
 //    			console.log('start neighbours', i, j);
 //    			let a = cell['a'];
 //    			let b = cell['b'];
 //    			for(let k = 0; k < neighbours_order.length; ++k)
 //    			{
 //    				let ti = i + neighbours_order[k][0];
 //    				let tj = j + neighbours_order[k][1];
 //    				// if (ti > 0 && tj > 0 && ti < size && tj < size)
 //    				// {
 //    					ti = wrap(ti, tj);
 //    					if (!(ti === null))
 //    					{
    					
	//     					let target = planet.surface_matrix[ti][tj];
	//     					da = target['a'] - a;
	//     					db = target['b'] - b;
	//     					angle = Math.atan2(db, da);
	//     					range = Math.sqrt(da*da + db*db);
	//     					cell['neighbours'].push({'angle':angle, 'range':range, 'cell':target});
	//     					target['neighbours'].push({'angle':normalize(angle + Math.PI), 'range':range, 'cell':cell});
	//     					console.log('push neighbour', angle, range, cell['neighbours'].length, target['neighbours'].length);
 //    					}
 //    				// }
 //    			}

 //    		}
	// 		console.log('---');
	
	// 	});
	// });

 //    planet.surface_matrix.forEach(function (row, i) {
 //    	row.forEach(function (cell, j) {
 //    		if ('a' in cell)
 //    		{
 //    			let a = cell['a'];
 //    			let b = cell['b'];
 //    			for(let k = 0; k < neighbours_order.length; ++k)
 //    			{
 //    				let ti = i + neighbours_order[k][0];
 //    				let tj = j + neighbours_order[k][1];
 //    				if (ti > 0 && tj > 0 && ti < size && tj < size)
 //    				{
 //    					let target = planet.surface_matrix[ti][tj];
	//     				if ('a' in target)
	//     				{
	//     					da = target['a'] - a;
	//     					db = target['b'] - b;
	//     					angle = Math.atan2(db, da);
	//     					range = Math.sqrt(da*da + db*db);
	//     					cell['neighbours'].push({'angle':angle, 'range':range, 'cell':target});
	//     					target['neighbours'].push({'angle':normalize(angle + Math.PI), 'range':range, 'cell':cell});
	//     					console.log('push neighbour', angle, range, cell['neighbours'].length, target['neighbours'].length);
	//     				}
 //    				}
 //    			}

 //    		}
	// 		console.log('---');
	
	// 	});
	// });

	planet.forEachCell(function (a, b, cell)
	{
		// console.log('forEachCell', a, b, cell);
		
		// cell[0] = pair_to_text(a, b);
		// cell[0] = Math.random() * 8 + 1;
		cell['color'] = letters[Math.abs(Math.round(b * (letters.length / Math.PI * 2 - 1)))];

		a = a + Math.PI;
		if (a % line_step > lines_start)
		{
			cell['color'] = '1';
		}
		// console.log(a, b, cell[0]);
	})
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

	console.log('render_planet', planet.alpha, planet.beta, planet.scale);
	let radius = planet.scale * planet.radius;

    planet.forEachCell(function (a, b, cell) {
    	let absolute_a = a + planet.alpha;
    	absolute_a = normalize(absolute_a);

    	let y = radius * Math.sin(b);
    	let z = radius * Math.cos(b);

    	let x = z * Math.sin(absolute_a);
    	z = z * Math.cos(absolute_a)

    	let sin_beta = Math.sin(planet.beta);
    	let cos_beta = Math.cos(planet.beta);

    	let tz = -z * cos_beta + y * sin_beta;
    	
    	if (tz < 0)
    	{
    		return;
    	}
    	y = z * sin_beta + y * cos_beta;
    	
    	let i = Math.round(x + planet.radius);
    	let j = Math.round(y + planet.radius);
		
		// planet.visual_matrix[j][i].push( '' + cell['neighbours'].length);
		// console.log(cell['neighbours'].length + '');
		// return;
		planet.visual_matrix[j][i].push( cell['color'] );
    });

    planet.visual_matrix.forEach(function (row, i) {
    	row.forEach(function (cell, j) {
    		let sum = 0;
    		let arr = planet.visual_matrix[i][j];
    		if (arr.length)
    		{
				for( let k = 0; k < arr.length; k++ ){
				    sum += parseInt(arr[k], 16);
				}

				let  avg = sum / arr.length;
				// avg = arr.length;
	    		planet.visual_matrix[i][j] = letters[Math.round(avg)];
	    	}
	    	else
	    	{
	    		planet.visual_matrix[i][j] = empty_visual;
	    	}
    	})
    })

    // planet.visual_matrix[10][4] = "!";
	// print_matrix(planet.surface_matrix);
	// print_matrix(planet.visual_matrix);
	planet.render_required = false;
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


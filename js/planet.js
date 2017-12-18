

let canvas_init_done = false;
let ctx = null;

let scale = 10;
let safe_factor = 1;
let canvas_width = null;
let canvas_half_width = null;
let canvas_height = null;
let canvas_half_height = null;
function init_canvas(width, height)
{
	console.log('init_canvas');
	let canvas = document.createElement('canvas');
	// console.log(canvas);
	canvas_width = width * scale * safe_factor;
	canvas_half_width = canvas_width / 2;

	canvas_height = height * scale * safe_factor;
	canvas_half_height = canvas_height / 2;

	canvas.width = canvas_width
	canvas.height = canvas_height;
	// console.log(canvas);
  	document.body.appendChild(canvas);
	// console.log(document.body);
	ctx = canvas.getContext("2d");
	// console.log(ctx);
	canvas_init_done = true;
}
let line_k = 5;
function draw_line_between(x1,y1,x2,y2, c)
{
	// console.log('draw_line_between', x1,y1,x2,y2);
	if (!canvas_init_done)
	{
		console.log('canvas is not inited');
		return;
	}
	ctx.beginPath();
	if (c)
	{
		ctx.strokeStyle="#FF0000";

	}
	else
	{
		let ax = (x1 + x2) / 2;
		let ay = (y1 + y2) / 2;
		x1 = (x1 * line_k + ax) / (line_k + 1);
		x2 = (x2 * line_k + ax) / (line_k + 1);
		y1 = (y1 * line_k + ay) / (line_k + 1);
		y2 = (y2 * line_k + ay) / (line_k + 1);
		ctx.strokeStyle="#000000";
	}
		
	ctx.moveTo(x1*scale + canvas_half_width, y1*scale + canvas_half_height);
	ctx.lineTo(x2*scale + canvas_half_width, y2*scale + canvas_half_height);

	ctx.stroke();
}

function draw_line_between_ij(x1,y1,x2,y2, c)
{
	// console.log('draw_line_between', x1,y1,x2,y2);
	if (!canvas_init_done)
	{
		console.log('canvas is not inited');
		return;
	}
	ctx.beginPath();
	if (c)
	{
		ctx.strokeStyle="#FF0000";
		if (x1 > x2)
		{
			ctx.moveTo(x1*scale - canvas_width, y1*scale);
			ctx.lineTo(x2*scale, y2*scale);

			ctx.moveTo(x1*scale, y1*scale);
			ctx.lineTo(x2*scale + canvas_width, y2*scale);
		}
		else
		{
			ctx.moveTo(x1*scale + canvas_width, y1*scale);
			ctx.lineTo(x2*scale, y2*scale);

			ctx.moveTo(x1*scale, y1*scale);
			ctx.lineTo(x2*scale - canvas_width, y2*scale);	
		}

	}
	else
	{
		let ax = (x1 + x2) / 2;
		let ay = (y1 + y2) / 2;
		x1 = (x1 * line_k + ax) / (line_k + 1);
		x2 = (x2 * line_k + ax) / (line_k + 1);
		y1 = (y1 * line_k + ay) / (line_k + 1);
		y2 = (y2 * line_k + ay) / (line_k + 1);
		ctx.strokeStyle="#000000";
		ctx.moveTo(x1*scale, y1*scale);
		ctx.lineTo(x2*scale, y2*scale);
	}
		

	ctx.stroke();
}

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
    		if (field_name in cell)
    		{
    			let value = cell[field_name];
    			line += wrapper(value) + ' ';
    		}
    		else
    		{

    			line += 'N ';
    		}
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
	let radius = size/2;
	init_canvas(logic_matrix_width, logic_matrix_height);
	console.log('init_planet', logic_matrix_width, logic_matrix_height);
	let logic_matrix = init_matrix(logic_matrix_width, logic_matrix_height, empty_description);



	let visual_matrix = init_matrix(size + 2, size + 2, empty_visual);
	planet = {
		visual_matrix:visual_matrix, 
		surface_matrix:logic_matrix, 
		diameter:size, 
		radius:radius, 
		area:size * Math.PI, 
		workers:[],
		alpha:-0.17,
		beta:-0.53,
		scale:1.0,
		render_required:true
	};

	let horisontal_radius_real = planet.radius * Math.PI;
	let vertical_radius_real = planet.radius * Math.PI / 2;


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
			});
		});
		
	};
	let half_cell = .5;
    let j_from_x = function(x){return x - half_cell + horisontal_radius;};
    let i_from_y = function(y){return y - half_cell + vertical_radius;};
    let x_from_j = function(j){return j + half_cell - horisontal_radius;};
    let y_from_i = function(i){return i + half_cell - vertical_radius;};

    planet.surface_matrix.forEach(function (row, i) {
    	row.forEach(function (cell, j) {
    		// cell['neighbours'] 
			let x = x_from_j(j);
			let y = y_from_i(i);
			if (in_planet(planet, x, y))
			{
				let current_horisontal_radius = Math.sqrt(vertical_radius_real * vertical_radius_real - y * y) * 2;
				let b = y / (planet.radius);
				let a = x / current_horisontal_radius * Math.PI;
				cell['a'] = a;
				cell['b'] = b;
				cell['x'] = x;
				cell['y'] = y;

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

 //    wrapping = {};
 //    planet.surface_matrix.forEach(function (row, i) {
 //    	let min_x = row.length;
 //    	let max_x = -row.length;
 //    	let y = null;
 //    	row.forEach(function (cell, j) {
 //    		if ('x' in cell)
 //    		{
 //    			let x = cell['x'];
 //    			y = cell['y'];
 //    			if (x < min_x)
 //    			{
 //    				min_x = x;
 //    			}

 //    			if (x > max_x)
 //    			{
 //    				max_x = x;
 //    			}
 //    		}
 //    	});
 //    	wrapping[y] = {min:min_x, max:max_x};
 //    });
	// console.log('wrapping', wrapping);

    wrap = function(x, y)
    {
    	if (y in wrapping)
    	{
    		limits = wrapping[y];
    		if (x < limits.min)
    		{
    			if (x < limits.min - 1)
    			{
    				return null;
    			}
    			x = limits.max;
    		}
    		else if (x > limits.max)
    		{
    			if (x > limits.max + 1)
    			{
    				return null;
    			}
    			x = limits.min;
    		}

    		// if (rx != x)
    		// {
    			// console.log('wrap', x,y,'->', rx, y);
    		// }
    		return x;
    	}
    	else
    	{
    		return null;
    	}
    }
    let get_x_on_other_y_by_x_y = function(target_y, base_x, base_y)
    {
		return base_x * Math.cos(target_y / radius) / Math.cos(base_y / radius);
    }
    // neighbours_order = [[1,1], [1,0], [1,-1], [0,1]];
    // neighbours_order = [[-1,0], [1,0], [0,-1], [0,1]];
    // let neighbours_order = [[-1,1], [1,-1], [-1,-1], [1,1]];
    let neighbours_order = [[-1,1], [1,-1], [-1,-1], [1,1], [-1,0], [1,0], [0,-1], [0,1]];
   	planet.surface_matrix.forEach(function (row, i) {
    	row.forEach(function (cell, j) {
    		if ('a' in cell)
    		{
    			let x = cell['x'];
    			let y = cell['y'];
    			let a = cell['a'];
    			let b = cell['b'];


    			for(let k = 0; k < neighbours_order.length; ++k)
    			{
    				let target_y = y + neighbours_order[k][0];
    				let x_on_target_y = get_x_on_other_y_by_x_y(target_y, x, y);

    				let target_x = x_on_target_y + neighbours_order[k][1];

					let target_i = Math.round(i_from_y(target_y));
	    			let target_j_raw = Math.round(j_from_x(target_x));
					let target_j = wrap(target_j_raw, target_i);


					if (target_j !== null)
					{
						draw_line_between_ij(j, i, target_j, target_i, target_j != target_j_raw);
    					let target = planet.surface_matrix[target_i][target_j];

						let da = target['a'] - a;
						let db = target['b'] - b;
						let angle = Math.atan2(db, da);
						let range = Math.sqrt(da*da + db*db);
    					cell['neighbours'].push({'angle':angle, 'range':range, 'cell':target});
					}
				}
    		}
	
		});
	});

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
		
		planet.visual_matrix[j][i].push( '' + 2);//cell['neighbours'].length);
		// console.log(cell['neighbours'].length + '');
		// return;
		// planet.visual_matrix[j][i].push( cell['color'] );
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

	planet.render_required = false;
    return planet.visual_matrix;

}

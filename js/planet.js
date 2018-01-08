"use strict";

let canvas_init_done = false;
let ctx = null;

let scale = 1;
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

let line_colors = ['255,0,0', '255,128,0', '255,255,0', '0,255,0', '0,255,255', '0,0,255', '255,0,255', '128,0,255'];
function draw_line_between_ij(x1,y1,x2,y2, direction, opacity)
{
	// console.log('draw_line_between', x1,y1,x2,y2);
	if (!canvas_init_done)
	{
		console.log('canvas is not inited');
		return;
	}
	ctx.beginPath();
	// let color = 1 << (direction * 3);
	// let r = (color >> 16) & 255;
	// let g = (color >> 8) & 255;
	// let b = color & 255;


	// let line_color = "rgba(" + r + "," + g + "," + b + "," + (1 - opacity * 0.5) + ")"
	let line_color = "rgba(" + line_colors[direction] + "," + (0.6 - opacity * 0.3) + ")"
	ctx.strokeStyle = line_color;
	// console.log(direction, line_color, ctx.strokeStyle);
	if (opacity)
	{
		// ctx.strokeStyle="#FF0000";
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
		// ctx.strokeStyle="#000000";
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
var empty_visual = '';

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
let letters =  ['#000', '#9D9D9D', '#FFF', '#BE2633', '#E06F8B', '#493C2B', '#A46422', '#EB8931', '#F7E26B', '#2F484E', '#44891A', '#A3CE27', '#1B2632', '#005784', '#31A2F2', '#B2DCEF']
// let letters = ['1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
// let letters = ['1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
let shadow = ['.', 'C', 'C']
let spark = ['.', '2', '2']
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
	let max_render_time = 0;

	let reverse_matrix = init_matrix(size + 2, size + 2, {});
	let visual_matrix = init_matrix(size + 2, size + 2, empty_visual);
	let pre_visual_matrix = init_matrix(size + 2, size + 2, {});;
	let shadow_matrix_1 = init_matrix(size + 2, size + 2, empty_visual);
	let shadow_matrix_2 = init_matrix(size + 2, size + 2, empty_visual);
	let shadow_matrix_3 = init_matrix(size + 2, size + 2, empty_visual);
	let planet = {
		visual_matrix:visual_matrix, 
		pre_visual_matrix:pre_visual_matrix,
		shadow_matrix_1:shadow_matrix_1, 
		shadow_matrix_2:shadow_matrix_2, 
		shadow_matrix_3:shadow_matrix_3, 
		reverse_matrix:reverse_matrix, 
		surface_matrix:logic_matrix, 
		diameter:size, 
		radius:radius, 
		area:size * Math.PI, 
		workers:[],
		alpha:-0.17,
		beta:-0.48,
		// scale:0.7,
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
		let t0 = performance.now();
		let result =  render_planet(planet);
		let t1 = performance.now();
		let render_time = t1 - t0;
		if (render_time > max_render_time)
		{
			max_render_time = render_time;
			console.log("logic render took " + max_render_time + " milliseconds.")
		}
		return result;
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
	// print_matrix2(planet.surface_matrix, 'a', function(val){return ('' + Math.abs(val * 0 + 1))[0]});
	// print_matrix2(planet.surface_matrix, 'tx', function(val){return pad(('' + Math.round(Math.abs(val) * 100) % 1000),3)});
	// print_matrix2(planet.surface_matrix, 'ty', function(val){return ('' + Math.abs(val) % 10)});
	// print_matrix2(planet.surface_matrix, 'a', function(val){return ('' + Math.abs(val * 3))[0]});
	// print_matrix2(planet.surface_matrix, 'b', function(val){return ('' + Math.abs(val * 6))[0]});

    let wrapping = {};
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
	// console.log('wrapping', wrapping);

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

    let wrap = function(x, y)
    {
    	if (y in wrapping)
    	{
    		let limits = wrapping[y];
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
    // let neighbours_order = [[0,1],[1,0]];
    let neighbours_order = [[-1,1], [1,-1], [-1,-1], [1,1], [-1,0], [1,0], [0,-1], [0,1]];
    // let neighbours_order = [];
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
    					let target = planet.surface_matrix[target_i][target_j];

						let da = target['a'] - a;
						let db = target['b'] - b;
						let angle = Math.atan2(db, da);
						if (a > 0)
						{
							angle += Math.PI;
							angle = normalize(angle);
						}

						let range = Math.sqrt(da*da + db*db);
    					cell['neighbours'].push({'angle':angle, 'range':range, 'cell':target});
    					let d = Math.round((angle + Math.PI) / Math.PI * 3.5);
    					if (d > 8)
    					{
    						console.log('angle', angle, 'd', d);
    					}
						draw_line_between_ij(j, i, target_j, target_i, d, Number(target_j != target_j_raw));
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
		// cell['color'] = letters[Math.abs(Math.round(b * (letters.length / Math.PI * 2 - 1)))];
		// cell['height'] = 5 + Math.random() * 5  ; //+ Math.abs(b / Math.PI * 15);
		cell['height'] = 1 + Math.abs(Math.sin(a * 2)) * 5 + Math.abs(Math.sin(b * 4)) * 5  ; //+ Math.abs(b / Math.PI * 15);

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
    		planet.pre_visual_matrix[i][j] = new Map();
    		planet.visual_matrix[i][j] = [];
    		planet.reverse_matrix[i][j] = [];
    		planet.shadow_matrix_1[i][j] = [];
    		planet.shadow_matrix_2[i][j] = [];
    		planet.shadow_matrix_3[i][j] = [];
    	})
    });

    let sun_alpha = Math.PI;
    let sun_beta = 0;

    let reverse_matrix = planet.reverse_matrix

	console.log('render_planet', planet.alpha, planet.beta, planet.scale);
	

    planet.forEachCell(function (a, b, cell) {
    	let radius = planet.scale * (planet.radius - cell['height']);

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

    	let sun_delta_alpha = a - sun_alpha;
    	let sun_delta_beta = b - sun_beta;

    	let brightness = Math.cos(sun_delta_alpha) * Math.cos(sun_delta_beta);
    	let k = 10;
    	let kp = 0.6;
    	if (brightness < 0)
    	{
    		brightness = 0;
    	}
  //   	if (brightness < 0.5)
  //   	{
  //   		k *= kp;
		// 	planet.shadow_matrix_1[j][i].push(1);
		// 	if (brightness < 0.25)
  //   		{
  //   			k *= kp;
		// 		// planet.shadow_matrix_2[j][i].push(1);
		// 		if (brightness < 0.125)
	 //    		{
  //   				k *= kp;
		// 			// planet.shadow_matrix_3[j][i].push(1);
		// 		}
		// 		else
		// 		{
		// 			// planet.shadow_matrix_3[j][i].push(0);
		// 		}
		// 	}
		// 	else
		// 	{
		// 		// planet.shadow_matrix_2[j][i].push(0);
		// 	}
  //   	}
		// else
		// {
		// }

    	let mid_sun_alpha = (sun_alpha - planet.alpha) / 2 +  Math.PI/2;
    	let mid_sun_beta = (sun_beta + planet.beta) / 2;

    	let mid_sun_delta_alpha = a - mid_sun_alpha;
    	let mid_sun_delta_beta = b - mid_sun_beta;

    	let spark =  Math.cos(mid_sun_delta_alpha) * Math.cos(mid_sun_delta_beta);
    	spark = Math.pow(spark, 15);

    	if (spark < 0)
    	{
    		spark = 0;
    	}
    	spark /= 20;


		// planet.shadow_matrix_1[j][i].push((brightness + 1) * 1.5);
		// planet.shadow_matrix_2[j][i].push((brightness + 1) / 2);
		// planet.shadow_matrix_3[j][i].push((spark + 1) / 3.9);
		// console.log(a,b,brightness);

		
		// planet.visual_matrix[j][i].push( '' + 2);//cell['neighbours'].length);
		// console.log(cell['neighbours'].length + '');
		// return;
		let color_r = cell['height'];
		let color_g = 0;
		let color_b = 0;
		let _color_r = 255 - color_r;
		let _color_g = 255 - color_g;
		let _color_b = 255 - color_b;
		color_r += _color_r * spark;
		color_g += _color_g * spark;
		color_b += _color_b * spark;

		color_r *= k * brightness;
		color_g *= k * brightness;
		color_b *= k * brightness;
		// brightness = 1;
		planet.pre_visual_matrix[j][i].set(tz, {r:color_r, g:color_g, b:color_b});
		// planet.visual_matrix[j][i].push({r:color_r * k * brightness, g:color_g * k * brightness, b:color_b * k * brightness});
		// planet.visual_matrix[j][i].push(cell['height'] * k);
		// planet.reverse_matrix[j][i].push(cell)
    });


    // planet.visual_matrix.forEach(function (row, i) {
    // 	let right_index = row.length;
    // 	let right_planet_edge = 0;
    // 	let left_planet_edge = row.length;
    // 	while(--right_index)
    // 	{
    // 		if (row[right_index].length)
    // 		{
    // 			// console.log(row[right_index], row[right_index].length);
    // 			right_planet_edge = right_index;
    // 			break;
    // 		}

    // 	}
    // 	for (let left_index = 0; left_index < row.length; ++left_index)
    // 	{

    // 		if (row[left_index].length)
    // 		{
    // 			// console.log(row[left_index], row[left_index].length);
    // 			left_planet_edge = left_index;
    // 			break;
    // 		}
    // 	}

    // 	let last_cell = [];
    // 	let damaged_cell_js = [];
    // 	// console.log(i, ':', left_planet_edge, '-', right_planet_edge);
    // 	for (let j = left_planet_edge; j <= right_planet_edge; ++j)
    // 	{
    // 		if (row[j].length == 0)
    // 		{
    // 			// console.log(last_cell);
				// // row[j-1] = [];
    // 			damaged_cell_js.push(j);
    // 		}
    // 		else
    // 		{
    // 			if (damaged_cell_js.length)
    // 			{
				// 	// console.log('damaged_cell_js', damaged_cell_js.length);
    // 				for (let k = 0; k < damaged_cell_js.length; ++k)
    // 				{
    // 					row[damaged_cell_js[k]] = last_cell.concat(row[j]);

    // 				}
    // 				damaged_cell_js = [];
    // 			}
    // 			last_cell = row[j];
    // 		}
    // 	}
    // });

    // planet.visual_matrix.forEach(function (row, i) {
    // 	row.forEach(function (cell, j) {
    // 		let sum_r = 0;
    // 		let sum_g = 0;
    // 		let sum_b = 0;
    // 		// let sum_a = 0;
    // 		if (cell.length)
    // 		{
				// for( let k = 0; k < cell.length; k++ ){
				//     // sum += parseInt(cell[k], 16);
				//     sum_r += cell[k].r;
				//     sum_g += cell[k].g;
				//     sum_b += cell[k].b;
				//     // sum_a += cell[k].a;
				// }

				// let avg_r = sum_r / cell.length;
				// let avg_g = sum_g / cell.length;
				// let avg_b = sum_b / cell.length;
				// // avg = cell.length;
	   //  		planet.visual_matrix[i][j] = {r:Math.round(avg_r), g:Math.round(avg_g), b:Math.round(avg_b)};
	   //  	}
	   //  	else
	   //  	{
	   //  		planet.visual_matrix[i][j] = empty_visual;
	   //  	}
    // 	})
    // });

    planet.pre_visual_matrix.forEach(function (row, i) {
    	row.forEach(function (cell, j) {
    		// let sum_r = 0;
    		// let sum_g = 0;
    		// let sum_b = 0;
    		// let sum_a = 0;

			// console.log(i, j, cell.size, cell);
    		if (cell.size)
    		{
    			let keys = cell.keys();
    			// console.log(keys);
    			let biggest_key = Math.max(...keys);
    			// console.log(keys, biggest_key);
				// for( let k = 0; k < cell.length; k++ ){
				//     // sum += parseInt(cell[k], 16);
				//     sum_r += cell[k].r;
				//     sum_g += cell[k].g;
				//     sum_b += cell[k].b;
				//     // sum_a += cell[k].a;
				// }

				// let avg_r = sum_r / cell.length;
				// let avg_g = sum_g / cell.length;
				// let avg_b = sum_b / cell.length;
				// // avg = cell.length;
				let target_color = cell.get(biggest_key);
				target_color.r = Math.round(target_color.r);
				target_color.g = Math.round(target_color.g);
				target_color.b = Math.round(target_color.b);
	    		planet.visual_matrix[i][j] = target_color;
	    	}
	    	else
	    	{
	    		planet.visual_matrix[i][j] = empty_visual;
	    	}
    	})
    });


    // planet.shadow_matrix_1.forEach(function (row, i) {
    // 	row.forEach(function (cell, j) {
    // 		if (cell.length)
    // 		{
    // 			let sum = 0;
				// for( let k = 0; k < cell.length; k++ ){
				//     // sum += parseInt(cell[k], 16);
				//     sum += cell[k];
				// }

				// let  avg = sum / cell.length;
				// // avg = cell.length;
				// // console.log(avg, sum, cell.length);
	   //  		planet.shadow_matrix_1[i][j] = shadow[Math.round(avg)];
	   //  	}
	   //  	else
	   //  	{
	   //  		planet.shadow_matrix_1[i][j] = empty_visual;
	   //  	}
    // 	})
    // });

    // planet.shadow_matrix_2.forEach(function (row, i) {
    // 	row.forEach(function (cell, j) {
    // 		if (cell.length)
    // 		{
    // 			let sum = 0;
				// for( let k = 0; k < cell.length; k++ ){
				//     // sum += parseInt(cell[k], 16);
				//     sum += cell[k];
				// }

				// let  avg = sum / cell.length;
				// // avg = cell.length;
				// // console.log(avg, sum, cell.length);
	   //  		planet.shadow_matrix_2[i][j] = shadow[Math.round(avg)];
	   //  	}
	   //  	else
	   //  	{
	   //  		planet.shadow_matrix_2[i][j] = empty_visual;
	   //  	}
    // 	})
    // });
    // planet.shadow_matrix_3.forEach(function (row, i) {
    // 	row.forEach(function (cell, j) {
    // 		if (cell.length)
    // 		{
    // 			let sum = 0;
				// for( let k = 0; k < cell.length; k++ ){
				//     // sum += parseInt(cell[k], 16);
				//     sum += cell[k];
				// }

				// let  avg = sum / cell.length;
				// // avg = cell.length;
				// // console.log(avg, sum, cell.length);
	   //  		planet.shadow_matrix_3[i][j] = spark[Math.round(avg)];
	   //  	}
	   //  	else
	   //  	{
	   //  		planet.shadow_matrix_3[i][j] = empty_visual;
	   //  	}
    // 	})
    // });
	planet.render_required = false;
    return planet.visual_matrix;

}

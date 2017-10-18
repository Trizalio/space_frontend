// wrapper = undefined;
// let initRender = function()
// {
// 	wrapper = d3.select(".objects");
// }
let CURRENT_SHIP_NAME = "Fo"
let NS = 'http://www.w3.org/2000/svg'
let pointsToD = function(points)
{
    let sx = 0;//500 / 2;
    let sy = 0;//500 / 2;
	let d = "";
	for(let i = 0; i < points.length; ++i)
	{
		let point = points[i];
		if (i)
		{
			d += "L ";
		}
		else
		{
			d += "M ";
		}
		d += point.x + sx;
		d += " ";
		d += point.y + sy;
		d += " ";
	}
	return d;
}

// var KeypressFunctions = [];
// KeypressFunctions['w'.charCodeAt(0)] = function _keypressw() {
// 	makeOrder(CURRENT_SHIP_NAME, '', '{"task":"acc", "vx":10,"vy":0,"va":0}');
// }
// //you get the idea here

// function keyListener(event){ 
//   //whatever we want to do goes in this block
//   event = event || window.event; //capture the event, and ensure we have an event
//   var key = event.key || event.which || event.keyCode; //find the key that was pressed
//   //MDN is better at this: https://developer.mozilla.org/en-US/docs/DOM/event.which
//   KeypressFunctions[key].call(); //if there's a defined function, run it, otherwise don't
//   //I also used .call() so you could supply some parameters if you wanted, or bind it to a specific element, but that's up to you.
// }
let target_move = {"task":"acc", "vx":0,"vy":0,"va":0}

let send_move = function()
{
    makeOrder(CURRENT_SHIP_NAME, '', JSON.stringify(target_move));
	setTimeout(send_move, 300);
}
let decay = 0.95;
let limit = 1000;

let decay_move = function()
{
    target_move.vx = Math.round(target_move.vx * decay * limit) / limit; 
    target_move.vy = Math.round(target_move.vy * decay * limit) / limit;
    target_move.va = Math.round(target_move.va * decay * limit) / limit;
	setTimeout(decay_move, 20);
}

setTimeout(decay_move, 50);
setTimeout(send_move, 300);

let power = 1.5;

document.onkeydown = function(e){
	// console.log(e)
    e = e || window.event;
    var key = e.which || e.keyCode;
	// console.log(key)
    if(key==87){
		// console.log('send')
		target_move.vx += power;
        // makeOrder(CURRENT_SHIP_NAME, '', '{"task":"acc", "vx":10,"vy":0,"va":0}');
    }
    else if(key==68){
		target_move.vy += power;
		// console.log('send')
        // makeOrder(CURRENT_SHIP_NAME, '', '{"task":"acc", "vx":0,"vy":10,"va":0}');
    }
    else if(key==65){
		target_move.vy -= power;
		// console.log('send')
        // makeOrder(CURRENT_SHIP_NAME, '', '{"task":"acc", "vx":0,"vy":-10,"va":0}');
    }
    else if(key==69){
		target_move.va += power;
		// console.log('send')
        // makeOrder(CURRENT_SHIP_NAME, '', '{"task":"acc", "vx":0,"vy":0,"va":10}');
    }
    else if(key==81){
		target_move.va -= power;
		// console.log('send')
        // makeOrder(CURRENT_SHIP_NAME, '', '{"task":"acc", "vx":0,"vy":0,"va":-10}');
    }
}

// document.onkeydown = keyListener

let initDone = false;
let svg = document.getElementById('objects');

let render = function(ship)
{
	let group = null;
	let groupId = "group";
	if(initDone)
	{
		group = document.getElementById(groupId);
	}
	else
	{
    	group = document.createElementNS(NS, "g");
    	group.id = groupId;
		svg.appendChild(group);
	}
	let angle = ship["a"] * 180 / Math.PI;
	group.setAttribute("transform","translate(" + (ship["x"] + 100) + " " + (ship["y"] + 100) + ") rotate(" + angle + ")");
	
	renderModules(ship, group);
	renderCenters(ship, group);
	// renderShield(ship, group);
	initDone = true;
}
let renderModules = function(ship, group)
{
	let modules = ship["modules"];
	let moduleGroupId = "module_group";

	let moduleGroup = null;
	let modulesToDelete = {};
	if(initDone)
	{
		moduleGroup = document.getElementById(moduleGroupId);
		let moduleObjects = moduleGroup.children;
		for (let i = 0; i < moduleObjects.length; i++) {
		  	let moduleObject = moduleObjects[i];

    		moduleName = moduleObject.getAttribute("module_name");
    		modulesToDelete[moduleName] = moduleObject;
		}
	}
	else
	{
    	moduleGroup = document.createElementNS(NS, "g");
    	moduleGroup.id = moduleGroupId;
		group.appendChild(moduleGroup);
	}


	for (let moduleName in modules) 
	{
    	if (modules.hasOwnProperty(moduleName)) 
    	{
    		let currentModule = modules[moduleName];

			let rectId = "module_" + moduleName;
			let rect = null;

	    	let width = currentModule['width'];
	    	let height = currentModule['height'];

			if(initDone)
			{
				rect = document.getElementById(rectId);
				delete modulesToDelete[moduleName];

		    	let type = currentModule['type'];
			    if (type == 'engine')
			    {
					let path = document.getElementById(rectId + "_flame");
					let power_fraction = currentModule['power_fraction']
					path.setAttribute('d',pointsToD([{"x":0, "y":0}, {"x":Math.round(power_fraction * 50), "y":0}]));
			    }
			}
			else
			{

		    	rect = document.createElementNS(NS, "rect");
		    	rect.id = rectId;


		    	rect.setAttribute("width", width);
		    	rect.setAttribute("height", height);

		    	rect.setAttribute("module_name", moduleName);





		    	let type = currentModule['type'];
			    if (type == 'engine')
			    {
			    	rect.style.fill = 'rgba(255,0,0,0.5)';
    				let engine_group = document.createElementNS(NS, "g");

					engine_group.setAttribute("transform",
						"translate(" + currentModule['cx'] + " " + currentModule['cy'] + ") " 
						+ "rotate(" + (currentModule['engine_angle'] / Math.PI * 180 ) + ")");
	
    				let path = document.createElementNS(NS, "path");
					path.setAttribute('d',pointsToD([{"x":0, "y":0}, {"x":30, "y":0}]));
				    path.style.stroke = 'rgb(127,0,0)';
				    path.style.strokeWidth = '2';
		    		path.id = rectId + "_flame";
					engine_group.appendChild(path);
					group.appendChild(engine_group);
			    	
			    }
			    else if (type == 'cabin')
			    {
			    	rect.style.fill = 'rgb(255,255,0)';
			    }
			    else 
			    {
		    		rect.style.fill = 'rgb(0,0,255)';
			    }
		    	
		    	rect.style['stroke-width'] = '3';

			    rect.onclick = function(e){
			    	// alert(moduleName);
			    	// console.log(e);
			    	let isOn = rect.getAttribute("isOn");

			    	if (e.shiftKey)
			    	{
		    			makeOrder(CURRENT_SHIP_NAME, moduleName, '{"task":"detach"}');
		    		}
		    		else
		    		{
				    	if(isOn == "true")
				    	{
				    		makeOrder(CURRENT_SHIP_NAME, moduleName, '{"task":"setOff"}');
				    	}
				    	else
				    	{
				    		makeOrder(CURRENT_SHIP_NAME, moduleName, '{"task":"setOn"}');
				    	}
		    		}
			    }

				moduleGroup.appendChild(rect);
		    }

		    let moduleX = currentModule['cx'] - width / 2;
		    if (rect.getAttribute("x") != moduleX)
		    {
	    		rect.setAttribute("x", moduleX);
		    }

		    let moduleY = currentModule['cy'] - height / 2;
		    if (rect.getAttribute("y") != moduleY)
		    {
	    		rect.setAttribute("y", moduleY);
	    	}

	    	let isOn = currentModule['isOn'];
	    	rect.setAttribute("isOn", isOn);
		    if (isOn)
		    {
		    	rect.style['stroke'] = 'rgb(200,200,200)';
		    }
		    else
		    {
		    	rect.style['stroke'] = 'rgb(0,0,0)';
		    }
		}
	}


	for (let moduleName in modulesToDelete) 
	{
    	if (modulesToDelete.hasOwnProperty(moduleName)) 
    	{
    		let currentModule = modulesToDelete[moduleName];
    		moduleGroup.removeChild(currentModule);
    	}
    }
}

let renderCenters = function(ship, group)
{
	let visualCenterId = "vc";
	let massCenterId = "mc";

	let visualCenter = null;
	let massCenter = null;

	if(initDone)
	{
		visualCenter = document.getElementById(visualCenterId);
		massCenter = document.getElementById(massCenterId);
	}
	else
	{
		visualCenter = document.createElementNS(NS, "rect");
    	visualCenter.id = visualCenterId;
		visualCenter.setAttribute("x", 0);
		visualCenter.setAttribute("y", 0);
    	visualCenter.style['stroke-width'] = '3';
    	visualCenter.style['stroke'] = 'rgb(0,0,127)';
		visualCenter.style.fill = 'rgb(0,0,255)';
    	visualCenter.setAttribute("width", 1);
    	visualCenter.setAttribute("height", 1);
		group.appendChild(visualCenter);

		massCenter = document.createElementNS(NS, "rect");
    	massCenter.id = massCenterId;
    	massCenter.style['stroke-width'] = '3';
    	massCenter.style['stroke'] = 'rgb(0,127,0)';
		massCenter.style.fill = 'rgb(0,0,255)';
    	massCenter.setAttribute("width", 1);
    	massCenter.setAttribute("height", 1);
		group.appendChild(massCenter);
	}

	massCenter.setAttribute("x", ship['mx']);
	massCenter.setAttribute("y", ship['my']);
}
let renderShield = function(ship, group)
{
	let shieldStatus = ship["shield"];
	let shieldWidth = ship["width"];
	let shieldHeight = ship["height"];
	let shieldAngle = 2 * Math.PI / shieldStatus.length;

	let pathId = "shield";
	if(initDone)
	{
		path = document.getElementById(pathId);
	}
	else
	{

    	path = document.createElementNS(NS, "path");
    	path.id = pathId;
	    // path.style.stroke = 'steelblue';//'rgb(0,0,0)';
	    path.style.strokeWidth = '2';
	    path.style.fill = 'lightsteelblue';

		group.appendChild(path);
	}
	let points = [];

	let p01;
	let p02;
	for(let i = 0; i < shieldStatus.length; ++i)
	{
		let currentStartAngle = shieldAngle * i;
		let startPower = shieldStatus[i];

		let p1 = {"x": shieldWidth * Math.sin(currentStartAngle), "y": shieldHeight * Math.cos(currentStartAngle)}
		let p2 = {"x": (shieldWidth + startPower) * Math.sin(currentStartAngle), "y": (shieldHeight + startPower) * Math.cos(currentStartAngle)}

		if(i == 0)
		{
			p01 = p1;
			p02 = p2;
		}

		points.unshift(p1);
		points.push(p2);

	}
	points.unshift(p01);
	points.push(p02);
	path.setAttribute('d',pointsToD(points));

}
// let power = [];
// let generators = [];
// // for(let i = 0; i < 180; ++i)
// // {
// // 	power.push(Math.random() * 10 + 10);
// // }

// shift_coeff = 0.01;

// let act = function(shieldStatus)
// {
// 	for(let i = 0; i < shieldStatus.length; ++i)
// 	{
// 		let startPower = shieldStatus[i];
// 		let endIndex = i+1 > shieldStatus.length ? i+1 : 0;
// 		let endPower = shieldStatus[endIndex];

// 		let delta = endPower - startPower;
// 		console.log(delta );
// 		let shiftShield = delta * shift_coeff;
// 		shieldStatus[i] += shiftShield;
// 		shieldStatus[endIndex] -= shiftShield;
// 	}
// }
// let hit = function(shieldStatus)
// {
// 	let damage = 15;
// 	if(Math.random() > 0.98)
// 	{
// 		let index = Math.round((shieldStatus.length - 1) * Math.random());
// 		console.log(shieldStatus[index] );
// 		if (shieldStatus[index] < damage)
// 		{
// 			shieldStatus[index] = 0;
// 		}
// 		else
// 		{
// 			shieldStatus[index] -= damage;
// 		}
// 		console.log(shieldStatus[index] );

// 	}
// }
let requestShip = function(shipName)
{
	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'http://192.168.88.252:8765/ship/' + shipName, true);

	xhr.send(); // (1)

	xhr.onreadystatechange = function() { // (3)
	  	if (xhr.readyState != 4) return;

		setTimeout(function(){
			requestShip(shipName);
		}, 200);


		if (xhr.status != 200) {
			// alert(xhr.status + ': ' + xhr.statusText);
		} else {
			// console.log(xhr.responseText);
			ship = JSON.parse(xhr.responseText);
			render(ship);
			// alert(xhr.responseText);
		}

	}
}
requestShip(CURRENT_SHIP_NAME);

let makeOrder = function(shipName, moduleName, order)
{
	console.log('send order', order)
	var xhr = new XMLHttpRequest();

	xhr.open('POST', 'http://192.168.88.252:8765/order', true);
	payload = {"shipName":shipName, "order":order}
	if (moduleName)
	{
		payload["moduleName"] = moduleName;
	}
	else
	{
		payload["moduleName"] = '';
	}

	xhr.send(JSON.stringify(payload)); // (1)

	xhr.onreadystatechange = function() { // (3)
	  	if (xhr.readyState != 4) return;

		// setTimeout(function(){
		// 	requestShip();
		// }, 1000);


		// if (xhr.status != 200) {
		// 	// alert(xhr.status + ': ' + xhr.statusText);
		// } else {
		// 	// console.log(xhr.responseText);
		// 	// ship = JSON.parse(xhr.responseText);
		// 	// render(ship);
		// 	// alert(xhr.responseText);
		// }

	}
}


	// render(power, {"width": 150, "height": 100});

// let me;
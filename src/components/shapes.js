const gsap = require('gsap');
const TweenMax = gsap.TweenMax;

let Shapes = function shapes(spheres) {
	this.shapes = [
		{
			shape : this.drop,
			name : "Drop",
			id : 0,
			positions: this.getSpheresPosition,
		},
		{
			shape: this.horn,
			name: "Horn",
			id: 1,
			positions: this.getSpheresPosition,
		},
		{
			shape: this.shell,
			name: "Shell",
			id: 2,
			positions: this.getSpheresPosition,
		},
		{
			shape: this.sphere,
			name: "Sphere",
			id: 3,
			positions: this.getSpheresPosition,
		},

	];

	return this.shapes;
}

Shapes.prototype.getSpheresPosition = function getSpheresPosition(i, spheres, app, posX, posY, posZ) {
	app.positions.x.push(posX);
	app.positions.y.push(posY);
	app.positions.z.push(posZ);
}

Shapes.prototype.drop = function drop(spheres, app) {
	app.positions = {
		x: [],
		y: [],
		z: [],
	};
	for (var i = 0; i < spheres.length; i++) {
		let phi =Math.random()*2*Math.PI;
		let theta = Math.random()*Math.PI;

		posX = 0.7*(Math.cos(theta)*Math.sin(theta)*Math.cos(phi))*200;
		posY = -Math.sin(theta)*200+100;
		posZ = 0.7*(Math.cos(theta)*Math.sin(theta)*Math.sin(phi))*200;

		//drop
		TweenMax.to(spheres[i].position, Math.random()*1+0.5, {
			x: posX,
			y: posY,
			z: posZ
		})

		this.positions(i, spheres, app, posX, posY, posZ);
	}
}

Shapes.prototype.horn = function horn(spheres, app) {
	app.positions = {
		x: [],
		y: [],
		z: [],
	};

	for (var i = 0; i < spheres.length; i++) {
		let phi =Math.random()*2*Math.PI;
		let theta = Math.random()*1;

		posX = (2+theta*Math.cos(phi)*Math.cos(phi))*Math.sin(2*Math.PI*theta)*50;
		posY = (2+theta*Math.cos(phi)*Math.cos(phi))*Math.cos(2*Math.PI*theta)*50;
		posZ = theta*Math.sin(phi)*50;

		TweenMax.to(spheres[i].position, Math.random()*1+0.5, {
			x: posX,
			y: posY,
			z: posZ })

		this.positions(i, spheres, app, posX, posY, posZ);
	}
}

Shapes.prototype.shell = function shell(spheres, app) {
	app.positions = {
		x: [],
		y: [],
		z: [],
	};

	for (var i = 0; i < spheres.length; i++) {
		let phi =Math.random()*2*Math.PI;
		let theta = Math.random()*Math.PI;
		let a = 10;
		let b = 20;
		let c = 15;

		posX = a * (1-(phi/(2*Math.PI)))*Math.cos(2*phi)*(2+Math.cos(theta*2))+c*Math.cos(2*phi)*5;
		posY = -b * (phi/(2*Math.PI))*a+(1-phi/(2*Math.PI))*Math.sin(theta*2)*15+100 ;
		posZ = a * (1-(phi/(2*Math.PI)))*Math.sin(2*phi)*(2+Math.cos(theta*2))+c*Math.sin(2*phi)*5;

		TweenMax.to(spheres[i].position, Math.random()*1+0.5, {
			x: posX,
			y: posY,
			z: posZ,
		})

		this.positions(i, spheres, app, posX, posY, posZ);
	}
}

Shapes.prototype.sphere = function sphere(spheres, app) {
	app.positions = {
		x: [],
		y: [],
		z: [],
	};

	for (var i = 0; i < spheres.length; i++) {
		let phi = Math.acos( -1 + ( 2 * i ) / spheres.length );
		let theta = Math.sqrt( spheres.length * Math.PI ) * phi;

		posX = 110 * Math.cos( theta ) * Math.sin( phi ),
		posY = 110 * Math.sin( theta ) * Math.sin( phi ),
		posZ = 110 * Math.cos( phi ),

		TweenMax.to(spheres[i].position, Math.random()*1+0.5, {
			x: posX,
			y: posY,
			z: posZ,
		})

		this.positions(i, spheres, app, posX, posY, posZ);
	}
}

module.exports = Shapes;
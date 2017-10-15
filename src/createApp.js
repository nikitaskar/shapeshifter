global.THREE = require('three');
const gsap = require('gsap');
const TweenMax = gsap.TweenMax;
const createControls = require('orbit-controls');
const isMobile = require('is-mobile')

let createApp = function createApp() {
	this.colors = [[0x301781, 0x76E2F4, 0x615DEC],[0xFC345C, 0xAFFFDF, 0x49BEB7 ],[0x1A2F4B, 0x00FFCC, 0x089A9F,],[0xFF4545, 0xFFEDB2, 0xFF9867]];
	this.spheres = [];
	this.isMobile = isMobile();
	//set up the scene(camera controls, etc ...)
	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	this.target = new THREE.Vector3();
	this.renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
	this.colorid;
	this.winWidth = window.innerWidth;
	this.winHeight = window.innerHeight;
	this.positions = {
		x:[],
		y:[],
		z:[],
	}

	//create orbit controls
	this.controls = createControls({
		position : [0,0,0],
	  distance: 1200,
	  zoom: false,
	  rotateSpeed: 0.007,
	  damping: 0.05,
	});

	if (this.isMobile) {
		document.querySelector('.mobile').style.display = 'block';
	} else {
		this.init();
	}
};

createApp.prototype.init = function init() {
	this.createSpheres();
	this.resize();
	this.animate();
	this.resizeSpheres();

	window.onload = function() {
		let info = document.querySelector('.info')
		info.style.opacity = 1;

		let play = document.querySelector('.stateButton')
		play.style.transitionDelay ="1.5s"
		play.style.transform = 'translateX(0)'
	}
}
// set up renderer and creatre spheres

createApp.prototype.createSpheres = function createSpheres() {

	//create the material and geometry for the mesh
	const geometry = new THREE.SphereGeometry( 1, 8, 8);
	const material = new THREE.MeshBasicMaterial({color: this.colors[Math.floor(Math.random()*3)], wireframe: false, });

	// create the spheres
	const sphere = new THREE.Mesh(geometry, material);
	this.colorid = Math.floor(Math.random()*4);
	let sphereClone = {};

	//loop to clone the spheres
	 for ( i = 0; i < 500; i++) {
    sphereClone = sphere.clone();
    sphereClone.material = sphere.material.clone();
    sphereClone.material.color.setHex(this.colors[this.colorid][Math.floor(Math.random()*3)]);

    this.spheres.push(sphereClone);
  }

  for ( let i = 0, l = this.spheres.length; i < l; i ++ ) {
		let phi = Math.acos( -1 + ( 2 * i ) / l );
		let theta = Math.sqrt( l * Math.PI ) * phi;

		this.spheres[i].position.x = 110 * Math.cos( theta ) * Math.sin( phi );
		this.spheres[i].position.y = 110 * Math.sin( theta ) * Math.sin( phi );
		this.spheres[i].position.z = 110 * Math.cos( phi );

		this.positions.x.push(this.spheres[i].position.x);
		this.positions.y.push(this.spheres[i].position.y);
		this.positions.z.push(this.spheres[i].position.z);

		this.scene.add(this.spheres[i]);
	}

	//render the scene
  document.body.appendChild( this.renderer.domElement );
  window.addEventListener('resize', this.resize.bind(this), false);

  self = this;
   setTimeout(function(){
   		TweenMax.to(self.controls, 1.5, {distance: 300, ease:Back.easeOut})
   }, 600)
}

//responsive resize
createApp.prototype.resize = function resize() {
	this.winWidth = window.innerWidth;
  this.winHeight = window.innerHeight;

	this.renderer.setSize(this.winWidth, this.winHeight);

  this.camera.aspect = this.winWidth / this.winHeight;
  this.camera.updateProjectionMatrix();


}

//animate on tick
createApp.prototype.animate = function animate() {
  requestAnimationFrame(this.animate.bind(this));
  this.controls.update();

  this.camera.position.fromArray(this.controls.position);
  this.camera.up.fromArray(this.controls.up);
  this.camera.lookAt(this.target);

  this.renderer.render( this.scene, this.camera );
}

//resize the spheres on load
createApp.prototype.resizeSpheres = function resizeSpheres() {
	for (i = 0; i < this.spheres.length; i++){
	 let random = Math.random()*2.4+0.5;
	 TweenMax.to(this.spheres[i].scale, 1, { x: random, y: random, z: random, ease: Power1.easeOut });
	}
}


module.exports = createApp;
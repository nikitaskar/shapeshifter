const Vue = require('vue/dist/vue.js');
const Shapes = require('./shapes.js');

const shapeShift = Vue.extend({
	template:`
		<div>
			<div  v-for="shape in shapes" style="z-index: 1; color: white;" @keyup.space="click" v-bind:id="shape.id"></div>
		</div>

	`,
	props:['app', 'shapes'],

	data() {
		return {
			shapeId : null,
			randomNumber : 3,
		}
	},
	created(){
		window.addEventListener('keyup', this.click);
	},

	methods: {
		click(e){
			if (e.which == 32) {
				function generateRandomFunction(max) {
			    var num = Math.floor(Math.random() * max);
			    return (num === this.randomNumber) ? generateRandom(max) : num;
				}
				var generateRandom = generateRandomFunction.bind(this);
				randomNumber = generateRandom(4);

				this.shapes[randomNumber].shape(this.app.spheres, this.app);
				this.randomNumber = randomNumber;
			}
		}
	}
})

Vue.component('chose-shape', shapeShift);

module.exports = shapeShift;


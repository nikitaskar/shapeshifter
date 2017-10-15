const Vue = require('vue/dist/vue.js')
const createApp = require('../createApp.js')

const choseColorComponent = Vue.extend({
	template:`
		<div >
			<span v-for="color in colors" @keyup.space="click" v-on:click="click" style="color: white; display:block;" v-bind="color"></span>
		</div>
	`,

	props: ['app'],

	data() {
		return {
			blop: null,
			colorid: this.app.colorid,
			colors: [
				{
					color: "blue",
					id: 0,
				},
				{
					color: "pastel",
					id: 1,
				},
				{
					color: "green",
					id: 2,
				},
				{
					color: "coral",
					id: 3,
				},
			]
		}
	},
	created(){
		window.addEventListener('keyup', this.click);
	},

	methods: {
		click(e){
			if (e.which == 32) {
				this.app.colorid = Math.floor(Math.random()*4);

				function changeColor(i, colorid, spheres, app) {
					spheres[i].material.color.setHex(app.colors[colorid][Math.floor(Math.random()*3)]);
				}

	      for ( i = 0; i < this.app.spheres.length; i++) {
	      	changeColor(i, this.app.colorid, this.app.spheres, this.app);
	      }
			}
		}
	}
})

Vue.component('chose-color', choseColorComponent)

module.exports = choseColorComponent;
//files
const app = require('./src/createApp.js');
const choseColorComponent = require('./src/components/choseColor.js');
const Shapes = require('./src/components/shapes.js')
const choseShapeComponenent = require('./src/components/shapeShift.js');

//packages
const Vue = require('vue/dist/vue.js');
const gsap = require('gsap');
const TweenMax = gsap.TweenMax;
const createPlayer = require('web-audio-player');
const createAudioContext = require('ios-safe-audio-context');
const averageFrequency = require('analyser-frequency-average');
const createAnalyser = require('web-audio-analyser');

new Vue({
	el: '#app',

	data(){
		return {
			app: new app(),
			shapes: new Shapes(),
			audioSrc: null,
			colorid: null,
			onPlay: false,
			spheresPositioned: false,
			canPlay: false,
			audio: null,
		}
	},

	created() {
		var  audioContext = createAudioContext();

		this.audio = createPlayer('public/music.mp3', {
			context : audioContext,
		})

		this.audio.on('load', () => {
		  console.log('Audio loaded...')
		  // start playing audio file
		  this.audio.play()
		})
		console.log('volume')
		this.audio.volume = 0.3;
	},

	methods: {
		click(e){
			var playButton = document.querySelector('.stateButton')
			playButton.style.transitionDelay="0s"
			playButton.style.opacity = "0";

			self = this;
			console.log(self.audio.volume);

			if (self.onPlay == false) {
				self.onPlay = true;

				var analyser = createAnalyser(self.audio.node, self.audio.context, {audible:true, stereo: false});
				// animate();

				function setOnPlay() {
					self.onPlay = false;
				}

				var animateBeforePlay = function () {
					for (var i = 0; i < self.app.spheres.length; i++) {
						if (self.app.spheres[i].material.color.getHex() == self.app.colors[self.app.colorid][0]) {
							TweenMax.to(self.app.spheres[i].position, 1, {x: self.app.spheres[i].position.x*0.6, y: self.app.spheres[i].position.y*0.6, z: self.app.spheres[i].position.z*0.6, ease: Power4.easeIn});
						}
						else if (self.app.spheres[i].material.color.getHex() == self.app.colors[self.app.colorid][2]) {
							TweenMax.to(self.app.spheres[i].position, 1, {x: self.app.spheres[i].position.x*0.4, y: self.app.spheres[i].position.y*0.4, z: self.app.spheres[i].position.z*0.4, ease: Power4.easeIn});
						}
						else if (self.app.spheres[i].material.color.getHex() == self.app.colors[self.app.colorid][1]) {
							TweenMax.to(self.app.spheres[i].position, 1, {x: self.app.spheres[i].position.x*0.3, y: self.app.spheres[i].position.y*0.3, z: self.app.spheres[i].position.z*0.3, ease: Power4.easeIn});
						}
					}

					setTimeout(function(){
						self.canPlay = true;
						animate();
					}, 1000)
				}

				animateBeforePlay();

				this.audio.on('ended', () => {
					self.onPlay = false;
				})

				function animate() {
					requestAnimationFrame(animate);

					const analyserNode = analyser.analyser;
					const freqs = analyser.frequencies();

					var avgKick = averageFrequency(analyserNode, freqs, 200, 300);
					pKick = 0.6+avgKick;

					var avgMelody = averageFrequency(analyserNode, freqs, 600, 700);
					pMelody = 0.4+avgMelody;

					var avgSnare = averageFrequency(analyserNode, freqs, 1000, 1200);
					pSnare = 0.3+avgSnare;

					for (var i = 0; i < self.app.spheres.length; i++) {
						if (self.app.spheres[i].material.color.getHex() == self.app.colors[self.app.colorid][0]) {
							self.app.spheres[i].position.set(self.app.positions.x[i]*pKick,self.app.positions.y[i]*pKick,self.app.positions.z[i]*pKick);
						}
						else if (self.app.spheres[i].material.color.getHex() == self.app.colors[self.app.colorid][2]) {
							self.app.spheres[i].position.set(self.app.positions.x[i]*pMelody,self.app.positions.y[i]*pMelody,self.app.positions.z[i]*pMelody);
						}
						else if (self.app.spheres[i].material.color.getHex() == self.app.colors[self.app.colorid][1]) {
							self.app.spheres[i].position.set(self.app.positions.x[i]*pSnare,self.app.positions.y[i]*pSnare,self.app.positions.z[i]*pSnare);
						}
					}
				}
			}
		},
	}
})


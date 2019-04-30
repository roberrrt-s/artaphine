const APP = {
	NAME         : 'artaphine',
	VERSION      : '1.0.1',
	AUTHOR       : 'Robert Spier',
	CREATION_DATE: new Date().getFullYear()
};

class App {

	constructor() {
		console.log(`${APP.NAME} ${APP.VERSION}, © ${APP.CREATION_DATE} ${APP.AUTHOR}`);
		this.glitch();
	}

	glitch() {
		const imagePath = 'images/bg.jpg';
		const imgContainerEl = document.getElementById( 'img-container' );

		const params = {
			amount:     this.random(1, 100),
			iterations: this.random(1, 100),
			quality:    this.random(1, 100),
			seed:       this.random(1, 100)
		};

		loadImage( imagePath, function ( img ) {
			glitch( params )
				.fromImage( img )
				.toDataURL()
				.then( function( dataURL ) {
					var imageEl = new Image();
					imgContainerEl.style.backgroundImage = "url("+ dataURL +")";
				} );
		} );

		function loadImage ( src, callback ) {
			var imageEl = new Image();
			imageEl.onload = function () {
				callback( imageEl );
			};
			imageEl.src = src;
		}

	}

	random(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
};

const app = new App();

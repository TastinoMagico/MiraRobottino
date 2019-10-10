            var camera, scene, renderer;
			var geometry, material, mesh;
			var controls;
                
			init();
			animate();
			var controlsEnabled = false;
			var prevTime = performance.now();
            //scene setup
			function init() {
				camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 );
                controls = new THREE.PointerLockControls( camera );
				var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
				light.position.set( 0.5, 1, 0.75 );
                
                scene = new THREE.Scene();
				scene.add( light );
				scene.add( controls.getObject() );

				renderer = new THREE.WebGLRenderer();
				renderer.setClearColor( 0xffffff );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
                document.getElementById("canvas").appendChild(renderer.domElement);
				window.addEventListener( 'resize', onWindowResize, false );  
    
			    }
            
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
            
			function animate() {
				requestAnimationFrame( animate );
				if ( controlsEnabled ) {
                    
					var time = performance.now();
					var delta = ( time - prevTime ) / 1000;
					prevTime = time;
   
				}
				renderer.render( scene, camera );
			}

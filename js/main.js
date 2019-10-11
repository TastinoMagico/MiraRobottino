            var camera, scene, renderer;
			var geometry, material, mesh;
            var gametime;
			var controls;
            var objects = [];
            var score = 0;
                
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
                window.addEventListener('mousedown', mdown, false);

                targetgen(3);

			    }

        

            function mdown( event ) { 
                this.raycaster = new THREE.Raycaster();
                this.pickedObject = null;
                this.raycaster.setFromCamera({x: 0, y: 0}, camera);
                // get the list of objects the ray intersected
                const intersectedObjects = this.raycaster.intersectObjects(scene.children);
                if (intersectedObjects.length) {
                // pick the first object. It's the closest one
                this.pickedObject = intersectedObjects[0].object;
                this.pickedObject.position.y = numgen(-50, 50);
                repos(this.pickedObject);
                this.pickedObject.position.x = numgen(-50, 50);
                
                var hitsound = new Audio('hitsound.ogg');
                hitsound.play();      
                scoreupdate();
                
                
                console.log("o(≧∇≦)o");
                
                }
            }

            function scoreupdate() 
            { 
                score += 1;
            }
            function getscore()
            {
                return score;
            }
            function scoreset()
            {
                score = 0;
            }
            
            function repos(obj){
                obj.position.y = numgen(-50, 50);
                obj.position.x = numgen(-50, 50);
            }


            function targetgen(n){
                    geometry = new THREE.BoxGeometry( 20,20, 20);
        				for ( var i = 0; i < n; i ++ ) {

					material = new THREE.MeshPhongMaterial( { specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );
					var mesh = new THREE.Mesh( geometry, material );
					
                    repos(mesh);
					
                    mesh.position.z = -80;
          
					scene.add( mesh );
					material.color.set(0xff5757);
					objects.push( mesh );
				}
            }
            
         
                
            function numgen(min, max){
            return min + (max - min) * Math.random();
            }
            
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

            
                var gametimer = window.setInterval(countdown, 1000);
            function starttimer(){
                timer = 15;
                console.log("timerstarted");
            }
            function settimer(){
                window.clearInterval(gametimer);
                timer = 0;
            }
            function gettimer(){
                return timer;
            }
            function countdown(){
                timer -= 1;
            }
     
            
			function animate() {
				requestAnimationFrame( animate );
                if ( controlsEnabled ) {
                    
                        if (gettimer() == 0)
                            {
                                console.log("score screen");
                                document.exitPointerLock = document.exitPointerLock    ||
                                document.mozExitPointerLock;
                                document.exitPointerLock();
                                document.getElementById("instructions").innerHTML ="<span style='font-size:40px''>" + getscore() +"</span><br /><br />premi F5";
                                controls.enabled = false;
                                blocker.style.display = '-webkit-box';
                                blocker.style.display = '-moz-box';
                                blocker.style.display = 'box';
                                instructions.style.display = '';
                                settimer();
                                
                            }
                document.getElementById("timer").innerHTML = gettimer();

				}

				renderer.render( scene, camera );
			}

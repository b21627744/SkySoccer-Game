var renderer, scene, camera, pointLight, spotLight;

var fieldWidth = 600, fieldHeight = 400;
var scoregeometry2,scoregeometry1;

var playerWidth, playerHeight, playerDepth, playerQuality;
var playerSpeed = 4;

var counter_for_team1_switch=false;
var counter_for_team2_switch=false;

var goalfinallight,goalfinallight1,goallight1,goallight2,goallight3,goallight4;

var ball, ball_X = 0, ball_Y = 0, ballSpeed = 0;
var lightx=0,lighty=0,lightz=460;
var team=1;

var score1 = 0, score2 = 0;
var maxScore = 5;
var seconds = 0;

var Enter_isUp;

var can_move = false, can_move1 = true, can_move2 = true, can_move3 = false, can_move4 = false;
var scored=0;

var shading=false;

var shootforoyuncu1=false,shootforoyuncu2=false,shootforoyuncu3=false,shootforoyuncu3=false;
var passforoyuncu1=false,passforoyuncu2=false,passforoyuncu3=false,passforoyuncu3=false;
var c;

function animate(){       
    createformas();
    rotate_kick();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    pause();
    ballPhysics();
    playerPhysicscall();
    player1Movement();
    player2Movement();
    return_kick();
}

function shadingOption(){
    if(shading){
        head1.material=bodymaterialflat;
        head2.material=bodymaterialflat;
        head3.material=bodymaterialflat;
        head4.material=bodymaterialflat;
        arm1.material=bodymaterialflat;
        arm2.material=bodymaterialflat;
        arm3.material=bodymaterialflat;
        arm4.material=bodymaterialflat;
        arm5.material=bodymaterialflat;
        arm6.material=bodymaterialflat;
        arm7.material=bodymaterialflat;
        arm8.material=bodymaterialflat;
        leg1.material=bodymaterialflat;
        leg2.material=bodymaterialflat;
        leg3.material=bodymaterialflat;
        leg4.material=bodymaterialflat;
        leg5.material=bodymaterialflat;
        leg6.material=bodymaterialflat;
        leg7.material=bodymaterialflat;
        leg8.material=bodymaterialflat;
        
        
        plane.material=planeMaterialflat;
        ball.material=sphereMaterialflat;
        
    }
    else{
        head1.material=bodymaterial;
        head2.material=bodymaterial;
        head3.material=bodymaterial;
        head4.material=bodymaterial;
        arm1.material=bodymaterial;
        arm2.material=bodymaterial;
        arm3.material=bodymaterial;
        arm4.material=bodymaterial;
        arm5.material=bodymaterial;
        arm6.material=bodymaterial;
        arm7.material=bodymaterial;
        arm8.material=bodymaterial;
        leg1.material=bodymaterial;
        leg2.material=bodymaterial;
        leg3.material=bodymaterial;
        leg4.material=bodymaterial;
        leg5.material=bodymaterial;
        leg6.material=bodymaterial;
        leg7.material=bodymaterial;
        leg8.material=bodymaterial;
        
        plane.material=planeMaterial;
        ball.material=sphereMaterial;
    }
        
}

var is_make_goal_up=1;
function character_happiness(player_1,player_2){
    if(player_1.position.z>=((playerDepth+5)*2)){
        is_make_goal_up=0;
    }
    else if(player_1.position.z<=(playerDepth+5)){
        is_make_goal_up=1;
    }
    if(is_make_goal_up){
        player_1.position.z+=3;
        player_2.position.z+=3;
    }
    else{
        player_1.position.z-=5;
        player_2.position.z-=5;
    }
    
}


function incrementSeconds() {
    seconds += 1;
   
}
window.onload = function init() {
    var cancel = setInterval(incrementSeconds, 500);
  
    var WIDTH = document.getElementById("gameCanvas").getAttribute('width'),
        HEIGHT = document.getElementById("gameCanvas").getAttribute('height');

  
    var VIEW_ANGLE = 75,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

    c = document.getElementById("gameCanvas"); 
    renderer = new THREE.WebGLRenderer({
            c,
            alpha: true,
        });
        
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);

    scene = new THREE.Scene();
    scene.add(camera);
    camera.position.z = 350;
    camera.up.set( 0, 0, 1 );
        var geometry= new THREE.CubeGeometry(5000,5000,5000);
        var cubeMaterials=[
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader( ).load("bg/ThickCloudsWaterRight.jpg"),side:THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader( ).load("bg/ThickCloudsWaterLeft.jpg"),side:THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader( ).load("bg/ThickCloudsWaterFront.jpg"),side:THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader( ).load("bg/ThickCloudsWaterBack.jpg"),side:THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader( ).load("bg/ThickCloudsWaterUp.jpg"),side:THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader( ).load("bg/ThickCloudsWaterDown.jpg"),side:THREE.DoubleSide})
        ]
        var cubeMaterial=new THREE.MeshFaceMaterial(cubeMaterials);
        var cube=new THREE.Mesh(geometry,cubeMaterial);
    scene.add(cube);
    renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild( renderer.domElement );
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    c.appendChild(renderer.domElement);
    controls.enablePan = false;
  
  
    var planeWidth = fieldWidth,
    planeHeight = fieldHeight,
    planeQuality = 10;

    galatasarayforma = new THREE.MeshPhongMaterial({
                     map: THREE.ImageUtils.loadTexture('bg/galatasaray.png')
    });
   
  
    fenerbahceforma = new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture('bg/fenerbahce.png')
    });
               
    trabzonforma = new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture('bg/trabzonspor.png')
    });
                
    galatasarayformaflat = new THREE.MeshPhongMaterial({
                     map: THREE.ImageUtils.loadTexture('bg/galatasaray.png')
    });
    galatasarayformaflat.flatShading =true;
  
    fenerbahceformaflat = new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture('bg/fenerbahce.png')
    });
               
    fenerbahceformaflat.flatShading =true;
    trabzonformaflat = new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture('bg/trabzonspor.png')
    });
                
    trabzonformaflat.flatShading =true;
  
    planeMaterial =new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        ambient: 0xFFFFFF,
        emissive: 0x000000,
        map: THREE.ImageUtils.loadTexture('bg/green-football-stadium.png')
    });
    planeMaterialflat =new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        ambient: 0xFFFFFF,
        emissive: 0x000000,
        map: THREE.ImageUtils.loadTexture('bg/green-football-stadium.png')
    });
    planeMaterialflat.flatShading =true;
        
    planegeometry=new THREE.PlaneGeometry(planeWidth, planeHeight, planeQuality, planeQuality)
    plane = new THREE.Mesh(planegeometry,  planeMaterial);
    scene.add(plane); 
    plane.receiveShadow = true; 

    sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        ambient: 0xFFFFFF,
        emissive: 0x000000,
        map: THREE.ImageUtils.loadTexture('bg/soccer_ball.jpg')
    });
    sphereMaterialflat = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        ambient: 0xFFFFFF,
        emissive: 0x000000,
        map: THREE.ImageUtils.loadTexture('bg/soccer_ball.jpg')
    });
    sphereMaterialflat.flatShading =true;    
    
    ballgeometry=new THREE.SphereGeometry(10,6,6);
    ball = new THREE.Mesh(ballgeometry,sphereMaterial);
    scene.add(ball);
    
    ball.position.x = 0;
    ball.position.y = 0;
    ball.position.z = 10;
    ball.receiveShadow = true;
    ball.castShadow = true;
  
  
  
    oyuncu1 = new THREE.Object3D();
    scene.add(oyuncu1);
    oyuncu2 = new THREE.Object3D();
    scene.add(oyuncu2);
    oyuncu3 = new THREE.Object3D();
    scene.add(oyuncu3);
    oyuncu4 = new THREE.Object3D();
    scene.add(oyuncu4);
  
  
    playerWidth = 10;
    playerHeight = 25;
    playerDepth = 20;
    playerQuality = 1;
  
    var BodyGeometry  = new THREE.CubeGeometry(playerWidth,playerHeight,playerDepth,playerQuality,playerQuality,playerQuality);
  
        
    body1 = new THREE.Mesh(BodyGeometry, galatasarayforma);
    oyuncu1.add(body1);
    body1.receiveShadow = true;
    body1.castShadow = true;

  
    body2 = new THREE.Mesh(BodyGeometry, fenerbahceforma);
    oyuncu2.add(body2);
    body2.receiveShadow = true;
    body2.castShadow = true;

    body3 = new THREE.Mesh(BodyGeometry, fenerbahceforma);
    oyuncu3.add(body3);
    body3.receiveShadow = true;
    body3.castShadow = true;

    body4 = new THREE.Mesh(BodyGeometry, galatasarayforma);
    oyuncu4.add(body4);
    body4.receiveShadow = true;
    body4.castShadow = true;

    oyuncu1.position.x = -fieldWidth/2 + playerWidth + 50;
    oyuncu2.position.x = fieldWidth/2 - playerWidth - 50;
    oyuncu3.position.x = fieldWidth/4 - playerWidth - 50;
    oyuncu4.position.x = -fieldWidth/4 + playerWidth + 50;
        
    body1.position.x = 0;
    body2.position.x = 0;
    body3.position.x = 0;
    body4.position.x = 0;
        
    oyuncu1.position.z = playerDepth + 5;
    oyuncu2.position.z = playerDepth + 5;
    oyuncu3.position.z = playerDepth + 5;
    oyuncu4.position.z = playerDepth + 5;
        
    body1.position.z -= 5;
    body2.position.z -= 5;
    body3.position.z -= 5;
    body4.position.z -= 5;
        
    oyuncu1_rotation_temp =  oyuncu1.rotation.y;
    oyuncu2_rotation_temp =  oyuncu2.rotation.y;
    oyuncu3_rotation_temp =  oyuncu3.rotation.y;
    oyuncu4_rotation_temp =  oyuncu4.rotation.y;
  
    bodymaterial=new THREE.MeshPhongMaterial( {color: 0xffab5e} );
    bodymaterialflat=new THREE.MeshPhongMaterial( {color: 0xffab5e} );
    bodymaterialflat.flatShading =true;
    CylinderGeometry = new THREE.SphereGeometry(playerWidth / 1.5, 32, 16, 0, 2* Math.PI, 0, Math.PI);
        
    head1 = new THREE.Mesh(CylinderGeometry, bodymaterial);
    head1.position.z=(playerWidth / 1.5 * 2 - 5);
    oyuncu1.add(head1);
  
    head2 = new THREE.Mesh(CylinderGeometry, bodymaterial);
    head2.position.z=(playerWidth / 1.5 * 2 - 5);
    oyuncu2.add(head2);
  
    head3 = new THREE.Mesh(CylinderGeometry, bodymaterial);
    head3.position.z=(playerWidth / 1.5 * 2 - 5);
    oyuncu3.add(head3);
        
    head4 = new THREE.Mesh(CylinderGeometry, bodymaterial);
    head4.position.z=(playerWidth / 1.5 * 2 - 5);
    oyuncu4.add(head4);
        
        
    geometryarm = new THREE.CylinderGeometry( 4, 4, 15, 32 );
    geometryleg = new THREE.CylinderGeometry( 4, 4, 20, 32 );
        
    arm1 = new THREE.Mesh( geometryarm, bodymaterial );
    arm1.position.set(0, 15, playerWidth / 1.5 * 2 - 5-10);
    arm1.rotateX (-55*Math.PI/180 );
    oyuncu1.add(arm1);
    
    arm2 = new THREE.Mesh( geometryarm, bodymaterial );
    arm2.position.set(0, -15, playerWidth / 1.5 * 2 - 5-10);
    arm2.rotateX (-125*Math.PI/180 );
    oyuncu1.add(arm2);
        
    arm3 = new THREE.Mesh( geometryarm, bodymaterial );
    arm3.position.set(0, 15, playerWidth / 1.5 * 2 - 5-10);
    arm3.rotateX (-55*Math.PI/180 );
    oyuncu3.add(arm3);
        
    arm4 = new THREE.Mesh( geometryarm, bodymaterial );
    arm4.position.set(0, -15, playerWidth / 1.5 * 2 - 5-10);
    arm4.rotateX (-125*Math.PI/180 );
    oyuncu3.add(arm4);
        
        
    arm5 = new THREE.Mesh( geometryarm, bodymaterial );
    arm5.position.set(0, 15, playerWidth / 1.5 * 2 - 5-10);
    arm5.rotateX (-55*Math.PI/180 );
    oyuncu4.add(arm5);
        
    arm6 = new THREE.Mesh( geometryarm, bodymaterial );
    arm6.position.set(0, -15, playerWidth / 1.5 * 2 - 5-10);
    arm6.rotateX (-125*Math.PI/180 );
    oyuncu4.add(arm6);
       
    arm7 = new THREE.Mesh( geometryarm, bodymaterial );
    arm7.position.set(0, 15, playerWidth / 1.5 * 2 - 5-10);
    arm7.rotateX (-55*Math.PI/180 );
    oyuncu2.add(arm7);
        
    arm8 = new THREE.Mesh( geometryarm, bodymaterial );
    arm8.position.set(0, -15, playerWidth / 1.5 * 2 - 5-10);
    arm8.rotateX (-125*Math.PI/180 );
    oyuncu2.add(arm8);
        
       
    leg1 = new THREE.Mesh( geometryleg, bodymaterial );
    leg1.position.set(0, 6, playerWidth / 1.5 * 2 - 5-25);
    leg1.rotateX (-90*Math.PI/180 );
    oyuncu1.add(leg1);
    
    leg2 = new THREE.Mesh( geometryleg, bodymaterial );
    leg2.position.set(0, -6, playerWidth / 1.5 * 2 - 5-25);
    leg2.rotateX (-90*Math.PI/180 );
    oyuncu1.add(leg2);
        
    leg3 = new THREE.Mesh( geometryleg, bodymaterial );
    leg3.position.set(0, 6, playerWidth / 1.5 * 2 - 5-25);
    leg3.rotateX (-90*Math.PI/180 );
    oyuncu3.add(leg3);
        
    leg4 = new THREE.Mesh( geometryleg, bodymaterial );
    leg4.position.set(0, -6, playerWidth / 1.5 * 2 - 5-25);
    leg4.rotateX (-90*Math.PI/180 );
    oyuncu3.add(leg4);
        
        
    leg5 = new THREE.Mesh( geometryleg, bodymaterial );
    leg5.position.set(0, 6, playerWidth / 1.5 * 2 - 5-25);
    leg5.rotateX (-90*Math.PI/180 );
    oyuncu4.add(leg5);
        
    leg6 = new THREE.Mesh( geometryleg, bodymaterial );
    leg6.position.set(0, -6, playerWidth / 1.5 * 2 - 5-25);
    leg6.rotateX (-90*Math.PI/180 );
    oyuncu4.add(leg6);
        
    leg7 = new THREE.Mesh( geometryleg, bodymaterial );
    leg7.position.set(0, 6, playerWidth / 1.5 * 2 - 5-25);
    leg7.rotateX (-90*Math.PI/180 );
    oyuncu2.add(leg7);
        
    leg8 = new THREE.Mesh( geometryleg, bodymaterial );
    leg8.position.set(0, -6, playerWidth / 1.5 * 2 - 5-25);
    leg8.rotateX (-90*Math.PI/180 );
    oyuncu2.add(leg8);

        arm1.castShadow = true;    
        arm2.castShadow = true;  
        arm3.castShadow = true;    
        arm4.castShadow = true;   
        arm5.castShadow = true;    
        arm6.castShadow = true;   
        arm7.castShadow = true;    
        arm8.castShadow = true;  
        
        leg1.castShadow = true;
        leg2.castShadow = true;
        leg3.castShadow = true;
        leg4.castShadow = true;
        leg5.castShadow = true;
        leg6.castShadow = true;
        leg7.castShadow = true;
        leg8.castShadow = true;


        head1.castShadow = true;    
        head2.castShadow = true;   
        head3.castShadow = true;
        head4.castShadow = true;
   
        materialgalatasaray = new THREE.MeshPhongMaterial( {color: 0xff0000} );
        materialfenerbahce = new THREE.MeshPhongMaterial( {color: 0x1400ff} );
        materialtrabzon= new THREE.MeshPhongMaterial( {color: 0x72060f} );
        
        var conegeometry = new THREE.ConeGeometry( 7, 15, 64,32 );
        cone1 = new THREE.Mesh( conegeometry, materialgalatasaray );
        
        cone1.position.x=oyuncu1.position.x;
        cone1.position.y=oyuncu1.position.y;
        cone1.position.z=oyuncu1.position.z+playerDepth+15;
        cone1.rotateX ( -90*Math.PI/180 );
        scene.add( cone1 );
        
        cone2 = new THREE.Mesh( conegeometry, materialfenerbahce );
        
        cone2.position.x=oyuncu2.position.x;
        cone2.position.y=oyuncu2.position.y;
        cone2.position.z=oyuncu2.position.z+playerDepth+15;
        cone2.rotateX ( -90*Math.PI/180 );
        scene.add( cone2 );
        
  
        redlight = new THREE.PointLight( 0xff0a0a, 5, 200 );
        redlight.position.set( 100, 0, 100 );
        scene.add( redlight );
        redlight.visible = false;
        
        yellowlight = new THREE.PointLight( 0xf2ff0a, 5, 200 );
        yellowlight.position.set( -100, 0, 100 );
        scene.add( yellowlight );
        yellowlight.visible = false;
        
        bluelight = new THREE.PointLight( 0x0000ff, 5, 200 );
        bluelight.position.set( 100, 0, 100 );
        scene.add( bluelight );
        bluelight.visible = false;
        
        bordolight = new THREE.PointLight( 0x72060f, 5, 200 );
        bordolight.position.set( 100, 0, 100 );
        scene.add( bordolight );
        bordolight.visible = false;
        
        mavilight = new THREE.PointLight( 0x79a9cf, 5, 200 );
        mavilight.position.set( -100, 0, 100 );
        scene.add( mavilight );
        mavilight.visible = false;
        
        goalfinallight= redlight;
        goalfinallight1= redlight;
        
        goallight1=redlight;
        goallight2=yellowlight;
        goallight3=bluelight;
        goallight4=yellowlight;
        
        spotLight = new THREE.SpotLight(0xFFFFFF);
        spotLight.position.set(0, 0, 460);
        spotLight.intensity = 1.5;
        spotLight.castShadow = true;
        scene.add(spotLight);
        spotLight.visible = true;
        renderer.shadowMapEnabled = true;
       
        var objLoader1 =new THREE.OBJLoader();
        objLoader1.setPath('./');
        objLoader1.load('football goal.obj' , function(object1){
            object1.position.y =-65;
            object1.position.x =-250;
            object1.position.z =20;
            object1.rotateZ(90*Math.PI/180);
            object1.scale.setComponent(0,0.25);
            object1.scale.setComponent(1,0.25);
            object1.scale.setComponent(2,0.25);
           
            scene.add(object1);
       });
       
     
       
       objLoader2 =new THREE.OBJLoader();
       objLoader2.setPath('./');
       objLoader2.load('football goal.obj' , function(object2){
           object2.position.y =65;
           object2.position.x =+250;
           object2.position.z =20;
           object2.rotateZ(-90*Math.PI/180);
           object2.scale.setComponent(0,0.25);
           object2.scale.setComponent(1,0.25);
           object2.scale.setComponent(2,0.25);
           
           scene.add(object2);
       });
       
       
       var mtlLoader = new THREE.MTLLoader();
       mtlLoader.setPath('./');
       mtlLoader.load('Tribune.mtl' , function(materials){
           materials.preload();
           //materials.flatshading=true;
           
       objLoader3 =new THREE.OBJLoader();
       objLoader3.setMaterials(materials);
       objLoader3.setPath('./');
       objLoader3.load('Tribune.obj' , function(object3){
           object3.position.y =-195;
           object3.position.x =25;
           object3.position.z =50;
           object3.rotateZ(180*Math.PI/180);
           object3.rotateX(90*Math.PI/180);
           object3.scale.setComponent(0,0.081);
           object3.scale.setComponent(1,0.1);
           object3.scale.setComponent(2,0.1);
           
           scene.add(object3);
       });
       
       objLoader4 =new THREE.OBJLoader();
       objLoader4.setMaterials(materials);
       objLoader4.setPath('./');
       objLoader4.load('Tribune.obj' , function(object4){
           object4.position.y =195;
           object4.position.x =-55;
           object4.position.z =50;
           object4.rotateZ(0*Math.PI/180);
           object4.rotateX(90*Math.PI/180);
           object4.scale.setComponent(0,0.081);
           object4.scale.setComponent(1,0.1);
           object4.scale.setComponent(2,0.1);
           
           scene.add(object4);
       });
       
       });
 
   animate();
        
}

function createformas(){

        document.getElementById("team0").onclick = function(){
            body1.material=galatasarayforma;
            body4.material=galatasarayforma;
            cone1.material=materialgalatasaray;
            goallight1=redlight;
           goallight2=yellowlight;
        };
        document.getElementById("team1").onclick = function(){
            body1.material=fenerbahceforma;
            body4.material=fenerbahceforma;
            cone1.material=materialfenerbahce;
            goallight1=bluelight;
           goallight2=yellowlight;
        
        };
        document.getElementById("team2").onclick = function(){
            body1.material=trabzonforma;
            body4.material=trabzonforma
            cone1.material=materialtrabzon;
            goallight1=bordolight;
           goallight2=mavilight;
        };
        
    
        document.getElementById("team3").onclick = function(){
            body2.material=galatasarayforma;
            body3.material=galatasarayforma;
            cone2.material=materialgalatasaray;
             goallight3=redlight;
           goallight4=yellowlight;
            
        };
        document.getElementById("team4").onclick = function(){
            body2.material=fenerbahceforma;
            body3.material=fenerbahceforma;
            cone2.material=materialfenerbahce;
            goallight3=bluelight;
           goallight4=yellowlight;
        };
        document.getElementById("team5").onclick = function(){
            body2.material=trabzonforma;
            body3.material=trabzonforma;
            cone2.material=materialtrabzon;
            goallight3=bordolight;
           goallight4=mavilight;
        };
}

var scored_gamer1,scored_gamer2;


function ballPhysics()
{   
        
  if(scored!=1){
            seconds=0
            spotLight.visible = true;
            goalfinallight.visible=false;
            goalfinallight1.visible=false;
            
        }
        else if(scored==1){
            character_happiness(scored_gamer1,scored_gamer2);
            if(seconds%2==1){
                spotLight.visible = false;
                goalfinallight.visible=true;  
                goalfinallight1.visible=true;
            }
            else{
                spotLight.visible = true;
                goalfinallight.visible=false;
                goalfinallight1.visible=false;
            }
            if(seconds>=6){
            
            scored=0;
            resetgame();
            }
        }
        
  if(can_move){
  
  if (ball.position.x <= -250)
  { 
    if ((ball.position.y >= -60) && (ball.position.y <= 60)){
                    
                    if(scored!=1){
                        scored_gamer1=oyuncu2;
                        scored_gamer2=oyuncu3;
                        goalfinallight=goallight3;
                        goalfinallight1=goallight4;
                        seconds=0;
                        score1++;
                        document.getElementById('GOL').play();
                        
                    }
                    scored=1;
                    if (score1 >= maxScore) can_move = false;
                    document.getElementById("scores").innerHTML = "<span class='black'>" + score2 + "</span>-<span class='black'>" + score1 + "</span>";
        
                    }
                if(scored){
                    if(ball.position.y <= -65 || ball.position.y>=65){
                         ballSpeed=0.6;
                        ball_Y = -ball_Y;
                        ball.rotation.y = -ball.rotation.y;
                       
                    }
             
                    if(ball.position.x>=295 ||ball.position.x <= -295){
                            ballSpeed=0.6;
                            ball_X =- ball_X;
                            ball.rotation.x = -ball.rotation.x;
                            
                        }
                    }
                    else{
      ball_X = -ball_X;
      ball.rotation.x = -ball.rotation.x;
                    }
  }
        
  
  
  if (ball.position.x >= 250)
  { 
    if ((ball.position.y >= -60) && (ball.position.y <= 60)){
                        if(scored!=1){
                            scored_gamer1=oyuncu1;
                            scored_gamer2=oyuncu4;
                            seconds=0;
                            score2++;
                            document.getElementById('GOL').play();
                            goalfinallight=goallight1;
                            goalfinallight1=goallight2;
                        }
                        scored=1;
                        if (score2 >= maxScore) can_move = false;
                        document.getElementById("scores").innerHTML = "<span class='black'>" + score2 + "</span>-<span class='black'>" + score1 + "</span>";
      
                        
        
    }
                if(scored){
                    if(ball.position.y <= -65 || ball.position.y>=65){
                        ballSpeed=0.6;
                        ball_Y = -ball_Y;
                        ball.rotation.y = -ball.rotation.y;
                        
                    }
             
                    if(ball.position.x>=295 ||ball.position.x <= -295){
                            ball_X =- ball_X;
                            ball.rotation.x = -ball.rotation.x;
                            ballSpeed=0.6;
                        }
                }
                else{
      ball_X = -ball_X;
      ball.rotation.x = -ball.rotation.x;
    }
  }
  
  
  if (ball.position.y <= -180 )
  {
    ball_Y = -ball_Y;
    ball.rotation.y = -ball.rotation.y;
  } 
  
  if (ball.position.y >= 180)
  {
    ball_Y = -ball_Y;
    ball.rotation.y = -ball.rotation.y;
  }
    
  
    
            ball.position.x += ball_X * ballSpeed;
            ball.position.y += ball_Y * ballSpeed;
    
            if(ball.rotation.y < 0)
            ball.rotation.y -= ballSpeed * 0.075;
            else
            ball.rotation.y += ballSpeed * 0.075;
    
            if(ball.rotation.x < 0)
            ball.rotation.X -= ballSpeed * 0.075;
            else
            ball.rotation.X += ballSpeed * 0.075;
  }
        if(ballSpeed>=0.005)
            ballSpeed-=0.005;
        else 
            ballSpeed=0;
}

function player2Movement()
{
        if(can_move){
            if(can_move2){
    
                cone2.position.x=oyuncu2.position.x;
                cone2.position.y=oyuncu2.position.y;
                cone2.position.z=oyuncu2.position.z+playerDepth+15;
                
    if ( Key.isDown(Key.A)) {
                    if (oyuncu2.position.y < 180){
        oyuncu2.position.y += playerSpeed * 0.5;
      }
      else{
        oyuncu2.position.y += 0;

      }
    } 
    
    else if ( Key.isDown(Key.D))
    {
      if (oyuncu2.position.y > -180){
        oyuncu2.position.y += -playerSpeed * 0.5;
      }
      else
      {
        oyuncu2.position.y += 0;
      }
    }
    else{
      
      oyuncu2.position.y += 0;
    }
                if ( Key.isDown(Key.W)) {
      if (oyuncu2.position.x < 250){
        oyuncu2.position.x += playerSpeed * 0.5;
      }
      else{
        oyuncu2.position.x += 0;
      }
    } 
    else if ( Key.isDown(Key.S)){
      if (oyuncu2.position.x > -250){
        oyuncu2.position.x += -playerSpeed * 0.5;
      }
      else{
        oyuncu2.position.x += 0;
      }
    }
    else{
      oyuncu2_X = 0;
    }
            }
            
            if(can_move3){
                cone2.position.x=oyuncu3.position.x;
                cone2.position.y=oyuncu3.position.y;
                cone2.position.z=oyuncu3.position.z+playerDepth+15;
                
    if ( Key.isDown(Key.A)) {
      
                    if (oyuncu3.position.y < 180){
        oyuncu3.position.y += playerSpeed * 0.5;
      }
                        else{
        oyuncu3.position.y += 0;
      }
    } 
    else if ( Key.isDown(Key.D)){
      if (oyuncu3.position.y > -180){
        oyuncu3.position.y += -playerSpeed * 0.5;
      }
      else{
        oyuncu3.position.y += 0;
      }
    }
    else{
      oyuncu3_Y = 0;
    }
                if ( Key.isDown(Key.W)){
      if (oyuncu3.position.x < 250){
        oyuncu3.position.x += playerSpeed * 0.5;
      }
      else{
        oyuncu3.position.x += 0;
      }
    } 
    else if ( Key.isDown(Key.S)){
      if (oyuncu3.position.x > -250){
        oyuncu3.position.x += -playerSpeed * 0.5;
      }
      else{
        oyuncu3.position.x += 0;
      }
    }
    else{
      oyuncu3.position.x += 0;
    }
            }
        }
}


function player1Movement()
{
  if(can_move){
            if(can_move1){
    
                cone1.position.x=oyuncu1.position.x;
                cone1.position.y=oyuncu1.position.y;
                cone1.position.z=oyuncu1.position.z+playerDepth+15;
         
         
    if ( Key.isDown(Key.LEFTARROW))   
    {
      
      if (oyuncu1.position.y < 180)
      {
        oyuncu1.position.y += playerSpeed * 0.5;
      }
      
      else
      {
        oyuncu1.position.y += 0;
      }
    } 
    
    else if ( Key.isDown(Key.RIGHTARROW))
    {
      if (oyuncu1.position.y > -180)
      {
        oyuncu1.position.y += -playerSpeed * 0.5;
      }
      else
      {
        oyuncu1.position.y += 0;
      }
    }
    else
    {
      oyuncu1.position.y += 0;
    }
                if ( Key.isDown(Key.UPARROW))   
    {
      if (oyuncu1.position.x < 250)
      {
        oyuncu1.position.x += playerSpeed * 0.5;
      }
      else
      {
        oyuncu1.position.x += 0;
      }
    } 
    
    else if ( Key.isDown(Key.DOWNARROW))
    {
      if (oyuncu1.position.x > -250)
      {
        oyuncu1.position.x +=-playerSpeed * 0.5;
      }
      else
      {
        oyuncu1.position.x += 0;
      }
    }
    else
    {
      oyuncu1.position.x += 0;
    }
    
            }
            
            if(can_move4){
    
                cone1.position.x=oyuncu4.position.x;
                cone1.position.y=oyuncu4.position.y;
                cone1.position.z=oyuncu4.position.z+playerDepth+15;
                
             
    if ( Key.isDown(Key.LEFTARROW))   
    {
      
      if (oyuncu4.position.y < 180)
      {
        oyuncu4.position.y += playerSpeed * 0.5;
      }
      
      else
      {
        oyuncu4.position.y += 0;
      }
    } 
    
    else if ( Key.isDown(Key.RIGHTARROW))
    {
      if (oyuncu4.position.y > -180)
      {
        oyuncu4.position.y += -playerSpeed * 0.5;
      }
      else
      {
        oyuncu4.position.y += 0;
      }
    }
    else
    {
      oyuncu4.position.y += 0;
    }
                if ( Key.isDown(Key.UPARROW))   
    {
      if (oyuncu4.position.x < 250)
      {
        oyuncu4.position.x += playerSpeed * 0.5;
      }
      else
      {
        oyuncu4.position.x += 0;
      }
    } 
    
    else if ( Key.isDown(Key.DOWNARROW))
    {
      if (oyuncu4.position.x > -250)
      {
        oyuncu4.position.x += -playerSpeed * 0.5;
      }
      else
      {
        oyuncu4.position.x += 0;
      }
    }
    else
    {
      oyuncu4.position.x += 0;
    }
            }
       
  }
}

var oyuncu1_rotation = false;
var oyuncu2_rotation = false;
var oyuncu3_rotation = false;
var oyuncu4_rotation = false;
var rotation_right = true;

function playerPhysicscall(){
        playerPhysics(oyuncu1,oyuncu1_rotation,shootforoyuncu1,passforoyuncu1,oyuncu4);
        playerPhysics(oyuncu2,oyuncu2_rotation,shootforoyuncu2,passforoyuncu2,oyuncu3);
        playerPhysics(oyuncu3,oyuncu3_rotation,shootforoyuncu3,passforoyuncu3,oyuncu2);
        playerPhysics(oyuncu4,oyuncu4_rotation,shootforoyuncu3,passforoyuncu3,oyuncu1);
  
}


function playerPhysics(oyuncu1,oyuncu1_rotation,shootforpaddle,passforpaddle,teammatepaddle)
{       
        var newwidth=playerWidth;
        if(shootforpaddle==true || passforpaddle==true){
            newwidth=playerWidth+10;
        }
  
        var temp=0;
        
  if (ball.position.y <= oyuncu1.position.y + playerHeight*1/2 +7.5)
            if(ball.position.y >= oyuncu1.position.y - playerHeight*1/2 -7.5){
  
          
      if (ball.position.x <= oyuncu1.position.x + newwidth)
                            if(ball.position.x >= oyuncu1.position.x){    
                                ballSpeed=1.5;
                                    if((passforpaddle) &&teammatepaddle.position.x >oyuncu1.position.x && ball.position.y >= oyuncu1.position.y-10 && teammatepaddle.position.y >= ball.position.y ){
                                        temp = Math.pow(teammatepaddle.position.y-ball.position.y , 2 ) + Math.pow(teammatepaddle.position.x-ball.position.x , 2 );
                                        ball_Y=(teammatepaddle.position.y-ball.position.y)/Math.sqrt(temp)*playerSpeed*0.5;
                                        ball_X=(teammatepaddle.position.x-ball.position.x)/Math.sqrt(temp)*playerSpeed*0.5;
                                    }
                                    else if((passforpaddle) && teammatepaddle.position.x >oyuncu1.position.x && ball.position.y <= oyuncu1.position.y+10 && teammatepaddle.position.y <= ball.position.y ){
                                        temp = Math.pow(teammatepaddle.position.y-ball.position.y , 2 ) + Math.pow(teammatepaddle.position.x-ball.position.x , 2 );
                                        ball_Y=(teammatepaddle.position.y-ball.position.y)/Math.sqrt(temp)*playerSpeed*0.5;
                                        ball_X=(teammatepaddle.position.x-ball.position.x)/Math.sqrt(temp)*playerSpeed*0.5;
                                    }
                                    else{
                                         temp=Math.abs(Math.abs(ball.position.y)-Math.abs(oyuncu1.position.y));
                                    if(temp >= 5 && temp < 10 ){
                                        temp=25;
                                    
                                    }
                                    else if(temp >= 10 && temp < 15 ){
                                        temp=50;
                                    }
                                    
                                    else if(temp >= 15 && temp < 20 ){
                                        temp=75;
                                    }
                                    
                                    else if(temp>=20){
                                        temp=90;
                                    }
                                    
                                    if(shootforpaddle==false){
                                        ballSpeed=1.2;
                                    }
                                    else{
                                        ballSpeed=2.4;
                                    }
                                
                               
                                    if(ball.position.y>=oyuncu1.position.y-5 && ball.position.y<=oyuncu1.position.y+5){
                                        ball_Y=0;
                                        ball_X=(playerSpeed*0.5+0.5);
                                    }
                                    else if(ball.position.y > oyuncu1.position.y){
                                        
                                        ball_Y = Math.sin(temp*Math.PI/180)*playerSpeed*0.5;
                                        ball_X = Math.cos(temp*Math.PI/180)*playerSpeed*0.5;
                                        
                                        
                                    }
                                    else if(ball.position.y < oyuncu1.position.y){
                                        
                                        
                                        ball_Y = -Math.sin(temp*Math.PI/180)*playerSpeed*0.5;
                                        ball_X = Math.cos(temp*Math.PI/180)*playerSpeed*0.5;
                                        
                                    }
                                        
                                    }
                                    
                                    oyuncu1_rotation = true;
                                    rotation_right = true;
                                    
        
                                    ball.rotation.x = -ball.rotation.x;
                                   
        document.getElementById('hit').play();
      }
    
    
      if (ball.position.x >= oyuncu1.position.x - newwidth)
                            if(ball.position.x <= oyuncu1.position.x){
                                ballSpeed=1.5;
                                
                                    if((passforpaddle) &&teammatepaddle.position.x <oyuncu1.position.x && ball.position.y >= oyuncu1.position.y-10 && teammatepaddle.position.y >= ball.position.y ){
                                        temp = Math.pow(teammatepaddle.position.y-ball.position.y , 2 ) + Math.pow(teammatepaddle.position.x-ball.position.x , 2 );
                                        ball_Y=(teammatepaddle.position.y-ball.position.y)/Math.sqrt(temp)*playerSpeed*0.5;
                                        ball_X=(teammatepaddle.position.x-ball.position.x)/Math.sqrt(temp)*playerSpeed*0.5;
                                       
                                    }
                                    else if((passforpaddle) && teammatepaddle.position.x <oyuncu1.position.x && ball.position.y <= oyuncu1.position.y+10 && teammatepaddle.position.y <= ball.position.y ){
                                        temp = Math.pow(teammatepaddle.position.y-ball.position.y , 2 ) + Math.pow(teammatepaddle.position.x-ball.position.x , 2 );
                                        ball_Y=(teammatepaddle.position.y-ball.position.y)/Math.sqrt(temp)*playerSpeed*0.5;
                                        ball_X=(teammatepaddle.position.x-ball.position.x)/Math.sqrt(temp)*playerSpeed*0.5;
                                      
                                    }
                                    else{
                                         temp=Math.abs(Math.abs(ball.position.y)-Math.abs(oyuncu1.position.y));
                                    if(temp >= 5 && temp < 10 ){
                                        temp=25;
                                    
                                    }
                                    else if(temp >= 10 && temp < 15 ){
                                        temp=50;
                                    }
                                    
                                    else if(temp >= 15 && temp < 20 ){
                                        temp=75;
                                    }
                                    
                                    else if(temp>=20){
                                        temp=90;
                                    }
                                        if(shootforpaddle==false){
                                    ballSpeed=1.2;
                                }
                                else{
                                    ballSpeed=2.4;
                                }
                                 if(ball.position.y>=oyuncu1.position.y-5 && ball.position.y<=oyuncu1.position.y+5){
                                        ball_Y=0;
                                        ball_X=-(playerSpeed*0.5+0.5);
                                    }
                                    else if(ball.position.y > oyuncu1.position.y){
                        
                                        
                                        ball_Y = Math.cos(temp/15*Math.PI/180)*playerSpeed*0.5;
                                        ball_X = -Math.sin(temp/15*Math.PI/180)*playerSpeed*0.5;
                                    }
                                    else if(ball.position.y < oyuncu1.position.y){
                                        
                                        ball_Y = -Math.cos(temp*Math.PI/180)*playerSpeed*0.5;
                                        ball_X = -Math.sin(temp*Math.PI/180)*playerSpeed*0.5;
                                        
                                    }
                                    }
        
        oyuncu1_rotation = true;
        rotation_right = false;
        
        
        ball.rotation.x = -ball.rotation.x;
        
                                
        
        document.getElementById('hit').play();
      }
  }
  
  
  
}

function resetgame()
{       
        can_move1=true;
        can_move2=true;
        can_move3=false;
        can_move4=false;
        
        
        ballSpeed = 0.0;
        ball.position.x = 0;
        ball.position.y = 0;
        ball.rotation.x=0;
        ball.rotation.y=0;
  
        ball_X = 0;
        ball_Y = 0;
        
        oyuncu1.position.x = -fieldWidth/2 + playerWidth + 50;
        oyuncu2.position.x = fieldWidth/2 - playerWidth - 50;
        oyuncu3.position.x = fieldWidth/4 - playerWidth - 50;
        oyuncu4.position.x = -fieldWidth/4 + playerWidth + 50;
        cone1.position.x = -fieldWidth/2 + playerWidth + 50;
        cone2.position.x = fieldWidth/2 - playerWidth - 50;
        
        
        
        oyuncu1.position.y = 0;
        oyuncu2.position.y = 0;
        oyuncu3.position.y = 0;
        oyuncu4.position.y = 0;
        
        cone1.position.y = 0;
        cone2.position.y = 0;
        
        oyuncu1.position.z = (playerDepth+5);
        oyuncu2.position.z = (playerDepth+5);
        oyuncu3.position.z = (playerDepth+5);
        oyuncu4.position.z = (playerDepth+5); 
        
  
}
function pause(){
  if (score2 < maxScore && score1 < maxScore)
  if (Enter_isUp)   
  {
               
    if (can_move == false){
      can_move = true; 
                        document.getElementById('Baslangic').play();
    }else{
      can_move = false; 
    }
    Enter_isUp = false;
  }
}

function rotate_kick(){
        
  if(can_move){
    
      oyuncu1_rotation_temp =  oyuncu1.rotation.y;
      oyuncu2_rotation_temp =  oyuncu2.rotation.y;
                        oyuncu3_rotation_temp =  oyuncu3.rotation.y;
                        oyuncu4_rotation_temp =  oyuncu4.rotation.y;
      
  
    if(Key.isDown(Key.SPACE) || Key.isDown(Key.M ) ){
                    if(can_move1){
                        if(Key.isDown(Key.SPACE)){
                            shootforoyuncu1=true;
                            passforoyuncu1=false;
                        }
                        else{
                            passforoyuncu1=true;
                            shootforoyuncu1=false;
                        }
                        
      if(rotation_right){
                                oyuncu1.rotation.y += -8*10 * Math.PI/180;
                                
                        }
                                
      else{
                                oyuncu1.rotation.y += 8*10 * Math.PI/180;
                                
                            }
                        }
                     else if(can_move4){
                         if(Key.isDown(Key.SPACE)){
                            shootforoyuncu3=true;
                            passforoyuncu3=false;
                        }
                        else{
                            shootforoyuncu3=false;
                            passforoyuncu3=true;
                        }
                        
                     
      if(rotation_right){
                                oyuncu4.rotation.y += -8*10 * Math.PI/180;
                                
                        }
                                
      else{
                                oyuncu4.rotation.y += 8*10 * Math.PI/180;
                                
                            }
                }
    }
                else{
                    shootforoyuncu1=false;
                    shootforoyuncu3=false;
                    passforoyuncu1=false;
                    passforoyuncu3=false;
                }
                    
                    
                if(Key.isDown(Key.K) || Key.isDown(Key.X))
    {
                    if(can_move2){
                        if(Key.isDown(Key.K)){
                            shootforoyuncu2=true;
                            passforoyuncu2=false;
                        }
                        else{
                            passforoyuncu2=true;
                            shootforoyuncu2=false;
                        }
      if(rotation_right){
                                oyuncu2.rotation.y += 8*10 * Math.PI/180;
                                
                        }
                                
      else{
                                oyuncu2.rotation.y += -8*10 * Math.PI/180;
                                
                            }
                        }
                     else if(can_move3){
                         if(Key.isDown(Key.K)){
                            shootforoyuncu3=true;
                            passforoyuncu3=false;
                        }
                        else{
                            passforoyuncu3=true;
                            shootforoyuncu3=false;
                        }
      if(rotation_right){
                                oyuncu3.rotation.y += 8*10 * Math.PI/180;
                                
                        }
                                
      else{
                                oyuncu3.rotation.y += -8*10 * Math.PI/180;
                                
                            }
                        }
    }
                else{
                    shootforoyuncu2=false;
                    shootforoyuncu3=false;
                    passforoyuncu2=false;
                    passforoyuncu3=false;
                }
    
    
    
    }
    
    
}
window.addEventListener('keyup', function( ev ) {
      switch( ev.keyCode ) {
        case 32:
        oyuncu1_rotation = false;
                                 oyuncu4_rotation = false;
        break;
                                 case 84:
        oyuncu2_rotation = false;
                                 oyuncu3_rotation = false;
        break;
        case 13:
        Enter_isUp = true;
        break;
                                case 66:
                                    if(counter_for_team1_switch==true){
                                        can_move1=true;
                                        can_move4=false;
                                        counter_for_team1_switch=false;
                                    }
                                    else{
                                         can_move4=true;
                                        can_move1=false;
                                        counter_for_team1_switch=true;
                                    }
                                break;
                                case 81:
                                    if(counter_for_team2_switch==true){
                                         can_move2=true;
                                        can_move3=false;
                                        counter_for_team2_switch=false;
                                    }
                                    else{
                                        can_move3=true;
                                        can_move2=false;
                                        counter_for_team2_switch=true;
                                    }
                                break;
                                case 97:
                                    spotLight.position.x+=15;
                                break;
                                case 98:
                                    spotLight.position.x-=15;
                                break;
                                case 100:
                                    spotLight.position.y+=15
                                break;
                                case 101:
                                    spotLight.position.y-=15
                                break;
                                case 103:
                                    spotLight.position.z+=15
                                break;
                                case 104:
                                    spotLight.position.z-=15
                                break;
                                case 105:
                                   if(controls.enablePan == false){
                                       controls.enablePan = true;
                                       
                                   }
                                   else if(controls.enablePan == true){
                                       controls.enablePan = false;
                                       
                                   }
                                break;
                                case 107:
                                    spotLight.intensity+=0.1;
                                break;
                                case 109:
                                    spotLight.intensity-=0.1;
                                break;
                                case 76:
                                    
                                    if(shading) shading=false;
                                    else shading=true;
                                    
                                    shadingOption();
                                                                    
                                break;
                                
      }
    }, false
  );

  
  
function return_kick(){
        
  if(can_move){
                if(oyuncu1.rotation.y != oyuncu1_rotation_temp){
                    oyuncu1.rotation.y = oyuncu1_rotation_temp;
                   
                }
                if(oyuncu2.rotation.y != oyuncu2_rotation_temp){
                    oyuncu2.rotation.y = oyuncu2_rotation_temp;
                   
                }
                if(oyuncu3.rotation.y != oyuncu3_rotation_temp){
                    oyuncu3.rotation.y = oyuncu3_rotation_temp;
                   
                }
                if(oyuncu4.rotation.y != oyuncu4_rotation_temp){
                    oyuncu4.rotation.y = oyuncu4_rotation_temp;
                    
                }
  
  }
}

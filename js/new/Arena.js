Arena = function(game) //on créée notre objet Arena qui prend l'objet game en argument
{
    // VARIABLES UTILES
    this.game = game;
    var scene = game.scene;




    //EXEMPLE
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    var cube = BABYLON.Mesh.CreateBox("cube", 10, scene, false);

    cube.position.y = 1;

    this.game.scene.cube = cube;// va nous permettre d'accéder à notre mesh pour réaliser des animations au sein du prototype
    //(à faire à chaque fois que vous comptez animer un mesh)

    var boxArena = BABYLON.Mesh.CreateBox("box1", 100, scene, false, BABYLON.Mesh.BACKSIDE);

    boxArena.scaling.y = 2;

    var materialGround = new BABYLON.StandardMaterial("groundTexture", scene);

    boxArena.material = materialGround;



    //LIRE LA DOC

    // LUMIERES

    /*TODO :  -3 lumières différentes
              -couleurs et intensités
    */
var lightPoint = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(1, 10, 1), scene);
var lightDir = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);
var lightSpot = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0, 30, -10), new BABYLON.Vector3(0, -1, 0), Math.PI / 3, 2, scene);

lightPoint.diffuse = new BABYLON.Color3(0, 1, 0);
lightSpot.specular = new BABYLON.Color3(0, 1, 0);


    // MATERIAUX ET TEXTURES

    /*TODO :    -materiau standard
                -multi-materiaux
                -video-texture
                -normal map
                -texture procedurale (feu, nuage...)
    */

    materialGround.diffuseTexture = new BABYLON.Texture("assets/Textures/wood.jpg", scene);
    materialGround.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    materialGround.emissiveColor = new BABYLON.Color3(1, 1, 1);
    materialGround.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);


/*
materialGround.diffuseColor = new BABYLON.Color3(1, 0, 0);
materialGround.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
materialGround.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
materialGround.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
*/
/*

mat.diffuseTexture.hasAlpha = true;
mat.backFaceCulling = true;
mesh.material = materialGround;
*/
    //MESHS ET COLLISIONS

    /*TODO :    -box
                -sphere
                -cylindre
                -tore
                -appliquer les collisions
    */

      var boxMaterial = new BABYLON.StandardMaterial("WallTexture", scene);

      boxMaterial.diffuseTexture = new BABYLON.Texture("assets/Textures/no-mans-sky.jpg", scene);
      boxMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
      boxMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
      boxMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);


    var mainBox = BABYLON.Mesh.CreateBox("box2", 10, scene);

       mainBox.scaling.y = 1;

       mainBox.position = new BABYLON.Vector3(5,-30,5);

       mainBox.rotation.y = (Math.PI*45)/180;

       mainBox.material = boxMaterial;

//Cylinder
var cylinderMaterial = new BABYLON.StandardMaterial("CylinderMaterial", scene);

cylinderMaterial.diffuseTexture = new BABYLON.Texture("assets/Textures/cocaTex.png", scene);
cylinderMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
cylinderMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
cylinderMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);

var cylinder = BABYLON.Mesh.CreateCylinder("cyl1", 10, 5, 5, 20, 4, scene);

cylinder.position.y = 20;

cylinder.rotation.z = (Math.PI)/180;

cylinder.material = cylinderMaterial;


//sphere
var sphereMaterial = new BABYLON.StandardMaterial("sphereMaterial", scene);
sphereMaterial.diffuseTexture = new BABYLON.Texture("assets/Textures/basketTex.jpg", scene);
sphereMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
sphereMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
sphereMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);

var sphere = BABYLON.Mesh.CreateSphere("sphere", 20, 15, scene);

sphere.position.y = -50;
sphere.position.x = 20;
sphere.position.z = -20;
sphere.material = sphereMaterial;


//Tore
var torusMaterial = new BABYLON.StandardMaterial("torusMaterial", scene);
torusMaterial.diffuseTexture = new BABYLON.Texture("assets/Textures/donutTex.jpg", scene);
torusMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
torusMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
torusMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);


var torus = BABYLON.Mesh.CreateTorus("torus", 15, 5, 32, scene);
torus.position.y = 50;
torus.position.x = -10;
torus.position.z = 20;

torus.rotation.z = (Math.PI*45)/180;
torus.rotation.x = (Math.PI*45)/180;

torus.material = torusMaterial;

    //AUDIO

    /*TODO : -sons d'ambiance
              -sons liés à des objets --> le son doit être localisé spatialement
    */

    var music = new BABYLON.Sound("Bounces", "assets/Sounds/basketBounce.wav", scene, null, { loop: true, autoplay: true });
   music.setDirectionalCone(90, 180, 0);
    music.setLocalDirectionToMesh(new BABYLON.Vector3(1, 0, 0));
    music.attachToMesh(sphere);

    //SKYBOX

    /*TODO : -Créer une (grande) box
             -Un materiau avec une CubeTexture, attention à bien faire correspodre les faces.
    */
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/Skybox/Tropical/TropicalSunnyDay", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;





//ANIMATION
    var animationBox = new BABYLON.Animation("AnimBox", "scaling.x", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var boxKeys = [];
    boxKeys.push({
      frame: 0,
      value: 1
    });
    boxKeys.push({
      frame: 50,
      value: 1.5
   });
    boxKeys.push({
      frame: 100,
      value: 1
   });
   animationBox.setKeys(boxKeys);
   mainBox.animations = [];
   mainBox.animations.push(animationBox);
   scene.beginAnimation(mainBox, 0, 1000, true);

   var animationBox = new BABYLON.Animation("AnimBox", "scaling.z", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
   var boxKeys = [];
   boxKeys.push({
     frame: 0,
     value: 1.5
   });
   boxKeys.push({
     frame: 50,
     value: 1
  });
   boxKeys.push({
     frame: 100,
     value: 1.5
  });
  animationBox.setKeys(boxKeys);
  mainBox.animations.push(animationBox);
  scene.beginAnimation(mainBox, 0, 1000, true);


    //rotation
    var animationBall = new BABYLON.Animation("AnimBall", "rotation.x", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

     var ballKeys = [];

     ballKeys.push({
         frame: 0,
         value: 0
     });

     ballKeys.push({
         frame: 30,
         value: Math.PI
     });

     ballKeys.push({
         frame: 60,
         value: 2 * Math.PI
     });

    animationBall.setKeys(ballKeys);
    sphere.animations = [];
    sphere.animations.push(animationBall);
    scene.beginAnimation(sphere, 0, 1000, true);

    //translation
      var ballSlide = new BABYLON.Animation("xSlide", "position.y", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

      var keySlide = [];

      keySlide.push({
          frame: 0,
          value: 100
      });

      keySlide.push({
          frame: 100,
          value: -100
      });

      keySlide.push({
          frame: 200,
          value: 100
      });
    ballSlide.setKeys(keySlide);
    sphere.animations.push(ballSlide);
    scene.beginAnimation(sphere, 0, 1000, true);


//Enable collisions with all the objects of the Arena
boxArena.checkCollisions = true;
sphere.checkCollisions = true;
mainBox.checkCollisions = true;
torus.checkCollisions = true;
cylinder.checkCollisions = true;




};

Arena.prototype={

    //ANIMATION
    _animateWorld : function(ratioFps)
    {
      // Animation des plateformes (translation, rotation, redimensionnement ...)
      /*TODO*/
      //scaling
  /*var animationBox = new BABYLON.Animation("AnimBox", "scaling.x", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
  var boxKeys = [];
  boxKeys.push({
    frame: 0,
    value: 1
  });
  boxKeys.push({
    frame: 50,
    value: 0.2
 });
  boxKeys.push({
    frame: 100,
    value: 1
 });
 animationBox.setKeys(boxKeys);
 box.animations = [];
 box.animations.push(animationBox);
 scene.beginAnimation(box, 0, 1000, true);
*/
 //rotation
/*var animationBall = new BABYLON.Animation("AnimBall", "rotation.x", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

  var ballKeys = [];

  ballKeys.push({
      frame: 0,
      value: 0
  });

  ballKeys.push({
      frame: 30,
      value: Math.PI
  });

  ballKeys.push({
      frame: 60,
      value: 2 * Math.PI
  });

animationBall.setKeys(ballKeys);
sphere.animations = [];
sphere.animations.push(animationBall);
scene.beginAnimation(sphere, 0, 1000, true);*/
/*
//translation
  var ballSlide = new BABYLON.Animation("xSlide", "position.z", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

  var keySlide = [];

  keySlide.push({
      frame: 0,
      value: 40
  });

  keySlide.push({
      frame: 50,
      value: -40
  });

  keySlide.push({
      frame: 100,
      value: 40
  });
ballSlide.setKeys(keySlide);
sphere.animations.push(ballSlide);
scene.beginAnimation(sphere, 0, 1000, true);
},*/
}
};

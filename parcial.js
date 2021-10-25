var scene = new THREE.Scene();
//Funcion generar cubo
function cubo(x, y, z, color, material, alambrado) {
  var cubeGeometry = new THREE.BoxGeometry(x, y, z);
  var cubeMaterial;
  switch (material) {
    case "Basic":
      cubeMaterial = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;

    case "Standard":
      cubeMaterial = new THREE.MeshStandardMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;

    case "Physical":
      cubeMaterial = new THREE.MeshPhysicalMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;

    case "Phong":
      cubeMaterial = new THREE.MeshPhongMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;

    case "Lambert":
      cubeMaterial = new THREE.MeshLambertMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;
  }

  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  scene.add(cube);
  return cube;
}
function escalar(cubo, escala) {
  Cubo[cubo].scale.set(escala, escala, escala);
}
function init() {
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );


  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
//Se generan los ejes 
  var axes = new THREE.AxesHelper(20);
  scene.add(axes);

  light = new THREE.PointLight(0xffff00);
  light.position.set(-10, 5, 10);
  scene.add(light);

  dim = 2; 
  Cubo = []; 

  for (i = 0; i < 3; i++) {
    if (i % 2 == 0) {
      Cubo.push(cubo(dim, dim, dim, 0x0FEC8B, "Physical", false)); 
    } else {
      Cubo.push(cubo(dim, dim, dim, 0xCB0FEC, "Standard", false)); 
    }
   
    Cubo[i].translateX(dim / 2);
    Cubo[i].translateY(dim / 2); 
    Cubo[i].translateZ(dim / 2); 
  }

  Cubo[1].translateY((3 * dim) / 4); 
  Cubo[2].translateY((9 * dim) / 8); 

  escalar(1, 1 / 2); 
  escalar(2, 1 / 4); 

  camera.position.set(3, 5, 10);
  camera.lookAt(scene.position);

  document.getElementById("webgl-output").appendChild(renderer.domElement);

  renderer.render(scene, camera);
}
var scene = new THREE.Scene();
function cubo(x, y, z, color, material, alambrado)
{
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var cubeMaterial;
    switch(material)
    {

     case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe: alambrado});
      break;

     case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({color: color, wireframe: alambrado});
      break;

     case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({color: color, wireframe: alambrado});
      break;

     case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({color: color, wireframe: alambrado});
      break;

     case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({color: color, wireframe: alambrado});
      break;
    }
    
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    scene.add(cube);
    return(cube);
}
function init()
 {
    var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    var axes = new THREE.AxesHelper(40);
    scene.add(axes);

    Cubo = [];   
   
    Dim=16; 
    Delta= Dim/2;
    Ang=Math.PI/4;

  Cubo.push(cubo(Dim, Dim, Dim, 0xB4C535, 'Physical', false));//Se crea el primer cubo
    Cubo.push(cubo(Dim, Dim, Dim, 0xE11B1B, 'Phong', false));//Se crea el segundo cubo
    Cubo.push(cubo(Dim, Dim, Dim, 0xE11BD8, 'Basic', false));//Se crea el tercer cubo

 
    for(i=1;i<3;i++) 
    {
        Tamano=((1)/(Dim/(Delta/i)));
        Altura=((Delta-2)*(1+i));
        Cubo[i].scale.set(Tamano,Tamano,Tamano); 
        Cubo[i].translateY(Altura);
    }
    for(i=0;i<3;i++)
    {
        if(i==0 || i==2)
        {
            Cubo[i].rotateY(Ang);
        }
    }
    
    light = new THREE.PointLight(0xFFFFFF);                                   
    light.position.set(30, 5, 30);         
    scene.add( light ); 

    
    camera.position.set(30, 40, 30);
    camera.lookAt(scene.position);

    document.getElementById("webgl-output").appendChild(renderer.domElement);

    renderer.render(scene, camera);

}
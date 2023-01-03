import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


//mercury
const mercurytexture = new THREE.TextureLoader().load('mercury.jpg');

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(7, 32, 32),
  new THREE.MeshStandardMaterial({
    map: mercurytexture,
  })
);

scene.add(mercury);

mercury.position.z = 60;
mercury.position.setX(9);
mercury.position.setY(-3);

//venus
const venustexture = new THREE.TextureLoader().load('venus.jpg');

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(7, 32, 32),
  new THREE.MeshStandardMaterial({
    map: venustexture,
  })
);

scene.add(venus);

venus.position.z = 155;
venus.position.setX(5);
venus.position.setY(-2);

//earth
const earthtexture = new THREE.TextureLoader().load('earth.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(8, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthtexture,
  })
);

scene.add(earth);

earth.position.z = 250;
earth.position.setX(0);
earth.position.setY(-2);


//mars
const marstexture = new THREE.TextureLoader().load('mars.jpg');

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marstexture,
  })
);

scene.add(mars);
mars.position.z = 355;
mars.position.setX(-3.5);
mars.position.setY(-2);

//jupiter
const jupitertexture = new THREE.TextureLoader().load('jupiter.jpg');

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(8, 32, 32),
  new THREE.MeshStandardMaterial({
    map: jupitertexture,
  })
);

scene.add(jupiter);
jupiter.position.z = 455;
jupiter.position.setX(-8);
jupiter.position.setY(-1);


//saturn
const saturntexture = new THREE.TextureLoader().load('saturn.jpg');

const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(6.5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: saturntexture,
  })
);

scene.add(saturn);
saturn.position.z = 550;
saturn.position.setX(-9);
saturn.position.setY(-1);

//saturn ring
const geometry = new THREE.TorusGeometry(7, 0.7, 10, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xE9D4B3 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);
torus.position.z = 550;
torus.position.setX(-9);
torus.position.setY(-1);


//uranus
const uranustexture = new THREE.TextureLoader().load('uranus.jpg');

const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: uranustexture,
  })
);

scene.add(uranus);
uranus.position.z = 647;
uranus.position.setX(-15);
uranus.position.setY(-2);


//neptune
const neptunetexture = new THREE.TextureLoader().load('neptune.jpg');

const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(9, 32, 32),
  new THREE.MeshStandardMaterial({
    map: neptunetexture,
  })
);

scene.add(neptune);
neptune.position.z = 740;
neptune.position.setX(-27);
neptune.position.setY(-2);

const planets = Object.values({mercury,venus,earth,mars,jupiter,saturn,uranus,neptune});
const planetsnames = ["Mercury","Venus","Earth","Mars","Jupiter","Saturn","Uranus","Neptune"];

//function to build navbar
function buildnav(){
  const navbar = document.querySelector('#navbar__list');
  const frag=document.createDocumentFragment();
  for(let i=0;i<8;i++)
  {
      let li = document.createElement('li');
      let a = document.createElement('a');
      let h = document.createAttribute("href");
      let c = document.createAttribute("class");
      li.setAttributeNode(c);
      li.classList.add(planetsnames[i]);
      a.setAttributeNode(h);
      a.setAttribute("href","#"+planetsnames[i]);
      a.innerText=planetsnames[i];
      li.appendChild(a);
      frag.appendChild(li);
  }
  navbar.appendChild(frag);
}

buildnav();

// section effect
const observer = new IntersectionObserver((entries) =>{
  entries.forEach((entry) =>{
    if(entry.isIntersecting){
      entry.target.classList.add('showing');
    }else{
      entry.target.classList.remove('showing');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Scroll to anchor ID using scrollTO event
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  
  planets.forEach((planet) =>{
    planet.rotation.x += 0.05;
    planet.rotation.z += 0.05;
  })
  
  camera.position.z = t * -0.10;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  planets.forEach((planet) =>{
    planet.rotation.x += 0.03;
  })

  // controls.update();

  renderer.render(scene, camera);
}

animate();
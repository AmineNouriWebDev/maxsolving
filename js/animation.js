// === THREE.JS BACKGROUND (Lightweight Network Effect) ===

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Create Particles
const geometry = new THREE.BufferGeometry();
const particlesCount = 300; // Adjusted for performance
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
}

geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Material with AI Colors
const material = new THREE.PointsMaterial({
    size: 0.2,
    color: 0x00F0FF, // Primary Cyan
    transparent: true,
    opacity: 0.8,
});

// Particles Mesh
const particlesMesh = new THREE.Points(geometry, material);
scene.add(particlesMesh);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    particlesMesh.rotation.y += 0.0005;
    particlesMesh.rotation.x += 0.0002;

    renderer.render(scene, camera);
}

// Start Animation
animate();

// Responsive Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
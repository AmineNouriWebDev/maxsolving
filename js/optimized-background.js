
class OptimizedBackground {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = null;
    this.frameId = null;
    this.isVisible = true;
    
    this.init();
    this.setupVisibilityListener();
  }
  
  init() {
    // Créer la scène
    this.scene = new THREE.Scene();
    
    // Caméra optimisée
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 30;
    
    // Renderer avec réglages optimisés
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg-canvas'),
      alpha: true,
      antialias: false, // Désactivé pour performance
      powerPreference: 'low-power'
    });
    
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limiter pour mobile
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Créer les particules avec BufferGeometry
    this.createParticles();
    
    // Lancer l'animation
    this.animate();
  }
  
  createParticles() {
    const count = 200; // Réduit pour performance
    
    // Geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 200;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Material optimisé
    const material = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x00F0FF,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    });
    
    // Points
    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }
  
  animate() {
    if (!this.isVisible) return;
    
    this.frameId = requestAnimationFrame(() => this.animate());
    
    // Animation lente pour économiser CPU
    if (this.particles) {
      this.particles.rotation.y += 0.0002;
      this.particles.rotation.x += 0.0001;
    }
    
    this.renderer.render(this.scene, this.camera);
  }
  
  setupVisibilityListener() {
    // Arrêter l'animation quand la page n'est pas visible
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;
      
      if (this.isVisible) {
        this.animate();
      } else {
        cancelAnimationFrame(this.frameId);
      }
    });
  }
  
  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

// Initialisation
window.addEventListener('DOMContentLoaded', () => {
  const bg = new OptimizedBackground();
  window.addEventListener('resize', () => bg.onResize());
});
import * as THREE from 'three';

export class ParticleBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.particles = [];
    this.initParticles();

    this.mouse = new THREE.Vector2();
    this.targetMouse = new THREE.Vector2();

    this.onWindowResize = this.onWindowResize.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    
    window.addEventListener('resize', this.onWindowResize);
    window.addEventListener('mousemove', this.onMouseMove);

    this.animate();
  }

  initParticles() {
    const particleCount = 60;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const blueColors = [0x1E85E8, 0x0F5FB8, 0x5BA8F0, 0xBFE0FF];

    // Create a circular texture for particles
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    const texture = new THREE.CanvasTexture(canvas);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      scales[i] = Math.random();

      // Custom data for animation
      this.particles.push({
        xOffset: Math.random() * Math.PI * 2,
        yOffset: Math.random() * Math.PI * 2,
        speedX: 0.001 + Math.random() * 0.002,
        speedY: 0.001 + Math.random() * 0.002,
        colorIndex: Math.floor(Math.random() * blueColors.length)
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

    // Basic material
    const material = new THREE.PointsMaterial({
      size: 2.5,
      map: texture,
      transparent: true,
      opacity: 0.3,
      alphaTest: 0.01,
      blending: THREE.NormalBlending,
      vertexColors: false,
      color: 0x5BA8F0
    });

    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseMove(event) {
    this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  animate() {
    this.animationId = requestAnimationFrame(this.animate.bind(this));

    this.mouse.lerp(this.targetMouse, 0.05);

    const positions = this.particleSystem.geometry.attributes.position.array;
    
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      const i3 = i * 3;
      p.yOffset += p.speedY;
      
      positions[i3 + 1] += Math.sin(p.yOffset) * 0.05;
      
      // Gentle parallax effect with mouse
      positions[i3] += (this.mouse.x * 0.5 - p.speedX);
      positions[i3 + 1] += (this.mouse.y * 0.5);

      if (positions[i3 + 1] > 100) positions[i3 + 1] = -100;
      if (positions[i3] > 100) positions[i3] = -100;
      if (positions[i3] < -100) positions[i3] = 100;
    }

    this.particleSystem.geometry.attributes.position.needsUpdate = true;
    
    // Slight rotation to the whole system
    this.particleSystem.rotation.x = this.mouse.y * 0.05;
    this.particleSystem.rotation.y = this.mouse.x * 0.05;

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.onWindowResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    
    this.scene.remove(this.particleSystem);
    this.particleSystem.geometry.dispose();
    this.particleSystem.material.dispose();
    this.renderer.dispose();
  }
}

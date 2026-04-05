
import * as THREE from 'three';
import { GAME } from './game';
import { TILE_SIZE, MAP_WIDTH, MAP_HEIGHT, VIEWPORT_WIDTH, VIEWPORT_HEIGHT, RAINBOW_COLORS } from './definitions';
import { BUILDINGS } from './entities';

export class Renderer3D {
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer;
  private renderCanvas: THREE.WebGLRenderTarget;
  private postScene: THREE.Scene;
  private postCamera: THREE.OrthographicCamera;
  private postMaterial: THREE.ShaderMaterial;
  private postQuad: THREE.Mesh;
  
  private mapGroup: THREE.Group;
  private buildingMeshes: THREE.Group[] = [];
  private npcMeshes: THREE.Group[] = [];
  private noteMeshes: THREE.Group[] = [];
  private particleSystem: THREE.Points;
  private fireflySystem: THREE.Points;
  private waterMesh: THREE.Mesh;
  private skyMesh: THREE.Mesh;
  
  private ambientLight: THREE.AmbientLight;
  private dirLight: THREE.DirectionalLight;
  private buildingLights: THREE.PointLight[] = [];
  
  private clock: THREE.Clock;
  private targetCamX = 0;
  private targetCamY = 0;
  private currentCamX = 0;
  private currentCamY = 0;
  
  private dayTime = 0.3; // 0-1 representing day cycle
  
  constructor(container: HTMLElement) {
    this.clock = new THREE.Clock();
    
    // Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x1a1a2e, 400, 1200);
    
    // Camera - orthographic for pixel-art feel
    const aspect = VIEWPORT_WIDTH / VIEWPORT_HEIGHT;
    const frustumSize = VIEWPORT_HEIGHT;
    const left = -frustumSize * aspect / 2;
    const right = frustumSize * aspect / 2;
    const top = frustumSize / 2;
    const bottom = -frustumSize / 2;
    
    this.camera = new THREE.OrthographicCamera(left, right, top, bottom, 1, 2000);
    this.camera.position.set(0, 0, 300);
    
    // WebGL Renderer with render target
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
    this.renderer.toneMapping = THREE.NoToneMapping;
    container.appendChild(this.renderer.domElement);
    this.renderer.domElement.id = 'game-canvas';
    
    // Render target for main scene
    this.renderCanvas = new THREE.WebGLRenderTarget(VIEWPORT_WIDTH, VIEWPORT_HEIGHT, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
    });
    
    // Post-processing setup
    this.postScene = new THREE.Scene();
    this.postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    // Post-processing shader
    this.postMaterial = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        time: { value: 0 },
        dayTime: { value: 0.3 },
        bloomStrength: { value: 0.15 },
        vignetteIntensity: { value: 0.6 },
        scanlineIntensity: { value: 0.08 },
        chromaticAberration: { value: 0.002 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float time;
        uniform float dayTime;
        uniform float bloomStrength;
        uniform float vignetteIntensity;
        uniform float scanlineIntensity;
        uniform float chromaticAberration;
        varying vec2 vUv;
        
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        void main() {
          vec2 uv = vUv;
          
          // Chromatic aberration
          float ca = chromaticAberration;
          vec2 dir = uv - vec2(0.5);
          float dist = length(dir);
          ca *= dist * 2.0;
          vec2 offset = dir * ca;
          
          float r = texture2D(tDiffuse, uv + offset).r;
          float g = texture2D(tDiffuse, uv).g;
          float b = texture2D(tDiffuse, uv - offset).b;
          vec3 color = vec3(r, g, b);
          
          // Bloom (simple box blur approximation)
          vec3 bloom = vec3(0.0);
          float samples = 0.0;
          float radius = 0.003;
          for (float x = -1.0; x <= 1.0; x += 1.0) {
            for (float y = -1.0; y <= 1.0; y += 1.0) {
              vec2 sampleUv = uv + vec2(x, y) * radius;
              vec3 s = texture2D(tDiffuse, sampleUv).rgb;
              if (max(s.r, max(s.g, s.b)) > 0.7) {
                bloom += s;
                samples += 1.0;
              }
            }
          }
          bloom /= max(samples, 1.0);
          color += bloom * bloomStrength;
          
          // Scanlines
          float scanline = sin(uv.y * 800.0) * scanlineIntensity;
          if (scanline < 0.0) color -= scanline * 0.5;
          else color += scanline * 0.3;
          
          // Vignette
          float vig = 1.0 - vignetteIntensity * dist * dist;
          color *= vig;
          
          // Film grain
          float grain = hash(uv * time * 100.0) * 0.04;
          color += grain - 0.02;
          
          // Slight color grading
          color = pow(color, vec3(0.95, 1.0, 1.05));
          
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });
    
    this.postQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.postMaterial);
    this.postScene.add(this.postQuad);
    
    // Lights
    this.ambientLight = new THREE.AmbientLight(0x6688aa, 0.6);
    this.scene.add(this.ambientLight);
    
    this.dirLight = new THREE.DirectionalLight(0xffeedd, 0.8);
    this.dirLight.position.set(200, 300, 400);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.set(1024, 1024);
    this.dirLight.shadow.camera.left = -600;
    this.dirLight.shadow.camera.right = 600;
    this.dirLight.shadow.camera.top = 600;
    this.dirLight.shadow.camera.bottom = -600;
    this.scene.add(this.dirLight);
    
    this.skyMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3000, 600),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          dayTime: { value: 0.3 },
          time: { value: 0 }
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vWorldPos;
          void main() {
            vUv = uv;
            vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float dayTime;
          uniform float time;
          varying vec2 vUv;
          varying vec3 vWorldPos;
          
          void main() {
            vec3 dayTop = vec3(0.25, 0.45, 0.85);
            vec3 dayBot = vec3(0.55, 0.75, 0.95);
            vec3 nightTop = vec3(0.02, 0.02, 0.08);
            vec3 nightBot = vec3(0.04, 0.04, 0.12);
            vec3 dayColor = mix(dayBot, dayTop, vUv.y);
            vec3 nightColor = mix(nightBot, nightTop, vUv.y);
            
            float dayFactor = smoothstep(0.2, 0.8, dayTime);
            vec3 color = mix(nightColor, dayColor, dayFactor);
            
            // Stars at night
            float starHash = fract(sin(dot(vUv * 100.0 + time * 0.01, vec2(12.9898, 78.233))) * 43758.5453);
            float star = step(0.995, starHash) * (1.0 - dayFactor);
            color += star * 0.8;
            
            gl_FragColor = vec4(color, 0.6 * (1.0 - dayFactor * 0.3));
          }
        `
      })
    );
    this.skyMesh.position.set(0, 300, -100);
    this.scene.add(this.skyMesh);
    
    // Build scene
    this.mapGroup = new THREE.Group();
    this.scene.add(this.mapGroup);
    
    this.createGround();
    this.createPaths();
    this.createWater();
    this.createBuildings();
    this.createNPCs();
    this.createNotes();
    this.createParticles();
    this.createFireflies();
    this.createTreesAndDecorations();
    
    // Handle resize
    window.addEventListener('resize', () => this.onResize());
  }
  
  private createGround(): void {
    const mapW = MAP_WIDTH * TILE_SIZE;
    const mapH = MAP_HEIGHT * TILE_SIZE;
    
    // Grass ground
    const groundGeo = new THREE.PlaneGeometry(mapW, mapH);
    const groundMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldPos;
        void main() {
          vUv = uv;
          vWorldPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vWorldPos;
        
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        void main() {
          vec2 tile = vWorldPos.xy / 32.0;
          float h = hash(floor(tile));
          
          vec3 grass1 = vec3(0.29, 0.49, 0.25);
          vec3 grass2 = vec3(0.24, 0.42, 0.20);
          vec3 grass3 = vec3(0.35, 0.55, 0.30);
          
          vec3 color = mix(grass2, grass1, h);
          if (h > 0.7) color = mix(color, grass3, 0.5);
          
          // Grass blades effect
          float grassBlade = step(0.92, hash(tile * 3.0));
          color = mix(color, color * 0.85, grassBlade * 0.3);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.mapGroup.add(ground);
  }
  
  private createPaths(): void {
    const pathMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          vec2 tile = vUv * vec2(200.0, 150.0);
          float brick = step(0.2, fract(tile.x * 0.5)) * step(0.2, fract(tile.y * 0.5));
          vec3 color = mix(vec3(0.45, 0.38, 0.06), vec3(0.55, 0.47, 0.10), brick);
          // Border
          float edge = smoothstep(0.02, 0.0, abs(fract(vUv.x * 200.0) - 0.5) - 0.48) +
                       smoothstep(0.02, 0.0, abs(fract(vUv.y * 150.0) - 0.5) - 0.48);
          color = mix(color, vec3(0.35, 0.28, 0.04), edge * 0.5);
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });
    
    // Main paths
    const pathPositions = [
      { x: 32 * TILE_SIZE, z: 24.5 * TILE_SIZE, w: 64 * TILE_SIZE, h: TILE_SIZE * 2 },
      { x: 32.5 * TILE_SIZE, z: 20 * TILE_SIZE, w: TILE_SIZE * 2, h: 38 * TILE_SIZE },
    ];
    
    pathPositions.forEach(p => {
      const geo = new THREE.PlaneGeometry(p.w, p.h);
      const mesh = new THREE.Mesh(geo, pathMat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(p.x - MAP_WIDTH * TILE_SIZE / 2, 0.05, p.z - MAP_HEIGHT * TILE_SIZE / 2);
      mesh.receiveShadow = true;
      this.mapGroup.add(mesh);
    });
  }
  
  private createWater(): void {
    const waterGeo = new THREE.PlaneGeometry(4 * TILE_SIZE, 4 * TILE_SIZE);
    this.waterMesh = new THREE.Mesh(waterGeo, new THREE.ShaderMaterial({
      transparent: true,
      uniforms: { time: { value: 0 } },
      vertexShader: `
        varying vec2 vUv;
        uniform float time;
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.z += sin(pos.x * 0.5 + time * 2.0) * 0.3 + cos(pos.y * 0.3 + time * 1.5) * 0.2;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        void main() {
          vec2 tile = vUv * 8.0;
          float wave = sin(vUv.x * 20.0 + time * 3.0) * 0.5 + 
                       cos(vUv.y * 15.0 + time * 2.0) * 0.5;
        
          vec3 deep = vec3(0.08, 0.25, 0.45);
          vec3 shallow = vec3(0.15, 0.40, 0.65);
          vec3 highlight = vec3(0.3, 0.6, 0.9);
        
          vec3 color = mix(deep, shallow, wave * 0.5 + 0.5);
        
          // Shimmer
          float shimmer = smoothstep(0.7, 1.0, hash(tile + time));
          color += highlight * shimmer * 0.3;
        
          gl_FragColor = vec4(color, 0.85);
        }
      `
    }));
    this.waterMesh.rotation.x = -Math.PI / 2;
    this.waterMesh.position.set(32 * TILE_SIZE - MAP_WIDTH * TILE_SIZE / 2, 0.03, 24.5 * TILE_SIZE - MAP_HEIGHT * TILE_SIZE / 2);
    this.mapGroup.add(this.waterMesh);
  }
  
  private createBuildings(): void {
    const centerX = MAP_WIDTH * TILE_SIZE / 2;
    const centerZ = MAP_HEIGHT * TILE_SIZE / 2;
    
    const buildingPlacements = [
      { id: 'welcome', x: 18 * TILE_SIZE, z: 14 * TILE_SIZE, w: 5, h: 4 },
      { id: 'clinic', x: 46 * TILE_SIZE, z: 14 * TILE_SIZE, w: 5, h: 4 },
      { id: 'chapel', x: 30 * TILE_SIZE, z: 10 * TILE_SIZE, w: 4.5, h: 5 },
      { id: 'home', x: 10 * TILE_SIZE, z: 32 * TILE_SIZE, w: 4.5, h: 3.5 },
      { id: 'lab', x: 50 * TILE_SIZE, z: 32 * TILE_SIZE, w: 4, h: 3.5 },
      { id: 'conference', x: 30 * TILE_SIZE, z: 36 * TILE_SIZE, w: 6.5, h: 4 },
      { id: 'quiet', x: 4 * TILE_SIZE, z: 42 * TILE_SIZE, w: 2.5, h: 2.5 },
    ];
    
    buildingPlacements.forEach((b, idx) => {
      const def = BUILDINGS.find(bd => bd.id === b.id);
      if (!def) return;
      
      const group = new THREE.Group();
      
      // Parse colors
      const baseColor = new THREE.Color(def.bgColor1);
      const roofColor = new THREE.Color(def.roofColor);
      
      const bx = b.x - centerX;
      const bz = b.z - centerZ;
      
      // Main building body
      const bodyGeo = new THREE.BoxGeometry(b.w * TILE_SIZE, 3 * TILE_SIZE, b.h * TILE_SIZE);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: baseColor,
        roughness: 0.8,
        metalness: 0.1,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 1.5 * TILE_SIZE;
      body.castShadow = true;
      body.receiveShadow = true;
      group.add(body);
      
      // Roof
      const roofGeo = new THREE.ConeGeometry(Math.max(b.w, b.h) * TILE_SIZE * 0.6, TILE_SIZE, 4);
      const roofMat = new THREE.MeshStandardMaterial({
        color: roofColor,
        roughness: 0.7,
      });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = 3.5 * TILE_SIZE;
      roof.rotation.y = Math.PI / 4;
      roof.castShadow = true;
      group.add(roof);
      
      // Windows (emissive)
      const winGeo = new THREE.PlaneGeometry(TILE_SIZE * 0.7, TILE_SIZE * 0.7);
      const winMat = new THREE.MeshStandardMaterial({
        emissive: 0xffee88,
        emissiveIntensity: 0.3,
        color: 0xcce8ff,
      });
      
      const windowPositions = [
        { x: -b.w * TILE_SIZE * 0.3, y: 1.8 * TILE_SIZE, z: b.h * TILE_SIZE * 0.51, ry: 0 },
        { x: b.w * TILE_SIZE * 0.3, y: 1.8 * TILE_SIZE, z: b.h * TILE_SIZE * 0.51, ry: 0 },
      ];
      
      windowPositions.forEach(wp => {
        const win = new THREE.Mesh(winGeo, winMat.clone());
        win.position.set(wp.x, wp.y, wp.z);
        win.rotation.y = wp.ry;
        group.add(win);
      });
      
      // Door
      const doorGeo = new THREE.PlaneGeometry(TILE_SIZE * 0.6, TILE_SIZE * 1.0);
      const doorMat = new THREE.MeshStandardMaterial({ color: 0x5c3a1e, roughness: 0.9 });
      const door = new THREE.Mesh(doorGeo, doorMat);
      door.position.set(0, TILE_SIZE * 0.5, b.h * TILE_SIZE * 0.51);
      group.add(door);
      
      // Point light for building glow (completed)
      const light = new THREE.PointLight(0xffdd88, 0, TILE_SIZE * 8);
      light.position.set(0, TILE_SIZE * 2, b.h * TILE_SIZE * 0.5);
      group.add(light);
      this.buildingLights.push(light);
      
      // Emoji billboard
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 40;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 128, 40);
      ctx.fillStyle = '#333';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${def.emoji} ${def.name}`, 64, 25);
      
      const tex = new THREE.CanvasTexture(canvas);
      tex.magFilter = THREE.NearestFilter;
      const signGeo = new THREE.PlaneGeometry(b.w * TILE_SIZE * 0.8, TILE_SIZE * 0.3);
      const signMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
      const sign = new THREE.Mesh(signGeo, signMat);
      sign.position.set(0, 4.8 * TILE_SIZE, 0);
      group.add(sign);
      
      group.position.set(bx, 0, bz);
      this.mapGroup.add(group);
      this.buildingMeshes.push(group);
    });
  }
  
  private createNPCs(): void {
    const centerX = MAP_WIDTH * TILE_SIZE / 2;
    const centerZ = MAP_HEIGHT * TILE_SIZE / 2;
    
    const npcData = [
      { x: 18 * TILE_SIZE + 80, z: 14 * TILE_SIZE + TILE_SIZE, color: '#88c0d0', name: 'Helena' },
      { x: 46 * TILE_SIZE - 20, z: 14 * TILE_SIZE + TILE_SIZE, color: '#a3be8c', name: 'Reginald' },
      { x: 30 * TILE_SIZE + TILE_SIZE, z: 10 * TILE_SIZE + TILE_SIZE, color: '#ebcb8b', name: 'Prudence' },
      { x: 10 * TILE_SIZE + TILE_SIZE, z: 32 * TILE_SIZE + TILE_SIZE, color: '#d08770', name: 'Parents' },
      { x: 50 * TILE_SIZE + TILE_SIZE, z: 32 * TILE_SIZE + TILE_SIZE, color: '#b48ead', name: 'Barnaby' },
      { x: 30 * TILE_SIZE + TILE_SIZE * 3, z: 36 * TILE_SIZE + TILE_SIZE, color: '#81a1c1', name: 'Cornelia' },
    ];
    
    npcData.forEach(npc => {
      const group = new THREE.Group();
      const color = new THREE.Color(npc.color);
      
      // Body
      const bodyGeo = new THREE.BoxGeometry(TILE_SIZE * 0.35, TILE_SIZE * 0.5, TILE_SIZE * 0.2);
      const bodyMat = new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = TILE_SIZE * 0.35;
      body.castShadow = true;
      group.add(body);
      
      // Head
      const headGeo = new THREE.BoxGeometry(TILE_SIZE * 0.3, TILE_SIZE * 0.3, TILE_SIZE * 0.25);
      const headMat = new THREE.MeshStandardMaterial({ color: 0xffb88c, roughness: 0.7 });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = TILE_SIZE * 0.75;
      head.castShadow = true;
      group.add(head);
      
      // Eyes
      const eyeGeo = new THREE.BoxGeometry(TILE_SIZE * 0.06, TILE_SIZE * 0.06, TILE_SIZE * 0.02);
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0x222222 });
      [-0.06, 0.06].forEach(x => {
        const eye = new THREE.Mesh(eyeGeo, eyeMat);
        eye.position.set(x * TILE_SIZE, TILE_SIZE * 0.78, TILE_SIZE * 0.14);
        group.add(eye);
      });
      
      group.position.set(npc.x - centerX, 0, npc.z - centerZ);
      this.mapGroup.add(group);
      this.npcMeshes.push(group);
    });
  }
  
  private createNotes(): void {
    const centerX = MAP_WIDTH * TILE_SIZE / 2;
    const centerZ = MAP_HEIGHT * TILE_SIZE / 2;
    
    const notes = [
      { id: 1, x: 20, z: 18 }, { id: 2, x: 34, z: 12 }, { id: 3, x: 30, z: 22 },
      { id: 4, x: 28, z: 11 }, { id: 5, x: 48, z: 16 }, { id: 6, x: 4, z: 24 },
      { id: 7, x: 14, z: 20 }, { id: 8, x: 22, z: 30 }, { id: 9, x: 42, z: 28 },
      { id: 10, x: 6, z: 40 }, { id: 11, x: 32, z: 14 }, { id: 12, x: 16, z: 26 },
      { id: 13, x: 54, z: 26 }, { id: 14, x: 40, z: 38 }, { id: 15, x: 10, z: 12 },
    ];
    
    notes.forEach(n => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 40;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#fffdf0';
      ctx.fillRect(0, 0, 32, 40);
      ctx.strokeStyle = '#cc3333';
      ctx.lineWidth = 2;
      ctx.strokeRect(2, 2, 28, 36);
      ctx.fillStyle = `hsl(${n.id * 24}, 80%, 60%)`;
      ctx.fillRect(3, 3, 4, 34);
      ctx.fillStyle = '#cc3333';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('!', 16, 28);
      
      const tex = new THREE.CanvasTexture(canvas);
      tex.magFilter = THREE.NearestFilter;
      
      const geo = new THREE.PlaneGeometry(TILE_SIZE * 0.4, TILE_SIZE * 0.5);
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geo, mat);
      
      mesh.position.set(n.x * TILE_SIZE - centerX, TILE_SIZE * 1.0, n.z * TILE_SIZE - centerZ);
      mesh.userData = { noteId: n.id, baseY: TILE_SIZE * 1.0 };
      
      this.mapGroup.add(mesh);
      this.noteMeshes.push(mesh);
    });
  }
  
  private createParticles(): void {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * MAP_WIDTH * TILE_SIZE;
      positions[i * 3 + 1] = Math.random() * 30 + 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * MAP_HEIGHT * TILE_SIZE;
      
      const brightness = 0.5 + Math.random() * 0.5;
      colors[i * 3] = brightness * 0.9;
      colors[i * 3 + 1] = brightness * 0.7;
      colors[i * 3 + 2] = brightness * 0.5;
    }
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    
    const tex = new THREE.CanvasTexture(canvas);
    
    const mat = new THREE.PointsMaterial({
      map: tex,
      size: TILE_SIZE * 0.15,
      transparent: true,
      alphaTest: 0.01,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      sizeAttenuation: true,
    });
    
    this.particleSystem = new THREE.Points(geo, mat);
    this.mapGroup.add(this.particleSystem);
  }
  
  private createFireflies(): void {
    const count = 60;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * MAP_WIDTH * TILE_SIZE * 0.9;
      positions[i * 3 + 1] = Math.random() * 20 + 3;
      positions[i * 3 + 2] = (Math.random() - 0.5) * MAP_HEIGHT * TILE_SIZE * 0.9;
      
      colors[i * 3] = 0.8 + Math.random() * 0.2;
      colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
      colors[i * 3 + 2] = 0.3 + Math.random() * 0.3;
      
      sizes[i] = TILE_SIZE * (0.08 + Math.random() * 0.12);
    }
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const mat = new THREE.PointsMaterial({
      size: TILE_SIZE * 0.1,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      sizeAttenuation: true,
    });
    
    this.fireflySystem = new THREE.Points(geo, mat);
    this.mapGroup.add(this.fireflySystem);
  }
  
  private createTreesAndDecorations(): void {
    const centerX = MAP_WIDTH * TILE_SIZE / 2;
    const centerZ = MAP_HEIGHT * TILE_SIZE / 2;
    
    // Trees
    const treePositions = [
      { x: 5, z: 5 }, { x: 55, z: 5 }, { x: 5, z: 43 }, { x: 55, z: 43 },
      { x: 15, z: 8 }, { x: 50, z: 10 }, { x: 12, z: 38 }, { x: 52, z: 28 },
      { x: 38, z: 8 }, { x: 25, z: 15 }, { x: 40, z: 20 }, { x: 20, z: 35 },
    ];
    
    treePositions.forEach(tp => {
      const tree = this.createTree();
      tree.position.set(
        tp.x * TILE_SIZE - centerX,
        0,
        tp.z * TILE_SIZE - centerZ
      );
      this.mapGroup.add(tree);
    });
    
    // Lamps
    const lampPositions = [
      { x: 10, z: 23 }, { x: 22, z: 23 }, { x: 34, z: 23 }, { x: 46, z: 23 }, { x: 56, z: 23 },
      { x: 30, z: 14 }, { x: 30, z: 18 }, { x: 30, z: 30 }, { x: 30, z: 34 },
    ];
    
    lampPositions.forEach(lp => {
      const lamp = this.createLamp();
      lamp.position.set(
        lp.x * TILE_SIZE - centerX,
        0,
        lp.z * TILE_SIZE - centerZ
      );
      this.mapGroup.add(lamp);
    });
  }
  
  private createTree(): THREE.Group {
    const group = new THREE.Group();
    
    // Trunk
    const trunkGeo = new THREE.CylinderGeometry(TILE_SIZE * 0.12, TILE_SIZE * 0.15, TILE_SIZE * 0.6, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6b4226, roughness: 0.9 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = TILE_SIZE * 0.3;
    trunk.castShadow = true;
    group.add(trunk);
    
    // Canopy layers
    const sizes = [0.5, 0.4, 0.25];
    const heights = [0.65, 0.85, 1.05];
    sizes.forEach((s, i) => {
      const canopyGeo = new THREE.ConeGeometry(TILE_SIZE * s, TILE_SIZE * 0.4, 7);
      const canopyMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x2d6b1e).lerp(new THREE.Color(0x3a8030), i * 0.3),
        roughness: 0.8,
      });
      const canopy = new THREE.Mesh(canopyGeo, canopyMat);
      canopy.position.y = TILE_SIZE * heights[i];
      canopy.castShadow = true;
      group.add(canopy);
    });
    
    return group;
  }
  
  private createLamp(): THREE.Group {
    const group = new THREE.Group();
    
    // Pole
    const poleGeo = new THREE.CylinderGeometry(TILE_SIZE * 0.03, TILE_SIZE * 0.04, TILE_SIZE * 1.2, 6);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.6, roughness: 0.4 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.y = TILE_SIZE * 0.6;
    pole.castShadow = true;
    group.add(pole);
    
    // Lamp head
    const headGeo = new THREE.CylinderGeometry(TILE_SIZE * 0.15, TILE_SIZE * 0.2, TILE_SIZE * 0.15, 6);
    const headMat = new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.5 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = TILE_SIZE * 1.25;
    group.add(head);
    
    // Light bulb (emissive)
    const bulbGeo = new THREE.SphereGeometry(TILE_SIZE * 0.08, 8, 6);
    const bulbMat = new THREE.MeshStandardMaterial({
      emissive: 0xffcc00,
      emissiveIntensity: 0.5,
      color: 0xffee88,
    });
    const bulb = new THREE.Mesh(bulbGeo, bulbMat);
    bulb.position.y = TILE_SIZE * 1.15;
    group.add(bulb);
    
    return group;
  }
  
  public updatePlayerSprite(px: number, py: number, dir: string, frame: number, scarfStripes: number, time: number): void {
    // We'll render the player as a canvas texture on a plane
    // This is handled via the canvas overlay for the main scene
  }
  
  public render(time: number): void {
    const state = GAME.state;
    
    // Update day/night cycle
    this.dayTime = 0.3 + Math.sin(time * 0.02) * 0.2;
    const dayFactor = Math.max(0, Math.min(1, (this.dayTime - 0.2) / 0.6));
    
    // Update lights
    this.ambientLight.intensity = 0.3 + dayFactor * 0.5;
    this.dirLight.intensity = 0.2 + dayFactor * 0.8;
    
    const sunColor = new THREE.Color().lerpColors(
      new THREE.Color(0x4444aa),
      new THREE.Color(0xffeedd),
      dayFactor
    );
    this.dirLight.color = sunColor;
    
    const ambientColor = new THREE.Color().lerpColors(
      new THREE.Color(0x222244),
      new THREE.Color(0x6688aa),
      dayFactor
    );
    this.ambientLight.color = ambientColor;
    
    // Building lights get stronger at night
    this.buildingLights.forEach((light, i) => {
      const completed = BUILDINGS[i]?.completed || false;
      light.intensity = completed ? (1.0 - dayFactor) * 1.5 : 0;
    });
    
    // Camera follow player
    const centerX = MAP_WIDTH * TILE_SIZE / 2;
    const centerZ = MAP_HEIGHT * TILE_SIZE / 2;
    
    this.targetCamX = state.playerX - centerX;
    this.targetCamY = -(state.playerY - centerZ);
    
    this.currentCamX += (this.targetCamX - this.currentCamX) * 0.08;
    this.currentCamY += (this.targetCamY - this.currentCamY) * 0.08;
    
    this.camera.position.x = this.currentCamX;
    this.camera.position.y = this.currentCamY;
    
    // Animate NPCs
    this.npcMeshes.forEach((mesh, i) => {
      const bob = Math.sin(time * 1.5 + i * 2) * 0.03;
      mesh.children.forEach(child => {
        if (child.position.y > 0) {
          child.position.y += bob * 0.01;
        }
      });
    });
    
    // Animate notes
    this.noteMeshes.forEach((mesh) => {
      const collected = GAME.state.notesCollected.has(mesh.userData.noteId);
      mesh.visible = !collected;
      if (!collected) {
        mesh.position.y = mesh.userData.baseY + Math.sin(time * 2 + mesh.userData.noteId) * 0.15;
        mesh.lookAt(this.camera.position);
      }
    });
    
    // Animate fireflies
    if (this.fireflySystem) {
      const fPos = this.fireflySystem.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < fPos.length; i += 3) {
        fPos[i] += Math.sin(time * 0.5 + i) * 0.02;
        fPos[i + 1] += Math.cos(time * 0.7 + i * 0.5) * 0.01;
        fPos[i + 2] += Math.sin(time * 0.6 + i * 0.3) * 0.02;
      }
      this.fireflySystem.geometry.attributes.position.needsUpdate = true;
      this.fireflySystem.material.opacity = (1 - dayFactor) * 0.8;
    }
    
    // Animate particles
    if (this.particleSystem) {
      const pPos = this.particleSystem.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pPos.length; i += 3) {
        pPos[i] += Math.sin(time * 0.3 + i) * 0.01;
        pPos[i + 1] += Math.cos(time * 0.2 + i) * 0.005;
      }
      this.particleSystem.geometry.attributes.position.needsUpdate = true;
    }
    
    // Update water
    if (this.waterMesh) {
      (this.waterMesh.material as THREE.ShaderMaterial).uniforms.time.value = time;
    }
    
    // Update sky
    if (this.skyMesh) {
      (this.skyMesh.material as THREE.ShaderMaterial).uniforms.dayTime.value = this.dayTime;
      (this.skyMesh.material as THREE.ShaderMaterial).uniforms.time.value = time;
      this.skyMesh.position.x = this.camera.position.x;
    }
    
    // Update fog density based on day/night
    this.scene.fog!.density = THREE.MathUtils.lerp(0.0012, 0.002, 1 - dayFactor);
    
    // Render main scene to target
    this.renderer.setRenderTarget(this.renderCanvas);
    this.renderer.render(this.scene, this.camera);
    
    // Render post-processing
    this.renderer.setRenderTarget(null);
    this.postMaterial.uniforms.tDiffuse.value = this.renderCanvas.texture;
    this.postMaterial.uniforms.time.value = time;
    this.postMaterial.uniforms.dayTime.value = this.dayTime;
    this.postMaterial.uniforms.bloomStrength.value = 0.12 + (1 - dayFactor) * 0.1;
    this.renderer.render(this.postScene, this.postCamera);
  }
  
  private onResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;
    const frustumSize = VIEWPORT_HEIGHT;
    
    this.camera.left = -frustumSize * aspect / 2;
    this.camera.right = frustumSize * aspect / 2;
    this.camera.top = frustumSize / 2;
    this.camera.bottom = -frustumSize / 2;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(width, height);
  }
  
  public getDOMElement(): HTMLCanvasElement {
    return this.renderer.domElement;
  }
  
  public dispose(): void {
    this.renderer.dispose();
    this.renderCanvas.dispose();
  }
}

export default Renderer3D;

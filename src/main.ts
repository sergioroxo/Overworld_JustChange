

// === JUST CHANGE™ — Restoration Springs Overworld (3D Enhanced) ===
// SurvivingSOGICE · University of Bergen · 2026

import { GAME } from './game';
import { Renderer3D } from './renderer3d';
import { UILayer } from './ui';
import { SCALE, VIEWPORT_WIDTH, VIEWPORT_HEIGHT, MAP_WIDTH, MAP_HEIGHT, TILE_SIZE, SAVE_VERSION } from './definitions';
import { SURVIVOR_NOTES } from './entities';
import { aabb, clamp } from './utils';
import { audio } from './audio';
import { persistence } from './libs/persistence';

class GameEngine {
  private renderer3d: Renderer3D | null = null;
  private ui: UILayer | null = null;
  private loadingFill: HTMLElement | null = null;
  private loadingText: HTMLElement | null = null;
  private loadingScreen: HTMLElement | null = null;
  private loadingError: HTMLElement | null = null;
  private forceStartBtn: HTMLElement | null = null;
  private startScreen: HTMLElement | null = null;
  private transitionOverlay: HTMLElement | null = null;
  
  private running = false;
  private lastTime = 0;
  private transitionAlpha = 0;
  private isTransitioning = false;
  private initFailed = false;

  // Input
  private keys: Record<string, boolean> = {
    ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
    w: false, s: false, a: false, d: false,
    ' ': false, Enter: false, Escape: false,
    f: false, n: false, i: false,
  };
  private keyJustPressed = new Set<string>();
  private _prevKeys: Record<string, boolean> | null = null;

  private setLoading(text: string, progress: number): void {
    if (this.loadingText) this.loadingText.textContent = text;
    if (this.loadingFill) this.loadingFill.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }

  async init(): Promise<void> {
    const container = document.getElementById('game-container');
    if (!container) {
      console.error('No game container found');
      this.setLoading('ERROR: Missing container', 0);
      this.showError('Game container not found. Please refresh.');
      return;
    }

    // Show loading screen
    this.loadingScreen = document.getElementById('loading-screen');
    this.loadingFill = document.getElementById('loading-fill');
    this.loadingText = document.getElementById('loading-text');
    this.loadingError = document.getElementById('loading-error');
    this.forceStartBtn = document.getElementById('force-start-btn');
    this.transitionOverlay = document.getElementById('transition-overlay');

    // Setup force start button
    if (this.forceStartBtn) {
      this.forceStartBtn.addEventListener('click', () => {
        console.log('Force starting game...');
        this.handleInitError('Force start activated');
      });
    }

    try {
      // Initialize audio with timeout
      this.setLoading('Initializing audio...', 10);
      await this.initAudioWithTimeout();
      
      // Generate world
      this.setLoading('Generating world...', 30);
      await this.delay(100);
      
      // Initialize 3D renderer
      this.setLoading('Rendering environment...', 60);
      this.renderer3d = new Renderer3D(container);
      await this.delay(100);
      
      // Prepare UI
      this.setLoading('Preparing UI...', 80);
      this.ui = new UILayer();
      await this.delay(100);
      
      // Initialize game state
      this.setLoading('Initializing systems...', 90);
      GAME.init();
      
      // Try loading saved game
      this.setLoading('Checking save data...', 100);
      await this.loadGame();
      await this.delay(200);
      
      // Success - show start screen
      this.createStartScreen();
      
    } catch (error) {
      console.error('Initialization error:', error);
      this.handleInitError(error instanceof Error ? error.message : String(error));
    }
  }

  private async initAudioWithTimeout(): Promise<void> {
    try {
      // Create a promise that resolves when audio initializes
      const audioPromise = audio.init();
      
      // Create a timeout promise (3 seconds)
      const timeoutPromise = new Promise<void>((resolve) => {
        setTimeout(() => {
          console.warn('Audio initialization timeout - continuing without audio');
          resolve();
        }, 3000);
      });
      
      // Race between audio init and timeout
      await Promise.race([audioPromise, timeoutPromise]);
      
    } catch (error) {
      console.warn('Audio failed to initialize:', error);
      // Continue without audio - not fatal
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private handleError(step: string, error: unknown): void {
    console.error(`Error during ${step}:`, error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    this.setLoading(`ERROR: ${step}`, 100);
    this.showError(`Failed during ${step}: ${errorMsg}`);
    this.initFailed = true;
    
    // Show force start button
    if (this.forceStartBtn) {
      this.forceStartBtn.style.display = 'inline-block';
    }
  }

  private handleInitError(errorMsg: string): void {
    console.log('Handling init error:', errorMsg);
    
    // Try to recover what we can
    if (!this.renderer3d) {
      const container = document.getElementById('game-container');
      if (container) {
        try {
          this.renderer3d = new Renderer3D(container);
        } catch (e) {
          console.error('Failed to create renderer during recovery:', e);
        }
      }
    }
    
    if (!this.ui) {
      try {
        this.ui = new UILayer();
      } catch (e) {
        console.error('Failed to create UI during recovery:', e);
      }
    }
    
    if (!GAME.state.hasStarted) {
      GAME.init();
    }
    
    // Hide loading screen and show start screen
    this.loadingScreen?.classList.add('hidden');
    this.createStartScreen();
  }

  private showError(message: string): void {
    if (this.loadingError) {
      this.loadingError.textContent = message;
      this.loadingError.style.display = 'block';
    }
  }

  async loadGame(): Promise<void> {
    try {
      const saveStr = await persistence.getItem(SAVE_VERSION);
      if (saveStr) {
        const saveData = JSON.parse(saveStr);
        if (saveData.version === SAVE_VERSION) {
          GAME.loadSave(saveData);
        }
      }
    } catch (e) {
      console.log('No save found or error loading:', e);
    }
  }

  async saveGame(): Promise<void> {
    try {
      const saveData = GAME.createSave();
      await persistence.setItem(SAVE_VERSION, JSON.stringify(saveData));
    } catch (e) {
      console.log('Error saving:', e);
    }
  }

  createStartScreen(): void {
    // Remove existing start screen if any
    if (this.startScreen) {
      this.startScreen.remove();
    }

    const start = document.createElement('div');
    start.className = 'start-screen';
    start.innerHTML = `
      <div class="version">v2.0 · 3D Enhanced</div>
      <h1>JUST CHANGE™</h1>
      <div class="subtitle">Restoration Springs — A Conversion Hero</div>
      <div class="tagline">"Your name is yours. Don't let them take it."</div>
      <button class="start-btn" id="start-btn">BEGIN SESSION</button>
      ${GAME.state.hasStarted ? '<button class="start-btn" id="continue-btn" style="margin-top: 15px; font-size: 11px;">CONTINUE</button>' : ''}
      <div class="controls">
        <span>WASD/ARROWS</span> Move &nbsp;
        <span>SPACE</span> Interact &nbsp;
        <span>F</span> Clinical File &nbsp;
        <span>N</span> Notes &nbsp;
        <span>ESC</span> Menu
      </div>
      <div class="credits">SurvivingSOGICE · University of Bergen · 2025</div>
    `;
    document.body.appendChild(start);
    this.startScreen = start;

    const startBtn = document.getElementById('start-btn');
    const continueBtn = document.getElementById('continue-btn');
    
    if (startBtn) {
      startBtn.addEventListener('click', () => this.startGame(false));
    }
    if (continueBtn) {
      continueBtn.addEventListener('click', () => this.startGame(true));
    }
  }

  async startGame(loadSave: boolean): Promise<void> {
    if (this.startScreen) {
      this.startScreen.style.opacity = '0';
      this.startScreen.style.transition = 'opacity 0.8s ease';
      setTimeout(() => this.startScreen?.remove(), 800);
    }

    if (this.loadingScreen) {
      this.loadingScreen.classList.add('hidden');
      this.loadingScreen.style.transition = 'opacity 0.8s ease';
    }

    if (!loadSave) {
      GAME.state.hasStarted = true;
      GAME.state.inOverworld = true;
      GAME.state.playerX = 32 * 16;
      GAME.state.playerY = 32 * 26;
    }

    try {
      this.ui?.init();
    } catch (e) {
      console.error('UI init error during start:', e);
    }
    
    // Transition effect
    this.isTransitioning = true;
    if (this.transitionOverlay) {
      this.transitionOverlay.classList.add('active');
      await this.delay(500);
      this.transitionOverlay.classList.remove('active');
    }
    this.isTransitioning = false;

    this.running = true;
    this.lastTime = performance.now();
    this.setupInput();
    requestAnimationFrame((t) => this.loop(t));
  }

  loop(currentTime: number): void {
    if (!this.running) return;

    const dt = Math.min((currentTime - this.lastTime) / 1000, 0.05);
    this.lastTime = currentTime;

    this.update(dt);
    
    if (this.renderer3d) {
      this.renderer3d.render(GAME.state.time);
    }

    // Draw player sprite on top using overlay canvas
    this.drawPlayerSprite();

    // Update UI
    try {
      this.ui?.updateDialogue(dt);
      this.ui?.updateTicker(dt);
      this.ui?.updateNotifications(dt);
      this.ui?.updateHUD();
      this.ui?.renderMinimap();
    } catch (e) {
      console.error('UI update error:', e);
    }

    // Update audio
    try {
      audio.update(GAME.state.time, GAME.state.dayTime);
    } catch (e) {
      // Audio errors are non-fatal
    }

    // Auto-save every 30 seconds
    if (Math.floor(GAME.state.time) % 30 === 0 && Math.floor(GAME.state.time) > 0) {
      this.saveGame();
    }

    requestAnimationFrame((t) => this.loop(t));
  }

  drawPlayerSprite(): void {
    // The player is drawn via the 3D renderer
  }

  update(dt: number): void {
    if (!GAME.state.hasStarted || GAME.state.inMenu) return;

    const state = GAME.state;

    // Clear just-pressed keys
    this.keyJustPressed.clear();
    this.processInput();

    state.time += dt;
    state.gameDay = Math.floor(state.time / 120) + 1;
    state.dayTime = (Math.sin(state.time * 0.02) + 1) / 2;

    // Player movement
    if (!state.inDialogue && !state.inTreatmentFile) {
      let dx = 0, dy = 0;
      if (this.keys.ArrowUp || this.keys.w) { dy = -1; state.playerDir = 'up'; }
      if (this.keys.ArrowDown || this.keys.s) { dy = 1; state.playerDir = 'down'; }
      if (this.keys.ArrowLeft || this.keys.a) { dx = -1; state.playerDir = 'left'; }
      if (this.keys.ArrowRight || this.keys.d) { dx = 1; state.playerDir = 'right'; }

      if (dx !== 0 && dy !== 0) {
        dx *= 0.707;
        dy *= 0.707;
      }

      if (dx !== 0 || dy !== 0) {
        const newX = state.playerX + dx * state.speed * dt;
        const newY = state.playerY + dy * state.speed * dt;
        const playerSize = 8;

        let canMoveX = true;
        let canMoveY = true;

        GAME.buildings.forEach(b => {
          if (aabb(newX - playerSize, state.playerY - playerSize, playerSize * 2, playerSize * 2, b.x, b.y, b.width, b.height)) {
            canMoveX = false;
          }
          if (aabb(state.playerX - playerSize, newY - playerSize, playerSize * 2, playerSize * 2, b.x, b.y, b.width, b.height)) {
            canMoveY = false;
          }
        });

        const mapW = MAP_WIDTH * TILE_SIZE;
        const mapH = MAP_HEIGHT * TILE_SIZE;
        if (newX < 16 || newX > mapW - 16) canMoveX = false;
        if (newY < 16 || newY > mapH - 16) canMoveY = false;

        if (canMoveX) state.playerX = newX;
        if (canMoveY) state.playerY = newY;

        state.walkTimer += dt;
        if (state.walkTimer > 0.12) {
          state.walkTimer = 0;
          state.walkFrame = (state.walkFrame + 1) % 2;
          try {
            if (Math.random() < 0.3) audio.playSFX('step');
          } catch (e) {}
        }
      } else {
        state.walkFrame = 0;
      }
    }

    // Check building proximity
    let nearBuilding: any = null;
    GAME.buildings.forEach(b => {
      const playerCenterX = state.playerX;
      const playerCenterY = state.playerY;
      const doorX = b.x + b.width / 2;
      const doorY = b.y + b.height;
      const d = Math.sqrt((playerCenterX - doorX) ** 2 + (playerCenterY - doorY) ** 2);
      if (d < 80) {
        nearBuilding = b;
      }
    });

    if (nearBuilding) {
      this.ui?.showBuildingInfo(`${nearBuilding.emoji} ${nearBuilding.name}${nearBuilding.locked ? ' [LOCKED]' : ''}`);
      GAME.currentBuildingInteraction = nearBuilding;
    } else {
      this.ui?.hideBuildingInfo();
      GAME.currentBuildingInteraction = null;
    }

    // Check survival note proximity
    GAME.survivorNotes.forEach(note => {
      if (note.collected || GAME.state.notesCollected.has(note.id)) return;
      const d = Math.sqrt((state.playerX - note.x) ** 2 + (state.playerY - note.y) ** 2);
      if (d < 24) {
        note.collected = true;
        GAME.collectNote(note.id);
        const noteData = SURVIVOR_NOTES.find(n => n.id === note.id);
        if (noteData) this.ui?.showNote(noteData.text);
        else this.ui?.showNote("A crumpled note. Someone was here before you.");
      }
    });

    // Interaction
    if (this.keyJustPressed.has(' ') || this.keyJustPressed.has('Enter')) {
      if (this.ui && this.ui['dialogueEl']?.classList.contains('visible')) {
        this.ui.advanceDialogue();
      } else if (GAME.dialogueState?.active) {
        this.ui?.advanceDialogue();
      } else if (this.ui && this.ui['notePopupEl']?.classList.contains('visible')) {
        this.ui?.hideNote();
      } else if (nearBuilding) {
        if (nearBuilding.locked) {
          try { audio.playSFX('locked'); } catch (e) {}
          this.ui?.showPopup('🔒 LOCKED', 'Complete more sessions to unlock this area.', 'UNDERSTOOD');
        } else {
          this.npcInteraction(nearBuilding);
        }
      }
    }

    // Treatment file toggle
    if (this.keyJustPressed.has('f')) {
      if (GAME.state.inTreatmentFile) {
        GAME.closeTreatmentFile();
        this.ui?.hideTreatmentFile();
      } else if (!GAME.state.inDialogue) {
        GAME.openTreatmentFile();
        this.ui?.showTreatmentFile();
      }
    }

    // Notes viewer
    if (this.keyJustPressed.has('n')) {
      if (this.ui && this.ui['notePopupEl']?.classList.contains('visible')) {
        this.ui?.hideNote();
      } else {
        this.ui?.showAllNotes();
      }
    }

    // Menu toggle
    if (this.keyJustPressed.has('Escape')) {
      if (GAME.state.inTreatmentFile) {
        GAME.closeTreatmentFile();
        this.ui?.hideTreatmentFile();
      } else {
        GAME.toggleMenu();
        if (GAME.state.inMenu) this.ui?.showMenu();
        else this.ui?.hideMenu();
      }
    }
  }

  npcInteraction(building: any): void {
    if (!this.ui) return;
    try { audio.playSFX('select'); } catch (e) {}

    const npc = GAME.npcs.find(n => n.buildingId === building.id);
    const speaker = npc?.name || building.npcName;

    const visitBuilding = () => {
      GAME.visitBuilding(building);
      this.ui?.showNotification(`Session complete ✓ — ${building.name}`);

      setTimeout(() => {
        if (!GAME.state.inDialogue && GAME.state.popupCooldown <= 0) {
          this.ui?.showRandomPopup();
        }
      }, 3000);
    };

    this.ui.startDialogue(speaker, [...building.dialogue], visitBuilding);
  }

  processInput(): void {
    if (this._prevKeys) {
      for (const key in this.keys) {
        if (this.keys[key] && !this._prevKeys[key]) {
          this.keyJustPressed.add(key);
        }
      }
    }
    this._prevKeys = { ...this.keys };
  }

  setupInput(): void {
    window.addEventListener('keydown', (e) => {
      const key = e.key;
      if (key in this.keys) {
        this.keys[key] = true;
        e.preventDefault();
      }
      // Audio context unlock
      try {
        audio.init();
      } catch (e) {}
    });

    window.addEventListener('keyup', (e) => {
      const key = e.key;
      if (key in this.keys) {
        this.keys[key] = false;
      }
    });

    window.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
    });

    // Prevent context menu
    window.addEventListener('contextmenu', e => e.preventDefault());
  }

  async start(): Promise<void> {
    await this.init();
  }
}

// Start the game
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new GameEngine().start());
} else {
  new GameEngine().start();
}


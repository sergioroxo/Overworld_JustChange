
// === JUST CHANGE™ — Core Game State ===

import { 
  GameState, BuildingDef, DialogueState, 
  MAP_WIDTH, MAP_HEIGHT, TILE_SIZE, VIEWPORT_WIDTH, VIEWPORT_HEIGHT, SCALE, SAVE_VERSION
} from './definitions';
import { BUILDINGS, BUILDINGS_RAW, NPCS, SURVIVOR_NOTES } from './entities';
import { audio } from './audio';

interface ExtendedBuilding extends BuildingDef {
  x: number;
  y: number;
}

export const BUILDINGS_RAW: BuildingDef[] = [...BUILDINGS];

export const GAME = {
  state: {
    inOverworld: false,
    inDialogue: false,
    inMenu: false,
    inTreatmentFile: false,
    hasStarted: false,

    playerX: 32 * 16,
    playerY: 32 * 26,
    playerDir: 'down' as const,
    walkFrame: 0,
    walkTimer: 0,
    speed: 100,

    scarfStripes: 6,
    scarfColors: ['#ff0000', '#ff8800', '#ffff00', '#00cc00', '#3366ff', '#9933ff'],

    compliance: 0,

    buildingsVisited: new Set<string>(),
    notesCollected: new Set<number>(),
    treatmentNotes: [] as any[],

    camX: 0,
    camY: 0,

    time: 0,
    gameDay: 1,
    dayTime: 0.5,

    activePopup: null as string | null,
    popupCooldown: 0,
    popupCount: 0,

    tickerIndex: 0,
    tickerMessage: '',
  } as GameState,

  dialogueState: null as DialogueState | null,
  consentGiven: false,

  buildings: [] as ExtendedBuilding[],
  npcs: [] as any[],
  survivorNotes: [] as any[],
  map: [] as number[][],
  particles: [] as any[],
  birds: [] as any[],

  currentBuildingInteraction: null as ExtendedBuilding | null,

  init(): void {
    this.generateMap();
    this.placeBuildings();
    this.placeNPCs();
    this.placeNotes();
    this.generateParticles();
    this.generateBirds();
  },

  generateMap(): void {
    const w = MAP_WIDTH;
    const h = MAP_HEIGHT;
    const map: number[][] = [];

    for (let y = 0; y < h; y++) {
      map[y] = [];
      for (let x = 0; x < w; x++) {
        map[y][x] = 0;
      }
    }

    // Golden paths
    for (let x = 4; x < w - 4; x++) {
      map[24][x] = 1;
      map[25][x] = 1;
    }
    for (let y = 10; y < h - 6; y++) {
      map[y][32] = 1;
      map[y][33] = 1;
    }

    // Fountain in center
    map[24][32] = 2;
    map[24][33] = 2;
    map[25][32] = 2;
    map[25][33] = 2;

    // Scatter decorations
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (map[y][x] === 0) {
          const r = Math.random();
          if (r < 0.025) map[y][x] = 3;
          else if (r < 0.045) map[y][x] = 4;
        }
      }
    }

    this.map = map;
  },

  placeBuildings(): void {
    const buildingPlacements: { id: string; x: number; y: number }[] = [
      { id: 'welcome', x: 18 * 32, y: 14 * 32 },
      { id: 'clinic', x: 46 * 32, y: 14 * 32 },
      { id: 'chapel', x: 30 * 32, y: 10 * 32 },
      { id: 'home', x: 10 * 32, y: 32 * 32 },
      { id: 'lab', x: 50 * 32, y: 32 * 32 },
      { id: 'conference', x: 30 * 32, y: 36 * 32 },
      { id: 'quiet', x: 4 * 32, y: 42 * 32 },
    ];

    this.buildings = buildingPlacements.map(placement => {
      const def = BUILDINGS.find(b => b.id === placement.id)!;
      return { ...def, x: placement.x, y: placement.y };
    });
  },

  placeNPCs(): void {
    this.npcs = [
      { id: 'npc_helena', name: 'Dr. Helena', buildingId: 'welcome', x: 18 * 32 + 80, y: 14 * 32 + 70, color: '#88c0d0', talkFrame: 0, talkTimer: 0 },
      { id: 'npc_reginald', name: 'Dr. Straightwell', buildingId: 'clinic', x: 46 * 32 - 20, y: 14 * 32 + 70, color: '#a3be8c', talkFrame: 0, talkTimer: 0 },
      { id: 'npc_prudence', name: 'Dr. Praymore', buildingId: 'chapel', x: 30 * 32 + 70, y: 10 * 32 + 90, color: '#ebcb8b', talkFrame: 0, talkTimer: 0 },
      { id: 'npc_parents', name: 'Mom & Dad', buildingId: 'home', x: 10 * 32 + 90, y: 32 * 32 + 50, color: '#d08770', talkFrame: 0, talkTimer: 0 },
      { id: 'npc_barnaby', name: 'Dr. Binary-Bolt', buildingId: 'lab', x: 50 * 32 + 80, y: 32 * 32 + 50, color: '#b48ead', talkFrame: 0, talkTimer: 0 },
      { id: 'npc_cornelia', name: 'Dr. Conformington', buildingId: 'conference', x: 30 * 32 + 120, y: 36 * 32 + 70, color: '#81a1c1', talkFrame: 0, talkTimer: 0 },
    ];
  },

  placeNotes(): void {
    this.survivorNotes = [
      { id: 1, x: 20 * 32, y: 18 * 32, collected: false },
      { id: 2, x: 34 * 32, y: 12 * 32, collected: false },
      { id: 3, x: 30 * 32, y: 22 * 32, collected: false },
      { id: 4, x: 28 * 32, y: 11 * 32, collected: false },
      { id: 5, x: 48 * 32, y: 16 * 32, collected: false },
      { id: 6, x: 4 * 32, y: 24 * 32, collected: false },
      { id: 7, x: 14 * 32, y: 20 * 32, collected: false },
      { id: 8, x: 22 * 32, y: 30 * 32, collected: false },
      { id: 9, x: 42 * 32, y: 28 * 32, collected: false },
      { id: 10, x: 6 * 32, y: 40 * 32, collected: false },
      { id: 11, x: 32 * 32, y: 14 * 32, collected: false },
      { id: 12, x: 16 * 32, y: 26 * 32, collected: false },
      { id: 13, x: 54 * 32, y: 26 * 32, collected: false },
      { id: 14, x: 40 * 32, y: 38 * 32, collected: false },
      { id: 15, x: 10 * 32, y: 12 * 32, collected: false },
    ];
  },

  generateParticles(): void {
    this.particles = [];
    for (let i = 0; i < 80; i++) {
      this.particles.push({
        type: 'grass',
        x: Math.random() * MAP_WIDTH * 32,
        y: Math.random() * MAP_HEIGHT * 32,
        phase: Math.random() * Math.PI * 2,
      });
    }
  },

  generateBirds(): void {
    this.birds = [];
    for (let i = 0; i < 5; i++) {
      this.birds.push({
        x: Math.random() * 800 - 200,
        y: Math.random() * 300 + 50,
        speed: 30 + Math.random() * 40,
        flapTimer: Math.random() * Math.PI * 2,
      });
    }
  },

  getBuildingById(id: string): BuildingDef | undefined {
    return this.buildings.find(b => b.id === id);
  },

  visitBuilding(building: ExtendedBuilding): void {
    this.state.buildingsVisited.add(building.id);
    building.completed = true;

    const dateStr = `Session ${this.state.treatmentNotes.length + 1}`;
    this.state.treatmentNotes.push({
      id: this.state.treatmentNotes.length + 1,
      title: `${building.emoji} ${building.name}`,
      date: dateStr,
      text: `Patient visited ${building.name}. NPC: ${building.npcName}. ${building.description}. Progress recorded.`,
      building: building.name,
    });

    if (this.state.scarfStripes > 0) {
      this.state.scarfStripes--;
    }

    this.state.compliance = Math.min(1, this.state.compliance + 0.15);

    // Audio feedback
    audio.playSFX('complete');

    // Unlock quiet room after 6 buildings
    if (this.state.buildingsVisited.size >= 6) {
      const quiet = this.buildings.find(b => b.id === 'quiet');
      if (quiet) quiet.locked = false;
    }
  },

  collectNote(id: number): boolean {
    const note = this.survivorNotes.find(n => n.id === id);
    if (note && !note.collected && !this.state.notesCollected.has(id)) {
      note.collected = true;
      this.state.notesCollected.add(id);
      audio.playSFX('note');
      
      if (this.state.scarfStripes < 6) {
        this.state.scarfStripes = Math.min(6, this.state.scarfStripes + 1);
      }
      
      return true;
    }
    return false;
  },

  openTreatmentFile(): void {
    this.state.inTreatmentFile = true;
  },

  closeTreatmentFile(): void {
    this.state.inTreatmentFile = false;
  },

  toggleMenu(): void {
    this.state.inMenu = !this.state.inMenu;
  },

  showAllNotes(): void {
    // Handled by UI
  },

  // Save/Load system
  createSave(): any {
    return {
      version: SAVE_VERSION,
      timestamp: Date.now(),
      playerX: this.state.playerX,
      playerY: this.state.playerY,
      scarfStripes: this.state.scarfStripes,
      compliance: this.state.compliance,
      buildingsVisited: Array.from(this.state.buildingsVisited),
      notesCollected: Array.from(this.state.notesCollected),
      treatmentNotes: this.state.treatmentNotes,
      buildingsCompleted: this.buildings.map(b => ({ id: b.id, completed: b.completed })),
      notesCollectedStates: this.survivorNotes.map(n => n.collected),
      consentGiven: this.consentGiven,
      time: this.state.time,
    };
  },

  loadSave(data: any): void {
    this.state.playerX = data.playerX ?? 32 * 16;
    this.state.playerY = data.playerY ?? 32 * 26;
    this.state.scarfStripes = data.scarfStripes ?? 6;
    this.state.compliance = data.compliance ?? 0;
    
    if (data.buildingsVisited) {
      data.buildingsVisited.forEach((id: string) => this.state.buildingsVisited.add(id));
    }
    
    if (data.notesCollected) {
      data.notesCollected.forEach((id: number) => this.state.notesCollected.add(id));
    }
    
    this.state.treatmentNotes = data.treatmentNotes ?? [];
    this.consentGiven = data.consentGiven ?? false;
    
    // Restore building states
    if (data.buildingsCompleted) {
      data.buildingsCompleted.forEach((b: any) => {
        const building = this.buildings.find(bd => bd.id === b.id);
        if (building) building.completed = b.completed;
      });
    }
    
    // Restore note states
    if (data.notesCollectedStates) {
      this.survivorNotes.forEach((n, i) => {
        if (data.notesCollectedStates[i]) n.collected = true;
      });
    }
    
    this.state.hasStarted = true;
    this.state.time = data.time ?? 0;
  },
};

export default GAME;


// === JUST CHANGE™ — Type Definitions ===

export interface Vector2D {
  x: number;
  y: number;
}

export interface TileInfo {
  type: TileType;
  variant?: number;
}

export enum TileType {
  GRASS = 0,
  PATH_GOLD = 1,
  WATER = 2,
  FLOWER = 3,
  TREE = 4,
  BENCH = 5,
  SIGN = 6,
  LAMP = 7,
  FOUNTAIN = 8,
  NOTE = 9,
  BILLBOARD = 10,
  ARCADE = 11,
}

export interface BuildingDef {
  id: string;
  name: string;
  emoji: string;
  doorX: number;
  doorY: number;
  width: number;
  height: number;
  npcName: string;
  description: string;
  dialogue: string[];
  bgColor1: string;
  bgColor2: string;
  roofColor: string;
  completed: boolean;
  locked?: boolean;
}

export interface NPCDef {
  id: string;
  name: string;
  buildingId: string;
  x: number;
  y: number;
  spriteColor: string;
  dialogue: string[];
  dialogueQueue?: string[];
}

export interface SurvivorNote {
  id: number;
  text: string;
  x: number;
  y: number;
  collected: boolean;
}

export interface GameState {
  inOverworld: boolean;
  inDialogue: boolean;
  inMenu: boolean;
  inTreatmentFile: boolean;
  hasStarted: boolean;

  // Player state
  playerX: number;
  playerY: number;
  playerDir: 'down' | 'up' | 'left' | 'right';
  walkFrame: number;
  walkTimer: number;
  speed: number;

  // Scarf: 6 stripes (full rainbow)
  scarfStripes: number;
  scarfColors: string[];

  // Compliance / G.conv
  compliance: number; // 0-1

  // Session tracking
  buildingsVisited: Set<string>;
  notesCollected: Set<number>;
  treatmentNotes: TreatmentNote[];

  // Camera
  camX: number;
  camY: number;

  // Time
  time: number;

  // Popup state
  activePopup: PopupType | null;
  popupCooldown: number;
  popupCount: number;

  // Ticker
  tickerIndex: number;
  tickerMessage: string;
  
  // Game day
  gameDay: number;
  dayTime: number; // 0-1 cycle
}

export interface TreatmentNote {
  id: number;
  title: string;
  date: string;
  text: string;
  building: string;
}

export type PopupType = 
  | 'ad' 
  | 'cookie' 
  | 'testimonial' 
  | 'captcha' 
  | 'notification';

export interface PopupData {
  type: PopupType;
  title: string;
  body: string;
  image?: string;
  btnText: string;
  btnType?: string;
}

export interface DialogueState {
  active: boolean;
  speakerName: string;
  lines: string[];
  lineIndex: number;
  charIndex: number;
  charTimer: number;
  currentText: string;
  callback?: () => void;
}

// Tilemap dimensions
export const MAP_WIDTH = 64;
export const MAP_HEIGHT = 48;
export const TILE_SIZE = 32;

// Canvas viewport
export const VIEWPORT_WIDTH = 480;
export const VIEWPORT_HEIGHT = 272;
export const SCALE = 3;

export const RAINBOW_COLORS = ['#ff0000', '#ff8800', '#ffff00', '#00cc00', '#3366ff', '#9933ff'];

// Save data version
export const SAVE_VERSION = 'justchange_v1';

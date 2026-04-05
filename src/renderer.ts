
// === JUST CHANGE™ — Pixel Art Renderer ===

import { GAME } from './game';
import { TILE_SIZE, MAP_WIDTH, MAP_HEIGHT, VIEWPORT_WIDTH, VIEWPORT_HEIGHT, SCALE, RAINBOW_COLORS } from './definitions';
import { drawRect, drawBorder, drawGradientRect } from './utils';

const TILE_SPRITES: Record<number, (ctx: CanvasRenderingContext2D, x: number, y: number, t: number) => void> = {
  // Grass
  0: (ctx, x, y, t) => {
    ctx.fillStyle = '#4a7c3f';
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    // Grass variation
    const hash = ((x / TILE_SIZE) * 7 + (y / TILE_SIZE) * 13) % 1;
    if (hash > 0.7) {
      ctx.fillStyle = '#3d6b34';
      ctx.fillRect(x + 8, y + 12, 4, 6);
      ctx.fillRect(x + 20, y + 8, 3, 8);
    }
    if (hash > 0.5 && hash <= 0.7) {
      ctx.fillStyle = '#5a8c4f';
      ctx.fillRect(x + 4, y + 20, 6, 4);
    }
  },
  // Gold Path
  1: (ctx, x, y, t) => {
    ctx.fillStyle = '#b8960f';
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    ctx.fillStyle = '#a8850e';
    ctx.fillRect(x + 2, y + 2, TILE_SIZE - 4, TILE_SIZE - 4);
    // Bricks
    ctx.fillStyle = '#c9a520';
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const offset = (row % 2) * 4;
        ctx.fillRect(x + 4 + col * 7 + offset, y + 6 + row * 6, 5, 4);
      }
    }
  },
  // Water
  2: (ctx, x, y, t) => {
    const wave = Math.sin(t * 3 + x * 0.05 + y * 0.03) * 0.3 + 0.7;
    const g = Math.floor(100 + wave * 50);
    const b = Math.floor(180 + wave * 40);
    ctx.fillStyle = `rgb(40, ${g}, ${b})`;
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    // Shimmer
    const shim = Math.sin(t * 5 + x * 0.1) * 0.5 + 0.5;
    if (shim > 0.7) {
      ctx.fillStyle = `rgba(255, 255, 255, ${shim * 0.3})`;
      ctx.fillRect(x + 8, y + 10, 8, 2);
    }
  },
  // Flower
  3: (ctx, x, y, t) => {
    ctx.fillStyle = '#4a7c3f';
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    // Stem
    ctx.fillStyle = '#2d5a1e';
    ctx.fillRect(x + 14, y + 16, 4, 12);
    // Petals
    const colors = ['#ff4466', '#ffaa00', '#ff66aa', '#aa44ff', '#ffffff'];
    const ci = ((x / TILE_SIZE) * 3 + (y / TILE_SIZE) * 7) % colors.length | 0;
    ctx.fillStyle = colors[ci];
    const cx = x + 16, cy = y + 12;
    for (let a = 0; a < 5; a++) {
      const angle = (a / 5) * Math.PI * 2;
      ctx.fillRect(cx + Math.cos(angle) * 4 - 2, cy + Math.sin(angle) * 4 - 2, 4, 4);
    }
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(cx - 2, cy - 2, 4, 4);
  },
  // Tree
  4: (ctx, x, y, t) => {
    ctx.fillStyle = '#4a7c3f';
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    // Trunk
    ctx.fillStyle = '#6b4226';
    ctx.fillRect(x + 12, y + 16, 8, 14);
    // Canopy
    ctx.fillStyle = '#2d6b1e';
    ctx.fillRect(x + 4, y + 2, 24, 16);
    ctx.fillStyle = '#3a8030';
    ctx.fillRect(x + 6, y + 4, 20, 12);
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(x + 8, y + 28, 16, 4);
  },
  // Bench
  5: (ctx, x, y, t) => {
    ctx.fillStyle = '#8B7355';
    ctx.fillRect(x + 4, y + 14, 24, 8);
    ctx.fillStyle = '#6B5335';
    ctx.fillRect(x + 6, y + 22, 4, 8);
    ctx.fillRect(x + 22, y + 22, 4, 8);
    // Back
    ctx.fillStyle = '#9B8365';
    ctx.fillRect(x + 4, y + 8, 24, 6);
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(x + 4, y + 28, 24, 3);
  },
  // Lamp
  7: (ctx, x, y, t) => {
    ctx.fillStyle = '#4a7c3f';
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    // Pole
    ctx.fillStyle = '#333';
    ctx.fillRect(x + 14, y + 8, 4, 24);
    // Lamp head
    ctx.fillStyle = '#444';
    ctx.fillRect(x + 8, y + 4, 16, 6);
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(x + 10, y + 6, 12, 2);
    // Glow
    if (Math.sin(t * 0.5) > -0.3) {
      ctx.fillStyle = 'rgba(255, 204, 0, 0.08)';
      ctx.beginPath();
      ctx.arc(x + 16, y + 7, 20, 0, Math.PI * 2);
      ctx.fill();
    }
  },
  // Fountain (edge)
  8: (ctx, x, y, t) => {
    ctx.fillStyle = '#888';
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    // Stone edge
    ctx.fillStyle = '#999';
    for (let i = 0; i < TILE_SIZE; i += 4) {
      ctx.fillRect(x + i, y, 3, 4);
      ctx.fillRect(x, y + i, 4, 3);
    }
  },
};

// === PLAYER RENDERER ===

function drawPlayer(ctx: CanvasRenderingContext2D, px: number, py: number, dir: string, frame: number, scarfStripes: number, t: number): void {
  const x = Math.floor(px);
  const y = Math.floor(py);
  const bob = frame % 2 === 1 ? -1 : 0;

  if (dir === 'down') {
    // Body
    ctx.fillStyle = '#4a70a0';
    ctx.fillRect(x - 6, y - 10 + bob, 12, 14);
    // Head
    ctx.fillStyle = '#ffb88c';
    ctx.fillRect(x - 4, y - 16 + bob, 8, 8);
    // Hair
    ctx.fillStyle = '#2a1a0a';
    ctx.fillRect(x - 5, y - 18 + bob, 10, 4);
    // Eyes
    ctx.fillStyle = '#222';
    ctx.fillRect(x - 2, y - 13 + bob, 2, 2);
    ctx.fillRect(x + 1, y - 13 + bob, 2, 2);
    // Legs
    const legOff = frame % 2 === 0 ? 0 : 2;
    ctx.fillStyle = '#333';
    ctx.fillRect(x - 5, y + 4 + bob, 4, 6 + legOff);
    ctx.fillRect(x + 1, y + 4 + bob, 4, 6 - legOff);
    // Scarf
    drawScarf(ctx, x, y - 8 + bob, scarfStripes, t);
  } else if (dir === 'up') {
    ctx.fillStyle = '#4a70a0';
    ctx.fillRect(x - 6, y - 10 + bob, 12, 14);
    ctx.fillStyle = '#ffb88c';
    ctx.fillRect(x - 4, y - 16 + bob, 8, 8);
    ctx.fillStyle = '#2a1a0a';
    ctx.fillRect(x - 5, y - 18 + bob, 10, 6);
    const legOff = frame % 2 === 0 ? 0 : 2;
    ctx.fillStyle = '#333';
    ctx.fillRect(x - 5, y + 4 + bob, 4, 6 + legOff);
    ctx.fillRect(x + 1, y + 4 + bob, 4, 6 - legOff);
    drawScarf(ctx, x, y - 8 + bob, scarfStripes, t);
  } else if (dir === 'left') {
    ctx.fillStyle = '#4a70a0';
    ctx.fillRect(x - 6, y - 10 + bob, 12, 14);
    ctx.fillStyle = '#ffb88c';
    ctx.fillRect(x - 4, y - 16 + bob, 8, 8);
    ctx.fillStyle = '#2a1a0a';
    ctx.fillRect(x + 1, y - 18 + bob, 6, 4);
    ctx.fillStyle = '#222';
    ctx.fillRect(x - 2, y - 13 + bob, 2, 2);
    const legOff = frame % 2 === 0 ? 0 : 2;
    ctx.fillStyle = '#333';
    ctx.fillRect(x - 5, y + 4 + bob, 4, 6 + legOff);
    ctx.fillRect(x + 1, y + 4 + bob, 4, 6 - legOff);
    drawScarf(ctx, x, y - 8 + bob, scarfStripes, t);
  } else {
    ctx.fillStyle = '#4a70a0';
    ctx.fillRect(x - 6, y - 10 + bob, 12, 14);
    ctx.fillStyle = '#ffb88c';
    ctx.fillRect(x - 4, y - 16 + bob, 8, 8);
    ctx.fillStyle = '#2a1a0a';
    ctx.fillRect(x - 5, y - 18 + bob, 6, 4);
    ctx.fillStyle = '#222';
    ctx.fillRect(x + 1, y - 13 + bob, 2, 2);
    const legOff = frame % 2 === 0 ? 0 : 2;
    ctx.fillStyle = '#333';
    ctx.fillRect(x - 5, y + 4 + bob, 4, 6 + legOff);
    ctx.fillRect(x + 1, y + 4 + bob, 4, 6 - legOff);
    drawScarf(ctx, x, y - 8 + bob, scarfStripes, t);
  }
}

function drawScarf(ctx: CanvasRenderingContext2D, x: number, y: number, stripes: number, t: number): void {
  const stripeW = 2;
  const totalW = 6 * stripeW;
  const startX = x - totalW / 2;
  
  for (let i = 0; i < 6; i++) {
    const alpha = i < Math.floor(stripes) ? 1 : 0.2;
    const sway = Math.sin(t * 3 + i * 0.5) * 1;
    ctx.fillStyle = RAINBOW_COLORS[i];
    ctx.globalAlpha = alpha;
    ctx.fillRect(startX + i * stripeW + sway, y, stripeW, 8);
    ctx.globalAlpha = 1;
  }
}

// === BUILDING RENDERER ===

function drawBuilding(ctx: CanvasRenderingContext2D, b: any, t: number, completed: boolean): void {
  const x = Math.floor(b.x);
  const y = Math.floor(b.y);
  const w = b.width;
  const h = b.height;

  // Building shadow
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(x + 4, y + 4, w, h);

  // Main wall
  drawGradientRect(ctx, x, y, w, h, b.bgColor1, b.bgColor2);

  // Windows
  const winCount = Math.floor(w / 32);
  for (let i = 0; i < winCount; i++) {
    const wx = x + 16 + i * 32;
    const wy = y + 20;
    ctx.fillStyle = completed ? '#ffee88' : '#cce8ff';
    ctx.fillRect(wx, wy, 14, 14);
    // Window frame
    ctx.fillStyle = '#555';
    ctx.fillRect(wx + 6, wy, 2, 14);
    ctx.fillRect(wx, wy + 6, 14, 2);
    // Window glow
    if (completed) {
      ctx.fillStyle = 'rgba(255, 238, 136, 0.15)';
      ctx.fillRect(wx - 4, wy - 4, 22, 22);
    }
  }

  // Door
  const doorX = x + w / 2 - 10;
  const doorY = y + h - 36;
  ctx.fillStyle = '#5c3a1e';
  ctx.fillRect(doorX, doorY, 20, 32);
  ctx.fillStyle = '#8b6030';
  ctx.fillRect(doorX + 2, doorY + 2, 16, 28);
  // Doorknob
  ctx.fillStyle = '#cc9900';
  ctx.fillRect(doorX + 14, doorY + 14, 3, 3);

  // Roof
  const roofH = 28;
  ctx.fillStyle = b.roofColor;
  // Triangle roof
  ctx.beginPath();
  ctx.moveTo(x - 4, y);
  ctx.lineTo(x + w / 2, y - roofH);
  ctx.lineTo(x + w + 4, y);
  ctx.closePath();
  ctx.fill();
  // Roof highlight
  ctx.fillStyle = `${b.roofColor}cc`;
  ctx.beginPath();
  ctx.moveTo(x + 4, y);
  ctx.lineTo(x + w / 2, y - roofH + 6);
  ctx.lineTo(x + w / 2, y);
  ctx.closePath();
  ctx.fill();

  // Sign above door
  const signW = w - 20;
  const signH = 14;
  const signX = x + 10;
  const signY = y - roofH - 16;
  
  ctx.fillStyle = '#fff';
  ctx.fillRect(signX, signY, signW, signH);
  ctx.fillStyle = '#333';
  ctx.fillRect(signX, signY, signW, 2);
  ctx.fillRect(signX, signY + signH - 2, signW, 2);
  
  // Emoji and text
  ctx.fillStyle = '#333';
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${b.emoji} ${b.name}`, x + w / 2, signY + 10);
  ctx.textAlign = 'left';

  // Completion badge
  if (completed) {
    ctx.fillStyle = '#4caf50';
    ctx.font = '8px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✓ COMPLETED', x + w / 2, y + h - 8);
    ctx.textAlign = 'left';
  }

  // Border
  ctx.strokeStyle = 'rgba(0,0,0,0.3)';
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, w, h);
}

// === NPC RENDERER ===

function drawNPC(ctx: CanvasRenderingContext2D, npc: any, t: number): void {
  const x = Math.floor(npc.x);
  const y = Math.floor(npc.y);
  const bob = Math.sin(t * 2 + npc.x * 0.01) * 2;

  // Body
  ctx.fillStyle = npc.color;
  ctx.fillRect(x - 5, y - 8 + bob, 10, 12);
  // Head
  ctx.fillStyle = '#ffb88c';
  ctx.fillRect(x - 3, y - 14 + bob, 6, 7);
  // Eyes
  ctx.fillStyle = '#444';
  ctx.fillRect(x - 2, y - 12 + bob, 2, 2);
  ctx.fillRect(x + 1, y - 12 + bob, 2, 2);
  // Speech bubble indicator (subtle)
  ctx.fillStyle = 'rgba(255, 255, 100, 0.15)';
  ctx.beginPath();
  ctx.arc(x, y - 20 + bob, 4, 0, Math.PI * 2);
  ctx.fill();
}

// === NOTE RENDERER ===

function drawNote(ctx: CanvasRenderingContext2D, note: any, t: number, collected: boolean): void {
  if (collected) return;
  
  const x = Math.floor(note.x);
  const y = Math.floor(note.y);
  const bob = Math.sin(t * 1.5 + note.id) * 2;

  // Rainbow edge hint
  ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
  ctx.beginPath();
  ctx.arc(x, y - 8 + bob, 12, 0, Math.PI * 2);
  ctx.fill();

  // Paper
  ctx.fillStyle = '#fffdf0';
  ctx.fillRect(x - 4, y - 12 + bob, 8, 10);
  ctx.strokeStyle = '#cc3333';
  ctx.lineWidth = 1;
  ctx.strokeRect(x - 4, y - 12 + bob, 8, 10);
  
  // Rainbow edge
  ctx.fillStyle = `hsl(${(note.id * 24 + t * 20) % 360}, 80%, 60%)`;
  ctx.fillRect(x - 4, y - 12 + bob, 2, 10);

  // Exclamation
  ctx.fillStyle = '#cc3333';
  ctx.font = 'bold 8px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('!', x, y - 16 + bob);
  ctx.textAlign = 'left';
}

// === MAIN RENDER FUNCTION ===

export function render(ctx: CanvasRenderingContext2D, t: number): void {
  const state = GAME.state;
  
  // Clear
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

  // Camera
  const targetCamX = state.playerX - VIEWPORT_WIDTH / 2;
  const targetCamY = state.playerY - VIEWPORT_HEIGHT / 2;
  state.camX += (targetCamX - state.camX) * 0.1;
  state.camY += (targetCamY - state.camY) * 0.1;

  const camX = Math.floor(state.camX);
  const camY = Math.floor(state.camY);

  ctx.save();
  ctx.translate(-camX, -camY);

  // === TILES ===
  const startTileX = Math.max(0, Math.floor(camX / TILE_SIZE) - 1);
  const startTileY = Math.max(0, Math.floor(camY / TILE_SIZE) - 1);
  const endTileX = Math.min(MAP_WIDTH, Math.ceil((camX + VIEWPORT_WIDTH) / TILE_SIZE) + 1);
  const endTileY = Math.min(MAP_HEIGHT, Math.ceil((camY + VIEWPORT_HEIGHT) / TILE_SIZE) + 1);

  for (let ty = startTileY; ty < endTileY; ty++) {
    for (let tx = startTileX; tx < endTileX; tx++) {
      const tileType = GAME.map[ty]?.[tx] ?? 0;
      const drawFn = TILE_SPRITES[tileType];
      if (drawFn) {
        drawFn(ctx, tx * TILE_SIZE, ty * TILE_SIZE, t);
      }
    }
  }

  // === BIRDS ===
  GAME.birds.forEach(bird => {
    bird.x += bird.speed * 0.016;
    bird.flapTimer += 0.016 * 8;
    if (bird.x > MAP_WIDTH * TILE_SIZE + 50) bird.x = -50;
    
    const wingY = Math.sin(bird.flapTimer) * 3;
    ctx.fillStyle = '#333';
    ctx.fillRect(Math.floor(bird.x), Math.floor(bird.y), 2, 1);
    ctx.fillRect(Math.floor(bird.x) - 2, Math.floor(bird.y) + wingY, 2, 1);
    ctx.fillRect(Math.floor(bird.x) + 2, Math.floor(bird.y) - wingY, 2, 1);
  });

  // === BUILDINGS (sorted by Y for proper overlap) ===
  const sortedBuildings = [...GAME.buildings].sort((a, b) => a.y - b.y);
  sortedBuildings.forEach(b => {
    drawBuilding(ctx, b, t, b.completed);
  });

  // === NOTES ===
  GAME.survivorNotes.forEach(note => {
    drawNote(ctx, note, t, note.collected || GAME.state.notesCollected.has(note.id));
  });

  // === NPCS ===
  GAME.npcs.forEach(npc => {
    drawNPC(ctx, npc, t);
  });

  // === PLAYER ===
  drawPlayer(ctx, state.playerX, state.playerY, state.playerDir, state.walkFrame, state.scarfStripes, t);

  ctx.restore();

  // === SKY GRADIENT (above everything) ===
  const skyGrad = ctx.createLinearGradient(0, 0, 0, VIEWPORT_HEIGHT * 0.15);
  skyGrad.addColorStop(0, `rgba(100, 180, 255, 0.15)`);
  skyGrad.addColorStop(1, `rgba(100, 180, 255, 0)`);
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT * 0.15);
}

export default { render };

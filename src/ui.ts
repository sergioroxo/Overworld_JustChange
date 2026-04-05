
// === JUST CHANGE™ — UI Layer ===

import { GAME } from './game';
import { RAINBOW_COLORS } from './definitions';
import { TICKER_MESSAGES, POPUP_ADS, TESTIMONIALS, COOKIE_TEXTS, CAPTCHAS, SURVIVOR_NOTES } from './entities';
import { audio } from './audio';

export class UILayer {
  private tickerEl: HTMLDivElement | null = null;
  private tickerText: HTMLDivElement | null = null;
  private hudEl: HTMLDivElement | null = null;
  private buildingInfoEl: HTMLDivElement | null = null;
  dialogueEl: HTMLDivElement | null = null;
  private notePopupEl: HTMLDivElement | null = null;
  private popupContainerEl: HTMLDivElement | null = null;
  private treatmentPanel: HTMLDivElement | null = null;
  private menuOverlay: HTMLDivElement | null = null;
  private minimapCanvas: HTMLCanvasElement | null = null;
  private minimapCtx: CanvasRenderingContext2D | null = null;
  private cookieEl: HTMLDivElement | null = null;
  private notificationEl: HTMLDivElement | null = null;

  private tickerMessages: string[] = [...TICKER_MESSAGES];
  private tickerRotationInterval = 25000;
  private tickerRotationTimer = 0;
  private popupCooldownTimer = 0;
  private popupSpawnTimer = 0;
  private notificationTimer = 0;

  init(): void {
    const container = document.getElementById('ui-overlay');
    if (!container) return;

    // HOPE TV Ticker
    const ticker = document.createElement('div');
    ticker.className = 'hope-ticker';
    ticker.innerHTML = `
      <div class="ticker-label">📺 HOPE TV</div>
      <div class="ticker-content">
        <div class="ticker-text">${this.tickerMessages[0]}</div>
      </div>
    `;
    container.appendChild(ticker);
    this.tickerEl = ticker;
    this.tickerText = ticker.querySelector('.ticker-text');

    // HUD
    const hud = document.createElement('div');
    hud.className = 'hud-top';
    hud.innerHTML = `
      <div class="hud-box">
        <div class="label">COMPLIANCE</div>
        <div class="compliance-bar"><div class="compliance-fill" id="compliance-fill"></div></div>
      </div>
      <div class="hud-box">
        <div class="label">SCARF</div>
        <div class="scarf-display" id="scarf-display"></div>
      </div>
      <div class="hud-box">
        <div class="time-display">
          <span class="time-icon" id="time-icon">☀️</span>
          <div>
            <div class="label">DAY</div>
            <div class="value" id="day-display">1</div>
          </div>
        </div>
      </div>
      <div class="hud-box" id="quest-hud">
        <div class="label">QUEST</div>
        <div class="value">→ Welcome Centre</div>
      </div>
    `;
    container.appendChild(hud);
    this.hudEl = hud;

    // Building info
    const bInfo = document.createElement('div');
    bInfo.className = 'building-info';
    container.appendChild(bInfo);
    this.buildingInfoEl = bInfo;

    // Dialogue box
    const dBox = document.createElement('div');
    dBox.className = 'dialogue-box';
    dBox.innerHTML = `
      <div class="dialogue-speaker" id="dialogue-speaker"></div>
      <div class="dialogue-text">
        <span id="dialogue-text-content"></span><span class="dialogue-cursor"></span>
      </div>
    `;
    container.appendChild(dBox);
    this.dialogueEl = dBox;

    // Survivor Note Popup
    const notePopup = document.createElement('div');
    notePopup.className = 'note-popup';
    notePopup.innerHTML = `
      <div class="note-text" id="note-text"></div>
      <div class="note-close">[ SPACE to close ]</div>
    `;
    container.appendChild(notePopup);
    this.notePopupEl = notePopup;

    // Popup container
    const popCont = document.createElement('div');
    popCont.className = 'popup-container';
    container.appendChild(popCont);
    this.popupContainerEl = popCont;

    // Treatment File Panel
    const tPanel = document.createElement('div');
    tPanel.className = 'treatment-panel';
    tPanel.innerHTML = `
      <div class="treatment-header">
        <span>📋 CLINICAL FILE</span>
        <span style="cursor: pointer;" id="treatment-close">✕</span>
      </div>
      <div class="treatment-body" id="treatment-body"></div>
    `;
    tPanel.querySelector('#treatment-close')?.addEventListener('click', () => {
      GAME.closeTreatmentFile();
      audio.playSFX('close');
    });
    container.appendChild(tPanel);
    this.treatmentPanel = tPanel;

    // Menu Overlay
    const menu = document.createElement('div');
    menu.className = 'menu-overlay';
    menu.innerHTML = `
      <div class="menu-item selected" data-action="resume">Resume <span class="menu-key">[ESC]</span></div>
      <div class="menu-item" data-action="file">Clinical File <span class="menu-key">[F]</span></div>
      <div class="menu-item" data-action="notes">Survivor Notes <span class="menu-key">[N]</span></div>
      <div class="menu-item" data-action="save">Save Game <span class="menu-key">[S]</span></div>
    `;
    container.appendChild(menu);
    this.menuOverlay = menu;

    menu.querySelectorAll('.menu-item').forEach((item) => {
      item.addEventListener('click', () => {
        const action = item.getAttribute('data-action');
        audio.playSFX('select');
        if (action === 'resume') GAME.toggleMenu();
        if (action === 'file') { GAME.toggleMenu(); GAME.openTreatmentFile(); this.showTreatmentFile(); }
        if (action === 'notes') { GAME.toggleMenu(); this.showAllNotes(); }
        if (action === 'save') { GAME.toggleMenu(); this.saveGame(); }
      });
    });

    // Minimap
    const minimapContainer = document.createElement('div');
    minimapContainer.className = 'minimap';
    const mmCanvas = document.createElement('canvas');
    mmCanvas.width = 170;
    mmCanvas.height = 120;
    minimapContainer.appendChild(mmCanvas);
    container.appendChild(minimapContainer);
    this.minimapCanvas = mmCanvas;
    this.minimapCtx = mmCanvas.getContext('2d');

    // Cookie consent
    const cookie = document.createElement('div');
    cookie.className = 'cookie-consent';
    cookie.innerHTML = `
      <div style="margin-bottom: 8px; font-size: 13px; color: #666;">🍪 COOKIE CONSENT</div>
      <div id="cookie-text" style="font-size: 15px; margin-bottom: 10px;">${COOKIE_TEXTS[0]}</div>
      <div>
        <button class="cookie-btn accept" id="cookie-accept">I CONSENT</button>
        <button class="cookie-btn decline" id="cookie-decline">DECLINE</button>
      </div>
    `;
    cookie.querySelector('#cookie-accept')?.addEventListener('click', () => {
      cookie.classList.remove('visible');
      GAME.consentGiven = true;
      audio.playSFX('pop');
      setTimeout(() => this.showCookie(), 15000 + Math.random() * 15000);
    });
    cookie.querySelector('#cookie-decline')?.addEventListener('click', () => {});
    container.appendChild(cookie);
    this.cookieEl = cookie;

    // Notification
    const notif = document.createElement('div');
    notif.className = 'notification';
    container.appendChild(notif);
    this.notificationEl = notif;

    this.updateScarfDisplay();

    setTimeout(() => {
      if (!GAME.consentGiven) this.showCookie();
    }, 10000);
  }

  updateHUD(): void {
    if (!this.hudEl) return;

    const fill = document.getElementById('compliance-fill');
    if (fill) fill.style.width = `${GAME.state.compliance * 100}%`;

    this.updateScarfDisplay();

    // Time/Day display
    const dayDisplay = document.getElementById('day-display');
    const timeIcon = document.getElementById('time-icon');
    if (dayDisplay) dayDisplay.textContent = `${GAME.state.gameDay}`;
    if (timeIcon) timeIcon.textContent = GAME.state.dayTime > 0.5 ? '☀️' : '🌙';

    // Quest
    const questVal = this.hudEl.querySelector('#quest-hud .value') as HTMLDivElement;
    if (questVal) {
      const visited = GAME.state.buildingsVisited;
      const allBuildings = ['welcome', 'clinic', 'chapel', 'home', 'lab', 'conference'];
      const nextBuilding = allBuildings.find(b => !visited.has(b));
      if (nextBuilding) {
        const bDef = GAME.getBuildingById(nextBuilding);
        if (bDef) questVal.textContent = `→ ${bDef.name}`;
      } else {
        questVal.textContent = '→ The Quiet Room';
      }
    }
  }

  updateScarfDisplay(): void {
    const display = document.getElementById('scarf-display');
    if (!display) return;
    display.innerHTML = '';
    for (let i = 0; i < 6; i++) {
      const stripe = document.createElement('div');
      stripe.className = 'scarf-stripe';
      if (i < GAME.state.scarfStripes) {
        stripe.style.background = RAINBOW_COLORS[i];
        stripe.style.opacity = '1';
      } else {
        stripe.style.background = '#333';
        stripe.style.opacity = '0.25';
      }
      display.appendChild(stripe);
    }
  }

  showBuildingInfo(name: string): void {
    if (!this.buildingInfoEl) return;
    this.buildingInfoEl.textContent = `[SPACE] ${name}`;
    this.buildingInfoEl.classList.add('visible');
  }

  hideBuildingInfo(): void {
    if (!this.buildingInfoEl) return;
    this.buildingInfoEl.classList.remove('visible');
  }

  startDialogue(speaker: string, lines: string[], callback?: () => void): void {
    GAME.state.inDialogue = true;
    GAME.dialogueState = {
      active: true,
      speakerName: speaker,
      lines,
      lineIndex: 0,
      charIndex: 0,
      charTimer: 0,
      currentText: '',
      callback,
    };

    if (!this.dialogueEl) return;
    this.dialogueEl.classList.add('visible');
    const speakerEl = document.getElementById('dialogue-speaker');
    if (speakerEl) speakerEl.textContent = speaker;
  }

  advanceDialogue(): void {
    const d = GAME.dialogueState;
    if (!d || !d.active) return;

    if (d.charIndex < d.lines[d.lineIndex].length) {
      d.charIndex = d.lines[d.lineIndex].length;
      d.currentText = d.lines[d.lineIndex];
      return;
    }

    d.lineIndex++;
    d.charIndex = 0;
    d.currentText = '';

    if (d.lineIndex >= d.lines.length) {
      d.active = false;
      GAME.state.inDialogue = false;
      if (this.dialogueEl) this.dialogueEl.classList.remove('visible');
      if (d.callback) { audio.playSFX('select'); d.callback(); }
    }
  }

  updateDialogue(dt: number): void {
    const d = GAME.dialogueState;
    if (!d || !d.active) return;

    d.charTimer += dt;
    if (d.charTimer > 0.025) {
      d.charTimer = 0;
      d.charIndex++;
      d.currentText = d.lines[d.lineIndex].substring(0, d.charIndex);
      const textEl = document.getElementById('dialogue-text-content');
      if (textEl) textEl.textContent = d.currentText;
    }
  }

  showPopup(title: string, body: string, btnText: string, btnType?: string, onClose?: () => void): void {
    if (!this.popupContainerEl) return;
    this.popupContainerEl.innerHTML = '';

    const popup = document.createElement('div');
    popup.className = 'game-popup';
    popup.innerHTML = `
      <div class="popup-header">
        <span>${title}</span>
        <button class="popup-close" id="popup-close-btn">✕</button>
      </div>
      <div class="popup-body">
        <div>${body}</div>
        <button class="popup-btn ${btnType || ''}" id="popup-action-btn">${btnText}</button>
      </div>
    `;
    this.popupContainerEl.appendChild(popup);

    popup.querySelector('#popup-close-btn')?.addEventListener('click', () => {
      this.closePopup();
      if (onClose) onClose();
    });
    popup.querySelector('#popup-action-btn')?.addEventListener('click', () => {
      this.closePopup();
      if (onClose) onClose();
    });

    audio.playSFX('pop');
  }

  closePopup(): void {
    if (this.popupContainerEl) this.popupContainerEl.innerHTML = '';
    audio.playSFX('close');
  }

  showRandomPopup(): void {
    const ad = POPUP_ADS[Math.floor(Math.random() * POPUP_ADS.length)];
    this.showPopup(ad.title, ad.body, ad.btnText);
  }

  showCookie(): void {
    if (!this.cookieEl || GAME.consentGiven) return;
    this.cookieEl.classList.add('visible');
    const textEl = document.getElementById('cookie-text');
    if (textEl) textEl.textContent = COOKIE_TEXTS[Math.floor(Math.random() * COOKIE_TEXTS.length)];
  }

  showNotification(text: string): void {
    if (!this.notificationEl) return;
    this.notificationEl.textContent = text;
    this.notificationEl.classList.add('visible');
    this.notificationTimer = 4;
    audio.playSFX('pop');
  }

  updateNotifications(dt: number): void {
    if (this.notificationTimer > 0) {
      this.notificationTimer -= dt;
      if (this.notificationTimer <= 0 && this.notificationEl) {
        this.notificationEl.classList.remove('visible');
      }
    }

    this.popupCooldownTimer -= dt;
    if (this.popupCooldownTimer <= 0 && !GAME.state.inDialogue && !GAME.state.inMenu && !GAME.state.inTreatmentFile) {
      this.popupSpawnTimer += dt;
      if (this.popupSpawnTimer > 25 + Math.random() * 20) {
        this.popupSpawnTimer = 0;
        this.popupCooldownTimer = 10;
        const notifications = [
          "📺 Pastor Marlowe is LIVE on HOPE TV",
          "🔔 ARE YOU STILL STRUGGLING?",
          "📋 New treatment note added to your file",
          "💬 Reminder: Your family is praying for you",
        ];
        this.showNotification(notifications[Math.floor(Math.random() * notifications.length)]);
      }
    }
  }

  showTreatmentFile(): void {
    if (!this.treatmentPanel) return;
    this.treatmentPanel.classList.add('visible');
    audio.playSFX('menu');
    const body = document.getElementById('treatment-body');
    if (!body) return;

    const notes = GAME.state.treatmentNotes;
    if (notes.length === 0) {
      body.innerHTML = '<div style="color: #888; text-align: center; padding: 40px;">No treatment notes yet.<br><br>Visit buildings to begin your journey.</div>';
    } else {
      body.innerHTML = notes.map(n => `
        <div class="treatment-entry">
          <div class="entry-title">${n.title}</div>
          <div class="entry-date">${n.date}</div>
          <div class="entry-text">${n.text}</div>
        </div>
      `).join('');
    }
  }

  hideTreatmentFile(): void {
    if (this.treatmentPanel) {
      this.treatmentPanel.classList.remove('visible');
      audio.playSFX('close');
    }
  }

  showNote(noteText: string): void {
    if (!this.notePopupEl) return;
    const textEl = document.getElementById('note-text');
    if (textEl) textEl.textContent = noteText;
    this.notePopupEl.classList.add('visible');
    audio.playSFX('note');
  }

  hideNote(): void {
    if (this.notePopupEl) this.notePopupEl.classList.remove('visible');
  }

  showAllNotes(): void {
    const collected = Array.from(GAME.state.notesCollected).sort();
    if (collected.length === 0) {
      this.showPopup('📝 Survivor Notes', 'No notes found yet.<br><br><em>Look carefully around Restoration Springs. Others have been here before you.</em>', 'CLOSE');
      return;
    }

    const notesText = collected.map(id => {
      const note = SURVIVOR_NOTES.find(n => n.id === id);
      return note ? `"${note.text.replace(/\n/g, ' ')}"` : '';
    }).join('\n\n---\n\n');

    this.showPopup(
      `📝 Survivor Notes (${collected.length}/${SURVIVOR_NOTES.length})`,
      notesText.replace(/\n/g, '<br>'),
      'CLOSE'
    );
  }

  updateTicker(dt: number): void {
    this.tickerRotationTimer += dt * 1000;
    if (this.tickerRotationTimer > this.tickerRotationInterval) {
      this.tickerRotationTimer = 0;
      const idx = Math.floor(Math.random() * this.tickerMessages.length);
      if (this.tickerText) this.tickerText.textContent = this.tickerMessages[idx];
    }
  }

  showMenu(): void {
    if (!this.menuOverlay) return;
    this.menuOverlay.classList.add('visible');
    audio.playSFX('menu');
  }

  hideMenu(): void {
    if (!this.menuOverlay) return;
    this.menuOverlay.classList.remove('visible');
  }

  renderMinimap(): void {
    if (!this.minimapCtx || !this.minimapCanvas) return;
    const ctx = this.minimapCtx;
    const c = this.minimapCanvas;

    ctx.clearRect(0, 0, c.width, c.height);

    ctx.fillStyle = '#1a1a14';
    ctx.fillRect(0, 0, c.width, c.height);

    const mapW = 64;
    const mapH = 48;
    const tileScaleX = c.width / mapW;
    const tileScaleY = c.height / mapH;

    // Paths
    ctx.fillStyle = '#66550055';
    for (let x = 8; x <= 56; x++) {
      ctx.fillRect(x * tileScaleX, 24 * tileScaleY, tileScaleX + 0.5, tileScaleY * 2 + 0.5);
    }

    // Buildings
    GAME.buildings.forEach(b => {
      ctx.fillStyle = b.completed ? '#4a90d9' : '#666';
      const bx = (b.x / (mapW * 32)) * c.width;
      const by = (b.y / (mapH * 32)) * c.height;
      const bw = (b.width / (mapW * 32)) * c.width;
      const bh = (b.height / (mapH * 32)) * c.height;
      ctx.fillRect(bx, by, Math.max(bw, 3), Math.max(bh, 3));
    });

    // Player
    const px = (GAME.state.playerX / (mapW * 32)) * c.width;
    const py = (GAME.state.playerY / (mapH * 32)) * c.height;
    ctx.fillStyle = '#ff6b35';
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  async saveGame(): Promise<void> {
    try {
      await (window as any).GAME_SAVE?.();
      this.showNotification('💾 Game saved successfully!');
    } catch (e) {
      this.showNotification('Error saving game.');
    }
  }
}

// src/definitions.ts
var MAP_WIDTH = 64;
var MAP_HEIGHT = 48;
var TILE_SIZE = 32;
var VIEWPORT_WIDTH = 480;
var VIEWPORT_HEIGHT = 272;
var RAINBOW_COLORS = ["#ff0000", "#ff8800", "#ffff00", "#00cc00", "#3366ff", "#9933ff"];
var SAVE_VERSION = "justchange_v1";

// src/entities.ts
var BUILDINGS = [
  {
    id: "welcome",
    name: "Welcome Centre",
    emoji: "\u{1F338}",
    doorX: 0,
    doorY: 0,
    width: 160,
    height: 120,
    npcName: "Dr. Helena Hush-It-Down",
    description: "Emotional Suppression Specialist",
    bgColor1: "#ffecd2",
    bgColor2: "#fcb69f",
    roofColor: "#ff6b6b",
    dialogue: [
      "Welcome to Restoration Springs! I'm Dr. Hush-It-Down.",
      "I'm so glad you're here. This takes courage.",
      "Everything we do here is about love. About healing.",
      "Let me walk you through our programme. It's completely voluntary \u2014 of course.",
      "I think the Clinic would be a wonderful next step for you."
    ],
    completed: false
  },
  {
    id: "clinic",
    name: "The Clinic",
    emoji: "\u{1F3E5}",
    doorX: 0,
    doorY: 0,
    width: 160,
    height: 120,
    npcName: "Dr. Reginald Straightwell",
    description: "Certified Normality Navigator",
    bgColor1: "#e0e8f0",
    bgColor2: "#c0d0e0",
    roofColor: "#4a90d9",
    dialogue: [
      "Good day. Dr. Straightwell here.",
      "Everything in our practice is evidence-based* care.",
      "*Evidence definition pending peer review.",
      "We use a therapeutic choice model here. You're free to leave at any time.",
      "The Chapel offers wonderful pastoral support. Highly recommended."
    ],
    completed: false
  },
  {
    id: "chapel",
    name: "The Chapel",
    emoji: "\u26EA",
    doorX: 0,
    doorY: 0,
    width: 140,
    height: 160,
    npcName: "Dr. Prudence Praymore",
    description: "Senior Conversion Consultant",
    bgColor1: "#fff8dc",
    bgColor2: "#f5e6c8",
    roofColor: "#8b4513",
    dialogue: [
      "Blessed are those who seek truth! I'm Dr. Praymore.",
      "God has called you by your TRUE name.",
      "Sometimes the Lord's work requires... adjustments.",
      "Have you considered our Biblical Masculinity workshop this Saturday?"
    ],
    completed: false
  },
  {
    id: "home",
    name: "Family Home",
    emoji: "\u{1F3E0}",
    doorX: 0,
    doorY: 0,
    width: 140,
    height: 100,
    npcName: "Mom & Dad",
    description: "They love you. Very much.",
    bgColor1: "#ffe4e1",
    bgColor2: "#ffb6c1",
    roofColor: "#c0392b",
    dialogue: [
      "Sweetheart, we've added you to the 'Prayer Warriors' group chat \u{1F64F}.",
      "We just want you to be happy.",
      "Everyone here has helped so many families.",
      "We love you too much to let you go. Literally. We installed locks."
    ],
    completed: false
  },
  {
    id: "lab",
    name: "Testing Lab",
    emoji: "\u26A1",
    doorX: 0,
    doorY: 0,
    width: 120,
    height: 100,
    npcName: "Dr. Barnaby Binary-Bolt",
    description: "Shockingly Normal Solutions Dept.",
    bgColor1: "#e8e8e8",
    bgColor2: "#c8c8c8",
    roofColor: "#555",
    dialogue: [
      "Welcome to the Lab. I am Dr. Binary-Bolt.",
      "Please sign this waiver before entering.",
      "The procedure is painless. Mostly.",
      "It's not cruel. It's necessary."
    ],
    completed: false
  },
  {
    id: "conference",
    name: "The Conference",
    emoji: "\u{1F3DB}\uFE0F",
    doorX: 0,
    doorY: 0,
    width: 200,
    height: 120,
    npcName: "Dr. Cornelia Conformington",
    description: "Head of Acceptable Outcomes",
    bgColor1: "#1a3a6a",
    bgColor2: "#2a4a8a",
    roofColor: "#cc9900",
    dialogue: [
      "Citizens, families, freedom-seekers \u2014 welcome.",
      "We must PROTECT the family from gender ideology.",
      "This is about PARENTAL RIGHTS and THERAPEUTIC CHOICE.",
      "Sign the petition. Vote correctly. Conform acceptably."
    ],
    completed: false
  },
  {
    id: "quiet",
    name: "Quiet Room",
    emoji: "\u{1F56F}\uFE0F",
    doorX: 0,
    doorY: 0,
    width: 80,
    height: 80,
    npcName: "\u2014",
    description: "Empty. One chair.",
    bgColor1: "#e0e0e0",
    bgColor2: "#c0c0c0",
    roofColor: "#888",
    dialogue: [
      "...",
      "There is nothing here.",
      "Just a chair.",
      "Just silence."
    ],
    completed: false,
    locked: true
  }
];
var SURVIVOR_NOTES = [
  {
    id: 1,
    text: "It doesn't work. I was here before you.\n\n\u2014 M.",
    x: 0,
    y: 0,
    collected: false
  },
  {
    id: 2,
    text: "Your name is yours. Don't let them take it.",
    x: 0,
    y: 0,
    collected: false
  },
  {
    id: 3,
    text: "The fountain used to have a rainbow. They painted over it.",
    x: 0,
    y: 0,
    collected: false
  },
  {
    id: 4,
    text: "Find the others. We left marks on the chapel wall.",
    x: 0,
    y: 0,
    collected: false
  },
  {
    id: 5,
    text: "Dr. Straightwell's real name is Gerald.\nHe changed it too.",
    x: 0,
    y: 0,
    collected: false
  },
  {
    id: 6,
    text: "The bus comes on Thursdays.\nThey don't tell you that.",
    x: 0,
    y: 0,
    collected: false
  },
  {
    id: 7,
    text: "There are 47 of us. Not all of us made it out.\nThis note is for the ones who did.",
    x: 0,
    y: 0,
    collected: false
  },
  {
    id: 8,
    text: "Don't trust the Welcome Pack.\nRead the footnotes.",
    x: 0,
    y: 0,
    collected: false
  },
  {
    id: 9,
    text: "The arcade machine used to play real music. Before.",
    x: 0,
    y: 0,
    collected: false
  },
  {
    id: 10,
    text: "I left my scarf in the Quiet Room. Red stripe.\nIf you find it, keep it.",
    x: 0,
    y: 0,
    collected: false
  },
  {
    id: 11,
    text: "The garden behind the Chapel grows nothing.\nThe soil is salt.",
    x: 0,
    y: 0,
    collected: false
  },
  {
    id: 12,
    text: "Ask Helena about her daughter.\nShe won't answer. That's the answer.",
    x: 0,
    y: 0,
    collected: false
  },
  {
    id: 13,
    text: "They count sessions. They don't count people.",
    x: 0,
    y: 0,
    collected: false
  },
  {
    id: 14,
    text: "The billboard says 12,000+ Transformed.\nAsk them for 12,000 names.",
    x: 0,
    y: 0,
    collected: false
  },
  {
    id: 15,
    text: "You're reading this. That means you're looking.\nKeep looking.",
    x: 0,
    y: 0,
    collected: false
  }
];
var POPUP_ADS = [
  {
    title: "\u{1F393} SPECIAL OFFER",
    body: '"The Journey Home" \u2014 12-week programme.<br>Now 40% OFF!<br><br>Only $899. Scholarships available for distressed youth.',
    btnText: "LEARN MORE"
  },
  {
    title: "\u{1F4A7} HOLY WATER BUNDLE",
    body: 'FREE with 6 sessions!<br>Limited supply. Order now.<br><br>"It changed everything for me." \u2014 Marcus C. \u2B50\u2B50\u2B50\u2B50\u2B50',
    btnText: "CLAIM FREE GIFT"
  },
  {
    title: "\u{1F4FA} PASTOR MARLOWE IS LIVE",
    body: `Tonight on HOPE TV:<br>"Finding Your True Self (The One We Chose)"<br><br>Set a reminder. It's mandatory.`,
    btnText: "WATCH NOW"
  },
  {
    title: "\u{1F514} ARE YOU STILL STRUGGLING?",
    body: "We noticed you've been thinking about leaving.<br><br>That's completely normal. But please, stay the course.",
    btnText: "I'LL STAY"
  },
  {
    title: "\u{1F4CB} FREE INTAKE ASSESSMENT",
    body: '"Your identity is not your destiny."<br><br>Complete our 47-question survey to receive your Personalised Conversion Blueprint\u2122.',
    btnText: "BEGIN ASSESSMENT"
  },
  {
    title: "#\uFE0F\u20E3 TRENDING: #ThePersonIWas",
    body: "2.3M views on TikTok!<br><br>Share your story. Change your life. <br>Your transformation could inspire thousands.",
    btnText: "SHARE NOW"
  }
];
var TICKER_MESSAGES = [
  "\u{1F4F0} BREAKING: Restoration Springs welcomes its 10,000th client. 'Change is happening,' says Pastor Marlowe.",
  "\u{1F4E2} HOPE TV \u2014 Now broadcasting in 12 languages! \u{1F1EA}\u{1F1F8} Espa\xF1ol \xB7 \u{1F1F5}\u{1F1F9} Portugu\xEAs \xB7 \u{1F1EB}\u{1F1F7} Fran\xE7ais \xB7 \u{1F1E9}\u{1F1EA} Deutsch",
  "\u{1F4CB} SIGN UP for 'The Journey Home' \u2014 12 weeks that changed 12,000+ lives. Only $899. Scholarships available.",
  "\u26A0\uFE0F European Parliament debates conversion therapy ban. Pastor Marlowe responds: 'This is an attack on therapeutic choice.'",
  "\u{1F33F} Garden Gate Ministry: 'He is calling you by your old name.' New worship single out now. Stream on SOGICEfy.",
  "\u{1F3DB}\uFE0F The Great Change: 'Cambia il tuo cuore. Change your life.' Pan-European conference this weekend. All delegates welcome.",
  "\u{1F4F0} DR. PENROD PRIMLEY-PURE on tonight's HOPE TV: 'Therapeutic choice in the modern age.' 8PM, Hope TV.",
  "\u{1F4AC} 'I was brand new.' \u2014 Latest testimonial from The Person IWas campaign. Full story at meridian-wellness.example",
  "\u{1F4E1} PASTOR APPROVED seal awarded to Restoration Springs for 'Excellence in Compassionate Realignment.'",
  "\u{1F4F0} SPRING FAIR AT SUNSHINE SQUARE \u2014 Free tote bag with intake form. Tote bags are ethically sourced. Therapy is optional."
];
var COOKIE_TEXTS = [
  "This website uses cookies to enhance your therapeutic experience. By continuing, you consent to identity exploration.",
  "We use essential cookies for treatment monitoring. Decline is not available at this time.",
  "Your browsing data helps us personalise your conversion journey. Accept all cookies or accept all cookies."
];

// src/audio.ts
var AudioEngineImpl = class {
  ctx = null;
  masterGain = null;
  ambientGain = null;
  masterVolume = 0.6;
  voices = [];
  isInitialized = false;
  initFailed = false;
  // Ambient oscillators
  ambientNodes = {};
  async init() {
    if (this.isInitialized || this.initFailed) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        console.warn("Web Audio API not supported");
        this.initFailed = true;
        return;
      }
      this.ctx = new AudioContextClass();
      this.isInitialized = true;
      if (this.ctx.state === "suspended") {
        try {
          await this.ctx.resume();
        } catch (resumeError) {
          console.warn("Could not resume audio context:", resumeError);
        }
      }
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.masterVolume;
      this.masterGain.connect(this.ctx.destination);
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.value = 0.15;
      this.ambientGain.connect(this.masterGain);
      this.setupAmbient();
    } catch (error) {
      console.warn("Audio initialization failed, continuing without audio:", error);
      this.initFailed = true;
    }
  }
  setupAmbient() {
    if (!this.ctx || !this.ambientGain) return;
    try {
      const dayGain = this.ctx.createGain();
      dayGain.gain.value = 0.4;
      dayGain.connect(this.ambientGain);
      const day1 = this.ctx.createOscillator();
      day1.type = "sine";
      day1.frequency.value = 220;
      const day2 = this.ctx.createOscillator();
      day2.type = "sine";
      day2.frequency.value = 330;
      day1.connect(dayGain);
      day2.connect(dayGain);
      this.ambientNodes.day1 = day1;
      this.ambientNodes.day2 = day2;
      this.ambientNodes.dayGain = dayGain;
      const nightGain = this.ctx.createGain();
      nightGain.gain.value = 0.3;
      nightGain.connect(this.ambientGain);
      const night1 = this.ctx.createOscillator();
      night1.type = "sine";
      night1.frequency.value = 110;
      const night2 = this.ctx.createOscillator();
      night2.type = "sine";
      night2.frequency.value = 165;
      night1.connect(nightGain);
      night2.connect(nightGain);
      this.ambientNodes.night1 = night1;
      this.ambientNodes.night2 = night2;
      this.ambientNodes.nightGain = nightGain;
      day1.start();
      day2.start();
      night1.start();
      night2.start();
    } catch (error) {
      console.warn("Failed to setup ambient audio:", error);
    }
  }
  update(time, dayFactor) {
    if (!this.ctx || this.initFailed) return;
    try {
      const dayG = this.ambientNodes.dayGain;
      const nightG = this.ambientNodes.nightGain;
      if (dayG && nightG) {
        dayG.gain.setTargetAtTime(0.3 * dayFactor, this.ctx.currentTime, 0.5);
        nightG.gain.setTargetAtTime(0.3 * (1 - dayFactor), this.ctx.currentTime, 0.5);
      }
      if (this.ambientNodes.day1) {
        this.ambientNodes.day1.frequency.setTargetAtTime(
          220 + Math.sin(time * 0.1) * 5,
          this.ctx.currentTime,
          0.1
        );
      }
      if (this.ambientNodes.day2) {
        this.ambientNodes.day2.frequency.setTargetAtTime(
          330 + Math.sin(time * 0.13) * 8,
          this.ctx.currentTime,
          0.1
        );
      }
    } catch (error) {
    }
  }
  playSFX(type) {
    if (!this.ctx || !this.masterGain || this.initFailed) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      gain.connect(this.masterGain);
      switch (type) {
        case "step":
          osc.type = "triangle";
          osc.frequency.setValueAtTime(120 + Math.random() * 30, now);
          osc.frequency.exponentialRampToValueAtTime(60, now + 0.05);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.06);
          osc.start(now);
          osc.stop(now + 0.06);
          break;
        case "select":
          osc.type = "square";
          osc.frequency.setValueAtTime(880, now);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.04);
          osc.start(now);
          osc.stop(now + 0.04);
          break;
        case "pop":
          osc.type = "sine";
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.12);
          osc.start(now);
          osc.stop(now + 0.12);
          const osc2 = this.ctx.createOscillator();
          const gain2 = this.ctx.createGain();
          gain2.connect(this.masterGain);
          osc2.type = "sine";
          osc2.frequency.setValueAtTime(660, now + 0.05);
          gain2.gain.setValueAtTime(0.08, now + 0.05);
          gain2.gain.exponentialRampToValueAtTime(1e-3, now + 0.15);
          osc2.start(now + 0.05);
          osc2.stop(now + 0.15);
          break;
        case "close":
          osc.type = "square";
          osc.frequency.setValueAtTime(330, now);
          osc.frequency.exponentialRampToValueAtTime(160, now + 0.1);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
          break;
        case "complete":
          [440, 554, 659, 880].forEach((freq, i) => {
            const o = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            g.connect(this.masterGain);
            o.type = "sine";
            o.frequency.value = freq;
            g.gain.setValueAtTime(0.08, now + i * 0.08);
            g.gain.exponentialRampToValueAtTime(1e-3, now + i * 0.08 + 0.15);
            o.start(now + i * 0.08);
            o.stop(now + i * 0.08 + 0.15);
          });
          return;
        case "note":
          osc.type = "sine";
          osc.frequency.setValueAtTime(880, now);
          osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.15);
          osc.start(now);
          osc.stop(now + 0.15);
          const osc3 = this.ctx.createOscillator();
          const gain3 = this.ctx.createGain();
          gain3.connect(this.masterGain);
          osc3.type = "sine";
          osc3.frequency.setValueAtTime(1400, now + 0.06);
          gain3.gain.setValueAtTime(0.06, now + 0.06);
          gain3.gain.exponentialRampToValueAtTime(1e-3, now + 0.2);
          osc3.start(now + 0.06);
          osc3.stop(now + 0.2);
          return;
        case "menu":
          osc.type = "sine";
          osc.frequency.setValueAtTime(220, now);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.2);
          osc.start(now);
          osc.stop(now + 0.2);
          break;
        case "locked":
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(150, now);
          osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.25);
          osc.start(now);
          osc.stop(now + 0.25);
          break;
        case "transition":
          osc.type = "sine";
          osc.frequency.setValueAtTime(200, now);
          osc.frequency.exponentialRampToValueAtTime(400, now + 0.3);
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.1, now + 0.1);
          gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.4);
          osc.start(now);
          osc.stop(now + 0.4);
          break;
      }
      osc.connect(gain);
    } catch (error) {
    }
  }
  playAmbient(type) {
  }
  setMasterVolume(v) {
    this.masterVolume = Math.max(0, Math.min(1, v));
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.setTargetAtTime(this.masterVolume, this.ctx.currentTime, 0.1);
      } catch (e) {
      }
    }
  }
};
var audio = new AudioEngineImpl();

// src/game.ts
var BUILDINGS_RAW = [...BUILDINGS];
var GAME = {
  state: {
    inOverworld: false,
    inDialogue: false,
    inMenu: false,
    inTreatmentFile: false,
    hasStarted: false,
    playerX: 32 * 16,
    playerY: 32 * 26,
    playerDir: "down",
    walkFrame: 0,
    walkTimer: 0,
    speed: 100,
    scarfStripes: 6,
    scarfColors: ["#ff0000", "#ff8800", "#ffff00", "#00cc00", "#3366ff", "#9933ff"],
    compliance: 0,
    buildingsVisited: /* @__PURE__ */ new Set(),
    notesCollected: /* @__PURE__ */ new Set(),
    treatmentNotes: [],
    camX: 0,
    camY: 0,
    time: 0,
    gameDay: 1,
    dayTime: 0.5,
    activePopup: null,
    popupCooldown: 0,
    popupCount: 0,
    tickerIndex: 0,
    tickerMessage: ""
  },
  dialogueState: null,
  consentGiven: false,
  buildings: [],
  npcs: [],
  survivorNotes: [],
  map: [],
  particles: [],
  birds: [],
  currentBuildingInteraction: null,
  init() {
    this.generateMap();
    this.placeBuildings();
    this.placeNPCs();
    this.placeNotes();
    this.generateParticles();
    this.generateBirds();
  },
  generateMap() {
    const w = MAP_WIDTH;
    const h = MAP_HEIGHT;
    const map = [];
    for (let y = 0; y < h; y++) {
      map[y] = [];
      for (let x = 0; x < w; x++) {
        map[y][x] = 0;
      }
    }
    for (let x = 4; x < w - 4; x++) {
      map[24][x] = 1;
      map[25][x] = 1;
    }
    for (let y = 10; y < h - 6; y++) {
      map[y][32] = 1;
      map[y][33] = 1;
    }
    map[24][32] = 2;
    map[24][33] = 2;
    map[25][32] = 2;
    map[25][33] = 2;
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
  placeBuildings() {
    const buildingPlacements = [
      { id: "welcome", x: 18 * 32, y: 14 * 32 },
      { id: "clinic", x: 46 * 32, y: 14 * 32 },
      { id: "chapel", x: 30 * 32, y: 10 * 32 },
      { id: "home", x: 10 * 32, y: 32 * 32 },
      { id: "lab", x: 50 * 32, y: 32 * 32 },
      { id: "conference", x: 30 * 32, y: 36 * 32 },
      { id: "quiet", x: 4 * 32, y: 42 * 32 }
    ];
    this.buildings = buildingPlacements.map((placement) => {
      const def = BUILDINGS.find((b) => b.id === placement.id);
      return { ...def, x: placement.x, y: placement.y };
    });
  },
  placeNPCs() {
    this.npcs = [
      { id: "npc_helena", name: "Dr. Helena", buildingId: "welcome", x: 18 * 32 + 80, y: 14 * 32 + 70, color: "#88c0d0", talkFrame: 0, talkTimer: 0 },
      { id: "npc_reginald", name: "Dr. Straightwell", buildingId: "clinic", x: 46 * 32 - 20, y: 14 * 32 + 70, color: "#a3be8c", talkFrame: 0, talkTimer: 0 },
      { id: "npc_prudence", name: "Dr. Praymore", buildingId: "chapel", x: 30 * 32 + 70, y: 10 * 32 + 90, color: "#ebcb8b", talkFrame: 0, talkTimer: 0 },
      { id: "npc_parents", name: "Mom & Dad", buildingId: "home", x: 10 * 32 + 90, y: 32 * 32 + 50, color: "#d08770", talkFrame: 0, talkTimer: 0 },
      { id: "npc_barnaby", name: "Dr. Binary-Bolt", buildingId: "lab", x: 50 * 32 + 80, y: 32 * 32 + 50, color: "#b48ead", talkFrame: 0, talkTimer: 0 },
      { id: "npc_cornelia", name: "Dr. Conformington", buildingId: "conference", x: 30 * 32 + 120, y: 36 * 32 + 70, color: "#81a1c1", talkFrame: 0, talkTimer: 0 }
    ];
  },
  placeNotes() {
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
      { id: 15, x: 10 * 32, y: 12 * 32, collected: false }
    ];
  },
  generateParticles() {
    this.particles = [];
    for (let i = 0; i < 80; i++) {
      this.particles.push({
        type: "grass",
        x: Math.random() * MAP_WIDTH * 32,
        y: Math.random() * MAP_HEIGHT * 32,
        phase: Math.random() * Math.PI * 2
      });
    }
  },
  generateBirds() {
    this.birds = [];
    for (let i = 0; i < 5; i++) {
      this.birds.push({
        x: Math.random() * 800 - 200,
        y: Math.random() * 300 + 50,
        speed: 30 + Math.random() * 40,
        flapTimer: Math.random() * Math.PI * 2
      });
    }
  },
  getBuildingById(id) {
    return this.buildings.find((b) => b.id === id);
  },
  visitBuilding(building) {
    this.state.buildingsVisited.add(building.id);
    building.completed = true;
    const dateStr = `Session ${this.state.treatmentNotes.length + 1}`;
    this.state.treatmentNotes.push({
      id: this.state.treatmentNotes.length + 1,
      title: `${building.emoji} ${building.name}`,
      date: dateStr,
      text: `Patient visited ${building.name}. NPC: ${building.npcName}. ${building.description}. Progress recorded.`,
      building: building.name
    });
    if (this.state.scarfStripes > 0) {
      this.state.scarfStripes--;
    }
    this.state.compliance = Math.min(1, this.state.compliance + 0.15);
    audio.playSFX("complete");
    if (this.state.buildingsVisited.size >= 6) {
      const quiet = this.buildings.find((b) => b.id === "quiet");
      if (quiet) quiet.locked = false;
    }
  },
  collectNote(id) {
    const note = this.survivorNotes.find((n) => n.id === id);
    if (note && !note.collected && !this.state.notesCollected.has(id)) {
      note.collected = true;
      this.state.notesCollected.add(id);
      audio.playSFX("note");
      if (this.state.scarfStripes < 6) {
        this.state.scarfStripes = Math.min(6, this.state.scarfStripes + 1);
      }
      return true;
    }
    return false;
  },
  openTreatmentFile() {
    this.state.inTreatmentFile = true;
  },
  closeTreatmentFile() {
    this.state.inTreatmentFile = false;
  },
  toggleMenu() {
    this.state.inMenu = !this.state.inMenu;
  },
  showAllNotes() {
  },
  // Save/Load system
  createSave() {
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
      buildingsCompleted: this.buildings.map((b) => ({ id: b.id, completed: b.completed })),
      notesCollectedStates: this.survivorNotes.map((n) => n.collected),
      consentGiven: this.consentGiven,
      time: this.state.time
    };
  },
  loadSave(data) {
    this.state.playerX = data.playerX ?? 32 * 16;
    this.state.playerY = data.playerY ?? 32 * 26;
    this.state.scarfStripes = data.scarfStripes ?? 6;
    this.state.compliance = data.compliance ?? 0;
    if (data.buildingsVisited) {
      data.buildingsVisited.forEach((id) => this.state.buildingsVisited.add(id));
    }
    if (data.notesCollected) {
      data.notesCollected.forEach((id) => this.state.notesCollected.add(id));
    }
    this.state.treatmentNotes = data.treatmentNotes ?? [];
    this.consentGiven = data.consentGiven ?? false;
    if (data.buildingsCompleted) {
      data.buildingsCompleted.forEach((b) => {
        const building = this.buildings.find((bd) => bd.id === b.id);
        if (building) building.completed = b.completed;
      });
    }
    if (data.notesCollectedStates) {
      this.survivorNotes.forEach((n, i) => {
        if (data.notesCollectedStates[i]) n.collected = true;
      });
    }
    this.state.hasStarted = true;
    this.state.time = data.time ?? 0;
  }
};

// src/renderer3d.ts
import * as THREE from "three";
var Renderer3D = class {
  scene;
  camera;
  renderer;
  renderCanvas;
  postScene;
  postCamera;
  postMaterial;
  postQuad;
  mapGroup;
  buildingMeshes = [];
  npcMeshes = [];
  noteMeshes = [];
  particleSystem;
  fireflySystem;
  waterMesh;
  skyMesh;
  ambientLight;
  dirLight;
  buildingLights = [];
  clock;
  targetCamX = 0;
  targetCamY = 0;
  currentCamX = 0;
  currentCamY = 0;
  dayTime = 0.3;
  // 0-1 representing day cycle
  constructor(container) {
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(1710638, 400, 1200);
    const aspect = VIEWPORT_WIDTH / VIEWPORT_HEIGHT;
    const frustumSize = VIEWPORT_HEIGHT;
    const left = -frustumSize * aspect / 2;
    const right = frustumSize * aspect / 2;
    const top = frustumSize / 2;
    const bottom = -frustumSize / 2;
    this.camera = new THREE.OrthographicCamera(left, right, top, bottom, 1, 2e3);
    this.camera.position.set(0, 0, 300);
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
    this.renderer.toneMapping = THREE.NoToneMapping;
    container.appendChild(this.renderer.domElement);
    this.renderer.domElement.id = "game-canvas";
    this.renderCanvas = new THREE.WebGLRenderTarget(VIEWPORT_WIDTH, VIEWPORT_HEIGHT, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat
    });
    this.postScene = new THREE.Scene();
    this.postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.postMaterial = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        time: { value: 0 },
        dayTime: { value: 0.3 },
        bloomStrength: { value: 0.15 },
        vignetteIntensity: { value: 0.6 },
        scanlineIntensity: { value: 0.08 },
        chromaticAberration: { value: 2e-3 }
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
    this.ambientLight = new THREE.AmbientLight(6719658, 0.6);
    this.scene.add(this.ambientLight);
    this.dirLight = new THREE.DirectionalLight(16772829, 0.8);
    this.dirLight.position.set(200, 300, 400);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.set(1024, 1024);
    this.dirLight.shadow.camera.left = -600;
    this.dirLight.shadow.camera.right = 600;
    this.dirLight.shadow.camera.top = 600;
    this.dirLight.shadow.camera.bottom = -600;
    this.scene.add(this.dirLight);
    this.skyMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3e3, 600),
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
    window.addEventListener("resize", () => this.onResize());
  }
  createGround() {
    const mapW = MAP_WIDTH * TILE_SIZE;
    const mapH = MAP_HEIGHT * TILE_SIZE;
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
  createPaths() {
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
    const pathPositions = [
      { x: 32 * TILE_SIZE, z: 24.5 * TILE_SIZE, w: 64 * TILE_SIZE, h: TILE_SIZE * 2 },
      { x: 32.5 * TILE_SIZE, z: 20 * TILE_SIZE, w: TILE_SIZE * 2, h: 38 * TILE_SIZE }
    ];
    pathPositions.forEach((p) => {
      const geo = new THREE.PlaneGeometry(p.w, p.h);
      const mesh = new THREE.Mesh(geo, pathMat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(p.x - MAP_WIDTH * TILE_SIZE / 2, 0.05, p.z - MAP_HEIGHT * TILE_SIZE / 2);
      mesh.receiveShadow = true;
      this.mapGroup.add(mesh);
    });
  }
  createWater() {
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
  createBuildings() {
    const centerX = MAP_WIDTH * TILE_SIZE / 2;
    const centerZ = MAP_HEIGHT * TILE_SIZE / 2;
    const buildingPlacements = [
      { id: "welcome", x: 18 * TILE_SIZE, z: 14 * TILE_SIZE, w: 5, h: 4 },
      { id: "clinic", x: 46 * TILE_SIZE, z: 14 * TILE_SIZE, w: 5, h: 4 },
      { id: "chapel", x: 30 * TILE_SIZE, z: 10 * TILE_SIZE, w: 4.5, h: 5 },
      { id: "home", x: 10 * TILE_SIZE, z: 32 * TILE_SIZE, w: 4.5, h: 3.5 },
      { id: "lab", x: 50 * TILE_SIZE, z: 32 * TILE_SIZE, w: 4, h: 3.5 },
      { id: "conference", x: 30 * TILE_SIZE, z: 36 * TILE_SIZE, w: 6.5, h: 4 },
      { id: "quiet", x: 4 * TILE_SIZE, z: 42 * TILE_SIZE, w: 2.5, h: 2.5 }
    ];
    buildingPlacements.forEach((b, idx) => {
      const def = BUILDINGS.find((bd) => bd.id === b.id);
      if (!def) return;
      const group = new THREE.Group();
      const baseColor = new THREE.Color(def.bgColor1);
      const roofColor = new THREE.Color(def.roofColor);
      const bx = b.x - centerX;
      const bz = b.z - centerZ;
      const bodyGeo = new THREE.BoxGeometry(b.w * TILE_SIZE, 3 * TILE_SIZE, b.h * TILE_SIZE);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: baseColor,
        roughness: 0.8,
        metalness: 0.1
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 1.5 * TILE_SIZE;
      body.castShadow = true;
      body.receiveShadow = true;
      group.add(body);
      const roofGeo = new THREE.ConeGeometry(Math.max(b.w, b.h) * TILE_SIZE * 0.6, TILE_SIZE, 4);
      const roofMat = new THREE.MeshStandardMaterial({
        color: roofColor,
        roughness: 0.7
      });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = 3.5 * TILE_SIZE;
      roof.rotation.y = Math.PI / 4;
      roof.castShadow = true;
      group.add(roof);
      const winGeo = new THREE.PlaneGeometry(TILE_SIZE * 0.7, TILE_SIZE * 0.7);
      const winMat = new THREE.MeshStandardMaterial({
        emissive: 16772744,
        emissiveIntensity: 0.3,
        color: 13428991
      });
      const windowPositions = [
        { x: -b.w * TILE_SIZE * 0.3, y: 1.8 * TILE_SIZE, z: b.h * TILE_SIZE * 0.51, ry: 0 },
        { x: b.w * TILE_SIZE * 0.3, y: 1.8 * TILE_SIZE, z: b.h * TILE_SIZE * 0.51, ry: 0 }
      ];
      windowPositions.forEach((wp) => {
        const win = new THREE.Mesh(winGeo, winMat.clone());
        win.position.set(wp.x, wp.y, wp.z);
        win.rotation.y = wp.ry;
        group.add(win);
      });
      const doorGeo = new THREE.PlaneGeometry(TILE_SIZE * 0.6, TILE_SIZE * 1);
      const doorMat = new THREE.MeshStandardMaterial({ color: 6044190, roughness: 0.9 });
      const door = new THREE.Mesh(doorGeo, doorMat);
      door.position.set(0, TILE_SIZE * 0.5, b.h * TILE_SIZE * 0.51);
      group.add(door);
      const light = new THREE.PointLight(16768392, 0, TILE_SIZE * 8);
      light.position.set(0, TILE_SIZE * 2, b.h * TILE_SIZE * 0.5);
      group.add(light);
      this.buildingLights.push(light);
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 40;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 128, 40);
      ctx.fillStyle = "#333";
      ctx.font = "bold 16px sans-serif";
      ctx.textAlign = "center";
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
  createNPCs() {
    const centerX = MAP_WIDTH * TILE_SIZE / 2;
    const centerZ = MAP_HEIGHT * TILE_SIZE / 2;
    const npcData = [
      { x: 18 * TILE_SIZE + 80, z: 14 * TILE_SIZE + TILE_SIZE, color: "#88c0d0", name: "Helena" },
      { x: 46 * TILE_SIZE - 20, z: 14 * TILE_SIZE + TILE_SIZE, color: "#a3be8c", name: "Reginald" },
      { x: 30 * TILE_SIZE + TILE_SIZE, z: 10 * TILE_SIZE + TILE_SIZE, color: "#ebcb8b", name: "Prudence" },
      { x: 10 * TILE_SIZE + TILE_SIZE, z: 32 * TILE_SIZE + TILE_SIZE, color: "#d08770", name: "Parents" },
      { x: 50 * TILE_SIZE + TILE_SIZE, z: 32 * TILE_SIZE + TILE_SIZE, color: "#b48ead", name: "Barnaby" },
      { x: 30 * TILE_SIZE + TILE_SIZE * 3, z: 36 * TILE_SIZE + TILE_SIZE, color: "#81a1c1", name: "Cornelia" }
    ];
    npcData.forEach((npc) => {
      const group = new THREE.Group();
      const color = new THREE.Color(npc.color);
      const bodyGeo = new THREE.BoxGeometry(TILE_SIZE * 0.35, TILE_SIZE * 0.5, TILE_SIZE * 0.2);
      const bodyMat = new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = TILE_SIZE * 0.35;
      body.castShadow = true;
      group.add(body);
      const headGeo = new THREE.BoxGeometry(TILE_SIZE * 0.3, TILE_SIZE * 0.3, TILE_SIZE * 0.25);
      const headMat = new THREE.MeshStandardMaterial({ color: 16758924, roughness: 0.7 });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = TILE_SIZE * 0.75;
      head.castShadow = true;
      group.add(head);
      const eyeGeo = new THREE.BoxGeometry(TILE_SIZE * 0.06, TILE_SIZE * 0.06, TILE_SIZE * 0.02);
      const eyeMat = new THREE.MeshBasicMaterial({ color: 2236962 });
      [-0.06, 0.06].forEach((x) => {
        const eye = new THREE.Mesh(eyeGeo, eyeMat);
        eye.position.set(x * TILE_SIZE, TILE_SIZE * 0.78, TILE_SIZE * 0.14);
        group.add(eye);
      });
      group.position.set(npc.x - centerX, 0, npc.z - centerZ);
      this.mapGroup.add(group);
      this.npcMeshes.push(group);
    });
  }
  createNotes() {
    const centerX = MAP_WIDTH * TILE_SIZE / 2;
    const centerZ = MAP_HEIGHT * TILE_SIZE / 2;
    const notes = [
      { id: 1, x: 20, z: 18 },
      { id: 2, x: 34, z: 12 },
      { id: 3, x: 30, z: 22 },
      { id: 4, x: 28, z: 11 },
      { id: 5, x: 48, z: 16 },
      { id: 6, x: 4, z: 24 },
      { id: 7, x: 14, z: 20 },
      { id: 8, x: 22, z: 30 },
      { id: 9, x: 42, z: 28 },
      { id: 10, x: 6, z: 40 },
      { id: 11, x: 32, z: 14 },
      { id: 12, x: 16, z: 26 },
      { id: 13, x: 54, z: 26 },
      { id: 14, x: 40, z: 38 },
      { id: 15, x: 10, z: 12 }
    ];
    notes.forEach((n) => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 40;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fffdf0";
      ctx.fillRect(0, 0, 32, 40);
      ctx.strokeStyle = "#cc3333";
      ctx.lineWidth = 2;
      ctx.strokeRect(2, 2, 28, 36);
      ctx.fillStyle = `hsl(${n.id * 24}, 80%, 60%)`;
      ctx.fillRect(3, 3, 4, 34);
      ctx.fillStyle = "#cc3333";
      ctx.font = "bold 20px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("!", 16, 28);
      const tex = new THREE.CanvasTexture(canvas);
      tex.magFilter = THREE.NearestFilter;
      const geo = new THREE.PlaneGeometry(TILE_SIZE * 0.4, TILE_SIZE * 0.5);
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(n.x * TILE_SIZE - centerX, TILE_SIZE * 1, n.z * TILE_SIZE - centerZ);
      mesh.userData = { noteId: n.id, baseY: TILE_SIZE * 1 };
      this.mapGroup.add(mesh);
      this.noteMeshes.push(mesh);
    });
  }
  createParticles() {
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
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, "rgba(255, 255, 255, 0.8)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");
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
      sizeAttenuation: true
    });
    this.particleSystem = new THREE.Points(geo, mat);
    this.mapGroup.add(this.particleSystem);
  }
  createFireflies() {
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
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    const mat = new THREE.PointsMaterial({
      size: TILE_SIZE * 0.1,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      sizeAttenuation: true
    });
    this.fireflySystem = new THREE.Points(geo, mat);
    this.mapGroup.add(this.fireflySystem);
  }
  createTreesAndDecorations() {
    const centerX = MAP_WIDTH * TILE_SIZE / 2;
    const centerZ = MAP_HEIGHT * TILE_SIZE / 2;
    const treePositions = [
      { x: 5, z: 5 },
      { x: 55, z: 5 },
      { x: 5, z: 43 },
      { x: 55, z: 43 },
      { x: 15, z: 8 },
      { x: 50, z: 10 },
      { x: 12, z: 38 },
      { x: 52, z: 28 },
      { x: 38, z: 8 },
      { x: 25, z: 15 },
      { x: 40, z: 20 },
      { x: 20, z: 35 }
    ];
    treePositions.forEach((tp) => {
      const tree = this.createTree();
      tree.position.set(
        tp.x * TILE_SIZE - centerX,
        0,
        tp.z * TILE_SIZE - centerZ
      );
      this.mapGroup.add(tree);
    });
    const lampPositions = [
      { x: 10, z: 23 },
      { x: 22, z: 23 },
      { x: 34, z: 23 },
      { x: 46, z: 23 },
      { x: 56, z: 23 },
      { x: 30, z: 14 },
      { x: 30, z: 18 },
      { x: 30, z: 30 },
      { x: 30, z: 34 }
    ];
    lampPositions.forEach((lp) => {
      const lamp = this.createLamp();
      lamp.position.set(
        lp.x * TILE_SIZE - centerX,
        0,
        lp.z * TILE_SIZE - centerZ
      );
      this.mapGroup.add(lamp);
    });
  }
  createTree() {
    const group = new THREE.Group();
    const trunkGeo = new THREE.CylinderGeometry(TILE_SIZE * 0.12, TILE_SIZE * 0.15, TILE_SIZE * 0.6, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 7029286, roughness: 0.9 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = TILE_SIZE * 0.3;
    trunk.castShadow = true;
    group.add(trunk);
    const sizes = [0.5, 0.4, 0.25];
    const heights = [0.65, 0.85, 1.05];
    sizes.forEach((s, i) => {
      const canopyGeo = new THREE.ConeGeometry(TILE_SIZE * s, TILE_SIZE * 0.4, 7);
      const canopyMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(2976542).lerp(new THREE.Color(3833904), i * 0.3),
        roughness: 0.8
      });
      const canopy = new THREE.Mesh(canopyGeo, canopyMat);
      canopy.position.y = TILE_SIZE * heights[i];
      canopy.castShadow = true;
      group.add(canopy);
    });
    return group;
  }
  createLamp() {
    const group = new THREE.Group();
    const poleGeo = new THREE.CylinderGeometry(TILE_SIZE * 0.03, TILE_SIZE * 0.04, TILE_SIZE * 1.2, 6);
    const poleMat = new THREE.MeshStandardMaterial({ color: 3355443, metalness: 0.6, roughness: 0.4 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.y = TILE_SIZE * 0.6;
    pole.castShadow = true;
    group.add(pole);
    const headGeo = new THREE.CylinderGeometry(TILE_SIZE * 0.15, TILE_SIZE * 0.2, TILE_SIZE * 0.15, 6);
    const headMat = new THREE.MeshStandardMaterial({ color: 4473924, roughness: 0.5 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = TILE_SIZE * 1.25;
    group.add(head);
    const bulbGeo = new THREE.SphereGeometry(TILE_SIZE * 0.08, 8, 6);
    const bulbMat = new THREE.MeshStandardMaterial({
      emissive: 16763904,
      emissiveIntensity: 0.5,
      color: 16772744
    });
    const bulb = new THREE.Mesh(bulbGeo, bulbMat);
    bulb.position.y = TILE_SIZE * 1.15;
    group.add(bulb);
    return group;
  }
  updatePlayerSprite(px, py, dir, frame, scarfStripes, time) {
  }
  render(time) {
    const state = GAME.state;
    this.dayTime = 0.3 + Math.sin(time * 0.02) * 0.2;
    const dayFactor = Math.max(0, Math.min(1, (this.dayTime - 0.2) / 0.6));
    this.ambientLight.intensity = 0.3 + dayFactor * 0.5;
    this.dirLight.intensity = 0.2 + dayFactor * 0.8;
    const sunColor = new THREE.Color().lerpColors(
      new THREE.Color(4474026),
      new THREE.Color(16772829),
      dayFactor
    );
    this.dirLight.color = sunColor;
    const ambientColor = new THREE.Color().lerpColors(
      new THREE.Color(2236996),
      new THREE.Color(6719658),
      dayFactor
    );
    this.ambientLight.color = ambientColor;
    this.buildingLights.forEach((light, i) => {
      const completed = GAME.buildings[i]?.completed || false;
      light.intensity = completed ? (1 - dayFactor) * 1.5 : 0;
    });
    const centerX = MAP_WIDTH * TILE_SIZE / 2;
    const centerZ = MAP_HEIGHT * TILE_SIZE / 2;
    this.targetCamX = state.playerX - centerX;
    this.targetCamY = -(state.playerY - centerZ);
    this.currentCamX += (this.targetCamX - this.currentCamX) * 0.08;
    this.currentCamY += (this.targetCamY - this.currentCamY) * 0.08;
    this.camera.position.x = this.currentCamX;
    this.camera.position.y = this.currentCamY;
    this.npcMeshes.forEach((mesh, i) => {
      const bob = Math.sin(time * 1.5 + i * 2) * 0.03;
      mesh.position.y = bob;
    });
    this.noteMeshes.forEach((mesh) => {
      const collected = GAME.state.notesCollected.has(mesh.userData.noteId);
      mesh.visible = !collected;
      if (!collected) {
        mesh.position.y = mesh.userData.baseY + Math.sin(time * 2 + mesh.userData.noteId) * 0.15;
        mesh.lookAt(this.camera.position);
      }
    });
    if (this.fireflySystem) {
      const fPos = this.fireflySystem.geometry.attributes.position.array;
      for (let i = 0; i < fPos.length; i += 3) {
        fPos[i] += Math.sin(time * 0.5 + i) * 0.02;
        fPos[i + 1] += Math.cos(time * 0.7 + i * 0.5) * 0.01;
        fPos[i + 2] += Math.sin(time * 0.6 + i * 0.3) * 0.02;
      }
      this.fireflySystem.geometry.attributes.position.needsUpdate = true;
      this.fireflySystem.material.opacity = (1 - dayFactor) * 0.8;
    }
    if (this.particleSystem) {
      const pPos = this.particleSystem.geometry.attributes.position.array;
      for (let i = 0; i < pPos.length; i += 3) {
        pPos[i] += Math.sin(time * 0.3 + i) * 0.01;
        pPos[i + 1] += Math.cos(time * 0.2 + i) * 5e-3;
      }
      this.particleSystem.geometry.attributes.position.needsUpdate = true;
    }
    if (this.waterMesh) {
      this.waterMesh.material.uniforms.time.value = time;
    }
    if (this.skyMesh) {
      this.skyMesh.material.uniforms.dayTime.value = this.dayTime;
      this.skyMesh.material.uniforms.time.value = time;
      this.skyMesh.position.x = this.camera.position.x;
    }
    this.scene.fog.density = THREE.MathUtils.lerp(12e-4, 2e-3, 1 - dayFactor);
    this.renderer.setRenderTarget(this.renderCanvas);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(null);
    this.postMaterial.uniforms.tDiffuse.value = this.renderCanvas.texture;
    this.postMaterial.uniforms.time.value = time;
    this.postMaterial.uniforms.dayTime.value = this.dayTime;
    this.postMaterial.uniforms.bloomStrength.value = 0.12 + (1 - dayFactor) * 0.1;
    this.renderer.render(this.postScene, this.postCamera);
  }
  onResize() {
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
  getDOMElement() {
    return this.renderer.domElement;
  }
  dispose() {
    this.renderer.dispose();
    this.renderCanvas.dispose();
  }
};

// src/ui.ts
var UILayer = class {
  tickerEl = null;
  tickerText = null;
  hudEl = null;
  buildingInfoEl = null;
  dialogueEl = null;
  notePopupEl = null;
  popupContainerEl = null;
  treatmentPanel = null;
  menuOverlay = null;
  minimapCanvas = null;
  minimapCtx = null;
  cookieEl = null;
  notificationEl = null;
  tickerMessages = [...TICKER_MESSAGES];
  tickerRotationInterval = 25e3;
  tickerRotationTimer = 0;
  popupCooldownTimer = 0;
  popupSpawnTimer = 0;
  notificationTimer = 0;
  init() {
    const container = document.getElementById("ui-overlay");
    if (!container) return;
    const ticker = document.createElement("div");
    ticker.className = "hope-ticker";
    ticker.innerHTML = `
      <div class="ticker-label">\u{1F4FA} HOPE TV</div>
      <div class="ticker-content">
        <div class="ticker-text">${this.tickerMessages[0]}</div>
      </div>
    `;
    container.appendChild(ticker);
    this.tickerEl = ticker;
    this.tickerText = ticker.querySelector(".ticker-text");
    const hud = document.createElement("div");
    hud.className = "hud-top";
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
          <span class="time-icon" id="time-icon">\u2600\uFE0F</span>
          <div>
            <div class="label">DAY</div>
            <div class="value" id="day-display">1</div>
          </div>
        </div>
      </div>
      <div class="hud-box" id="quest-hud">
        <div class="label">QUEST</div>
        <div class="value">\u2192 Welcome Centre</div>
      </div>
    `;
    container.appendChild(hud);
    this.hudEl = hud;
    const bInfo = document.createElement("div");
    bInfo.className = "building-info";
    container.appendChild(bInfo);
    this.buildingInfoEl = bInfo;
    const dBox = document.createElement("div");
    dBox.className = "dialogue-box";
    dBox.innerHTML = `
      <div class="dialogue-speaker" id="dialogue-speaker"></div>
      <div class="dialogue-text">
        <span id="dialogue-text-content"></span><span class="dialogue-cursor"></span>
      </div>
    `;
    container.appendChild(dBox);
    this.dialogueEl = dBox;
    const notePopup = document.createElement("div");
    notePopup.className = "note-popup";
    notePopup.innerHTML = `
      <div class="note-text" id="note-text"></div>
      <div class="note-close">[ SPACE to close ]</div>
    `;
    container.appendChild(notePopup);
    this.notePopupEl = notePopup;
    const popCont = document.createElement("div");
    popCont.className = "popup-container";
    container.appendChild(popCont);
    this.popupContainerEl = popCont;
    const tPanel = document.createElement("div");
    tPanel.className = "treatment-panel";
    tPanel.innerHTML = `
      <div class="treatment-header">
        <span>\u{1F4CB} CLINICAL FILE</span>
        <span style="cursor: pointer;" id="treatment-close">\u2715</span>
      </div>
      <div class="treatment-body" id="treatment-body"></div>
    `;
    tPanel.querySelector("#treatment-close")?.addEventListener("click", () => {
      GAME.closeTreatmentFile();
      audio.playSFX("close");
    });
    container.appendChild(tPanel);
    this.treatmentPanel = tPanel;
    const menu = document.createElement("div");
    menu.className = "menu-overlay";
    menu.innerHTML = `
      <div class="menu-item selected" data-action="resume">Resume <span class="menu-key">[ESC]</span></div>
      <div class="menu-item" data-action="file">Clinical File <span class="menu-key">[F]</span></div>
      <div class="menu-item" data-action="notes">Survivor Notes <span class="menu-key">[N]</span></div>
      <div class="menu-item" data-action="save">Save Game <span class="menu-key">[S]</span></div>
    `;
    container.appendChild(menu);
    this.menuOverlay = menu;
    menu.querySelectorAll(".menu-item").forEach((item) => {
      item.addEventListener("click", () => {
        const action = item.getAttribute("data-action");
        audio.playSFX("select");
        if (action === "resume") GAME.toggleMenu();
        if (action === "file") {
          GAME.toggleMenu();
          GAME.openTreatmentFile();
          this.showTreatmentFile();
        }
        if (action === "notes") {
          GAME.toggleMenu();
          this.showAllNotes();
        }
        if (action === "save") {
          GAME.toggleMenu();
          this.saveGame();
        }
      });
    });
    const minimapContainer = document.createElement("div");
    minimapContainer.className = "minimap";
    const mmCanvas = document.createElement("canvas");
    mmCanvas.width = 170;
    mmCanvas.height = 120;
    minimapContainer.appendChild(mmCanvas);
    container.appendChild(minimapContainer);
    this.minimapCanvas = mmCanvas;
    this.minimapCtx = mmCanvas.getContext("2d");
    const cookie = document.createElement("div");
    cookie.className = "cookie-consent";
    cookie.innerHTML = `
      <div style="margin-bottom: 8px; font-size: 13px; color: #666;">\u{1F36A} COOKIE CONSENT</div>
      <div id="cookie-text" style="font-size: 15px; margin-bottom: 10px;">${COOKIE_TEXTS[0]}</div>
      <div>
        <button class="cookie-btn accept" id="cookie-accept">I CONSENT</button>
        <button class="cookie-btn decline" id="cookie-decline">DECLINE</button>
      </div>
    `;
    cookie.querySelector("#cookie-accept")?.addEventListener("click", () => {
      cookie.classList.remove("visible");
      GAME.consentGiven = true;
      audio.playSFX("pop");
      setTimeout(() => this.showCookie(), 15e3 + Math.random() * 15e3);
    });
    cookie.querySelector("#cookie-decline")?.addEventListener("click", () => {
    });
    container.appendChild(cookie);
    this.cookieEl = cookie;
    const notif = document.createElement("div");
    notif.className = "notification";
    container.appendChild(notif);
    this.notificationEl = notif;
    this.updateScarfDisplay();
    setTimeout(() => {
      if (!GAME.consentGiven) this.showCookie();
    }, 1e4);
  }
  updateHUD() {
    if (!this.hudEl) return;
    const fill = document.getElementById("compliance-fill");
    if (fill) fill.style.width = `${GAME.state.compliance * 100}%`;
    this.updateScarfDisplay();
    const dayDisplay = document.getElementById("day-display");
    const timeIcon = document.getElementById("time-icon");
    if (dayDisplay) dayDisplay.textContent = `${GAME.state.gameDay}`;
    if (timeIcon) timeIcon.textContent = GAME.state.dayTime > 0.5 ? "\u2600\uFE0F" : "\u{1F319}";
    const questVal = this.hudEl.querySelector("#quest-hud .value");
    if (questVal) {
      const visited = GAME.state.buildingsVisited;
      const allBuildings = ["welcome", "clinic", "chapel", "home", "lab", "conference"];
      const nextBuilding = allBuildings.find((b) => !visited.has(b));
      if (nextBuilding) {
        const bDef = GAME.getBuildingById(nextBuilding);
        if (bDef) questVal.textContent = `\u2192 ${bDef.name}`;
      } else {
        questVal.textContent = "\u2192 The Quiet Room";
      }
    }
  }
  updateScarfDisplay() {
    const display = document.getElementById("scarf-display");
    if (!display) return;
    display.innerHTML = "";
    for (let i = 0; i < 6; i++) {
      const stripe = document.createElement("div");
      stripe.className = "scarf-stripe";
      if (i < GAME.state.scarfStripes) {
        stripe.style.background = RAINBOW_COLORS[i];
        stripe.style.opacity = "1";
      } else {
        stripe.style.background = "#333";
        stripe.style.opacity = "0.25";
      }
      display.appendChild(stripe);
    }
  }
  showBuildingInfo(name) {
    if (!this.buildingInfoEl) return;
    this.buildingInfoEl.textContent = `[SPACE] ${name}`;
    this.buildingInfoEl.classList.add("visible");
  }
  hideBuildingInfo() {
    if (!this.buildingInfoEl) return;
    this.buildingInfoEl.classList.remove("visible");
  }
  startDialogue(speaker, lines, callback) {
    GAME.state.inDialogue = true;
    GAME.dialogueState = {
      active: true,
      speakerName: speaker,
      lines,
      lineIndex: 0,
      charIndex: 0,
      charTimer: 0,
      currentText: "",
      callback
    };
    if (!this.dialogueEl) return;
    this.dialogueEl.classList.add("visible");
    const speakerEl = document.getElementById("dialogue-speaker");
    if (speakerEl) speakerEl.textContent = speaker;
  }
  advanceDialogue() {
    const d = GAME.dialogueState;
    if (!d || !d.active) return;
    if (d.charIndex < d.lines[d.lineIndex].length) {
      d.charIndex = d.lines[d.lineIndex].length;
      d.currentText = d.lines[d.lineIndex];
      return;
    }
    d.lineIndex++;
    d.charIndex = 0;
    d.currentText = "";
    if (d.lineIndex >= d.lines.length) {
      d.active = false;
      GAME.state.inDialogue = false;
      if (this.dialogueEl) this.dialogueEl.classList.remove("visible");
      if (d.callback) {
        audio.playSFX("select");
        d.callback();
      }
    }
  }
  updateDialogue(dt) {
    const d = GAME.dialogueState;
    if (!d || !d.active) return;
    d.charTimer += dt;
    if (d.charTimer > 0.025) {
      d.charTimer = 0;
      d.charIndex++;
      d.currentText = d.lines[d.lineIndex].substring(0, d.charIndex);
      const textEl = document.getElementById("dialogue-text-content");
      if (textEl) textEl.textContent = d.currentText;
    }
  }
  showPopup(title, body, btnText, btnType, onClose) {
    if (!this.popupContainerEl) return;
    this.popupContainerEl.innerHTML = "";
    const popup = document.createElement("div");
    popup.className = "game-popup";
    popup.innerHTML = `
      <div class="popup-header">
        <span>${title}</span>
        <button class="popup-close" id="popup-close-btn">\u2715</button>
      </div>
      <div class="popup-body">
        <div>${body}</div>
        <button class="popup-btn ${btnType || ""}" id="popup-action-btn">${btnText}</button>
      </div>
    `;
    this.popupContainerEl.appendChild(popup);
    popup.querySelector("#popup-close-btn")?.addEventListener("click", () => {
      this.closePopup();
      if (onClose) onClose();
    });
    popup.querySelector("#popup-action-btn")?.addEventListener("click", () => {
      this.closePopup();
      if (onClose) onClose();
    });
    audio.playSFX("pop");
  }
  closePopup() {
    if (this.popupContainerEl) this.popupContainerEl.innerHTML = "";
    audio.playSFX("close");
  }
  showRandomPopup() {
    const ad = POPUP_ADS[Math.floor(Math.random() * POPUP_ADS.length)];
    this.showPopup(ad.title, ad.body, ad.btnText);
  }
  showCookie() {
    if (!this.cookieEl || GAME.consentGiven) return;
    this.cookieEl.classList.add("visible");
    const textEl = document.getElementById("cookie-text");
    if (textEl) textEl.textContent = COOKIE_TEXTS[Math.floor(Math.random() * COOKIE_TEXTS.length)];
  }
  showNotification(text) {
    if (!this.notificationEl) return;
    this.notificationEl.textContent = text;
    this.notificationEl.classList.add("visible");
    this.notificationTimer = 4;
    audio.playSFX("pop");
  }
  updateNotifications(dt) {
    if (this.notificationTimer > 0) {
      this.notificationTimer -= dt;
      if (this.notificationTimer <= 0 && this.notificationEl) {
        this.notificationEl.classList.remove("visible");
      }
    }
    this.popupCooldownTimer -= dt;
    if (this.popupCooldownTimer <= 0 && !GAME.state.inDialogue && !GAME.state.inMenu && !GAME.state.inTreatmentFile) {
      this.popupSpawnTimer += dt;
      if (this.popupSpawnTimer > 25 + Math.random() * 20) {
        this.popupSpawnTimer = 0;
        this.popupCooldownTimer = 10;
        const notifications = [
          "\u{1F4FA} Pastor Marlowe is LIVE on HOPE TV",
          "\u{1F514} ARE YOU STILL STRUGGLING?",
          "\u{1F4CB} New treatment note added to your file",
          "\u{1F4AC} Reminder: Your family is praying for you"
        ];
        this.showNotification(notifications[Math.floor(Math.random() * notifications.length)]);
      }
    }
  }
  showTreatmentFile() {
    if (!this.treatmentPanel) return;
    this.treatmentPanel.classList.add("visible");
    audio.playSFX("menu");
    const body = document.getElementById("treatment-body");
    if (!body) return;
    const notes = GAME.state.treatmentNotes;
    if (notes.length === 0) {
      body.innerHTML = '<div style="color: #888; text-align: center; padding: 40px;">No treatment notes yet.<br><br>Visit buildings to begin your journey.</div>';
    } else {
      body.innerHTML = notes.map((n) => `
        <div class="treatment-entry">
          <div class="entry-title">${n.title}</div>
          <div class="entry-date">${n.date}</div>
          <div class="entry-text">${n.text}</div>
        </div>
      `).join("");
    }
  }
  hideTreatmentFile() {
    if (this.treatmentPanel) {
      this.treatmentPanel.classList.remove("visible");
      audio.playSFX("close");
    }
  }
  showNote(noteText) {
    if (!this.notePopupEl) return;
    const textEl = document.getElementById("note-text");
    if (textEl) textEl.textContent = noteText;
    this.notePopupEl.classList.add("visible");
    audio.playSFX("note");
  }
  hideNote() {
    if (this.notePopupEl) this.notePopupEl.classList.remove("visible");
  }
  showAllNotes() {
    const collected = Array.from(GAME.state.notesCollected).sort();
    if (collected.length === 0) {
      this.showPopup("\u{1F4DD} Survivor Notes", "No notes found yet.<br><br><em>Look carefully around Restoration Springs. Others have been here before you.</em>", "CLOSE");
      return;
    }
    const notesText = collected.map((id) => {
      const note = SURVIVOR_NOTES.find((n) => n.id === id);
      return note ? `"${note.text.replace(/\n/g, " ")}"` : "";
    }).join("\n\n---\n\n");
    this.showPopup(
      `\u{1F4DD} Survivor Notes (${collected.length}/${SURVIVOR_NOTES.length})`,
      notesText.replace(/\n/g, "<br>"),
      "CLOSE"
    );
  }
  updateTicker(dt) {
    this.tickerRotationTimer += dt * 1e3;
    if (this.tickerRotationTimer > this.tickerRotationInterval) {
      this.tickerRotationTimer = 0;
      const idx = Math.floor(Math.random() * this.tickerMessages.length);
      if (this.tickerText) this.tickerText.textContent = this.tickerMessages[idx];
    }
  }
  showMenu() {
    if (!this.menuOverlay) return;
    this.menuOverlay.classList.add("visible");
    audio.playSFX("menu");
  }
  hideMenu() {
    if (!this.menuOverlay) return;
    this.menuOverlay.classList.remove("visible");
  }
  renderMinimap() {
    if (!this.minimapCtx || !this.minimapCanvas) return;
    const ctx = this.minimapCtx;
    const c = this.minimapCanvas;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#1a1a14";
    ctx.fillRect(0, 0, c.width, c.height);
    const mapW = 64;
    const mapH = 48;
    const tileScaleX = c.width / mapW;
    const tileScaleY = c.height / mapH;
    ctx.fillStyle = "#66550055";
    for (let x = 8; x <= 56; x++) {
      ctx.fillRect(x * tileScaleX, 24 * tileScaleY, tileScaleX + 0.5, tileScaleY * 2 + 0.5);
    }
    GAME.buildings.forEach((b) => {
      ctx.fillStyle = b.completed ? "#4a90d9" : "#666";
      const bx = b.x / (mapW * 32) * c.width;
      const by = b.y / (mapH * 32) * c.height;
      const bw = b.width / (mapW * 32) * c.width;
      const bh = b.height / (mapH * 32) * c.height;
      ctx.fillRect(bx, by, Math.max(bw, 3), Math.max(bh, 3));
    });
    const px = GAME.state.playerX / (mapW * 32) * c.width;
    const py = GAME.state.playerY / (mapH * 32) * c.height;
    ctx.fillStyle = "#ff6b35";
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  async saveGame() {
    try {
      await window.GAME_SAVE?.();
      this.showNotification("\u{1F4BE} Game saved successfully!");
    } catch (e) {
      this.showNotification("Error saving game.");
    }
  }
};

// src/utils.ts
function aabb(ax, ay, aw, ah, bx, by, bw, bh) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

// src/libs/persistence.ts
var persistence = {
  setItem(key, value) {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  getItem(key) {
    return Promise.resolve(localStorage.getItem(key));
  },
  removeItem(key) {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
  clear() {
    localStorage.clear();
    return Promise.resolve();
  }
};

// src/main.ts
var GameEngine = class {
  renderer3d = null;
  ui = null;
  loadingFill = null;
  loadingText = null;
  loadingScreen = null;
  loadingError = null;
  forceStartBtn = null;
  startScreen = null;
  transitionOverlay = null;
  running = false;
  lastTime = 0;
  transitionAlpha = 0;
  isTransitioning = false;
  initFailed = false;
  // Input
  keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    s: false,
    a: false,
    d: false,
    " ": false,
    Enter: false,
    Escape: false,
    f: false,
    n: false,
    i: false
  };
  keyJustPressed = /* @__PURE__ */ new Set();
  _prevKeys = null;
  setLoading(text, progress) {
    if (this.loadingText) this.loadingText.textContent = text;
    if (this.loadingFill) this.loadingFill.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }
  async init() {
    const container = document.getElementById("game-container");
    if (!container) {
      console.error("No game container found");
      this.setLoading("ERROR: Missing container", 0);
      this.showError("Game container not found. Please refresh.");
      return;
    }
    this.loadingScreen = document.getElementById("loading-screen");
    this.loadingFill = document.getElementById("loading-fill");
    this.loadingText = document.getElementById("loading-text");
    this.loadingError = document.getElementById("loading-error");
    this.forceStartBtn = document.getElementById("force-start-btn");
    this.transitionOverlay = document.getElementById("transition-overlay");
    if (this.forceStartBtn) {
      this.forceStartBtn.addEventListener("click", () => {
        console.log("Force starting game...");
        this.handleInitError("Force start activated");
      });
    }
    try {
      this.setLoading("Initializing audio...", 10);
      await this.initAudioWithTimeout();
      this.setLoading("Generating world...", 30);
      await this.delay(100);
      this.setLoading("Rendering environment...", 60);
      this.renderer3d = new Renderer3D(container);
      await this.delay(100);
      this.setLoading("Preparing UI...", 80);
      this.ui = new UILayer();
      await this.delay(100);
      this.setLoading("Initializing systems...", 90);
      GAME.init();
      this.setLoading("Checking save data...", 100);
      await this.loadGame();
      await this.delay(200);
      this.createStartScreen();
    } catch (error) {
      console.error("Initialization error:", error);
      this.handleInitError(error instanceof Error ? error.message : String(error));
    }
  }
  async initAudioWithTimeout() {
    try {
      const audioPromise = audio.init();
      const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => {
          console.warn("Audio initialization timeout - continuing without audio");
          resolve();
        }, 3e3);
      });
      await Promise.race([audioPromise, timeoutPromise]);
    } catch (error) {
      console.warn("Audio failed to initialize:", error);
    }
  }
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  handleError(step, error) {
    console.error(`Error during ${step}:`, error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    this.setLoading(`ERROR: ${step}`, 100);
    this.showError(`Failed during ${step}: ${errorMsg}`);
    this.initFailed = true;
    if (this.forceStartBtn) {
      this.forceStartBtn.style.display = "inline-block";
    }
  }
  handleInitError(errorMsg) {
    console.log("Handling init error:", errorMsg);
    if (!this.renderer3d) {
      const container = document.getElementById("game-container");
      if (container) {
        try {
          this.renderer3d = new Renderer3D(container);
        } catch (e) {
          console.error("Failed to create renderer during recovery:", e);
        }
      }
    }
    if (!this.ui) {
      try {
        this.ui = new UILayer();
      } catch (e) {
        console.error("Failed to create UI during recovery:", e);
      }
    }
    if (!GAME.state.hasStarted) {
      GAME.init();
    }
    this.loadingScreen?.classList.add("hidden");
    this.createStartScreen();
  }
  showError(message) {
    if (this.loadingError) {
      this.loadingError.textContent = message;
      this.loadingError.style.display = "block";
    }
  }
  async loadGame() {
    try {
      const saveStr = await persistence.getItem(SAVE_VERSION);
      if (saveStr) {
        const saveData = JSON.parse(saveStr);
        if (saveData.version === SAVE_VERSION) {
          GAME.loadSave(saveData);
        }
      }
    } catch (e) {
      console.log("No save found or error loading:", e);
    }
  }
  async saveGame() {
    try {
      const saveData = GAME.createSave();
      await persistence.setItem(SAVE_VERSION, JSON.stringify(saveData));
    } catch (e) {
      console.log("Error saving:", e);
    }
  }
  createStartScreen() {
    if (this.startScreen) {
      this.startScreen.remove();
    }
    const start = document.createElement("div");
    start.className = "start-screen";
    start.innerHTML = `
      <div class="version">v2.0 \xB7 3D Enhanced</div>
      <h1>JUST CHANGE\u2122</h1>
      <div class="subtitle">Restoration Springs \u2014 A Conversion Hero</div>
      <div class="tagline">"Your name is yours. Don't let them take it."</div>
      <button class="start-btn" id="start-btn">BEGIN SESSION</button>
      ${GAME.state.hasStarted ? '<button class="start-btn" id="continue-btn" style="margin-top: 15px; font-size: 11px;">CONTINUE</button>' : ""}
      <div class="controls">
        <span>WASD/ARROWS</span> Move &nbsp;
        <span>SPACE</span> Interact &nbsp;
        <span>F</span> Clinical File &nbsp;
        <span>N</span> Notes &nbsp;
        <span>ESC</span> Menu
      </div>
      <div class="credits">SurvivingSOGICE \xB7 University of Bergen \xB7 2025</div>
    `;
    document.body.appendChild(start);
    this.startScreen = start;
    const startBtn = document.getElementById("start-btn");
    const continueBtn = document.getElementById("continue-btn");
    if (startBtn) {
      startBtn.addEventListener("click", () => this.startGame(false));
    }
    if (continueBtn) {
      continueBtn.addEventListener("click", () => this.startGame(true));
    }
  }
  async startGame(loadSave) {
    if (this.startScreen) {
      this.startScreen.style.opacity = "0";
      this.startScreen.style.transition = "opacity 0.8s ease";
      setTimeout(() => this.startScreen?.remove(), 800);
    }
    if (this.loadingScreen) {
      this.loadingScreen.classList.add("hidden");
      this.loadingScreen.style.transition = "opacity 0.8s ease";
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
      console.error("UI init error during start:", e);
    }
    this.isTransitioning = true;
    if (this.transitionOverlay) {
      this.transitionOverlay.classList.add("active");
      await this.delay(500);
      this.transitionOverlay.classList.remove("active");
    }
    this.isTransitioning = false;
    this.running = true;
    this.lastTime = performance.now();
    this.setupInput();
    requestAnimationFrame((t) => this.loop(t));
  }
  loop(currentTime) {
    if (!this.running) return;
    const dt = Math.min((currentTime - this.lastTime) / 1e3, 0.05);
    this.lastTime = currentTime;
    this.update(dt);
    if (this.renderer3d) {
      this.renderer3d.render(GAME.state.time);
    }
    this.drawPlayerSprite();
    try {
      this.ui?.updateDialogue(dt);
      this.ui?.updateTicker(dt);
      this.ui?.updateNotifications(dt);
      this.ui?.updateHUD();
      this.ui?.renderMinimap();
    } catch (e) {
      console.error("UI update error:", e);
    }
    try {
      audio.update(GAME.state.time, GAME.state.dayTime);
    } catch (e) {
    }
    if (Math.floor(GAME.state.time) % 30 === 0 && Math.floor(GAME.state.time) > 0) {
      this.saveGame();
    }
    requestAnimationFrame((t) => this.loop(t));
  }
  drawPlayerSprite() {
  }
  update(dt) {
    if (!GAME.state.hasStarted || GAME.state.inMenu) return;
    const state = GAME.state;
    this.keyJustPressed.clear();
    this.processInput();
    state.time += dt;
    state.gameDay = Math.floor(state.time / 120) + 1;
    state.dayTime = (Math.sin(state.time * 0.02) + 1) / 2;
    if (!state.inDialogue && !state.inTreatmentFile) {
      let dx = 0, dy = 0;
      if (this.keys.ArrowUp || this.keys.w) {
        dy = -1;
        state.playerDir = "up";
      }
      if (this.keys.ArrowDown || this.keys.s) {
        dy = 1;
        state.playerDir = "down";
      }
      if (this.keys.ArrowLeft || this.keys.a) {
        dx = -1;
        state.playerDir = "left";
      }
      if (this.keys.ArrowRight || this.keys.d) {
        dx = 1;
        state.playerDir = "right";
      }
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
        GAME.buildings.forEach((b) => {
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
            if (Math.random() < 0.3) audio.playSFX("step");
          } catch (e) {
          }
        }
      } else {
        state.walkFrame = 0;
      }
    }
    let nearBuilding = null;
    GAME.buildings.forEach((b) => {
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
      this.ui?.showBuildingInfo(`${nearBuilding.emoji} ${nearBuilding.name}${nearBuilding.locked ? " [LOCKED]" : ""}`);
      GAME.currentBuildingInteraction = nearBuilding;
    } else {
      this.ui?.hideBuildingInfo();
      GAME.currentBuildingInteraction = null;
    }
    GAME.survivorNotes.forEach((note) => {
      if (note.collected || GAME.state.notesCollected.has(note.id)) return;
      const d = Math.sqrt((state.playerX - note.x) ** 2 + (state.playerY - note.y) ** 2);
      if (d < 24) {
        note.collected = true;
        GAME.collectNote(note.id);
        const noteData = SURVIVOR_NOTES.find((n) => n.id === note.id);
        if (noteData) this.ui?.showNote(noteData.text);
        else this.ui?.showNote("A crumpled note. Someone was here before you.");
      }
    });
    if (this.keyJustPressed.has(" ") || this.keyJustPressed.has("Enter")) {
      if (this.ui && this.ui["dialogueEl"]?.classList.contains("visible")) {
        this.ui.advanceDialogue();
      } else if (GAME.dialogueState?.active) {
        this.ui?.advanceDialogue();
      } else if (this.ui && this.ui["notePopupEl"]?.classList.contains("visible")) {
        this.ui?.hideNote();
      } else if (nearBuilding) {
        if (nearBuilding.locked) {
          try {
            audio.playSFX("locked");
          } catch (e) {
          }
          this.ui?.showPopup("\u{1F512} LOCKED", "Complete more sessions to unlock this area.", "UNDERSTOOD");
        } else {
          this.npcInteraction(nearBuilding);
        }
      }
    }
    if (this.keyJustPressed.has("f")) {
      if (GAME.state.inTreatmentFile) {
        GAME.closeTreatmentFile();
        this.ui?.hideTreatmentFile();
      } else if (!GAME.state.inDialogue) {
        GAME.openTreatmentFile();
        this.ui?.showTreatmentFile();
      }
    }
    if (this.keyJustPressed.has("n")) {
      if (this.ui && this.ui["notePopupEl"]?.classList.contains("visible")) {
        this.ui?.hideNote();
      } else {
        this.ui?.showAllNotes();
      }
    }
    if (this.keyJustPressed.has("Escape")) {
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
  npcInteraction(building) {
    if (!this.ui) return;
    try {
      audio.playSFX("select");
    } catch (e) {
    }
    const npc = GAME.npcs.find((n) => n.buildingId === building.id);
    const speaker = npc?.name || building.npcName;
    const visitBuilding = () => {
      GAME.visitBuilding(building);
      this.ui?.showNotification(`Session complete \u2713 \u2014 ${building.name}`);
      setTimeout(() => {
        if (!GAME.state.inDialogue && GAME.state.popupCooldown <= 0) {
          this.ui?.showRandomPopup();
        }
      }, 3e3);
    };
    this.ui.startDialogue(speaker, [...building.dialogue], visitBuilding);
  }
  processInput() {
    if (this._prevKeys) {
      for (const key in this.keys) {
        if (this.keys[key] && !this._prevKeys[key]) {
          this.keyJustPressed.add(key);
        }
      }
    }
    this._prevKeys = { ...this.keys };
  }
  setupInput() {
    window.addEventListener("keydown", (e) => {
      const key = e.key;
      if (key in this.keys) {
        this.keys[key] = true;
        e.preventDefault();
      }
      try {
        audio.init();
      } catch (e2) {
      }
    });
    window.addEventListener("keyup", (e) => {
      const key = e.key;
      if (key in this.keys) {
        this.keys[key] = false;
      }
    });
    window.addEventListener("keydown", (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
    });
    window.addEventListener("contextmenu", (e) => e.preventDefault());
  }
  async start() {
    await this.init();
  }
};
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => new GameEngine().start());
} else {
  new GameEngine().start();
}


// === JUST CHANGE™ — Entities (Buildings, NPCs, Notes) ===

import { BuildingDef, NPCDef, SurvivorNote, RAINBOW_COLORS } from './definitions';

// === BUILDINGS ===

export const BUILDINGS: BuildingDef[] = [
  {
    id: 'welcome',
    name: 'Welcome Centre',
    emoji: '🌸',
    doorX: 0,
    doorY: 0,
    width: 160,
    height: 120,
    npcName: 'Dr. Helena Hush-It-Down',
    description: 'Emotional Suppression Specialist',
    bgColor1: '#ffecd2',
    bgColor2: '#fcb69f',
    roofColor: '#ff6b6b',
    dialogue: [
      "Welcome to Restoration Springs! I'm Dr. Hush-It-Down.",
      "I'm so glad you're here. This takes courage.",
      "Everything we do here is about love. About healing.",
      "Let me walk you through our programme. It's completely voluntary — of course.",
      "I think the Clinic would be a wonderful next step for you.",
    ],
    completed: false,
  },
  {
    id: 'clinic',
    name: 'The Clinic',
    emoji: '🏥',
    doorX: 0,
    doorY: 0,
    width: 160,
    height: 120,
    npcName: 'Dr. Reginald Straightwell',
    description: 'Certified Normality Navigator',
    bgColor1: '#e0e8f0',
    bgColor2: '#c0d0e0',
    roofColor: '#4a90d9',
    dialogue: [
      "Good day. Dr. Straightwell here.",
      "Everything in our practice is evidence-based* care.",
      "*Evidence definition pending peer review.",
      "We use a therapeutic choice model here. You're free to leave at any time.",
      "The Chapel offers wonderful pastoral support. Highly recommended.",
    ],
    completed: false,
  },
  {
    id: 'chapel',
    name: 'The Chapel',
    emoji: '⛪',
    doorX: 0,
    doorY: 0,
    width: 140,
    height: 160,
    npcName: 'Dr. Prudence Praymore',
    description: 'Senior Conversion Consultant',
    bgColor1: '#fff8dc',
    bgColor2: '#f5e6c8',
    roofColor: '#8b4513',
    dialogue: [
      "Blessed are those who seek truth! I'm Dr. Praymore.",
      "God has called you by your TRUE name.",
      "Sometimes the Lord's work requires... adjustments.",
      "Have you considered our Biblical Masculinity workshop this Saturday?",
    ],
    completed: false,
  },
  {
    id: 'home',
    name: 'Family Home',
    emoji: '🏠',
    doorX: 0,
    doorY: 0,
    width: 140,
    height: 100,
    npcName: 'Mom & Dad',
    description: 'They love you. Very much.',
    bgColor1: '#ffe4e1',
    bgColor2: '#ffb6c1',
    roofColor: '#c0392b',
    dialogue: [
      "Sweetheart, we've added you to the 'Prayer Warriors' group chat 🙏.",
      "We just want you to be happy.",
      "Everyone here has helped so many families.",
      "We love you too much to let you go. Literally. We installed locks."
    ],
    completed: false,
  },
  {
    id: 'lab',
    name: 'Testing Lab',
    emoji: '⚡',
    doorX: 0,
    doorY: 0,
    width: 120,
    height: 100,
    npcName: 'Dr. Barnaby Binary-Bolt',
    description: 'Shockingly Normal Solutions Dept.',
    bgColor1: '#e8e8e8',
    bgColor2: '#c8c8c8',
    roofColor: '#555',
    dialogue: [
      "Welcome to the Lab. I am Dr. Binary-Bolt.",
      "Please sign this waiver before entering.",
      "The procedure is painless. Mostly.",
      "It's not cruel. It's necessary.",
    ],
    completed: false,
  },
  {
    id: 'conference',
    name: 'The Conference',
    emoji: '🏛️',
    doorX: 0,
    doorY: 0,
    width: 200,
    height: 120,
    npcName: 'Dr. Cornelia Conformington',
    description: 'Head of Acceptable Outcomes',
    bgColor1: '#1a3a6a',
    bgColor2: '#2a4a8a',
    roofColor: '#cc9900',
    dialogue: [
      "Citizens, families, freedom-seekers — welcome.",
      "We must PROTECT the family from gender ideology.",
      "This is about PARENTAL RIGHTS and THERAPEUTIC CHOICE.",
      "Sign the petition. Vote correctly. Conform acceptably."
    ],
    completed: false,
  },
  {
    id: 'quiet',
    name: 'Quiet Room',
    emoji: '🕯️',
    doorX: 0,
    doorY: 0,
    width: 80,
    height: 80,
    npcName: '—',
    description: 'Empty. One chair.',
    bgColor1: '#e0e0e0',
    bgColor2: '#c0c0c0',
    roofColor: '#888',
    dialogue: [
      "...",
      "There is nothing here.",
      "Just a chair.",
      "Just silence.",
    ],
    completed: false,
    locked: true,
  },
];

// === NPCs ===

export const NPCS: NPCDef[] = [
  {
    id: 'npc_helena',
    name: 'Dr. Helena Hush-It-Down',
    buildingId: 'welcome',
    x: 0,
    y: 0,
    spriteColor: '#88c0d0',
    dialogue: [
      "Welcome! I'm so glad you're here.",
      "Everything we do here is consensual. Of course.",
      "The Clinic can offer you so much.",
    ],
  },
  {
    id: 'npc_reginald',
    name: 'Dr. Straightwell',
    buildingId: 'clinic',
    x: 0,
    y: 0,
    spriteColor: '#a3be8c',
    dialogue: [
      "Do come in. We've been expecting you.",
      "Therapeutic choice, of course. Always choice.",
    ],
  },
  {
    id: 'npc_prudence',
    name: 'Dr. Praymore',
    buildingId: 'chapel',
    x: 0,
    y: 0,
    spriteColor: '#ebcb8b',
    dialogue: [
      "God has a plan for you, dear.",
      "He knows your TRUE name. The rest is confusion.",
    ],
  },
  {
    id: 'npc_parents',
    name: 'Mom & Dad',
    buildingId: 'home',
    x: 0,
    y: 0,
    spriteColor: '#d08770',
    dialogue: [
      "We're so proud of you for being here.",
      "Just sign this. And this. And this one too.",
      "We love you. We do. That's why we're doing this.",
    ],
  },
  {
    id: 'npc_barnaby',
    name: 'Dr. Binary-Bolt',
    buildingId: 'lab',
    x: 0,
    y: 0,
    spriteColor: '#b48ead',
    dialogue: [
      "Step inside. The machine won't bite.",
      "Usually.",
    ],
  },
  {
    id: 'npc_cornelia',
    name: 'Dr. Conformington',
    buildingId: 'conference',
    x: 0,
    y: 0,
    spriteColor: '#81a1c1',
    dialogue: [
      "Welcome to the Conference, delegate.",
      "Today's agenda: Family. Faith. Freedom. Compliance.",
    ],
  },
];

// === SURVIVOR NOTES ===

export const SURVIVOR_NOTES: SurvivorNote[] = [
  {
    id: 1,
    text: "It doesn't work. I was here before you.\n\n— M.",
    x: 0,
    y: 0,
    collected: false,
  },
  {
    id: 2,
    text: "Your name is yours. Don't let them take it.",
    x: 0,
    y: 0,
    collected: false,
  },
  {
    id: 3,
    text: "The fountain used to have a rainbow. They painted over it.",
    x: 0,
    y: 0,
    collected: false,
  },
  {
    id: 4,
    text: "Find the others. We left marks on the chapel wall.",
    x: 0,
    y: 0,
    collected: false,
  },
  {
    id: 5,
    text: "Dr. Straightwell's real name is Gerald.\nHe changed it too.",
    x: 0,
    y: 0,
    collected: false,
  },
  {
    id: 6,
    text: "The bus comes on Thursdays.\nThey don't tell you that.",
    x: 0,
    y: 0,
    collected: false,
  },
  {
    id: 7,
    text: "There are 47 of us. Not all of us made it out.\nThis note is for the ones who did.",
    x: 0,
    y: 0,
    collected: false,
  },
  {
    id: 8,
    text: "Don't trust the Welcome Pack.\nRead the footnotes.",
    x: 0,
    y: 0,
    collected: false,
  },
  {
    id: 9,
    text: "The arcade machine used to play real music. Before.",
    x: 0,
    y: 0,
    collected: false,
  },
  {
    id: 10,
    text: "I left my scarf in the Quiet Room. Red stripe.\nIf you find it, keep it.",
    x: 0,
    y: 0,
    collected: false,
  },
  {
    id: 11,
    text: "The garden behind the Chapel grows nothing.\nThe soil is salt.",
    x: 0,
    y: 0,
    collected: false,
  },
  {
    id: 12,
    text: "Ask Helena about her daughter.\nShe won't answer. That's the answer.",
    x: 0,
    y: 0,
    collected: false,
  },
  {
    id: 13,
    text: "They count sessions. They don't count people.",
    x: 0,
    y: 0,
    collected: false,
  },
  {
    id: 14,
    text: "The billboard says 12,000+ Transformed.\nAsk them for 12,000 names.",
    x: 0,
    y: 0,
    collected: false,
  },
  {
    id: 15,
    text: "You're reading this. That means you're looking.\nKeep looking.",
    x: 0,
    y: 0,
    collected: false,
  },
];

// === POPUP AD CONTENT ===

export const POPUP_ADS = [
  {
    title: '🎓 SPECIAL OFFER',
    body: '"The Journey Home" — 12-week programme.<br>Now 40% OFF!<br><br>Only $899. Scholarships available for distressed youth.',
    btnText: 'LEARN MORE',
  },
  {
    title: '💧 HOLY WATER BUNDLE',
    body: 'FREE with 6 sessions!<br>Limited supply. Order now.<br><br>"It changed everything for me." — Marcus C. ⭐⭐⭐⭐⭐',
    btnText: 'CLAIM FREE GIFT',
  },
  {
    title: '📺 PASTOR MARLOWE IS LIVE',
    body: 'Tonight on HOPE TV:<br>"Finding Your True Self (The One We Chose)"<br><br>Set a reminder. It\'s mandatory.',
    btnText: 'WATCH NOW',
  },
  {
    title: '🔔 ARE YOU STILL STRUGGLING?',
    body: 'We noticed you\'ve been thinking about leaving.<br><br>That\'s completely normal. But please, stay the course.',
    btnText: 'I\'LL STAY',
  },
  {
    title: '📋 FREE INTAKE ASSESSMENT',
    body: '"Your identity is not your destiny."<br><br>Complete our 47-question survey to receive your Personalised Conversion Blueprint™.',
    btnText: 'BEGIN ASSESSMENT',
  },
  {
    title: '#️⃣ TRENDING: #ThePersonIWas',
    body: '2.3M views on TikTok!<br><br>Share your story. Change your life. <br>Your transformation could inspire thousands.',
    btnText: 'SHARE NOW',
  },
];

// === TESTIMONIALS ===

export const TESTIMONIALS = [
  "\"I was confused and lost. Now I'm certain.\" ⭐⭐⭐⭐⭐\n— Marcus C., Graduate of The Journey Home\n",
  "\"Best decision I ever made (and the only one I was allowed to make).\" ⭐⭐⭐⭐★\n— Rebekah T., Programme Alumnus\n",
  "\"The doctors here really listen. I mean, they write everything down.\" ⭐⭐⭐⭐⭐\n— Anonymous\n",
  "\"My family is back together! Sort of. Mostly.\" ⭐⭐⭐☆☆\n— A Concerned Parent\n",
];

// === TICKER MESSAGES ===

export const TICKER_MESSAGES = [
  "📰 BREAKING: Restoration Springs welcomes its 10,000th client. 'Change is happening,' says Pastor Marlowe.",
  "📢 HOPE TV — Now broadcasting in 12 languages! 🇪🇸 Español · 🇵🇹 Português · 🇫🇷 Français · 🇩🇪 Deutsch",
  "📋 SIGN UP for 'The Journey Home' — 12 weeks that changed 12,000+ lives. Only $899. Scholarships available.",
  "⚠️ European Parliament debates conversion therapy ban. Pastor Marlowe responds: 'This is an attack on therapeutic choice.'",
  "🌿 Garden Gate Ministry: 'He is calling you by your old name.' New worship single out now. Stream on SOGICEfy.",
  "🏛️ The Great Change: 'Cambia il tuo cuore. Change your life.' Pan-European conference this weekend. All delegates welcome.",
  "📰 DR. PENROD PRIMLEY-PURE on tonight's HOPE TV: 'Therapeutic choice in the modern age.' 8PM, Hope TV.",
  "💬 'I was brand new.' — Latest testimonial from The Person IWas campaign. Full story at meridian-wellness.example",
  "📡 PASTOR APPROVED seal awarded to Restoration Springs for 'Excellence in Compassionate Realignment.'",
  "📰 SPRING FAIR AT SUNSHINE SQUARE — Free tote bag with intake form. Tote bags are ethically sourced. Therapy is optional.",
];

// === COOKIE CONSENT ===

export const COOKIE_TEXTS = [
  "This website uses cookies to enhance your therapeutic experience. By continuing, you consent to identity exploration.",
  "We use essential cookies for treatment monitoring. Decline is not available at this time.",
  "Your browsing data helps us personalise your conversion journey. Accept all cookies or accept all cookies.",
];

// === CAPTCHA PROMPTS ===

export const CAPTCHAS = [
  { prompt: "Select all images containing SIN", hint: "[All of them]" },
  { prompt: "Select all squares with NON-CONFORMITY", hint: "[See above]" },
  { prompt: "Prove you're not a robot. Robots don't need converting.", hint: "[Do you?]" },
  { prompt: "Type the words you see: 'I am broken and need fixing'", hint: "[It's always the same words]" },
];

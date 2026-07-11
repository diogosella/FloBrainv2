/* eslint-disable */
// FloBrain V2 sample data — ported verbatim from the original standalone build.
// Types are declared in data/types.ts; these arrays are cast where imported.

export const VENTURES = [
  {id:'space-ventures',name:'Space ventures',icon:'rocket'},{id:'caipo',name:'CAIPO',icon:'cpu'},
  {id:'moodchanger',name:'MoodChanger',icon:'drama'},{id:'robocollective',name:'RoboCollective',icon:'robot'},
  {id:'healthbuddy',name:'HealthBuddy',icon:'heartbeat'},{id:'api',name:'Athletic performance intelligence',icon:'activity'},
  {id:'bootcamp',name:'Innovation bootcamp',icon:'grad'}
];

export const TOOL_CATALOG = [
  {id:'claude',name:'Claude',icon:'bot',url:'https://claude.ai'},
  {id:'figma',name:'Figma',icon:'figma',url:'https://figma.com'},
  {id:'canva',name:'Canva',icon:'palette',url:'https://canva.com'},
  {id:'cursor',name:'Cursor',icon:'term',url:'https://cursor.com'},
  {id:'notion',name:'Notion',icon:'note',url:'https://notion.so'},
  {id:'discord',name:'Discord',icon:'msg',url:'https://discord.com'},
  {id:'github',name:'GitHub',icon:'github',url:'https://github.com'}
];

export const ROOMS = [
  {id:'design',name:'Design room',icon:'palette',color:'#7C5CFF',unread:3,active:2},
  {id:'data',name:'Data analytics room',icon:'chart',color:'#3DB8A8',unread:0,active:1},
  {id:'legal',name:'Legal room',icon:'scale',color:'#8B7EC8',unread:1,active:0},
  {id:'mood',name:'MoodChanger room',icon:'drama',color:'#D98A4A',unread:2,active:3},
  {id:'space',name:'Space team room',icon:'rocket',color:'#6B7FD7',unread:5,active:1},
  {id:'qa',name:'QA · Boot camp',icon:'checkmark',color:'#3DB8A8',unread:0,active:0},
  {id:'general',name:'General',icon:'hash',color:'#6E7280',unread:1,active:0}
];

export const BUDDIES = {
  travel:{name:'Travel buddy',icon:'plane',color:'var(--buddy-travel)',domain:'Trips & itineraries',prompts:['Draft a Dubai itinerary','My upcoming trips','Check travel plans']},
  data:{name:'Data buddy',icon:'chart',color:'var(--buddy-data)',domain:'Analytics & insights',prompts:['This week\'s key metrics','Where are we trending down?']},
  finance:{name:'Finance buddy',icon:'wallet',color:'var(--buddy-finance)',domain:'Budgets & payments',prompts:['Current budget vs. spend','Outstanding payments']},
  legal:{name:'Legal buddy',icon:'scale',color:'var(--buddy-legal)',domain:'Compliance & ethics',prompts:['Review the latest contract','Pending compliance items']},
  space:{name:'Space buddy',icon:'rocket',color:'var(--buddy-space)',domain:'Missions & research',prompts:['Status of active missions','Latest research highlights']},
  vault:{name:'Vault buddy',icon:'db',color:'var(--buddy-vault)',domain:'Files & versions',prompts:['What changed in this file?','Find the latest wireframe']},
  health:{name:'Health buddy',icon:'heartbeat',color:'var(--buddy-health)',domain:'Wellness & vitals',prompts:['Summarize my latest vitals','Any wellness flags this week?']},
  design:{name:'Design buddy',icon:'palette',color:'var(--buddy-design)',domain:'Design ops · Figma & handoff',prompts:[]}
};

export const CLAUDE_DESIGN = {
  id: 'claude-design',
  name: 'Claude Design',
  icon: 'claude',
  color: '#D4A04A',
  desc: 'Design-scoped Claude — critique, tokens, copy & handoff via chat',
  api: 'Anthropic API',
  status: 'Active',
  chat: true
};

export const ROOM_MESSAGES = {
  design:[
    {who:'Dina Tarek',t:'2h ago',text:'Pushed the FloBrain V2 Figma to the shared link. Can everyone review the 3-column layout?'},
    {who:'Diogo Sela',t:'1h ago',text:'Looking at it now — the violet ramp looks great on dark!'},
    {who:'Ceren',t:'45m ago',text:'Updated color scales in the design system. Can you review before Thursday?',reactions:['👍 3','👀 1']},
    {who:'Sandeep',t:'30m ago',text:'Priority this week: Space VI + Legal VI redesigns. Bernard demo Friday 2pm UTC.',reactions:['🚀 4']}
  ],
  data:[{who:'Sandeep',t:'3h ago',text:'Strapi DB sync — 10 missing internship entries. Data Buddy suggests auto-fill.'}],
  legal:[{who:'Priya Nair',t:'5h ago',text:'Need redline on the partnership MOU before Wed.'},{who:'Legal buddy',t:'4h ago',text:'Drafted v1 — section 4 has open questions.'}],
  mood:[{who:'Kendra Avery',t:'3h ago',text:'MoodChanger AI tone of voice draft — feedback welcome.'}],
  space:[{who:'Meryll Robles',t:'2h ago',text:'NASA Artemis hero shots integrated. Crediting per usage guidelines.'},{who:'Muhammad',t:'1h ago',text:'Bernard call confirmed for Friday 2pm UTC.'}],
  qa:[{who:'Sandeep',t:'2h ago',text:'Flagged 3 layout issues on /courses — see thread below.'}],
  general:[{who:'Deeksha',t:'1d ago',text:'New Friday tradition: 5pm demo + Flokin awards 🎉'}]
};

export const TASKS = [
  {id:'t1',title:'Space venture institute redesign',col:'todo',pri:'high',due:'Friday',assignees:['DT','KA'],desc:'Refresh hero, integrate NASA Artemis images, ensure attribution.',room:'space'},
  {id:'t2',title:'Legal venture institute redesign',col:'todo',pri:'high',due:'Wed',assignees:['PN'],desc:'Restructure case studies + add new practice areas page.',room:'legal'},
  {id:'t3',title:'Bootcamp university — finalize messaging',col:'todo',pri:'med',due:'Wed',assignees:['CR','DG'],desc:'Bring back Resources tab + student handbook copy review.',room:'qa'},
  {id:'t4',title:'MoodChanger AI redesign',col:'todo',pri:'med',due:'Wed',assignees:['SC','DK'],desc:'Tone of voice + new home page treatment.',room:'mood'},
  {id:'t5',title:'Update design system tokens',col:'todo',pri:'high',due:'Jul 3',assignees:['DS'],desc:'Apply Dina color scales to FloBrain V2 tokens.',room:'design'},
  {id:'t7',title:'FloBrain V2 mockup',col:'progress',pri:'high',due:'Ongoing',assignees:['DS','DG'],desc:'3-column cockpit + speed dial + chat dock.',room:'design'},
  {id:'t8',title:'Strapi DB — fix missing internship entries',col:'progress',pri:'med',due:'Today',assignees:['MA'],desc:'25/35 entries synced.',room:'general'},
  {id:'t10',title:'Space VI NASA images — credit attribution',col:'progress',pri:'med',due:'EOD',assignees:['CR'],desc:'Audit all images for proper credit line.',room:'space'},
  {id:'t11',title:'RoboCollective site — all-company QA review',col:'done',pri:'med',due:'Done',assignees:['MH','CR'],desc:'14 members reviewed.',room:'general'},
  {id:'t12',title:'Submit brainwriting idea',col:'done',pri:'low',due:'Done',assignees:['DS'],desc:'AI-powered design review assistant approved.',room:'design'}
];

export const SUBTASKS = {
  t7:[{id:'s1',text:'Build global shell',done:true},{id:'s2',text:'Spaces speed dial',done:true},{id:'s3',text:'Chat dock',done:true},{id:'s4',text:'Health buddy dashboard',done:false},{id:'s7',text:'Design buddy workspace',done:true}],
  t5:[{id:'s5',text:'Color tokens',done:false},{id:'s6',text:'Typography scale',done:false}]
};

export const DOCS = [
  {id:'d1',cat:'Meeting notes',title:'Onboarding guide — FloLabs internship',editor:'Kendra Avery',edited:'2 days ago',status:'Draft'},
  {id:'d2',cat:'Processes',title:'How to use Claude + Cursor workflow',editor:'Muhammad',edited:'4 hours ago',status:'Draft'},
  {id:'d3',cat:'Projects',title:'Bootcamp university — messaging guide',editor:'Ceren',edited:'1 day ago',status:'In Review'},
  {id:'d4',cat:'Projects',title:'Space venture institute — NASA image credits',editor:'Meryll Robles',edited:'Today',status:'Draft'},
  {id:'d5',cat:'Processes',title:'Design system color scales',editor:'Dina Tarek',edited:'Today',status:'In Review'},
  {id:'d6',cat:'Resources',title:'AI tools overview: Claude vs ChatGPT vs Cursor',editor:'Muhammad',edited:'1 week ago',status:'Approved'},
  {id:'d7',cat:'Meeting notes',title:'Design review — Mar 12, 2026',editor:'Dina Tarek',edited:'2 weeks ago',status:'Approved'},
  {id:'d8',cat:'Resources',title:'Commission & referral program — how to earn',editor:'Sandeep',edited:'5 days ago',status:'Draft'}
];

export const TIMER_ENTRIES = [
  {session:'Design review',duration:'02:14:32',date:'Jul 1'},{session:'FloBrain V2 build',duration:'04:38:10',date:'Jun 30'},
  {session:'Design system audit',duration:'01:45:00',date:'Jun 30'},{session:'Masterclass module 3',duration:'03:12:45',date:'Jun 29'}
];

export const ACCOUNTS = [
  {name:'Diogo Sela',email:'diogo@flolabs.com',init:'DS',active:true},
  {name:'Sandeep',email:'sandeep@flolabs.com',init:'SC',active:false}
];

export const MC_ALERTS = [
  {type:'danger',title:'Space venture institute',desc:'Due Friday · 2 sections still in draft.',t:'1 hr ago'},
  {type:'warn',title:'Bootcamp university',desc:'QA pending · 3 layout issues on /courses.',t:'14 min ago'},
  {type:'info',title:'Strapi DB sync',desc:'10 missing internship entries.',t:'3 hrs ago'},
  {type:'warn',title:'Friday meeting w/ Bernard',desc:'Confirm attendees + Zoom link by Thu EOD.',t:'5 hrs ago'}
];

export const SPACES = [
  {id:'design-room',name:'Meeting rooms',icon:'videocam',live:'2 active now',color:'var(--accent)',nav:'rooms'},
  {id:'teams-card',name:'Teams',icon:'users',live:'35 teams',color:'#3DB8A8',nav:'personal',ps:'teams',noIconBg:true},
  {id:'design-buddy',name:'Design buddy',icon:'palette',live:'Tokens sync ready',color:'var(--buddy-design)',nav:'buddy',buddy:'design'},
  {id:'health',name:'Health buddy',icon:'heartbeat',live:'Wellness score 82',color:'var(--buddy-health)',nav:'buddy',buddy:'health'},
  {id:'travel',name:'Travel buddy',icon:'plane',live:'Drafting Dubai trip',color:'var(--buddy-travel)',nav:'buddy',buddy:'travel'},
  {id:'data',name:'Data buddy',icon:'chart',live:'Weekly report ready',color:'var(--buddy-data)',nav:'buddy',buddy:'data'},
  {id:'legal',name:'Legal buddy',icon:'scale',live:'1 contract pending',color:'var(--buddy-legal)',nav:'buddy',buddy:'legal'},
  {id:'vault',name:'Vault',icon:'db',live:'3 files to review',color:'var(--buddy-vault)',nav:'vault'},
  {id:'masterclasses',name:'Masterclasses',icon:'grad',live:'Workshops, brainwriting & guided learning',color:'var(--buddy-finance)',nav:'masterclasses'},
  {id:'library',name:'Library',icon:'book',live:'Reference & learning',color:'var(--text-3)',nav:'personal',ps:'library'},
  {id:'calendar',name:'Calendar',icon:'cal',live:'Design review Thu 2pm',color:'var(--buddy-travel)',nav:'personal',ps:'calendar'},
  {id:'leaderboard',name:'Leaderboard',icon:'trophy',live:'You\'re #4',color:'var(--warn)',nav:'personal',ps:'leaderboard'}
];

export const TEAM = [
  {name:'Diogo Sela',init:'DS',role:'Design intern',status:'online',color:'#7C5CFF'},
  {name:'Dina Tarek',init:'DT',role:'Lead designer',status:'online',color:'#5B9BD5'},
  {name:'Kendra Avery',init:'KA',role:'Product intern',status:'online',color:'#D4A04A'},
  {name:'Meryll Robles',init:'MR',role:'Engineering intern',status:'away',color:'#6B7FD7'},
  {name:'Mohamed Abdelmohsen',init:'MA',role:'Developer',status:'online',color:'#3DB8A8'},
  {name:'Amara Okafor',init:'AO',role:'Research intern',status:'online',color:'#5CB87A'},
  {name:'Liam Chen',init:'LC',role:'Data analyst',status:'away',color:'#3DB8A8'},
  {name:'Marcus Lopez',init:'ML',role:'Engineering lead',status:'online',color:'#6B7FD7'},
  {name:'Priya Nair',init:'PN',role:'Legal counsel',status:'leave',color:'#8B7EC8'},
  {name:'Sam Rivera',init:'SR',role:'Marketing',status:'online',color:'#D4A04A'},
  {name:'Sandeep',init:'SC',role:'COO',status:'online',color:'#3DB8A8'},
  {name:'Muhammad',init:'MH',role:'CEO',status:'online',color:'#7C5CFF'},
  {name:'Rebecca',init:'RB',role:'HR lead',status:'away',color:'#D97777'},
  {name:'Deeksha',init:'DK',role:'Engineering',status:'online',color:'#6B7FD7'},
  {name:'Dan Garcia',init:'DG',role:'Design intern',status:'online',color:'#5B9BD5'},
  {name:'Ceren',init:'CR',role:'Design lead',status:'online',color:'#8B7EC8'}
];

export const TEAMS = [
  {
    "id": "administration",
    "name": "Administration",
    "desc": "Org operations and office management",
    "color": "#6B7FD7",
    "members": []
  },
  {
    "id": "automation",
    "name": "Automation",
    "desc": "Workflow automation and scripts",
    "color": "#3DB8A8",
    "members": []
  },
  {
    "id": "backend",
    "name": "Backend",
    "desc": "Server, APIs, and infrastructure",
    "color": "#6B7FD7",
    "members": [
      "Mohamed Abdelmohsen"
    ]
  },
  {
    "id": "bizdev",
    "name": "Business Dev",
    "desc": "Partnerships and growth strategy",
    "color": "#D4A04A",
    "members": []
  },
  {
    "id": "community",
    "name": "Community Management",
    "desc": "Community building and engagement",
    "color": "#E85D8C",
    "members": []
  },
  {
    "id": "cybersec",
    "name": "Cybersecurity",
    "desc": "Security, compliance, and privacy",
    "color": "#E26B6B",
    "members": []
  },
  {
    "id": "data",
    "name": "Data Analytics",
    "desc": "Data pipelines and insights",
    "color": "#3DB8A8",
    "members": [
      "Liam Chen"
    ]
  },
  {
    "id": "design",
    "name": "Design & UI/UX",
    "desc": "Product design, systems, and brand",
    "color": "#E85D8C",
    "members": [
      "Diogo Sela",
      "Dina Tarek",
      "Kendra Avery"
    ]
  },
  {
    "id": "finance",
    "name": "Finance",
    "desc": "Budgeting, accounting, and reporting",
    "color": "#D4A04A",
    "members": []
  },
  {
    "id": "frontend",
    "name": "Frontend",
    "desc": "Web interfaces and component systems",
    "color": "#7C5CFF",
    "members": [
      "Meryll Robles"
    ]
  },
  {
    "id": "fullstack",
    "name": "Full-Stack",
    "desc": "End-to-end product engineering",
    "color": "#8B6BFF",
    "members": []
  },
  {
    "id": "grants",
    "name": "Grant Writing",
    "desc": "Funding proposals and grant management",
    "color": "#45D483",
    "members": []
  },
  {
    "id": "hr",
    "name": "Human Resources",
    "desc": "People ops, hiring, and culture",
    "color": "#5CB87A",
    "members": []
  },
  {
    "id": "humanoid",
    "name": "Humanoid",
    "desc": "Robotics and humanoid AI systems",
    "color": "#6B7FD7",
    "members": []
  },
  {
    "id": "influencers",
    "name": "Influencers",
    "desc": "Creator partnerships and campaigns",
    "color": "#E85D8C",
    "members": []
  },
  {
    "id": "iot",
    "name": "Internet of Things",
    "desc": "Connected devices and embedded systems",
    "color": "#3DB8A8",
    "members": []
  },
  {
    "id": "legal",
    "name": "Legal & Ethics",
    "desc": "Contracts, compliance, and AI ethics",
    "color": "#8B7EC8",
    "members": []
  },
  {
    "id": "management",
    "name": "Management",
    "desc": "Leadership and cross-team coordination",
    "color": "#D4A04A",
    "members": [
      "Dina Tarek"
    ]
  },
  {
    "id": "marketing",
    "name": "Marketing",
    "desc": "Brand, campaigns, and content",
    "color": "#D98A4A",
    "members": []
  },
  {
    "id": "mechanical",
    "name": "Mechanical Engineering",
    "desc": "Hardware design and fabrication",
    "color": "#6E7280",
    "members": []
  },
  {
    "id": "mobile",
    "name": "Mobile Dev",
    "desc": "iOS and Android product development",
    "color": "#7C5CFF",
    "members": []
  },
  {
    "id": "moodchanger",
    "name": "MoodChanger",
    "desc": "Wellness and mood tracking platform",
    "color": "#D98A4A",
    "members": []
  },
  {
    "id": "multimodal",
    "name": "Multimodal Perception",
    "desc": "Vision, language, and sensor fusion",
    "color": "#6B7FD7",
    "members": []
  },
  {
    "id": "neuro",
    "name": "Neuroscience",
    "desc": "Cognitive science and brain-computer interfaces",
    "color": "#8B7EC8",
    "members": []
  },
  {
    "id": "operations",
    "name": "Operations",
    "desc": "Process, logistics, and execution",
    "color": "#6E7280",
    "members": []
  },
  {
    "id": "petscience",
    "name": "Pet Science",
    "desc": "Animal health and veterinary tech",
    "color": "#5CB87A",
    "members": []
  },
  {
    "id": "podcast",
    "name": "Podcast Production",
    "desc": "Audio content and distribution",
    "color": "#E85D8C",
    "members": []
  },
  {
    "id": "product",
    "name": "Product Development",
    "desc": "Roadmap, specs, and delivery",
    "color": "#7C5CFF",
    "members": [
      "Kendra Avery"
    ]
  },
  {
    "id": "projmgmt",
    "name": "Project Management",
    "desc": "Planning, sprints, and coordination",
    "color": "#D4A04A",
    "members": []
  },
  {
    "id": "qa",
    "name": "Quality Assurance",
    "desc": "Testing, bugs, and release quality",
    "color": "#45D483",
    "members": []
  },
  {
    "id": "quantum",
    "name": "Quantum",
    "desc": "Quantum computing research and algorithms",
    "color": "#A78BFF",
    "members": []
  },
  {
    "id": "recruitment",
    "name": "Recruitment",
    "desc": "Talent sourcing and hiring pipelines",
    "color": "#5CB87A",
    "members": []
  },
  {
    "id": "space",
    "name": "Space",
    "desc": "Space ventures engineering and ops",
    "color": "#6B7FD7",
    "members": [
      "Diogo Sela",
      "Dina Tarek"
    ]
  },
  {
    "id": "teamlead",
    "name": "Team Lead",
    "desc": "Cross-functional team leadership",
    "color": "#D4A04A",
    "members": [
      "Dina Tarek"
    ]
  },
  {
    "id": "uiux",
    "name": "UI/UX Design",
    "desc": "User experience research and design",
    "color": "#E85D8C",
    "members": [
      "Diogo Sela",
      "Kendra Avery"
    ]
  }
];


export const VAULT_FILES = [
  {name:'Design System v4.fig',type:'figma',owner:'Dina Tarek',project:'FloBrain',team:'Engineering',version:'v4',status:'Approved'},
  {name:'Vendor Requirements Brief.docx',type:'docx',owner:'Diogo Sela',project:'CAIPO',team:'Marketing',version:'v2',status:'In Review'},
  {name:'Space VI Pitch Deck.pdf',type:'pdf',owner:'Bernard',project:'Space VI',team:'Research',version:'v3',status:'Approved'},
  {name:'MoodChanger API Spec.js',type:'js',owner:'Meryll Robles',project:'MoodChanger',team:'Engineering',version:'v1.2',status:'WIP'},
  {name:'Health Data Pipeline.py',type:'py',owner:'Liam Chen',project:'HealthBuddy',team:'Research',version:'v2.1',status:'Approved'},
  {name:'Q1 Budget Tracker.xlsx',type:'xlsx',owner:'Sandeep',project:'CAIPO',team:'Operations',version:'v5',status:'Approved'},
  {name:'Standup Recording Mar 12.mp4',type:'video',owner:'Rebecca',project:'FloLabs',team:'Operations',version:'v1',status:'Approved'},
  {name:'Onboarding Flow Notes.html',type:'html',owner:'Diogo Sela',project:'FloBrain',team:'Marketing',version:'v3',status:'Pending'},
  {name:'Wireframe Dashboard v4.fig',type:'figma',owner:'Dina Tarek',project:'FloBrain',team:'Engineering',version:'v4',status:'In Review'},
  {name:'Compliance Checklist.pdf',type:'pdf',owner:'Priya Nair',project:'CAIPO',team:'Operations',version:'v1',status:'Rejected'}
];

export const CHAT_PEOPLE = [
  {id:'dina',name:'Dina Tarek',init:'DT',color:'#5B9BD5',type:'human',status:'online',msgs:[{from:'them',text:'Can you review the design system audit today?'},{from:'me',text:'On it! Should have feedback by EOD.'}]},
  {id:'sandeep',name:'Sandeep',init:'SC',color:'#3DB8A8',type:'human',status:'online',msgs:[{from:'them',text:'Great progress on the FloBrain V2 mockup.'}]},
  {id:'kendra',name:'Kendra Avery',init:'KA',color:'#D4A04A',type:'human',status:'online',msgs:[{from:'them',text:'Hey! Can you check the onboarding flow?'}]},
  {id:'meryll',name:'Meryll Robles',init:'MR',color:'#6B7FD7',type:'human',status:'away',msgs:[{from:'them',text:'MoodChanger API spec is up for review.'}]},
  {id:'mohamed',name:'Mohamed Abdelmohsen',init:'MA',color:'#3DB8A8',type:'human',status:'online',msgs:[{from:'them',text:'Strapi DB sync looks good on my end.'}]},
  {id:'ceren',name:'Ceren',init:'CR',color:'#8B7EC8',type:'human',status:'online',msgs:[{from:'them',text:'Updated color scales in the design system.'}]},
  {id:'marcus',name:'Marcus Lopez',init:'ML',color:'#6B7FD7',type:'human',status:'online',msgs:[{from:'them',text:'Build pipeline is green. Ready to deploy.'}]},
  {id:'travel-buddy',name:'Travel buddy',init:'plane',color:'var(--buddy-travel)',type:'buddy',msgs:[{from:'them',text:'I\'ve drafted your Dubai itinerary for Mar 18–24. Want me to send it to the team?'}]},
  {id:'vault-buddy',name:'Vault buddy',init:'db',color:'var(--buddy-vault)',type:'buddy',msgs:[{from:'them',text:'3 files need your review: Wireframe v4, Vendor Brief, and Onboarding Notes.'}]},
  {id:'design-buddy',name:'Design buddy',init:'palette',color:'var(--buddy-design)',type:'buddy',msgs:[{from:'them',text:'Design System v4 tokens are ready to sync. Wireframe v4 needs your review before Thursday.'}]}
];

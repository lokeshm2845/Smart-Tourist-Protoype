# Smart-Tourist-Protoype

smart-tourist-prototype/
│
├── mobile/          # React Native Expo app (Tourist App)
│   └── App.js
│
├── functions/       # Firebase Cloud Functions (backend alerts)
│   └── index.js
│
├── dashboard/       # React Web Dashboard for monitoring incidents
│   └── App.js
│
└── README.md        # Setup guide (this file)


git clone https://github.com/YOUR_USERNAME/smart-tourist-prototype.git
cd smart-tourist-prototype


cd mobile
npm install -g expo-cli   # if not installed
npm install
expo start


npm install -g firebase-tools
firebase login


cd functions
npm install
firebase init functions
firebase deploy --only functions


cd dashboard
npm install
npm start







# Smart Tourist Prototype

## Structure
- `mobile/` : Expo React Native app (Tourist App)
- `functions/` : Firebase Cloud Functions backend
- `dashboard/` : React Web Dashboard for monitoring
- `README.md` : Setup + Instructions

## Quick Start

### Mobile App
```bash
cd mobile
npm install
npm start
```

### Firebase Functions
```bash
cd functions
npm install
firebase deploy --only functions
```

### Dashboard
```bash
cd dashboard
npm install
npm start
```

---
This is a **prototype** meant for demo purposes.

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


git clone https://github.com/lokeshm2845/smart-tourist-prototype.git
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








npm install firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg3H4a6zBKI8snTNJjmTs8RDiY4jGhvH8",
  authDomain: "smart-tourist-fb915.firebaseapp.com",
  projectId: "smart-tourist-fb915",
  storageBucket: "smart-tourist-fb915.firebasestorage.app",
  messagingSenderId: "814981480733",
  appId: "1:814981480733:web:b8fdb70e0a9770a130e1f4",
  measurementId: "G-LZYTSKJ9L1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);




# Smart Tourist Final Prototype

This repo contains a runnable prototype with Firestore integration.

## Folders
- mobile: Expo React Native app
- functions: Firebase cloud functions (writes incidents)
- dashboard: React dashboard showing incidents

## Setup

1. Create a Firebase project and enable Firestore and Functions.
2. Obtain Firebase config for Web and React Native apps (apiKey, projectId, ...).

### Mobile
cd mobile
npm install
# Edit App.js and replace firebaseConfig with your project's config
expo start

### Functions
cd functions
npm install
# deploy functions with:
firebase deploy --only functions

### Dashboard
cd dashboard
npm install
# Edit dashboard/App.js firebaseConfig, then:
npm start

## Notes
- Replace all `REPLACE_ME` placeholders in firebaseConfig with your Firebase project's credentials.
- Mobile app writes incidents to Firestore collection 'incidents'.
- Functions provide a callable endpoint to write incidents (useful for other integrations).


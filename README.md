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

// dashboard/App.js
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
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

function App() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'incidents'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setIncidents(arr);
    });
    return () => unsub();
  }, []);

  return (
    <div style={{padding:20}}>
      <h1>Tourist Incident Dashboard</h1>
      <ul>
        {incidents.map(i => (
          <li key={i.id}>
            <b>{i.type}</b> — {i.digitalID?.id || 'No ID'} — {i.createdAt?.toDate?.()?.toString?.() || ''}
            <div>{JSON.stringify(i.details)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

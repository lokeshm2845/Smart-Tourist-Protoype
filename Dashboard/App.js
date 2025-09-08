// dashboard/App.js
import React, { useState } from 'react';

function App() {
  const [alerts, setAlerts] = useState([]);

  const simulateAlert = () => {
    const newAlert = { id: Date.now(), msg: "🚨 SOS Alert received!" };
    setAlerts([newAlert, ...alerts]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Tourist Incident Dashboard</h1>
      <button onClick={simulateAlert}>Simulate Alert</button>
      <ul>
        {alerts.map(a => <li key={a.id}>{a.msg}</li>)}
      </ul>
    </div>
  );
}

export default App;

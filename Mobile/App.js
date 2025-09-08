import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';

export default function App() {
  const [inside, setInside] = useState(false);

  const toggleGeoFence = () => {
    setInside(!inside);
    Alert.alert(inside ? "Exited Zone" : "Entered Zone");
  };

  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <Text>Smart Tourist App</Text>
      <Button title="Simulate GeoFence" onPress={toggleGeoFence} />
      <Button title="Send SOS" onPress={() => Alert.alert("SOS Sent")} />
    </View>
  );
}

import { generateDigitalID } from './blockchainID';

const [digitalID, setDigitalID] = useState(null);

<Button 
  title="Generate Digital ID" 
  onPress={() => setDigitalID(generateDigitalID("John Doe"))} 
/>

{digitalID && (
  <Text>Digital ID: {digitalID.id}</Text>
)}

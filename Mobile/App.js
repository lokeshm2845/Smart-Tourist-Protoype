// mobile/App.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as Location from 'expo-location';
import { Accelerometer } from 'expo-sensors';
import { generateDigitalID } from './blockchainID';

export default function App() {
  const [geoFence, setGeoFence] = useState(false);
  const [digitalID, setDigitalID] = useState(null);

  // Live location tracking + Geo-fence
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location denied');
        return;
      }

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 },
        (loc) => {
          console.log("Current location:", loc.coords);

          // Example danger zone (Mumbai coords)
          const dangerZone = { lat: 19.0760, lng: 72.8777 };
          const distance = Math.sqrt(
            Math.pow(loc.coords.latitude - dangerZone.lat, 2) +
            Math.pow(loc.coords.longitude - dangerZone.lng, 2)
          );

          if (distance < 0.01) {
            Alert.alert("⚠️ Warning", "You entered a danger zone!");
            setGeoFence(true);
          } else {
            setGeoFence(false);
          }
        }
      );
    })();
  }, []);

  // Fall detection (AI simulation with accelerometer)
  useEffect(() => {
    Accelerometer.setUpdateInterval(500);
    const subscription = Accelerometer.addListener(accel => {
      const { x, y, z } = accel;
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      if (magnitude > 2.5) {
        Alert.alert("🚨 Emergency", "Possible fall detected!");
      }
    });
    return () => subscription && subscription.remove();
  }, []);

  const sendSOS = () => {
    Alert.alert("🚨 SOS", "SOS alert sent!");
    // TODO: Call Firebase function to notify authorities
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Tourist Safety App</Text>

      <Button title="Send SOS" onPress={sendSOS} />
      <Button title="Generate Digital ID" onPress={() => setDigitalID(generateDigitalID("John Doe"))} />

      {digitalID && (
        <Text style={styles.text}>Digital ID: {digitalID.id}</Text>
      )}

      <Text style={styles.text}>
        GeoFence Status: {geoFence ? "⚠️ Danger Zone" : "✅ Safe"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20
  },
  title: {
    fontSize: 22, fontWeight: 'bold', marginBottom: 20
  },
  text: {
    marginTop: 10, fontSize: 14
  }
});

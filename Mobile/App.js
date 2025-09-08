import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, Platform } from 'react-native';
import * as Location from 'expo-location';
import { Accelerometer } from 'expo-sensors';
import * as SecureStore from 'expo-secure-store';
import { generateDigitalID } from './blockchainID';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Constants from 'expo-constants';

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [geoFence, setGeoFence] = useState(false);
  const [digitalID, setDigitalID] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required');
        return;
      }
      await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 5 },
        (loc) => {
          // simple radial geofence around demo coords
          const dangerZone = { lat: 19.0760, lng: 72.8777 };
          const lat = loc.coords.latitude, lng = loc.coords.longitude;
          const distance = Math.sqrt(Math.pow(lat - dangerZone.lat, 2) + Math.pow(lng - dangerZone.lng, 2));
          if (distance < 0.01) {
            if (!geoFence) {
              setGeoFence(true);
              sendIncident('geofence_enter', { note: 'Entered danger zone', lat, lng });
              Alert.alert('⚠️ Geofence', 'You entered a danger zone');
            }
          } else {
            if (geoFence) {
              setGeoFence(false);
              sendIncident('geofence_exit', { note: 'Left danger zone', lat, lng });
            }
          }
        }
      );
    })();
  }, [geoFence]);

  useEffect(() => {
    Accelerometer.setUpdateInterval(500);
    const sub = Accelerometer.addListener(accel => {
      const { x, y, z } = accel;
      const magnitude = Math.sqrt(x*x + y*y + z*z);
      if (magnitude > 2.7) {
        sendIncident('fall', { magnitude });
        Alert.alert('🚨 Fall detected', `magnitude ${magnitude.toFixed(2)}`);
      }
    });
    return () => sub && sub.remove();
  }, []);

  async function sendIncident(type, details={}) {
    try {
      const docRef = await addDoc(collection(db, 'incidents'), {
        type,
        details,
        createdAt: serverTimestamp(),
        digitalID,
      });
      console.log('Incident written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding incident', e);
    }
  }

  const handleSOS = async () => {
    Alert.alert('SOS', 'Sending SOS to dashboard');
    await sendIncident('sos', { note: 'User pressed SOS' });
  };

  const handleGenID = async () => {
    const id = generateDigitalID('Demo User');
    setDigitalID(id);
    // optionally store in secure store
    await SecureStore.setItemAsync('digital_id', JSON.stringify(id));
    Alert.alert('Digital ID generated', id.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Tourist Safety App</Text>
      <Button title="Send SOS" onPress={handleSOS} />
      <View style={{height:12}} />
      <Button title="Generate Digital ID" onPress={handleGenID} />
      {digitalID && <Text style={styles.text}>Digital ID: {digitalID.id}</Text>}
      <Text style={styles.text}>GeoFence Status: {geoFence ? '⚠️ Danger Zone' : '✅ Safe'}</Text>
      <Text style={styles.small}>Firebase Project: {firebaseConfig.projectId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,alignItems:'center',justifyContent:'center',padding:20},
  title:{fontSize:22,fontWeight:'bold',marginBottom:20},
  text:{marginTop:10,fontSize:14},
  small:{marginTop:6,fontSize:11,color:'#666'}
});


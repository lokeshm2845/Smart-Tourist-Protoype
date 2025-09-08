// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Log alerts to Firebase
exports.sendAlert = functions.https.onCall(async (data, context) => {
  console.log("🚨 Alert received:", data);
  return { success: true };
});

// Future: Push Notifications
/*
exports.sendSOS = functions.https.onCall(async (data, context) => {
  const message = {
    notification: {
      title: "🚨 SOS Alert!",
      body: `Tourist at ${data.location} needs help!`,
    },
    token: data.deviceToken,
  };
  await admin.messaging().send(message);
  return { success: true };
});
*/

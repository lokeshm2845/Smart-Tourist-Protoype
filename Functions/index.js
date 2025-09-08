const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// HTTPS callable that writes an incident to Firestore (for external callers)
exports.sendAlert = functions.https.onCall(async (data, context) => {
  const db = admin.firestore();
  try {
    const docRef = await db.collection('incidents').add({
      type: data.type || 'unknown',
      details: data.details || {},
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      digitalID: data.digitalID || null
    });
    return { success: true, id: docRef.id };
  } catch (e) {
    console.error('Error writing incident', e);
    return { success: false, error: String(e) };
  }
});

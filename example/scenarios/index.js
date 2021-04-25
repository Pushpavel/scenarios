const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = admin.initializeApp();
const firestore = app.firestore();

exports.scenario1 = functions.https.onCall(() => {
    firestore.doc('col1/doc1').set({
        'scenario1-field': '🔥',
    })
});


exports.scenario2 = functions.https.onCall(() => {
    firestore.doc('col2/doc2').set({
        'scenario2-field': '😃',
    })
});

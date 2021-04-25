const functions = require("firebase-functions");

exports.someFunction = functions.https.onCall(() => {
    console.log('Hello World')
});

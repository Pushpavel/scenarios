const firebase = require("firebase/app");
require('firebase/functions')


const app = firebase.initializeApp({projectId: 'myapp'});
const functions = app.functions();
functions.useEmulator('localhost', process.argv[3] ?? 5001);
functions.httpsCallable(process.argv[2])({});

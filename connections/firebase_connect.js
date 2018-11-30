var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyA51URP4GCaISanXYdhDolbTyWihmsdrcY",
    authDomain: "project-0815.firebaseapp.com",
    databaseURL: "https://project-0815.firebaseio.com",
    projectId: "project-0815",
    storageBucket: "project-0815.appspot.com",
    messagingSenderId: "982301188795"
  };

firebase.initializeApp(config);

module.exports = firebase;


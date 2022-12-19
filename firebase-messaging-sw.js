importScripts('https://www.gstatic.com/firebasejs/7.6.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.2/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyDajxBjtXlOvpowSpUUwlWUGBg3yCL1Y1U",
  authDomain: "flinta2020-3229c.firebaseapp.com",
  databaseURL: "https://flinta2020-3229c.firebaseio.com",
  projectId: "flinta2020-3229c",
  storageBucket: "flinta2020-3229c.appspot.com",
  messagingSenderId: "711013629265",
  appId: "1:711013629265:web:f4f1d80ab3566bc0cbe770",
  measurementId: "G-0N78DNWHZW"
});

const messaging = firebase.messaging();

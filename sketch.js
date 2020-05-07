"use strict";
// template for firebase

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = "chatMessages"; // name of folder you create in db
let input;
let sendBtn;
let chatsLoaded = false;


function setup() {

  noCanvas();

  // Initialize firebase
  // support for Firebase Realtime Database 4 web here: https://firebase.google.com/docs/database/web/start
  // Copy and paste your config here (replace object commented out)
  // ---> directions on finding config below

  input = select('#input');
  sendBtn = select('#sendBtn');

  input.changed(sendMessage);
  sendBtn.mousePressed(sendMessage);

  let config = {
    apiKey: "AIzaSyDJdRoS4rYe5hMwf8_LNWrEF0NLC3fKsS8",
    authDomain: "text-me-dc031.firebaseapp.com",
    databaseURL: "https://text-me-dc031.firebaseio.com",
    projectId: "text-me-dc031",
    storageBucket: "text-me-dc031.appspot.com",
    messagingSenderId: "232930402370",
    appId: "1:232930402370:web:0524cc10c396f9ebf70ddb",
    measurementId: "G-24F36V4RC2"
  };

  firebase.initializeApp(config);

  database = firebase.database();

  // this references the folder you want your data to appear in
  let ref = database.ref(folderName);
  // **** folderName must be consistant across all calls to this folder

  ref.on('value', gotData, errData);
}

function draw() {

}

function sendMessage() {

  let timestamp = Date.now();
  let chatObject = {
    message: input.value(),
    timestamp: timestamp,
  }

  createNode(folderName, timestamp, chatObject);
  input.value('');
}


function displayPastChats() {
  let length = fbDataArray.length;

  for (let i = 0; i < length; i++) {
    let p = createP(fbDataArray[i].message);
  }

}

function displayLastChat() {
  let index = fbDataArray.length - 1;
  let p = createP(fbDataArray[index].message);
}

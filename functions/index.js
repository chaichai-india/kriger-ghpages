const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.universal = functions
  .runWith({ memory: "1GB" })
  .https.onRequest((request, response) => {
    require(`${process.cwd()}/dist/kriger-campus-website-webpack/server`).app(
      request,
      response
    );
  });

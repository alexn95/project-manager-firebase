"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const projects_functions_1 = require("./projects-functions");
const functions = require('firebase-functions'); // The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const admin = require('firebase-admin'); // The Firebase Admin SDK to access the Firebase Realtime Database.
admin.initializeApp(functions.config().firebase);
const db = admin.database();
const projectsFunctions = new projects_functions_1.ProjectsFunctions(db);
// Start writing Firebase Functions
exports.searchProjects = functions.https.onRequest((request, response) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    projectsFunctions.searchProjects().subscribe((res) => response.status(200).send(res));
});
//# sourceMappingURL=index.js.map
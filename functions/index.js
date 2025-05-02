const functions = require('firebase-functions');
const { Nuxt } = require('nuxt');
const express = require('express');
const app = express();

// Import Nuxt config
const config = require('./nuxt.config.js');
config.dev = false;  // Disable dev mode in production

// Initialize Nuxt
const nuxt = new Nuxt(config);

app.use(nuxt.render);

exports.ssrApp = functions.https.onRequest(app);

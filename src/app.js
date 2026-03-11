const express = require('express');
const app = express();
const apiRoutes = require('./routes/Routes');

app.use(express.json());
app.use(apiRoutes);

module.exports = app;
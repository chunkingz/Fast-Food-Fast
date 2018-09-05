import express from 'express';
const bodyParser = require("body-parser");
const app = express();

import router from './routes/routes.js';

// define middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

// start server on port
const server = app.listen(3000, function() {
    console.log("Fast Food Fast app running on port.", server.address().port);
});
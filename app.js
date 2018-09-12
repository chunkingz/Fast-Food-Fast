import express from 'express';
import bodyParser from "body-parser";
const app = express();

import router from './server-side/routes/routes.js';

// define middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

// start server on port
const server = app.listen(process.env.PORT || 3000, function() {
    console.log("Fast Food Fast app running on port.", server.address().port);
});
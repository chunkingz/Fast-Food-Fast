import express from 'express';
import bodyParser from "body-parser";
import Order from './server/controllers/ordersController'
import { Pool, Client } from 'pg'
const app = express();
require('dotenv').config();

// define middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', Order.homepage);
app.get('/', Order.homepage);
app.get('/api/v1/orders', Order.allOrders);
app.get('/api/v1/orders/:id', Order.singleOrder);
app.post('/api/v1/orders', Order.newOrder);
app.put('/api/v1/orders/:id', Order.updateOrder);
app.delete('/api/v1/orders/:id', Order.deleteOrder);
app.get('*', Order.pageNotFound);

// start server on port
const server = app.listen(process.env.PORT, function() {
    console.log("Fast Food Fast app running on port.", server.address().port);
});

module.exports = server;
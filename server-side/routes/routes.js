const express = require('express');
const db = require('../db/orders-db.js');

// import  { newOrder, allOrders, specificOrder, updateStatus, homePage, notFoundPage } from '../controllers/index';
import { pageNotFound, homepageController, allOrdersController, newOrderController, singleOrderController, updateOrderStatusController } from '../controllers/index';


const router = express.Router();

// This file contains all routes for the router.

// get root/homepage
router.get("/", homepageController.homepageController);

// get all orders
router.get('/api/v1/orders', allOrdersController.allOrdersController);

// get 1 order
router.get('/api/v1/orders/:id', singleOrderController.singleOrderController);

// post order
router.post('/api/v1/orders', newOrderController.newOrderController);

// Update Order
router.put('/api/v1/orders/:id', updateOrderStatusController.updateOrderStatusController);

// delete order
router.delete('/api/v1/orders/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    db.map((order, index) => {
        if (order.id === id) {
            db.splice(index, 1);
            return res.status(200).send({
                status: 'true',
                message: 'Order deleted statusfuly',
            });
        }
    });


    return res.status(404).send({
        status: 'false',
        message: 'Order not found',
    });


});

// 404
router.get('*', pageNotFound.pageNotFound);


export default router;
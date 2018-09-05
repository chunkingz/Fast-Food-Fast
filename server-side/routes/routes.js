import express from 'express';
import db from '../db/orders-db.js';

// import  { newOrder, allOrders, specificOrder, updateStatus, homePage, notFoundPage } from '../controllers/index';
import { pageNotFound, homepageController, allOrdersController, newOrderController, singleOrderController } from '../controllers/index';


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
router.put('/api/v1/orders/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let orderFound;
    let orderIndex;
    db.map((order, index) => {
        if (order.id === id) {
            orderFound = order;
            orderIndex = index;
        }
    });

    if (!orderFound) {
        return res.status(404).send({
            status: 'false',
            message: 'order not found',
        });
    }

    if (!req.body.title) {
        return res.status(400).send({
            status: 'false',
            message: 'title is required',
        });
    } else if (!req.body.description) {
        return res.status(400).send({
            status: 'false',
            message: 'description is required',
        });
    }

    const updatedorder = {
        id: orderFound.id,
        title: req.body.title || orderFound.title,
        description: req.body.description || orderFound.description,
    };

    db.splice(orderIndex, 1, neworder);

    return res.status(201).send({
        status: 'true',
        message: 'Order added statusfully',
        updatedorder,
    });
});

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
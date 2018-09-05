import express from 'express';
import db from '../db/db.js';


const router = express.Router();

// This file contains all routes for the router.

router.get("/", function(req, res) {
    res.status(200).send("Welcome to the restful API for Fast Food Fast");
});

// get all orders
router.get('/api/v1/orders', (req, res) => {
    res.status(200).send({
        isSuccessful: 'true',
        message: 'Orders retrieved successfully',
        orders: db
    })
});

// get 1 order
router.get('/api/v1/orders/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.map((order) => {
        if (order.id === id) {
            return res.status(200).send({
                success: 'true',
                message: 'Order retrieved successfully',
                order: order
            });
        }
    });
    return res.status(404).send({
        success: 'false',
        message: `order does not exist`
    });
});

// post order
router.post('/api/v1/orders', (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'name is required'
        });
    } else if (!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'description is required'
        });
    }
    const order = {
        id: db.length + 1,
        title: req.body.title,
        description: req.body.description
    }
    db.push(order);
    return res.status(201).send({
        success: 'true',
        message: 'order added successfully',
        order
    })
});

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
            success: 'false',
            message: 'order not found',
        });
    }

    if (!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'title is required',
        });
    } else if (!req.body.description) {
        return res.status(400).send({
            success: 'false',
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
        success: 'true',
        message: 'Order added successfully',
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
                success: 'true',
                message: 'Order deleted successfuly',
            });
        }
    });


    return res.status(404).send({
        success: 'false',
        message: 'Order not found',
    });


});


export default router;
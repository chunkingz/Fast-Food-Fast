// 200, all orders controller

import db from '../db/orders-db.js';

class allOrdersController {

    static allOrdersController(req, res) {

        return res.status(200).json({
            status: 'success',
            message: 'Here are the orders',
            data: {
                orders: db
            }

        });
    };
};

export default allOrdersController;
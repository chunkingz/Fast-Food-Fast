// Import ordersArray
import ordersArray from '../db/orders-db.js';

// Get a single order
class singleOrderController {

    static singleOrderController(req, res) {

        const id = parseInt(req.params.id, 10);
        ordersArray.map((order) => {
            if (order.id === id) {
                return res.status(200).send({
                    success: 'true',
                    message: 'Order retrieved successfully',
                    order: order
                });
            }
        });
        const id1 = req.params.id;
            if (typeof(id1) != 'number') {
                return res.status(400).send({
                    success: 'false',
                    message: 'order does not exist'
                });
            }

        return res.status(400).send({
            success: 'false',
            message: `order does not exist`
        });

    }

}

export default singleOrderController;
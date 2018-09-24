import ordersArray from '../db/orders-db.js';

// Update the status of an order
class updateOrderStatusController {

    static updateOrderStatusController(req, res) {

        const id = parseInt(req.params.id, 10);
        let orderFound;
        let orderIndex;
        ordersArray.map((order, index) => {
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

        // uncomment if you want to add extra checks
        /* if (!req.body.name) {
            return res.status(400).send({
                success: 'false',
                message: 'name is required',
            });
        } */

        const updatedorder = {
            id: orderFound.id,
            name: req.body.name || orderFound.name,
            email: req.body.email || orderFound.email,
            meal: req.body.meal || orderFound.meal,
            quantity: req.body.quantity || orderFound.quantity,
            price: req.body.price || orderFound.price,
            location: req.body.location || orderFound.location,
            created_at: orderFound.created_at,
            status: req.body.status || orderFound.status
        };

        ordersArray.splice(orderIndex, 1, updatedorder);

        return res.status(201).send({
            success: 'true',
            message: 'Order updated successfully',
            updatedorder,
        });

    }

}

export default updateOrderStatusController;
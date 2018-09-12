import ordersArray from '../db/orders-db.js';
import usersArray from '../db/users-db.js';

// Create new order
class newOrderController {

    static newOrderController(req, res) {

        // init new Order Details
        const {
            name,
            email,
            meal,
            quantity,
            price,
            location
        } = req.body;

        // Create new Order Details
        let id = ordersArray.length + 1;
        const created_at = new Date().toDateString();
        const status = 'pending';

        // All users email address
        let emailArray = [];

        // Loop through usersArray, then push in each user email
        usersArray.forEach(obj => {
            emailArray.push(obj.email);
        });

        // User email in emailArray, make order
        if (emailArray.includes(email)) {

            // Insert new order into ordersArray
            const newestOrder = {
                id,
                name,
                email,
                meal,
                quantity,
                price,
                location,
                created_at,
                status,
            }

            // Push in new order to orders array
            ordersArray.push(newestOrder);

            // show success msg on order place
            return res.status(201).json({
                success: true,
                message: 'Your order is being processed.'
            });
        }

        // User email not in emailArray, dont make order
        return res.status(404).json({
            success: false,
            message: 'Error!, user not found, order can not be placed'
        });

    }

}

export default newOrderController;
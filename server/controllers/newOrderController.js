import ordersArray from '../db/orders-db.js';
import usersArray from '../db/users-db.js';

// Notes for my offline...
// 400 bad request, server unable to process request sent by client due to invalid sytax
// 401 unauthorized error, like bad username and password
// 500 internal server error

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

        // check if the email received exists in db
        // if it does we can accept the order.
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
                success: 'true',
                message: 'Your order is being processed.'
            });
        }

        if(!req.body.meal){
            return res.status(400).json({
                success: 'false',
                message: 'You have to place an order for something'
            });
        }
        
        if(quantity.length <= 0){
            return res.status(400).json({
                success: 'false',
                message: 'Please provide the quantity of items'
            });
        }
        
        if(price.length <= 0){
            return res.status(400).json({
                success: 'false',
                message: 'Price cannot be empty'
            });
        }
        
        if(typeof(quantity) !== Number || typeof(price) !== Number){
            return res.status(400).json({
                success: 'false',
                message: 'Quantity/Price has to be a number'
            });
        }
        

        // User email not in emailArray, dont make order
        return res.status(401).json({
            success: false,
            message: 'unauthorized user, please sign up'
        });
        
    }

}

export default newOrderController;
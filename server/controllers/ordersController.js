// import orderModel from '../db/orderModelOBJ';
import { Pool, Client } from 'pg'
import { isString } from 'util';
// import help from '../helpers/help'
require('dotenv').config();

const Order = {

  //get homepage
  //********************************************************************/
  homepage(req, res) {
    return res.status(200).json({
      status: 'success',
      message: 'Welcome to the Fast-Food-Fast API'
    });
  },
  
  // create a new order
  //********************************************************************/
  newOrder(req, res) {

    if (!req.body.name || !req.body.email) {
      return res.status(400).json({
        success: 'false',
        message: 'Name and email are required'
      });
    }
    if(!req.body.meal){
      return res.status(400).json({
          success: 'false',
          message: 'You have to place an order for something'
      });
    }
    if(!req.body.quantity){
      return res.status(400).json({
          success: 'false',
          message: 'Please provide the quantity of items'
      });
    }
    if(!req.body.price){
      return res.status(400).json({
          success: 'false',
          message: 'Price cannot be empty'
      });
    }
    if(isNaN(req.body.quantity) || isNaN(req.body.price)){
      return res.status(400).json({
          success: 'false',
          message: 'Quantity/Price has to be a number'
      });
    }

    // const order = orderModel.create(req.body);
    // *********** PGSQL ***********
    const client = new Client()
    client.connect()
      .then(() => {
        console.log('connected to postgres db')
        // making use of params $1, $2 to take care of sql injection.
        // just like using PHP's PDO prepared statements :-)
        const sql = 'INSERT INTO orders (\
          name, email, meal, quantity, price, location, status, created_at, modified_at)\
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
          const params = [
            req.body.name,
            req.body.email,
            req.body.meal,
            req.body.quantity,
            req.body.price,
            req.body.location,
            req.body.status,
            new Date().toDateString(),
            new Date().toDateString()
          ]
          return client.query(sql, params)
    })
    .then((result) => {
      // console.log(`Result: `, result);
      return res.status(201).json({
        success: 'true',
        message: 'Your order is being processed.',
        
      });
    })
    .catch((err) => {
      console.log(`Error: `, err);
    })
    

  },


  
  // get all orders
  // GET /api/v1/orders/
  //********************************************************************/
  allOrders(req, res) {
    // const orders = orderModel.findAll();
    const client = new Client()
    client.connect()
      .then(() => {
        console.log(`Connected to the db`);
        return client.query('SELECT * FROM orders')
    })
    .then((result) => {
      // console.log(`Result: \n`, result.rows);
      return res.status(200).json({
        status: 'success',
        message: 'Here are the orders',
        res1: result.rows
      });
    })
    .catch((err) => {
      console.log(`Error: `, err);
    })
  }
  ,


 
  // get single order
  // GET /api/v1/orders/:id
  //********************************************************************/
  singleOrder(req, res) {

    // lets just run a little regex to check if id supplied is not a valid int
    // bcos typeof doesnt give me what i seek, it always returns the id as string
    // so regex to the rescue
    var str = req.params.id
    var patt = new RegExp(/[^0-9]/g);
    var res2 = patt.test(str);
    if (res2){
      return res.status(400).send({
        success: 'false',
        message: `order does not exist`
      });
    }
    
    const client = new Client()
    client.connect()
      .then(() => {
        const sql = 'SELECT * FROM public.orders where id = $1;'
        const params = [req.params.id]
        return client.query(sql, params)
    })
    .then((result) => {
      if(result.rows.length == 0){
        return res.status(400).send({
          success: 'false',
          message: `order does not exist`
        });
      }
      // console.log(`Result: \n`, result);
      return res.status(200).send({
        success: 'true',
        message: 'Order retrieved successfully',
        res1: result.rows
      });
    })
    .catch((err) => {
      console.log(`Error: `, err);
    })
  },


 
  // update order
  //********************************************************************/
  updateOrder(req, res) {
    
    var str = req.params.id
    var patt = new RegExp(/[^0-9]/g);
    var res2 = patt.test(str);
    if (res2){
      return res.status(404).send({
        success: 'false',
        message: `order not to be found`
      });
    }
    
    const client = new Client()
    client.connect()
      .then(() => {
        const sql = 'UPDATE public.orders SET name=$1, email=$2, meal=$3, quantity=$4, price=$5, \
        location=$6, status=$7, created_at=$8, modified_at=$9 WHERE id = $10 returning *'
        const params = [
          req.body.name, 
          req.body.email, 
          req.body.meal, 
          req.body.quantity, 
          req.body.price, 
          req.body.location, 
          req.body.status, 
          new Date().toDateString(),
          new Date().toDateString(), 
          req.params.id]
        return client.query(sql, params)
    })
    .then((result) => {
      // console.log(`Result: \n`, result.rows);
      if(result.rows.length == 0){
        return res.status(404).send({
          success: 'false',
          message: `order not found`
        });
      }
      return res.status(201).send({
        success: 'true',
        message: 'Order updated successfully',
        updatedorder: result.rows[0]
      });
      // return result
    })
    .catch((err) => {
      console.log(`Error: `, err);
    })

    
  },
 


  // delete order
  //********************************************************************/
  deleteOrder(req, res) {
    // const order = orderModel.findOne(req.params.id);
    if (!order) {
      return res.status(404).send({'message': 'order not found'});
    }
    const client = new Client()
    client.connect()
      .then(() => {
        const sql = 'DELETE FROM orders WHERE id = $1'
        const params = [req.params.id]
        return client.query(sql, params)
    })
    .then((result) => {
      // console.log(`Result: \n`, result.rows);
      // circularJSON.stringify(result.rows)
      return result
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(`Error: `, err);
    })
    // const deletedOrder = orderModel.delete(req.params.id);
    return res.status(204).send(deletedOrder);
  },

  
  // 404 page not found
  //********************************************************************/
  pageNotFound(req, res){
    return res.status(404).json({
      status: 'fail',
      message: '404, page not found',
    });
  }
}

export default Order;
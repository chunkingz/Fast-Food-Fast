import { Pool, Client } from 'pg'

const Help = {

    newOrder(req, res)  {
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
      console.log(`Result: `, result);
    })
    .catch((err) => {
      console.log(`Error: `, err);
    })
}
}
export default Help;
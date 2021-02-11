import uuid from 'uuid';

class Order {
  
    //init orders
  constructor() {
    this.orders = [];
  }
  
  create(data) {
    const newOrder = {
      id: uuid.v4(),
      name: data.name || '',
      email: data.email || '',
      meal: data.meal || '',
      quantity: data.quantity || '',
      price: data.price || '',
      location: data.location || '',
      status: data.status || 'pending',
      created_at: new Date().toDateString(),
      modified_at: new Date().toDateString()
    };
    this.orders.push(newOrder);
    return newOrder
  }
  
  findOne(id) {
    return this.orders.find(order => order.id === id);
  }
  
  findAll() {
    return this.orders;
  }
  
  update(id, data) {
    const order = this.findOne(id);
    const index = this.orders.indexOf(order);
    this.orders[index].name = data['name'] || order.name;
    this.orders[index].email = data['email'] || order.email;
    this.orders[index].meal = data['meal'] || order.meal;
    this.orders[index].quantity = data['quantity'] || order.quantity;
    this.orders[index].price = data['price'] || order.price;
    this.orders[index].location = data['location'] || order.location;
    this.orders[index].status = data['status'] || order.status;
    this.orders[index].modifiedDate = new Date().toDateString()
    return this.orders[index];
  }
  
  delete(id) {
    const order = this.findOne(id);
    const index = this.orders.indexOf(order);
    this.orders.splice(index, 1);
    return {status: "Deleted successfully"};
  }
}
export default new Order();
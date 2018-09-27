import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);

describe('Fast-Food-Fast suite to test for add new Order', () => {

  describe('POST /api/v1/orders/', () => {

    it('should create a new order', (done) => {
      const order = {
        name: 'Fortune King',
        email: 'kingstonfortune@gmail.com',
        meal: 'rice and stew',
        quantity: 1,
        price: 200,
        location: ''
      };
      
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal('true');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Your order is being processed.');
          done();
        });
    });

    it('should not create an order if meal is not provided', (done) => {
      const order = {
        name: 'Fortune King',
        email: 'kingstonfortune@gmail.com',
        meal: '',
        quantity: 1,
        price: 200,
        location: ''
      };
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('You have to place an order for something');
          done();
        });
    });

    it('should not create an order if quantity is not provided', (done) => {
      const order = {
        name: 'Fortune King',
        email: 'kingstonfortune@gmail.com',
        meal: 'rice and stew',
        quantity: '',
        price: 200,
        location: ''
      };
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Please provide the quantity of items');
          done();
        });
    });

    it('should not create an order if quantity is not a number', (done) => {
      const order = {
        name: 'Fortune King',
        email: 'kingstonfortune@gmail.com',
        meal: 'rice and stew',
        quantity: 'aza',
        price: 200,
        location: ''
      };
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Quantity/Price has to be a number');
          done();
        });
    });

    it('should not create an order if price is not provided', (done) => {
      const order = {
        name: 'Fortune King',
        email: 'kingstonfortune@gmail.com',
        meal: 'rice and stew',
        quantity: 1,
        price: '',
        location: ''
      };
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Price cannot be empty');
          done();
        });
    });

    it('should not create an order if price is not a number', (done) => {
      const order = {
        name: 'Fortune King',
        email: 'kingstonfortune@gmail.com',
        meal: 'rice and stew',
        quantity: 1,
        price: 'aza',
        location: ''
      };
      chai.request(app)
        .post('/api/v1/orders')
        .send(order)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.equal('false');
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Quantity/Price has to be a number');
          done();
        });
        
    });
  });
});
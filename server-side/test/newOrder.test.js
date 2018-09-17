import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);

describe('Fast-Food-Fast suite to test for add new Order', () => {

  describe('POST /api/v1/orders/', () => {

    it('should post an order', (done) => {
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

    it('should not post an order if meal is not provided', (done) => {
      const order = {
        id: 1,
        fullname: 'Fortune King',
        userId: 1,
        userTelephone: '+2349039933771',
        address: '18b Toyosi Adetoro street, chevy view, lekki, lagos',
        quantity: 1,
        price: 200,
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

    it('should not post an order if quantity is not provided', (done) => {
      const order = {
        id: 1,
        fullname: 'Fortune King',
        userId: 1,
        userTelephone: '+2349039933771',
        address: '18b Toyosi Adetoro street, chevy view, lekki, lagos',
        meal: 'rice and stew',
        quantity: '',
        price: 200,
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

    it('should not post an order if quantity is not a number', (done) => {
      const order = {
        id: 1,
        fullname: 'Fortune King',
        userId: 1,
        userTelephone: '+2349039933771',
        address: '18b Toyosi Adetoro street, chevy view, lekki, lagos',
        meal: 'rice and stew',
        quantity: 'abc',
        price: 200,
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

    it('should not post an order if price is not provided', (done) => {
      const order = {
        id: 1,
        fullname: 'Fortune King',
        userId: 1,
        userTelephone: '+2349039933771',
        address: '18b Toyosi Adetoro street, chevy view, lekki, lagos',
        meal: 'rice and stew',
        quantity: 1,
        price: '',
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

    it('should not post an order if price is not a number', (done) => {
      const order = {
        id: 1,
        fullname: 'Fortune King',
        userId: 1,
        userTelephone: '+2349039933771',
        address: '18b Toyosi Adetoro street, chevy view, lekki, lagos',
        meal: 'rice and stew',
        quantity: 1,
        price: 'abc',
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
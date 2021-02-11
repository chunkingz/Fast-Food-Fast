import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);

describe('Fast-Food-Fast Update order test suite',() => {

    describe('PUT /api/v1/orders/:id test', () => {
      
        it('should update an order', (done) => {

            const order = {
              "name": "ded",
              "email": "sdesw",
              "meal": "rice and stew",
              "quantity": "2",
              "price": "1",
              "location": "lagos",
              "status": "",
              "createdDate": 1537927989981,
              "modifiedDate": 1537927989981
              };

          chai.request(app)
            .put('/api/v1/orders/1')
            .send(order)
            .end((err, res) => {
              expect(err).to.not.exist;
              expect(res.status).to.equal(201);
              expect(res.body.success).to.equal('true');
              expect(res.type).to.equal('application/json');
              expect(res.body).to.be.an('object');
              expect(res.body.message).to.equal('Order updated successfully');
              expect(res.body.updatedorder).to.be.an('object');
              done();
            });
        });
      });
    });

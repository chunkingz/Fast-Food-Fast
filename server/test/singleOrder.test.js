import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);

describe('Fast-Food-Fast suite to test for a specific order', () => {

    describe('GET /api/v1/orders/:id', () => {

      it('should get a specific order', (done) => {
        
        chai.request(app)
          .get('/api/v1/orders/1')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.success).to.equal('true');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Order retrieved successfully');
            expect(res.body.res1).to.be.an('array');
            done();
          });
      });
      it('should throw an error if param is a string', (done) => {
        
        const wrongParam = 'a'
        chai.request(app)
          .get('/api/v1/orders/' + wrongParam)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('order does not exist');
            done();
          });
      });
      it('should not fetch an order that doesnt exist', (done) => {
        chai.request(app)
          .get('/api/v1/orders/100')
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.success).to.equal('false');
            expect(res.type).to.equal('application/json');
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('order does not exist');
            done();
          });
      });
    })
  });  
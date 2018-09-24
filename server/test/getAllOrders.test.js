import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);

describe('Fast-Food-Fast suite to test for get all Orders', () => {
    describe('GET /api/v1/orders/', () => {
        it('should get a list of all orders', (done) => {
            chai.request(app)
              .get('/api/v1/orders/')
              .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.status).to.equal('success');
                expect(res.type).to.equal('application/json');
                expect(res.body).to.be.an('object');
                expect(res.body.message).to.equal('Here are the orders');
                expect(res.body.data).to.be.an('object');
                done();
              });
          });
    })
})
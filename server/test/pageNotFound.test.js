import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);

describe('Fast-Food-Fast Page not Found aka 404 test suite',() => {

    describe('GET * test', () => {
      
        it('should respond with a 404 page not found message', (done) => {
          chai.request(app)
            .get('/*')
            .end((err, res) => {
              expect(err).to.not.exist;
              expect(res.status).to.equal(404);
              expect(res.body.status).to.equal('fail');
              expect(res.type).to.equal('application/json');
              expect(res.body).to.be.an('object');
              expect(res.body.message).to.equal('404, page not found');
              done();
            });
        });
      });
    });

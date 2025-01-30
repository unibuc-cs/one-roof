import chai from 'chai';
import chaiHttp from 'chai-http';
import {config} from '../src/configure';

chai.use(chaiHttp);

describe('dummy', () => {
	it('should be able to execute a test', () => {
		chai.expect(1).to.equal(1);
	});
});

describe('dummy route', () => {
	it('should return Hello World!', (done) => {
		chai.request(`http://localhost:${config.port}`)
			.get('/api')
			.end((err, res) => {
				chai.expect(res).to.have.status(200);
				chai.expect(res.text).to.equal('Hello World!');
				done();
			});
	});
});

var chai = require('chai');
const expect = chai.expect;
var chaiHttp = require('chai-http');
const should = require('should');
var app = require("../app");

chai.use(chaiHttp);

describe("POST /records", () => {
    it('should records status 200 when any data found', function(done) {
        this.timeout(10000);    
        chai.request(app)
            .post('/records')
            .send({
                "startDate": "2017-01-26",  
                "endDate": "2017-01-29", 
                "minCount": 0,  
                "maxCount": 3000
            })
            .end((err, res) => {                  
                  res.status.should.be.equal(200);
                  res.body.code.should.be.equal(0);                  
                  done();
            });
    });
});
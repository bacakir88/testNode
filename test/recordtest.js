var chai = require('chai');
var chaiHttp = require('chai-http');
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
                  res.body.records[0].totalCount.should.be.equal(600)
                  done();
            });
    });
});

describe("POST /records", () => {
    it('should records status 200 when no data found', function(done) {
        this.timeout(10000);    
        chai.request(app)
            .post('/records')
            .send({
                "startDate": "2017-01-26",  
                "endDate": "2017-01-29", 
                "minCount": 0,  
                "maxCount": 5
            })
            .end((err, res) => { 
                console.log(res.body.records[0]);                 
                  res.status.should.be.equal(200);
                  res.body.code.should.be.equal(0);
                  (res.body.records[0] === 'undefined').should.be.true;
                  done();
            });
    });
});
const chai = require('chai') // assertion
const expect = chai.expect
const sinon = require('sinon') // spy
const enzyme = require('enzyme') // React
const supertest = require('supertest') // http requests

describe('', () => {
  it('', () => {})
})

describe('Testing Mocha', () => {
  it('Compares calcuations', () => {
    const twentyFive = 20+5
    expect(twentyFive).to.equal(25)
  })
})

// ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- ----- -----

const app = require('../server/app')
const {db} = require('../server/db')
describe('Testing Express server', () => {
  it('Checking "/" route', (done) => {
    supertest(app)
      .get('/')
      .expect(200)
      .expect(response => expect(response.text).to.include('DOCTYPE'))
      // response.text is all the information in the response, as a string
      .expect('Content-Type', /html/, done)
  })
  it('Checking "/auth/me" route', (done) => {
    supertest(app)
      .get('/auth/me')
      .expect(200)
      .expect(response => expect(response.text).to.equal(''))
      .expect('Content-Type', /json/, done)
  })
  describe('Checking "/auth/signup" route', () => {
    afterEach(() => {
      db.sync({force: true})
      // drop all added entries after each test
    })
    const user1 = {username: "Cody", password: "treats"}
    const user2 = {username: "Akai", password: "ABC"}
    it('Given an object with a username and password, create an entry and return a JSON', (done) => {
      supertest(app)
        .post('/auth/signup')
        .send(user1)
        .expect(200)
        .expect(response => expect(response.body).to.have.property('id').that.is.a('number'))
        // response.body holds any returned JSON
        .expect('Content-Type', /json/, done)
    })
  })
})

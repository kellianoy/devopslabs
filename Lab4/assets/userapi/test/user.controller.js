const { expect } = require('chai')
const userController = require('../src/controllers/user')
const client=require('../src/dbClient')

beforeEach( () => {
    client.flushdb()
 })

describe('User', () => {

  describe('Create', () => {
    
    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    it('avoid creating an existing user', (done)=> {
        const user = {
          firstname: 'Sergei',
          lastname: 'Kudinov'
        }
        // Warning: the user already exists
        userController.create(user, (err, result) => {
          userController.create(user, (err, result) => {
            expect(err).to.not.be.equal('OK')
            expect(result).to.be.equal(null)
          })
        done()
      })
    })
  })


  describe('Get', ()=> {

    it('get a user by username', (done) => {
        const user = {
          username: 'sergkudinov',
          firstname: 'Sergei',
          lastname: 'Kudinov'
        }
        userController.create(user, (err, result) => {
          userController.get(user.username, (err, result) => {
          expect(err).to.not.be.equal("OK")
          expect(result.firstname).to.be.equal("Sergei")
          expect(result.lastname).to.be.equal("Kudinov")
      })
    })
      done()
    })

    it("If a user doesn't exit", (done) => {
      userController.get('noUser', (err, result) => {
      expect(err).to.not.be.equal("OK")
      expect(result).to.be.equal(null)
      })
      done()
    })

  })
})

  

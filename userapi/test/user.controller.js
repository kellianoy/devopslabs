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
          username: "sergkudinov",
          firstname: 'Sergei',
          lastname: 'Kudinov'
        }
        // Warning: the user already exists
        userController.create(user, (err, result) => {
          userController.create(user, (err, result) => {
            expect(err).to.not.be.equal(null)
            expect(result).to.be.equal(null)
            done()
          })
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

  describe('Delete', ()=> {

    it('delete a user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        userController.delete(user.username, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal(1)
        })
        done()
      })
    })

    it('delete a non-existing user', (done) => {
      userController.delete("nobody".username, (err, result) => {
        expect(err).to.not.be.equal(null) // We expect to have a error
        expect(result).to.be.equal(null)
      })
      done()
    })

    it('checking for proper deletion of a user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        userController.delete(user.username, (err, result) => {
          userController.get(user.username, (err, result) => {
            expect(err).to.not.be.equal(null) // We intended for an error -> We cannot get the user
            expect(result).to.be.equal(null)
          })
        })
        done()
      })
    })

  })

  describe('Update', ()=> {

    it('Update a user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      const update = {
        username: 'sergkudinov',
        firstname: 'Kellian',
        lastname: 'Cottart'
      }
      userController.create(user, (err, result) => {
        userController.update(update, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal("OK")
        })
        done()
      })
    })

    it('update a non-existing user', (done) => {
      const update = {
        username: 'sergkudinov',
        firstname: 'Kellian',
        lastname: 'Cottart'
      }
      userController.update(update, (err, result) => {
        expect(err).to.not.be.equal(null) // We expect to have a error
        expect(result).to.be.equal(null)
      })
      done()
    })

    it('Check if the modification took place', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      const update = {
        username: 'sergkudinov',
        firstname: 'Kellian',
        lastname: 'Cottart'
      }
      userController.create(user, (err, result) => {
        userController.update(update, (err, result) => {
          userController.get(user.username, (err, result) => {
            expect(err).to.not.be.equal("OK")
            expect(result.firstname).to.be.equal("Kellian")
            expect(result.lastname).to.be.equal("Cottart")
          })
        })
        done()
      })
    })
  })
})

  

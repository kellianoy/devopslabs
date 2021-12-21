const client = require('../dbClient')
const { merge } = require("mixme");

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    client.hgetall(user.username, (err, res) => {
      if(res)
        return callback(new Error("User already exists"), null)
      else if(!res)
        client.hmset(user.username, userObj, (err, res) => {
          if (err) return callback(err, null)
          callback(null, res) // Return callback
        })
      else
        callback(err, null)
    })
  },
  
  get: (username, callback) => {
    if(!username)
      return callback(new Error("no username"), null)
    client.hgetall(username, (err, res) => {
      if (err) 
        return callback(err, null)
      else if (!res)
        return callback(new Error("No user found"), null)
      callback(null, res)
    })
  },

  delete: (username, callback) => {
    if(!username)
      return callback(new Error("no username"), null)
    client.del(username, (err, res) => {
      if (res == 1) {
        return callback(null, res)
      } 
      else{
        return callback(new Error("Couldn't delete"), null)
      }
    })
  },

  update: (user, callback) => {
    if(!user.username)
      return callback(new Error("no username"), null)
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    client.hgetall(user.username, (err, res) => {
      if(res)
      {
        client.hmset(user.username, merge(res, userObj), (err, res) => {
          if (err) return callback(err, null)
          callback(null, res) // Return callback
        })
      }
      else if(!res)
        return callback(new Error("Cannot update non existing element"), null)
      else
        callback(err, null)
    })
  },

} 

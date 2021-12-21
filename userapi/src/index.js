const express = require('express')
const userRouter = require('./routes/user')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000
var working = "connected"

const client = require('./dbClient')

client.on("connect", function () {
  working = "redis is connected";
});
client.on("end", function () {
  working = "redis is not working";
});
client.on("reconnecting", function (o) {
  working = "redis client trying to reconnect : " + o.attempt +" attemps";
});

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('The application is launched and working ! Hooray ! <br><br>' 
  + "The status of Redis connection is : "
  + "<span>" + working + "</span>"
  + "<br><br>This is version 2" )
})

app.use('/user', userRouter)

const server = app.listen(port, (err) => {
  if (err) throw err
  console.log("Server listening the port " + port)
})

process.on('SIGINT', function() {
  console.log( "\nShutting the process down" );
  process.exit(0);
});

module.exports = server

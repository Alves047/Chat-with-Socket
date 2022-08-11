// Variables imports
const express  = require('express')
const path = require('path')
const socketIO = require('socket.io')
const app  = express()


//Join Static files
app.use('/', express.static(path.join(__dirname, 'public')))

// Listen Server
const server = app.listen(3000, ()=>{
    console.log("Server running")

})
const messages = []

const io = socketIO(server)

io.on('connect', (socket)=>{
  console.log("Socket running")
  socket.emit('update_messages', messages)
 
  socket.on('new_message', (data)=>{
        messages.push(data)
        io.emit('update_messages', messages)
  })

})
const express = require('express')
const { Socket } = require('socket.io')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

app.use(express.static('public'))

app.get('/', (req, resp) => {
    resp.sendFile(__dirname + '/index.html')
})



// socket

const io = require('socket.io')(http)

io.on('connection', (socket) => {
    socket.on('Send-Message-To-Server', (msg) => {
        socket.broadcast.emit('Recieve-Message-From-Server', msg)
    })

})




http.listen(PORT, () => {
    console.log(`server is runn on ${PORT}`);
})
const {createServer} = require('http'); 
const {Server} = require ('socket.io');


// we created a http server and a socket.io server :)
const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"]

    }
})

io.on('connection', async (socket) => {
    console.log(socket.id);
}

httpServer.listen(3000, () => {
    console.log('Server listening on port :3000')
});
module.exports = (app, io, rooms) => {
    var curr_users = []
    app.get('/lobby', (req, res) => {
        console.log("lobby post was called")

        io.sockets.on('connection', (socket) => {
            console.log("is room in cookie", req.cookies)
            if(req.cookies.game_owner == '0'){
                var player = rooms[req.cookies.room].players[req.cookies.player]

                var name = req.cookies.player
                var room = req.cookies.room

                console.log("if player connected", player.connected)
                //make sure to emit user has joined only once
                if(!player.connected){
                    curr_users.push(name)
                    socket.emit('get-curr-users', curr_users)

                    //save state of users in lobby
                    player.connected = true

                    //join when get to lobby
                    //rooms are forgotten after reroute
                    socket.join(room)
                    console.log('joined the room:', room)
                    socket.to(room).emit('new-player', name)
                }
            }
            else if(req.cookies.game_owner == '1'){
                //just so game owner is in the room and can see what's going on
                socket.join(req.cookies.room)
            }

            

        })
        
        res.sendStatus(200)
    })
}
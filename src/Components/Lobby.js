import React from 'react'
import io from 'socket.io-client'
import Cookies from 'js-cookie'

class Lobby extends React.Component{
    constructor(props){
    super(props)

      this.state = {
        players: "",
        room: "",
        socket: false
      }
    }

    componentDidMount(){
        let code = Cookies.get("room")
        this.setState({code:code});
        // this.shuffleBtn.focus();
        fetch('http://localhost:3000/lobby', {
            method: 'GET',
            credentials: 'include'
        })
        .then((res) => {
            console.log("res status is", res.status)
            const socket = io.connect('http://localhost:3000/', {
                transports: ['websocket'],
                upgrade: false
            })

            //everything is asynchronous, so need to set socket state and then do all stuff after using callback
            this.setState({socket:socket}, () => {
                this.handleEvents()
            })
         })
        .catch((err) =>console.log(err))
    }

    shuffleTeams = () => {
      let socket = this.state.socket
      socket.emit("shuffleTeams")

    }

    handleEvents = () => {
        let socket = this.state.socket

        socket.on('get-curr-users', (curr_users) => {
            let players = ""
            console.log('attempting to add current users')

            for(let key in curr_users){
                players += (" " + key)
            }

            this.setState({players: players})
        })

        socket.on('new-player', (name) => {
          let player = ""
          console.log('received new player')
          player += (" " + name)

          this.setState({players: this.state.players + player})
        })

        socket.on('player-disconnected', () => {

        })

        let room = Cookies.get('room')
        console.log("room cookie ", room)
        this.setState({room: room})
    }

    render(){
      return(
        <div>
          <div id='code'>code: {this.state.room}</div>

          <div id='players'>players: {this.state.players}</div>
        </div>
      )
    }

}

export default Lobby

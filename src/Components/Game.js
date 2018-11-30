import React from 'react'
import io from 'socket.io-client'
import Cookies from 'js-cookie';
import GameOwnerControls from './GameOwnerControls'

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            socket: false,
            sequence: "",
            turn: false,
            teams: []
        }
        this.game_owner = Cookies.get('game_owner')
    }

    componentDidMount() {
        let host = 'http://' + location.hostname
        fetch(host + ':3000/game', {
            method: 'GET',
            credentials: 'include'
        })
            .then((res) => {
                console.log("response!", res.status)
                const socket = io.connect(host + ':3000/', {
                    transports: ['websocket'],
                    upgrade: false
                })

                //fetch is asynchronous, so have the client connect after the request is made
                this.setState({
                    socket: socket
                }, () => {
                    this.handleEvents()
                    console.log("state is", this.state)
                })

            })
            .catch(err => console.log("error", err))
    }

    //get input command from player
    handleCommand = (command) => {
        let socket = this.state.socket
        console.log(socket)
        if (this.state.turn) {
            console.log("inputing omcmadn");
            socket.emit('input-command', { command: command, socketid: socket.id })
        } else {
            console.log("not your turn fool");
        }
    }

    //in the event of wrong or right command, do something
    handleEvents = () => {
        let socket = this.state.socket
        console.log("Socket is", socket)

        socket.on('your-turn', () => {
            console.log("it's my turn now");
            this.setState({ turn: true })
        })

        socket.on('start-game', (data) => {
            console.log("received sequence after start game", data.seq);
            this.setState({ sequence: data.seq })
            this.setState({ teams: data.teams})
        })

        socket.on('correct-command', (seq) => {
            this.setState({ sequence: seq })
            this.setState({ turn: false })
        })

        socket.on('wrong-command', () => {
            this.setState({ turn: true })

            //some penalty here
            console.log("you suck")
        })
    }

    handleShuffle = () => {
        let socket = this.state.socket
        socket.emit('shuffle-teams')
    }

    startGame = () => {
        let socket = this.state.socket
        socket.emit('start-game')
    }

    render() {
        const player_controls = (
            <div>
                {/* replace this with images from cdn eventually */}
                <button id='A' onClick={this.handleCommand.bind(this, 'A')}>A</button>
                <button id='B' onClick={this.handleCommand.bind(this, 'B')}>B</button>
                <button id='C' onClick={this.handleCommand.bind(this, 'C')}>C</button>
                <button id='D' onClick={this.handleCommand.bind(this, 'D')}>D</button>
            </div>
        )
        
        return (
            <div>
                {this.game_owner === "1" ? 
                    <GameOwnerControls
                        sequence={this.state.sequence} 
                        teams={this.state.teams} 
                        handleShuffle={this.handleShuffle}
                        startGame={this.startGame}
                    /> 
                    : player_controls}

                <div>is your turn? {(this.state.turn).toString()}</div>
            </div>
        )
    }
}

export default Game
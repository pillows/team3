import React from 'react'
import GameScreensTwo from './GameScreensTwo';
import GameScreensThree from './GameScreensThree';
import GameScreensFour from './GameScreensFour';

class GameOwnerControls extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <div id='curr-icon'>
                    {/* {console.log("this is teams", this.props.teams)}
                    {
                    this.props.teams.map((team, i) => {
                        console.log("this is score", team.score)
                        return(
                            <div key={i}>
                                <div>input: {team.curr_icon} </div>
                                <div>team: {i} {team.score}</div>
                                <br/>
                            </div>

                        )
                    })

                    } */}
                    {console.log("this is teams", this.props.teams)}
                    <GameScreensFour />
                </div>
                <button onClick={this.props.startGame.bind(this)}>start game</button>

            </div>
        )
    }
}

export default GameOwnerControls
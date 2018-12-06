import React from 'react'
import io from 'socket.io-client'
import Cookies from 'js-cookie';

class GameScreensTwo extends React.Component {
    constructor(props) {
        super(props)
        this.i = 0
    }

    render() {
        console.log("teams in game screen two", this.props.teams)
        console.log("this is index in game screen two", this.i)
        return(
            <div style={{backgroundColor:"#bae1ff"}} className="vertical-center" >
                <div className="container">
                    <div className="row text-center">
                        {   
                            this.props.teams.map((team, i) => {
                                return(
                                    <div key={i} className="col-md-6">
                                        <div id="current-icon">
                                            <img style={{height:"128px"}} src={'/images/'+ team.curr_icon.icon} />
                                        </div>

                                        <h1>
                                            Team # {i}
                                            
                                        </h1>

                                        <div className="progress">
                                            <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                )
                            }) 
                        }

                    </div>
                </div>
            </div>
        )
    }

}
export default GameScreensTwo
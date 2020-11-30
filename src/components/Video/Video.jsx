import React from 'react'
import ReactPlayer from 'react-player'

import '../../App.css'

import { Player } from 'video-react'

// import Hls from 'hls'

class Video extends React.Component {
    render() {
        return (
            <div className="player-container">
                <ReactPlayer
                    className="video-player"
                    url={this.props.video}
                    config={{ playerVars: { showinfo: 1 } }}
                />
            </div>
            // <div
            //     className="player-container"
            //     style={{
            //         height: `${this.props.height}`,
            //         width: `${this.props.width}`,
            //     }}
            // >
            //     <Player
            //         className="vid-player"
            //         style={{ paddingTop: '0px' }}
            //         src={this.props.video}
            //         // height={this.props.height}
            //         // width={this.props.width}
            //         height={100}
            //         width={200}
            //     />
            // </div>
        )
    }
}

export default Video

// React Video  http://localhost:3000/r/web_design?post_id=t3_k2spjf

// http://localhost:3000/r/movies?post_id=t3_k3yt6t

import React from 'react'
import { Player } from 'video-react'
import ReactPlayer from 'react-player'

export default class Twitch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        console.log('vod', this.props.url)
        return (
            // <ReactPlayer url="https://clips.twitch.tv/BrainyHyperSrirachaBleedPurple" />
            // <iframe
            //     width="560"
            //     height="315"
            //     src="https://player.twitch.tv/BrainyHyperSrirachaBleedPurple"
            //     frameborder="0"
            //     allow="autoplay; encrypted-media"
            //     allowfullscreen
            // ></iframe>
            <iframe
                src="https://www.redditmedia.com/mediaembed/k11bsu&parent=localhost"
                height="1200px"
                width="720px"
            ></iframe>
        )
    }
}

// https://www.redditmedia.com/mediaembed/k11bsu

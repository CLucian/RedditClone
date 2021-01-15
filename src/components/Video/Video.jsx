import React from 'react'
import ReactPlayer from 'react-player'
import Iframe from 'react-iframe'

import '../../App.css'

class Video extends React.Component {
    getTwitchSlug = () => {
        const url = this.props.url
        const slug = url.split('twitch.tv/')[1]
        return slug
    }

    render() {
        const { provider, url, height, width } = this.props
        const TWITCH_URL = `https://clips.twitch.tv/embed?clip=${this.getTwitchSlug()}&parent=localhost`
        return (
            <div className="video-container">
                {provider === 'Twitch.tv' && (
                    <div className="twitch-container">
                        <iframe
                            className="twitch-frame"
                            src={TWITCH_URL}
                            height={height}
                            width={width}
                            frameborder="no"
                            scrolling="<scrolling>"
                            allowfullscreen="true"
                            autoplay="true"
                        ></iframe>
                    </div>
                )}
                {provider === 'YouTube' && (
                    <ReactPlayer className="video-player" url={url} controls />
                )}
                {provider !== 'YouTube' && provider !== 'Twitch.tv' && (
                    <div className="twitch-container">
                        <Iframe
                            className="video-iframe"
                            width={width}
                            height={height}
                            url={url}
                            allowFullScreen
                        />
                    </div>
                )}
            </div>
        )
    }
}

export default Video

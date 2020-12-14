import React from 'react'
import ReactPlayer from 'react-player'

import '../../App.css'

import { Player } from 'video-react'

// import Hls from 'hls'

class Video extends React.Component {
    render() {
        let url = this.props.video.replace('watch?v=', 'v/')
        return (
            <div className="player-container">
                <ReactPlayer
                    className="video-player"
                    // url={this.props.video}
                    url={url}
                    // url="https://clips.twitch.tv/UninterestedAffluentLettuceKreygasm"
                    controls={true}
                    config={{ playerVars: { showinfo: 1 } }}
                />
                {/* <ReactPlayer>
                    <iframe
                        src={this.props.video}
                        frameborder="0"
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                        title="video"
                    />
                    <iframe
                        src="https://clips.twitch.tv/UninterestedAffluentLettuceKreygasm"
                        // height="<height>"
                        // width="<width>"
                        // frameborder="<frameborder>"
                        // scrolling="<scrolling>"
                        // allowfullscreen="<allow full screen>"
                    ></iframe>

                    </ReactPlayer> */}
            </div>
        )
    }
}

export default Video

// React Video  http://localhost:3000/r/web_design?post_id=t3_k2spjf

// http://localhost:3000/r/movies?post_id=t3_k3yt6t

// http://localhost:3000/r/LivestreamFail?post_id=t3_dlte8e

// secure_media_embed:

// "&lt;iframe class="embedly-embed" src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fstreamable.com%2Fo%2Ffpuv4&amp;display_name=Streamable&amp;url=https%3A%2F%2Fstreamable.com%2Ffpuv4&amp;image=https%3A%2F%2Fcdn-cf-east.streamable.com%2Fimage%2Ffpuv4.jpg%3FExpires%3D1603595460%26Signature%3DHLLKKHCuxMySyMZwLmjHCOt-LBJRKDtHA19LfIPkq-YUzbwlrzbcYBo6jZJrDeWn04AYgCiaCwOGBV5aEgA3G4HnbjFeIwUB5fBr3Asjt2-akdR59SipPqZOV-9GlpQK-VuxHELLGMvpCONTaCapTgIpDYY9hsfcvFntNN7CKxViYl5cFXNh%7E9BDutv8Q5x8G1g9vn1EhVfnnC4uUQQpWPNa0cas12IrNL2hvR54ttEHRdjEADwoV%7EY1mC13B7d0%7EsNZNBV4SbNNld-ZPaYtpiwP67mceecr1%7E2COOhUUKEVQkvNlThWCa-I25SlzdzgZwqCeeYHXdmAXJ6M%7EwNeEA__%26Key-Pair-Id%3DAPKAIEYUVEN4EVB2OKEQ&amp;key=ed8fa8699ce04833838e66ce79ba05f1&amp;type=text%2Fhtml&amp;schema=streamable" width="600" height="338" scrolling="no" title="Streamable embed" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"&gt;&lt;/iframe&gt;"
// content: "&lt;iframe width="600" height="338" src="https://www.youtube.com/embed/rYPJYxEoPCg?feature=oembed&amp;enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen&gt;&lt;/iframe&gt;"

// "&lt;iframe class="embedly-embed" src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fclips.twitch.tv%2Fembed%3Fclip%3DUninterestedAffluentLettuceKreygasm%26parent%3Dcdn.embedly.com%26parent%3Dreddit.com%26parent%3Dwww.reddit.com%26parent%3Dold.reddit.com%26parent%3Dnew.reddit.com%26parent%3Dredditmedia.com%26muted%3Dtrue%26autoplay%3Dfalse&amp;display_name=Twitch.tv&amp;url=https%3A%2F%2Fclips.twitch.tv%2FUninterestedAffluentLettuceKreygasm&amp;image=https%3A%2F%2Fclips-media-assets2.twitch.tv%2FAT-cm%7C950415022-social-preview.jpg&amp;key=ed8fa8699ce04833838e66ce79ba05f1&amp;type=text%2Fhtml&amp;schema=twitch" width="600" height="340" scrolling="no" title="Twitch.tv embed" frameborder="0" allow="autoplay; fullscreen" allowfullscreen="true"&gt;&lt;/iframe&gt;"

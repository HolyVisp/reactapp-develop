import React from "react";
import VideoJSAudio from "./VideoJSAudio";

export default function AudioMoreDetailedTranslationComponent(props){
    const playerRef = React.useRef(null);
    const videoJsOptions = {
        controls: true,
        bigPlayButton: false,
        inactivityTimeout: 0,
        width: 600,
        height: 300,
        fluid: true,
        autoplay: true,
        plugins: {
            wavesurfer: {
                backend: 'MediaElement',
                displayMilliseconds: false,
                debug: true,
                waveColor: '#FFFFFF',
                progressColor: 'white',
                cursorColor: 'white',
                hideScrollbar: true
            }
        }
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // handle player events
        player.on('waveReady', (event) => {
            console.log('waveform: ready!');
        });

        player.on('playbackFinish', (event) => {
            console.log('playback finished.');
        });

        // error handling
        player.on('error', (element, error) => {
            console.error(error);
        });
    };

    return (
        <VideoJSAudio options={videoJsOptions} onReady={handlePlayerReady} urlForPlay={props.url}/>
    );
}
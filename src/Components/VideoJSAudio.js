import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import WaveSurfer from 'wavesurfer.js';
import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';
import ru from "video.js/dist/lang/ru.json"
export const VideoJSAudio = (props) => {
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const {options, onReady} = props;

    React.useEffect(() => {

        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
            const videoElement = document.createElement("video-js");
            videojs.addLanguage('ru', ru);
            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, options, () => {
                // print version information at startup
                const version_info = 'Using video.js ' + videojs.VERSION +
                    ' with videojs-wavesurfer ' + videojs.getPluginVersion('wavesurfer') +
                    ', wavesurfer.js ' + WaveSurfer.VERSION + ' and React ' + React.version;
                videojs.log(version_info);

                onReady && onReady(player);
                player.autoplay(options.autoplay);
                // load track
                player.src(props.urlForPlay);
            });

            // You could update an existing player in the `else` block here
            // on prop change, for example:
        } else {
            const player = playerRef.current;
            player.autoplay(options.autoplay);
            // load track
            player.src(props.urlForPlay);
        }
    }, [options, videoRef]);

    React.useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);
    return (
        <div>
            <div ref={videoRef} />
        </div>
    );
}

export default VideoJSAudio;
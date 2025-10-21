import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import "videojs-playlist";
import "videojs-playlist-ui";
import "videojs-playlist-ui/dist/videojs-playlist-ui.css";
import '../Styles/Playlist.css'
import ru from "video.js/dist/lang/ru.json"
export const VideoWithPlaylist = (props) => {
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const {options, onReady, playlist} = props;

    React.useEffect(() => {

        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
            const videoElement = document.createElement("video-js");
            videojs.addLanguage('ru', ru);
            videojs.addLanguage('ru', {
                "Now Playing": "Сейчас воспроизводится",
                "Up Next": "Следующее",
                "Untitled Video": "Видео без заголовка"
            });
            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, options, () => {
                videojs.log('player is ready');
                onReady && onReady(player);
                player.playlist(playlist);
                player.playlist.autoadvance(0);
                player.playlistUi({auto: true});
            });

            // You could update an existing player in the `else` block here
            // on prop change, for example:
        } else {
            const player = playerRef.current;

            player.autoplay(options.autoplay);
            player.src(options.sources);
        }
    }, [options, videoRef]);

    // Dispose the Video.js player when the functional component unmounts
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
        <section className="main-preview-player">
            <div ref={videoRef} class="video-js">
            </div>
            <div className="playlist-container  preview-player-dimensions vjs-fluid">
                <ol className="vjs-playlist"></ol>
            </div>
        </section>
    );
}

export default VideoWithPlaylist;
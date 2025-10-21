import React, {useEffect, useState} from "react";
import WavesurferPlayer from '@wavesurfer/react'

export default function WavesurferAudioComponent(props){
    const [wavesurfer, setWavesurfer] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const onReady = (ws) => {
        setWavesurfer(ws)
        setIsPlaying(false)
    }

    const onPlayPause = () => {
        wavesurfer && wavesurfer.playPause()
    }

    return (
        <>
            <WavesurferPlayer
                height={100}
                waveColor="violet"
                url={props.url}
                onReady={onReady}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />

            <button onClick={onPlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </>
    )
}
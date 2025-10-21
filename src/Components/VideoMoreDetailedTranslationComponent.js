import React from "react";
import VideoJS from "./VideoJS";
export default function VideoMoreDetailedTranslationComponent(props){
    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        muted: true,
        disablePictureInPicture: false,
        sources: [{
            src: props.url,
            type: 'application/x-mpegURL'
        }]
    };


    return (
        <VideoJS options={videoJsOptions}/>
    );
}
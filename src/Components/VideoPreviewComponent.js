import React from "react";
import VideoJS from "./VideoJS";
export default function VideoPreviewComponent(props){
    const videoJsOptions = {
        autoplay: true,
        controls: false,
        responsive: true,
        fluid: true,
        muted: true,
        disablePictureInPicture: true,
        sources: [{
            src: props.url,
            type: 'application/x-mpegURL'
        }]
    };


    return (
        <VideoJS options={videoJsOptions}/>
    );
}
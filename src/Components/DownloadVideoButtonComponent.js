
import {IconButton} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from "react";
import { saveAs } from 'file-saver';
export default function DownloadVideoButtonComponent(props)
{
    const saveFile = async () => {
        try {
            let name = props.row.audioCodec === "pcm" ?
                `audio${props.row.datetimeStart}-${props.row.datetimeStop}` :
                `video${props.row.datetimeStart}-${props.row.datetimeStop}`;
            let type = props.row.audioCodec === "pcm" ? "audio/wav" : "video/mp4"
            let file = await fetch(props.row.ptrFile).then(r => r.blob()).then(blobFile => new File([blobFile], name, { type: type }))
            console.log(file)
            saveAs(file);
        }
        catch (e) {
            console.log(e)
        }


    };
    return(
        <IconButton onClick={saveFile}>
            <VisibilityIcon />
        </IconButton>
    );
}
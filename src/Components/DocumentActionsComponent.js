import {IconButton, Stack, Tooltip} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from "react";
import { saveAs } from 'file-saver';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
export default function DocumentActionsComponent(props)
{
    const dispatch = useDispatch();
    const saveFile = async () => {
        try {
            let name = props.row.name;
            let type;
            if(!props.row.fileType)
            {
                switch (props.row.fileExtension)
                {
                    case ".pdf":
                        type = "application/pdf";
                        break;
                    default:
                        type = ""
                        break;
                }
            }
            else
            {
                type = props.row.fileType;
            }
            let file = await fetch(props.row.ptrFile).then(r => r.blob()).then(blobFile => new File([blobFile], name, { type: type }))
            saveAs(file);
        }
        catch (e) {
            console.log(e)
        }
    };
    const checkFilePreview = (format) =>
    {
        switch (format)
        {
            case ".pdf":
                return true;
            default:
                return false;
        }
    };

    return(
        <Stack direction="row" spacing={2}>
            <Tooltip title={"Скачать документ"}>
                <IconButton onClick={saveFile}>
                    <DownloadIcon />
                </IconButton>
            </Tooltip>
            {
                checkFilePreview(props.row.fileExtension) &&
                    <Tooltip title={"Просмотреть документ (в данный момент внедряется ядро для просмотра и редактирования документов)"}>
                        <IconButton component={Link} to="documentsViewer" onClick={()=>{dispatch({type:"CHANGE_SOURCE", payload: props.row});}} disabled={true}>
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
            }
            <Tooltip title={"Удалить документ"}>
                <IconButton onClick={()=> props.openDelete()}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </Stack>

    );
}
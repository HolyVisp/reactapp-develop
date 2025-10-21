import React, {useEffect, useState} from "react"
import {Box} from "@mui/material";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import '@react-pdf-viewer/core/lib/styles/index.css';


export default function DocumentsViewerPage() {
    const token = useSelector(state => state.authorization.token);
    const source = useSelector(state => state.source.source);
    const [file, setFile] = useState();

    useEffect(() => {
        async function LoadFile() {
            try {
                console.log(source)
                console.log("я тут")
                let name = `${source.name}${source.fileExtension}`
                let type;
                if(!source.fileType)
                {
                    type="application/pdf"
                }
                else
                {
                    type = source.fileType
                }
                let fileToLoad = await fetch(source.ptrFile).then(r => r.blob()).then(blobFile => new File([blobFile], name, { type: type }))
                console.log(fileToLoad)
                setFile(prevState => fileToLoad)
            }
            catch (e) {
                console.log(e)
            }
        }
        LoadFile();
    }, []);

    if(source === null)
    {
        return <Navigate to="/archive" replace/>;
    }
    return (
        <Box flexGrow={1} paddingTop={6}>
            Пока не работает :)
        </Box>
    );
}
import React from "react"
import {Box} from "@mui/material";
import FilerobotImageEditor, {TABS, TOOLS} from "react-filerobot-image-editor";
import {useSelector} from "react-redux";

export default function ImageEditorPage() {
    const token = useSelector(state => state.authorization.token);
    const source = useSelector(state => state.source.source);
    return (
        <Box flexGrow={1} paddingTop={6} height={window.innerHeight - (window.innerHeight - (window.innerHeight/100 * 97))}>
            <FilerobotImageEditor

                source={source.ptrFile}
                onSave={(editedImageObject, designState) =>
                    console.log('saved', editedImageObject, designState)
                }
                annotationsCommon={{
                    fill: '#ff0000',
                }}
                Text={{ text: 'Банкир...' }}
                Rotate={{ angle: 90, componentType: 'slider' }}
                removeSaveButton={true}
                tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK, TABS.FILTERS, TABS.FINETUNE, TABS.RESIZE]} // or {['Adjust', 'Annotate', 'Watermark']}
                defaultTabId={TABS.ANNOTATE} // or 'Annotate'
                defaultToolId={TOOLS.TEXT} // or 'Text'
            />
        </Box>
    );
}
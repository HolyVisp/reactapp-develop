import React, {useEffect, useState} from "react"
import {
    Box,
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Paper,
    Stack
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import StoredDataReadingService from "../Api/Services/StoredDataReadingService";
import {Link, Navigate} from "react-router-dom";
import ScrollToTopButtonComponent from "./ScrollToTopButtonComponent";
import DeleteIcon from '@mui/icons-material/Delete';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import SaveIcon from '@mui/icons-material/Save';
import { saveAs } from 'file-saver';
import SourcesAdministrationService from "../Api/Services/SourcesAdministrationService";

export default function ImagesViewComponent() {
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [open, setOpen] = React.useState(false);
    const token = useSelector(state => state.authorization.token);
    const sourceType = useSelector(state => state.sourceType.sourceType);
    const dispatch = useDispatch();

    // Открытие диалога удаления.
    const handleClickOpenDeleteDialog = () => {
        setOpen(true);
    };
    // Закрытие диалога удаления.
    const handleCloseDeleteDialog = () => {
        setOpen(false);
    };
    // Закрытие диалога и удаления файла.
    const handleCloseAndDeleteFile = () => {
        setOpen(false);
        DeleteImage(selectedImage.id);
    };

    async function Save(file){
        try {
            let name = `image ${file.name} ${file.datetimeStart}`
            let type;
            if(!file.fileType)
            {
                type="image/jpeg"
            }
            else
            {
                type = file.fileType
            }
            let fileToSave = await fetch(file.ptrFile).then(r => r.blob()).then(blobFile => new File([blobFile], name, { type: type }))
            saveAs(fileToSave);
        }
        catch (e) {
            console.log(e)
        }


    };
    function DeleteImage(id)
    {
        SourcesAdministrationService.deleteImage(token,id)
            .then(function(response){
                console.log(response)
                if(response)
                {
                    setSources(prevState => prevState.filter(item => item.id !== id))
                    console.log("изображение удалено")
                }
            }).catch(function (error) {
            console.log("изображение не удалено")
        });
    }
    useEffect(() => {
        if(sourceType !== null)
        {
            StoredDataReadingService.getSources(sourceType.sourceType, token)
                .then(function(response){
                    if(response.status === 204)
                    {
                        setLoading(false);
                    }
                    setSources(response.data);
                    console.log(response.data)
                }).catch(function (error) {
                setLoading(false);
            });
        }
    }, [sourceType, token]);
    if(sourceType === null)
    {
        return <Navigate to="/archive" replace/>;
    }
    return (
        <Box flexGrow={1} paddingTop={6}>
            <ScrollToTopButtonComponent/>
            <ImageList variant="masonry" cols={3} gap={8}>
                {sources.map((item) => (
                        <ImageListItem key={item.id} component={Paper}>
                                <img
                                    srcSet={item.ptrFile}
                                    src={item.ptrFile}
                                    alt={item.name}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    style={{paddingLeft:'8px'}}
                                    title={`Название: ${item.name}`}
                                    subtitle={
                                    <span>
                                        {`Описание: ${item.description}`}
                                        <br/>
                                        {`Автор: ${item.fileOwner}`}
                                        <br/>
                                        {`Дата создания: ${item.datetimeStart}`}
                                    </span>
                                }
                                    position="below"
                                />
                                <Stack direction="row" spacing={2}>
                                    <Button startIcon={<SaveIcon/>} onClick={()=>{Save(item)}}>Сохранить</Button>
                                    <Button startIcon={<DesignServicesIcon/>} component={Link} to="imageEditor" onClick={()=>{dispatch({type:"CHANGE_SOURCE", payload: item});}}>Перейти в редактор</Button>
                                    <Button startIcon={<DeleteIcon/>} onClick={()=>{
                                        setSelectedImage(prevState => item);
                                        handleClickOpenDeleteDialog();
                                    }}>Удалить</Button>
                                </Stack>
                        </ImageListItem>
                ))}
            </ImageList>
            <Dialog
                open={open}
                keepMounted
                aria-describedby="delete-dialog-slide-description"
            >
                <DialogTitle>{"Удаление файла ❗️❗️❗️"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-slide-description">
                        Вы уверены что хотите удалить изображение?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Нет</Button>
                    <Button onClick={handleCloseAndDeleteFile}>Да</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
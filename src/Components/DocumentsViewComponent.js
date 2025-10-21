import React, {useEffect, useState} from "react"
import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import StoredDataReadingService from "../Api/Services/StoredDataReadingService";
import { Navigate} from "react-router-dom";
import ScrollToTopButtonComponent from "./ScrollToTopButtonComponent";
import SourcesAdministrationService from "../Api/Services/SourcesAdministrationService";
import DocumentActionsComponent from "./DocumentActionsComponent";

export default function DocumentsViewComponent() {
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDocument, setSelectedDocument] = useState(null);
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
        DeleteDocument(selectedDocument.id);
    };


    function DeleteDocument(id)
    {
        SourcesAdministrationService.deleteDocument(token,id)
            .then(function(response){
                setSources(prevState => prevState.filter(item => item.id !== id))
                console.log("документ удален")
            }).catch(function (error) {
            console.log("документ не удалено")
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
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 650 }}
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>№ п/п</TableCell>
                            <TableCell align="left">Название</TableCell>
                            <TableCell align="left">Описание</TableCell>
                            <TableCell align="left">Дата добавления</TableCell>
                            <TableCell align="left">Автор</TableCell>
                            <TableCell align="left">Размер</TableCell>
                            <TableCell align="left">Формат</TableCell>
                            <TableCell align="left">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                        {sources.map((row, id) => (
                            <TableRow
                                key={id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {id}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="left">{row.datetimeStart}</TableCell>
                                <TableCell align="left">{row.fileOwner}</TableCell>
                                <TableCell align="left">{row.filesize}</TableCell>
                                <TableCell align="left">{row.fileExtension}</TableCell>
                                <TableCell align="left" onClick={()=>setSelectedDocument(prevState => row)}>
                                    {
                                        <DocumentActionsComponent row={row} openDelete={handleClickOpenDeleteDialog}/>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                keepMounted
                aria-describedby="delete-dialog-slide-description"
            >
                <DialogTitle>{"Удаление файла ❗️❗️❗️"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-slide-description">
                        {`Вы уверены что хотите удалить документ ${selectedDocument === null ? "" : selectedDocument.name}?`}
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
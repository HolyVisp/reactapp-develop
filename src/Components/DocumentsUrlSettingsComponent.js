import {
    Alert, AlertTitle,
    Button,
    Paper, Snackbar, Stack, TextField
} from "@mui/material";
import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Typography from "@mui/material/Typography";

export default function DocumentsUrlSettingsComponent(){
    const [documents, setDocuments] = useState(localStorage.DocumentsUrl);
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        setOpen(false);
    };


    return (
        <Paper elevation={6} id={"PrVideo"}>
            <Grid container spacing={1} style={{margin:'5px'}}>
                <Grid l={12} lg={12} md={12} sm={12} xs={12}>
                    <Stack alignItems="center" direction="row" gap={2}>
                        <LocalLibraryIcon/>
                        <Typography variant="body1">Документация:</Typography>
                        <TextField
                            label="Введите адрес"
                            variant="standard"
                            style={{paddingBottom:"12px"}}
                            value={documents}
                            onChange={(event) => {
                                setDocuments(event.target.value);
                            }}
                        />
                    </Stack>
                </Grid>
                <Grid l={12} lg={12} md={12} sm={12} xs={12}>
                    <Button
                        onClick={()=>{
                            localStorage.DocumentsUrl = documents;
                            setOpen(prevState => true);
                            window.location.reload();
                        }}
                    >
                        Сохранить изменения
                    </Button>
                </Grid>
            </Grid>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={"success"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    <AlertTitle>Успешно</AlertTitle>
                    Настройки сохранены
                </Alert>
            </Snackbar>
        </Paper>
    );
}
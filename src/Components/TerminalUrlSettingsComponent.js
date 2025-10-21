import {
    Alert, AlertTitle,
    Button,
    Paper, Snackbar, Stack, TextField
} from "@mui/material";
import React, {useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TerminalIcon from '@mui/icons-material/Terminal';
import Typography from "@mui/material/Typography";

export default function TerminalUrlSettingsComponent(){
    const [terminal, setTerminal] = useState(localStorage.TerminalUrl);
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        setOpen(false);
    };


    return (
        <Paper elevation={6} id={"PrVideo"}>
            <Grid container spacing={1} style={{margin:'5px'}}>
                <Grid l={12} lg={12} md={12} sm={12} xs={12}>
                    <Stack alignItems="center" direction="row" gap={2}>
                        <TerminalIcon/>
                        <Typography variant="body1">Терминал управления:</Typography>
                        <TextField
                            label="Введите адрес"
                            variant="standard"
                            style={{paddingBottom:"12px"}}
                            value={terminal}
                            onChange={(event) => {
                                setTerminal(event.target.value);
                            }}
                        />
                    </Stack>
                </Grid>
                <Grid l={12} lg={12} md={12} sm={12} xs={12}>
                    <Button
                        onClick={()=>{
                            localStorage.TerminalUrl = terminal;
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
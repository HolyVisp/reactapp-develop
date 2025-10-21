import {
    Alert, AlertTitle,
    Button,
    Paper, Snackbar, Stack, TextField
} from "@mui/material";
import React, {useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import StorageIcon from '@mui/icons-material/Storage';
import InboxIcon from '@mui/icons-material/Inbox';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import Typography from "@mui/material/Typography";

export default function MonitoringUrlSettingsComponent(){
    const [containers, setContainers] = useState(localStorage.ContainersUrl);
    const [host, setHost] = useState(localStorage.HostUrl);
    const [monitoring, setMonitoring] = useState(localStorage.MonitoringUrl);
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        setOpen(false);
    };


    return (
        <Paper elevation={6} id={"PrVideo"}>
            <Grid container spacing={1} style={{margin:'5px'}}>
                <Grid l={12} lg={12} md={12} sm={12} xs={12}>
                    <Stack alignItems="center" direction="row" gap={2}>
                        <InboxIcon/>
                        <Typography variant="body1">Контейнеры:</Typography>
                        <TextField
                            label="Введите адрес"
                            variant="standard"
                            style={{paddingBottom:"12px"}}
                            value={containers}
                            onChange={(event) => {
                                setContainers(event.target.value);
                            }}
                        />
                    </Stack>
                </Grid>
                <Grid l={12} lg={12} md={12} sm={12} xs={12}>
                    <Stack alignItems="center" direction="row" gap={2}>
                        <StorageIcon />
                        <Typography variant="body1">Хост:</Typography>
                        <TextField
                            label="Введите адрес"
                            variant="standard"
                            style={{paddingBottom:"12px"}}
                            value={host}
                            onChange={(event) => {
                                setHost(event.target.value);
                            }}
                        />
                    </Stack>
                </Grid>
                <Grid l={12} lg={12} md={12} sm={12} xs={12}>
                    <Stack alignItems="center" direction="row" gap={2}>
                        <TroubleshootIcon />
                        <Typography variant="body1">Система мониторинга:</Typography>
                        <TextField
                            label="Введите адрес"
                            variant="standard"
                            style={{paddingBottom:"12px"}}
                            value={monitoring}
                            onChange={(event) => {
                                setMonitoring(event.target.value);
                            }}
                        />
                    </Stack>
                </Grid>
                <Grid l={12} lg={12} md={12} sm={12} xs={12}>
                    <Button
                        onClick={()=>{
                            localStorage.ContainersUrl = containers;
                            localStorage.HostUrl = host;
                            localStorage.MonitoringUrl = monitoring;
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
import React, {useEffect, useState} from "react"
import {Alert, AlertTitle, Box, LinearProgress, Paper, Snackbar} from "@mui/material";
import {Navigate} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import {useSelector} from "react-redux";
import StoredDataReadingService from "../Api/Services/StoredDataReadingService";
import SearchBarComponent from "../Components/SearchBar/SearchBarComponent";
import VideoWithPlaylist from "../Components/VideoWithPlaylist";
import DeviceDetector from "device-detector-js";
import FilesTableComponent from "../Components/FilesTableComponent";
import VideoPreviewComponent from "../Components/VideoPreviewComponent";


export default function TestPage() {
    const token = useSelector(state => state.authorization.token);
    const source = useSelector(state => state.source.source);
    const sourceType = useSelector(state => state.sourceType.sourceType);
    const [search, setSearch] = useState();
    const [objects, setObjects] = useState([]);
    const [osName, setOsName] = useState("");
    const [rawObjects, setRawObjects] = useState([]);
    const [loading, setLoading] = useState(false);
    // Состояния для alert.
    const [severity, setSeverity] = useState("info");
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        muted: false,
        disablePictureInPicture: true
    };
    useEffect(() => {
        const deviceDetector = new DeviceDetector();
        const userAgent = navigator.userAgent;
        const device = deviceDetector.parse(userAgent);
        setOsName(prevState => device.os.name)
        console.log(source)
        if(sourceType !== null && source !== null)
        {
            StoredDataReadingService.getSourceTypeParameters(sourceType.sourceType, token)
                .then(function(response){
                    setSearch(prevState => response.data);
                }).catch(function (error) {
            });
        }
    }, [sourceType, token]);

    const handleClose = (event, reason) => {
        setOpen(false);
    };
    const setSearchParameters = (parameters) =>
    {
        setObjects(prevState => []);
        console.log("-----------------------------Запрос объектов--------------------------------");
        console.log(parameters);
        console.log(sourceType.sourceType);
        console.log(source.id);
        setLoading(true);
        StoredDataReadingService.getObjects(sourceType.sourceType, source.id, parameters, token)
            .then(function(response){
                console.log(response.data)
                console.log(response.data.length)
                if(response.data.length !== 0)
                {
                    setRawObjects(prevState => response.data);
                    response.data.map((item, index) => {
                        let el = {
                            name: `${item.datetimeStart} - ${item.datetimeStop}\n\rНомер канала:${item.channelNumber}`,
                            sources: [
                                {
                                    src: item.ptrFile,
                                    type: "video/mp4"
                                }
                            ],
                        }
                        setObjects(prevState => [...prevState, el])
                    });
                    setMessage(prevState => "Данные найдены");
                    setSeverity(prevState => "success");
                    setOpen(prevState => true);
                }
                else
                {
                    setMessage(prevState => "Данные не найдены");
                    setSeverity(prevState => "info");
                    setOpen(prevState => true);
                }
                setLoading(false);
            }).catch(function (error) {
            setLoading(false);
        });

        console.log("-----------------------------Запрос объектов--------------------------------");
    }
    if(sourceType === null)
    {
        return <Navigate to="/archive" replace/>;
    }
    if(loading)
    {
        return (
            <Box flexGrow={1} paddingTop={6}>
                <Grid container spacing={2}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <SearchBarComponent options={search} parameters={setSearchParameters}/>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <LinearProgress />
                    </Grid>
                </Grid>
            </Box>
        );
    }
    if(objects.length === 0)
    {
        return(
            <Box flexGrow={1} paddingTop={6}>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <SearchBarComponent options={search} parameters={setSearchParameters}/>
                    </Grid>
                </Grid>
                <Snackbar
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity={severity}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        <AlertTitle>{severity === "success" ? "Упех" : "Внимание!"}</AlertTitle>
                        Сообщение: {message}
                    </Alert>
                </Snackbar>
            </Box>
        );
    }
    if(objects.length !== 0)
    {
        if(osName === "Mac")
        {
            return(
                <Box flexGrow={1} paddingTop={6}>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <SearchBarComponent options={search} parameters={setSearchParameters}/>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <FilesTableComponent files = {rawObjects}/>
                        </Grid>
                    </Grid>
                    <Snackbar
                        open={open}
                        autoHideDuration={5000}
                        onClose={handleClose}
                    >
                        <Alert
                            onClose={handleClose}
                            severity={severity}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            <AlertTitle>{severity === "success" ? "Упех" : "Внимание!"}</AlertTitle>
                            Сообщение: {message}
                        </Alert>
                    </Snackbar>
                </Box>
            );
        }
        else
        {
                return (
                    <Box flexGrow={1} paddingTop={6}>
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <SearchBarComponent options={search} parameters={setSearchParameters}/>
                            </Grid>
                            <Grid item xl={9} lg={9} md={9} sm={9} xs={9}>
                                <VideoWithPlaylist options={videoJsOptions} playlist={objects}/>
                            </Grid>
                        </Grid>
                        <Snackbar
                            open={open}
                            autoHideDuration={5000}
                            onClose={handleClose}
                        >
                            <Alert
                                onClose={handleClose}
                                severity={severity}
                                variant="filled"
                                sx={{ width: '100%' }}
                            >
                                <AlertTitle>{severity === "success" ? "Упех" : "Внимание!"}</AlertTitle>
                                Сообщение: {message}
                            </Alert>
                        </Snackbar>
                    </Box>
                );

        }

    }
}
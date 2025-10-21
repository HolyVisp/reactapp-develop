import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Alert, AlertTitle, Box, LinearProgress, Snackbar, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import DeviceDetector from "device-detector-js";
import StoredDataReadingService from "../Api/Services/StoredDataReadingService";
import SearchBarComponent from "../Components/SearchBar/SearchBarComponent";
import VideoWithPlaylist from "../Components/VideoWithPlaylist";
import FilesTableComponent from "../Components/FilesTableComponent";

const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    muted: false,
    disablePictureInPicture: true,
};

const initialSnackbarState = {
    open: false,
    severity: "info",
    message: "",
};

export default function TestPage() {
    const token = useSelector(state => state.authorization.token);
    const source = useSelector(state => state.source.source);
    const sourceType = useSelector(state => state.sourceType.sourceType);

    const [searchParameters, setSearchParameters] = useState([]);
    const [parametersLoading, setParametersLoading] = useState(true);
    const [resultsLoading, setResultsLoading] = useState(false);
    const [objects, setObjects] = useState([]);
    const [rawObjects, setRawObjects] = useState([]);
    const [snackbar, setSnackbar] = useState(initialSnackbarState);
    const [hasSearched, setHasSearched] = useState(false);
    const [osName, setOsName] = useState("");

    useEffect(() => {
        const detector = new DeviceDetector();
        const device = detector.parse(navigator.userAgent);
        setOsName(device.os?.name ?? "");
    }, []);

    // Подгружаем параметры поиска для выбранного типа источника
    useEffect(() => {
        if (!sourceType || !token) {
            setSearchParameters([]);
            setParametersLoading(false);
            return;
        }

        let isMounted = true;
        setParametersLoading(true);
        setSearchParameters([]);
        setHasSearched(false);
        setObjects([]);
        setRawObjects([]);

        StoredDataReadingService.getSourceTypeParameters(sourceType.sourceType, token)
            .then((response) => {
                if (!isMounted) {
                    return;
                }
                setSearchParameters(response.data ?? []);
            })
            .catch(() => {
                if (!isMounted) {
                    return;
                }
                setSnackbar({ open: true, severity: "error", message: "Не удалось загрузить параметры поиска." });
            })
            .finally(() => {
                if (isMounted) {
                    setParametersLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [sourceType, token]);

    const handleCloseSnackbar = useCallback(() => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    }, []);

    // Выполняем поиск объектов по выбранным параметрам
    const handleSearch = useCallback((parameters) => {
        if (!sourceType || !source) {
            setSnackbar({ open: true, severity: "error", message: "Выберите источник для поиска." });
            return;
        }

        setHasSearched(true);
        setResultsLoading(true);
        setObjects([]);
        setRawObjects([]);

        StoredDataReadingService.getObjects(sourceType.sourceType, source.id, parameters, token)
            .then((response) => {
                const foundObjects = response.data ?? [];
                setRawObjects(foundObjects);

                const playlist = foundObjects.map((item) => ({
                    name: `${item.datetimeStart} - ${item.datetimeStop}\n\rНомер канала:${item.channelNumber}`,
                    sources: [
                        {
                            src: item.ptrFile,
                            type: "video/mp4",
                        },
                    ],
                }));

                setObjects(playlist);

                const message = foundObjects.length ? "Данные найдены" : "Данные не найдены";
                const severity = foundObjects.length ? "success" : "info";
                setSnackbar({ open: true, severity, message });
            })
            .catch(() => {
                setSnackbar({ open: true, severity: "error", message: "Не удалось получить данные. Повторите попытку." });
            })
            .finally(() => {
                setResultsLoading(false);
            });
    }, [sourceType, source, token]);

    const isMac = useMemo(() => osName.toLowerCase().includes("mac"), [osName]);

    if (!sourceType || !source) {
        return <Navigate to="/" replace/>;
    }

    return (
        <Box>
            <Grid container spacing={3} justifyContent="center">
                <Grid xs={12}>
                    {parametersLoading ? (
                        <LinearProgress />
                    ) : (
                        <SearchBarComponent options={searchParameters} parameters={handleSearch}/>
                    )}
                </Grid>
                <Grid xs={12}>
                    {resultsLoading ? (
                        <LinearProgress />
                    ) : !hasSearched ? (
                        <Typography variant="body1" align="center" sx={{mt: 4}}>
                            Выберите параметры и нажмите «Поиск», чтобы получить результаты.
                        </Typography>
                    ) : objects.length === 0 ? (
                        <Typography variant="body1" align="center" sx={{mt: 4}}>
                            По заданным параметрам ничего не найдено.
                        </Typography>
                    ) : (
                        isMac ? (
                            <FilesTableComponent files={rawObjects}/>
                        ) : (
                            <VideoWithPlaylist options={videoJsOptions} playlist={objects}/>
                        )
                    )}
                </Grid>
            </Grid>
            <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
                    <AlertTitle>
                        {snackbar.severity === "success" ? "Успех" : snackbar.severity === "error" ? "Ошибка" : "Внимание"}
                    </AlertTitle>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

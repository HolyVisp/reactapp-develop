import React, {useEffect, useState} from "react";
import {Box, LinearProgress, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import StoredDataReadingService from "../Api/Services/StoredDataReadingService";
import SourceChooseComponent from "../Components/SourceChooseComponent";
import ImagesViewComponent from "../Components/ImagesViewComponent";
import DocumentsViewComponent from "../Components/DocumentsViewComponent";

export default function SourceTypePage() {
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const token = useSelector(state => state.authorization.token);
    const sourceType = useSelector(state => state.sourceType.sourceType);

    // Запрашиваем список источников выбранного типа
    useEffect(() => {
        if (!sourceType) {
            return;
        }

        let isMounted = true;
        setLoading(true);
        setHasError(false);
        setSources([]);

        StoredDataReadingService.getSources(sourceType.sourceType, token)
            .then((response) => {
                if (!isMounted) {
                    return;
                }
                setSources(response.data ?? []);
            })
            .catch(() => {
                if (!isMounted) {
                    return;
                }
                setHasError(true);
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [sourceType, token]);

    if (!sourceType) {
        return <Navigate to="/" replace/>;
    }

    if (loading) {
        return (
            <Box sx={{display: "flex", justifyContent: "center", mt: 4}}>
                <LinearProgress sx={{width: "100%", maxWidth: 360}} />
            </Box>
        );
    }

    if (hasError) {
        return (
            <Typography variant="body1" color="error" align="center" sx={{mt: 4}}>
                Не удалось загрузить список источников. Попробуйте обновить страницу.
            </Typography>
        );
    }

    if (sources.length === 0) {
        return (
            <Typography variant="body1" align="center" sx={{mt: 4}}>
                Не найдены источники данных.
            </Typography>
        );
    }

    switch (sourceType.sourceTypeView) {
        case 51:
            return <ImagesViewComponent/>;
        case 52:
            return <DocumentsViewComponent/>;
        default:
            return (
                <Box>
                    <Grid container spacing={3}>
                        {sources.map((item) => (
                            <Grid key={item.id ?? item.name} xs={12} sm={6} md={4} lg={3}>
                                <SourceChooseComponent
                                    name={item.name}
                                    description={item.description}
                                    item={item}
                                    type="Source"
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            );
    }
}

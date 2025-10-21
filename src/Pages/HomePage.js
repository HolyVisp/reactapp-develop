import React, {useEffect, useState} from "react";
import {Box, LinearProgress, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {useSelector} from "react-redux";
import StoredDataReadingService from "../Api/Services/StoredDataReadingService";
import SourceChooseComponent from "../Components/SourceChooseComponent";

export default function HomePage() {
    const token = useSelector(state => state.authorization.token);
    const [sourceTypes, setSourceTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // Загружаем список типов источников при инициализации страницы
    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setHasError(false);

        StoredDataReadingService.getSourceTypes(token)
            .then((response) => {
                if (!isMounted) {
                    return;
                }
                setSourceTypes(response.data ?? []);
            })
            .catch(() => {
                if (!isMounted) {
                    return;
                }
                setHasError(true);
                setSourceTypes([]);
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [token]);

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
                Не удалось загрузить список типов источников. Попробуйте обновить страницу.
            </Typography>
        );
    }

    if (sourceTypes.length === 0) {
        return (
            <Typography variant="body1" align="center" sx={{mt: 4}}>
                Типы источников пока недоступны.
            </Typography>
        );
    }

    return (
        <Box>
            <Grid container spacing={3}>
                {sourceTypes.map((item) => (
                    <Grid key={item.sourceType} xs={12} sm={6} md={4} lg={3}>
                        <SourceChooseComponent type="SourceType" name={item.description} description="" item={item}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

import React, {useCallback, useMemo} from "react";
import {Box, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import StreamIcon from '@mui/icons-material/Stream';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import ImageIcon from '@mui/icons-material/Image';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import RttIcon from '@mui/icons-material/Rtt';

export default function SourceChooseComponent({ name, description, item, type }) {
    const dispatch = useDispatch();

    // Подбираем подходящую иконку под тип элемента
    const icon = useMemo(() => {
        if (type === "Source") {
            return <StreamIcon/>;
        }
        if (type === "SourceType") {
            switch (item?.sourceTypeView) {
                case 50:
                    return <MusicVideoIcon/>;
                case 51:
                    return <ImageIcon/>;
                case 52:
                    return <FilePresentIcon/>;
                case 53:
                    return <RttIcon/>;
                default:
                    return <StreamIcon/>;
            }
        }
        return null;
    }, [item, type]);

    // При нажатии сохраняем выбранный элемент в redux и переходим по ссылке
    const handleClick = useCallback(() => {
        if (type === "SourceType") {
            dispatch({type: "CHANGE_SOURCE_TYPE", payload: item});
        }
        if (type === "Source") {
            dispatch({type: "CHANGE_SOURCE", payload: item});
        }
    }, [dispatch, item, type]);

    const target = type === "SourceType" ? "/sourceType" : "/test";

    return (
        <Card sx={{minWidth: 240, minHeight: 180}}>
            <CardActionArea
                component={RouterLink}
                to={target}
                onClick={handleClick}
                sx={{height: "100%"}}
            >
                <CardContent>
                    <Box sx={{display: "flex", alignItems: "center", mb: description ? 1 : 0}}>
                        {icon && (
                            <Box sx={{mr: 1, display: "inline-flex"}}>
                                {icon}
                            </Box>
                        )}
                        <Typography variant="h6" component="div">
                            {name}
                        </Typography>
                    </Box>
                    {description && (
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

import React, {useEffect, useState} from "react"
import {Box, LinearProgress} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import StoredDataReadingService from "../Api/Services/StoredDataReadingService";
import {useSelector} from "react-redux";
import SourceChooseComponent from "../Components/SourceChooseComponent";
import {Navigate} from "react-router-dom";
import ImagesViewComponent from "../Components/ImagesViewComponent";
import DocumentsViewComponent from "../Components/DocumentsViewComponent";

export default function SourceTypePage() {
    // Данные об источниках
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useSelector(state => state.authorization.token);
    const sourceType = useSelector(state => state.sourceType.sourceType);
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
            }).catch(function (error) {
                setLoading(false);
            });
        }
    }, [sourceType, token]);
    if(sourceType === null)
    {
        return <Navigate to="/archive" replace/>;
    }
    if(sources.length === 0)
    {
        if(loading)
        {
            return(
                <Box flexGrow={1} paddingTop={6}>
                    <Grid container spacing={2}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <LinearProgress />
                        </Grid>
                    </Grid>
                </Box>
            );
        }
        else
        {
            return(
                <Box flexGrow={1} paddingTop={6}>
                    <Grid container spacing={2}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <h2 style={{lineHeight: "0.0em"}}>Не найдены источники данных</h2>
                        </Grid>
                    </Grid>
                </Box>
            );
        }

    }
    else
    {
        switch(sourceType.sourceTypeView)
        {
            case 51:
                return(
                  <ImagesViewComponent/>
                );
            case 52:
                return(
                    <DocumentsViewComponent/>
                );
            default:
                return(
                    <Box flexGrow={1} paddingTop={6}>
                        <Grid container spacing={2}>
                            {
                                sources.map((item, index) =>
                                    <Grid item key={index}>
                                        <SourceChooseComponent name={item.name} description={item.description} item={item} type={"Source"}/>
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Box>
                );
        }
    }
}
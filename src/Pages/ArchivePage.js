import React, {useEffect, useState} from "react"
import {Box, LinearProgress} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import StoredDataReadingService from "../Api/Services/StoredDataReadingService";
import {useSelector} from "react-redux";
import SourceChooseComponent from "../Components/SourceChooseComponent";

export default function ArchivePage() {
    const token = useSelector(state => state.authorization.token);
    const [sourcesTypes, setSourcesTypes] = useState([]);

    useEffect(() => {
        // Данные для отображения Типов источников данных
        StoredDataReadingService.getSourceTypes(token)
            .then(function(response){
                setSourcesTypes(response.data);
            }).catch(function (error) {
        });
    }, [token]);
    if(sourcesTypes.length === 0)
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
                    {
                        sourcesTypes.map((item, index) =>
                                <Grid item key={index}>
                                    <SourceChooseComponent type="SourceType" name={item.description} description="" item={item}/>
                                </Grid>
                        )
                    }
                </Grid>
            </Box>
        );
    }

}
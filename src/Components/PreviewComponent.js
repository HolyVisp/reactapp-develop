
import {
    Box,
    Button,
    Paper
} from "@mui/material";
import React from "react";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Grid from "@mui/material/Unstable_Grid2";
import VideoPreviewComponent from "./VideoPreviewComponent";
import Carousel from "react-material-ui-carousel";
import {Link} from "react-router-dom";


export default function PreviewComponent(props){

    return (
        <Paper elevation={6} id={"PrVideo"}>
            <Grid container spacing={1} style={{margin:'5px'}}>
                <Grid xs={12}>
                    <h2 style={{lineHeight: "0.0em"}} id={"serial"}>{props.source.serialNumber}</h2>
                </Grid>
                <Grid xs={12} id={"Carousel"}>
                    <Carousel autoPlay={false} navButtonsAlwaysVisible={true} animation={'slide'} duration={1000} >
                        {
                            props.source.channels.filter((x) => x.video === true).sort(function(a, b) {
                                if(a.name < b.name) { return -1; }
                                if(a.name > b.name) { return 1; }
                                return 0;
                            }).map( (item, i) =>
                            {
                                    return (
                                        <Box key={i}>
                                            <h3 style={{lineHeight: "0.0em"}} id={"chNumber"}>{item.name}</h3>
                                            <VideoPreviewComponent url={item.url}/>
                                        </Box>
                                    );
                            })
                        }
                    </Carousel>
                </Grid>
                <Grid xs={8}>
                    <Button variant="outlined" startIcon={<StarBorderIcon />} id={"Favourite"} disabled={true}>
                        В избранное
                    </Button>
                </Grid>
                <Grid xs={4}>
                    <Button component={Link}  to={`translations/${props.source.serialNumber}`} id={"More"}>
                        Подробнее
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}
import * as React from "react";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Card, CardActionArea, CardContent, Paper} from "@mui/material";
import StreamIcon from '@mui/icons-material/Stream';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import ImageIcon from '@mui/icons-material/Image';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import RttIcon from '@mui/icons-material/Rtt';

export default function SourceChooseComponent(props) {
    const { name, description, item, type } = props;
    console.log(name, description, item, type)
    const dispatch = useDispatch();
    const returnIcon = ()=>{
        if(type === "Source")
        {
            return <StreamIcon/>
        }
        if(type === "SourceType")
        {
            switch (item.sourceTypeView)
            {
                case 50:
                    return <MusicVideoIcon/>
                case 51:
                    return <ImageIcon/>
                case 52:
                    return <FilePresentIcon/>
                case 53:
                    return <RttIcon/>
                default:
                    return <StreamIcon/>
            }
        }
    }
    return (
        <Card sx={{ minWidth: 220, minHeight: 200, maxWidth: 220 }}>
            <CardActionArea sx={{ minWidth: 250, minHeight: 200, maxWidth: 250 }}
                              onClick={()=> {
                                 if(type === "SourceType")
                                 {
                                    console.log('попал в SourceType')
                                    console.log(item)
                                     dispatch({type:"CHANGE_SOURCE_TYPE", payload: item});
                                 }
                                 if(type === "Source")
                                 {
                                    console.log('попал в Source')
                                    console.log(item)
                                     dispatch({type:"CHANGE_SOURCE", payload: item});
                                 }
                             }
                             }
                            component={Link}
                            to={type === "SourceType" ? "sourceType" : "/test"}
            >
                <CardContent>
                    <Typography variant="h6" component="div">
                        {returnIcon()}{name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>


        // <Box>
        //         <ImageButton
        //             focusRipple
        //             style={{
        //                 width: 200
        //             }}
        //             onClick={()=> {
        //                 if(type === "SourceType")
        //                 {
        //                     dispatch({type:"CHANGE_SOURCE_TYPE", payload: item});
        //                 }
        //                 if(type === "Source")
        //                 {
        //                     dispatch({type:"CHANGE_SOURCE", payload: item});
        //                 }
        //             }
        //             }
        //             component={Link}
        //             to={type === "SourceType" ? "sourceType" : "/test"}
        //         >
        //             <ImageSrc />
        //             <ImageBackdrop className="MuiImageBackdrop-root" />
        //             <Image>
        //                 <Typography
        //                     component="span"
        //                     variant="subtitle1"
        //                     color="inherit"
        //                     sx={{
        //                         position: "relative",
        //                         p: 4,
        //                         pt: 2,
        //                         pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
        //                     }}
        //                 >
        //                     {name}
        //                     <br/>
        //                     {description}
        //                     <ImageMarked className="MuiImageMarked-root" />
        //                 </Typography>
        //             </Image>
        //         </ImageButton>
        // </Box>
    );
}
import React, {useEffect, useState} from "react"
import {Box} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import SearchBarComponent from "../Components/SearchBar/SearchBarComponent";
import axios from "axios";
import TimeLineComponent from "../Components/TimeLineComponent";
import VideoPreviewComponent from "../Components/VideoPreviewComponent";
import VideoArchiveComponent from "../Components/VideoArchiveComponent";

const condition = [
    {
        "title": "Дата и время начала",
        "name": "datetimeStart",
        "value": "2024-02-16 11:20:00",
        "dataType": 3,
        "operationType": 4,
        "showParameterInGUI": true
    },
    {
        "title": "Дата и время окончания",
        "name": "datetimeStop",
        "value": "2024-02-16 11:30:00",
        "dataType": 3,
        "operationType": 6,
        "showParameterInGUI": true
    },
    {
        "title": "Условное имя объекта порции данных",
        "name": "ptrFile",
        "value": "%3_146547_ch005%",
        "dataType": 1,
        "operationType": 7,
        "showParameterInGUI": true
    },
    {
        "title": "Количество записей, выводимое за один раз",
        "name": "limit",
        "value": "1000",
        "dataType": 2,
        "operationType": 1,
        "showParameterInGUI": false
    },
    {
        "title": "Номер (смещение) начальной записи",
        "name": "offset",
        "value": "0",
        "dataType": 2,
        "operationType": 1,
        "showParameterInGUI": false
    }
]

const client = axios.create({
    baseURL: "http://192.168.100.105:8000"
})
export default function ImageArchivePage() {
    const [data, setData] = useState([]);
    const [playList, setPlayList] = useState();
   /* useEffect(() => {

        var sourceTypeId  = "124"
        var sourceId  = "3"
        var url = `/Sources/GetSourceTypeParameters/${sourceTypeId}`;
        client
            .get(url, {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidXNlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXJzIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy91c2VyZGF0YSI6Ijg3M2I4MDIzNDJmMjQ4YzI5MmY5Zjg0YTI2OTNiOGU3IiwiZXhwIjoxNzA4MDkzMzU0LCJpc3MiOiJCYW5rZXJBdXRob3JpemF0aW9uU2VydmljZSIsImF1ZCI6IkJhbmtlclNlcnZpY2VzIn0.xu0x6sVzXVU820LuTm5wROhuFtsiXTgOV8ncPt-VADI",
                }
            })
            .then((response) => {
                console.log(response.data)
                setData(prevState => response.data)
            })
            .catch((error) => {
                console.log("error")
            })



        var url2 =`/object/124/3/m3u8/?where=(datetimeStart >= '2024-02-16 11:20:00') AND (datetimeStop <= '2024-02-16 11:30:00') AND ptrFile like '%3_146547_ch005%'&apikey=cad86e50f447448b9ce92de6c897695b`
        client
            .get(url2,condition, {
                headers: {
                    "apikey": "cad86e50f447448b9ce92de6c897695b",
                }
            })
            .then((response) => {
                console.log(response.data)
                setPlayList(response.data);

            })
            .catch((error) => {
                console.log("error")
            })
    }, []);
*/

    return (
        <Box flexGrow={1} paddingTop={6}>
            <Grid container spacing={2}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <SearchBarComponent options = {data}/>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    {playList ? <VideoArchiveComponent url={"http://192.168.100.106/s3/124n3/3_146547_ch005_video_20240216-112016?apikey=cad86e50f447448b9ce92de6c897695b"}/>
                        :
                        <h1>пусто</h1>
                    }
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <TimeLineComponent/>
                </Grid>
            </Grid>
        </Box>
    );
}
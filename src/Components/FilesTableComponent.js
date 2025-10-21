import React, {useEffect, useState} from "react"
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import DownloadVideoButtonComponent from "./DownloadVideoButtonComponent";




export default function FilesTableComponent(props) {
    console.log(props.files);
    const [files, setFiles] = useState(props.files);
    useEffect(() => {
        setFiles(prevState => props.files);
    }, []);
    return (
        <Box flexGrow={1} paddingTop={6}>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 650 }}
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>№ п/п</TableCell>
                            <TableCell align="left">Номер канала</TableCell>
                            <TableCell align="left">Начало записи</TableCell>
                            <TableCell align="left">Конец записи</TableCell>
                            <TableCell align="left">Аудио кодек</TableCell>
                            <TableCell align="left">Видео кодек</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {files.map((row, id) => (
                            <TableRow
                                key={id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {id}
                                </TableCell>
                                <TableCell align="left">{row.channelNumber}</TableCell>
                                <TableCell align="left">{row.datetimeStart}</TableCell>
                                <TableCell align="left">{row.datetimeStop}</TableCell>
                                <TableCell align="left">{row.audioCodec}</TableCell>
                                <TableCell align="left">{row.videoCodec}</TableCell>
                                <TableCell align="left">{<DownloadVideoButtonComponent row={row}/>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}


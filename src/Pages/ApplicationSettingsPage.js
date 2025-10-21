import React from "react"
import {Accordion, AccordionDetails, AccordionSummary, Alert, Box} from "@mui/material";
import ScrollToTopButtonComponent from "../Components/ScrollToTopButtonComponent";
import Grid from "@mui/material/Unstable_Grid2";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from "@mui/material/Typography";
import MonitoringUrlSettingsComponent from "../Components/MonitoringUrlSettingsComponent";
import DocumentsUrlSettingsComponent from "../Components/DocumentsUrlSettingsComponent";
import TerminalUrlSettingsComponent from "../Components/TerminalUrlSettingsComponent";

export default function ApplicationSettingsPage() {
    return (
        <Box flexGrow={1} paddingTop={6}>
            <Grid container spacing={2}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Alert severity="info">Важно! В данной версии приложения все настройки сохраняются локально в браузере!</Alert>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography>Настройка адресов системы мониторинга</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <MonitoringUrlSettingsComponent/>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography>Настройка адреса электронной документации</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <DocumentsUrlSettingsComponent/>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography>Настройка адреса терминала управления</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TerminalUrlSettingsComponent/>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
            <ScrollToTopButtonComponent/>
        </Box>
    );
}
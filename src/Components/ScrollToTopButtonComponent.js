import {Box, Fab, Tooltip, useScrollTrigger, Zoom} from "@mui/material";
import {useCallback} from "react";
import {KeyboardArrowUp} from "@mui/icons-material";
import * as React from "react";

export default function ScrollToTopButtonComponent(){
    const trigger = useScrollTrigger({
        // Number of pixels needed to scroll to toggle `trigger` to `true`.
        threshold: 100,
    })

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])

    return (
        <Zoom in={trigger}>
            <Box
                role="presentation"
                // Place the button in the bottom right corner.
                sx={{
                    position: "fixed",
                    bottom: 32,
                    right: 32,
                    zIndex: 9999,
                }}
            >
                <Tooltip
                    title = "Вверх"
                >
                    <Fab
                        onClick={scrollToTop}
                        color="primary"
                        size="small"
                        aria-label="Scroll back to top"
                    >
                        <KeyboardArrowUp fontSize="medium" />
                    </Fab>
                </Tooltip>
            </Box>
        </Zoom>
    );
}
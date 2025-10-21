import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import {IconButton, Menu, MenuItem} from "@mui/material";

export default function UserActionsMenuComponent(props){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        console.log(props.row)
    };

    return (
        <>
            <IconButton
                size="large"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleClose}>Редактировать</MenuItem>
                <MenuItem onClick={handleClose}>Заблокировать</MenuItem>
                <MenuItem onClick={handleClose}>Удалить</MenuItem>
            </Menu>
        </>
    );
}
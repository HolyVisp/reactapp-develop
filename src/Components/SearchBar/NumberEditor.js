import {Button, Dialog, DialogActions, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";
export default function NumberEditor(props){
    const { onChange, open, name } = props;
    const [value, setValue] = useState();
    const handleClose = () => {
        onChange(value, name);
    };

    return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Выбор числа:</DialogTitle>
                <TextField
                    id="outlined-number"
                    label="Введите число"
                    type="number"
                    onChange={(e)=>{setValue(e.target.value)}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <DialogActions>
                    <Button onClick={handleClose}>Ок</Button>
                </DialogActions>
            </Dialog>
    );
}
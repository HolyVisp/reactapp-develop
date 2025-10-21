import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel, Radio,
    RadioGroup,
} from "@mui/material";
import {useState} from "react";
export default function BoolEditor(props){
    const { onChange, open, name } = props;
    const [value, setValue] = useState("Да");
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleClose = () => {
        onChange(value, name);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Выбор bool параметра:</DialogTitle>
            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="bool-choose"
                    name="row-radio-buttons-group"
                    defaultValue="Да"
                    onChange={handleChange}
                    style={{marginLeft: '15px'}}
                >
                    <FormControlLabel value="Да" control={<Radio />} label="Да" />
                    <FormControlLabel value="Нет" control={<Radio />} label="Нет" />
                </RadioGroup>
            </FormControl>
            <DialogActions>
                <Button onClick={handleClose}>Ок</Button>
            </DialogActions>
        </Dialog>
    );
}
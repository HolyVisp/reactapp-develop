import {Dialog, DialogTitle} from "@mui/material";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import "date-fns";
import {ru} from "date-fns/locale";
import {format} from  "date-fns"
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
export default function DatetimeEditor(props){
    const { onChange, open, name } = props;

    const handleDateChange = (date) => {
        onChange(format(date, 'yyyy-MM-dd HH:mm:ss', {locale:ru}), name);
    };

    return (
        <LocalizationProvider adapterLocale={ru} dateAdapter={AdapterDateFns}>
        <Dialog open={open}>
            <DialogTitle>Выбор даты:</DialogTitle>
                <DateTimePicker
                    ampm={false}
                    timeSteps={{minutes:1}}
                    onAccept={handleDateChange}
                    defaultValue={new Date()}
                    views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                />
        </Dialog>
        </LocalizationProvider>
    );
}
import {Autocomplete, Button, LinearProgress, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import SearchIcon from "@mui/icons-material/Search";
import DatetimeEditor from "./DatetimeEditor";
import NumberEditor from "./NumberEditor";
import BoolEditor from "./BoolEditor";

export default function SearchBarComponent(props){
    const [options, setOptions] = useState();//prevState => props.options.filter((item) => item.showParameterInGUI))
    const [searchRules, setSearchRules] = useState();//prevState => props.option);
    const [loading, setLoading] = useState(true);
    const [openDateTime, setOpenDateTime] = useState(false);
    const [openNumber, setOpenNumber] = useState(false);
    const [openBool, setOpenBool] = useState(false);
    const [nameOfSearchParameter, setNameOfSearchParameter] = useState("");

    useEffect(() => {
        if(!props.options)
        {
            setLoading(true);
        }
        else
        {
            setOptions(props.options.filter((item) => item.showParameterInGUI));
            setSearchRules(props.options);
            setLoading(false);
        }

    }, [props.options]);
    const openDialog = (type) => {
        switch(type)
        {
            case 4:
                setOpenBool(true);
                break;
            case 3:
                setOpenDateTime(true);
                break;
            case 2:
                setOpenNumber(true);
                break;
            default:
                break;
        }
    }
    const handleClose = (value, name) => {
        setOpenDateTime(false);
        setOpenNumber(false);
        setOpenBool(false);
        setOptions(
            existOptions => existOptions.map((option, i) => {
                if(option.name === name)
                {
                    option.value = value;
                    return option;
                }
                else
                    return option;
            })
        )
        setSearchRules(
            existOptions => existOptions.map((option, i) => {
                if(option.name === name)
                {
                    option.value = value;
                    return option;
                }
                else
                    return option;
            })
        )
    };
    const callSearchVariableEditor = (e,value, reason, detail) => {

        switch (reason)
        {
            case "selectOption":
                setNameOfSearchParameter(detail.option.name);
                openDialog(detail.option.dataType);
                break;
            case "removeOption":
                setOptions(
                    existOptions => existOptions.map((option, i) => {
                        if(option.name === detail.option.name)
                        {
                            option.value = "";
                            return option;
                        }
                        else
                            return option;
                    })
                );
                setSearchRules(
                    existOptions => existOptions.map((option, i) => {
                        if(option.name === detail.option.name)
                        {
                            option.value = "";
                            return option;
                        }
                        else
                            return option;
                    })
                )
                break;
            case "clear":
                setOptions(
                    existOptions => existOptions.map((option, i) => {
                        option.value = "";
                        return option;
                    })
                );
                setSearchRules(
                    existOptions => existOptions.map((option, i) => {
                        option.value = "";
                        return option;
                    })
                )
                break;
            default:
                break;
        }

    };

    const Search = () => {
        props.parameters(searchRules);
    };
    if(loading)
    {
        return (
            <Grid container spacing={2}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <LinearProgress />
                </Grid>
            </Grid>
        );
    }
    else
    {
        return (
            <Grid container spacing={2}>
                <Grid item xl={11} lg={11} md={10} sm={10} xs={7}>
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={options}
                        getOptionLabel={(option) => option.value !== '' ? `${option.title} = ${option.value}` : option.title}
                        noOptionsText = {'Вы выбрали все возможные фильтры'}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Параметры поиска"
                            />
                        )}
                        onChange={callSearchVariableEditor}
                    />
                </Grid>
                <Grid item xl={1} lg={1} md={2} sm={2} xs={5}>
                    <Button variant="outlined" startIcon={<SearchIcon />} onClick={Search}>
                        Поиск
                    </Button>
                </Grid>
                <DatetimeEditor
                    open={openDateTime}
                    onChange={handleClose}
                    name = {nameOfSearchParameter}
                />
                <NumberEditor
                    open={openNumber}
                    onChange={handleClose}
                    name = {nameOfSearchParameter}
                />
                <BoolEditor
                    open={openBool}
                    onChange={handleClose}
                    name = {nameOfSearchParameter}
                />
            </Grid>
        );
    }

}
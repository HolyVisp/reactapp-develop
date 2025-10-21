import {useEffect, useState} from "react";
import TimeRange from "react-video-timelines-slider";
import { format } from "date-fns";
import StoredDataReadingService from "../Api/Services/StoredDataReadingService";
import {useSelector} from "react-redux";

const rules = [
    {
        "title": "Дата и время начала",
        "name": "datetimeStart",
        "value": "2024-02-26 10:24:00",
        "dataType": 3,
        "operationType": 4,
        "showParameterInGUI": true
    },
    {
        "title": "Дата и время окончания",
        "name": "datetimeStop",
        "value": "2024-02-27 11:30:00",
        "dataType": 3,
        "operationType": 6,
        "showParameterInGUI": true
    },
    {
        "title": "Условное имя объекта порции данных",
        "name": "ptrFile",
        "value": "%3_156980_ch005%",
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


function TimeLineComponent() {
    const isDark = useSelector(state => state.theme.isDark)
    useEffect(() => {
        let elements = document.querySelectorAll('.react_time_range__tick_label');
        if(isDark)
        {
            elements.forEach(function(element) {
                element.style.color = "white";
            });
        }
        else
        {
            elements.forEach(function(element) {
                element.style.color = "black";
            });
        }

        // document.querySelector('.react_time_range__tick_label').style.color = "white"
        // const items = document.getElementsByClassName('.react_time_range__tick_label')
        // console.log(items)
        async function getTimeLine() {
            await StoredDataReadingService.getTimeLine("124", "3", rules)
                .then(function(response){
                    console.log(response.data)
                }).catch(function (error) {
                })
        }
        getTimeLine();

        // if(data)
        // {
        //     data.dataAbsenceIntervals.map((item,index) => {
        //         setGap(oldArray => [...oldArray, {
        //             start: new Date(item.datetimeStart),
        //             end: new Date(item.datetimeStop)
        //         }])
        //     });
        // }
    }, [isDark]);

    const timeline = [
        new Date("2024-02-07 11:20:00"),
        new Date("2024-02-07 11:30:00"),
    ];

    const [gap, setGap] = useState([]);
    const [selectedInterval, setSelectedInterval] = useState([
        new Date("2022-11-22T23:51:44.054Z")
    ]);
    const [timelineScrubberError, setTimelineScrubberError] = useState(false);

    const timelineScrubberErrorHandler = ({ error }) => {
        setTimelineScrubberError(error);
    };

    const onChangeCallback = (selectedInterval) => {
        setSelectedInterval(selectedInterval);
    };

    return (
        <>
            <TimeRange
                showNow
                error={timelineScrubberError}
                ticksNumber={6}
                selectedInterval={selectedInterval}
                timelineInterval={timeline}
                onUpdateCallback={timelineScrubberErrorHandler}
                onChangeCallback={onChangeCallback}
                disabledIntervals={gap}
                step={1}
                formatTick={(ms) => format(new Date(ms), "dd.MM.yyyy HH:mm:ss")}
                formatTooltip={(ms) => format(new Date(ms), "dd.MM.yyyy HH:mm:ss.SSS")}
                showToolTip={true}
            />
        </>
    );
}

export default TimeLineComponent;
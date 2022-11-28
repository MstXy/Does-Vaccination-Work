import React from "react";
import { csv, timeParse } from "d3";

export { useData_time, useData_heatmap, removeDuplicateStation };

function useData_heatmap(csvPath){
    const [dataAll, setData_heatmap] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.start = +d.start;
                d.tripdurationS = +d.tripdurationS;
                d.end = +d.end;
                d.tripdurationE = +d.tripdurationE;
            });
            setData_heatmap(data);
        });
    }, []);
    return dataAll;
}

function removeDuplicateStation(data){
    const temp = data.map(d => d.station);
    return temp.filter( (d, idx) =>  temp.indexOf(d) === idx);
};


function useData_time(csvPath){
    const [dataAll_time, setData_time] = React.useState(null);
    const parseTime = timeParse("%Y-%m-%d %H:%M:%S");
    // const format = d3.timeFormat("%a %U")
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.starttime = parseTime(d.starttime.slice(0, -5));
                d.stoptime = parseTime(d.stoptime.slice(0, -5))
            });
            setData_time(data);
        });
    }, []);
    return dataAll_time;
}
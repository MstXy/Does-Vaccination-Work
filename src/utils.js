import React from "react";
import { csv, timeParse } from "d3";

export { useData, useData_time, useData_heatmap, removeDuplicateStation };


// CountryName,Date,V1,V2,V3,V4,ConfirmedCases,ConfirmedDeaths,MajorityVaccinated,PercentageVaccinated,Population,PopulationVaccinated

function useData(csvPath, type){
    const [dataAll, setData] = React.useState(null);
    switch (type) {
        case 'monthly':
            var parseTime = timeParse("%Y%m");          
            break;
        case 'tenDay':
            var parseTime = timeParse("%Y%m%d");          
            break;
        case 'daily':
            var parseTime = timeParse("%Y%m%d");          
            break;
        default:
            var parseTime = timeParse("%Y%m");          
    }
    React.useEffect(() => {
        csv(csvPath).then(data => {
            console.log(data);
            data.forEach(d => {
                if (type == "tenDay") {
                    d.Date = (parseInt(d.Date) + 1).toString()
                }
                d.Date = parseTime(d.Date);
            });
            setData(data);
            console.log(data);
        });
    }, []);
    return dataAll;
}

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
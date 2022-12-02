import React from "react";
import { csv, timeParse, timeFormat } from "d3";

export { useData, findTimePoints, selectCountry, useData_time };

// data attribute names:
// CountryName,Date,V1,V2,V3,V4,ConfirmedCases,ConfirmedDeaths,MajorityVaccinated,PercentageVaccinated,Population,PopulationVaccinated

function useData(csvPath, type){
    const [dataAll, setData] = React.useState(null);
    switch (type) {
        case 'monthly':
            var parseTime = timeParse("%Y%m");  
            var formatTime = timeFormat("%Y-%m");        
            break;
        case 'tenDay':
            var parseTime = timeParse("%Y%m%d");
            var formatTime = timeFormat("%Y-%m-%d");                  
            break;
        case 'daily':
            var parseTime = timeParse("%Y%m%d");
            var formatTime = timeFormat("%Y-%m-%d");                  
            break;
        default:
            var parseTime = timeParse("%Y%m");    
            var formatTime = timeFormat("%Y-%m");            
    }
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                if (type == "tenDay") {
                    // convert last digit 0,1,2 to 1, 11, 21
                    // so 2022102 will be 2022 10 21 after parsing and then formating.
                    d.Date = d.Date + (1).toString()
                }
                d.Date = formatTime(parseTime(d.Date));

                // convert to numbers
                d.ConfirmedCases = +d.ConfirmedCases;
                d.ConfirmedDeaths = +d.ConfirmedDeaths;
                d.PercentageVaccinated = +d.PercentageVaccinated;
                d.Population = +d.Population;
                d.PopulationVaccinated = +d.PopulationVaccinated;
                d.V1 = +d.V1;
                d.V2 = +d.V2;
                d.V3 = +d.V3;
                d.V4 = +d.V4;
            });
            setData(data);
            console.log(data);
        });
    }, []);
    return dataAll;
};

function findTimePoints(data){
    const temp = data.map(d => d.Date);
    return temp.filter( (d, idx) =>  temp.indexOf(d) === idx);
};

function selectCountry(data, COUNTRY) {
    return data.filter( d => {
        return COUNTRY.includes(d.CountryName)
    })
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
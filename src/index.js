import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import { csv, json } from "d3";

import "./styles.css";
import { HeatMap } from "./heatmap";
import { LineChart, MultipleLineChart } from './linecharts';

import { useData, useData_time, selectCountry } from './utils'

const csvUrl_time = "https://gist.githubusercontent.com/hogwild/4a23b2327e88e6e3aa101bb01ddb28ba/raw/81fd842af7328d2ad6d2a498cc4589031ae5b4af/citibike_rawdata_2020_4.csv";

const csvUrl_daily = 'https://gist.githubusercontent.com/MstXy/fae64c4763555d0d7209a1ed3dd9574b/raw/677d5da2017080fee0660223f94266d0ea0e950b/daily_oxcgrt.csv';
const csvUrl_tenDay = 'https://gist.githubusercontent.com/MstXy/fae64c4763555d0d7209a1ed3dd9574b/raw/677d5da2017080fee0660223f94266d0ea0e950b/tenDay_oxcgrt.csv';
const csvUrl_monthly = 'https://gist.githubusercontent.com/MstXy/fae64c4763555d0d7209a1ed3dd9574b/raw/677d5da2017080fee0660223f94266d0ea0e950b/monthly_oxcgrt.csv';

const COUNTRY_16 = ['Russia', 'China', 'India', 'United Kingdom', 'France', 
                    'Germany', 'Italy', 'Saudi Arabia', 'Congo', 'Egypt', 
                    'South Africa', 'Canada', 'Australia', 'United States', 'Brazil', 'Mexico'];
const COUNTRY_20 = ['Russia', 'China', 'India', 'United Kingdom', 'France', 
                    'Germany', 'Italy', 'Saudi Arabia', 'Congo', 'Egypt', 
                    'South Africa', 'Canada', 'Australia', 'United States', 'Brazil', 
                    'Mexico','Greenland','Indonesia','New Zealand','Argentina'];
const COUNTRY_30 = ['Russia', 'China', 'India', 'United Kingdom', 'France', 
                    'Germany', 'Italy', 'Saudi Arabia', 'Congo', 'Egypt', 
                    'South Africa', 'Canada', 'Australia', 'United States', 
                    'Brazil', 'Mexico','Greenland','Indonesia','New Zealand',
                    'Argentina','Finland','Turkey','Ukraine','Japan','Spain',
                    'Mali','South Korea','Kazakhstan','Peru','Colombia'];

function Vacc(){

    const [selectedPoint, setSelectedPoint] = React.useState(null);

    const WIDTH = 1100;
    const HEIGHT = 450;
    const TOTAL_HEIGHT = 900;
    const margin = {top: 100, right: 40, bottom: 50, left: 75};
    const height = HEIGHT - margin.top - margin.bottom;
    const width = WIDTH - margin.left - margin.right;
    
    // reference for line chart
    const data_time = useData_time(csvUrl_time);
    
    // select data
    const data_range_choices = ["monthly", "tenDay", "daily"];
    const dataUrl_choices = [csvUrl_monthly, csvUrl_tenDay, csvUrl_daily];
    var dataSelection_idx = 1;
    const data = useData(dataUrl_choices[dataSelection_idx], data_range_choices[dataSelection_idx]);

    // SWITCH for: New Confirmed Cases or New Confirmd Deaths
    var case_or_death = 1;  // 0 for cases, 1 for deaths

    if (!data_time) {
        return <p>Loading...</p>
    }
    if (!data) {
        return <p>Loading...</p>
    }

    var COUNTRY_LIST = COUNTRY_30;
    // filter data to country only in the list
    const filteredData = selectCountry(data, COUNTRY_LIST);

    // reference for line chart
    console.log(filteredData);
    // console.log(data_time);
    const formatWeek = d3.timeFormat("%a %U");
    const formatDaily = d3.timeFormat("%d")
    // rawData.forEach(d => console.log(formatWeek(d.starttime)));
    // const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; 
    const weekly = d3.groups(data_time, d => formatWeek(d.starttime)).map( d=> {return { date:d[0], value:d[1].length}});
    // const temp = d3.groups(rawData, d =>  formatDaily(d.starttime));
    const daily = d3.groups(data_time, d =>  formatDaily(d.starttime)).map( d=> {return { date:d[0], value:d[1].length}});
    // console.log(weekly);
    // console.log(temp);

    return <div>
        <h1>Does Vaccination Work?</h1>
        <h2>Based on Covid Cases, Vaccinated Population and Vaccination Policies.</h2>
        <svg width={WIDTH} height={TOTAL_HEIGHT}>
            <g>
                <HeatMap margin={margin} height={height} width={width} data={filteredData} COUNTRY={COUNTRY_LIST} SWITCH={case_or_death}
                    selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint}/>
                {/* <MultipleLineChart x={margin.left} y={HEIGHT+margin.bottom} width={width} height={height} data={weekly} /> */}
            </g>
        </svg>
    </div>


    
}

ReactDOM.render(<Vacc/ >, document.getElementById("root"));
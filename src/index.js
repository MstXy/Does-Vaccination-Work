import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import { csv, json } from "d3";

import "./styles.css";
import { HeatMap } from "./heatmap";
import { LineChart, MultipleLineChart } from './linecharts';

import { useData_time, useData_heatmap, removeDuplicateStation } from './utils'

const csvUrl_heatmap = 'https://gist.githubusercontent.com/hogwild/3b9aa737bde61dcb4dfa60cde8046e04/raw/citibike2020.csv'
const csvUrl_time = "https://gist.githubusercontent.com/hogwild/4a23b2327e88e6e3aa101bb01ddb28ba/raw/81fd842af7328d2ad6d2a498cc4589031ae5b4af/citibike_rawdata_2020_4.csv"


function Vacc(){
    const WIDTH = 900;
    const HEIGHT = 400;
    const TOTAL_HEIGHT = 900;
    const margin = {top: 200, right: 40, bottom: 50, left: 60};
    const height = HEIGHT - margin.top - margin.bottom;
    const width = WIDTH - margin.left - margin.right;
    const data_heatmap = useData_heatmap(csvUrl_heatmap);
    const data_time = useData_time(csvUrl_time);

    if(!data_heatmap){
        return <pre>Loading...</pre>
    }
    if (!data_time) {
        return <p>Loading...</p>
    }

    console.log(data_time);
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
                <HeatMap margin={margin} height={height} width={width} data={data_heatmap}/>
                <MultipleLineChart x={margin.left} y={HEIGHT+margin.bottom} width={width} height={height} data={weekly} />
            </g>
        </svg>
    </div>


    
}

ReactDOM.render(<Vacc/ >, document.getElementById("root"));
import React from "react";
import { Cell } from "./cell";
import { csv, min, max, median, interpolateGnBu, interpolateRdBu, mean } from "d3";
import { Scales } from "./scale";
import { Legend } from "./legend";
import { removeDuplicateStation } from './utils'



export function HeatMap(props){

    const {margin, height, width, data} = props;

    const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const STATION = removeDuplicateStation(data);
    // console.log(STATION);
    const xScale = Scales.band(STATION, 0, width);
    const yScale = Scales.band(MONTH, 0, height);
    const startRange = [min(data, d => d.start), median(data, d => d.start), max(data, d => d.start)];
    const colorRange = [interpolateGnBu(0), interpolateGnBu(0.5), interpolateGnBu(0.8)];
    // const colormap = Scales.colormapLiner(startRange, colorRange);
    // const colormap = Scales.colorSequential(startRange, interpolateGnBu);
    const colormap = Scales.colorDiverging(startRange, interpolateRdBu);
    return <g transform={`translate(${margin.left}, ${margin.top})`}>
        {
            data.map( d => {
                return <Cell key={d.station+d.month} d={d} xScale={xScale} yScale={yScale} color={colormap(d.start)} />
            } )
        }
        {STATION.map(s => {
                        return <g key={s} transform={`translate(${xScale(s)+5},-8)rotate(60)`}>
                        <text style={{textAnchor:'end'}}>{s}</text>
                        </g>
                    })}
        {MONTH.map(m => {
                    return <text key={m} style={{textAnchor:'middle'}} x={-30} y={yScale(m)+10}>{m}</text>
                })}
        <Legend x={0} y={height+10} width={width/2} height={20} numberOfTicks={5} 
        rangeOfValues={[min(data, d => d.start), max(data, d => d.start)]} colormap={colormap}/>
        </g>
        
};


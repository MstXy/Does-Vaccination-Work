import React from "react";
import { Cell } from "./cell";
import { min, max, median, interpolateGnBu, interpolateRdBu, mean } from "d3";
import { Scales } from "./scale";
import { Legend } from "./legend";
import { findTimePoints } from './utils'


export function HeatMap(props){

    const {margin, height, width, data, COUNTRY} = props;
    const TIME_POINTS = findTimePoints(data);
    // console.log(TIME_POINTS);
    const xScale = Scales.band(TIME_POINTS, 0, width);
    const yScale = Scales.band(COUNTRY, 0, height);
    const startRange = [min(data, d => d.ConfirmedCases), median(data, d => d.ConfirmedCases), max(data, d => d.ConfirmedCases)];
    const colorRange = [interpolateGnBu(0), interpolateGnBu(0.6), interpolateGnBu(1.0)];
    const colormap = Scales.colormapLiner(startRange, colorRange);
    // const colormap = Scales.colorSequential(startRange, interpolateGnBu);
    // const colormap = Scales.colorDiverging(startRange, interpolateRdBu);
    return <g transform={`translate(${margin.left}, ${margin.top})`}>
        {
            data.map( d => {
                return <Cell key={d.CountryName+d.Date} d={d} xScale={xScale} yScale={yScale} color={colormap(d.ConfirmedCases)} />
            } )
        }
        {TIME_POINTS.map(s => {
                        return <g key={s} transform={`translate(${xScale(s)+5},-8)rotate(60)`}>
                        <text style={{textAnchor:'end'}}>{s}</text>
                        </g>
                    })}
        {COUNTRY.map(m => {
                    return <text key={m} style={{textAnchor:'end'}} x={-5} y={yScale(m)+10}>{m}</text>
                })}
        <Legend x={0} y={height+10} width={width/2} height={20} numberOfTicks={5} 
            rangeOfValues={[min(data, d => d.ConfirmedCases), max(data, d => d.ConfirmedCases)]} colormap={colormap}/>
        </g>
        
};


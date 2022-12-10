import React from "react";
import { Cell } from "./cell";
import { min, max, median, interpolateGnBu, interpolateRdBu, mean , timeFormat, timeParse} from "d3";
import { Scales } from "./scale";
import { Legend } from "./legend";
import { findTimePoints } from './utils'


export function HeatMap(props){

    const {margin, height, width, data, COUNTRY, SWITCH, selectedPoint, setSelectedPoint} = props;
    const TIME_POINTS = findTimePoints(data);
    // console.log(TIME_POINTS);
    const xScale = Scales.band(TIME_POINTS, 0, width);
    const yScale = Scales.band(COUNTRY, 0, height);

    // display ticks
    const parsetime = timeParse('%Y%m%d')
    const formatday = timeFormat("%Y-%m-%d")
    const xdomain = ['20200101','20200301', '20200501','20200701','20200901','20201101',
                        '20210101','20210301', '20210501','20210701','20210901','20211101',
                        '20220101','20220301', '20220501','20220701','20220901','20221101']
    const xdo = xdomain.map(data => parsetime(data))
    const xd = xdo.map(data => formatday(data))


    if (SWITCH == 0) {
        // show cases
        var startRange = [min(data, d => d.NewConfirmedCases), median(data, d => d.NewConfirmedCases), max(data, d => d.NewConfirmedCases)];
        // range for legend
        var rangeOfValues = [min(data, d => d.NewConfirmedCases), max(data, d => d.NewConfirmedCases)];
    } else if (SWITCH == 1) {
        // show death
        var startRange = [min(data, d => d.NewConfirmedDeaths), median(data, d => d.NewConfirmedDeaths), max(data, d => d.NewConfirmedDeaths)];
        // range for legend
        var rangeOfValues = [min(data, d => d.NewConfirmedDeaths), max(data, d => d.NewConfirmedDeaths)];
    }

    const colorRange = [interpolateGnBu(0), interpolateGnBu(0.6), interpolateGnBu(1.0)];
    const colormap = Scales.colormapLiner(startRange, colorRange);
    // const colormap = Scales.colorSequential(startRange, interpolateGnBu);
    // const colormap = Scales.colorDiverging(startRange, interpolateRdBu);

    const textOpacity_country = (selectedPoint, thisPoint) => {
        if  (!selectedPoint) {
            return 1
        } else {
            // also check if in the same row / col with the selected point
            return (selectedPoint.CountryName === thisPoint) ? 1 : 0.4  
        } 
    };

    const textOpacity_time = (selectedPoint, thisPoint) => {
        if  (!selectedPoint) {
            if (xd.includes(thisPoint)) {
                return 1
            } else {
                return 0
            }
        } else {
            if (xd.includes(thisPoint)) {
                // also check if in the same row / col with the selected point
                return (selectedPoint.Date === thisPoint) ? 1 : 0.4  
            } else {
                // also check if in the same row / col with the selected point
                return (selectedPoint.Date === thisPoint) ? 1 : 0  
            }

        } 
    };

    const textfrontsizem = (selectedPoint,thisPoint) => {
        if  (!selectedPoint) {
            return '10px'
        } else {
            // also check if in the same row / col with the selected point
            return (selectedPoint.CountryName === thisPoint) ? '15px' : '10px'  
        } 
    };

    const textfrontsizes = (selectedPoint,thisPoint) => {
        if  (!selectedPoint) {
            return '11px'
        } else {
            // also check if in the same row / col with the selected point
            return (selectedPoint.Date === thisPoint) ? '15px' : '11px'  
        } 
    };

    return <g transform={`translate(${margin.left}, ${margin.top})`}>
        {
            data.map( d => {
                if (SWITCH == 0) {
                    return <Cell key={d.CountryName+d.Date} d={d} xScale={xScale} yScale={yScale} color={colormap(d.NewConfirmedCases)} 
                    selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint}
                />
                } else if (SWITCH == 1) {
                    return <Cell key={d.CountryName+d.Date} d={d} xScale={xScale} yScale={yScale} color={colormap(d.NewConfirmedDeaths)} 
                    selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint}
                />
                }    
            } )
        }
        {TIME_POINTS.map(s => {
                        return <g key={s} transform={`translate(${xScale(s)+5},-8)rotate(60)`}>
                        <text style={{textAnchor:'end',fontSize:textfrontsizes(selectedPoint,s)}}
                                opacity={textOpacity_time(selectedPoint, s)}>
                                    {s}
                            </text>
                        </g>
                    })}
        {COUNTRY.map(m => {
                    return <text key={m} style={{textAnchor:'end', fontSize:textfrontsizem(selectedPoint,m)}} x={-5} y={yScale(m)+10}
                                opacity={textOpacity_country(selectedPoint, m)}>
                                {m}
                            </text>
                })}
        <Legend x={0} y={height+10} width={width/2} height={20} numberOfTicks={5} 
            rangeOfValues={rangeOfValues} colormap={colormap}/>
        </g>
        
};


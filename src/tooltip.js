import React from "react";
import * as d3 from "d3";
import { Piechart } from "./piecharts";
// import { PieChartV1 } from "./piecharts";
// import { PieChartV2 } from "./piecharts";
// import { PieChartV3 } from "./piecharts";
// import { PieChartV4 } from "./piecharts";

export function ToolTip(props){

    const {margin, height, width, default_world, selectedPoint} = props;

    const v1_width = 60;
    const v1_height= height/2+100;
    const v2_width = 60;
    const v2_height= height/2+250;
    const v3_width = 60;
    const v3_height= height/2+400;
    const v4_width = 60;
    const v4_height= height/2+550;

    if (!selectedPoint) {
        var country_to_show = default_world;
    } else {
        var country_to_show = selectedPoint;
    }
      
   
    return <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g>
            <text>
                Country Name: {country_to_show.CountryName}
            </text>
            <text y={20}>
                Date: {country_to_show.Date}
            </text>
            <text y={40}>
                Total Cases: {country_to_show.ConfirmedCases}
            </text>
            <text y={60}>
                Total Deaths: {country_to_show.ConfirmedDeaths}
            </text>
            <text y={80}>
                Daily Cases: {country_to_show.NewConfirmedCases}
            </text>
            <text y={100}>
                Daily Deaths: {country_to_show.NewConfirmedDeaths}
            </text>
            <text y={120}>
                Total Population: {country_to_show.Population}
            </text>
            <text y={140}>
                Vaccinated Population: {country_to_show.PopulationVaccinated}
            </text>
            <text y={160}>
                Majority Vaccinated: {country_to_show.MajorityVaccinated}
            </text>
            <text y={180}>
                Mandatory Vaccination: {country_to_show.V4}
            </text>
        </g>
        <text y={250} x ={25}> V1_index</text>
        <Piechart width = {v1_width} height={v1_height} data = {country_to_show.V1}/>
        <text y={400} x ={25}> V2_index</text>
        <Piechart width = {v2_width} height={v2_height} data={country_to_show.V2}/>
        <text y={550} x ={25}> V3_index</text>
        <Piechart width = {v3_width} height={v3_height} data={country_to_show.V3}/>
        <text y={700} x ={25}> V4_index</text> 
        {/* V4 currently is PercentageVaccinated   */}
        <Piechart width = {v4_width} height={v4_height} data={country_to_show.PercentageVaccinated}/>
        {/* <PieChartV1 offsetX={0} offsetY={0} height={height/2} width={width}/> */}
        {/* <PieChartV2 offsetX={0} offsetY={0} height={height/2} width={width}/>
        <PieChartV3 offsetX={0} offsetY={0} height={height/2} width={width}/>
        <PieChartV4 offsetX={0} offsetY={0} height={height/2} width={width}/> */}
    </g>
}
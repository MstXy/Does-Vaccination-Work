import React from "react";
import * as d3 from "d3";
import { Piechart} from "./piecharts";
import {Bar} from "./bar";

export function ToolTip(props){

    const {margin, height, width, default_world, selectedPoint} = props;

    const v1_width = 60;
    const v1_height= 180+80;
    const v2_width = 60;
    const v2_height= 180+210;
    const v3_width = 60;
    const v3_height= 180+340;
    const v4_width = 60;
    const v4_height= 180+470;

    const text_leftpad = 0;

    const explain_leftpad = 70;

    if (!selectedPoint) {
        var country_to_show = default_world;
    } else {
        var country_to_show = selectedPoint;
    }
    const getColor = (d) => {
        if (d.MajorityVaccinated === "True") {
            return "#0abab5"
        } else if (d.MajorityVaccinated === "False") {
            return "#ffc0cb"
        }
    }
   
    return <g transform={`translate(${margin.left}, ${margin.top})`}>
        <g>
            <text x={text_leftpad} y={0}>
                Country Name: {country_to_show.CountryName}
            </text>
            <text x={text_leftpad} y={20}>
                Date: {country_to_show.Date}
            </text>
            <text x={text_leftpad} y={40}>
                Total Cases: {country_to_show.ConfirmedCases}
            </text>
            <text x={text_leftpad} y={60}>
                Total Deaths: {country_to_show.ConfirmedDeaths}
            </text>
            <text x={text_leftpad} y={80}>
                Daily Cases: {country_to_show.NewConfirmedCases}
            </text>
            <text x={text_leftpad} y={100}>
                Daily Deaths: {country_to_show.NewConfirmedDeaths}
            </text>
            <text x={text_leftpad} y={120}>
                Total Population: {country_to_show.Population}
            </text>
            <text x={text_leftpad} y={140}>
                Vaccinated Population: {country_to_show.PopulationVaccinated}
            </text>
            <text y={160}>
                Percentage Vaccinated: <tspan fontWeight={"bold"} fill={getColor(country_to_show)}>{country_to_show.PercentageVaccinated}%</tspan>
            </text>
            <text y={190} textDecoration={"underline"}>
                Government Vaccination Policies:
            </text>
        </g>

        <Bar width={10} height={165} x={250} y={-170} data={country_to_show}/>

        <text y={v1_height} x ={v1_width} textAnchor={"middle"}> V1_index</text>
        <Piechart width = {v1_width} height={v1_height} data = {country_to_show.V1}/>
        <text y={v1_height} x ={v1_width+explain_leftpad}>Vaccine Prioritisation</text>

        <text y={v2_height} x ={v2_width} textAnchor={"middle"}> V2_index</text>
        <Piechart width = {v2_width} height={v2_height} data={country_to_show.V2}/>
        <text y={v2_height} x ={v2_width+explain_leftpad}>Vaccine Availability</text>

        <text y={v3_height} x ={v3_width} textAnchor={"middle"}> V3_index</text>
        <Piechart width = {v3_width} height={v3_height} data={country_to_show.V3}/>
        <text y={v3_height} x ={v3_width+explain_leftpad}>Vaccine Financial Support</text>

        <text y={v4_height} x ={v1_width} textAnchor={"middle"}> V4_index</text> 
        <Piechart width = {v4_width} height={v4_height} data={country_to_show.V4}/>
        <text y={v4_height} x ={v4_width+explain_leftpad}>Mandatory Vaccination</text>
    </g>
}
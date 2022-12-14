import React from "react";
import * as d3 from "d3";
import { interpolateTurbo } from "d3";
import { Piechart} from "./piecharts";
import {Bar} from "./bar";

export function ToolTip(props){

    const {margin, height, width, default_world, selectedPoint} = props;

    const [hoverOnV1, setV1State] = React.useState(null);
    const [hoverOnV2, setV2State] = React.useState(null);
    const [hoverOnV3, setV3State] = React.useState(null);
    const [hoverOnV4, setV4State] = React.useState(null);


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
    const detail_leftpad = 45;

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

    const showV1 = () => {
        setV1State(true);
    }
    const hideV1 = () => {
        setV1State(null);
    }
    const v_tooltip_display = (s) => {
        if (s == true) {
            return "block";
        } else {
            return "none";
        }
    }

    const showV2 = () => {
        setV2State(true);
    }
    const hideV2 = () => {
        setV2State(null);
    }

    const showV3 = () => {
        setV3State(true);
    }
    const hideV3 = () => {
        setV3State(null);
    }

    const showV4 = () => {
        setV4State(true);
    }
    const hideV4 = () => {
        setV4State(null);
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
        <text y={v1_height} x ={v1_width+explain_leftpad}
            onMouseOver={showV1} onMouseOut={hideV1}>
                Vaccine Prioritisation
        </text>

        <text y={v2_height} x ={v2_width} textAnchor={"middle"}> V2_index</text>
        <Piechart width = {v2_width} height={v2_height} data={country_to_show.V2}/>
        <text y={v2_height} x ={v2_width+explain_leftpad}
            onMouseOver={showV2} onMouseOut={hideV2}>
                Vaccine Availability
        </text>

        <text y={v3_height} x ={v3_width} textAnchor={"middle"}> V3_index</text>
        <Piechart width = {v3_width} height={v3_height} data={country_to_show.V3}/>
        <text y={v3_height} x ={v3_width+explain_leftpad}
            onMouseOver={showV3} onMouseOut={hideV3}>
                Vaccine Financial Support
        </text>

        <text y={v4_height} x ={v1_width} textAnchor={"middle"}> V4_index</text> 
        <Piechart width = {v4_width} height={v4_height} data={country_to_show.V4}/>
        <text y={v4_height} x ={v4_width+explain_leftpad}
            onMouseOver={showV4} onMouseOut={hideV4}>
                Mandatory Vaccination
        </text>

        {/* tooltip */}
        <rect fill={"#ffc98c"} opacity={0} width={200} height={85} x={v1_width+detail_leftpad-5} y={v1_height-15} rx={6} ry={6} 
            onMouseOver={showV1} onMouseOut={hideV1} display={v_tooltip_display(hoverOnV1)}/>
        <rect fill={"#ffc98c"} width={200} height={85} x={v1_width+detail_leftpad-5} y={v1_height+10} rx={6} ry={6} 
            onMouseOver={showV1} onMouseOut={hideV1} display={v_tooltip_display(hoverOnV1)}/>
        <text transform={`translate(${v1_width+detail_leftpad},${v1_height+30})`} 
            onMouseOver={showV1} onMouseOut={hideV1} display={v_tooltip_display(hoverOnV1)}>
            <tspan x="0" dy="0em">Prioritisation for some group. </tspan>
            <tspan x="0" dy="1.2em">· <tspan fontWeight={"bold"} fill={"#5e5e5e"}>0.00</tspan> - No prioritisation.</tspan>
            <tspan x="0" dy="1.2em">· <tspan fontWeight={"bold"} fill={interpolateTurbo(0.75)}>0.50</tspan> - Some prioritisation.</tspan>
            <tspan x="0" dy="1.2em">· <tspan fontWeight={"bold"} fill={"#02c402"}>1.00</tspan> - Full prioritisation.</tspan>
        </text>

        <rect fill={"#ffc98c"} opacity={0} width={200} height={105} x={v2_width+detail_leftpad-5} y={v2_height-15} rx={6} ry={6} 
            onMouseOver={showV2} onMouseOut={hideV2} display={v_tooltip_display(hoverOnV2)}/>
        <rect fill={"#ffc98c"} width={200} height={105} x={v2_width+detail_leftpad-5} y={v2_height+10} rx={6} ry={6} 
            onMouseOver={showV2} onMouseOut={hideV2} display={v_tooltip_display(hoverOnV2)}/>
        <text transform={`translate(${v2_width+detail_leftpad},${v2_height+30})`} 
            onMouseOver={showV2} onMouseOut={hideV2} display={v_tooltip_display(hoverOnV2)}>
            <tspan x="0" dy="0em">Availability for some group. </tspan>
            <tspan x="0" dy="1.2em">· <tspan fontWeight={"bold"} fill={"#5e5e5e"}>0.00</tspan> - Not availabile to any.</tspan>
            <tspan x="0" dy="1.2em">· <tspan fontWeight={"bold"} fill={interpolateTurbo(0.9)}>0.33</tspan> - Available to some.</tspan>
            <tspan x="0" dy="1.2em">· <tspan fontWeight={"bold"} fill={"#fffe00"}>0.66</tspan> - Available to more.</tspan>
            <tspan x="0" dy="1.2em">· <tspan fontWeight={"bold"} fill={"#02c402"}>1.00</tspan> - Available to all.</tspan>
        </text>

        <rect fill={"#ffc98c"} opacity={0} width={200} height={85} x={v3_width+detail_leftpad-5} y={v3_height-15} rx={6} ry={6} 
            onMouseOver={showV3} onMouseOut={hideV3} display={v_tooltip_display(hoverOnV3)}/>
        <rect fill={"#ffc98c"} width={200} height={85} x={v3_width+detail_leftpad-5} y={v3_height+10} rx={6} ry={6} 
            onMouseOver={showV3} onMouseOut={hideV3} display={v_tooltip_display(hoverOnV3)}/>
        <text transform={`translate(${v3_width+detail_leftpad},${v3_height+30})`} 
            onMouseOver={showV3} onMouseOut={hideV3} display={v_tooltip_display(hoverOnV3)}>
            <tspan x="0" dy="0em">Cost of Vaccination. </tspan>
            <tspan x="0" dy="1.2em">· <tspan fontWeight={"bold"} fill={"#5e5e5e"}>0.00</tspan> - Full cost.</tspan>
            <tspan x="0" dy="1.2em">· <tspan fontWeight={"bold"} fill={interpolateTurbo(0.75)}>0.50</tspan> - Partially funded.</tspan>
            <tspan x="0" dy="1.2em">· <tspan fontWeight={"bold"} fill={"#02c402"}>1.00</tspan> - Fully covered (Free).</tspan>
        </text>

        <rect fill={"#ffc98c"} opacity={0} width={155} height={65} x={v4_width+detail_leftpad-5} y={v4_height-15} rx={6} ry={6} 
            onMouseOver={showV4} onMouseOut={hideV4} display={v_tooltip_display(hoverOnV4)}/>
        <rect fill={"#ffc98c"} width={155} height={65} x={v4_width+detail_leftpad-5} y={v4_height+10} rx={6} ry={6} 
            onMouseOver={showV4} onMouseOut={hideV4} display={v_tooltip_display(hoverOnV4)}/>
        <text transform={`translate(${v4_width+detail_leftpad},${v4_height+30})`} 
            onMouseOver={showV4} onMouseOut={hideV4} display={v_tooltip_display(hoverOnV4)}>
            <tspan x="0" dy="0em">Required Vaccination. </tspan>
            <tspan x="0" dy="1.2em">· <tspan fontWeight={"bold"} fill={"#5e5e5e"}>0.00</tspan> - Not required.</tspan>
            <tspan x="0" dy="1.2em">· <tspan fontWeight={"bold"} fill={"#02c402"}>1.00</tspan> - Required.</tspan>
        </text>
    </g>
}
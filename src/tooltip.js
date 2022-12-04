import React from "react";

export function ToolTip(props){

    const {margin, height, width, default_world, selectedPoint} = props;

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
        </g>
    </g>
}
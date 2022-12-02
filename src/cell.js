import React from "react";

export function Cell(props){
    const { d, xScale, yScale, color} = props;
    
    return <g transform={`translate(${xScale(d.Date)}, ${yScale(d.CountryName)})`}>
        <rect width={xScale.bandwidth()} height={yScale.bandwidth()} fill={color} stroke={"black"} />
    </g>
}
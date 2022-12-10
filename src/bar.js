import React from "react";
import * as d3 from "d3";
export {Bar}

function Bar(props){
    const{width,height,x,y,data} = props;
    
    const getHeight = (d) => {
        return d.PercentageVaccinated / 100 * height;
    }
    const getColor = (d) => {
        if (d.MajorityVaccinated === "True") {
            return "#0abab5"
        } else if (d.MajorityVaccinated === "False") {
            return "#ffc0cb"
        }
    }
  

    return <g transform={`translate(${width},${height})`}>
        <rect width={width} height={height} x={x} y={y} fill={"#d2d2d2"}></rect>
        <rect width={width} height={getHeight(data)} x={x} y={y+height-getHeight(data)} fill={getColor(data)} strokeWidth={0}></rect>
    </g>

}
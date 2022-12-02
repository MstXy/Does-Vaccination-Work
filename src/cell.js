import React from "react";

export function Cell(props){
    const { d, xScale, yScale, color, selectedPoint, setSelectedPoint} = props;
    
    const getOpacity = (selectedPoint, thisPoint) => {
        if  (!selectedPoint) {
            return 1
        } else {
            // also check if in the same row / col with the selected point
            return (selectedPoint.CountryName === thisPoint.CountryName || selectedPoint.Date === thisPoint.Date) ? 1 : 0.5  
        }
    }

    const getStrokeWidth = (selectedPoint, thisPoint) => {
        if  (!selectedPoint) {
            return 1
        } else {
            // also check if in the same row / col with the selected point
            return (selectedPoint.CountryName === thisPoint.CountryName || selectedPoint.Date === thisPoint.Date) ? 1.2 : 0.4  
        } 
    };

    const mouseOver = (d) => {
        setSelectedPoint(d);
    };
    const mouseOut = () => {
        setSelectedPoint(null);
    };

    return <g transform={`translate(${xScale(d.Date)}, ${yScale(d.CountryName)})`}>
        <rect width={xScale.bandwidth()} height={yScale.bandwidth()} fill={color} stroke={"black"}
            strokeWidth={getStrokeWidth(selectedPoint, d)} opacity={getOpacity(selectedPoint, d)}
            onMouseEnter={()=>{mouseOver(d)}} onMouseOut={mouseOut} />
    </g>
}
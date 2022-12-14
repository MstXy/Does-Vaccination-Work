import React from "react";
import * as d3 from "d3";
import {arc, interpolateTurbo} from "d3";
export {Piechart}

function Piechart(props){
    const{width,height,data} = props;

    const getColor = (data) => {
        if (data >= 80) {
            // return interpolateTurbo(0.4)
            return "#02c402"
        } else if (data >= 60) {
            return interpolateTurbo(0.6)  
        } else if (data >= 40) {
            return interpolateTurbo(0.75) 
        } else if (data >= 20) {
            return interpolateTurbo(0.9)  
        }else if (data >= 0) {
            return interpolateTurbo(1.0) 
        }
    }

    const deg = data * 360 / 100;
    const rad = deg * Math.PI / 180;
    const rad_back = rad -  2 * Math.PI; 
    const arcGenerator = arc()
        .innerRadius(35)
        .outerRadius(55)
        .padAngle(0.02)
        .cornerRadius(3);

    const arcGenerator_back = arc()
        .innerRadius(35)
        .outerRadius(55)
        .padAngle(0.02)
        .cornerRadius(3);
    // console.log(angleDaysWithPrecipitations_rad)
    

    const centroid = arcGenerator.startAngle(0).endAngle(rad).centroid();
  

    return <g transform={`translate(${width},${height})`}>
        <path d={arcGenerator({startAngle: 0,endAngle: rad})} fill={getColor(data)}/>
        <path d={arcGenerator_back({startAngle: 0,endAngle: rad_back})} fill={'#d4d4d4'}/>
        <text className={'chart-label'} 
            // x={centroid[0]} y={centroid[1]}
            x={0} y ={45} 
            textAnchor={'middle'} alignmentBaseline={'middle'} fill={"#000"} fontWeight={500} fontSize={'15px'}>
            {d3.format(".0%")(data/100)}
        </text>
    </g>

}

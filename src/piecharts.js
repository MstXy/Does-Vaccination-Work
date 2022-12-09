import React from "react";
import * as d3 from "d3";
export {Piechart}

function Piechart(props){
    const{width,height,data} = props;
    
    const deg = data * 360 / 100;
    const rad = deg * Math.PI / 180;
    const arcGenerator = d3.arc()
    .innerRadius(40)
    .outerRadius(60)
    .padAngle(0.02)
    .cornerRadius(6);

    // console.log(angleDaysWithPrecipitations_rad)
    

    const centroid = arcGenerator.startAngle(0).endAngle(rad).centroid();
  

    return <g transform={`translate(${width},${height})`}>
        <path d={arcGenerator({startAngle: 0,endAngle: rad})} fill={'#6EB7C2'}/>
        <text class={'chart-label'} x={centroid[0]} y={centroid[1]} textAnchor={'middle'} alignmentBaseline={'middle'} fill={'yellow'} fontWeight={500} fontSize={'15px'}>
            {d3.format(".0%")(data/100)}
        </text>
    </g>
//     // console.log(acs)
//     const colors = ["#05BBD2", "#2070C4"];
//     // const margin = 40;
//     // const radius = Math.min(width, height) / 2-margin;
//     // const pie = d3.pie().value(function(d) {return d.value});
//     // // console.log(pie)
//     // const arc = d3.arc().innerRadius(100).outerRadius(radius);
//     // // console.log(arc)
//     // const data_ready = pie(d3.entries(acs));
//     // console.log(data_ready)
//     // var svg = d3.create("svg")
//     // .attr("width", width)
//     // .attr("height", height)
    

//     // svg.selectAll('whatever')
//     // .data(data_ready)
//     // .join('path')
//     // .attr('d', arc)
//     // .attr('fill', function(d){ return(color(d.data.key)) })
//     // .attr("stroke", "black")
//     // .style("stroke-width", "2px")
//     // .style("opacity", 0.7)

//     // console.log(svg)

//     // const boxSize = 500;
//     d3.select("svg").remove(); // Remove the old svg
//   // Create new svg
//   const svg = d3
//     .select('element')
//     .append("svg")
//     // .attr("preserveAspectRatio", "xMidYMid meet")
//     .attr("height",height)
//     .attr("width", width)
//     // .attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
//     .append("g")
//     .attr("transform", `translate(${width / 2}, ${height / 2})`);

//   const arcGenerator = d3.arc().innerRadius(0).outerRadius(250);

//   const pieGenerator = d3.pie().value((d) => d.value);
//   const pie = pieGenerator(acs)
//   console.log(pie)

//   const arcs = svg.selectAll().data(pieGenerator(acs)).enter();
// //   console.log(arcs)
//   arcs
//     .append("path")
//     .attr("d", arcGenerator)
//     .style("fill", (d, i) => colors[i % data.length]);

//     // console.log(arcs)
//   return arcs
// }

//     svg.selectAll('whatever')
//     .data(data_ready)
//     .join('path')
//     .attr('d', d3.arc()
//         .innerRadius(100)         // This is the size of the donut hole
//         .outerRadius(radius)
//     )
//     .attr('fill', d => color(d.data[0]))
//     .attr("stroke", "black")
//     .style("stroke-width", "2px")
//     .style("opacity", 0.7)
//     return <g transform={`translate(${width/2},${height/2})`}>
//         <path d={data_ready} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />

//     </g>

}



function PieChartV1(props) {
    const width = 450,
    height = 450,
    margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    const svg = d3.select("#my_dataviz")
    .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    // Create dummy data
    const data = {a: 9, b: 20, c:30, d:8, e:12}

    // set the color scale
    const color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

    // Compute the position of each group on the pie:
    const pie = d3.pie()
    .value(d=>d[1])

    const data_ready = pie(Object.entries(data))

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
    .selectAll('whatever')
    .data(data_ready)
    .join('path')
    .attr('d', d3.arc()
        .innerRadius(100)         // This is the size of the donut hole
        .outerRadius(radius)
    )
    .attr('fill', d => color(d.data[0]))
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
}


import React from "react";
import * as d3 from "d3";
import { selectCountry } from './utils'

export {MultipleLineChart};

function MultipleLineChart(props){
    const {x, y, width, height, data} = props;
    
    const parsetime = d3.timeParse('%Y%m%d')
    const formatday = d3.timeFormat("%Y-%m-%d")
    const xdomain = ['20200101','20200701','20210101','20210701','20220101','20220701','20221101']
    const xdo = xdomain.map(data => parsetime(data))
    const xd = xdo.map(data => formatday(data))
    // console.log(xd)
    // console.log(data.map(d => d.Date))
        
        const xScale = d3.scaleBand().range([0, width])
                .domain(data.map(d => d.Date));
        const yScale = d3.scaleLinear().range([height, 0])
                .domain([0, d3.max(data, d => d.PercentageVaccinated)]);
        // var logdomainmax = Math.log(d3.max(data, d => d.PopulationVaccinated));
        // console.log(logdomainmax)
        // const yScale = d3.scaleLog().range([height, 0])
        //         .domain([1, logdomainmax]);
        const line = d3.line()
                .x(d => xScale(d.Date))
                .y(d => yScale(d.PercentageVaccinated))
                .curve(d3.curveBasis)
                ;
    
    const xTicks = xScale.domain();
    const yTicks = yScale.ticks();
    
        const Russia = selectCountry(data,'Russia')
        const China = selectCountry(data,'China')
        const India = selectCountry(data,'India')
        const United_Kingdom = selectCountry(data,'United Kingdom')
        const France = selectCountry(data,'France')
        const Germany = selectCountry(data,'Germany')
        const Italy = selectCountry(data,'Italy')
        const Saudi_Arabia = selectCountry(data,'Saudi Arabia')
        const Iran = selectCountry(data,'Iran')
        const Egypt = selectCountry(data,'Egypt')
        const South_Africa = selectCountry(data,'South Africa')
        const Canada = selectCountry(data,'Canada')
        const Australia = selectCountry(data,'Australia')
        const United_States = selectCountry(data,'United States')
        const Brazil = selectCountry(data,'Brazil')
        const Mexico = selectCountry(data,'Mexico')
        const Greece = selectCountry(data,'Greece')
        const Indonesia = selectCountry(data,'Indonesia')
        const New_Zealand = selectCountry(data,'New Zealand')
        const Argentina = selectCountry(data,'Argentina')
        const Finland = selectCountry(data,'Finland')
        const Turkey = selectCountry(data,'Turkey')
        const Ukraine = selectCountry(data,'Ukraine')
        const Japan = selectCountry(data,'Japan')
        const Spain = selectCountry(data,'Spain')
        const Mali = selectCountry(data,'Mali')
        const South_Korea = selectCountry(data,'South Korea')
        const Kazakhstan = selectCountry(data,'Kazakhstan')
        const Peru = selectCountry(data,'Peru')
        const Colombia = selectCountry(data,'Colombia')
        const World = selectCountry(data,'World')
     
        return <g transform={`translate(${x},${y})`}>
            <line y2={height} stroke={`black`} />
            {yTicks.map( tickValue => {
                return <g key={tickValue} transform={`translate(-10, ${yScale(tickValue)})`}>
                        <line x2={width} stroke={"gray"} />
                        <text style={{ textAnchor:'end', fontSize:'18px' }}>
                        {tickValue}
                        </text>
                    </g> 
            })}
            <text style={{ textAnchor:'start', fontSize:'18px'}} transform={`translate(10, 0)rotate(0)`}>
                    {"Percentage of Vaccinated"}
                </text>
            <line x1={0} y1={height} x2={width} y2={height} stroke={`black`} />
            {xTicks.map( tickValue => {
                if (xd.includes(tickValue)) {
                    return <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${height})`}>
                        <line y2={5} stroke={"black"} />
                        <text style={{ textAnchor:'middle', fontSize:'18px'}} y={20}>
                        {tickValue}
                    </text>
            </g>    
                }
                 
            })}
            {/* <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${width}, ${height-10})`}>
                            {"Time"}
                </text> */}
  

            <path d={line(Russia)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />
            <path d={line(China)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />
            <path d={line(India)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} /> 
            <path d={line(United_Kingdom)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />
            <path d={line(France)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />
            <path d={line(Germany)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} /> 
            <path d={line(Italy)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />
            <path d={line(Saudi_Arabia)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />
            <path d={line(Iran)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} /> 
            <path d={line(Egypt)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />
            <path d={line(South_Africa)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />
            <path d={line(Canada)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} /> 
            <path d={line(Australia)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />
            <path d={line(United_States)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />
            <path d={line(Brazil)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} /> 
            <path d={line(Mexico)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />
            <path d={line(Greece)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />
            <path d={line(Indonesia)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} /> 
            <path d={line(New_Zealand)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />
            <path d={line(Argentina)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />
            <path d={line(Finland)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} /> 
            <path d={line(Turkey)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />
            <path d={line(Ukraine)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />
            <path d={line(Japan)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} /> 
            <path d={line(Spain)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />
            <path d={line(Mali)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />
            <path d={line(South_Korea)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} /> 
            <path d={line(Kazakhstan)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />
            <path d={line(Peru)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} />
            <path d={line(Colombia)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} /> 
            <path d={line(World)} stroke={"#d7191c"} strokeWidth={3} fill={"none"} /> 

              {/* // const COUNTRY_30 = ['Russia', 'China', 'India', 'United Kingdom', 'France', 
    // 'Germany', 'Italy', 'Saudi Arabia', 'Iran', 'Egypt', 
    // 'South Africa', 'Canada', 'Australia', 'United States', 
    // 'Brazil', 'Mexico','Greece','Indonesia','New Zealand',
    // 'Argentina','Finland','Turkey','Ukraine','Japan','Spain',
    // 'Mali','South Korea','Kazakhstan','Peru','Colombia'] 还有World; */}
            
            <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${xScale(China.slice(-1)[0].Date)}, ${yScale(China.slice(-1)[0].PercentageVaccinated)})`}>
                            {"China"}
            </text>

            <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${xScale(India.slice(-1)[0].Date)}, ${yScale(India.slice(-1)[0].PercentageVaccinated)})`}>
                            {"India"}
            </text>

            <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${xScale(United_States.slice(-1)[0].Date)}, ${yScale(United_States.slice(-1)[0].PercentageVaccinated)})`}>
                            {"US"}
            </text>
            <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${xScale(World.slice(-1)[0].Date)}, ${yScale(World.slice(-1)[0].PercentageVaccinated)})`}>
                            {"World"}
            </text>
           

            </g>

}
import React from "react";
import * as d3 from "d3";
import { selectCountry } from './utils';
import {timeFormat, timeParse} from "d3";

export {MultipleLineChart};

function MultipleLineChart(props){
    const {x, y, width, height, data, selectedPoint, setSelectedPoint} = props;
    
    const parsetime = timeParse('%Y%m%d')
    const formatday = timeFormat("%Y-%m-%d")
    const xdomain = ['20200101','20200701','20210101','20210701','20220101','20220701','20221101']
    const xdo = xdomain.map(data => parsetime(data))
    const xd = xdo.map(data => formatday(data))
    // console.log(xd)
    // console.log(data.map(d => d.Date))
    const COUNTRY_30 = ['Russia', 'China', 'India', 'United Kingdom', 'France', 
        'Germany', 'Italy', 'Saudi Arabia', 'Iran', 'Egypt', 
        'South Africa', 'Canada', 'Australia', 'United States', 
        'Brazil', 'Mexico','Greece','Indonesia','New Zealand',
        'Argentina','Finland','Turkey','Ukraine','Japan','Spain',
        'Mali','South Korea','Kazakhstan','Peru','Colombia']
        
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


    const getOpacity = (this_country) => {
        return selectedPoint&&(selectedPoint.CountryName === this_country) ? 1 : 0.4
    }
    const getColor = (this_country) => {
        return selectedPoint&&(selectedPoint.CountryName === this_country) ? "#000" : "#d2d2d2"
    }
    
    const mouseOver = (d) => {
        setSelectedPoint(d[d.length-1]);
    };
    const mouseOut = () => {
        setSelectedPoint(null);
    };

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
            <text style={{ textAnchor:'start', fontSize:'18px'}} transform={`translate(10, 25)rotate(0)`}>
                    {"Percentage of Vaccinated Population"}
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
  
            
            <path d={line(Russia)} stroke={getColor(COUNTRY_30[0])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[0])} 
                onMouseEnter={()=>{mouseOver(Russia)}} onMouseOut={mouseOut}
            />
            <path d={line(China)} stroke={getColor(COUNTRY_30[1])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[1])}
                onMouseEnter={()=>{mouseOver(China)}} onMouseOut={mouseOut}
            
            />
            <path d={line(India)} stroke={getColor(COUNTRY_30[2])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[2])}
                onMouseEnter={()=>{mouseOver(India)}} onMouseOut={mouseOut}
            /> 
            <path d={line(United_Kingdom)} stroke={getColor(COUNTRY_30[3])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[3])}
                onMouseEnter={()=>{mouseOver(United_Kingdom)}} onMouseOut={mouseOut}
            />
            <path d={line(France)} stroke={getColor(COUNTRY_30[4])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[4])}
                onMouseEnter={()=>{mouseOver(France)}} onMouseOut={mouseOut}
            />
            <path d={line(Germany)} stroke={getColor(COUNTRY_30[5])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[5])}
                onMouseEnter={()=>{mouseOver(Germany)}} onMouseOut={mouseOut}
            /> 
            <path d={line(Italy)} stroke={getColor(COUNTRY_30[6])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[6])}
                onMouseEnter={()=>{mouseOver(Italy)}} onMouseOut={mouseOut}
            />
            <path d={line(Saudi_Arabia)} stroke={getColor(COUNTRY_30[7])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[7])}
                onMouseEnter={()=>{mouseOver(Saudi_Arabia)}} onMouseOut={mouseOut}
            />
            <path d={line(Iran)} stroke={getColor(COUNTRY_30[8])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[8])}
                onMouseEnter={()=>{mouseOver(Iran)}} onMouseOut={mouseOut}
            /> 
            <path d={line(Egypt)} stroke={getColor(COUNTRY_30[9])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[9])}
                onMouseEnter={()=>{mouseOver(Egypt)}} onMouseOut={mouseOut}
            />
            <path d={line(South_Africa)} stroke={getColor(COUNTRY_30[10])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[10])}
                onMouseEnter={()=>{mouseOver(South_Africa)}} onMouseOut={mouseOut}
            />
            <path d={line(Canada)} stroke={getColor(COUNTRY_30[11])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[11])}
                onMouseEnter={()=>{mouseOver(Canada)}} onMouseOut={mouseOut}
            /> 
            <path d={line(Australia)} stroke={getColor(COUNTRY_30[12])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[12])}
                onMouseEnter={()=>{mouseOver(Australia)}} onMouseOut={mouseOut}
            />
            <path d={line(United_States)} stroke={getColor(COUNTRY_30[13])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[13])}
                onMouseEnter={()=>{mouseOver(United_States)}} onMouseOut={mouseOut}
            />
            <path d={line(Brazil)} stroke={getColor(COUNTRY_30[14])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[14])}
                onMouseEnter={()=>{mouseOver(Brazil)}} onMouseOut={mouseOut}
            /> 
            <path d={line(Mexico)} stroke={getColor(COUNTRY_30[15])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[15])}
                onMouseEnter={()=>{mouseOver(Mexico)}} onMouseOut={mouseOut}
            />
            <path d={line(Greece)} stroke={getColor(COUNTRY_30[16])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[16])}
                onMouseEnter={()=>{mouseOver(Greece)}} onMouseOut={mouseOut}
            />
            <path d={line(Indonesia)} stroke={getColor(COUNTRY_30[17])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[17])}
                onMouseEnter={()=>{mouseOver(Indonesia)}} onMouseOut={mouseOut}
            /> 
            <path d={line(New_Zealand)} stroke={getColor(COUNTRY_30[18])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[18])}
                onMouseEnter={()=>{mouseOver(New_Zealand)}} onMouseOut={mouseOut}
            />
            <path d={line(Argentina)} stroke={getColor(COUNTRY_30[19])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[19])}
                onMouseEnter={()=>{mouseOver(Argentina)}} onMouseOut={mouseOut}
            />
            <path d={line(Finland)} stroke={getColor(COUNTRY_30[20])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[20])}
                onMouseEnter={()=>{mouseOver(Finland)}} onMouseOut={mouseOut}
            /> 
            <path d={line(Turkey)} stroke={getColor(COUNTRY_30[21])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[21])}
                onMouseEnter={()=>{mouseOver(Turkey)}} onMouseOut={mouseOut}
            />
            <path d={line(Ukraine)} stroke={getColor(COUNTRY_30[22])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[22])}
                onMouseEnter={()=>{mouseOver(Ukraine)}} onMouseOut={mouseOut}
            />
            <path d={line(Japan)} stroke={getColor(COUNTRY_30[23])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[23])}
                onMouseEnter={()=>{mouseOver(Japan)}} onMouseOut={mouseOut}
            /> 
            <path d={line(Spain)} stroke={getColor(COUNTRY_30[24])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[24])}
                onMouseEnter={()=>{mouseOver(Spain)}} onMouseOut={mouseOut}
            />
            <path d={line(Mali)} stroke={getColor(COUNTRY_30[25])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[25])}
                onMouseEnter={()=>{mouseOver(Mali)}} onMouseOut={mouseOut}
            />
            <path d={line(South_Korea)} stroke={getColor(COUNTRY_30[26])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[26])}
                onMouseEnter={()=>{mouseOver(South_Korea)}} onMouseOut={mouseOut}
            /> 
            <path d={line(Kazakhstan)} stroke={getColor(COUNTRY_30[27])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[27])}
                onMouseEnter={()=>{mouseOver(Kazakhstan)}} onMouseOut={mouseOut}
            />
            <path d={line(Peru)} stroke={getColor(COUNTRY_30[28])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[28])}
                onMouseEnter={()=>{mouseOver(Peru)}} onMouseOut={mouseOut}
            />
            <path d={line(Colombia)} stroke={getColor(COUNTRY_30[29])} strokeWidth={3} fill={"none"} opacity={getOpacity(COUNTRY_30[29])}
                onMouseEnter={()=>{mouseOver(Colombia)}} onMouseOut={mouseOut}
            /> 
            <path d={line(World)} stroke={"#000"} strokeWidth={4} fill={"none"}/> 

              {/* // const COUNTRY_30 = ['Russia', 'China', 'India', 'United Kingdom', 'France', 
    // 'Germany', 'Italy', 'Saudi Arabia', 'Iran', 'Egypt', 
    // 'South Africa', 'Canada', 'Australia', 'United States', 
    // 'Brazil', 'Mexico','Greece','Indonesia','New Zealand',
    // 'Argentina','Finland','Turkey','Ukraine','Japan','Spain',
    // 'Mali','South Korea','Kazakhstan','Peru','Colombia'] 还有World; */}
            
            {/* <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${xScale(China.slice(-1)[0].Date)}, ${yScale(China.slice(-1)[0].PercentageVaccinated)})`}>
                            {"China"}
            </text>

            <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${xScale(India.slice(-1)[0].Date)}, ${yScale(India.slice(-1)[0].PercentageVaccinated)})`}>
                            {"India"}
            </text>

            <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${xScale(United_States.slice(-1)[0].Date)}, ${yScale(United_States.slice(-1)[0].PercentageVaccinated)})`}>
                            {"US"}
            </text> */}
            <text style={{ textAnchor:'end', fontSize:'18px'}} transform={`translate(${xScale(World.slice(-1)[0].Date)}, ${yScale(World.slice(-1)[0].PercentageVaccinated)})`}>
                            {"World"}
            </text>
           

            </g>

}
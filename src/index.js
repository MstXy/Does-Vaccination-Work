import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import { csv, json } from "d3";

import "./styles.css";
import { HeatMap } from "./heatmap";
import { LineChart, MultipleLineChart } from './linecharts';
import { ToolTip } from "./tooltip";

import { useData, selectCountry } from './utils'


// const csvUrl_daily = 'https://gist.githubusercontent.com/MstXy/fae64c4763555d0d7209a1ed3dd9574b/raw/677d5da2017080fee0660223f94266d0ea0e950b/daily_oxcgrt.csv';
const csvUrl_tenDay31 = 'https://gist.githubusercontent.com/SingleRubbish/054c07b902845a567c3e5be132284b00/raw/5fdeb4d91c0615ee4939f79f2f4c6385b42326af/tendays31';
// const csvUrl_monthly = 'https://gist.githubusercontent.com/MstXy/fae64c4763555d0d7209a1ed3dd9574b/raw/677d5da2017080fee0660223f94266d0ea0e950b/monthly_oxcgrt.csv';

const COUNTRY_16 = ['Russia', 'China', 'India', 'United Kingdom', 'France', 
                    'Germany', 'Italy', 'Saudi Arabia', 'Congo', 'Egypt', 
                    'South Africa', 'Canada', 'Australia', 'United States', 'Brazil', 'Mexico'];
const COUNTRY_20 = ['Russia', 'China', 'India', 'United Kingdom', 'France', 
                    'Germany', 'Italy', 'Saudi Arabia', 'Congo', 'Egypt', 
                    'South Africa', 'Canada', 'Australia', 'United States', 'Brazil', 
                    'Mexico','Greenland','Indonesia','New Zealand','Argentina'];
const COUNTRY_30 = ['Russia', 'China', 'India', 'United Kingdom', 'France', 
                    'Germany', 'Italy', 'Saudi Arabia', 'Iran', 'Egypt', 
                    'South Africa', 'Canada', 'Australia', 'United States', 
                    'Brazil', 'Mexico','Greece','Indonesia','New Zealand',
                    'Argentina','Finland','Turkey','Ukraine','Japan','Spain',
                    'Mali','South Korea','Kazakhstan','Peru','Colombia'];

const COUNTRY_31 = ['Russia', 'China', 'India', 'United Kingdom', 'France', 
                    'Germany', 'Italy', 'Saudi Arabia', 'Iran', 'Egypt', 
                    'South Africa', 'Canada', 'Australia', 'United States', 
                    'Brazil', 'Mexico','Greece','Indonesia','New Zealand',
                    'Argentina','Finland','Turkey','Ukraine','Japan','Spain',
                    'Mali','South Korea','Kazakhstan','Peru','Colombia','World'];

function Vacc(){

    const [selectedPoint, setSelectedPoint] = React.useState(null);
    const [hover_on_line, setHoverState] = React.useState(false);
    const [case_death_percentage, setCaseOrDeath_percentage] = React.useState(0);
    const [caseChecked, setCaseChecked] = React.useState(true);
    const [deathChecked, setDeathChecked] = React.useState(false);
    const [case_percentageChecked, setCase_percentageChecked] = React.useState(false);
    const [death_percentageChecked, setDeath_percentageChecked] = React.useState(false);
    const [color,setColor] = React.useState(0);
    const [blue1checked,setBlue1Checked] = React.useState(true);
    const [blue2checked,setBlue2Checked] = React.useState(false);
    const [red1checked,setRed1Checked] = React.useState(false);
    const [red2checked,setRed2Checked] = React.useState(false);
    const [rainbowchecked,setRainbowChecked] = React.useState(false);

    const WIDTH = 1400;
    const HEIGHT = 900;
    
    const heatmap_margin = {top: 100, right: 340, bottom: 500, left: 120};
    const heatmap_height = HEIGHT - heatmap_margin.top - heatmap_margin.bottom;
    const heatmap_width = WIDTH - heatmap_margin.left - heatmap_margin.right;
    
    const linechart_margin = {top: 460, right: 340, bottom: 125, left: 125};
    const linechart_height = HEIGHT - linechart_margin.top - linechart_margin.bottom;
    const linechart_width = WIDTH - linechart_margin.left + 5 - linechart_margin.right;

    const tooltip_margin = {top: 85, right: 30, bottom: 500, left: 1100};
    const tooltip_height = HEIGHT - tooltip_margin.top - tooltip_margin.bottom;
    const tooltip_width = WIDTH - tooltip_margin.left - tooltip_margin.right;

    
    // select data
    const data_range_choices = ["tenDay"];
    const dataUrl_choices = [csvUrl_tenDay31];
    var dataSelection_idx = 0;
    const data = useData(dataUrl_choices[dataSelection_idx], data_range_choices[dataSelection_idx]);

    

    if (!data) {
        return <p>Loading...</p>
    }

    var COUNTRY_LIST = COUNTRY_30;
    // filter data to country only in the list
    const filteredData = selectCountry(data, COUNTRY_LIST);
    // var countryline = COUNTRY_31
    // const datalinechart = selectCountry(data,countryline)
    // console.log(filteredData);

    // get default world data to display.
    const default_world = data[data.length-1];
    // console.log(default_world);

    // SWITCH for: New Confirmed Cases or New Confirmd Deaths
    // var case_or_death = 1;  // 0 for cases, 1 for deaths
    const onClick_case = () => {
        setCaseOrDeath_percentage(0);
        setCaseChecked(true);
        setDeathChecked(false);  
        setCase_percentageChecked(false);
        setDeath_percentageChecked(false);
    };
    const onClick_death = () => {
        setCaseOrDeath_percentage(1);
        setDeathChecked(true);  
        setCaseChecked(false);  
        setCase_percentageChecked(false);
        setDeath_percentageChecked(false);
    };

    const onClick_case_percentage = () => {
        setCaseOrDeath_percentage(2);
        setDeathChecked(false);  
        setCaseChecked(false);  
        setCase_percentageChecked(true);
        setDeath_percentageChecked(false);
    };

    const onClick_death_percentage = () => {
        setCaseOrDeath_percentage(3);
        setDeathChecked(false);  
        setCaseChecked(false);  
        setCase_percentageChecked(false);
        setDeath_percentageChecked(true);
    };

    const onClick_blue1  = () => {
        setColor(0);
        setBlue1Checked(true);  
        setBlue2Checked(false);  
        setRed1Checked(false);
        setRed2Checked(false);
        setRainbowChecked(false);
    };

    const onClick_blue2  = () => {
        setColor(1);
        setBlue1Checked(false);  
        setBlue2Checked(true);  
        setRed1Checked(false);
        setRed2Checked(false);
        setRainbowChecked(false);
    };

    const onClick_red1  = () => {
        setColor(2);
        setBlue1Checked(false);  
        setBlue2Checked(false);  
        setRed1Checked(true);
        setRed2Checked(false);
        setRainbowChecked(false);
    };

    const onClick_red2  = () => {
        setColor(3);
        setBlue1Checked(false);  
        setBlue2Checked(false);  
        setRed1Checked(false);
        setRed2Checked(true);
        setRainbowChecked(false);
    };

    const onClick_rainbow  = () => {
        setColor(4);
        setBlue1Checked(false);  
        setBlue2Checked(false);  
        setRed1Checked(false);
        setRed2Checked(false);
        setRainbowChecked(true);
    };

    return <div>
        <p id="title">💉 Does Vaccination Work?</p>
        <p id="subtitle">Based on Covid Cases, Vaccinated Population and Vaccination Policies.</p>
        <p id="credit">Made by Chengyu Zhang, Shixuan Zheng, Scott Ye</p>
        <input type="checkbox" className="checkbox" id="showCase" name="showCase" onChange={onClick_case} checked={caseChecked}/>
        <p className="checkbox_text" id="checkbox_text_case">Show Confirmed Cases</p>
        <input type="checkbox" className="checkbox" id="showDeath" name="showDeath" onChange={onClick_death} checked={deathChecked}/>
        <p className="checkbox_text" id="checkbox_text_death">Show Confirmed Deaths</p>
        <input type="checkbox" className="checkbox" id="showCasepercent" name="showCasepercent" onChange={onClick_case_percentage} checked={case_percentageChecked}/>
        <p className="checkbox_text" id="checkbox_text_case_percent">Show Cases (%)</p>
        <input type="checkbox" className="checkbox" id="showDeathpercent" name="showDeathpercent" onChange={onClick_death_percentage} checked={death_percentageChecked}/>
        <p className="checkbox_text" id="checkbox_text_death_percent">Show Deaths (%)</p>

        <div>
            <p id="colormap">Colormap:</p>
            <input type="checkbox" className="checkboxcolor" id="showblue1" name="showblue1" onChange={onClick_blue1} checked={blue1checked}/>
            <p className="checkboxcolor_text" id="checkboxcolor_text_blue1">Blue 1</p>
            <input type="checkbox" className="checkboxcolor" id="showblue2" name="showblue2" onChange={onClick_blue2} checked={blue2checked}/>
            <p className="checkboxcolor_text" id="checkboxcolor_text_blue2">Blue 2</p>
            <input type="checkbox" className="checkboxcolor" id="showred1" name="showred1" onChange={onClick_red1} checked={red1checked}/>
            <p className="checkboxcolor_text" id="checkboxcolor_text_red1">Red 1</p>
            <input type="checkbox" className="checkboxcolor" id="showred2" name="showred2" onChange={onClick_red2} checked={red2checked}/>
            <p className="checkboxcolor_text" id="checkboxcolor_text_red2">Red 2</p>
            <input type="checkbox" className="checkboxcolor" id="showrainbow" name="showrainbow" onChange={onClick_rainbow} checked={rainbowchecked}/>
            <p className="checkboxcolor_text" id="checkboxcolor_text_rainbow">Rainbow</p>
        </div>

        <svg width={WIDTH} height={HEIGHT}>
            <g>
                <HeatMap margin={heatmap_margin} height={heatmap_height} width={heatmap_width} data={filteredData} COUNTRY={COUNTRY_LIST} Color = {color} SWITCH={case_death_percentage}
                    selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint} hover_on_line={hover_on_line}/>
                <MultipleLineChart x={linechart_margin.left} y={linechart_margin.top} width={linechart_width} height={linechart_height} data={data}
                    selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint} setHoverState={setHoverState}/>
                <ToolTip margin={tooltip_margin} height={tooltip_height} width={tooltip_width} 
                    default_world={default_world} selectedPoint={selectedPoint}/>
            </g>
        </svg>
        
        {/* <p id="scroll-container">
            <p id="scroll-text">This is scrolling text.</p>
        </p>
         */}
        <p id="conclusion">Vaccination does NOT work!</p>
        <p id="conclusion_text">
                If Covid-19 Vaccination works, we'll expect to see the below pattern: 
                a clear distinction line could be drawn, where a significant drop of cases could be seen.
                <br/>
                However, it is not the case in the above graph.
                With world vaccinated population growing, the daily confirmed cases or deaths does not drop at all.</p>
        <img src="https://raw.githubusercontent.com/MstXy/Does-Vaccination-Work/main/demonstration.png" alt="vaccination demonstration" id="demostration"/>
        <p id="caption"> 
            Measles cases in the United States in the 20th Century. 
            <br/>
            From <a href="http://graphics.wsj.com/infectious-diseases-and-vaccines/">Battling Infectious Diseases in the 20th Century: The Impact of Vaccines </a>
        </p>
        <p id="at_least">
            At least for now.
        </p>
        <p id="final_conclusion">
            Thus, we need to find more effective vaccines sooner.
            As more and more country are opening up on Covid-19, the seemingly non-harmful virus could still pose threat to our lives.
            And an effective vaccines with a better support of vaccination policy is needed.
        </p>
        <p id="final_final_conclusion">
            😉
        </p>
    </div>


    
}

ReactDOM.render(<Vacc/ >, document.getElementById("root"));
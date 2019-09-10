import React from 'react';
import {rotate} from './RotationCalculations';
import {Point} from "./Point";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {ORIGIN_POINT, CHART_CONFIG, addPointToChart} from './HighChartsUtils';

export class RotationCounter extends React.Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            x: null,
            y: null,
            theta: null
        };
    }

    updateChart = (x, y, resultX, resultY) => {
        const chart = this.refs.RotationChart.chart;

        while(chart.series.length > 0)
            chart.series[0].remove(true);
        chart.addSeries(ORIGIN_POINT);

        let newConfig = CHART_CONFIG;
        const reference = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        const min = -reference - 5;
        const max = reference + 5;

        newConfig.xAxis.min = min;
        newConfig.xAxis.max = max;
        newConfig.yAxis.min = min;
        newConfig.yAxis.max = max;

        chart.update(newConfig);

        addPointToChart(chart, x, y, 'Start point');
        addPointToChart(chart, resultX, resultY, 'End point');
    };

    handleRun = () => {
        if (this.state.x && this.state.y && this.state.theta) {
            const pointToRotate = new Point(this.state.x, this.state.y);
            const resultPoint = rotate(pointToRotate, this.state.theta);
            this.refs.RotateResultX.textContent = resultPoint.x;
            this.refs.RotateResultY.textContent = resultPoint.y;
            this.updateChart(this.state.x, this.state.y, resultPoint.x, resultPoint.y)
        }
    };

    handleXInputChange = (event) => {
        this.setState({
            x: parseFloat(event.target.value)
        });
    };

    handleYInputChange = (event) => {
        this.setState({
            y: parseFloat(event.target.value)
        });
    };

    handleThetaInputChange = (event) => {
        this.setState({
            theta: event.target.value
        });
    };

    render() {
        return (
            <div className='rotation__container flex-column-center'>
                <div className='rotation__chart'>
                    <HighchartsReact ref='RotationChart'
                                     highcharts={Highcharts}
                                     options={CHART_CONFIG}/>
                </div>
                <div className='rotation__inputs flex-column-center'>
                    <div className='rotation__inputs--point'>
                        <span>(</span>
                        <input type="text" onChange={this.handleXInputChange} onKeyPress={this.handleKeyPressed} ref='XInputField' placeholder='X'/>
                        <span>,</span>
                        <input type="text" onChange={this.handleYInputChange} onKeyPress={this.handleKeyPressed} ref='YInputField' placeholder='Y'/>
                        <span>)</span>
                    </div>
                    <input type="text" onChange={this.handleThetaInputChange} onKeyPress={this.handleKeyPressed} ref='ThetaInputField' placeholder='Theta [deg]'/>
                </div>
                <div className='rotation__run-button'>
                    <button className='rotation__button custom-button' onClick={this.handleRun}>Run</button>
                </div>
                <div className='rotation__results flex-column-center'>
                    <span>Result:</span>
                    <div className='rotation__results--point'>
                        <span>(</span>
                        <span ref='RotateResultX'>X'</span>
                        <span>,</span>
                        <span ref='RotateResultY'>Y'</span>
                        <span>)</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default RotationCounter;

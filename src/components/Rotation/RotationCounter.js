import React from 'react';
import {rotate} from './RotationCalculations';
import {Point} from "./Point";


export class RotationCounter extends React.Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            x: null,
            y: null,
            theta: null
        };

        this.handleXInputChange = this.handleXInputChange.bind(this);
        this.handleYInputChange = this.handleYInputChange.bind(this);
        this.handleThetaInputChange = this.handleThetaInputChange.bind(this);
        this.handleRun = this.handleRun.bind(this);

    }

    handleXInputChange = (event) => {
        this.setState({
            x: event.target.value
        });
    };

    handleYInputChange = (event) => {
        this.setState({
            y: event.target.value
        });
    };

    handleThetaInputChange = (event) => {
        this.setState({
            theta: event.target.value
        });
    };

    handleRun() {
        if (this.state.x && this.state.y && this.state.theta) {
            const pointToRotate = new Point(this.state.x, this.state.y);
            const resultPoint = rotate(pointToRotate, this.state.theta);
            this.refs.RotateResultX.textContent = resultPoint.x;
            this.refs.RotateResultY.textContent = resultPoint.y;
            console.log(resultPoint);
        }
    }

    render() {
        return (
            <div className='rotation__container flex-column-center'>
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
                    <button className='custom-button' onClick={this.handleRun}>Run</button>
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

import React from 'react';
import * as utils from './Utils';
import * as constants from './Constants';

export class Calculator extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            start: true,
            numberLeft: null,
            job: null,
            numberRight: null
        };

        this.calculate = this.calculate.bind(this);
        this.handleKeyPressed = this.handleKeyPressed.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateInputState = this.updateInputState.bind(this);
        this.renderInputField = this.renderInputField.bind(this);
        this.activateKeyPressedAction = this.activateKeyPressedAction.bind(this);
        this.resetState = this.resetState.bind(this);
        this.setCalculatorState = this.setCalculatorState.bind(this);
        this.setInputOutputFields = this.setInputOutputFields.bind(this);
        this.hidePlaceholder = this.hidePlaceholder.bind(this);
    };

    componentDidMount() {
        this.refs.InputField.value = 0;
    }

    hidePlaceholder() {
        if (this.state.start) {
            this.refs.InputField.value = '';
            this.setState({
                start: false
            });
        }
    }

    setCalculatorState(numLeft, jobAssigned, numRight, start = false) {
        this.setState({
            numberLeft: numLeft,
            job: jobAssigned,
            numberRight: numRight,
            start: start
        });
    }

    setInputOutputFields(input, output) {
        this.refs.CurrentStateDisplay.textContent = output ;
        this.refs.InputField.value = input;
    }

    resetState() {
        this.setCalculatorState(null, null, null, true);
        this.setInputOutputFields(0, '');
    }

    calculate(event, nextJobToAssign) {
        if (event) event.preventDefault();

        const result = utils.getResult(parseFloat(this.state.numberLeft), this.state.job, parseFloat(this.state.numberRight));
        this.setCalculatorState(result,nextJobToAssign ? nextJobToAssign : null, null);
        this.setInputOutputFields('', result + (nextJobToAssign ? ' ' + String.fromCharCode(nextJobToAssign) : ''));
    }

    activateKeyPressedAction(keyCode, event) {
        if (constants.JOBS_CODES.includes(keyCode)) {
            if (this.state.numberLeft && this.state.numberRight === null) {
                this.setState({
                    job: keyCode
                });
                this.setInputOutputFields('', this.state.numberLeft + ' ' + String.fromCharCode(keyCode));
                if (event) event.preventDefault();
            }
            else if (this.state.numberRight) {
                this.calculate(event, keyCode);
            }
        }
        else if (keyCode === constants.OPPOSITE_NUMBER) {
            if (this.state.numberLeft && this.state.numberRight === null) {
                const oppositeNum = -this.state.numberLeft;
                this.setState({
                    numberLeft: oppositeNum
                });
                this.setInputOutputFields(oppositeNum, oppositeNum);
                if (event) event.preventDefault();
            }
            else if (this.state.numberRight) {
                const oppositeNum = -this.state.numberRight;
                this.setState({
                    numberRight: oppositeNum
                });
                this.refs.InputField.value = oppositeNum;
                if (event) event.preventDefault();
            }
        }
        else if ((keyCode === constants.ENTER_CODE || keyCode === constants.EQUAL_SIGN_CODE) &&
            this.state.numberLeft && this.state.job && this.state.numberRight) {
            this.calculate(event);
        }
        else if (!constants.NUMBER_CODES.includes(keyCode)) {
            this.refs.InputField.value = this.state.numberLeft;
            if (event) event.preventDefault();
        }
    }

    handleKeyPressed = (event) => {
        this.activateKeyPressedAction(event.which, event)
    };

    handleButtonClick(inputVal, keyCode) {
        this.hidePlaceholder();

        if (keyCode === constants.RESET) this.resetState();
        else if (keyCode === constants.DELETE && this.refs.InputField.value !== '') {
                const inputFieldWithLastLetterDeleted = this.refs.InputField.value.slice(0, -1);
                this.updateInputState(inputFieldWithLastLetterDeleted);
                this.refs.InputField.value = inputFieldWithLastLetterDeleted;
        }
        else if (constants.NUMBER_CODES.includes(keyCode)) {
                this.updateInputState(this.refs.InputField.value + inputVal);
                this.refs.InputField.value = this.refs.InputField.value + inputVal;
        }
        else if (keyCode !== constants.DELETE) this.activateKeyPressedAction(keyCode);
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        this.updateInputState(value);
    };

    updateInputState(value) {
        if (utils.isNumber(value) || value === '') {
            if (this.state.job === null) {
                this.setState({
                    numberLeft: value
                });
            }
            else if (this.state.job) {
                this.setState({
                    numberRight: value
                });
            }
        }
    }

    renderDisplay() {
        return (
            <div className='calculator__display'>
                <span ref='CurrentStateDisplay'/>
            </div>
        );
    };

    renderInputField() {
        return (
            <div className='calculator__input'>
                <input type="text" onChange={this.handleInputChange} onKeyPress={this.handleKeyPressed} onClick={this.hidePlaceholder} ref='InputField'/>
            </div>
        );
    }

    renderButtons() {
        return (
            <div className='calculator__buttons'>
                <div className='calculator__buttons-column'>
                    <div className='calculator__buttons-row'>
                        <button className='calculator__button custom-button upper-border-adjacent' onClick={() => this.handleButtonClick('1', constants.ONE)}>1</button>
                        <button className='calculator__button custom-button upper-border-adjacent' onClick={() => this.handleButtonClick('2', constants.TWO)}>2</button>
                        <button className='calculator__button custom-button upper-border-adjacent' onClick={() => this.handleButtonClick('3', constants.THREE)}>3</button>
                    </div>
                    <div className='calculator__buttons-row'>
                        <button className='calculator__button custom-button' onClick={() => this.handleButtonClick('4', constants.FOUR)}>4</button>
                        <button className='calculator__button custom-button' onClick={() => this.handleButtonClick('5', constants.FIVE)}>5</button>
                        <button className='calculator__button custom-button' onClick={() => this.handleButtonClick('6', constants.SIX)}>6</button>
                    </div>
                    <div className='calculator__buttons-row'>
                        <button className='calculator__button custom-button' onClick={() => this.handleButtonClick('7', constants.SEVEN)}>7</button>
                        <button className='calculator__button custom-button' onClick={() => this.handleButtonClick('8', constants.EIGHT)}>8</button>
                        <button className='calculator__button custom-button' onClick={() => this.handleButtonClick('9', constants.NINE)}>9</button>
                    </div>
                    <div className='calculator__buttons-row'>
                        <button className='calculator__button custom-button' onClick={() => this.handleButtonClick('0', constants.ZERO)}>0</button>
                        <button className='calculator__button custom-button' onClick={() => this.handleButtonClick('.', constants.POINT_CODE)}>.</button>
                        <button className='calculator__button custom-button small' onClick={() => this.handleButtonClick('', constants.OPPOSITE_NUMBER)}>+/-</button>
                    </div>
                </div>
                <div className='calculator__buttons-column'>
                    <button className='calculator__button custom-button upper-border-adjacent' onClick={() => this.handleButtonClick('', constants.MINUS_CODE)}>-</button>
                    <button className='calculator__button custom-button' onClick={() => this.handleButtonClick('', constants.PLUS_CODE)}>+</button>
                    <button className='calculator__button custom-button' onClick={() => this.handleButtonClick('', constants.MULTIPLY_CODE)}>x</button>
                    <button className='calculator__button custom-button' onClick={() => this.handleButtonClick('', constants.DIVIDE_CODE)}>/</button>
                </div>
                <div className='calculator__buttons-column calculator__buttons-column--wider'>
                    <button className='calculator__button custom-button right-border-adjacent upper-border-adjacent' onClick={() => this.handleButtonClick('', constants.DELETE)}>Delete</button>
                    <button className='calculator__button custom-button right-border-adjacent' onClick={() => this.handleButtonClick('', constants.RESET)}>Reset</button>
                    <button className='calculator__button custom-button right-border-adjacent' onClick={() => this.handleButtonClick('', constants.ENTER_CODE)}>=</button>
                </div>
            </div>
        );
    };

    render() {
        return (
            <div className='calculator__container flex-column-center'>
                {this.renderDisplay()}
                {this.renderInputField()}
                {this.renderButtons()}
            </div>
        );
    }
}

export default Calculator;

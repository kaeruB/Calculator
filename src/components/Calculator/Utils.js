import * as constants from "./Constants";

export const isNumber = (val) => {
    return !isNaN(parseFloat(val)) && isFinite(val);
};

export function getResult(numberLeft, job, numberRight) {
    switch (job) {
        case constants.MINUS_CODE:
            return numberLeft - numberRight;
        case constants.PLUS_CODE:
            return numberLeft + numberRight;
        case constants.DIVIDE_CODE:
            return numberLeft / numberRight;
        case constants.MULTIPLY_CODE:
            return numberLeft * numberRight;
    }
}

export function riseError(message) {
    console.log(message);
}



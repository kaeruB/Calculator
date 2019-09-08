import {Point} from "./Point";

const degToRad = (degs) => {
    const pi = Math.PI;
    return degs * (pi/180);
};

export function rotate(pointToRotate, degrees) {
    let resultPoint = new Point();

    const theta = degToRad(degrees);
    const alpha = Math.atan2(pointToRotate.y, pointToRotate.x);
    const fullAngle = theta + alpha;

    if (fullAngle === 0) {
        return pointToRotate;
    }

    resultPoint.y = Math.sqrt(Math.pow(pointToRotate.x, 2) + Math.pow(pointToRotate.y, 2)) * Math.sin(fullAngle);
    resultPoint.x =  resultPoint.y / Math.tan(fullAngle);

    resultPoint.y = Math.round(resultPoint.y * 100) / 100;
    resultPoint.x = Math.round(resultPoint.x * 100) / 100;

    return(resultPoint);
}

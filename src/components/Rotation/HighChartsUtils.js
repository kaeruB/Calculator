export const ORIGIN_POINT = {
    name: 'Origin',
    data: [[0, 0]],
    lineWidth: 0,
    marker: {
        enabled: true,
        radius: 6
    },
    tooltip: {
        valueDecimals: 2
    },
    states: {
        hover: {
            lineWidthPlus: 0
        }
    }
};

export const CHART_CONFIG = {
    title: {
        text: 'Point rotation'
    },
    series: [
        ORIGIN_POINT
    ],
    xAxis: {
        height: 200,
        width: 200,
        title: {
            text: 'X'
        },
        min: -100,
        max: 100
    },
    yAxis: {
        height: 200,
        width: 200,
        title: {
            text: 'Y'
        },
        min: -100,
        max: 100
    },
    legend: {
        enabled: false
    },
    chart: {
        height: 330,
        backgroundColor: '#FFF4E0'
    },
    credits: {
        enabled: false
    },
    tooltip: {
        formatter: function () {
            return this.series.name + ' (' + this.x + ', ' + this.y + ')';
        }
    }
};

export function addPointToChart(chart, x, y, name) {
    let seriesJSON = {
        name: name,
        data: [[]],
        lineWidth: 0,
        marker: {
            enabled: true,
            radius: 6
        },
        tooltip: {
            valueDecimals: 2
        },
        states: {
            hover: {
                lineWidthPlus: 0
            }
        }
    };

    seriesJSON.data[0].push(x);
    seriesJSON.data[0].push(y);

    chart.addSeries(
        seriesJSON
    );

    drawCircle(chart);
}

function drawCircle(chart) {
    const radius = getRadius(chart);

    chart.addSeries(
        {
            data: [[0, 0]],
            linkedTo: 'other',
            marker: {
                radius: radius,
                lineColor: 'red',
                fillColor: 'transparent',
                lineWidth: 1,
                symbol: 'circle'
            }
        }
    );
}

export function getRadius(chart) {
    const xLength = chart.series[0].data[0].plotX -  chart.series[1].data[0].plotX;
    const yLength = chart.series[0].data[0].plotY -  chart.series[1].data[0].plotY;
    return Math.sqrt(Math.pow(xLength, 2) + Math.pow(yLength, 2));
}

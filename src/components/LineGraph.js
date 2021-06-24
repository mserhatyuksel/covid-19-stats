import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const options = {
    plugins: {
        legend: {
            display: false,
        },
    },
    elements: {
        point: {
            radius: 1,
        },
    },
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};
const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};

function LineGraph({ casesType }) {
    const [data, setData] = useState({});
    let bgColor;
    let color;
    if (casesType === "cases") {
        color = "#03045E";
        bgColor = "rgba(3, 4, 94, 0.5)";
    } else if (casesType === "recovered") {
        color = "#2B9348";
        bgColor = "rgba(43, 147, 72, 0.5)";
    } else if (casesType === "deaths") {
        color = "#D00000";
        bgColor = "rgba(208, 0, 0, 0.5)";
    } else {
        color = "#D00000";
        bgColor = "rgba(208, 0, 0, 0.5)";
    }
    useEffect(() => {
        const fetchData = async () => {
            await fetch(
                "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
            )
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let chartData = buildChartData(data, casesType);
                    setData(chartData);

                    // buildChart(chartData);
                });
        };

        fetchData();
    }, [casesType]);

    return (
        <div>
            {data?.length > 0 && (
                <Line
                    data={{
                        datasets: [
                            {
                                backgroundColor: bgColor,
                                borderColor: color,
                                data: data,
                                fill: true,
                                pointBorderWidth: 0.1,
                                pointHoverRadius: 5,
                                pointHoverBorderWidth: 0.5,
                                pointRadius: 3,
                                pointHitRadius: 10,
                            },
                        ],
                    }}
                    options={options}
                />
            )}
        </div>
    );
}

export default LineGraph;

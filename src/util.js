import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
const casesTypeColors = {
    cases: {
        hex: "#03045E",
        multiplier: 160,
    },
    recovered: {
        hex: "#2b9348",
        multiplier: 240,
    },
    deaths: {
        hex: "#d00000",
        multiplier: 400,
    },
};
export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrintStat = (stat) =>
    stat ? `+${numeral(stat).format("0.0a")}` : "0";

//Draw Circle on the map
export const showDataOnMap = (data, casesType) =>
    data.map((country) => (
        <Circle
            pathOptions={{
                color: casesTypeColors[casesType].hex,
                fillColor: casesTypeColors[casesType].hex,
            }}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            radius={
                Math.sqrt(country[casesType]) *
                casesTypeColors[casesType].multiplier
            }
        >
            <Popup className="info-popup">
                <div className="info-container">
                    <div
                        className="info-flag"
                        style={{
                            backgroundImage: `url(${country.countryInfo.flag})`,
                        }}
                    ></div>
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">
                        Cases: {Number(country.cases).toLocaleString()}
                    </div>
                    <div className="info-recovered">
                        Recovered: {Number(country.recovered).toLocaleString()}
                    </div>
                    <div className="info-deaths">
                        Deaths: {Number(country.deaths).toLocaleString()}
                    </div>
                </div>
            </Popup>
        </Circle>
    ));

import React, { useState, useEffect, Fragment } from "react";
import { Card, CardContent } from "@material-ui/core";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";
import numeral from "numeral";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { sortData, prettyPrintStat } from "./util";

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [casesType, setCasesType] = useState("cases");
    const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
            .then((response) => response.json())
            .then((data) => {
                setCountryInfo(data);
            });
    }, []);

    useEffect(() => {
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }));
                    const sortedData = sortData(data);
                    setCountries(countries);
                    setMapCountries(data);
                    setTableData(sortedData);
                });
        };
        getCountriesData();
    }, []);

    const onCountryChangeHandler = async (event) => {
        const countryCode = event.target.value;
        setCountry(countryCode);
        const url =
            countryCode === "worldwide"
                ? "https://disease.sh/v3/covid-19/all"
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCountry(countryCode);
                setCountryInfo(data);

                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                setMapZoom(5);
            });
    };
    console.log(casesType);
    return (
        <Fragment>
            <div className="app">
            <div className="app__left">
                <Header
                    country={country}
                    countries={countries}
                    onCountryChange={onCountryChangeHandler}
                />
                <div className="app__stats">
                    <InfoBox
                        onClick={(e) => setCasesType("cases")}
                        title="Coronavirus Cases"
                        
                        active={casesType === "cases"}
                        cases={prettyPrintStat(countryInfo.todayCases)}
                        total={numeral(countryInfo.cases).format("0.0a")}
                    />
                    <InfoBox
                        onClick={(e) => setCasesType("recovered")}
                        title="Recovered"
                        isGreen
                        active={casesType === "recovered"}
                        cases={prettyPrintStat(countryInfo.todayRecovered)}
                        total={numeral(countryInfo.recovered).format("0.0a")}
                    />
                    <InfoBox
                        onClick={(e) => setCasesType("deaths")}
                        title="Deaths"
                        isRed
                        active={casesType === "deaths"}
                        cases={prettyPrintStat(countryInfo.todayDeaths)}
                        total={numeral(countryInfo.deaths).format("0.0a")}
                    />
                </div>
                <Map
                    casesType={casesType}
                    countries={mapCountries}
                    center={mapCenter}
                    zoom={mapZoom}
                />
            </div>
            <Card className="app__right">
                <CardContent>
                    <h3>Live Cases by Country</h3>
                    <Table countries={tableData} />
                    <h3>Worldwide new {casesType}</h3>
                    <LineGraph casesType={casesType} />
                </CardContent>
            </Card>
        </div>
        </Fragment>
    );
}

export default App;

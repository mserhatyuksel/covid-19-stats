import React from "react";
import numeral from "numeral";
import classes from "./Table.module.css";
function Table({ countries }) {
    return (
        <div className={classes.table}>
            {countries.map(({country, cases}) => (
                <tr key={country.value}>
                    <td>{country}</td>
                    <strong><td>{numeral(cases).format("0,0")}</td></strong>
                </tr>
            ))}
        </div>
    );
}

export default Table;

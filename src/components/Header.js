import React from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import classes from "./Header.module.css";
function Header({ country, countries, onCountryChange }) {
    return (
        <div className={classes.header}>
            <h1>Covid-19 Stats</h1>
            <div className={classes.dropdown}>
                <FormControl>
                    <Select
                        onChange={onCountryChange}
                        variant="outlined"
                        value={country}
                    >
                        <MenuItem value="worldwide">Worldwide</MenuItem>
                        {countries.map((country, index) => (
                            <MenuItem value={country.value} key={index} >
                                {country.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}

export default Header;

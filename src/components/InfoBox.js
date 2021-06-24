import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
// import classes from "./infoBox.module.css";
import "./InfoBox.css";

function InfoBox({ title, cases, total, active, isRed, isGreen, ...props }) {
    return (
        <Card
            onClick={props.onClick}
            className={`infoBox ${active && "infoBox--selected"} ${
                isRed && "infoBox--red"
            } ${
                isGreen && "infoBox--green"
            }`}
        >
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {title}
                </Typography>
                <h2
                    className={`infoBox__cases ${
                        isRed && "infoBox__cases--red"
                    } ${
                        isGreen && "infoBox__cases--green"
                    } `}
                >
                    {cases}
                </h2>

                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    );
}

export default InfoBox;

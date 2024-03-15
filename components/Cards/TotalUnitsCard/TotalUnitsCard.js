import { useAppContext } from "@/appProvider";
import { Card, Paper, Typography , Box} from "@mui/material";
import useUtils from "@/components/Hooks/useUtils";
import React, { useState } from "react";
import moment from "moment";

export default function TotalUnitsCard(props) {
  const { title, quanty } = props;
  const { startDate, endDate } = useAppContext();
  const utils = useUtils();

  return (
    <>
      <Paper variant={"outlined"} sx={{ padding: 1 }}>
        <Box><Typography variant={"h6"}>
          {title == undefined ? "title" : title}
        </Typography></Box>
        <Box> <Typography variant={"h5"} textAlign={"right"}>
          {quanty == undefined
            ? "quanty"
            : quanty.toLocaleString("es-ES", {
                style: "decimal",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
        </Typography></Box>
        <Box> <Typography variant={"caption"} textAlign={"right"}>
          {moment(startDate).format("DD-MM-YYYY")} -{" "}
          {moment(endDate).format("DD-MM-YYYY")}
        </Typography></Box>
        </Paper>
    </>
  );
}

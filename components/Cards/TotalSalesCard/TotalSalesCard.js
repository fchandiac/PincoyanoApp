import { useAppContext } from "@/appProvider";
import useUtils from "@/components/Hooks/useUtils";
import { Box, Card, Paper, Typography } from "@mui/material";
import moment from "moment";
import React from "react";

export default function TotalSalesCard(props) {
  const { title = "Title", amount = 0 } = props;
  const { startDate, endDate } = useAppContext();
  const utils = useUtils();

  return (
    <>
      <Paper variant={"outlined"} sx={{ padding: 1 }}>
        <Box>
          <Typography variant={"h6"}>
            {title == undefined ? "title" : title}
          </Typography>
        </Box>
        <Box>
          <Typography variant={"h5"} textAlign={"right"}>
            {amount == undefined ? "amount" : utils.renderMoneystr(amount)}
          </Typography>
        </Box>
        <Box>
          <Typography variant={"caption"} textAlign={"right"}>
            {moment(startDate).format("DD-MM-YYYY")} -{" "}
            {moment(endDate).format("DD-MM-YYYY")}
          </Typography>
        </Box>
      </Paper>
    </>
  );
}

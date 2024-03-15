import useUtils from "@/components/Hooks/useUtils";
import { Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SalesLineChartCard(props) {
  const { title, data } = props;
  const { renderMoneystr } = useUtils();

  return (
    <>
      <Card variant={"outlined"} sx={{ padding: 1 }}>
        <Typography variant={"h6"} marginBottom={2}>
          {title == undefined ? "title" : title}
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, bottom: 10, left: 90 }}
          >
            <XAxis
              dataKey="day"
              tick={{ fontSize: 10 }}
              label={{ fontSize: 12 }}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              label={{ fontSize: 12 }}
              tickFormatter={(value) => {
                return value.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                  minimumFractionDigits: 0,
                });
              }}
            />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Tooltip
              formatter={(value, name, props) => {
                return [`${renderMoneystr(value)}`];
              }}
            />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
}

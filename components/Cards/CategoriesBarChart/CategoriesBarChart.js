import useUtils from "@/components/Hooks/useUtils";
import { Paper, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function CategoriesBarChart(props) {
  const { renderMoneystr } = useUtils();
  const {
    title = "Title",
    data = [
      {
        categoryName: "Category",
        amount: 200,
      },
      {
        categoryName: "Category",
        amount: 3000,
      },
    ],
  } = props;

  return (
    <>
      <Paper variant={"outlined"} sx={{ padding: 1 }}>
        <Typography variant={"h6"} marginBottom={2}>
          {title}
        </Typography>
        <Box display={"flex"}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 75,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="categoryName"
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
              <Tooltip
                formatter={(value, name, props) => {
                  return [`${renderMoneystr(value)}`];
                }}
              />
              <Bar dataKey="amount" fill={"#90a4ae"} />
            </BarChart>
          </ResponsiveContainer>
          <Box marginLeft={1} width={"25%"}>
            {data.map((item, index) => {
              const value = item.amount.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
                minimumFractionDigits: 0,
              });
              return (
                <Box key={index}>
                  <Typography variant={"caption"}>
                    {item.categoryName + ": " + value}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Paper>
    </>
  );
}

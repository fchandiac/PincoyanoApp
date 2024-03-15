import {
  Card,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  Grid,
  Paper,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";

export default function TopPieChart(props) {
  const { title, data } = props;

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  const colors = [
    "#e57373",
    "#f06292",
    "#ba68c8",
    "#9575cd",
    "#7986cb",
    "#29b6f6",
    "#26c6da",
    "#81c784",
    "#dce775",
    "#fff176",
    "#ffb74d",
    "#ff8a65",
    "#a1887f",
    "#90a4ae",
  ];

  return (
    <>
      <Paper variant={"outlined"} sx={{ padding: 1, height: "100%" }}>
        <Box marginBottom={2}>
          <Typography variant={"h7"}>{title}</Typography>
        </Box>
        <Grid container spacing={1} sx={{ height: "100%" }}>
          {data.map((item, index) => (
            <Grid item xs={3} key={index}>
              <Typography key={index} fontSize={9}>
                {`● ${item.name} (${((item.value / total) * 100).toFixed(2)}%)`}
              </Typography>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "0", // Cambiar de borderRadius: '50%' a borderRadius: '0'
                  backgroundColor: colors[index % colors.length],
                  display: "inline-block",
                  marginLeft: "4px",
                }}
              ></span>
            </Grid>
          ))}
          <Grid item xs={12} alignSelf={'flex-end'}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={false}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ payload, label }) => {
                    return (
                      <div
                        style={{ fontSize: "10px", backgroundColor: "white" }}
                      >
                        {" "}
                        {/* Ajusta el tamaño de fuente según sea necesario */}
                        {payload.map((entry, index) => (
                          <p key={index} style={{ color: entry.color }}>
                            {`${entry.name} : ${entry.value}`}
                          </p>
                        ))}
                      </div>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

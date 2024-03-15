import UserForm from "@/components/Forms/UserForm";
import UsersGrid from "@/components/Grids/UsersGrid";
import { Grid } from "@mui/material";
import React, { useState } from "react";

export default function users() {
  const [gridState, setGridState] = useState(false);

  const updateGrid = () => {
    setGridState(!gridState);
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <UserForm
            afterSubmit={() => {
              updateGrid();
            }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <UsersGrid update={gridState} />
        </Grid>
      </Grid>
    </>
  );
}

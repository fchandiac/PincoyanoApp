import { Snackbar, Alert } from "@mui/material";
import React from "react";
import { useAppContext } from "../../../appProvider";

export default function Snack() {
  const { snack, dispatch } = useAppContext();

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({
      type: "CLOSE_SNACK",
      value: { message: snack.message, type: snack.type },
    });
  };

  return (
    <Snackbar
      open={snack.open}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      autoHideDuration={4000}
      onClose={handleCloseSnack}
    >
      <Alert severity={snack.type} variant={"standard"}>
        {snack.message}
      </Alert>
    </Snackbar>
  );
}

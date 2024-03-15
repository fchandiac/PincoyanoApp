import React, { use, useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import { useAppContext } from "@/appProvider";
import useUsers from "../Hooks/useUsers";
import useRecords from "../Hooks/useRecords";


export default function UserForm(props) {
  const {
    data = {
      id: null,
      userName: "",
      name: "",
      password: "1234",
    },
    edit = false,
    afterSubmit = () => {},
    dialog = false,
  } = props;

  const users = useUsers();
  const records = useRecords();
  const { openSnack, user } = useAppContext();
  const [userData, setUserData] = useState(data);

  const save = async () => {
    if (edit) {
      try {
        await users.update(userData.id, userData.userName, userData.name)
        await records.updateUser(user.id, userData.id);
        setUserData({ id: 0, userName:'', name:'', password: "1234" });
        afterSubmit(userData);
        openSnack("Usuario actualizado", "success");
      } catch (err) {
        openSnack(err.errors[0].message, "error");
      }
    } else {
      try {
        const newUser = await users.create(
          userData.userName,
          userData.name,
          userData.password
        );
        await records.createUser(user.id, userData.userName);
        setUserData({ id: 0, userName:'', name:'', password: "1234" });
        afterSubmit();
        openSnack("Usuario creado", "success");
      } catch (err) {
        openSnack(err.errors[0].message, "error");
      }
    }
  };

  return (
    <>
      <Paper variant="outlined" sx={{ p: 1 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
        >
          <Grid container spacing={1} direction={"column"}>
            <Grid item>
              <Typography variant={"subtitle1"}>
                {edit ? "Actualizar" : "Nuevo"} usuario
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Usuario"
                value={userData.userName}
                onChange={(e) => {
                  setUserData({ ...userData, userName: e.target.value });
                }}
                size="small"
                required
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Nombre"
                value={userData.name}
                onChange={(e) => {
                  setUserData({ ...userData, name: e.target.value });
                }}
                size="small"
                required
              />
            </Grid>
            <Grid item display={edit? 'none': 'block'}>
              <TextField
                fullWidth
                label="Contraseña"
                value={userData.password}
                InputProps={{
                  readOnly: true,
                }}
                size="small"
              />
            </Grid>

            <Grid item textAlign={"right"}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
              >
                {edit ? "Actualizar" : "Guardar"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}

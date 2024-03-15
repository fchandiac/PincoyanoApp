import {
  Grid,
  Box,
  AppBar,
  List,
  ListItemButton,
  ListItem,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Drawer,
  IconButton,
  TextField,
  Typography,
  Toolbar,
  ButtonGroup,
  Alert,
  useTheme,
  InputAdornment,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState, useRef } from "react";
import XLSX from "xlsx";
import ExcelJS from "exceljs";
import { useRouter } from "next/router";
import AccountCircle from "@mui/icons-material/AccountCircle";
import moment from "moment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useAppContext } from "@/appProvider";
import useImport from "../Hooks/useImport";
import Snack from "../Karmextron/Snack";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ClearIcon from "@mui/icons-material/Clear";
import Loader from "../Karmextron/Loader";
import useUtils from "../Hooks/useUtils";
import useFiles from "../Hooks/useFiles";
import { saveAs } from "file-saver";
import useRecords from "../Hooks/useRecords";
const server_url = process.env.API_URL;
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useUsers from "../Hooks/useUsers";

export default function index(props) {
  const { children } = props;
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    user,
    openSnack,
    processedSale,
    setLogin,
    login,
    setUser,
  } = useAppContext();
  const [importDate, setImportDate] = useState(new Date());
  const { importProcess } = useImport();
  const { renderMoneystr } = useUtils();
  const router = useRouter();
  const files = useFiles();
  const theme = useTheme();
  const records = useRecords();
  const users = useUsers();
  const [openImportDialog, setOpenImportDialog] = useState(false);
  const [xlsFile, setXlsFile] = useState(null);
  const [loadingXls, setLoadingXls] = useState(false);
  const [showUploadAlert, setShowUploadAlert] = useState(false);
  const [showUploadAlertFormat, setShowUploadAlertFormat] = useState(false);
  const [authUpload, setAuthUpload] = useState(false);
  const [description, setDescription] = useState("");
  const inputUploadFileRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ user: "", pass: "" });
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);
  const [changePasswordData, setChangePasswordData] = useState({
    userId: null,
    pass: "",
    newPass: "",
    confirmPass: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const columnNames = [
    "sellerCode",
    "seller",
    "invoice",
    "customer",
    "productCode",
    "product",
    "quanty",
    "discount",
    "price",
    "total_sale",
    "return_",
    "total_return",
    "total",
  ];

  useEffect(() => {
    const fetch = async () => {
      if (xlsFile) {
        // try {
        //   const fileExists = await files.checkFileExists(xlsFile.name);
        //   setAuthUpload(true);
        //   setShowUploadAlert(false);
        // } catch (error) {
        //   console.error("Error during file reading:", error);
        //   setAuthUpload(false);
        //   setShowUploadAlert(true);

        // }

        try {
          const format = await checkFileFormat(xlsFile);
          console.log("format", format);
          setAuthUpload(format);
          setShowUploadAlertFormat(false);
        } catch (error) {
          console.error("Error during file reading:", error);
          setAuthUpload(false);
          setShowUploadAlertFormat(true);
        }
      }
    };
    fetch();
  }, [xlsFile]);

  useEffect(() => {
    if (loadingXls == true) {
      setLoadingXls(false);
      setXlsFile(null);
      setShowUploadAlert(false);
      setAuthUpload(false);
      setShowUploadAlertFormat(false);
      setDescription("");
      setImportDate(new Date());
    } else {
      console.log("no loading");
      setXlsFile(null);
      setShowUploadAlert(false);
      setAuthUpload(false);
      setShowUploadAlertFormat(false);
      setDescription("");
      setImportDate(new Date());
    }
  }, [openImportDialog]);

  const readXls = async () => {
    try {
      if (xlsFile) {
        const fileExists = await files.checkFileExists(xlsFile.name);
        if (fileExists) {
          setShowUploadAlert(true);
          return;
        }
      }
      if (xlsFile) {
        const reader = new FileReader();
        setLoadingXls(true);
        reader.onload = async (e) => {
          try {
            const data = e.target.result;
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(data);
            const sheet = workbook.getWorksheet(1);
            // console.log('sheet', sheet)
            const jsonData = [];

            sheet.eachRow((row) => {
              const rowData = {};
              row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                //rowData[`Columna ${colNumber}`] = cell.value;
                // Utilizas los nombres de las columnas para construir el objeto rowData
                const columnName = columnNames[colNumber - 1]; // Restar 1 ya que los índices comienzan desde 1
                rowData[columnName] = cell.value;
              });
              jsonData.push(rowData);
            });
            jsonData.shift();

            // console.log("Excel Data:", jsonData);
            await importProcess(
              jsonData,
              importDate,
              100,
              xlsFile,
              xlsFile.name,
              description,
              user.id
            );
            await records.uploadFile(user.id, xlsFile.name);
            setOpenImportDialog(false);
          } catch (error) {
            console.error("Error during Excel processing:", error);
          }
        };

        reader.readAsArrayBuffer(xlsFile);
      }
    } catch (error) {
      console.error("Error during file reading:", error);
    }
  };

  const checkFileFormat = async (file) => {
    const workbook = new ExcelJS.Workbook();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = async (event) => {
        try {
          const buffer = event.target.result;
          await workbook.xlsx.load(buffer);

          const worksheet = workbook.getWorksheet(1); // Obtiene la primera hoja del libro

          const headerRow = worksheet.getRow(1); // Obtiene la primera fila (encabezados)
          const headerValues = headerRow.values;
          headerValues.shift();
          // console.log('headerValues', headerValues)

          if (headerValues.length === 0) {
            reject(false);
          }

          const expectedHeaders = [
            "Código vendedor",
            "Vendedor",
            "Número",
            "Cliente",
            "Código producto",
            "Producto",
            "Cantidad",
            "%Dcto. Prom",
            "$ Unitario",
            "Total Venta",
            "Devolución",
            "Total Devolución",
            "Total Real",
          ];

          // Compara los encabezados obtenidos del archivo con los esperados
          const isValidFormat = headerValues.every(
            (value, index) => value === expectedHeaders[index]
          );
          if (isValidFormat) {
            resolve(true);
          } else {
            reject(false);
          }
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file); // Lee el archivo como un ArrayBuffer
    });
  };

  const downloadTemplate = async () => {
    const templateURL = server_url + "/plantilla.xlsx";
    saveAs(templateURL, "plantilla.xlsx");
  };

  const handleLogin = async () => {
    try {
      const login_ = await users.login(loginData.user, loginData.pass);
      const userLogin = {
        id: login_.id,
        userName: login_.user_name,
        name: login_.name,
      };
      setLoginData({ user: "", pass: "" });
      setShowPassword(false);
      setUser(userLogin);
      setLogin(true);
    } catch (err) {
      openSnack("Usuario o contraseña invalidos", "error");
    }
  };

  const handleChangePassword = async () => {
    if (changePasswordData.newPass !== changePasswordData.confirmPass) {
      openSnack("Las contraseñas no coinciden", "error");
      return;
    }
    try {
      const updatePass = await users.updatePass(
        user.id,
        changePasswordData.pass,
        changePasswordData.newPass
      );
      setUser({ id: null, userName: "", name: "" });
      setLogin(false);
      setShowPassword(false);
      setChangePasswordData({
        userId: null,
        pass: "",
        newPass: "",
        confirmPass: "",
      });
      openSnack("Contraseña actualizada", "success");
      setOpenChangePasswordDialog(false);
    } catch (err) {
      console.log(err);
      openSnack("Error al actualizar contraseña", "error");
    }
  };

  return (
    <>
      <Dialog
        open={openChangePasswordDialog}
        onClose={() => {
          setOpenChangePasswordDialog(false);
          setChangePasswordData({
            userId: null,
            pass: "",
            newPass: "",
            confirmPass: "",
          });
        }}
      >
        <DialogTitle>Cambiar contraseña</DialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleChangePassword();
            }}
          >
            <Grid container direction={"column"} spacing={1}>
              <Grid item marginTop={1}>
                <TextField
                  label="Contraseña"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  value={changePasswordData.pass}
                  onChange={(e) => {
                    setChangePasswordData({
                      ...changePasswordData,
                      pass: e.target.value,
                    });
                  }}
                  fullWidth
                  required
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Nueva contraseña"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  value={changePasswordData.newPass}
                  onChange={(e) => {
                    setChangePasswordData({
                      ...changePasswordData,
                      newPass: e.target.value,
                    });
                  }}
                  fullWidth
                  required
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Confirmar contraseña"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  value={changePasswordData.confirmPass}
                  onChange={(e) => {
                    setChangePasswordData({
                      ...changePasswordData,
                      confirmPass: e.target.value,
                    });
                  }}
                  fullWidth
                  required
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item textAlign={"right"}>
                <Button variant="contained" color="primary" type="submit">
                  Cambiar
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!login}
        fullScreen
        onClose={() => {
          setLogin(true);
        }}
      >
        <Box p={2} width={"35vw"} alignSelf={"center"} marginTop={30}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <Grid container direction={"column"} spacing={2} p={2}>
              <Grid item textAlign={"center"}>
                <Typography
                  variant="h3"
                  style={{ fontWeight: "bold" }}
                  color={theme.palette.primary.main}
                >
                  Pincoyano App
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  label="Usuario"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={loginData.user}
                  onChange={(e) => {
                    setLoginData({ ...loginData, user: e.target.value });
                  }}
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Contraseña"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  value={loginData.pass}
                  onChange={(e) => {
                    setLoginData({ ...loginData, pass: e.target.value });
                  }}
                  fullWidth
                  required
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Ingresar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Dialog>

      <Box
        marginLeft={"180px"}
        minWidth={"1024px"}
        display={login ? "block" : "none"}
      >
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant={"subtitle1"}>
              {user.userName + " - " + user.name}
            </Typography>
            <IconButton
              sx={{ marginLeft: 2, marginRight: 2 }}
              onClick={(e) => {
                setOpenChangePasswordDialog(true);
              }}
              color={"inherit"}
            >
              <AccountCircle />
            </IconButton>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => {
                setUser({ id: null, userName: "", name: "" });
                setLogin(false);
              }}
            >
              Salir
            </Button>
          </Toolbar>
        </AppBar>
        <Box p={2} display={login ? "block" : "none"}>
          {children}
        </Box>
      </Box>

      <Dialog
        open={openImportDialog}
        fullWidth
        minWidth="sm"
      >
        <DialogTitle>Importar</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Box pt={1}>
              <DesktopDatePicker
                label="Fecha"
                inputFormat="DD-MM-YYYY"
                value={importDate}
                onChange={(newValue) => {
                  setImportDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} size="small" fullWidth />
                )}
              />
            </Box>
            <Box>
              <TextField
                label="Descripción"
                value={description}
                multiline
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
              />
            </Box>

            <Box display={"flex"}>
              <ButtonGroup>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<AttachFileIcon />}
                >
                  Adjuntar
                  <input
                    ref={inputUploadFileRef}
                    type="file"
                    accept=".xls, .xlsx"
                    onChange={(e) => {
                      let file = e.target.files[0];
                      setXlsFile(file);
                    }}
                    hidden
                  />
                </Button>
                <Button
                  variant="contained"
                  component="label"
                  size="small"
                  onClick={() => {
                    setXlsFile(null);
                    setShowUploadAlert(false);
                    setAuthUpload(false);
                    setShowUploadAlertFormat(false);
                    inputUploadFileRef.current.value = "";
                  }}
                >
                  <ClearIcon />
                </Button>
              </ButtonGroup>
              <Typography
                variant={"inherit"}
                sx={{
                  flexFlow: 1,
                  display: "inline-flex",
                  alignSelf: "center",
                  paddingLeft: 1,
                }}
              >
                {/* {rowData.file ? rowData.file.name : "Seleccione un archivo"} */}
                {xlsFile ? xlsFile.name : "Seleccione un archivo"}
              </Typography>
            </Box>
            <Box display={showUploadAlert ? "inline-block" : "none"}>
              <Alert severity="error">El archivo ya existe</Alert>
            </Box>
            <Box display={showUploadAlertFormat ? "inline-block" : "none"}>
              <Alert severity="error">
                El archivo no tiene el formato correcto
              </Alert>
            </Box>
            <Box display={loadingXls ? "inline-block" : "none"}>
              <Typography variant={"inherit"}>
                filas totales: {processedSale.totalRows}
              </Typography>
              <Typography variant={"inherit"}>
                filas procesadas: {processedSale.currentRow}
              </Typography>
            </Box>
            <Loader loading={loadingXls} />

            <Button
              disabled={!authUpload || loadingXls}
              variant="contained"
              color="primary"
              onClick={() => {
                readXls();
              }}
            >
              Importar
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setOpenImportDialog(false);
              }}
            >
              Cancelar
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Snack />

      <Drawer
        sx={{
          width: 180,
          flexShrink: 0,
          display: login ? "block" : "none",
          "& .MuiDrawer-paper": {
            width: 180,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={true}
      >
        <Box p={2}>
          <h4>Pincoyano App</h4>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => router.push("/")}>
                DashBoard
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => router.push("/sales")}>
                Ventas
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => router.push("/sellers")}>
                Vendedores
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => router.push("/products")}>
                Productos
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => router.push("/customers")}>
                Clientes
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => router.push("/users")}>
                Usuarios
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => router.push("/files")}>
                Archivos
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => router.push("/records")}>
                Registros
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setOpenImportDialog(true)}>
                Importar
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Box p={2}>
          <DesktopDatePicker
            label="Desde"
            inputFormat="DD-MM-YYYY"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(moment(newValue).format("YYYY-MM-DD 00:01"));
            }}
            renderInput={(params) => (
              <TextField {...params} size="small" fullWidth />
            )}
          />
        </Box>
        <Box p={2}>
          <DesktopDatePicker
            label="hasta"
            inputFormat="DD-MM-YYYY"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(moment(newValue).format("YYYY-MM-DD 23:59"));
            }}
            renderInput={(params) => (
              <TextField {...params} size="small" fullWidth />
            )}
          />
        </Box>
        <Box p={2}>
          <Button
            variant={"outlined"}
            sx={{ fontSize: 9.2 }}
            fullWidth
            onClick={() => downloadTemplate()}
          >
            descargar plantilla
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

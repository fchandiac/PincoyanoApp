import React, { useState, useEffect } from "react";
import { useAppContext } from "@/appProvider";
import {
  Grid,
  Paper,
  TextField,
  Autocomplete,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useSubcategories from "../Hooks/useSubcategories";
import useCategories from "../Hooks/useCategories";
import useRecords from "../Hooks/useRecords";


export default function SubcategoryForm(props) {
  const {
    data = {
      id: null,
      name: "",
      description: "",
      category: null,
    },
    edit = false,
    afterSubmit = () => {},
    dialog = false,
  } = props;
  const subcategories = useSubcategories();
  const categories = useCategories();
  const records = useRecords();
  const { openSnack, user } = useAppContext();
  const [subcategoryData, setSubcategoryData] = useState(data);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [openNewCategoryDialog, setOpenNewCategoryDialog] = useState(false);
  const [updateCategories, setUpdateCategories] = useState(false);

  useEffect(() => {
    const fecth = async () => {
      const data = await categories.findAllToAutocomplete();
      setCategoryOptions(data);
    };
    fecth();
  }, [updateCategories]);

  const save = async () => {
    if (edit) {
      try {
        await subcategories.update(
          subcategoryData.id,
          subcategoryData.name,
          subcategoryData.description,
          subcategoryData.category.id
        );
        await records.updateSubCategory(user.id, subcategoryData.id);
        setSubcategoryData({ id: 0, name: "", description: "", category: null });
        afterSubmit(subcategoryData);
        openSnack("Familia actualizada", "success");
      } catch (err) {
        openSnack(err.errors[0].message, "error");
      }
    } else {
      try {
        const newSubcategory = await subcategories.create(
          subcategoryData.name,
          subcategoryData.description,
          subcategoryData.category.id,
        )
        await records.createSubCategory(user.id, subcategoryData.name)
        setSubcategoryData({ id: 0, name: "", description: "", category: null});
        afterSubmit();
        openSnack("Subcategoría creada", "success");
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
                {edit ? "Actualizar" : "Nueva"} Familia
              </Typography>
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Nombre"
                name="subcategoryName"
                value={subcategoryData.name}
                size="small"
                onChange={(e) => {
                  setSubcategoryData({
                    ...subcategoryData,
                    name: e.target.value,
                  });
                }}
                required
              />
            </Grid>
            <Grid item display={"flex"}>
              <Autocomplete
                sx={{ flexGrow: 1 }}
                id="category"
                options={categoryOptions}
                value={subcategoryData.category}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setSubcategoryData({...subcategoryData, category: newValue});
                  } else {
                    setSubcategoryData({...subcategoryData, category: null});
                  }
                }}
                disablePortal
                defaultValue={null}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Categoría"
                    fullWidth
                    size="small"
                    required
                  />
                )}
              />
              <IconButton>
                <AddCircleIcon
                  onClick={() => {
                    setOpenNewCategoryDialog(true);
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                label="Descripción"
                name="subcategoryDescription"
                value={subcategoryData.description}
                multiline
                rows={2}
                size="small"
                onChange={(e) => {
                  setSubcategoryData({
                    ...subcategoryData,
                    description: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item textAlign={"right"}>
              <Button type="submit" variant="contained" color="primary">
                {edit ? "Actualizar" : "Guardar"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}

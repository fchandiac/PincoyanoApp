import React, { useEffect, useState } from "react";
import useCategories from "../Hooks/useCategories";
import useSubcategories from "../Hooks/useSubcategories";
import useProducts from "../Hooks/useProducts";
import { useAppContext } from "@/appProvider";
import {
  Grid,
  Paper,
  Typography,
  Autocomplete,
  Button,
  TextField,
} from "@mui/material";
import useRecords from "../Hooks/useRecords";

export default function ProductForm(props) {
  const {
    data = {
      id: null,
      code: "",
      name: "",
      category: null,
      subcategory: null,
    },
    edit = false,
    afterSubmit = () => {},
  } = props;

  const [productData, setProductData] = useState(data);
  const categories = useCategories();
  const subcategories = useSubcategories();
  const records = useRecords();
  const products = useProducts();
  const { openSnack, user } = useAppContext();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcateriesOptions, setSubcategoriesOptions] = useState([]);

  // useEffect(() => {
  //   const fecth = async () => {
  //     const noCategory = await categories.noCategory();
  //     const noSubcategory = await subcategories.noSubcategory();
  //     setProductData({
  //       ...productData,
  //       category: {
  //         id: noCategory.id,
  //         key: noCategory.id,
  //         name: noCategory.name,
  //       },
  //       subcategory: null,
  //     });
  //   };
  //   fecth();
  // }, []);

  useEffect(() => {
    const fecth = async () => {
      const categoriesData = await categories.findAllToAutocomplete();
      const subcategoriesData = await subcategories.findAllToAutocomplete();
      setCategoryOptions(categoriesData);
      setSubcategoriesOptions(subcategoriesData);
    };
    fecth();
  }, []);

  useEffect(() => {
    if (productData.category) {
      const fecth = async () => {
        const subcategoriesData = await subcategories.findAllByCategory(
          productData.category.id
        );
        // setProductData({ ...productData, subcategory: null });
        setSubcategoriesOptions(subcategoriesData);
      };
      fecth();
    }
  }, [productData.category]);

  const save = async () => {
    if (edit) {
      try {
        await products.update(
          productData.id,
          productData.code,
          productData.name,
          productData.subcategory.id
        );
        await records.updateProduct(user.id, productData.id);
        afterSubmit(productData);
        setProductData({ id: 0, code: "", name: "", subcategory: null });
        openSnack("Producto actualizado", "success");
      } catch (err) {
        openSnack(err.errors[0].message, "error");
      }
    } else {
      try {
        const product = await products.create(
          productData.code,
          productData.name,
          productData.subcategory.id
        );

        await records.createPrduct(user.id, productData.name)

        setProductData({ id: 0, code: "", name: "", subcategory: null });
        afterSubmit();
        openSnack("Producto creado", "success");
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
                {edit ? "Actualizar" : "Nuevo"} producto
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Código"
                name="productCode"
                variant="outlined"
                fullWidth
                value={productData.code}
                onChange={(e) => {
                  setProductData({ ...productData, code: e.target.value });
                }}
                size="small"
                required
              />
            </Grid>
            <Grid item>
              <TextField
                label="Nombre"
                name="productName"
                variant="outlined"
                fullWidth
                value={productData.name}
                onChange={(e) => {
                  setProductData({ ...productData, name: e.target.value });
                }}
                size="small"
                required
              />
            </Grid>
            <Grid item>
              <Autocomplete
                id="category"
                options={categoryOptions}
                value={productData.category}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setProductData({ ...productData, category: newValue });
                  } else {
                    setProductData({ ...productData, category: null });
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
                    sx={{zIndex: 1000}}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Autocomplete
                id="subcategory"
                options={subcateriesOptions}
                value={productData.subcategory}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setProductData({ ...productData, subcategory: newValue });
                  } else {
                    setProductData({ ...productData, subcategory: null });
                  }
                }}
                disablePortal
                defaultValue={null}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Familia"
                    fullWidth
                    size="small"
                    required
                  />
                )}
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

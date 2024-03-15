import { useAppContext } from "@/appProvider";
import CategoryForm from "@/components/Forms/CategoryForm";
import ProductForm from "@/components/Forms/ProductForm";
import SubcategoryForm from "@/components/Forms/SubcategoryForm";
import AllProductsGrid from "@/components/Grids/AllProductsGrid";
import CategoriesGrid from "@/components/Grids/CategoriesGrid";
import ProductsGrid from "@/components/Grids/ProductsGrid";
import SubcategoriesGrid from "@/components/Grids/SubcategoriesGrid";
import useProducts from "@/components/Hooks/useProducts";
import useSales from "@/components/Hooks/useSales";
import ProductsTab from "@/components/Tabs/ProductsTab";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";


export default function products() {
  return (
    <ProductsTab
      Grid={ProductsGridReport()}
      NewProduct={NewProduct()}
      Categories={Categories()}
      Subcategories={Subcategories()}
    />
  );
}

function ProductsGridReport() {
  const { startDate, endDate } = useAppContext();
  const products = useProducts();
  const sales = useSales();
  const [productsList, setProductsList] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fecth = async () => {
      const productsList = await sales.findAllSoldProductsBetweenDates(startDate, endDate);
      const formattedProducts = productsList.map((product) => ({
        id: product.product_id,
        name: product.Product.name,
        code: product.Product.code,
        amount: product.total_sales,
        quanty: parseInt(product.quanty),
        category: product.Product.Subcategory.Category.name


      }))
      setProductsList(formattedProducts);
     setTotalSales(formattedProducts.reduce((acc, curr) => acc + curr.amount, 0));
    };
    fecth();
  }, [startDate, endDate]);

  return (
    <>
      <ProductsGrid productsList={productsList} totalSales={totalSales} />
    </>
  );
}

function NewProduct() {
  const [gridState, setGridState] = useState(false);

  const updateGrid = () => {
    setGridState(!gridState);
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <ProductForm
            afterSubmit={() => {
              updateGrid();
            }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <AllProductsGrid update={gridState} />
        </Grid>
      </Grid>
    </>
  );
}

function Categories() {
  const [gridState, setGridState] = useState(false);

  const updateGrid = () => {
    setGridState(!gridState);
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <CategoryForm
            afterSubmit={() => {
              updateGrid();
            }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <CategoriesGrid update={gridState} />
        </Grid>
      </Grid>
    </>
  );
}

function Subcategories() {
  const [gridState, setGridState] = useState(false);

  const updateGrid = () => {
    setGridState(!gridState);
  };
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <SubcategoryForm
            afterSubmit={() => {
              updateGrid();
            }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <SubcategoriesGrid update={gridState} />
        </Grid>
      </Grid>
    </>
  );
}

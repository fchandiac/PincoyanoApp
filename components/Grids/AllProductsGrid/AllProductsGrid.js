import React, { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import InfoDataGrid from "@/components/Karmextron/InfoDataGrid";
import useProducts from "@/components/Hooks/useProducts";
import EditIcon from "@mui/icons-material/Edit";
import { Dialog } from "@mui/material";
import ProductForm from "@/components/Forms/ProductForm";


export default function AllProductsGrid(props) {
  const { update } = props;
  const products = useProducts();
  const [productsList, setProductsList] = useState([]);
  const [gridApiRef, setGridApiRef] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [rowData, setRowData] = useState({
    id: 0,
    name: "",
    category: null,
    subcategory: null,
    subcategoryName: "",
    categoryName: "",
  });

  useEffect(() => {
    const fecth = async () => {
      const data = await products.findAllToAllGrid();
      setProductsList(data);
    };
    fecth();
  }, [update]);


  const columns = [
    { field: "id", headerName: "Id", flex: .5 },
    { field: "code", headerName: "Código", flex: .5 },
    { field: "name", headerName: "Nombre", flex: 1.8 },
    { field: "subcategoryName", headerName: "Familia", flex: .8 },
    { field: "categoryName", headerName: "Categoría", flex: .8 },
    {
      field: "actions",
      headerName: "",
      headerClassName: "data-grid-last-column-header",
      type: "actions",
      flex: 0.6,
      getActions: (params) => [
        <GridActionsCellItem
          disabled={params.row.name === "SIN CATEGORÍA" ? true : false}
          icon={<EditIcon />}
          label={"edit"}
          onClick={() => {
            setRowData({
              id: params.row.id,
              code: params.row.code,
              name: params.row.name,
              category: params.row.category,
              subcategory: params.row.subcategory,
              subcategoryName: params.row.subcategoryName,
              categoryName: params.row.categoryName,
            });
            setOpenEditDialog(true);
          }}
        />,
      ],
    },
  ];

  const afterUpdate = (data) => {
    gridApiRef.current.updateRows([
      {
        id: data.id,
        code: data.code,
        name: data.name,
        description: data.description,
        category: data.category,
        subcategory: data.subcategory,
        subcategoryName: data.subcategory.name,
        categoryName: data.category.name,
      },
    ]);
    setOpenEditDialog(false);
  }

  return (
    <>
      <InfoDataGrid
        title={"Productos"}
        rows={productsList}
        columns={columns}
        setGridApiRef={setGridApiRef}
        height={"80vh"}
      />
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth maxWidth={'sm'}>
        <ProductForm
          edit={true}
          data={rowData}
          afterSubmit={afterUpdate}
        />
      </Dialog>
    </>
  );
}

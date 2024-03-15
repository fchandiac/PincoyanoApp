import React, { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import InfoDataGrid from "@/components/Karmextron/InfoDataGrid";
import useSubcategories from "@/components/Hooks/useSubcategories";
import EditIcon from "@mui/icons-material/Edit";
import { Dialog } from "@mui/material";
import SubcategoryForm from "@/components/Forms/SubcategoryForm";
import { Category } from "@mui/icons-material";

export default function SubcategoriesGrid(props) {
  const { update } = props;
  const subcategories = useSubcategories();
  const [subcategoriesList, setSubcategoriesList] = useState([]);
  const [gridApiRef, setGridApiRef] = useState(null);
  const [rowData, setRowData] = useState({
    id: null,
    name: "",
    description: "",
    categoryName: "",
    category: null,
  });
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    const fecth = async () => {
      const data = await subcategories.findAllToGrid();
      setSubcategoriesList(data);
    };
    fecth();
  }, [update]);

  const columns = [
    { field: "id", headerName: "Id", flex: 0.5 },
    { field: "name", headerName: "Nombre", flex: 1.5 },
    { field: "description", headerName: "Descripción", flex: 1.5 },
    {
      field: "categoryName",
      headerName: "Categoria",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "",
      headerClassName: "data-grid-last-column-header",
      type: "actions",
      flex: 0.6,
      getActions: (params) => [
        <GridActionsCellItem
          disabled={params.row.name === "SIN FAMILIA" ? true : false}
          icon={<EditIcon />}
          label={"edit"}
          onClick={() => {
            setRowData({
              id: params.row.id,
              name: params.row.name,
              description: params.row.description,
              categoryName: params.row.categoryName,
              category: params.row.category,
            });
            setOpenEditDialog(true);
          }}
        />,
      ],
    },
  ];

  const afterUpdate = (data) => {
    console.log(data);
    gridApiRef.current.updateRows([
      {
        id: data.id,
        name: data.name,
        description: data.description,
        category: data.category,
        categoryName: data.category.name,
      },
    ]);
    setOpenEditDialog(false)
  };
  return (
    <>
      <InfoDataGrid
        title={"Familias"}
        rows={subcategoriesList}
        columns={columns}
        setGridApiRef={setGridApiRef}
        height="80vh"
      />
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <SubcategoryForm
          data={rowData}
          edit={true}
          afterSubmit={afterUpdate}
          dialog={true}
        />
      </Dialog>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import InfoDataGrid from "@/components/Karmextron/InfoDataGrid";
import useCategories from "@/components/Hooks/useCategories";
import { Dialog } from "@mui/material";
import CategoryForm from "@/components/Forms/CategoryForm";
import EditIcon from "@mui/icons-material/Edit";

export default function CategoriesGrid(props) {
  const { update } = props;
  const categories = useCategories();
  const [categoriesList, setCategoriesList] = useState([]);
  const [gridApiRef, setGridApiRef] = useState(null);
  const [rowData, setRowData] = useState({ id: 0, name: "", description: "" });
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    const fecth = async () => {
      const data = await categories.findAllToGrid();
      setCategoriesList(data);
    };
    fecth();
  }, [update]);

  const columns = [
    { field: "id", headerName: "Id", flex: .5 },
    { field: "name", headerName: "Nombre", flex: 1.5},
    {
      field: "description",
      headerName: "Descripción",
      flex: 1.5,
    },
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
              name: params.row.name,
              description: params.row.description,
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
      { id: data.id, name: data.name, description: data.description },
    ]);
    setOpenEditDialog(false);
  };

  return (
    <>
      <InfoDataGrid
        title={"Categorias"}
        rows={categoriesList}
        columns={columns}
        setGridApiRef={setGridApiRef}
        height={"80vh"}
      />

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth maxWidth={'sm'}>
        <CategoryForm
          data={rowData}
          edit={true}
          afterSubmit={afterUpdate}
        />
        </Dialog>
    </>
  );
}

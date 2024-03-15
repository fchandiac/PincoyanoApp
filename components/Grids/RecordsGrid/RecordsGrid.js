import useRecords from "@/components/Hooks/useRecords";
import React, { useEffect, useState } from "react";
import InfoDataGrid from "@/components/Karmextron/InfoDataGrid";
import moment from "moment";


// {
//   "id": 1007,
//   "user_id": 1001,
//   "action": "eliminar",
//   "table": "ventas",
//   "description": "Elimina la venta del archivo workPincoyano.xlsx con fecha 12-03-2024, por un total de $22.140",
//   "createdAt": "2024-03-13T05:00:46.000Z",
//   "updatedAt": "2024-03-13T05:00:46.000Z",
//   "UserId": 1001,
//   "User": {
//       "id": 1001,
//       "user_name": "admin",
//       "name": "Administrador",
//       "pass": "9898",
//       "createdAt": null,
//       "updatedAt": null
//   }
// }

export default function RecordsGrid() {
  const records = useRecords();
  const [recordsList, setRecordsList] = useState([]);
  const [gridApiRef, setGridApiRef] = useState(null);

  useEffect(() => {
    const fecth = async () => {
      const records_ = await records.findAll();
      const formattedRecords = records_.map((record) => ({
          id: record.id,
          userName: record.User === null ? "" : record.User.name,
          action: record.action,
          table: record.table,
          description: record.description,
          createdAt: record.createdAt,
      }));
      setRecordsList(formattedRecords);
    };
    fecth();
  }, []);

  const columns = [
    { field: "id", headerName: "Id", flex: .5 },
    { field: "userName", headerName: "Funcionario", flex: 1.5},
    { field: "action", headerName: "Acción", flex: 1},
    { field: "table", headerName: "Tabla", flex: 1},
    { field: "description", headerName: "Descripción", flex: 2},
    { field: "createdAt", headerName: "Fecha", flex: 1.5, headerClassName: "data-grid-last-column-header",
      valueFormatter: (params) => {
        return moment(params.value).format("DD-MM-YYYY HH:mm");
      }
    },
  ];


  return (
    <>
    <InfoDataGrid 
      title={"Registros"} 
      rows={recordsList} 
      columns={columns} 
      height={"80vh"}
      setGridApiRef={setGridApiRef}
    />

    </>
  )
}

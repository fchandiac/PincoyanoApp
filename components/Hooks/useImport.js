import React from "react";
import useSellers from "./useSellers";
import useCustomers from "./useCustomers";
import useProducts from "./useProducts";
import useSales from "./useSales";
import { useAppContext } from "@/appProvider";
import useFiles from "./useFiles";

export default function useImport() {
  const sellers = useSellers();
  const files = useFiles();
  const customers = useCustomers();
  const products = useProducts();
  const sales = useSales();
  const { setTotalRows, setCurrentRow } = useAppContext();

 

  const importProcess = async (
    data,
    date,
    batchSize,
    file,
    fileName,
    description,
    userId
  ) => {
    try {
      const totalRows = data.length;
      setTotalRows(totalRows);
      let processedRows = 0;
      let fileId = 0;

      try {
        const newFile = await files.uploadFile(
          fileName,
          description,
          userId,
          file
        );
        fileId = newFile.data.id;
      } catch (err) {
        console.log(err);
      }

      while (processedRows < totalRows) {
        const batchData = data.slice(processedRows, processedRows + batchSize);
        const promises = batchData.map(async (row) => {
          setCurrentRow(processedRows);


          try {
            const [seller, customer, item] = await Promise.all([
              sellers.importSeller(row.sellerCode, row.seller),
              customers.importCustomer(row.customer),
              products.importProduct(row.productCode, row.product),
            ]);

            console.log("seller", seller);
            console.log("customer", customer);
            console.log("product", row.productCode, row.product);

            const sale = await sales.create(
              row.invoice,
              row.quanty,
              row.price,
              row.discount,
              row.return_,
              row.total_return,
              row.total_sale,
              row.total,
              item.id,
              customer.id,
              seller.id,
              date,
              fileId
            );

            return sale;
          } catch (error) {
            console.error("Error creating sale:", error);
            return null;
          }
        });

        await Promise.all(promises);

        processedRows += batchSize;
      }
    } catch (error) {
      console.error("Import process error:", error);
      throw error;
    }
  };


  return {
    importProcess,
  };
}

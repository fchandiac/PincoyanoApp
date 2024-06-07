import moment from "moment";
import React from "react";
const sales = require("../../services/sales");

export default function useSales() {
  const create = async (
    invoice,
    quanty,
    price,
    discount,
    return_,
    total_return,
    total_sale,
    total,
    product_id,
    customer_id,
    seller_id,
    date,
    file_id
  ) => {
    const sale = await sales.create(
      invoice,
      quanty,
      price,
      discount,
      return_,
      total_return,
      total_sale,
      total,
      product_id,
      customer_id,
      seller_id,
      date,
      file_id
    );
    return sale;
  };

  const findAll = async () => {
    const sale = await sales.findAll();
    return sale;
  };

  const findAllbetweenDate = async (start, end) => {
    const sale = await sales.findAllbetweenDate(start, end);
    return sale;
  };

  const findAllBySellerBetweenDate = async (seller_id, start, end) => {
    const sale = await sales.findAllBySellerBetweenDate(seller_id, start, end);
    return sale;
  };

  const findAllSoldProductsBetweenDates = async (startDate, endDate) => {
    const sale = await sales.findAllSoldProductsBetweenDates(
      startDate,
      endDate
    );
    return sale;
  };

  const calculateProductSalesByAmount = (data) => {
    const productSalesMap = new Map();
    let totalSalesOthers = 0;

    data.forEach((item) => {
      const productId = item.Product.id;
      const productName = item.Product.name;
      const totalSale = item.total;

      if (productSalesMap.has(productId)) {
        const currentTotal = productSalesMap.get(productId).totalSale;
        productSalesMap.set(productId, {
          productId,
          productName,
          totalSale: currentTotal + totalSale,
        });
      } else {
        productSalesMap.set(productId, { productId, productName, totalSale });
      }
    });

    let productSalesList = Array.from(productSalesMap.values());

    // Ordenar la lista de productos por total de ventas de mayor a menor
    productSalesList.sort((a, b) => b.totalSale - a.totalSale);

    // Agrupar los productos desde el número 11 en "otros"
    if (productSalesList.length > 10) {
      const othersProducts = productSalesList.slice(10);
      totalSalesOthers = othersProducts.reduce(
        (acc, curr) => acc + curr.totalSale,
        0
      );
      productSalesList = productSalesList.slice(0, 10);
      productSalesList.push({
        productName: "Otros",
        totalSale: totalSalesOthers,
      });
    }

    // Formatear la lista de salida en el formato { name: productName, value: totalSale }
    const formattedProductSalesList = productSalesList.map((product) => ({
      name: product.productName,
      value: product.totalSale,
    }));

    return formattedProductSalesList;
  };

  const calculateProductSalesByQuantity = (data) => {
    const productSalesMap = new Map();
    let totalQuantityOthers = 0;

    data.forEach((item) => {
      const productId = item.Product.id;
      const productName = item.Product.name;
      const quantity = item.quanty;

      if (productSalesMap.has(productId)) {
        const currentTotal = productSalesMap.get(productId).totalQuantity;
        productSalesMap.set(productId, {
          productId,
          productName,
          totalQuantity: currentTotal + quantity,
        });
      } else {
        productSalesMap.set(productId, {
          productId,
          productName,
          totalQuantity: quantity,
        });
      }
    });

    let productSalesList = Array.from(productSalesMap.values());

    // Ordenar la lista de productos por cantidad de ventas de mayor a menor
    productSalesList.sort((a, b) => b.totalQuantity - a.totalQuantity);

    // Agrupar los productos desde el número 11 en "otros"
    if (productSalesList.length > 10) {
      const othersProducts = productSalesList.slice(10);
      totalQuantityOthers = othersProducts.reduce(
        (acc, curr) => acc + curr.totalQuantity,
        0
      );
      productSalesList = productSalesList.slice(0, 10);
      productSalesList.push({
        productName: "Otros",
        totalQuantity: totalQuantityOthers,
      });
    }

    // Formatear la lista de salida en el formato { name: productName, value: totalQuantity }
    const formattedProductSalesList = productSalesList.map((product) => ({
      name: product.productName,
      value: product.totalQuantity,
    }));

    return formattedProductSalesList;
  };

  const calculateTotalSalesByDay = (data) => {
    const totalSalesByDay = {};

    data.forEach((item) => {
      const date = new Date(item.date).toISOString().split("T")[0]; // Obtener la fecha del objeto y convertirla a formato ISO
      const totalSale = item.total;

      if (totalSalesByDay[date]) {
        totalSalesByDay[date] += totalSale; // Sumar el total de ventas al día correspondiente
      } else {
        totalSalesByDay[date] = totalSale; // Crear una nueva entrada para el día si no existe
      }
    });

    // Formatear el resultado en el formato requerido
    const formattedSalesByDay = Object.keys(totalSalesByDay).map((day) => ({
      day: day,
      sales: totalSalesByDay[day],
    }));

    return formattedSalesByDay;
  };

  const calculateSellerSalesByAmount = (data) => {
    const sellerSalesMap = new Map();
    let totalAmountOthers = 0;

    data.forEach((item) => {
      const sellerId = item.seller_id;
      const sellerName = item.Seller.name;
      const amount = item.total;

      if (sellerSalesMap.has(sellerId)) {
        const currentTotal = sellerSalesMap.get(sellerId).totalAmount;
        sellerSalesMap.set(sellerId, {
          sellerId,
          sellerName,
          totalAmount: currentTotal + amount,
        });
      } else {
        sellerSalesMap.set(sellerId, {
          sellerId,
          sellerName,
          totalAmount: amount,
        });
      }
    });

    let sellerSalesList = Array.from(sellerSalesMap.values());

    // Ordenar la lista de vendedores por monto total de ventas de mayor a menor
    sellerSalesList.sort((a, b) => b.totalAmount - a.totalAmount);

    // Agrupar los vendedores desde el número 11 en "otros"
    if (sellerSalesList.length > 10) {
      const othersSellers = sellerSalesList.slice(10);
      totalAmountOthers = othersSellers.reduce(
        (acc, curr) => acc + curr.totalAmount,
        0
      );
      sellerSalesList = sellerSalesList.slice(0, 10);
      sellerSalesList.push({
        sellerName: "Otros",
        totalAmount: totalAmountOthers,
      });
    }

    // Formatear la lista de salida en el formato { name: sellerName, value: totalAmount }
    const formattedSellerSalesList = sellerSalesList.map((seller) => ({
      name: seller.sellerName,
      value: seller.totalAmount,
    }));

    return formattedSellerSalesList;
  };

  const sellerReport = async (seller_id, sellerName, start, end) => {
    const sale = await sales.findAllBySellerBetweenDate(seller_id, start, end);

    const countCustomers = new Set(sale.map((sale) => sale.customer_id)).size;
    const categoriesSales =
      await sales.findAllBySellerGroupByCategoryBetweenDate(
        seller_id,
        start,
        end
      );

    const categoriesSalesChart = categoriesSales.map((category) => ({
      categoryName: category.category_name,
      amount: category.total_sales,
    }));

    return {
      title: "Reporte vendedor: " + sellerName,
      totalSales: sale.reduce((acc, item) => acc + item.total, 0),
      totalUnits: sale.reduce((acc, item) => acc + item.quanty, 0),
      topProductsAmount: calculateProductSalesByAmount(sale),
      topProductsUnits: calculateProductSalesByQuantity(sale),
      salesPerDay: calculateTotalSalesByDay(sale),
      customers: countCustomers,
      categoriesSales: categoriesSalesChart,
    };
  };

  const totalSalesByProductBetweenDates = async (
    product_id,
    startDate,
    endDate
  ) => {
    const sale = await sales.totalSalesByProductBetweenDates(
      product_id,
      startDate,
      endDate
    );
    return sale;
  };

  const totalQuantyByProductBetweenDates = async (
    product_id,
    startDate,
    endDate
  ) => {
    const sale = await sales.totalQuantyByProductBetweenDates(
      product_id,
      startDate,
      endDate
    );
    return sale;
  };

  const findAllByProductBetweenDateGroupByDate = async (
    product_id,
    startDate,
    endDate
  ) => {
    const sale = await sales.findAllByProductBetweenDateGroupByDate(
      product_id,
      startDate,
      endDate
    );
    return sale;
  };

  const productReport = async (productId, productName, start, end) => {
    const totalSales = await totalSalesByProductBetweenDates(
      productId,
      start,
      end
    );
    const totalUnits = await totalQuantyByProductBetweenDates(
      productId,
      start,
      end
    );
    const salesPerDay = await findAllByProductBetweenDateGroupByDate(
      productId,
      start,
      end
    );
    const formattedSalesPerDay = salesPerDay.map((item) => ({
      day: moment(item.date).format("DD-MM-YYYY"),
      sales: item.total_sales,
    }));

    const productReport = {
      title: "Reporte producto: " + productName,
      totalSales: totalSales,
      totalUnits: totalUnits,
      salesPerDay: formattedSalesPerDay,
    };
    return productReport;
  };

  const findAllByCustomerBetweenDate = async (customer_id, start, end) => {
    const sale = await sales.findAllByCustomerBetweenDate(
      customer_id,
      start,
      end
    );
    return sale;
  };

  const findAllByProductBetweenDate = async (product_id, start, end) => {
    const sale = await sales.findAllByProductBetweenDate(
      product_id,
      start,
      end
    );
    return sale;
  };

  const findAllbetweenDateToGrid = async (start, end) => {
    const sales_ = await sales.findAllBetweenDateToDataGrid(start, end);
    console.log("sales_", sales_);
    // const toGrid = sales_.map((sale) => ({
    //   id: sale.id,
    //   sellerName: sale.Seller == null ? "" : sale.Seller.name,
    //   customerName: sale.Customer == null ? "" : sale.Customer.name,
    //   productName: sale.Product == null ? "" : sale.Product.name,
    //   quanty: sale.quanty,
    //   discount: sale.discount,
    //   price: sale.price,
    //   total_sale: sale.total_sale,
    //   total_return: sale.total_return,
    //   total: sale.total,
    //   return_: sale.return_,
    //   product_id: sale.product_id,
    //   customer_id: sale.customer_id,
    //   seller_id: sale.seller_id,
    //   date: sale.date,
    //   fileName: sale.File == null ? "" : sale.File.nsame,
    // }));

    return sales_;
  };



  const totalUnitsBetweenDate = async (start, end) => {
    const total = await sales.totalUnitsBetweenDate(start, end);
    return total;
  };

  const salesToChartBetweenDate = async (start, end) => {
    // const sales_ = await sales.findAllbetweenDate(start, end);

    // const data = sales_.map((sale) => ({
    //   day: moment(sale.date).format("DD-MM-YYYY"),
    //   sales: sale.total,
    // }));

    // const salesByDay = groupSalesByDay(data);

    // return salesByDay;

    const sales_ = await sales.salesToChartBetweenDate(start, end);
    return sales_.data;
  };

  function groupSalesByDay(salesArray) {
    return salesArray.reduce((acc, curr) => {
      const day = curr.day;
      const sales = curr.sales;

      // Verificar si ya existe una entrada para este día en el acumulador
      const existingDay = acc.find((item) => item.day === day);

      // Si ya existe, se suma el total de ventas al existente
      if (existingDay) {
        existingDay.sales += sales;
      } else {
        // Si no existe, se crea una nueva entrada para este día
        acc.push({ day, sales });
      }

      return acc;
    }, []);
  }

  const totalCustomersBySellerBetweenDate = async (seller_id, start, end) => {
    const sales_ = await sales.findAllBySellerBetweenDate(
      seller_id,
      start,
      end
    );
    const customers = sales_.map((sale) => sale.Customer);
    const customersSet = new Set(customers);
    return customersSet.size;
  };

  const dashBoardTopQuanty = async (start, end) => {
    const sales_ = await sales.findAllbetweenDate(start, end);
    const data = calculateProductSalesByQuantity(sales_);

    return data;
  };

  const dashBoardTopAmount = async (start, end) => {
    const sales_ = await sales.findAllbetweenDate(start, end);
    const data = calculateProductSalesByAmount(sales_);

    return data;
  };

  const dashBoardTopSellers = async (start, end) => {
    const sales_ = await sales.findAllbetweenDate(start, end);
    const data = calculateSellerSalesByAmount(sales_);

    return data;
  };

  const customersSalesBetweenDate = async (start, end) => {
    const customers = await sales.customersSalesBetweenDate(start, end);
    return customers;
  };

  const findAllBySellerGroupByCategoryBetweenDate = async (
    seller_id,
    start,
    end
  ) => {
    const sales_ = await sales.findAllBySellerGroupByCategoryBetweenDate(
      seller_id,
      start,
      end
    );
    return sales_;
  };

  const findAllGroupByCategoryBetweenDates = async (startDate, endDate) => {
    const sales_ = await sales.findAllGroupByCategoryBetweenDates(
      startDate,
      endDate
    );
    return sales_;
  };

  const totalSalesByCustomerBetweenDates = async (
    customer_id,
    startDate,
    endDate
  ) => {
    const sale = await sales.totalSalesByCustomerBetweenDates(
      customer_id,
      startDate,
      endDate
    );
    return sale;
  };

  const totalQuantyByCustomerBetweenDates = async (
    customer_id,
    startDate,
    endDate
  ) => {
    const sale = await sales.totalQuantyByCustomerBetweenDates(
      customer_id,
      startDate,
      endDate
    );
    return sale;
  };

  const findAllByCustomerBetweenDateGroupByDate = async (
    customer_id,
    startDate,
    endDate
  ) => {
    const sale = await sales.findAllByCustomerBetweenDateGroupByDate(
      customer_id,
      startDate,
      endDate
    );
    return sale;
  };

  const findAllByCustomerBetweenDateGroupByCategory = async (
    customer_id,
    startDate,
    endDate
  ) => {
    const sale = await sales.findAllByCustomerBetweenDateGroupByCategory(
      customer_id,
      startDate,
      endDate
    );
    return sale;
  };

  const customerReport = async (customerId, customerName, start, end) => {
    const totalSales = await totalSalesByCustomerBetweenDates(
      customerId,
      start,
      end
    );
    const totalUnits = await totalQuantyByCustomerBetweenDates(
      customerId,
      start,
      end
    );
    const salesPerDay = await findAllByCustomerBetweenDateGroupByDate(
      customerId,
      start,
      end
    );
    const formattedSalesPerDay = salesPerDay.map((item) => ({
      day: moment(item.date).format("DD-MM-YYYY"),
      sales: item.total_sales,
    }));

    const categoriesSales = await findAllByCustomerBetweenDateGroupByCategory(customerId, start, end)
    const formattedCategoriesSales = categoriesSales.map((category) => ({
      categoryName: category.category_name,
      amount: category.total_sales,
    }));

    const customerReport = {
      title: "Reporte cliente: " + customerName,
      totalSales: totalSales,
      totalUnits: totalUnits,
      salesPerDay: formattedSalesPerDay,
      categoriesSales: formattedCategoriesSales,
    };

    console.log("customerReport", customerReport);
    return customerReport;
  };

  const destroy = async (id) => {
    const sale = await sales.destroy(id);
    return sale;
  }

  const destroyAllByFile = async (file_id) => {
    const sale = await sales.destroyAllByFile(file_id);
    return sale;
  }

   //function totalSalesBetweenDate(start, end) 

   const totalSalesBetweenDate = async (start, end) => {
    const total = await sales.totalSalesBetweenDate(start, end);


    
    return total;
   }


  return {
    create,
    findAll,
    findAllbetweenDate,
    findAllBySellerBetweenDate,
    findAllByCustomerBetweenDate,
    findAllByProductBetweenDate,
    findAllbetweenDateToGrid,
    sellerReport,
    totalSalesBetweenDate,
    totalUnitsBetweenDate,
    salesToChartBetweenDate,
    totalCustomersBySellerBetweenDate,
    dashBoardTopQuanty,
    dashBoardTopAmount,
    dashBoardTopSellers,
    findAllSoldProductsBetweenDates,
    customersSalesBetweenDate,
    findAllBySellerGroupByCategoryBetweenDate,
    findAllGroupByCategoryBetweenDates,
    productReport,
    customerReport,
    destroy,
    destroyAllByFile,
    totalSalesByProductBetweenDates,
  };
}

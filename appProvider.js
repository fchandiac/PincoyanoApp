import moment from "moment";
import React, { useReducer, createContext, useContext } from "react";
const AppContext = createContext();
const useAppContext = () => useContext(AppContext);

const initialState = {
  snack: { open: false, message: "", type: "error" },
  pageTitle: "",
  login: false,
  user: {
    id: null,
    userName: '',
    name: '',
  },
  startDate: moment(new Date()).format("YYYY-MM-DD 00:00:00"),
  endDate: moment(new Date()).format("YYYY-MM-DD 23:59:59"),
  sellerReport: {
    title: "Reporte vendedor",
    totalSales: 0,
    totalUnits: 0,
    customers: 0,
    topProductsAmount: [],
    topProductsUnits: [],
    salesPerDay: [],
    categoriesSales: [],
  },
  productReport: {
    title: "Reporte producto",
    totalSales: 0,
    totalUnits: 0,
    salesPerDay: [],
  },
  customerReport: {
    title: "Reporte cliente",
    totalSales: 0,
    totalUnits: 0,
    salesPerDay: [],
    categoriesSales: [],
  },

  processedSale: {
    totalRows: 0,
    currentRow: 0,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_SNACK":
      return {
        ...state,
        snack: {
          open: true,
          message: action.value.message,
          type: action.value.type,
        },
      };
    case "CLOSE_SNACK":
      return {
        ...state,
        snack: {
          open: false,
          message: action.value.message,
          type: action.value.type || "error",
        },
      };
    case "SET_PAGE_TITLE":
      return { ...state, pageTitle: action.value };
    case "SET_USER":
      return { ...state, user: action.value };
    case "SET_START_DATE":
      return { ...state, startDate: action.value };
    case "SET_END_DATE":
      return { ...state, endDate: action.value };
    case "SET_SELLER_REPORT":
      return { ...state, sellerReport: action.value };
    case "SET_PRODUCT_REPORT":
      return { ...state, productReport: action.value };
    case "SET_CUSTOMER_REPORT":
      return { ...state, customerReport: action.value };
    case "SET_TOTAL_ROWS":
      return {
        ...state,
        processedSale: { ...state.processedSale, totalRows: action.value },
      };
    case "SET_CURRENT_ROW":
      return {
        ...state,
        processedSale: { ...state.processedSale, currentRow: action.value },
      };
    case 'SET_LOGIN':
      return {
        ...state,
        login: action.value
      }
    default:
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setPageTitle = (title) => {
    dispatch({ type: "SET_PAGE_TITLE", value: title });
  };

  const openSnack = (message, type) => {
    console.log("openSnack_____");
    dispatch({ type: "OPEN_SNACK", value: { message, type } });
  };

  const setUser = (user) => {
    dispatch({ type: "SET_USER", value: user });
  };

  const setStartDate = (date) => {
    dispatch({ type: "SET_START_DATE", value: date });
  };

  const setEndDate = (date) => {
    dispatch({ type: "SET_END_DATE", value: date });
  };

  const setSellerReport = (data) => {
    dispatch({ type: "SET_SELLER_REPORT", value: data });
  };

  const setProductReport = (data) => {
    dispatch({ type: "SET_PRODUCT_REPORT", value: data });
  };

  const setCustomerReport = (data) => {
    dispatch({ type: "SET_CUSTOMER_REPORT", value: data });
  };

  const setTotalRows = (value) => {
    dispatch({ type: "SET_TOTAL_ROWS", value });
  };

  const setCurrentRow = (value) => {
    dispatch({ type: "SET_CURRENT_ROW", value });
  };

  const setLogin = (value) => {
    dispatch({ type: 'SET_LOGIN', value })
  }

  return (
    <AppContext.Provider
      value={{
        snack: state.snack,
        pageTitle: state.pageTitle,
        user: state.user,
        startDate: state.startDate,
        endDate: state.endDate,
        sellerReport: state.sellerReport,
        productReport: state.productReport,
        customerReport: state.customerReport,
        processedSale: state.processedSale,
        login: state.login,
        dispatch,
        setPageTitle,
        openSnack,
        setUser,
        setStartDate,
        setEndDate,
        setSellerReport,
        setProductReport,
        setCustomerReport,
        setTotalRows,
        setCurrentRow,
        setLogin
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useAppContext };

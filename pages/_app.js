import "@/styles/globals.css";
import { AppProvider, useAppContext } from '../appProvider'
import Layout from "@/components/Layout"
import { createTheme, ThemeProvider, rgbToHex } from '@mui/material/styles'
import { esES } from '@mui/material/locale'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider, esES as esESPick } from '@mui/x-date-pickers'

const theme = createTheme(
  {
    palette: {
      primary: { main: '#e53935', contrastText: '#fff' },
      MUIBorder: { main: rgbToHex('rgba(0, 0, 0, 0.12)') },
      // secondary: { main: '#ef5350', contrastText: '#fff' },
      // error: { main: '#ef5350', contrastText: '#fff' },
      // warning: { main: '#ffca28', contrastText: '#fff' },
      // info: { main: '#2196f3', contrastText: '#fff' },
      // success: { main: '#4caf50', contrastText: '#fff' },
      // background: { default: '#fff' },
      // text: { primary: '#212121', secondary: '#757575' },
      // divider: '#bdbdbd',
      // action: { active: '#212121', hover: '#bdbdbd', selected: '#eeeeee', disabled: '#bdbdbd', disabledBackground: '#e0e0e0' },

    },
  }, esES)



export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

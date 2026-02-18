import { createTheme } from '@mui/material/styles'

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      dark: '#046c89', //(Escuro)
      main: '#1c7b9b', //(Médio)
      light: '#62a4c0', //(Claro)
    },
    secondary: {
      dark: '#381396', // (Escuro)
      main: '#5322a6', // (Base)
      light: '#8d68c4', // (Claro)
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
  },
})

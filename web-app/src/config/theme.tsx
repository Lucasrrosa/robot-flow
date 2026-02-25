import { createTheme } from '@mui/material/styles'

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      dark: '#06b1e0', //(Escuro)
      main: '#28adda', //(Médio)
      light: '#4592b3', //(Claro)
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
      styleOverrides: {
        root: { borderRadius: 16 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
})

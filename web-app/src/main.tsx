import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { appTheme } from './config/theme.tsx'
import WsContextProvider from './robot/contexts/WsContextProvider.tsx'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <WsContextProvider>
        <App />
      </WsContextProvider>
    </ThemeProvider>
  </StrictMode>
)

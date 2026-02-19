import Paper from '@mui/material/Paper'
import { type PropsWithChildren } from 'react'

type Props = {
  isActive: boolean
}

export default function NodeBasePaper({ isActive, children }: PropsWithChildren<Props>) {
  return (
    <Paper
      sx={{ p: 1, borderColor: isActive ? 'primary.main' : undefined,borderWidth: isActive ? 2 : undefined }}
    >
      {children}
    </Paper>
  )
}

import Chip from '@mui/material/Chip'
import { useRobotStore } from '../../robotStore'
import type { ConnectionStatus } from '../../types/types'

const INDICATOR_CONFIG: Record<ConnectionStatus, { label: string; color: 'success' | 'error' | 'warning' }> = {
  connected: { label: 'Conectado', color: 'success' },
  disconnected: { label: 'Desconectado', color: 'error' },
  connecting: { label: 'Conectando...', color: 'warning' }
} as const

export function WsConnectionStatusIndicator() {
  const robotConnectionStatus = useRobotStore(store => store.robotConnectionStatus)
  return (
    <Chip size='small' variant='outlined' label={INDICATOR_CONFIG[robotConnectionStatus].label} color={INDICATOR_CONFIG[robotConnectionStatus].color} />
  )
}
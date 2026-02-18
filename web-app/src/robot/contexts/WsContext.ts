import React from 'react'
import type { CommandMessage } from '../types/types'

export type WsContextType = {
  connect: (ip: string) => void
  sendMessage: (message: CommandMessage) => void
  disconnect: () => void
  ipAddress: string
}

export const WsContext = React.createContext<WsContextType | null>(null)

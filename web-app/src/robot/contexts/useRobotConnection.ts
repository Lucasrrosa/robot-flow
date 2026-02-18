import { WsContext, type WsContextType } from '@/robot/contexts/WsContext'
import { use } from 'react'

export const useRobotConnection = (): WsContextType => {
  const context = use(WsContext)
  if (!context) {
    throw new Error('useRobotConnection must be used within a WsProvider')
  }
  return context
}

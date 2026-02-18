import { useRef, useState, type PropsWithChildren } from 'react'
import { useRobotStore } from '../robotStore'
import type { CommandMessage, RobotStatus } from '../types/types'
import { WsContext } from './WsContext'

export default function WsContextProvider({ children }: PropsWithChildren) {
  const wsRef = useRef<WebSocket | null>(null)
  const setLastStatus = useRobotStore((store) => store.setLastStatus)
  const robotConnectionStatus = useRobotStore((store) => store.robotConnectionStatus)
  const setRobotConnected = useRobotStore((store) => store.setRobotConnected)
  const [ipAddress, setIpAddress] = useState('')

  function sendMessage(message: CommandMessage) {
    if (robotConnectionStatus !== 'connected' || wsRef.current === null) return
    wsRef.current.send(JSON.stringify(message))
  }

  const connect = (ip: string) => {
    const wsUrl = `ws://${ip}:81`
    if (robotConnectionStatus !== 'disconnected') return
    setRobotConnected('connecting')
    wsRef.current = new WebSocket(wsUrl)
    wsRef.current.onopen = () => {
      setRobotConnected('connected')
      setIpAddress(ip)
      sendMessage({ type: 'status' })
    }
    wsRef.current.onclose = () => {
      setRobotConnected('disconnected')
      wsRef.current = null
    }

    wsRef.current.onerror = () => {
      setRobotConnected('disconnected')
      wsRef.current = null
    }

    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)

        if (data?.type === 'status') {
          const st = data as RobotStatus
          setLastStatus(st)
        }
      } catch {
        // ignore
      }
    }
  }

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    setRobotConnected('disconnected')
  }
  return <WsContext.Provider value={{ connect, sendMessage, disconnect, ipAddress }}>{children}</WsContext.Provider>
}

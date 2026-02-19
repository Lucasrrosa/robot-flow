type MoveMessage = { type: 'move'; left: number; right: number }

type StopMessage = { type: 'stop' }

type CalibrateMessage = {
  type: 'calibrate'
  leftStopUs: number
  rightStopUs: number
}

type SpeedRangeMessage = {
  type: 'speedRange'
  value: number
}

type StatusMessage = {
  type: 'status'
}

export type CommandMessage = StopMessage | CalibrateMessage | SpeedRangeMessage | MoveMessage | StatusMessage

export type RobotStatus = {
  type: string
  ip: string
  left: number
  right: number
  distanceCm: number
  mpuOk: boolean
  accX: number
  accY: number
  accZ: number
  gyroX: number
  gyroY: number
  gyroZ: number
  tempC: number
}

export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting'

export type RobotStore = {
  robotConnectionStatus: ConnectionStatus
  setRobotConnected: (v: ConnectionStatus) => void

  lastStatus: RobotStatus | null
  setLastStatus: (st: RobotStatus) => void
}

export type RobotValue =
  | 'left'
  | 'right'
  | 'distanceCm'
  | 'accX'
  | 'accY'
  | 'accZ'
  | 'gyroX'
  | 'gyroY'
  | 'gyroZ'
  | 'tempC'

type MoveCommand = { timeMs: number; type: 'move'; dir: boolean }
type TurnCommand = { angle: number; type: 'turn' }
type CustomMoveCommand = { left: number; right: number; type: 'customMove' }
type StopCommand = { type: 'stop' }
type CalibrateCommand = { type: 'calibrate'; leftStopUs: number; rightStopUs: number }
type StatusCommand = { type: 'status' }
type SetSpeedCommand = { type: 'setSpeed'; value: number }

export type CommandMessage =
  | MoveCommand
  | TurnCommand
  | CustomMoveCommand
  | StopCommand
  | CalibrateCommand
  | SetSpeedCommand
  | StatusCommand

export type RobotStatus = {
  type: string
  ip: string
  distanceCm: number
  speed: number
  isBusy: boolean
}

export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting'

export type RobotStore = {
  robotConnectionStatus: ConnectionStatus
  setRobotConnected: (v: ConnectionStatus) => void

  lastStatus: RobotStatus | null
  setLastStatus: (st: RobotStatus) => void
}

export type RobotValues = keyof RobotStatus

export type RobotSensorValues = 'distanceCm' | 'speed'

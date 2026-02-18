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
  type: 'status',
}

export type CommandMessage = StopMessage | CalibrateMessage | SpeedRangeMessage | MoveMessage | StatusMessage


export type RobotStatus = {
  type: "status"
  ip?: string
  left?: number
  right?: number
  leftStopUs?: number
  rightStopUs?: number
  speedRangeUs?: number
}
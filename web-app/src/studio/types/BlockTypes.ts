import type { RobotSensorValues } from '@/robot/types/types'

export type StartBlockType = {
  type: 'start'
  runtimeActive: boolean
}

export type StopBlockType = {
  type: 'stop'
  runtimeActive: boolean
}

export type SetSpeedBlockType = {
  type: 'setSpeed'
  value: number
  runtimeActive: boolean
}

export type DelayBlockType = {
  type: 'delay'
  ammountMs: number
  runtimeActive: boolean
}

export type DirectionType = 'forward' | 'backward'

export type MoveBlockType = {
  type: 'move'
  direction: DirectionType
  timeMs: number
}

export type TurnBlockType = {
  type: 'turn'
  angle: number
}

export type ConditionOperations = 'equals' | 'notEquals' | 'greaterThan' | 'lessThan'

export type IfBlockType = {
  type: 'if'
  condition: ConditionOperations
  conditionValue: number
  robotValue: RobotSensorValues
  runtimeActive: boolean
}

export type CustomMoveBlockType = {
  type: 'customMove'
  left: number
  right: number
}

export const BLOCK_MAPPING = {
  START: 'start',
  STOP: 'stop',
  SET_SPEED: 'setSpeed',
  MOVE: 'move',
  TURN: 'turn',
  DELAY: 'delay',
  IF: 'if',
  CUSTOM_MOVE: 'customMove',
} as const

export type BlockTypes = (typeof BLOCK_MAPPING)[keyof typeof BLOCK_MAPPING]

export type Block =
  | StartBlockType
  | StopBlockType
  | SetSpeedBlockType
  | DelayBlockType
  | IfBlockType
  | CustomMoveBlockType
  | MoveBlockType
  | TurnBlockType

export type BlockPayloads = {
  start: StartBlockType
  stop: StopBlockType
  setSpeed: SetSpeedBlockType
  move: MoveBlockType
  turn: TurnBlockType
  delay: DelayBlockType
  if: IfBlockType
  customMove: CustomMoveBlockType
}

export type ExecutorBlockTyping<Type extends BlockTypes = BlockTypes> = (
  block: BlockPayloads[Type]
) => Promise<void> | void

export type BlockExecutorType = {
  [K in BlockTypes]: ExecutorBlockTyping<K>
}

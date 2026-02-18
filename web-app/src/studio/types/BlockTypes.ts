import type { RobotValue } from '@/robot/types/types'

export type StartBlockType = {
  type: 'start'
  runtimeActive: boolean
}

export type StopBlockType = {
  type: 'stop'
  runtimeActive: boolean
}

export type SetVelocityBlockType = {
  type: 'setVelocity'
  left: number
  right: number
  runtimeActive: boolean
}

export type DelayBlockType = {
  type: 'delay'
  ammountMs: number
  runtimeActive: boolean
}

export type IfBlockType = {
  type: 'if'
  condition: 'equals' | 'notEquals' | 'greaterThan' | 'lessThan'
  conditionValue: string
  robotValue: RobotValue
  runtimeActive: boolean
}

export type BlockTypes = 'start' | 'stop' | 'setVelocity' | 'delay' | 'if'

export type Block = StartBlockType | StopBlockType | SetVelocityBlockType | DelayBlockType | IfBlockType


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

export type ConditionOperations = 'equals' | 'notEquals' | 'greaterThan' | 'lessThan'

export type IfBlockType = {
  type: 'if'
  condition: ConditionOperations
  conditionValue: number
  robotValue: RobotValues
  runtimeActive: boolean
}

export const BLOCK_MAPPING = {
  START: 'start',
  STOP: 'stop',
  SET_VELOCITY: 'setVelocity',
  DELAY: 'delay',
  IF: 'if',
} as const

export type BlockTypes = (typeof BLOCK_MAPPING)[keyof typeof BLOCK_MAPPING]

export type Block = StartBlockType | StopBlockType | SetVelocityBlockType | DelayBlockType | IfBlockType

export type BlockPayloads = {
  start: StartBlockType
  stop: StopBlockType
  setVelocity: SetVelocityBlockType
  delay: DelayBlockType
  if: IfBlockType
}

export type ExecutorBlockTyping<Type extends BlockTypes = BlockTypes> = (
  block: BlockPayloads[Type]
) => Promise<void> | void

export type BlockExecutorType = {
  [K in BlockTypes]: ExecutorBlockTyping<K>
}

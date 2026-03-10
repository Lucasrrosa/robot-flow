import { DelayNode } from '@/studio/components/DelayNode'
import IfNode from '@/studio/components/IfNode'
import { StartNode } from '@/studio/components/StartNode'
import { StopNode } from '@/studio/components/StopNode'
import { CustomMoveNode } from '@/studio/components/CustomMoveNode'
import type { BlockTypes } from '@/studio/types/BlockTypes'
import { SetSpeedNode } from '@/studio/components/SetSpeedNode'
import { TurnNode } from '@/studio/components/TurnNode'
import { MoveNode } from '@/studio/components/MoveNode'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const NODE_TYPES: Record<BlockTypes, any> = {
  start: StartNode,
  stop: StopNode,
  setSpeed: SetSpeedNode,
  move: MoveNode,
  turn: TurnNode,
  customMove: CustomMoveNode,
  delay: DelayNode,
  if: IfNode,
}

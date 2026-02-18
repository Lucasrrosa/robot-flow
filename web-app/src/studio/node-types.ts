import { DelayNode } from "@/studio/components/DelayNode"
import { StartNode } from "@/studio/components/StartNode"
import { StopNode } from "@/studio/components/StopNode"
import { VelocityNode } from "@/studio/components/VelocityNode"
import type { BlockTypes } from "@/studio/types/BlockTypes"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const NODE_TYPES: Record<BlockTypes, any> = {
  start: StartNode,
  stop: StopNode,
  setVelocity: VelocityNode,
  delay: DelayNode,
  if: null,
}
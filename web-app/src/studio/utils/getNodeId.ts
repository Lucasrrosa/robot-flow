import type { BlockTypes } from '@/studio/types/BlockTypes'

export const getNodeId = (node: BlockTypes): string => {
  return `${node}_${+new Date()}`
}

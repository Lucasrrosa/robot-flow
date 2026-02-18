import type { Block, BlockTypes } from '@/studio/types/BlockTypes'

export const getNodeDefaultValues = (type: BlockTypes): Block => {
  switch (type) {
    case 'delay':
      return { type: 'delay', ammountMs: 0, runtimeActive: false }
    case 'setVelocity':
      return { type: 'setVelocity', left: 0, right: 0, runtimeActive: false }
    case 'start':
      return { type: 'start', runtimeActive: false }
    case 'stop':
      return { type: 'stop', runtimeActive: false }
    case 'if':
      return { type: 'if', condition: 'equals', robotValue: 'distanceCm', conditionValue: '0', runtimeActive: false }
  }
}

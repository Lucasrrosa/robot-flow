import type { Block, BlockTypes } from '@/studio/types/BlockTypes'

export const getNodeDefaultValues = (type: BlockTypes): Block => {
  switch (type) {
    case 'start':
      return { type: 'start', runtimeActive: false }
    case 'stop':
      return { type: 'stop', runtimeActive: false }
    case 'setSpeed':
      return { type: 'setSpeed', value: 0, runtimeActive: false }
    case 'delay':
      return { type: 'delay', ammountMs: 0, runtimeActive: false }
    case 'if':
      return { type: 'if', condition: 'equals', robotValue: 'distanceCm', conditionValue: 0, runtimeActive: false }
    case 'customMove':
      return { type: 'customMove', left: 0, right: 0 }
    case 'turn':
      return { type: 'turn', angle: 0 }
    case 'move':
      return { type: 'move', direction: 'forward', timeMs: 0 }
  }
}

import type { RobotStatus } from '@/robot/types/types'
import type { IfBlockType } from '@/studio/types/BlockTypes'

const applyCondition = (robotValue: number, value: number, condition: IfBlockType['condition']): boolean => {
  switch (condition) {
    case 'equals':
      return robotValue === value
    case 'notEquals':
      return robotValue !== value
    case 'greaterThan':
      return robotValue > value
    case 'lessThan':
      return robotValue < value
    default:
      return false
  }
}
export const calculateCondition = (status: RobotStatus, conditionBlock: IfBlockType): boolean => {
  const robotValue = status[conditionBlock.robotValue]
  return applyCondition(robotValue, conditionBlock.conditionValue, conditionBlock.condition)
}

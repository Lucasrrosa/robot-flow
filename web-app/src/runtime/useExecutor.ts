import { useRobotConnection } from '@/robot/contexts/useRobotConnection'
import { useRobotStore } from '@/robot/robotStore'
import { calculateCondition } from '@/runtime/utils/calculateCondition'
import type { BlockExecutorType, BlockTypes } from '@/studio/types/BlockTypes'
import { useStudioStore, type AppNode } from '@/studio/useStudioStore'
import { useCallback, useEffect, useMemo } from 'react'

function findStart(nodes: AppNode[]) {
  return nodes.find((n) => n.type === 'start') ?? null
}
function getNodeById(nodes: AppNode[], id: string) {
  return nodes.find((n) => n.id === id) ?? null
}

export const useExecutor = () => {
  const { sendMessage } = useRobotConnection()
  const status = useRobotStore((store) => store.lastStatus)
  const nodes = useStudioStore((store) => store.nodes)
  const edges = useStudioStore((store) => store.edges)
  const isRunning = useStudioStore((store) => store.isRunning)
  const setIsRunning = useStudioStore((store) => store.setIsRunning)
  const setActualNodeId = useStudioStore((store) => store.setActualNodeId)
  const actualNodeId = useStudioStore((store) => store.actualNodeId)
  const isBusy = useRobotStore((store) => store.lastStatus?.isBusy)

  const nextStep = useCallback(
    (sourceHandle?: string) => {
      let candidates = edges.filter((e) => e.source === actualNodeId)
      console.log('Executing next step:', actualNodeId, 'Source handle: ', sourceHandle)
      if (sourceHandle) candidates = candidates.filter((e) => e.sourceHandle === sourceHandle)
      setActualNodeId(candidates[0]?.target ?? null)
    },
    [actualNodeId, edges, setActualNodeId]
  )

  const startProgram = () => {
    if (isRunning) throw new Error('Program is already running.')
    const startNode = findStart(nodes)
    if (!startNode) throw new Error('Start node não encontrado.')
    setActualNodeId(startNode.id)
    setIsRunning(true)
  }

  const stopProgram = useCallback(() => {
    setIsRunning(false)
    setActualNodeId(null)
    sendMessage({ type: 'stop' })
  }, [setIsRunning, setActualNodeId, sendMessage])

  const BLOCKS_EXECUTOR: BlockExecutorType = useMemo(
    () => ({
      delay: async (block) => {
        console.log('Executing delay block with', block.ammountMs, 'milliseconds')
        await new Promise((r) => setTimeout(r, block.ammountMs))
        nextStep()
      },
      if: (block) => {
        if (!status) throw new Error('Nenhuma informação do Robô')
        const isConditionMet = calculateCondition(status, block)
        console.log('Condition met:', isConditionMet)
        nextStep(isConditionMet ? 'then' : 'else')
      },
      setSpeed: (block) => {
        console.log('Setting velocity with', block.value)
        sendMessage({
          type: 'setSpeed',
          value: block.value,
        })
        nextStep()
      },
      move: (block) => {
        console.log('Executing move with', block)
        sendMessage({
          type: 'move',
          timeMs: block.timeMs,
          dir: block.direction === 'backward' ? true : false,
        })
        nextStep()
      },
      turn: (block) => {
        console.log('Executing turn with', block)
        sendMessage({
          type: 'turn',
          angle: block.angle,
        })
        nextStep()
      },
      customMove: (block) => {
        console.log('Executing custom move with', block)
        sendMessage({
          type: 'customMove',
          left: block.left,
          right: block.right,
        })
        nextStep()
      },
      start: () => {
        nextStep()
      },
      stop: () => {
        sendMessage({ type: 'stop' })
        console.log('Execution stopped')
        stopProgram()
      },
    }),
    [status, nextStep, sendMessage, stopProgram]
  )

  const executeBlock = useCallback(
    async (node: AppNode) => {
      if (!isRunning) return
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await BLOCKS_EXECUTOR[node.type as BlockTypes](node.data as any)
    },
    [BLOCKS_EXECUTOR, isRunning]
  )

  useEffect(() => {
    if (isBusy) return
    if (actualNodeId === null) return
    const node = getNodeById(nodes, actualNodeId)
    if (!node) {
      console.log('Node not found', actualNodeId)
      throw new Error('Node not found')
    }
    executeBlock(node)
  }, [actualNodeId, executeBlock, nodes, isBusy])

  return { startProgram, stopProgram }
}

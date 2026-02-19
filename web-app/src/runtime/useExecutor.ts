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

  const nextStep = useCallback(
    (sourceHandle?: string) => {
      let candidates = edges.filter((e) => e.source === actualNodeId)
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
    sendMessage({type: 'stop'})
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
        nextStep(isConditionMet ? 'true' : 'false')
      },
      setVelocity: (block) => {
        console.log('Setting velocity with', block.left, 'left and', block.right, 'right')
        sendMessage({
          type: 'move',
          left: block.left / 100,
          right: block.right / 100,
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
      if (!isRunning)
        return
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await BLOCKS_EXECUTOR[node.type as BlockTypes](node.data as any)
    },
    [BLOCKS_EXECUTOR, isRunning]
  )

  useEffect(() => {
    if (actualNodeId === null) return
    const node = getNodeById(nodes, actualNodeId)
    if (!node) throw new Error('Node not found')
    executeBlock(node)
  }, [actualNodeId, executeBlock, nodes])

  return { startProgram, stopProgram }
}

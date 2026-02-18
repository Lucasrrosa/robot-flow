import type { BlockTypes } from '@/studio/types/BlockTypes'
import { getNodeDefaultValues } from '@/studio/utils/getNodeDefaultValues'
import { getNodeId } from '@/studio/utils/getNodeId'
import { addEdge, useEdgesState, useNodesState, type Edge, type Node, type OnConnect } from '@xyflow/react'
import { useCallback } from 'react'

const defaultNodes: Node[] = [
  {
    id: 'start',
    type: 'start',
    position: { x: 80, y: 80 },
    data: {
      type: 'start',
    },
  },
  {
    id: 'setVelocity',
    type: 'setVelocity',
    position: { x: 220, y: 80 },
    data: { type: 'setVelocity', left: 0.5, right: 0.5 },
  },
  {
    id: 'delay1',
    type: 'delay',
    position: { x: 360, y: 80 },
    data: { type: 'delay', ammountMs: 800 },
  },
  {
    id: 'stop',
    type: 'stop',
    position: { x: 700, y: 80 },
    data: {},
  },
]

const defaultEdges: Edge[] = [
  { id: 'e1', source: 'start', target: 'setVelocity' },
  { id: 'e2', source: 'setVelocity', target: 'delay1' },
  { id: 'e3', source: 'delay1', target: 'stop' },
]

export const useStudio = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges)

  const onConnect: OnConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges])

  const onAdd = useCallback(
    (type: BlockTypes) => {
      const newNode = {
        id: getNodeId(type),
        type: type,
        data: getNodeDefaultValues(type),
        position: {
          x: (Math.random() - 0.5) * 400,
          y: (Math.random() - 0.5) * 400,
        },
      }
      setNodes((nds) => nds.concat(newNode))
    },
    [setNodes]
  )

  return { nodes, edges, onAdd, onConnect, onEdgesChange, onNodesChange }
}

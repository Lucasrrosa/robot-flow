import type { BlockTypes } from '@/studio/types/BlockTypes'
import { getNodeDefaultValues } from '@/studio/utils/getNodeDefaultValues'
import { getNodeId } from '@/studio/utils/getNodeId'
import {
  type Edge,
  type Node,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react'
import { create } from 'zustand'

export type AppNode = Node

export type AppState = {
  nodes: AppNode[]
  edges: Edge[]
  onNodesChange: OnNodesChange<AppNode>
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  setNodes: (nodes: AppNode[]) => void
  addNode: (type: BlockTypes) => void
  setEdges: (edges: Edge[]) => void
  isRunning: boolean
  setIsRunning: (isRunning: boolean) => void
  actualNodeId: string | null
  setActualNodeId: (nodeId: string | null) => void
}
export const useStudioStore = create<AppState>((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    })
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    })
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    })
  },
  setNodes: (nodes) => {
    set({ nodes })
  },
  setEdges: (edges) => {
    set({ edges })
  },
  addNode: (type: BlockTypes) => {
    const newNode = {
      id: getNodeId(type),
      type: type,
      data: getNodeDefaultValues(type),
      position: {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
      },
    }
    set((state) => ({ nodes: [...state.nodes, newNode] }))
  },
  isRunning: false,
  setIsRunning: (isRunning: boolean) => set({ isRunning }),
  actualNodeId: null,
  setActualNodeId: (nodeId: string | null) => set({ actualNodeId: nodeId }),
}))

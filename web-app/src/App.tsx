import RobotStatusPanel from '@/robot/components/RobotStatusPanel'
import ExecutionPanel from '@/runtime/components/ExecutionPanel'
import AddBlockPanel from '@/studio/components/AddBlockPanel'
import ContextMenu from '@/studio/ContextMenu'
import { NODE_TYPES } from '@/studio/node-types'
import { useStudioStore } from '@/studio/useStudioStore'
import Box from '@mui/material/Box'
import {
  Background,
  BackgroundVariant,
  Controls,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  type DefaultEdgeOptions,
  type FitViewOptions,
  type NodeMouseHandler,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useCallback, useState } from 'react'
import ConnectionCard from './robot/components/ConnectionCard'

type MenuType = {
  nodeId: string
  anchorEl: HTMLElement | null
}

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
}

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
}

export default function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStudioStore()
  const [menu, setMenu] = useState<MenuType | null>(null)
  const onNodeContextMenu: NodeMouseHandler = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault()
      setMenu({
        nodeId: node.id,
        anchorEl: event.currentTarget as HTMLElement,
      })
    },
    [setMenu]
  )
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={NODE_TYPES}
          fitView
          onNodeContextMenu={onNodeContextMenu}
          fitViewOptions={fitViewOptions}
          defaultEdgeOptions={defaultEdgeOptions}
        >
          <Background variant={BackgroundVariant.Dots} />
          <Controls />
          <Panel position='top-left'>
            <ConnectionCard />
          </Panel>
          <Panel position='center-left'>
            <AddBlockPanel />
          </Panel>
          <Panel position='bottom-right'>
            <RobotStatusPanel />
          </Panel>
          <Panel position='top-right'>
            <ExecutionPanel />
          </Panel>
          {menu && <ContextMenu id={menu.nodeId} anchorEl={menu.anchorEl} onClose={() => setMenu(null)} />}
        </ReactFlow>
      </ReactFlowProvider>
    </Box>
  )
}

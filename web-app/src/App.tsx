import AddBlockPanel from '@/studio/components/AddBlockPanel'
import ContextMenu from '@/studio/ContextMenu'
import { NODE_TYPES } from '@/studio/node-types'
import { useStudio } from '@/studio/useStudio'
import Box from '@mui/material/Box'
import {
  Background,
  BackgroundVariant,
  Controls,
  Panel,
  ReactFlow,
  type DefaultEdgeOptions,
  type FitViewOptions,
  type NodeMouseHandler,
  type OnNodeDrag,
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

const onNodeDrag: OnNodeDrag = (_, node) => {
  console.log('drag event', node.data)
}

export default function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onAdd } = useStudio()
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
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDrag={onNodeDrag}
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
        <Panel position='center-right'>
          <AddBlockPanel onAdd={onAdd} />
        </Panel>
        {menu && <ContextMenu id={menu.nodeId} anchorEl={menu.anchorEl} onClose={() => setMenu(null)} />}
      </ReactFlow>
    </Box>
  )
}

import type { BlockTypes } from '@/studio/types/BlockTypes'
import { getNodeId } from '@/studio/utils/getNodeId'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useReactFlow } from '@xyflow/react'
import { useCallback } from 'react'

type Props = {
  id: string
  anchorEl: null | HTMLElement
  onClose: () => void
}

export default function ContextMenu({ id, anchorEl, onClose }: Props) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow()
  const duplicateNode = useCallback(() => {
    const node = getNode(id)
    if (!node) return
    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50,
    }
    addNodes({
      ...node,
      id: getNodeId(node.type as BlockTypes),
      position,
    })
    onClose()
  }, [id, getNode, addNodes, onClose])

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id))
    setEdges((edges) => edges.filter((edge) => edge.source !== id))
    onClose()
  }, [id, setNodes, setEdges, onClose])

  return (
    <Menu id={`menu-${id}`} anchorEl={anchorEl} open onClose={onClose}>
      <MenuItem onClick={duplicateNode}>Duplicar</MenuItem>
      <MenuItem onClick={deleteNode}>Deletar</MenuItem>
    </Menu>
  )
}

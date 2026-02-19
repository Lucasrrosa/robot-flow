import NodeBasePaper from '@/studio/components/parts/NodeBasePaper'
import type { StopBlockType } from '@/studio/types/BlockTypes'
import { useStudioStore } from '@/studio/useStudioStore'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import Typography from '@mui/material/Typography'
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'

type StopNode = Node<StopBlockType, 'stop'>

export function StopNode({ id }: NodeProps<StopNode>) {
  const activeNodeId = useStudioStore((store) => store.actualNodeId)
  const isActive = activeNodeId === id
  return (
    <NodeBasePaper isActive={isActive}>
      <StopCircleIcon />
      <Typography variant='body1'>Fim</Typography>
      <Handle type='target' position={Position.Left} />
    </NodeBasePaper>
  )
}

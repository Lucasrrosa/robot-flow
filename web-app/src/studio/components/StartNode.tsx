import NodeBasePaper from '@/studio/components/parts/NodeBasePaper'
import type { StartBlockType } from '@/studio/types/BlockTypes'
import { useStudioStore } from '@/studio/useStudioStore'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import Typography from '@mui/material/Typography'
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'

type StartNode = Node<StartBlockType, 'start'>

export function StartNode({ id }: NodeProps<StartNode>) {
  const activeNodeId = useStudioStore((store) => store.actualNodeId)
  const isActive = activeNodeId === id
  return (
    <NodeBasePaper isActive={isActive}>
      <PlayCircleFilledIcon />
      <Typography variant='body1'>Início</Typography>
      <Handle type='source' position={Position.Right} />
    </NodeBasePaper>
  )
}

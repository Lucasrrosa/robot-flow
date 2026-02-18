import NodeBasePaper from '@/studio/components/parts/NodeBasePaper'
import type { StartBlockType } from '@/studio/types/BlockTypes'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import Typography from '@mui/material/Typography'
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'

type StartNode = Node<StartBlockType, 'start'>

export function StartNode({ data }: NodeProps<StartNode>) {
  const isActive = data.runtimeActive
  return (
    <NodeBasePaper isActive={isActive}>
      <PlayCircleFilledIcon />
      <Typography variant='body1'>Início</Typography>
      <Handle type='source' position={Position.Right} />
    </NodeBasePaper>
  )
}

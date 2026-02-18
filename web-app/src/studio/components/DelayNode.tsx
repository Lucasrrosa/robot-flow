import NodeBasePaper from '@/studio/components/parts/NodeBasePaper'
import type { DelayBlockType } from '@/studio/types/BlockTypes'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'

type DelayNode = Node<DelayBlockType, 'delay'>

export function DelayNode({ data }: NodeProps<DelayNode>) {
  const isActive = data.runtimeActive
  return (
    <NodeBasePaper isActive={isActive}>
      <Stack spacing={1} alignItems='center'> 
        <Typography fontWeight={500} variant="body1">Delay</Typography>
        <TextField size='small' sx={{width: 150}} label='Duração(ms)' variant='outlined' type='number' />
      </Stack>
      <Handle type='target' position={Position.Left} />
      <Handle type='source' position={Position.Right} />
    </NodeBasePaper>
  )
}

import NodeBasePaper from '@/studio/components/parts/NodeBasePaper'
import type { SetVelocityBlockType } from '@/studio/types/BlockTypes'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'

type VelocityNode = Node<SetVelocityBlockType, 'setVelocity'>

export function VelocityNode({ data }: NodeProps<VelocityNode>) {
  const isActive = data.runtimeActive
  return (
    <NodeBasePaper isActive={isActive}>
      <Stack spacing={1} alignItems='center'>
        <Typography fontWeight={500} variant='body1'>
          Velocidade
        </Typography>
        <Stack direction='row' spacing={2}>
          <TextField sx={{width: 100}}label='Esquerda' variant='outlined' />
          <TextField sx={{width: 100}}label='Direita' variant='outlined' />
        </Stack>
      </Stack>
      <Handle type='target' position={Position.Left} />
      <Handle type='source' position={Position.Right} />
    </NodeBasePaper>
  )
}

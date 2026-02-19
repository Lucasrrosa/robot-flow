import NodeBasePaper from '@/studio/components/parts/NodeBasePaper'
import type { SetVelocityBlockType } from '@/studio/types/BlockTypes'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Handle, Position, useReactFlow, type Node, type NodeProps } from '@xyflow/react'

type VelocityNode = Node<SetVelocityBlockType, 'setVelocity'>

export function VelocityNode({ data, id }: NodeProps<VelocityNode>) {
  const { updateNodeData } = useReactFlow()
  const isActive = data.runtimeActive

  const updateValue = (side: 'left' | 'right', value: number) => {
    const clampedValue = Math.max(-100, Math.min(value, 100))
    updateNodeData(id, { [side]: clampedValue })
  }
  return (
    <NodeBasePaper isActive={isActive}>
      <Stack spacing={1} alignItems='center'>
        <Typography fontWeight={500} variant='body1'>
          Velocidade
        </Typography>
        <Stack direction='row' spacing={2}>
          <TextField
            sx={{ width: 100 }}
            label='Esquerda'
            variant='outlined'
            value={`${data.left}`}
            type='number'
            onChange={(e) => updateValue('left', Number(e.target.value))}
          />
          <TextField
            sx={{ width: 100 }}
            label='Direita'
            variant='outlined'
            value={`${data.right}`}
            type='number'
            onChange={(e) => updateValue('right', Number(e.target.value))}
          />
        </Stack>
      </Stack>
      <Handle type='target' position={Position.Left} />
      <Handle type='source' position={Position.Right} />
    </NodeBasePaper>
  )
}

import NumberField from '@/components/NumberField'
import NodeBasePaper from '@/studio/components/parts/NodeBasePaper'
import type { SetVelocityBlockType } from '@/studio/types/BlockTypes'
import { useStudioStore } from '@/studio/useStudioStore'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Handle, Position, useReactFlow, type Node, type NodeProps } from '@xyflow/react'

type VelocityNode = Node<SetVelocityBlockType, 'setVelocity'>

export function VelocityNode({ data, id }: NodeProps<VelocityNode>) {
  const { updateNodeData } = useReactFlow()
  const activeNodeId = useStudioStore((store) => store.actualNodeId)
  const isActive = activeNodeId === id

  const updateValue = (side: 'left' | 'right', value: number) => {
    const clampedValue = Math.max(-100, Math.min(value, 100))
    updateNodeData(id, { [side]: clampedValue })
  }
  return (
    <NodeBasePaper isActive={isActive}>
      <Handle type='target' position={Position.Top} />
      <Stack spacing={1} alignItems='center'>
        <Typography fontWeight={500} variant='body1'>
          Velocidade
        </Typography>
        <Stack direction='row' spacing={2}>
          <Box sx={{ width: 100 }}>
            <NumberField
              size='small'
              value={data.left}
              onValueChange={(value) => updateValue('left', Number(value))}
              label='Esquerda'
            />
          </Box>
          <Box sx={{ width: 100 }}>
            <NumberField
              size='small'
              value={data.right}
              onValueChange={(value) => updateValue('right', Number(value))}
              label='Direita'
            />
          </Box>
        </Stack>
      </Stack>

      <Handle type='source' position={Position.Bottom} />
    </NodeBasePaper>
  )
}

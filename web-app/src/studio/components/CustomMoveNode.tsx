import NumberField from '@/components/NumberField'
import NodeBasePaper from '@/studio/components/parts/NodeBasePaper'
import type { CustomMoveBlockType } from '@/studio/types/BlockTypes'
import { useStudioStore } from '@/studio/useStudioStore'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Handle, Position, useReactFlow, type Node, type NodeProps } from '@xyflow/react'

type CustomMoveNode = Node<CustomMoveBlockType, 'customMove'>

export function CustomMoveNode({ data, id }: NodeProps<CustomMoveNode>) {
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
          Mover custom
        </Typography>
        <Stack direction='row' spacing={2}>
          <Box sx={{ width: 150 }}>
            <NumberField
              size='small'
              value={data.left}
              min={-100}
              max={100}
              onValueChange={(value) => updateValue('left', Number(value))}
              label='Roda esquerda'
            />
          </Box>
          <Box sx={{ width: 150 }}>
            <NumberField
              size='small'
              value={data.right}
              min={-100}
              max={100}
              onValueChange={(value) => updateValue('right', Number(value))}
              label='Roda direita'
            />
          </Box>
        </Stack>
      </Stack>

      <Handle type='source' position={Position.Bottom} />
    </NodeBasePaper>
  )
}

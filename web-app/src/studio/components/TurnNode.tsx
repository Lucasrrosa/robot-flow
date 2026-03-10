import NumberField from '@/components/NumberField'
import NodeBasePaper from '@/studio/components/parts/NodeBasePaper'
import type { TurnBlockType } from '@/studio/types/BlockTypes'
import { useStudioStore } from '@/studio/useStudioStore'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Handle, Position, useReactFlow, type Node, type NodeProps } from '@xyflow/react'

type TurnNode = Node<TurnBlockType, 'turn'>

export function TurnNode({ data, id }: NodeProps<TurnNode>) {
  const { updateNodeData } = useReactFlow()
  const activeNodeId = useStudioStore((store) => store.actualNodeId)
  const isActive = activeNodeId === id
  return (
    <NodeBasePaper isActive={isActive}>
      <Handle type='target' position={Position.Top} />
      <Stack spacing={1} alignItems='center'>
        <Typography fontWeight={500} variant='body1'>
          Girar
        </Typography>
        <Stack direction='row' spacing={2}>
          <Box sx={{ width: 100 }}>
            <NumberField
              size='small'
              value={data.angle}
              min={0}
              onValueChange={(value) => {
                updateNodeData(id, { angle: value || 0 })
              }}
              label='Angulo(°)'
            />
          </Box>
        </Stack>
      </Stack>
      <Handle type='source' position={Position.Bottom} />
    </NodeBasePaper>
  )
}

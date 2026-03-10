import NumberField from '@/components/NumberField'
import NodeBasePaper from '@/studio/components/parts/NodeBasePaper'
import type { SetSpeedBlockType } from '@/studio/types/BlockTypes'
import { useStudioStore } from '@/studio/useStudioStore'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Handle, Position, useReactFlow, type Node, type NodeProps } from '@xyflow/react'

type SetSpeedNode = Node<SetSpeedBlockType, 'setSpeed'>

export function SetSpeedNode({ data, id }: NodeProps<SetSpeedNode>) {
  const { updateNodeData } = useReactFlow()
  const activeNodeId = useStudioStore((store) => store.actualNodeId)
  const isActive = activeNodeId === id
  return (
    <NodeBasePaper isActive={isActive}>
      <Handle type='target' position={Position.Top} />
      <Stack spacing={1} alignItems='center'>
        <Typography fontWeight={500} variant='body1'>
          Definir velocidade
        </Typography>
        <Stack direction='row' spacing={2}>
          <Box sx={{ width: 200 }}>
            <NumberField
              size='small'
              value={data.value}
              min={0}
              max={400}
              onValueChange={(value) => {
                updateNodeData(id, { value: value || 0 })
              }}
              label='Speed(0 - 400)'
            />
          </Box>
        </Stack>
      </Stack>

      <Handle type='source' position={Position.Bottom} />
    </NodeBasePaper>
  )
}

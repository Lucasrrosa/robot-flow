import NumberField from '@/components/NumberField'
import NodeBasePaper from '@/studio/components/parts/NodeBasePaper'
import RobotDirectionSelect from '@/studio/components/parts/RobotDirectionSelect'
import type { DirectionType, MoveBlockType } from '@/studio/types/BlockTypes'
import { useStudioStore } from '@/studio/useStudioStore'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Handle, Position, useReactFlow, type Node, type NodeProps } from '@xyflow/react'

type MoveNode = Node<MoveBlockType, 'move'>

export function MoveNode({ data, id }: NodeProps<MoveNode>) {
  const { updateNodeData } = useReactFlow()
  const activeNodeId = useStudioStore((store) => store.actualNodeId)
  const isActive = activeNodeId === id
  return (
    <NodeBasePaper isActive={isActive}>
      <Handle type='target' position={Position.Top} />
      <Stack spacing={1} alignItems='center'>
        <Typography fontWeight={500} variant='body1'>
          Mover reto
        </Typography>
        <Stack direction='row' spacing={2}>
          <Box sx={{ width: 100 }}>
            <NumberField
              size='small'
              value={data.timeMs}
              min={0}
              onValueChange={(value) => {
                updateNodeData(id, { timeMs: value || 0 })
              }}
              label='Tempo(ms)'
            />
          </Box>
          <Box sx={{ width: 100 }}>
            <RobotDirectionSelect
              value={data.direction}
              onChange={(value: DirectionType) => {
                updateNodeData(id, { direction: value })
              }}
            />
          </Box>
        </Stack>
      </Stack>

      <Handle type='source' position={Position.Bottom} />
    </NodeBasePaper>
  )
}

import NodeBasePaper from '@/studio/components/parts/NodeBasePaper'
import type { DelayBlockType } from '@/studio/types/BlockTypes'
import { useStudioStore } from '@/studio/useStudioStore'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Handle, Position, useReactFlow, type Node, type NodeProps } from '@xyflow/react'

type DelayNode = Node<DelayBlockType, 'delay'>

export function DelayNode({ data, id }: NodeProps<DelayNode>) {
  const activeNodeId = useStudioStore(store => store.actualNodeId)
  const isActive = activeNodeId === id
  const { updateNodeData } = useReactFlow()
  return (
    <NodeBasePaper isActive={isActive}>
      <Stack spacing={1} alignItems='center'>
        <Typography fontWeight={500} variant='body1'>
          Delay
        </Typography>
        <TextField
          size='small'
          sx={{ width: 150 }}
          label='Duração(ms)'
          variant='outlined'
          type='number'
          value={`${data.ammountMs}`}
          onChange={(e) => updateNodeData(id, { ammountMs: Number(e.target.value) })}
        />
      </Stack>
      <Handle type='target' position={Position.Left} />
      <Handle type='source' position={Position.Right} />
    </NodeBasePaper>
  )
}

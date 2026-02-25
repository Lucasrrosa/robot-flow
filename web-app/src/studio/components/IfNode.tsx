import NumberField from '@/components/NumberField'
import ConditionSelect from '@/studio/components/parts/ConditionSelect'
import NodeBasePaper from '@/studio/components/parts/NodeBasePaper'
import RobotValueSelect from '@/studio/components/parts/RobotValueSelect'
import type { IfBlockType } from '@/studio/types/BlockTypes'
import { useStudioStore } from '@/studio/useStudioStore'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { Handle, Position, useReactFlow, type Node, type NodeProps } from '@xyflow/react'

type IfNode = Node<IfBlockType, 'if'>

const StyledHandles = styled(Handle)({
  position: 'relative',
  bottom: 0,
  left: 0,
  transform: 'none',
})

const HandleSourceContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row',
  padding: theme.spacing(7),
  justifyContent: 'space-between',
  left: 0,
  bottom: 0,
  width: '100%',
  transform: 'translate(0,50%)',
}))

export default function IfNode({ id, data }: NodeProps<IfNode>) {
  const { updateNodeData } = useReactFlow()
  const activeNodeId = useStudioStore((store) => store.actualNodeId)
  const isActive = activeNodeId === id
  return (
    <NodeBasePaper isActive={isActive}>
      <Handle type='target' position={Position.Top} />
      <Stack direction='column' spacing={2}>
        <Typography variant='h6'>Condição</Typography>
        <Stack direction='row' spacing={1}>
          <RobotValueSelect value={data.robotValue} onChange={(v) => updateNodeData(id, { robotValue: v })} />
          <ConditionSelect value={data.condition} onChange={(v) => updateNodeData(id, { condition: v })} />
          <Box sx={{ width: 100 }}>
            <NumberField
              size='small'
              value={data.conditionValue}
              onValueChange={(value) => updateNodeData(id, { conditionValue: value })}
              label='Valor'
            />
          </Box>
        </Stack>
        <Stack direction='row' justifyContent='space-between' px={4}>
          <Typography color='textSecondary' variant='body2'>
            Então
          </Typography>
          <Typography color='textSecondary' variant='body2'>
            Senão
          </Typography>
        </Stack>
      </Stack>
      <HandleSourceContainer>
        <StyledHandles type='source' position={Position.Bottom} id='then' />
        <StyledHandles type='source' position={Position.Bottom} id='else' />
      </HandleSourceContainer>
    </NodeBasePaper>
  )
}

import { useStudioStore } from '@/studio/useStudioStore'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default function AddBlockPanel() {
  const nodes = useStudioStore((store) => store.nodes)
  const addNode = useStudioStore((store) => store.addNode)
  const hasStartNode = nodes.some((node) => node.type === 'start')

  return (
    <Paper>
      <Stack p={2} spacing={1}>
        <Typography variant='h6'>Adicionar bloco</Typography>
        <Button variant='outlined' disabled={hasStartNode} onClick={() => addNode('start')}>
          Início
        </Button>
        <Button variant='outlined' onClick={() => addNode('stop')}>
          Fim
        </Button>
        {/*<Button variant='outlined' onClick={() => addNode('if')}>Condição</Button>*/}
        <Button variant='outlined' onClick={() => addNode('delay')}>
          Delay
        </Button>
        <Button variant='outlined' onClick={() => addNode('setVelocity')}>
          Velocidade
        </Button>
      </Stack>
    </Paper>
  )
}

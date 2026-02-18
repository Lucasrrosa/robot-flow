import type { BlockTypes } from '@/studio/types/BlockTypes'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

type Props = {
  onAdd: (type: BlockTypes) => void
}

export default function AddBlockPanel({ onAdd }: Props) {
  return (
    <Paper>
      <Stack p={2} spacing={1}>
        <Typography variant="h6">Adicionar bloco</Typography>
        <Button variant='outlined' onClick={() => onAdd('start')}>Início</Button>
        <Button variant='outlined' onClick={() => onAdd('stop')}>Fim</Button>
        {/*<Button variant='outlined' onClick={() => onAdd('if')}>Condição</Button>*/}
        <Button variant='outlined' onClick={() => onAdd('delay')}>Start</Button>
        <Button variant='outlined' onClick={() => onAdd('setVelocity')}>Velocidade</Button>
      </Stack>
    </Paper>
  )
}

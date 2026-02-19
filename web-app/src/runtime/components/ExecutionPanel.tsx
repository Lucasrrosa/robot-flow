import { useRobotStore } from '@/robot/robotStore'
import { useExecutor } from '@/runtime/useExecutor'
import { useStudioStore } from '@/studio/useStudioStore'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

export default function ExecutionPanel() {
  const { startProgram, stopProgram, } = useExecutor()
  const { isRunning } = useStudioStore()
  const { robotConnectionStatus } = useRobotStore()
  const playButtonDisabled = robotConnectionStatus !== 'connected' && !isRunning
  const stopButtonDisabled = robotConnectionStatus !== 'connected' || isRunning
  return (
    <Paper>
      <Stack p={1} spacing={2} alignItems='end'>
        <Stack direction='row' spacing={1} alignItems='center'>
          <Typography fontWeight={500} variant='body1' color='primary'>Executar</Typography>
          <Tooltip title={playButtonDisabled ? 'O Robô não está conectado' : 'Parar o programa'}>
            <IconButton onClick={playButtonDisabled ? undefined : stopProgram}>
              <StopIcon color={stopButtonDisabled ? 'disabled' : 'error'} />
            </IconButton>
          </Tooltip>
          <Tooltip title={playButtonDisabled ? 'O Robô não está conectado' : 'Iniciar o programa'}>
            <IconButton onClick={playButtonDisabled ? undefined : startProgram}>
              <PlayArrowIcon color={playButtonDisabled ? 'disabled' : 'success'} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Paper>
  )
}

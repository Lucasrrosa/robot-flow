import { useRobotStore } from '@/robot/robotStore'
import { useExecutor } from '@/runtime/useExecutor'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default function ExecutionPanel() {
  const { startProgram, stopProgram } = useExecutor()
  const { robotConnectionStatus } = useRobotStore()
  const isNotConnected = robotConnectionStatus !== 'connected'
  return (
    <Paper>
      <Stack p={1} spacing={2} alignItems='end'>
        <Typography variant='h6'>Execution Panel</Typography>
        <Stack direction='row' spacing={1}>
          <IconButton disabled={isNotConnected} onClick={stopProgram}>
            <StopIcon color={isNotConnected ? 'disabled' : 'error'} />
          </IconButton>
          <IconButton disabled={isNotConnected} onClick={startProgram}>
            <PlayArrowIcon color={isNotConnected ? 'disabled' : 'error'} />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  )
}

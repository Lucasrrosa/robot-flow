import { useRobotStore } from '@/robot/robotStore'
import { connectionLabels } from '@/robot/utils/connectionLabels'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default function RobotStatusPanel() {
  const status = useRobotStore((store) => store.lastStatus)
  const connectionStatus = useRobotStore((store) => store.robotConnectionStatus)

  return (
    <Paper sx={{minWidth: '300px'}}>
      <Stack p={2} spacing={1}>
        <Typography variant='h6'>Telemetria</Typography>
        <Typography variant='body1' color={connectionStatus ==='connected' ? 'success' : 'textDisabled'}>Robô {connectionLabels[connectionStatus]}</Typography>
        <Typography variant='caption'>Distância</Typography>
        <Typography variant='body1'>{status?.distanceCm.toFixed(2) || '-'} cm</Typography>
        <Typography variant='caption'>Motores</Typography>
        <Typography variant='body1'>
          L: {status?.left}R: {status?.right}{' '}
        </Typography>
        <Typography variant='caption'>MPU</Typography>
        <Typography variant='caption'>Angulos</Typography>
        <Typography variant='body1'>
          X: {status?.angleX.toFixed(2) || '-'}° Y: {status?.angleY.toFixed(2) || '-'}° Z: {status?.angleZ.toFixed(2) || '-'}°
        </Typography>
      </Stack>
    </Paper>
  )
}

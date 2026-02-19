import { useRobotStore } from '@/robot/robotStore'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default function RobotStatusPanel() {
  const status = useRobotStore((store) => store.lastStatus)

  if (!status)
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant='body1'>Status Unavailable</Typography>
      </Paper>
    )

  return (
    <Paper>
      <Stack p={2} spacing={1}>
        <Typography variant='h6'>Robot Status</Typography>
        <Stack direction='row' spacing={2} justifyContent='start'>
          <Typography variant='body1'>Distancia(cm)</Typography>
          <Chip variant='outlined' size='small' label={status.distanceCm.toFixed(2)} />
        </Stack>
        <Typography variant='body1'>Acelerometro: </Typography>
        <Stack direction='row' spacing={2} justifyContent='start'>
          <Typography variant='body1'>X</Typography>
          <Chip variant='outlined' size='small' label={status.accX} />
        </Stack>
        <Stack direction='row' spacing={2} justifyContent='start'>
          <Typography variant='body1'>Y</Typography>
          <Chip variant='outlined' size='small' label={status.accY} />
        </Stack>
        <Stack direction='row' spacing={2} justifyContent='start'>
          <Typography variant='body1'>Z</Typography>
          <Chip variant='outlined' size='small' label={status.accZ} />
        </Stack>
        <Typography variant='body1'>Giroscopio: </Typography>
        <Stack direction='row' spacing={2} justifyContent='start'>
          <Typography variant='body1'>X</Typography>
          <Chip variant='outlined' size='small' label={status.gyroX} />
        </Stack>
        <Stack direction='row' spacing={2} justifyContent='start'>
          <Typography variant='body1'>Y</Typography>
          <Chip variant='outlined' size='small' label={status.gyroY} />
        </Stack>
        <Stack direction='row' spacing={2} justifyContent='start'>
          <Typography variant='body1'>Z</Typography>
          <Chip variant='outlined' size='small' label={status.gyroZ} />
        </Stack>
        <Stack direction='row' spacing={2} justifyContent='start'>
          <Typography variant='body1'>Temperatura(°C)</Typography>
          <Chip variant='outlined' size='small' label={status.tempC.toFixed(1)} />
        </Stack>
      </Stack>
    </Paper>
  )
}

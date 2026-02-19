import { useRobotConnection } from '@/robot/contexts/useRobotConnection'
import SensorsOffIcon from '@mui/icons-material/SensorsOff'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

export default function ConnectionInfo() {
  const { ipAddress, disconnect } = useRobotConnection()
  return (
    <Stack direction='row' alignItems='center' spacing={1}>
      <Typography fontWeight={500} variant='body1'>
        Conectado:
      </Typography>
      <Typography variant='body2'>{ipAddress}</Typography>
      <Tooltip title={'Desconectar'}>
        <IconButton onClick={disconnect}>
          <SensorsOffIcon color='error' />
        </IconButton>
      </Tooltip>
    </Stack>
  )
}

import { useRobotConnection } from '@/robot/contexts/useRobotConnection'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default function ConnectionInfo() {
  const { ipAddress, disconnect } = useRobotConnection()
  return (
    <Stack direction='row' alignItems='center' spacing={1}>
      <Typography fontWeight={500} variant='body1'>
        Endereço do robô:
      </Typography>
      <Typography variant='body2'>{ipAddress}</Typography>
      <Button size='small' onClick={disconnect} variant='outlined' color='error'>
        Desconectar
      </Button>
    </Stack>
  )
}

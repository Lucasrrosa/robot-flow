import FormTextField from '@/components/FormTextField'
import { useRobotConnection } from '@/robot/contexts/useRobotConnection'
import { useRobotStore } from '@/robot/robotStore'
import { zodResolver } from '@hookform/resolvers/zod'
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import { useForm } from 'react-hook-form'
import z from 'zod'

type Props = {
  onSubmit: (ip: string) => void
}

const ipValidationSchema = z.object({
  ip: z.ipv4('Insira um endereço IP válido'),
})

type IpValidation = z.infer<typeof ipValidationSchema>

export default function ConnectionForm({ onSubmit }: Props) {
  const { ipAddress } = useRobotConnection()
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<IpValidation>({
    resolver: zodResolver(ipValidationSchema),
    defaultValues: { ip: ipAddress || '' },
  })

  const robotConnectionStatus = useRobotStore((store) => store.robotConnectionStatus)
  return (
    <Stack direction='row' spacing={1}>
      <FormTextField
        control={control}
        name='ip'
        label='Endereço do robô'
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position='start'>
                <Button size='small'>Conectar</Button>
              </InputAdornment>
            ),
          },
        }}
      />
      <Tooltip title={'Conectar'}>
        <IconButton
          loading={robotConnectionStatus === 'connecting'}
          disabled={!isValid}
          onClick={handleSubmit(({ ip }) => onSubmit(ip))}
          color='primary'
        >
          <SettingsRemoteIcon color='primary' />
        </IconButton>
      </Tooltip>
    </Stack>
  )
}

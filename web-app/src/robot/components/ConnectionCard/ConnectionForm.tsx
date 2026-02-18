import FormTextField from '@/components/FormTextField'
import { useRobotStore } from '@/robot/robotStore'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
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
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<IpValidation>({
    resolver: zodResolver(ipValidationSchema),
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
      <Button
        size='small'
        loading={robotConnectionStatus === 'connecting'}
        disabled={!isValid}
        onClick={handleSubmit(({ ip }) => onSubmit(ip))}
        variant='text'
        color='primary'
      >
        {robotConnectionStatus === 'connecting' ? 'Conectando...' : 'Conectar'}
      </Button>
    </Stack>
  )
}

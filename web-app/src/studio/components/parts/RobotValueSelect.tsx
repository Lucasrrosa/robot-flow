import SelectField from '@/components/SelectField'
import type { RobotValues } from '@/robot/types/types'

type Props = {
  value: RobotValues | null
  onChange: (value: RobotValues | null) => void
}

export default function RobotValueSelect({ value, onChange }: Props) {
  return (
    <SelectField<RobotValues | null>
      value={value}
      onChange={onChange}
      options={[
        { value: null, label: 'Selecione uma opção' },
        { value: 'left', label: 'Velocidade roda esquerda' },
        { value: 'right', label: 'Velocidade roda direita' },
        { value: 'distanceCm', label: 'Distância em centímetros' },
        { value: 'accX', label: 'Aceleração X' },
        { value: 'accY', label: 'Aceleração Y' },
        { value: 'accZ', label: 'Aceleração Z' },
        { value: 'gyroX', label: 'Velocidade angular no eixo X' },
        { value: 'gyroY', label: 'Velocidade angular no eixo Y' },
        { value: 'gyroZ', label: 'Velocidade angular no eixo Z' },
        { value: 'angleX', label: 'Ângulo no eixo X' },
        { value: 'angleY', label: 'Ângulo no eixo Y' },
        { value: 'angleZ', label: 'Ângulo no eixo Z' },
        { value: 'tempC', label: 'Temperatura' },
      ]}
    />
  )
}

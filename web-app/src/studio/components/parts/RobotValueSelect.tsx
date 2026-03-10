import SelectField from '@/components/SelectField'
import type { RobotSensorValues } from '@/robot/types/types'

type Props = {
  value: RobotSensorValues | null
  onChange: (value: RobotSensorValues | null) => void
}

export default function RobotValueSelect({ value, onChange }: Props) {
  return (
    <SelectField<RobotSensorValues | null>
      value={value}
      onChange={onChange}
      options={[
        { value: null, label: 'Selecione uma opção' },
        { value: 'speed', label: 'Velocidade roda esquerda' },
        { value: 'distanceCm', label: 'Distância em centímetros' },
      ]}
    />
  )
}

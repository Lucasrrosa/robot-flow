import SelectField from '@/components/SelectField'
import type { DirectionType } from '@/studio/types/BlockTypes'

type Props = {
  value: DirectionType
  onChange: (value: DirectionType) => void
}

export default function RobotDirectionSelect({ value, onChange }: Props) {
  return (
    <SelectField<DirectionType>
      value={value}
      onChange={onChange}
      options={[
        { value: 'forward', label: 'Frente' },
        { value: 'backward', label: 'Trás' },
      ]}
    />
  )
}

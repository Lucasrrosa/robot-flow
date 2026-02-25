import SelectField from '@/components/SelectField'
import type { ConditionOperations } from '@/studio/types/BlockTypes'

type Props = {
  value: ConditionOperations
  onChange: (value: ConditionOperations) => void
}

export default function ConditionSelect({ value, onChange }: Props) {
  return (
    <SelectField
      value={value}
      onChange={onChange}
      options={[
        { value: 'equals', label: '=' },
        { value: 'lessThan', label: '<' },
        { value: 'greaterThan', label: '>' },
        { value: 'notEquals', label: '!=' },
      ]}
    />
  )
}

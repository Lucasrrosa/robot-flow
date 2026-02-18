import TextField, { type TextFieldProps } from '@mui/material/TextField'
import type { HTMLInputTypeAttribute, ReactNode } from 'react'
import { type Control, Controller, type FieldPath, type FieldValues } from 'react-hook-form'

type Props<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
  control: Control<TFieldValues>
  name: TName
  label: ReactNode
  type?: HTMLInputTypeAttribute
  rows?: number
} & Omit<TextFieldProps, 'variant'>

export default function FormTextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, label, type, fullWidth, multiline, rows }: Props<TFieldValues, TName>) {
  return (
    <Controller<TFieldValues>
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <TextField
          value={value || ''}
          onChange={onChange}
          onBlur={onBlur}
          error={!!error}
          helperText={error ? error.message : null}
          label={label}
          type={type}
          fullWidth={fullWidth}
          multiline={multiline}
          size='small'
          rows={rows}
        />
      )}
    />
  )
}

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import React, { type ReactNode } from 'react'

type Props<T> = {
  value: T
  onChange: (value: T) => void
  options: Array<{ label: ReactNode; value: T }>
}

export default function SelectField<T>({ value, onChange, options }: Props<T>) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (selectedValue: T) => {
    onChange(selectedValue)
    handleClose()
  }
  return (
    <>
      <Button variant='outlined' color='primary' size='small' aria-haspopup='true' aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
        {options.find((option) => option.value === value)?.label}
        <ArrowDropDownIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {options.map((option) => (
          <MenuItem key={`key-${option.value}`} onClick={() => handleSelect(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

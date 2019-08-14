import React from 'react'
import MaskedInput from 'react-text-mask'
import { FormControl, InputLabel } from '@material-ui/core'

export const PhoneInput = (props) => {
  const { labelText, ...other } = props
  return (
    <FormControl>
      <InputLabel htmlFor={props.id} className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled Mui-required Mui-required">
        Phone Number
      </InputLabel>
      <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
        <MaskedInput
        {...other}
        className="MuiInputBase-input MuiInput-input"
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask/>
      </div>

    </FormControl>
  )
}

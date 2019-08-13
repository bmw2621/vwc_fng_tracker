import React, { useEffect, useState } from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers'

export const DatePicker = (props) => {
  const [state, setState] = useState({value: props.value, changing: false});
  const inputRef: any = React.createRef()

  const customInputRender = (props, ref) => (<input type="hidden" ref={ ref } id={ props.id } value={state.value} onClick={ props.onClick } />)
  const CustomInput = React.forwardRef(customInputRender)

  const handleDateChange = (date) => {
    setState({value: date.format('YYYY-MM-DD'), changing: true})
  }

  useEffect(() => {
    if (state.changing) {
      inputRef.current.click()
      state.changing = false
    }
  })

  const handleChange = (event) => {
    console.log(event.target.value)
    props.changeHandler(event)
  }

  return (
    <span>
      <CustomInput value={state.value} id={props.id} onClick={ handleChange } ref={inputRef} />
      <KeyboardDatePicker
        required
        autoOk
        hiddenLabel={props.hiddenlabel}
        label={props.label}
        margin={props.margin}
        variant={props.variant}
        inputVariant={props.inputVariant}
        format={ props.format }
        value={ state.value }
        onChange={ date => handleDateChange(date)  }
        />
    </span>
  )
}



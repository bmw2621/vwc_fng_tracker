import React, { useEffect, useState } from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers'
import moment from 'moment'

export const DatePicker = (props) => {
  const [state, setState] = useState({value: props.value});

  const handleDateChange = (date) => {
    setState({value: date.format('YYYY-MM-DD')})
    const hid = document.getElementById(props.id)
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    props.changeHandler(event)
  }

  const styles= {
    display: 'inline',
    width: 0,
    height: 0,
    padding: 0,
    margin: 0,
    overflow: 'hidden'
  }

  return (
    <span>
      <div style={styles}>
        <input type="text" style={styles} value={state.value} id={props.id} onChange={ handleChange } />
      </div>
      <KeyboardDatePicker
        required
        autoOk
        hiddenLabel={props.hiddenLabel}
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



import React from 'react'
import { Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const FileInput = (props) => {
  const { onChange, label } = props

  return (
    <span>
      <input
        hidden
        id="buttonFile"
        type="file"
        accept=".csv"
        onChange={ onChange }
      />
      <label htmlFor="buttonFile">
        <Button
          variant="contained"
          size="small"
          color="primary"
          component="span">
          <FontAwesomeIcon icon="cloud-upload-alt" />&nbsp;
          { label }
        </Button>
      </label>
    </span>
  )
}

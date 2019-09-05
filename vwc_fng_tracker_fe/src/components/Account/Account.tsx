import React from 'react'
import { Chip } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Account = (props) => {
  const clickRef: any = React.createRef()
  const hiddenLinkStyles: any = {
    display: 'none'
  }


  const hiddenLinkRender = (props, ref) => {
    const url = () =>
      `http://${ props.accountType }.com/${ props.accountName }`
    return (
      <span style={ hiddenLinkStyles }>
        <a ref={ ref } href={ url() } target="_blank" rel="noopener noreferrer">
          { props.accountName }
        </a>
      </span>
    )
  }

  const HiddenLink =
    React.forwardRef(hiddenLinkRender)

  const handleClick = (event) => {
    event.preventDefault()
    clickRef.current.click()
  }

  return (
    <span>
      <HiddenLink
        ref={ clickRef }
        accountName={ props.accountName }
        accountType={ props.accountType }
      />
      <Chip
        label={ props.accountName}
        color="primary"
        size={ 'small' }
        icon={
          <FontAwesomeIcon icon={['fab', props.accountType]} size="lg" />
        }
        onDelete={ props.onDelete }
        onClick={ handleClick }
        clickable />
      &nbsp;
    </span>
  )
}

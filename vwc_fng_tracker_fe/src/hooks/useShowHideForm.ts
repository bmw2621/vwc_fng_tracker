export const useShowHideForm =
  (actions, state, blankState, type) => {
  const { setState } = actions

  const show = () => {
    setState(Object.assign(state, { editing: true } ))
  }

  const hide = () => {
    setState(Object.assign(state, { editing: false }))
  }

	const table = {
    edit: () => (
      state.editing &&
      state.uid !== blankState.uid
    ),
    new: () => (state.editing && state.uid === blankState.uid)
	}

  const visible = table[type]()

  return [
    show,
    hide,
    visible
  ]
}

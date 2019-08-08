import moment from 'moment'
export const useForm = (callback, state, model, actions) => {
  const values = state[model] || {}

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
      callback();
  };

  const handleChange = (event) => {
    // event.persist()
    const newVal = {}
    newVal[event.target.id] = event.target.value
    const newState  = {}
    newState[model] = (Object.assign(values, newVal))
    actions.setState(model, newVal)
  }

  const handleDateChange = (date, event) => {
    debugger
  }

  return {
    handleChange,
    handleDateChange,
    handleSubmit,
    values,
  }
};


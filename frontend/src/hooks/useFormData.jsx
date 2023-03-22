import { useState } from 'react';

function useFormValues() {
  const [values,  setValues ] = useState({});
  const [errors,  setErrors ] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const { value, name } = evt.target;

    setValues({
      ...values,
      [name]: value
    })

    setErrors({
      ...errors,
      [name]: evt.target.validationMessage
    })

    setIsValid(evt.target.closest('form').checkValidity());
  }

  function resetFormValues() {
    setValues({});
    setErrors({});
    setIsValid(false);
  }


  return { values, errors, isValid, handleChange, setValues, setIsValid, resetFormValues }
}

export default useFormValues;
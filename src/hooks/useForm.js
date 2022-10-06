import { useEffect } from "react";
import { useState } from "react";


const useForm = (initialValues, submit,validations) =>{

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false)

  useEffect(()=>{
    if(submitting){
      if(Object.keys(errors).length===0){
        submit(values)
      }
      setSubmitting(false);
      setTimeout(()=>{
        setErrors({})
      },3000)
    }
  },[errors])

  const handleChange = (e)=>{
    setValues({
      ...values,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(validations){
      setErrors(validations(values));
    }else{
      setErrors({})
    }
    setSubmitting(true);
  }

  return{
    handleChange,
    handleSubmit,
    values,
    errors,
    setValues
  }
}

export default useForm


// const person = {
//   name:'diego',
//   lastname:'fernandez'
// }

// Object.keys(person) --> ['name','lastname']
// Object.values(person) -->['diego','fernandez']

// {
  
// }
// Object.keys(errors) --> [] --> length = 0
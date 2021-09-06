import React from 'react'
import { useField } from 'formik';

export const CustomeTextInput = ({label, ...props})=>{
    const [field, meta] = useField(props);

    return(
        <div className="admin-update-item">
            <label htmlFor={field.name}>{label}</label>
            <input {...field} {...props} className="admin-update-input"/>
            {meta.touched && meta.error ? (<div>{meta.error}</div>): null}
        </div>
    )
}


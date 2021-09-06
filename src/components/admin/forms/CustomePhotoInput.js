import React from 'react'
import { useField } from 'formik';

export const CustomePhotoInput=({label, ...props})=>{
    const [field, meta] = useField(props);

    return(
        <div className='admin-update-upload'>
            <img src="https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg" className="admin-update-img" alt="xxx"/>
            <label htmlFor={props.id || props.name} className="admin-update-icon"><i className="fa fa-file"></i></label>
            <input {...field} {...props} style={{display: "none"}}/>
            {meta.touched && ''}
        </div>
    )
}

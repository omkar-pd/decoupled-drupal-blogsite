import React from 'react'
import "./css/Input.css"
export const Input = (props) => {
  return (
    <div>
    {props.label && <label htmlFor="input-field">{props.label}</label>}
    <input type={props.type}       
    value={props.value}
    name={props.name}
    className="form-control"
    placeholder={props.placeholder}
    onChange={props.onChange}/>
    </div>
  )
}

import React from "react";
import { Field } from "formik";
import FieldWrapper from "./FieldWrapper.styled";
import CustomErrorMessage from "./CustomErrorMessage";

const CustomField = ({...props}) => {
  return (
    <FieldWrapper>
      <Field name={props.name} placeholder={props.placeholder} type={props.type}/>
      <CustomErrorMessage {...props}/>
      <label>{props.label}</label>
    </FieldWrapper>
  );
};

export default CustomField;

import React from "react";
import { useField } from "formik";

const CustomErrorMessage = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      {meta.touched && meta.error ? (
        <label style={{color:"red"}}>{meta.error}</label>
      ) : null}
    </>
  );
};

export default CustomErrorMessage;

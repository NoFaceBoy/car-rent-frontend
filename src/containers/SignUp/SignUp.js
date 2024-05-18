import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PrimaryButton from "../../components/buttons/PrimaryButton.styled.js";
import SecondaryButton from "../../components/buttons/SecondaryButton.styled.js";
import { useNavigate } from "react-router-dom";
import ButtonWrapper from "../../components/ButtonWrapper/ButtonWrapper.styled";
import CustomField from "../../components/CustomField/CustomField";
import FormContainer from "../FormContainer.styled";
import { ToastContainer, toast } from 'react-toastify';
import {addUser} from "../../local_storage/localStorageLogic.js";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <FormContainer>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          rePassword: '',
        }}
        validationSchema={Yup.object({
          username: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required('Required'),
          email: Yup.string()
          .email('Invalid email format')
          .required('Required'),
          password: Yup.string()
          .min(6, "Must be at least 6 characters")
          .required('Required'),
          rePassword: Yup.string()
          .required('Required'),
        })}
        onSubmit={({username, email, password, rePassword}, {setSubmitting, resetForm}) => {
          setTimeout(() => {
            if (password !== rePassword) {
              toast("Passwords don`t match");
            }
            else {
              if (addUser({username, email, password})) {
                setSubmitting(false);
                resetForm();
                window.open('/', '_self');
              }
              else {
                toast("User already exists: Log In");
              }
            }
          }, 1000);
        }}
      >
        {props => (
          <Form>
            <CustomField type="text" name="username" placeholder="Username"/>
            <CustomField type="email" name="email" placeholder="Email"/>
            <CustomField type="password" name="password" placeholder="Password"/>
            <CustomField type="password" name="rePassword" placeholder="Retype password"/>
            <ButtonWrapper>
              <SecondaryButton onClick={() => {navigate(`/login`);}}>
                Log In
              </SecondaryButton>
              <PrimaryButton type="submit" htmlType="submit">
                Register
              </PrimaryButton>
            </ButtonWrapper>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default SignUp;

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
import {checkUser} from "../../local_storage/localStorageLogic.js";

const SignIn = () => {
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
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
          .email('Invalid email format')
          .required('Required'),
          password: Yup.string()
          .required('Required'),
        })}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          setTimeout(() => {
            if (checkUser(values)) {
              localStorage.setItem('loggedUserEmail', values.email);
              setSubmitting(false);
              resetForm();
              window.open('/', '_self');
            }
            else {
              toast("Incorrect email or password");
            }
          }, 1000);
        }}
      >
        {props => (
          <Form>
            <CustomField type="email" name="email" placeholder="Email"/>
            <CustomField type="password" name="password" placeholder="Password"/>
            <ButtonWrapper>
              <SecondaryButton onClick={() => {navigate(`/register`);}}>
                Register
              </SecondaryButton>
              <PrimaryButton type="submit" htmlType="submit">
                Log In
              </PrimaryButton>
            </ButtonWrapper>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default SignIn;

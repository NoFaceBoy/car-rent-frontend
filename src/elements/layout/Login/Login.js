import AuthContext from "data/AuthContext";
import { useFormik, yupToFormErrors } from "formik";
import { useContext, useState } from "react";
import { Col, Container, FloatingLabel, Row , Form, Button, Spinner, Alert} from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Login(){
    const navigate = useNavigate();

    const {checkLogin} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        }),
        onSubmit: async (value) => {
            setIsLoading(true);
            let check = await checkLogin({email: value.email, password: value.password});
            if(check === 200){
                navigate(-1, {replace:true});
            } else {
                formik.setFieldError('email','wrong email');
                formik.setFieldError('password', 'wrong password');
            }
            setIsLoading(false);
        }
    });
    let errorText = "";
    if (formik.submitCount !== 0 && !formik.isValid) {
        errorText = Object.values(formik.errors).reduce(((prev, val) => prev + val + ', '), '');

    }
    if (errorText.length > 1) {
        errorText = errorText.charAt(0).toUpperCase() + errorText.substring(1, errorText.length - 2);

    } else {
        errorText = "";
    }
    return (<Container as="main">
        <Row className="my-5 py-5 justify-content-center">
            <Col className="py-5 d-flex flex-column align-items-center">
            
                <h2 className="w-auto text-center mb-5">Log in</h2>
                <FloatingLabel label="Email" className="width-20 my-2">
                    <Form.Control placeholder="Email"   {...formik.getFieldProps("email")} type="email" isInvalid={formik.touched.email && formik.errors.email}/>

                </FloatingLabel>
                <FloatingLabel label="Password" className="width-20 my-2">
                    <Form.Control placeholder="Password"  {...formik.getFieldProps("password")} type="password" isInvalid={formik.touched.password && formik.errors.password}/>
                </FloatingLabel>
                <span>Don't have account? <Link to="/login/sign" replace>Register</Link></span>
                <div style={{ height: "5rem" }} className="d-flex align-items-center">
                    <Alert variant="danger" className="flex-grow-1" show={errorText !== ""}>{errorText}</Alert>
                </div>
                <Button className="width-20" onClick={formik.submitForm}>{(isLoading) ?<div className="position-relative"> <Spinner animation="border" size="sm"></Spinner></div>: <>Confirm</>}</Button>
            </Col>
        </Row>
    </Container>);
}
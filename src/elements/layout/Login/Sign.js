import AuthContext from "data/AuthContext";
import { useFormik } from "formik";
import { PhoneNumberUtil } from "google-libphonenumber";
import { useContext, useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";


export default function Sign() {
    const { registerUser } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const nameRegex = /^[a-zA-z]+$/;
    const cityRegex = /^[\w',-\\/\s]+$/;
    const phoneUtil = PhoneNumberUtil.getInstance();
    const formik = useFormik({
        initialValues: {
            "first name": "",
            "last name": "",
            email: "",
            city: "",
            "phone number": "",
            password: "",
            "repeat password": ""
        },
        validationSchema: Yup.object({
            "first name": Yup.string().matches(nameRegex, "first name contains invalid symbols").min(3).required(),
            "last name": Yup.string().matches(nameRegex, "last name contains invalid symbols").min(3).required(),
            email: Yup.string().email().required(),
            "phone number": Yup.string().test('phone-validation', (val) => {
                let result = false;
                try {
                    result = phoneUtil.isValidNumberForRegion(phoneUtil.parse(val, 'UA'), 'UA')

                } catch (a) { }
                return result;
            }).required(),
            city: Yup.string().matches(cityRegex, "adress contains invalid symbols").min(3).required(),
            password: Yup.string().min(8).required(),
            "repeat password": Yup.string().oneOf([Yup.ref("password"), null], 'passwords must match').required(),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            let res = await registerUser({ first_name: values["first name"], last_name: values["last name"], email: values.email, password: values.password, phone_number: values["phone number"], city: values.city });
            setIsLoading(false);
            if (res === 201) {
                navigate(-1, { replace: true });
            } else {
                formik.setFieldError('email', 'Email already in use');
            }
        }
    });
    let errorText = "";
    if (formik.submitCount !== 0 && !formik.isValid) {
        errorText = Object.values(formik.errors).reduce(((prev, val) => prev + val + ', '), '');

        if (errorText.length > 1) {
            errorText = errorText.charAt(0).toUpperCase() + errorText.substring(1, errorText.length - 2);

        } else {
            errorText = "";
        }
    }
    return (<Container as="main">
        <Row className="my-5 py-5 justify-content-center">
            <Col className="py-5 d-flex flex-column align-items-center">
                <h2 className="w-auto text-center mb-5">Register</h2>
                <FloatingLabel label="First name" className="width-20 my-2">
                    <Form.Control placeholder="First name"   {...formik.getFieldProps("first name")} isInvalid={formik.touched["first name"] && formik.errors["first name"]} />
                </FloatingLabel>
                <FloatingLabel label="Last name" className="width-20 my-2">
                    <Form.Control placeholder="Last name"   {...formik.getFieldProps("last name")} isInvalid={formik.touched["last name"] && formik.errors["last name"]} />
                </FloatingLabel>
                <FloatingLabel label="Email" className="width-20 my-2">
                    <Form.Control placeholder="Email"   {...formik.getFieldProps("email")} type="email" isInvalid={formik.touched.email && formik.errors.email} />
                </FloatingLabel>
                <FloatingLabel label="Phone number" className="width-20 my-2">
                    <Form.Control placeholder="Phone number" {...formik.getFieldProps('phone number')} isInvalid={formik.touched["phone number"] && formik.errors["phone number"]} />
                </FloatingLabel>
                <FloatingLabel label="City" className="width-20 my-2">
                    <Form.Control placeholder="City" {...formik.getFieldProps('city')} isInvalid={formik.touched.city && formik.errors.city} />
                </FloatingLabel>
                <FloatingLabel label="Password" className="width-20 my-2">
                    <Form.Control placeholder="Password"  {...formik.getFieldProps("password")} type="password" isInvalid={formik.touched.password && formik.errors.password} />
                </FloatingLabel>
                <FloatingLabel label="Repeat password" className="width-20 my-2">
                    <Form.Control placeholder="Repeat password"  {...formik.getFieldProps("repeat password")} type="password" isInvalid={formik.touched["repeat password"] && formik.errors["repeat password"]} />
                </FloatingLabel>
                <span>Have account? <Link to="/login" replace>Login</Link></span>
                <div style={{ height: "8rem" }} className="d-flex align-items-center">
                    <Alert variant="danger" className="flex-grow-1" show={errorText !== ""}>{errorText}</Alert>
                </div>
                <Button className="width-20 " onClick={formik.submitForm}>{(isLoading) ? <div className="position-relative"> <Spinner animation="border" size="sm"></Spinner></div> : <>Register</>}</Button>
            </Col>
        </Row>
    </Container>);
}
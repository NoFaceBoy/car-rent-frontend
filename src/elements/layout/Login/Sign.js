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
    const [otherError, setOtherError] = useState("");
    const navigate = useNavigate();
    const nameRegex = /^[a-zA-z]+$/;
    const cityRegex = /^[\w',-\\/\s]+$/;
    const phoneUtil = PhoneNumberUtil.getInstance();
    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            email: "",
            city: "",
            phoneNumber: "",
            password: "",
            passwordCopy: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().matches(nameRegex, "first name contains invalid symbols").min(3).required(),
            surname: Yup.string().matches(nameRegex, "last name contains invalid symbols").min(3).default(null),
            email: Yup.string().email().required(),
            phoneNumber: Yup.string().test('phone-validation', (val) => {
                let result = false;
                try {
                    result = phoneUtil.isValidNumberForRegion(phoneUtil.parse(val, 'UA'), 'UA')

                } catch (a) { }
                return result;
            }).required(),
            city: Yup.string().matches(cityRegex, "adress contains invalid symbols").min(3).required(),
            password: Yup.string().min(8).required(),
            passwordCopy: Yup.string().oneOf([Yup.ref("password"), null]).required(),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            let res = await registerUser({ first_name: values.name, last_name: values.surname, email: values.email, password: values.password, phone_number: values.phoneNumber, city: values.city });
            setIsLoading(false);
            if (res === 201) {
                navigate(-1, { replace: true });
            } else {
                setOtherError('Wrong parameters');
                formik.setFieldError('email', 'Wrong');
                formik.setFieldError('password', 'wrong');
                formik.setFieldError('name', 'wrong');
                formik.setFieldError('surname', 'wrong');
                formik.setFieldError('phoneNumber', 'wrong');
                formik.setFieldError('city', 'wrong');
                formik.setFieldError('passwordCopy', 'wrong');
            }
        }
    });
    return (<Container as="main">
        <Row className="my-5 py-5 justify-content-center">
            <Col className="py-5 flex-grow-0">
                <h2 className="w-auto text-center mb-5">Register</h2>
                <FloatingLabel label="First name" className="width-20 my-2">
                    <Form.Control placeholder="First name"   {...formik.getFieldProps("name")} isInvalid={formik.touched.name && formik.errors.name} />
                </FloatingLabel>
                <FloatingLabel label="Last name" className="width-20 my-2">
                    <Form.Control placeholder="Last name"   {...formik.getFieldProps("surname")} isInvalid={formik.touched.surname && formik.errors.surname} />
                </FloatingLabel>
                <FloatingLabel label="Email" className="width-20 my-2">
                    <Form.Control placeholder="Email"   {...formik.getFieldProps("email")} type="email" isInvalid={formik.touched.email && formik.errors.email} />
                </FloatingLabel>
                <FloatingLabel label="Phone number" className="width-20 my-2">
                    <Form.Control placeholder="Phone number" {...formik.getFieldProps('phoneNumber')} isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber} />
                </FloatingLabel>
                <FloatingLabel label="City" className="width-20 my-2">
                    <Form.Control placeholder="City" {...formik.getFieldProps('city')} isInvalid={formik.touched.city && formik.errors.city} />
                </FloatingLabel>
                <FloatingLabel label="Password" className="width-20 my-2">
                    <Form.Control placeholder="Password"  {...formik.getFieldProps("password")} type="password" isInvalid={formik.touched.password && formik.errors.password} />
                </FloatingLabel>
                <FloatingLabel label="Repeat password" className="width-20 my-2">
                    <Form.Control placeholder="Repeat password"  {...formik.getFieldProps("passwordCopy")} type="password" isInvalid={formik.touched.passwordCopy && formik.errors.passwordCopy} />
                </FloatingLabel>
                <span>Have account? <Link to="/login" replace>Login</Link></span>
                <div style={{ height: "5rem" }} className="d-flex align-items-center">
                    <Alert variant="danger" className="flex-grow-1" show={otherError !== ""}>{otherError}</Alert>
                </div>
                <Button className="width-20 " onClick={formik.submitForm}>{(isLoading) ? <div className="position-relative"> <Spinner animation="border" size="sm"></Spinner></div> : <>Register</>}</Button>
            </Col>
        </Row>
    </Container>);
}
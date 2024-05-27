import { useFormik } from "formik";
import { Alert, Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";

import * as Yup from "yup";

import './Payment.scss'
import { useNavigate } from "react-router-dom";


function Payment({ callback }) {
    const nav = useNavigate();
    const formik = useFormik({

        initialValues: {
            "card number": '',
            "expiration": '',
            "CVC": '',
        },
        validationSchema: Yup.object({
            "card number": Yup.string().length(16).matches(/^\d{16}$/, 'incorrect card number').required(),
            "expiration": Yup.string().matches(/^\d\d\/\d\d$/, 'incorrect expiration date').required(),
            "CVC": Yup.string().matches(/^\d\d\d$/, 'incorrect CVC code').required(),
        }),
        onSubmit: () => { nav('/reservation/success') }
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
    return <Container as="main" className="d-flex flex-column align-items-center">
        <h2>Payment details</h2>
        <Col className="width-30">
            <Row>
                <FloatingLabel label="Card number" className="my-3 mt-5">
                    <Form.Control placeholder="Card number"
                        {...formik.getFieldProps('card number')} isInvalid={formik.touched["card number"] && formik.errors["card number"]} />
                </FloatingLabel>

            </Row>
            <Row className="my-3 justify-content-between">
                <FloatingLabel label="Expiration" className="width-17">
                    <Form.Control label="Expiration date" placeholder="Expiration"
                        {...formik.getFieldProps('expiration')} isInvalid={formik.touched["expiration"] && formik.errors["expiration"]} />
                </FloatingLabel>
                <FloatingLabel label="CVC" className="width-17">
                    <Form.Control label="CVC" placeholder="CVC"
                        {...formik.getFieldProps('CVC')} isInvalid={formik.touched["CVC"] && formik.errors["CVC"]} />
                </FloatingLabel>

            </Row>
            <div style={{ height: "10rem" }} className="d-flex align-items-center">

                <Alert variant="danger" className="flex-grow-1" show={errorText !== ""}>{errorText}</Alert>
            </div>
            <Row className="my-4 justify-content-between">
                <Button variant="outline-primary" className="width-12" onClick={() => nav(-1)}>Go back</Button>
                <Button variant="primary" className="width-12" onClick={formik.submitForm}>
                    Continue

                </Button>
            </Row>
        </Col>

    </Container>
}


export default Payment;
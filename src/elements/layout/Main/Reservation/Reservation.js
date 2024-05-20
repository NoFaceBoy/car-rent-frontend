import { clearProducts } from "data/redux/slice";
import { useFormik, useFormikContext } from "formik";
import { PhoneNumberUtil } from "google-libphonenumber";
import { Alert, Button, Col, Container, FloatingLabel, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import './Reservation.scss';
import { useContext, useState } from "react";
import AuthContext from "data/AuthContext";
import { VscAccount } from "react-icons/vsc";
import DataContext from "data/DataContext";
import CarTile from "./CarTile/CarTile";
import ReservationContext from "data/ReservationContext";

export default function Reservation() {
    const nav = useNavigate();

    const { user } = useContext(AuthContext);
    const { chosenCar } = useContext(DataContext);
    const { putReservation } = useContext(ReservationContext);
    const [errorText, setErrorText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({

        initialValues: {
            date_from: '',
            date_till: '',
        },
        validationSchema: Yup.object({
            date_from: Yup.date().required(),
            date_till: Yup.date().required(),
        }),
        onSubmit: async () => {
            if (user === null) {
                setErrorText("You should be logged in");
                return;
            }
            if (chosenCar === null) {
                setErrorText("You should choose a car");
                return;
            }
            setIsLoading(true);
            const days = getDays();
            if (days === 0) {
                formik.setFieldError('date_from', 'Wrong');
                formik.setFieldError('date_till', 'Wrong');
                setErrorText("Wrong time range");
                return;
            }
            let res = await putReservation(chosenCar.id, formik.values.date_from, formik.values.date_till);

            if (res === 201) {
                nav("/cart/success");
                return;
            }
            if (res === 402) {
                setErrorText("Couldn't authenticate")
            } else if (res == 400) {
                setErrorText("Couldn't put reservation");
            } else {
                setErrorText("Something really bad happened");
            }
            setIsLoading(false);
        },
        enableReinitialize: true,
    });

    const getDays = () => {
        let diff = new Date(formik.values.date_till) - new Date(formik.values.date_from);
        diff = diff / 1000 / 60 / 60 / 24;
        diff = Math.round(diff);
        if (diff < 1 || isNaN(diff) || new Date(formik.values.date_from) < Date.now()) {
            diff = 0;
        }
        return diff;
    };

    return (
        <Container as={'main'} className="flex-grow-0 justify-content-center">
            <h2 className="text-center">Reservation</h2>
            <Row className="justify-content-center my-3">
                <div className="width-40 d-flex align-items-center">
                    <VscAccount style={{ 'width': '2.5rem', 'height': '2.5rem' }} className="me-2" />
                    {(user === null) ?
                        <>
                            <div className="flex-grow-1">To reserve you should be registered</div>
                            <Button className="ml-auto" onClick={() => nav('/login')}>Login</Button>
                        </>
                        :
                        <span>Registered as {`${user.first_name} ${user.last_name}`}</span>}
                </div>
            </Row>
            <Row className="justify-content-center">
                <Col className="flex-grow-0">
                    <h4>Pick a date</h4>
                    <FloatingLabel label="Date from" className="width-40 mb-3">
                        <Form.Control min={Date.now().toString()} max={formik.values.date_till} type="date" placeholder="Date from" {...formik.getFieldProps('date_from')} isInvalid={formik.touched.date_from && formik.errors.date_from} />
                    </FloatingLabel>
                    <FloatingLabel label="Date until" className="width-40">
                        <Form.Control min={formik.values.date_from} type="date" placeholder="Date until" {...formik.getFieldProps('date_till')} isInvalid={formik.touched.date_till && formik.errors.date_till} />
                    </FloatingLabel>

                </Col>
            </Row>
            <Row className="justify-content-center">
                <div className="justify-content-center width-40 my-4">
                    <h4>A car</h4>
                    {(chosenCar === null) ?
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1">No car chosen</div>
                            <Button onClick={() => nav('/catalog')}>Go to catalog</Button>

                        </div>

                        : <CarTile data={{ car: chosenCar, days: getDays() }}></CarTile>}
                </div>
            </Row>

            <div style={{ height: "10rem" }} className="d-flex align-items-center">

                <Alert variant="danger" className="flex-grow-1" show={errorText !== ""}>{errorText}</Alert>
            </div>

            <Row className="my-4 justify-content-between">
                <Button variant="outline-primary" className="width-12" onClick={() => nav(-1)}>Go back</Button>
                <Button variant="primary" className="width-12" active={user !== null} onClick={formik.submitForm}>
                    {(isLoading) ?
                        <div className="position-relative"> <Spinner animation="border" size="sm"></Spinner></div>
                        : <>Continue</>
                    }
                </Button>
            </Row>
        </Container>
    );
}
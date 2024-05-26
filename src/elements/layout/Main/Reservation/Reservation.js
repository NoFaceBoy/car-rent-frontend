import { useFormik } from "formik";
import { Alert, Button, Col, Container, FloatingLabel, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import './Reservation.scss';
import { useContext, useState } from "react";
import AuthContext from "data/AuthContext";
import { VscAccount } from "react-icons/vsc";
import CarTile from "./CarTile/CarTile";
import ReservationContext from "data/ReservationContext";
import CarContext from "data/CarContext";

export default function Reservation() {
    const nav = useNavigate();

    const { user } = useContext(AuthContext);
    const { chosenCar } = useContext(CarContext);
    const { putReservation } = useContext(ReservationContext);
    const [otherError, setErrorText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({

        initialValues: {
            "date from": '',
            "date until": '',
        },
        validationSchema: Yup.object({
            "date from": Yup.date().test('actuallity', 'date from should be after today', (val) => {
                if (Date.parse(val) > Date.now()) {
                    return true;
                }
                return false;
            }).required(),
            "date until": Yup.date().required(),
        }),
        onSubmit: async () => {
            if (user === null) {
                setErrorText("you should be logged in");
                return;
            }
            if (chosenCar === null) {
                setErrorText("you should choose a car");
                return;
            }
            setIsLoading(true);
            const days = getDays();
            if (days === 0) {
                formik.setFieldError('date from', 'wrong date from');
                formik.setFieldError('date until', 'Wrong date until');
                return;
            }
            let res = await putReservation(chosenCar.id, formik.values["date from"], formik.values["date until"]);

            if (res === 201) {
                nav("/cart/success");
                return;
            }
            if (res === 402) {
                setErrorText("couldn't authenticate with user")
            } else if (res === 400) {
                setErrorText("couldn't put reservation");
            } else {
                setErrorText("something really bad happened");
            }
            setIsLoading(false);
        },
        enableReinitialize: true,
    });

    const getDays = () => {
        let diff = Date.parse(formik.values["date until"]) - Date.parse(formik.values["date from"]);
        diff = diff / 1000 / 60 / 60 / 24;
        diff = Math.round(diff);
        if (Date.parse(formik.values["date from"]) < Date.now()) {
            diff = 0;
        }
        if (isNaN(diff)) {
            diff = 0;
        }
        if (diff < 1) {
            diff = 0;
        }
        return diff;
    };
    let errorText = otherError;
    if (formik.submitCount !== 0 && !formik.isValid) {
        errorText = Object.values(formik.errors).reduce(((prev, val) => prev + val + ', '), '');

    }
    if (errorText.length > 1) {
        errorText = errorText.charAt(0).toUpperCase() + errorText.substring(1, errorText.length - 2);

    } else {
        errorText = "";
    }

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
                        <Form.Control min={new Date(Date.now()).toDateString()} max={formik.values["date until"]}
                            type="date" placeholder="Date from" {...formik.getFieldProps('date from')}
                            isInvalid={formik.touched["date from"] && formik.errors["date from"]} />
                    </FloatingLabel>
                    <FloatingLabel label="Date until" className="width-40">
                        <Form.Control min={formik.values["date from"]} type="date" placeholder="Date until"
                            {...formik.getFieldProps('date until')} isInvalid={formik.touched["date until"] && formik.errors["date until"]} />
                    </FloatingLabel>

                </Col>
            </Row>
            <Row className="justify-content-center">
                <div className="justify-content-center width-40 my-4">
                    <h4>A car</h4>
                    {(chosenCar === null) ?
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1">No car chosen</div>
                            <Button onClick={() => nav('/cars')}>Go to car listing</Button>

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
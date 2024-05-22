import ReservationContext from "data/ReservationContext";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Button, Col, FloatingLabel, Row, Spinner, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function AdminReservationTile({ data }) {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const { updateReservation } = useContext(ReservationContext);

    const loadingDecor = (func) => {
        return async (props) => {
            setIsLoading(true);
            await func(props);
            setIsLoading(false);
        }
    }

    const getFuncBtn = (name, action) => {
        return <Button variant="secondary" onClick={action} className="width-20 m-2">{name}</Button>;
    }

    const onCancel = async () => {
        await updateReservation({ reservation_id: data.id, action: 'cancel' });
    }

    const onConfirm = async () => {
        await updateReservation({ reservation_id: data.id, action: 'confirm' });

    }
    const onTake = async () => {
        await updateReservation({ reservation_id: data.id, action: 'confirm-take' });

    };
    const onReturn = async () => {
        await updateReservation({ reservation_id: data.id, action: 'confirm-return' });

    };
    const onCheck = async () => {
        await updateReservation({ reservation_id: data.id, action: 'confirm-check', data: { fines: Number.parseFloat(formik.values.fines) } });
    };

    const formik = useFormik({
        initialValues: { fines: "", },
        validationSchema: Yup.object({
            fines: Yup.number().positive().required(),
        }),
        onSubmit: onCheck,
    })

    const canclBtn = getFuncBtn('Cancel reservation', loadingDecor(onCancel));
    const confBtn = getFuncBtn('Confirm reservation', loadingDecor(onConfirm));
    const confTakeBtn = getFuncBtn('Confirm take', loadingDecor(onTake));
    const confRetBtn = getFuncBtn('Confirm return', loadingDecor(onReturn));

    return (
        <>
            <Row className="border border-primary rounded p-2  my-3">
                <Row className="flex-basis-0 justify-content-between align-items-center">
                    <Col xs={3} onClick={() => navigate(`/cars/${data.car.id}`)} style={{ "cursor": "pointer" }}>
                        <img alt={`${data.car.brand} ${data.car.model}`} src={data.car.image} style={{ width: "6rem", height: "6rem", objectFit: "cover", boxSizing: "content-box" }} />
                        <span className="mx-2 fw-semibold fs-4">
                            {`${data.car.brand} ${data.car.model}`}
                        </span>
                    </Col>
                    <Col xs={2} className="flex-grow-0">
                        <Row>
                            <Col>
                                <div>From</div>
                                <div>{`${new Date(data.start_date).toLocaleDateString()}`}</div>
                            </Col>
                            <Col>
                                <div>Till</div>
                                <div>{`${new Date(data.end_date).toLocaleDateString()}`}</div>

                            </Col>

                        </Row>
                    </Col>
                    <Col xs={3}>
                        <span className=" fs-7">{`Status: ${data.status.toLowerCase().replace('_', " ")}`}</span>

                    </Col>
                    <Col xs={3} className="d-flex justify-content-end align-items-center">
                        <div className="fw-semibold fs-5">{`Money status: $${data.money_status}`}</div>
                        <div className="fw-semibold fs-6">{`Revenue: $${data.expected_profit}`}</div>
                    </Col>
                    <Col xs={1}>
                        {(isLoading) && <Spinner animation="border" />
                        }
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col xs={3}>
                        <h6>User:</h6>
                        <div>{`${data.user.first_name} ${data.user.last_name}`}</div>
                        <div>{`Phone number: ${data.user.phone_number}`}</div>
                        <div>{`City: ${data.user.city}`}</div>
                        <div>{`Email: ${data.user.email}`}</div>
                    </Col>
                    <Col>
                        {(data.status === 'WAITING_CONFIRMATION' || data.status === 'CONFIRMED') &&  canclBtn}
                        {(data.status === 'WAITING_CONFIRMATION') && confBtn}
                        {(data.status === 'CONFIRMED') && confTakeBtn}
                        {(data.status === 'IS_USED') && confRetBtn}
                        {(data.status === 'WAITING_CHECK') &&
                            <div className="width-20 m-2">
                                <FloatingLabel label="Fines" className="my-2">
                                    <Form.Control placeholder="Fines"   {...formik.getFieldProps("fines")} isInvalid={formik.touched.fines && formik.errors.fines} />
                                </FloatingLabel>
                                <Button variant="secondary" onClick={formik.submitForm} className="width-20">Confirm check</Button>
                            </div>
                        }


                    </Col>
                </Row>
            </Row>
        </>
    );
}
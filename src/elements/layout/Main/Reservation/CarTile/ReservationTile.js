import ReservationContext from "data/ReservationContext";
import { useContext, useState } from "react";
import { Button, CloseButton, Col, Modal, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ReservationTile({ data }) {
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const {updateReservation} = useContext(ReservationContext);

    const onCancelClick = () => {
        setShowModal(true);
    };

    const onCancelCancel = () => {
        setShowModal(false);
    }

    const onCancel = async () => {
        setIsLoading(true);
        setShowModal(false);
        await updateReservation({reservation_id: data.id, action: 'cancel'});
        setIsLoading(false);
    }
    const onPayment = async () => {
        setIsLoading(true);
        await updateReservation({reservation_id: data.id, action: 'final-payment'});
        setIsLoading(false);
    }

    return (
        <>
            <Row className="border border-primary rounded p-2 flex-basis-0 justify-content-between my-3 align-items-center">
                <Col xs={3} onClick={() => navigate(`/catalog/${data.car.id}`)} style={{ "cursor": "pointer" }}>
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
                <Col xs={2}>
                    <span className=" fs-7">{`Status: ${data.status.toLowerCase().replace('_', " ")}`}</span>

                </Col>
                <Col xs={3} className="d-flex justify-content-end align-items-center">
                    <span className="fw-semibold fs-5">{`${(data.money_status > 0) ? 'We should return' : (data.money_status !== 0) ? 'You should pay' : ''} $${Math.abs(data.money_status)}`}</span>
                </Col>
                <Col xs={2}>
                    {(isLoading) ? <Spinner animation="border" /> :
                        ((data.status === 'WAITING_CONFIRMATION' || data.status === 'CONFIRMED') &&
                        <CloseButton onClick={onCancelClick} />) || 
                        ((data.status === 'WAITING_PAYMENT') &&
                        <Button onClick={onPayment}>Pay rest</Button>)
                    }
                </Col>
            </Row>
            <Modal show={showModal} onHide={onCancelCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you really want to cancel?</Modal.Title>
                </Modal.Header>
                <Modal.Body>All money won't be refunded</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button variant="secondary" onClick={onCancelCancel}>
                        Go back
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    );
}
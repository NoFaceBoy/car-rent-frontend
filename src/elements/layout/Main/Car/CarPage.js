import TextWithGap from "elements/components/TextWithGap/TextWithGap";
import { useContext, useEffect, useState } from "react";
import { Col, Row, Container, Button, Spinner, Modal } from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";

import './CarPage.scss';
import CarContext from "data/CarContext";
import AuthContext from "data/AuthContext";

export default function CarPage() {
    const id = useLoaderData();
    const { getCarById, setChosenCar, deleteCar } = useContext(CarContext);
    const nav = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [car, setCar] = useState(undefined);
    const [showModal, setShowModal] = useState(false);
    const { user } = useContext(AuthContext);

    const load = () => {
        getCarById(id).then((val) => {
            setCar(val);
        })
    };
    useEffect(load, [id, getCarById]);

    const onReservationClick = () => {
        if (car !== undefined) {
            setChosenCar(car);
            nav('/reservation');
        }
    };

    const onDelete = async () => {
        setShowModal(false);
        setLoading(true);
        await deleteCar(id);
        setLoading(false);
        nav('/cars');
    }

    let classesForGap = "border-dotted mx-4";
    return (
        <Container className="my-2">
            {(!car)
                ? <Col className='d-flex justify-content-center'><Spinner animation='border' /></Col>
                : <><Row className="mb-5">
                    <Col>
                        <img alt="" src={car.image} className="d-block w-100" style={{ objectFit: "cover", height: 500 }} />
                    </Col>
                </Row>
                    <h4 className="text-center text-secondary">Characteristics</h4>
                    <Row className="mb-4">
                        <Col className="me-5">
                            <TextWithGap start={"Brand"} end={car.brand} classesForGap={classesForGap} />
                            <TextWithGap start={"Model"} end={car.model} classesForGap={classesForGap} />
                        </Col>
                        <Col>
                            <TextWithGap start={"State"} end={car.status.toLowerCase()} classesForGap={classesForGap} />
                            <TextWithGap start={"Mode"} end={car.mode.toLowerCase()} classesForGap={classesForGap} />
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col className="d-flex align-items-center">
                            <span className="fw-semibold fs-5">{`Price: $ ${car.price}`}</span>
                        </Col>

                        <Col className="d-flex justify-content-end">
                            <Button variant="outline-primary width-form me-4" onClick={() => nav(-1)}>Go back</Button>
                            <Button variant="primary width-form" onClick={onReservationClick}>Reserve</Button>
                        </Col>

                    </Row>
                    {(user !== null && user.privilege_level === 'PRIVILEDGED') &&
                        <>
                            <Row>
                                <Button className="width-form mx-2" onClick={() => nav(`/cars/${id}/edit`)}>Edit</Button>
                                <Button variant="danger" className="width-form mx-2" onClick={() => setShowModal(true)}>
                                    {(isLoading)
                                        ? <div className="position-relative"> <Spinner animation="border" size="sm"></Spinner></div>
                                        : <>Delete</>
                                    }
                                </Button>
                            </Row>
                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Are you really want to delete this car?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>{'It doesn\'t destroy it in reality(('}</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={onDelete}>
                                        Delete
                                    </Button>
                                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                                        Go back
                                    </Button>
                                </Modal.Footer>

                            </Modal>
                        </>
                    }
                </>
            }
        </Container>
    );
}
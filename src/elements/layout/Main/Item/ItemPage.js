import DataContext from "data/DataContext";
import TextWithGap from "elements/components/TextWithGap/TextWithGap";
import { useContext, useEffect, useState } from "react";
import { Col, Row, Carousel, Container, Button, Spinner, Alert } from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";

import './ItemPage.scss';

export default function ItemPage() {
    const id = useLoaderData();
    const { loadAllById, setChosenCar } = useContext(DataContext);
    const nav = useNavigate();
    const [car, setCar] = useState(undefined);

    const load = () => {
        loadAllById(id).then((val) => {
            setCar(val);
        })
    };
    useEffect(load, [id, loadAllById]);

    const onReservationClick = () => {
        if (car !== undefined) {
            setChosenCar(car);
            nav('/reservation');
        }
    };

    let classesForGap = "border-dotted mx-4";
    return (
        <Container className="my-2">
            {(!car)
                ? <Col className='d-flex justify-content-center'><Spinner animation='border' /></Col>
                : <><Row className="mb-5">
                    <Col>
                        <img src={car.image} className="d-block w-100" style={{ objectFit: "cover", height: 500 }} />
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

                    </Row></>
            }
        </Container>
    );
}
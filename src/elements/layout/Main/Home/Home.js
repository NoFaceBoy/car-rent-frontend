import React from 'react';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Home.scss"

function Home() {
    const carClasses = [
        {
            title: 'Standard',
            price: '$27',
            image: "https://cdn.imagin.studio/getImage?customer=gbxlcr-vehicle-management-ltd&capVehicleType=car&capId=83059&width=1920&randompaint=true"
        },
        {
            title: 'Business',
            price: '$66',
            image: "https://cdn.imagin.studio/getImage?customer=gbxlcr-vehicle-management-ltd&capVehicleType=car&capId=97321&width=1920&randompaint=true"
        },
        {
            title: 'Sport',
            price: '$255',
            image: "https://cdn.imagin.studio/getImage?customer=gbxlcr-vehicle-management-ltd&capVehicleType=car&capId=88155&width=1920&randompaint=true"
        },
        {
            title: 'Vintage',
            price: '$180',
            image: "https://cdn.imagin.studio/getImage?customer=gbxlcr-vehicle-management-ltd&capVehicleType=car&capId=100721&width=1920&randompaint=true"
        }
    ];

    return (
        <Container as="main" className='justify-content-center d-flex flex-column align-items-center'>
            <div className="image-container">
                <img className="w-100" src="https://narscars.com.ua/content/documents/1/42/images/car-rental-in-lviv.jpg"/>
                <div className="text-overlay flex-column">
                    <h1 className="fw-bold">Car rental in Lviv</h1>
                    <h5 className="w-50 m-3"> Discover Ukraine with Wind Cars! Find your perfect rental car at our website.</h5>
                </div>
            </div>
            <h1 className='my-4'>Car classes</h1>
            <Row className="justify-content-center d-flex">
                {carClasses.map((car, index) => (
                    <Col key={index} lg={3} md={6} sm={12} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={car.image} alt={car.title} />
                            <Card.Body className="text-center">
                                <Card.Title>{car.title}</Card.Title>
                                <Card.Text>from {car.price} / per day</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Link to="/cars">
                <Button variant="primary" className="width-20 my-2 p-2">View</Button>
            </Link>
        </Container>
    );
}

export default Home;

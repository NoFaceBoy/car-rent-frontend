import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SuccessImg from "./SuccessImg";


export default function Success() {
    const nav = useNavigate();
    

    return (
        <Container as="main" className="d-flex flex-column align-items-center py-4">
            <SuccessImg/>
            <span className="fs-3 fw-bold">Success!</span>
            <p className="fs-5 text-center">
                Your payment was confirmed
            </p>
            <Button variant="primary" className="width-12 my-5" onClick={() => nav('/reservation/history')}>Go to your reservations</Button>
        </Container>
    );
}
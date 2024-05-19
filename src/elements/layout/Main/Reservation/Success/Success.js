import { useFormik } from "formik";
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
                Your order was sent to processing!<br/>
                Check your email box for further information.
            </p>
            <Button variant="primary" className="width-12 my-5" onClick={() => nav('/catalog')}>Go to catalog</Button>
        </Container>
    );
}
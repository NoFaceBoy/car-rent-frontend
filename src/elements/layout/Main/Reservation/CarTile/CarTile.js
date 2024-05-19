import { CloseButton, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CarTile({ data }) {

    const navigate = useNavigate();
    return (
        <Row className="border border-primary rounded p-2 flex-basis-0 justify-content-between my-3">
            <Col xs={7} onClick={()=> navigate(`/catalog/${data.car.id}`)} style={{"cursor": "pointer"}}>
                <img alt={`${data.car.brand} ${data.car.model}`} src={data.car.imageUrls[0]} style={{ width: "6rem", height: "6rem", objectFit: "cover", boxSizing: "content-box" }} />
                <span className="mx-2 fw-semibold fs-4">
                    {`${data.car.brand} ${data.car.model}`}
                </span>
            </Col>
            <Col xs={5} className="d-flex justify-content-end align-items-center">
                {/* <AmountInput state={[amount, setAmount]} range={[1, data.product.amountAvalaible]} /> */}
                <span className="fw-semibold fs-5">{`$${data.car.price * data.days} + $300`}</span>
            </Col>
        </Row>
    );
}
import { getListOfProducts } from "data/redux/slice";
import { useMemo } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CarTile from "../Reservation/CarTile/CarTile";

export default function Cart() {
    let nav = useNavigate();

    const inCart = useSelector(getListOfProducts);

    const totalPrice = useMemo(() => inCart.reduce((prev, val) => prev += val.amount * val.product.price, 0), [inCart]);

    const goToCatalog = () => nav("/catalog");

    return (<Container as="main" className="py-4">
        <h3 className="text-center my-4 fw-semibold">Shopping cart</h3>
        {(inCart.length === 0)
            ? <>
                <p className="text-center text-secondary">Your shopping cart is empty. You could go to the catalog and choose what you need</p>
                <Row className="justify-content-center">
                    <Button variant="primary" className="width-12" onClick={goToCatalog}>Go to the catalog</Button>
                </Row>
            </>
            : <>
                {inCart.map((val) => <CarTile key={val.id} data={val} />)}
                <div className="d-flex justify-content-end my-4 fs-5 fw-semibold">
                    Total:
                    <div style={{ width: "5rem" }} />
                    {`$${totalPrice}`}
                </div>
                <Row>
                    <Button variant="outline-primary" className="width-12" onClick={goToCatalog}>Back to catalog</Button>
                    <Col className="flex-grow-1" />
                    <Button variant="primary" className="width-12" onClick={() => nav("/cart/checkout")}>Buy</Button>
                </Row>
            </>


        }
    </Container>
    );
}
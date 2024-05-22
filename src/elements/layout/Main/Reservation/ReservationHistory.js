import { Col, Container, Spinner } from "react-bootstrap";

import { useContext, useEffect, useState } from "react";
import ReservationContext from "data/ReservationContext";
import ReservationTile from "./CarTile/ReservationTile";
import AuthContext from "data/AuthContext";
import AdminReservationTile from "./CarTile/AdminReservationTile";

export default function ReservationHistory() {
    const { reservations, getReservationByUser } = useContext(ReservationContext);
    const [isLoading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);


    function loadMore() {

        setLoading(true);
        getReservationByUser().then(() => {
            setLoading(false);
        });
    }
    useEffect(loadMore, []);

    return (
        <Container as={'main'} className="flex-grow-0 justify-content-center p-5">
            {(isLoading) ?
                <Col className='d-flex justify-content-center'><Spinner animation='border' /></Col>
                : (reservations === null || reservations.length === 0)
                    ? <p className="text-center text-secondary">You haven't reserved any car yet</p>
                    : reservations.map(val => {
                        if (user !== null && user.privilege_level === "PRIVILEDGED") {
                            return <AdminReservationTile key={val.id} data={val} />;
                        }
                        return <ReservationTile key={val.id} data={val} />;
                    })
            }

        </Container>
    );
}
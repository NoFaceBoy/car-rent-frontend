import { useContext, useEffect, useState } from "react";
import { Col, Spinner } from "react-bootstrap";
import CarCard from "./CarCard/CarCard";
import CarContext from "data/CarContext";

function Cars() {

    const { cars, getFilteredCars } = useContext(CarContext);

    const [isLoading, setLoading] = useState(false);


    function loadMore() {

        if (cars.length === 0) {
            setLoading(true);
            getFilteredCars().then(() => setLoading(false));
        }
    }
    useEffect(loadMore, []);
    return (
        <section className="d-flex justify-content-center flex-wrap p-5">
            {(isLoading) ? <Col className='d-flex justify-content-center'><Spinner animation='border' /></Col> : cars.map(val => <CarCard key={val.id} data={val} />)}
        </section>
    );
}


export default Cars;
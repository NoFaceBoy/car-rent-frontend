import DataContext from "data/DataContext";
import { useContext, useEffect, useState } from "react";
import { Col, Spinner } from "react-bootstrap";
import ProductCard from "./ProductCard/ProductCard";

function Products() {

    const { value, loadMainByFilter } = useContext(DataContext);

    const [isLoading, setLoading] = useState(false);


    function loadMore() {

        if (value.length === 0) {
            setLoading(true);
            loadMainByFilter().then(() => setLoading(false));

        }
    }
    useEffect(loadMore, []);
    return (
        <section className="d-flex flex-wrap p-5">
            {(isLoading) ? <Col className='d-flex justify-content-center'><Spinner animation='border' /></Col> : value.map(val => <ProductCard key={val.id} data={val} />)}
        </section>
    );
}


export default Products;
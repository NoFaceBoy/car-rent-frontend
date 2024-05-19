
import DataContext from 'data/DataContext';
import { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import MainImage from './image.png';

function Home(props) {
    const { value, loadMainByFilter } = useContext(DataContext);
    const [loadedProducts, setloadedProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    let back = [];

    function loadMore() {
        if (back.length === 0) {
            setLoading(true);
            loadMainByFilter({ sort: "More expensive" }).then((val) => {
                back = val;
                loadMore();
                setLoading(false);
            });

        }
        else if (loadedProducts.length === back.length || loadedProducts.length > 12) {
            navigate("/catalog");
        } else {
            let mrows = back.slice(0, loadedProducts.length + 3);

            setloadedProducts(mrows);

        }
    }

    useEffect(loadMore, []);

    return (
        <Container as="main">
            <Row className='justify-content-stretch my-5 pb-5'>
                <Col lg={4}>                   <Image src={MainImage} alt='Img1' rounded fluid /></Col>
                <Col lg={8} className='d-flex flex-column px-5 py-2 justify-content-center'>
                    <h1>D-store is the store of electric decoration of your dream</h1>
                    <p className='fs-5'>
                        We help you to decorate your house as well as you could imagine.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;

import { Col, Container, Image, Row } from 'react-bootstrap';

import MainImage from './image.png';

function Home() {
    
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
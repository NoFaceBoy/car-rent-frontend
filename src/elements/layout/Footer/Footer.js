import { Container, Row, Col } from "react-bootstrap";

import Logo from "../../components/Logo/Logo";
import { SocialIcon } from "react-social-icons";

function Footer() {
    const iconStyle = {
        width: "2rem",
        height: "2rem"
    };
    return <Container fluid as='footer' className="border-top border-dark px-lg-5">
        <Row className="justify-content-stretch mx-lg-5 py-3 border-bottom border-dark flex-column flex-md-row">
            <Col>
                <h5 className="fw-bold">
                    About us
                </h5>
                <p className="fs-6 pe-5 mw-100">
                    We are company which has large ambitious. We have the best prices on the market. So buy our stuff. Please.
                </p>
            </Col>
            <Col className="d-flex justify-content-center align-items-center">
                <Logo />
            </Col>
            <Col className="d-flex align-items-center justify-content-center justify-content-md-end">
                <SocialIcon network='telegram' className="mx-1" style={iconStyle}/>
                <SocialIcon network='facebook' className="mx-1" style={iconStyle}/>
                <SocialIcon network='instagram' className="mx-1" style={iconStyle}/>
                <SocialIcon network='twitter' className="mx-1" style={iconStyle}/>
            </Col>
        </Row>
        <p className="text-center text-muted py-3">2022 &#169;Copyright all rights reserved</p>
    </Container>
}

export default Footer;
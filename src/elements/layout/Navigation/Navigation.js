import { Col, Container, Dropdown, Nav, Navbar } from "react-bootstrap";

import Logo from "elements/components/Logo/Logo";

import FLink from "elements/components/FLink/FLink";
import { VscAccount } from "react-icons/vsc";

import './Navigation.scss';
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { useContext } from "react";
import AuthContext from "data/AuthContext";
import { useNavigate } from "react-router-dom";

function Navigation() {
    const { user, signOut } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <Navbar className="px-1 border-bottom border-dark" expand="lg"  >
            <Container>
                <Col><Logo /></Col>
                <Navbar.Toggle aria-controls="navbar-collapse-section" />
                <Navbar.Collapse id="navbar-collapse-section" className="justify-content-center">
                    <Nav className="nav-buttons-parent align-items-center" as='ul'>
                        <Nav.Item as="li">
                            <FLink to="/">
                                <Nav.Link as="span">Home</Nav.Link>
                            </FLink>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <FLink to="/cars">
                                <Nav.Link as="span">Cars</Nav.Link>
                            </FLink>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
                <Col className="d-flex justify-content-end">
                    <Dropdown>
                        <DropdownToggle>
                            <VscAccount style={{ 'width': '1rem', 'height': '1rem' }} />
                        </DropdownToggle>
                        <DropdownMenu>
                            {(user !== null) ? <>
                                <Dropdown.Item onClick={() => navigate('/reservation/history')}>Reservations</Dropdown.Item>
                                {(user.privilege_level === "PRIVILEDGED") &&
                                    <Dropdown.Item onClick={() => navigate('/cars/add')}>Add a car</Dropdown.Item>}
                                <Dropdown.Item onClick={() => navigate('/report')}>Report</Dropdown.Item>
                                <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item></>
                                :
                                <Dropdown.Item onClick={() => navigate('/login')}>Login</Dropdown.Item>
                            }
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </Container>
        </Navbar>
    );
}

export default Navigation;
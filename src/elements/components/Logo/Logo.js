import { Navbar } from "react-bootstrap";

import LogoImg from "./logo.svg"


function Logo() {
    return <Navbar.Brand style={{lineHeight:"30px"}}>
        <img
            src={LogoImg}
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt= "Logo" />
        D-store
    </Navbar.Brand>;
}

export default Logo;
import { Button } from "react-bootstrap";

function ApplyBtn({onClick}) {
    return (
        <Button variant="outline-primary" className='width-form align-self-center' onClick={onClick}>Apply</Button>
    );
}

export default ApplyBtn;
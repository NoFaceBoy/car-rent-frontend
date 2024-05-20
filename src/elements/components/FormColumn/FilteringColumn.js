import {Form} from 'react-bootstrap';

function FilteringColumn({label, children}) {
    return (
        <div className="d-flex flex-basis-content flex-column align-items-center m-2">
            <span>{label}</span>
            <Form.Group className="d-inline">
                {children}
            </Form.Group>
        </div>

    );
}

export default FilteringColumn;

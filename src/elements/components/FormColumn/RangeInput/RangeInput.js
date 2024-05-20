import { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import FilteringColumn from '../FilteringColumn';


import '../FilteringColumn.scss';
function RangeInput({ label, state }) {
    const [value, setValue] = state;

    const [errors, setErrors] = useState({ from: false, to: false });

    const callbackFrom = (e) => {
        let num = Number.parseFloat(e.target.value);
        if (Number.isNaN(num) || num <= 0) {
            num = undefined;
            if (e.target.value.length !== 0) setErrors({ from: true, to: errors.to });
        }
        else {

            setErrors({ from: false, to: errors.to });
        }
        setValue({ from: num, to: value.to });
    };

    const callbackTo = (e) => {

        let num = Number.parseFloat(e.target.value);
        if (Number.isNaN(num)) {
            num = undefined;
            if (e.target.value.length !== 0) setErrors({ from: errors.from, to: true });
        }

        else {
            setErrors({ from: errors.from, to: false });

        }
        setValue({ from: value.from, to: num });
    };

    return (
        <FilteringColumn label={label}>
            <Form.Control className= "width-form d-inline-block me-2" placeholder="From" onChange={callbackFrom}  isInvalid={errors.from}/>

            <Form.Control className="width-form d-inline-block" placeholder="To" onChange={callbackTo} isInvalid={errors.to} />
        </FilteringColumn>
    );
}


export default RangeInput;
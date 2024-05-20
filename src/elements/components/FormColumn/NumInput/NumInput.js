import { useState } from "react";
import { Form } from "react-bootstrap";
import FilteringColumn from "../FilteringColumn";


export default function NumInput({ label, state, range }) {
    const [value, setValue] = state;

    const [error, setError] = useState(false);
    let rangeDefined = Boolean(range);

    const checkOnRange = (num) => {
        if (rangeDefined) {
            return (num <= range[1] && num >= range[0]);
        }
        return true;
    }

    const callback = (e) => {
        let str = e.target.value;
        let num = undefined;
        if (str.length === 0) {
            setError(false);
        } else {
            num = Number.parseInt(str);
            if (Number.isNaN(num) || !checkOnRange(num)) {
                num = undefined;
                setError(true);
            }
            else {
                setError(false);
            }
        }
        setValue(num);
    };


    return (
        <FilteringColumn label={label}>
            <Form.Control className="width-form mt-1" onChange={callback} isInvalid={error} />
        </FilteringColumn>);
}
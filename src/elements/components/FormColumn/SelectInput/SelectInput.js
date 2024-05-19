import { useState } from "react";
import { Form } from "react-bootstrap";
import FilteringColumn from "../FilteringColumn";


import '../FilteringColumn.scss';
function SelectInput({ options, label, state }) {

    options = options.map((val, index) => (<option key={index} value={index}>{val}</option>));

    const [value, setValue] = state;
    var callback = (val) => {
        let type = val.target.value;
        setValue(type);
    };


    return (
        <FilteringColumn label={label}>
            <Form.Select className="width-form" onChange={callback} value={value}>
                {options}
            </Form.Select>
        </FilteringColumn>
    );
}

export default SelectInput;
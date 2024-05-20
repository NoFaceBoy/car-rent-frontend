import { Form } from 'react-bootstrap';
import FilteringColumn from '../FilteringColumn';

import '../FilteringColumn.scss';

function SearchInput({ label, state }) {
    const [value, setValue] = state;

    function callback(e) {
        setValue(e.target.value);
    }


    return (
        <FilteringColumn label={label}>

            <Form.Control className="width-form" placeholder="Enter serch...." value={value} onChange={callback} />
        </FilteringColumn>
    );
}


export default SearchInput;
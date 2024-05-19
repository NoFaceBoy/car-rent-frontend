import { useState } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import ApplyBtn from "./ApplyBtn/ApplyBtn";


import RangeInput from "../../../../components/FormColumn/RangeInput/RangeInput";
import SearchInput from "../../../../components/FormColumn/SearchInput/SearchInput";
import SelectInput from "../../../../components/FormColumn/SelectInput/SelectInput";

import './FilteringTab.scss';

const options = ["Popular", "More expensive", "Cheeper", "Length"];

function FilteringTab({ setParams }) {
    const [priceRange, changePriceRange] = useState({ from: undefined, to: undefined });
    const [lengthRange, changeLengthRange] = useState({ from: undefined, to: undefined });
    const [sorting, changeSorting] = useState(0);
    const [search, setSearch] = useState("");

    const callback = () => {
        console.log(priceRange);
        console.log(lengthRange);
        console.log(sorting);
        let paramObj = {
            sort: options[sorting],
            'length-from': lengthRange.from,
            'length-to': lengthRange.to,
            'price-from': priceRange.from,
            'price-to': priceRange.to,
            'search':search
        }

        setParams(paramObj);

    };
    return (
        <Container fluid as="form" className="border-bottom border-dark">
            <Row className="px-5">
                <RangeInput label="Price" state={[priceRange, changePriceRange]} />
                <RangeInput label="Length" state={[lengthRange, changeLengthRange]} />
                <SelectInput label="Sort by" options={options} state={[sorting, changeSorting]} />
                <SearchInput label="Search" state={[search, setSearch]}/>
                <Col className="flex-grow-1" />
                <ApplyBtn onClick={callback} />
            </Row>
        </Container>
    );
}

export default FilteringTab;
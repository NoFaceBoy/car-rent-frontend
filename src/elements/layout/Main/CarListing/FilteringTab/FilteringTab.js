import { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ApplyBtn from "./ApplyBtn/ApplyBtn";
import RangeInput from "../../../../components/FormColumn/RangeInput/RangeInput";
import SearchInput from "../../../../components/FormColumn/SearchInput/SearchInput";
import SelectInput from "../../../../components/FormColumn/SelectInput/SelectInput";
import CarContext from "data/CarContext";
import './FilteringTab.scss';

const classOptions = ["", "Standard", "Sport", "Vintage", "Business"];
const statusOptions = ["", "Avalaible", "Reserved", "Damaged"];

function FilteringTab() {
    const { getFilteredCars } = useContext(CarContext);
    const [priceRange, changePriceRange] = useState({ from: undefined, to: undefined });
    const [yearRange, changeYearRange] = useState({ from: undefined, to: undefined });
    const [classSorting, changeClassSorting] = useState(0);
    const [statusSorting, changeStatusSorting] = useState(0);
    const [search, setSearch] = useState("");

    const callback = () => {
    const params = {};

    if (classOptions[classSorting]) params.mode = classOptions[classSorting];
    if (statusOptions[statusSorting]) params.status = statusOptions[statusSorting];
    if (yearRange.from) params.year_from = yearRange.from;
    if (yearRange.to) params.year_to = yearRange.to;
    if (priceRange.from) params.price_from = priceRange.from;
    if (priceRange.to) params.price_to = priceRange.to;
    if (search) params.search = search;

    getFilteredCars(params);

        getFilteredCars(params);
    };

    return (
        <Container fluid as="form" className="border-bottom border-dark">
            <Row className="px-5">
                <RangeInput label="Price" state={[priceRange, changePriceRange]} />
                <RangeInput label="Year" state={[yearRange, changeYearRange]} />
                <SelectInput label="Class" options={classOptions} state={[classSorting, changeClassSorting]} />
                <SelectInput label="Status" options={statusOptions} state={[statusSorting, changeStatusSorting]} />
                <SearchInput label="Search" state={[search, setSearch]} />
                <Col className="flex-grow-1" />
                <ApplyBtn onClick={callback} />
            </Row>
        </Container>
    );
}

export default FilteringTab;

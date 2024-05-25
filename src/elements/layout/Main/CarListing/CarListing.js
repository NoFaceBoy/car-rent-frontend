import { useContext } from "react";
import FilteringTab from "./FilteringTab/FilteringTab";
import Cars from "./Cars/Cars";
import CarContext from "data/CarContext";

function CarListing() {

    const { getFilteredCars } = useContext(CarContext);

    return (
        <>
            <FilteringTab setParams={getFilteredCars} />
            <Cars/>
        </>
    );
}


export default CarListing;
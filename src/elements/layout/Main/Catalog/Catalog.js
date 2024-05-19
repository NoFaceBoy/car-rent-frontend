import DataContext from "data/DataContext";
import { useContext } from "react";
import FilteringTab from "./FilteringTab/FilteringTab";
import Products from "./Products/Products";

function Catalog() {

    const { loadMainByFilter } = useContext(DataContext);



    return (
        <>
            <FilteringTab setParams={loadMainByFilter} />
            <Products/>
        </>
    );
}


export default Catalog;
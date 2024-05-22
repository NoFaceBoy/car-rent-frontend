import CarContext from "data/CarContext";
import { getCarById, getCarsByFilter } from "data/carApi";
import { useState } from "react";

function CarProvider({ children }) {
    const [cars, setCars] = useState([]);
    const [chosenCar, setChosenCar] = useState(null);

    const getFilteredCars = async (params) => {
        const res = await getCarsByFilter(params);
        setCars(res);
        return res;
    };

    return (<>

        <CarContext.Provider value={{
            cars, getFilteredCars, getCarById, chosenCar, setChosenCar,
        }}>
            {children}
        </CarContext.Provider>
    </>
    );
}

export default CarProvider;
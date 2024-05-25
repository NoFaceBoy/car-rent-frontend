import CarContext from "data/CarContext";
import { addCar, deleteCar, getCarById, getCarsByFilter, updateCar } from "data/carApi";
import { useState } from "react";

function CarProvider({ children }) {
    const [cars, setCars] = useState([]);
    const [chosenCar, setChosenCar] = useState(null);

    const getFilteredCars = async (params) => {
        const res = await getCarsByFilter(params);
        setCars(res);
        return res;
    };
    const addCarInt = async (car_obj) => {
        const {status, data} = await addCar(car_obj);
        if (status === 201) {
            await getFilteredCars();
            return data;
        }
        return status;
    }
    const updateCarInt = async (car_obj) => {
        const {status, data} = await updateCar(car_obj);
        if (status === 200) {
            await getFilteredCars();
            return data;
        }
        return status;
    }

    const deleteCarInt = async (id) => {
        await deleteCar(id);
        await getFilteredCars();
    }

    return (<>

        <CarContext.Provider value={{
            cars, getFilteredCars, getCarById, chosenCar, setChosenCar, addCar: addCarInt, updateCar: updateCarInt, deleteCar: deleteCarInt
        }}>
            {children}
        </CarContext.Provider>
    </>
    );
}

export default CarProvider;
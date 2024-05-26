import React, { createContext, useState } from 'react';
import { getCarsByFilter } from './carApi'

const CarContext = createContext();

export const CarProvider = ({ children }) => {
    const [cars, setCars] = useState([]);

    const getFilteredCars = async (params = {}) => {
        try {
            const data = await getCarsByFilter(params);
            setCars(data);
        } catch (error) {
            console.error("Failed to fetch filtered cars:", error);
            setCars([]);
        }
    };

    return (
        <CarContext.Provider value={{ cars, getFilteredCars }}>
            {children}
        </CarContext.Provider>
    );
};

export default CarContext;

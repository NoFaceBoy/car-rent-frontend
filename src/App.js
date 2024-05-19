import DataContext from "data/DataContext";

import { loadMainByFilter, loadAllById } from "data/dataReceive";
import { useState } from "react";

import './App.scss';
import Router from 'elements/routes/Router';
import AuthProvider from 'elements/routes/Auth';
import ReservationProvider from "elements/routes/ReservationProvider";

function App() {
    // receiveImage(1).then((val)=> console.log(val));
    //receiveFiltered({"price-from": "24", "sort": "More expensive"});
    const [product, setProducts] = useState([]);
    const [chosenCar, setChosenCar] = useState(null);

    return (<>

        <DataContext.Provider value={{
            value: product, loadMainByFilter: (async (params) => {
                const res = await loadMainByFilter(params);
                setProducts(res);
                return res;
            }), loadAllById, chosenCar, setChosenCar,
        }}><AuthProvider>
                <ReservationProvider>
                    <Router />
                </ReservationProvider>
            </AuthProvider>
        </DataContext.Provider>
    </>
    );
}

export default App;
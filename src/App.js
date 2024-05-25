import './App.scss';
import Router from 'elements/routes/Router';
import ReservationProvider from "elements/routes/ReservationProvider";
import CarProvider from "elements/routes/CarProvider";
import AuthProvider from 'elements/routes/AuthProvider';

function App() {

    return (<>

        <CarProvider>
            <AuthProvider>
                <ReservationProvider>
                    <Router />
                </ReservationProvider>
            </AuthProvider>
        </CarProvider>
    </>
    );
}

export default App;
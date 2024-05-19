import AuthContext from "data/AuthContext";
import ReservationContext from "data/ReservationContext";
import { submitReservation } from "data/reservationApi";
import { useContext } from "react";

export default function ReservationProvider({ children }) {
    const { user } = useContext(AuthContext);
    const putReservation = async (car_id, date_from, date_till) => {
        if (user === null) {
            return 402;
        }
        let res = await submitReservation({ user_id: user.id, car_id: car_id, start_date: date_from, end_date: date_till });
        return res;
    };
    return <ReservationContext.Provider value={{
        putReservation
    }}>
        {children}
    </ReservationContext.Provider>
}
import AuthContext from "data/AuthContext";
import ReservationContext from "data/ReservationContext";
import { updateReservationById, getReservationByUserId, submitReservation } from "data/reservationApi";
import { useContext, useEffect, useState } from "react";

export default function ReservationProvider({ children }) {
    const { user } = useContext(AuthContext);
    const [reservations, setReservations] = useState(null);
    const putReservation = async (car_id, date_from, date_till) => {
        if (user === null) {
            return 402;
        }
        let res = await submitReservation({ user_id: user.id, car_id: car_id, start_date: date_from, end_date: date_till });
        return res;
    };
    const getReservationByUser = async () => {
        if (user === null) {
            setReservations([]);
            return;
        }
        const res = await getReservationByUserId(user);
        if (res.status !== 200) {
            setReservations([]);
            return;
        }
        setReservations(res.data);
    };

    const updateReservation = async (reservation_request_object) => {
        if (user === null) {
            return;
        }
        await updateReservationById(reservation_request_object);
        await getReservationByUser();
    }
    useEffect(() => {getReservationByUser()}, [user]);
    return <ReservationContext.Provider value={{
        reservations,
        putReservation,
        getReservationByUser,
        updateReservation,
    }}>
        {children}
    </ReservationContext.Provider>
}
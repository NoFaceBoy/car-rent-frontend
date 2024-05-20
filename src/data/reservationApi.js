import axios from "axios";

export async function submitReservation(reservation) {
    let res;
    try {
        res = await axios.post('/api/reservations/add', reservation).then(res => res.status);

    } catch (err) {
        res = err.status;
    }
    return res;
}
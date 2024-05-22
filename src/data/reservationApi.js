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

export async function getReservationByUserId(user_id) {
    let res;
    try {
        res = await axios.get(`/api/reservations/users/${user_id}`).then(res => {return {status: res.status, data: res.data}});
    } catch (err) {
        res = {status: err.status, data: null};
    }
    return res;
}

export async function updateReservationById(rro) {
    let res;
    console.log(rro);
    try {
        res = await axios.put(`/api/reservations/${rro.reservation_id}/${rro.action}`, rro.data).then(res => res.status);
    } catch (err) {
        res = err.status;
    }
    return res;
}
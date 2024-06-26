import axios from "axios";

export async function submitReservation(reservation) {
    let res;
    try {
        res = await axios.post('/api/reservations/add', reservation).then(res => res.status);

    } catch (err) {
        res = err.response.status;
    }
    return res;
}

export async function getReservationByUserId(user) {
    let res;
    try {
        if (user.privilege_level === "PRIVILEDGED") {
            res = await axios.get(`/api/reservations`).then(res => { return { status: res.status, data: res.data } });
        } else {
            res = await axios.get(`/api/reservations/users/${user.id}`, { headers: { 'X-email': user.email, 'X-password': user.password } }).then(res => { return { status: res.status, data: res.data } });
        }
    } catch (err) {
        res = { status: err.response.status, data: null };
    }
    return res;
}

export async function updateReservationById(rro) {
    let res;
    console.log(rro);
    try {
        res = await axios.put(`/api/reservations/${rro.reservation_id}/${rro.action}`, rro.data).then(res => res.status);
    } catch (err) {
        res = err.response.status;
    }
    return res;
}

export async function getReservationByCarId(id) {
    let res;
    try {
        res = await axios.get(`/api/reservations/cars/${id}`).then((resp) => {return {status: resp.status, data: resp.data}});
    } catch (err) {
        res = {status: err.status, data: null};
    }
    return res;
}
import axios from "axios";


export async function getCarById(id) {
    let res = await axios.get("/api/cars/" + id).then(response => response.data);
    return res;
}

export async function getCarsByFilter (param) {
    let res = await axios.get("/api/cars").then((resposnse) => resposnse.data);
    return res;
}

export async function addCar(car_obj) {
    let res;
    try {
        res = await axios.post("/api/cars/add", car_obj).then((resp) => {return {status: resp.status, data: resp.data}});
    } catch (err) {
        res = {status: err.status, data: null};
    }
    return res;
}

export async function updateCar(car_obj) {
    let res;
    try {
        res = await axios.put(`/api/cars/update/${car_obj.id}`, car_obj).then((resp) => {return {status: resp.status, data: resp.data}});
    } catch (err) {
        res = {status: err.status, data: null};
    }
    return res;
}

export async function deleteCar(car_id) {
    let res;
    try {
        res = await axios.delete(`/api/cars/delete/${car_id}`).then((resp) => resp.status);
    } catch (err) {
        res = err.status;
    }
    return res;
}
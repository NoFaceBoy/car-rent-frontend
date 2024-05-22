import axios from "axios";


export async function getCarById(id) {
    let res = await axios.get("/api/cars/" + id).then(response => response.data);
    return res;
}

export async function getCarsByFilter (param) {
    let res = await axios.get("/api/cars").then((resposnse) => resposnse.data);
    return res;
}
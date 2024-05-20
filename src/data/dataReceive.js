import axios from "axios";


async function receiveFiltered(params) {
    let res = await axios.get("/api/cars").then((resposnse) => resposnse.data);
    console.log(res);
    return res;
}

async function receiveById(id) {
    let res = await axios.get("/api/cars/" + id).then(response => response.data);
    return res;
}


export async function loadAllById(id) {
    let res = await receiveById(id);
    return res;
}

export async function loadMainByFilter (param) {
    let res = await receiveFiltered(param);
    return res;
}
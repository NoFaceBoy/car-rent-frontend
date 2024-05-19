import axios from "axios";

export async function registerUser(user) {
    let res;
    try {
        res = await axios.post("/api/accounts/add", user).then((response) => {return {status: response.status, data: response.data}});
    } catch (err) {
        res = {status: err.status, data: null}
    }
    console.log(res);
    return res;
}

export async function loginUser(creds) {
    let res;
    try {
        res = await axios.put("/api/accounts/login", creds);
        res = {status: res.status, data: res.data};
    } catch(err) {
        res = {status: err.status, data: null};
    }
    console.log(res);
    return res;

}
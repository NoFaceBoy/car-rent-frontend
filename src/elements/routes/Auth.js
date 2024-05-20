import AuthContext from "data/AuthContext";
import { useEffect, useState } from "react";
import { registerUser, loginUser } from "data/accountApi";
/*

obj user = {
    first_name: string,
    last_name: string,
    password: string,
    email: string
}

*/

const credentialKey = 'credential';

async function saveUser(user) {
    let res = await registerUser(user);
    return res
}


function deleteUser() {
    localStorage.removeItem(credentialKey);
}

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    async function loadUser() {
        let buf = localStorage.getItem(credentialKey);
        if (buf === null) {
            return null;
        }
        const res = await loginUser(JSON.parse(buf));
        if (res.status === 201) {
            setUser(res.data);
        }
    }
    useEffect(() => {loadUser()});


    const registerUser = async (user) => {
        const res = await saveUser(user);
        if (res.status === 201) {
            setUser(res.data);
        }
        return res.status;
    }

    const checkLogin = async (login) => {
        const res = await loginUser(login);
        if (res.status === 200) {
            setUser(res.data);
            return res.status;
        } else {
            return res.status;
        }
    }
    const signOut = () => {
        deleteUser();
        setUser(null);
    } 

    return <AuthContext.Provider value={{
        user,
        registerUser,
        checkLogin,
        signOut
    }}>
        {children}
    </AuthContext.Provider>
}


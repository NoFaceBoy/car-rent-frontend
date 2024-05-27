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

async function saveUser(email, password) {
    localStorage.setItem(credentialKey, JSON.stringify({email: email, password: password}))
}


export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    async function loadUser() {
        let buf = localStorage.getItem(credentialKey);
        if (buf === null) {
            return null;
        }
        const res = await loginUser(JSON.parse(buf));
        if (res.status === 200) {
            setUser(res.data);

        }
    }
    useEffect(() => {loadUser()}, []);


    const registerUserInt = async (user) => {
        const res = await registerUser(user);
        if (res.status === 201) {
            saveUser(user.email, user.password);
            setUser(res.data);
        }
        return res.status;
    }

    const checkLogin = async (login) => {
        const res = await loginUser(login);
        if (res.status === 200) {
            saveUser(login.email, login.password);
            setUser(res.data);
            return res.status;
        } else {
            return res.status;
        }
    }
    const signOut = () => {
        setUser(null);
        localStorage.removeItem(credentialKey);
    } 

    return <AuthContext.Provider value={{
        user,
        registerUser: registerUserInt,
        checkLogin,
        signOut
    }}>
        {children}
    </AuthContext.Provider>
}


import useAxios from '../utils/axios'
import { useContext } from "react";
import { AuthContext, defaultAuthContext } from "../context/AuthContext";
import { LoginContext } from '../context/LoginContext';

const usePublic = () => {
    const authContext = useContext(AuthContext);
    const loginContext = useContext(LoginContext)
    const fetch = useAxios();

    const login = async (data: { email: string }) => {
        return new Promise((resolve, reject) => {
            fetch({
                method: "post",
                url: "/login",
                data
            }).then(response => {
                const { enc_data, hash_data, fullName, email, id } = response?.data || {};
                const authData = { enc_data, hash_data, email, fullName, isAuth: true, id }
                localStorage.setItem("auth", JSON.stringify(authData));
                authContext.setState(authData)
                loginContext.setState({ loginVisible: false, type: 0 });
                resolve(null)
            }).catch((err) => {
                reject(err)
            })
        })

    }
    const logout = () => {
        authContext.setState(defaultAuthContext)
        localStorage.removeItem("auth")
    }

    const signup = async (data: { email: string, fullName: string }) => {
        const response = await fetch({
            method: "post",
            url: "/signup",
            data
        })
        const { enc_data, hash_data, fullName, email, id } = response?.data || {};
        authContext.setState({ enc_data, hash_data, email, fullName, isAuth: true, id })
        loginContext.setState({ loginVisible: false, type: 0 });
    }
    const getCategories = async () => {
        try {
            const response = await fetch({ 
                method: "get",
                url: "/categories",
            })
            return response.data
        } catch (e) {

        }
    }

    const getPolicies = async (params?: { id?: string, categoryId?: string }) => {
        // const response = await fetch.get("/policies", { params });
        const response = await fetch({
            method: "get",
            url: "/policies",
            params
        })
        return response.data;
    }
    const addPolicy = async (data) => {
        return new Promise((resolve, reject) => {
            fetch({
                method: "post",
                url: "/addPolicy",
                data
            }).then((res) => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
    const vote = async (data) => {
        return new Promise((resolve, reject) => {
            fetch({
                method: "post",
                url: "/vote",
                data,
            })
                .then((res) => resolve(res))
                .catch((err) => reject(err))
        })
    }
    return {
        login,
        signup,
        getCategories,
        logout,
        getPolicies,
        addPolicy,
        vote
    }
}

export default usePublic;

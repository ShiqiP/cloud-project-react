import useAxios from '../utils/axios'
import { useContext } from "react";
import { AuthContext, defaultAuthContext } from "../context/AuthContext";
import { LoginContext } from '../context/LoginContext';

const usePublic = () => {
    const authContext = useContext(AuthContext);
    const loginContext = useContext(LoginContext)
    const fetch = useAxios();

    const login = async (data: { email: string, password: string }) => {
        return new Promise((resolve, reject) => {
            fetch({
                method: "post",
                url: "/signin",
                data
            }).then(response => {
                const { email, image_url, name } = response?.data.User || {};
                const authData = { email, name, isAuth: true, image_url }
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

    const signup = async (data: { email: string, name: string, password: string }) => {
        const response = await fetch({
            method: "post",
            url: "/signup",
            data
        })
        const { enc_data, hash_data, name, email, id } = response?.data || {};
        // authContext.setState({ enc_data, hash_data, email, name, isAuth: true, id })
        loginContext.setState({ loginVisible: false, type: 0 });
    }
    const getPresignedUrl = (filename) => {
        try {
            const { email } = authContext.state
            return fetch({ method: 'post', url: '/presign', data: { email, filename } })
        } catch (err) { }
        // console.log("getPresignedUrl")
    }
    const updateImgUrl = (image_url) => {
        const { email } = authContext.state
        try { return fetch({ method: 'put', url: '/update-image-url', data: { image_url, email } }) } catch (err) { }
        // console.log("updateImgUrl")
    }
    return {
        login,
        signup,
        logout,
        getPresignedUrl,
        updateImgUrl
    }
}

export default usePublic;

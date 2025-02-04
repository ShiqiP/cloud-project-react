import axios, { AxiosInstance } from "axios";
import { AuthContext, defaultAuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { LoginContext } from "../context/LoginContext";

// Custom hook to use axios with context data
const useAxios = () => {
    const authContext = useContext(AuthContext);
    const loginContext = useContext(LoginContext);

    // const { enc_data, hash_data } = authContext.state;
    const fetch = axios.create({
        baseURL: process.env.REACT_APP_URL,
        // baseURL: "http://localhost:8000",
        timeout: 10000,
        // headers: {
        //     enc_data,
        //     hash_data,
        // },
    });

    fetch.interceptors.request.use(
        (config) => {
            // You can add logic here before the request is sent
            return config;
        },
        (error) => {
            // You can handle request errors here if needed
            return Promise.reject(error);
        }
    );

    fetch.interceptors.response.use(
        (response) => {
            const { status, data } = response;
            if (status >= 100 && status < 300) {
                return response;
            } else {
                return Promise.reject(response);
            }
        },
        (error) => {
            const { status } = error;
            if (status === 401) {
                // Handle 401 - unauthorized (e.g., popup login)
                // navigate("/login")
                loginContext.setState(pre => { return { type: 0, loginVisible: true } })
                authContext.setState(defaultAuthContext)
                localStorage.removeItem("auth");
                return Promise.reject(error);
            } else if (status === 403) {
                loginContext.setState({ type: 1, loginVisible: true })
                return Promise.reject(error);
            } else {
                console.log(error)
                return Promise.reject(error);
            }

        }
    );
    return fetch;

};

export default useAxios;

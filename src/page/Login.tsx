import { ChangeEvent, FormEvent, useContext, useState, useRef } from "react";
import usePublic from "../methods/public";
import { LoginContext } from "../context/LoginContext";
import { usePopup } from "../context/PopupContext";
import { useNavigate } from "react-router";
import ImageUploader from "./ImageUploader";

// function Login({ onClose }: { onClose: Function }) {
function Login() {
    // shiqipam@gmail.com
    const [formData, setFormData] = useState({ email: "", name: "", password: "" });
    const [validForm, setValidForm] = useState({ email: true, name: true, password: true });
    const loginContext = useContext(LoginContext)
    const ImageUploaderRef = useRef(null)
    const { showPopup } = usePopup();
    const navigate = useNavigate();

    const { login, signup } = usePublic();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const isValidEmail = (value: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }
    const isValidEmpty = (value: string) => {
        return value !== null && value !== undefined && value.trim() !== ""
    }
    const handleBlur = (e, validFunc: Function) => {
        const { name, value } = e.target;
        setValidForm(pre => { return { ...pre, [name]: validFunc(value) } })
    }
    const checkForm = () => {
        setValidForm(pre => { return { email: isValidEmail(formData.email), name: isValidEmpty(formData.name), password: isValidEmpty(formData.password) } })
    }

    const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            checkForm()
            if (!validForm.email || !validForm.password) return
            const { email, password } = formData;
            // navigate('/homepage')
            await login({ email, password })
            navigate('/homepage')
        } catch (err) {

        }
    }
    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            checkForm()
            ImageUploaderRef.current.handleUpload();
            if (!Object.keys(validForm).every(key => formData[key])) return

            const { email, name, password } = formData;
            await signup({ email, name, password })
            await ImageUploaderRef.current.hanldeUpload();
            navigate('/homepage')
        } catch (err) {
        }
    }
    const handleChangeType = (e) => {
        e.preventDefault()
        loginContext.setState(pre => { return { ...pre, type: pre.type === 0 ? 1 : 0 } });
    }


    return (
        <>
            <div className="h-screen flex items-center justify-center">
                <div className="w-96 p-x shadow-md p-8">
                    {loginContext.state.type === 0 && <>
                        <div className="mb-5">
                            <span className="text-2xl font-bold  pr-3">Log in</span>
                            <span className="text-sky-800 font-bold text-3xl cursor-pointer">MIU </span>
                        </div>
                        <form onSubmit={handleSignin} className="grid grid-cols-1 gap-3">
                            <div >
                                <input className="border border-sky-300 text-lg px-3 py-1 w-full h-10 rounded" name="email" value={formData.email} placeholder="Email" onChange={handleChange} onBlur={(e) => handleBlur(e, isValidEmail)} />
                                <p className={`mb-1 text-sm text-red-600 ${validForm.email ? 'invisible' : 'visible'}`} >Please enter a valid email address.</p>
                                <input className="border w-full border-sky-300 text-lg px-3 py-1  h-10 rounded" name="password" value={formData.password} onChange={handleChange} placeholder="password" onBlur={(e) => handleBlur(e, isValidEmpty)} />
                                <p className={`mb-1 text-sm text-red-600 ${validForm.password ? 'invisible' : 'visible'}`} >Please enter password</p>
                            </div>
                            <button className="bg-sky-800 text-white text-lg py-1 font-bold rounded" type="submit">Login</button>
                            <button className="bg-sky-800 text-white text-lg py-1 font-bold rounded" onClick={handleChangeType}>Sign up</button>
                        </form>
                    </>
                    }
                    {loginContext.state.type !== 0 && <>
                        <div className="mb-5">
                            <span className="text-2xl font-bold  pr-3">Sign up</span>
                            <span className="text-sky-800 font-bold text-3xl cursor-pointer">MIU</span>
                        </div>
                        <form onSubmit={handleSignUp} className="grid grid-cols-1 gap-3">
                            <div>
                                <input className="border w-full border-sky-300 text-lg px-3 py-1  h-10 rounded" name="name" value={formData.name} onChange={handleChange} onBlur={(e) => handleBlur(e, isValidEmpty)} placeholder="name" />
                                <p className={`mb-1 text-sm text-red-600 ${validForm.name ? 'invisible' : 'visible'}`} >Please enter name to sign up</p>
                                <input className="border w-full border-sky-300 text-lg px-3 py-1  h-10 rounded" name="email" value={formData.email} onChange={handleChange} placeholder="Email" onBlur={(e) => handleBlur(e, isValidEmail)} />
                                <p className={`mb-1 text-sm text-red-600 ${validForm.email ? 'invisible' : 'visible'}`} >Please enter a valid email address.</p>
                                <input className="border w-full border-sky-300 text-lg px-3 py-1  h-10 rounded" name="password" value={formData.password} onChange={handleChange} placeholder="password" onBlur={(e) => handleBlur(e, isValidEmpty)} />
                                <p className={`mb-1 text-sm text-red-600 ${validForm.password ? 'invisible' : 'visible'}`} >Please enter password to sign up</p>
                                <ImageUploader ref={ImageUploaderRef} />
                            </div>

                            <button className="bg-sky-800 text-white text-lg py-1 font-bold rounded" type="submit">Sign up</button>
                            <button className="bg-sky-800 text-white text-lg py-1 font-bold rounded" onClick={handleChangeType}>Back to log in</button>
                        </form>
                    </>
                    }
                </div>
            </div>
        </>

    )

}
export default Login;
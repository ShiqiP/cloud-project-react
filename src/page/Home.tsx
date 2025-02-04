import ImageUploader from "./ImageUploader";
import { AuthContext } from "../context/AuthContext";
import { useContext, useRef } from "react";
import usePublic from "../methods/public";
import { usePopup } from "../context/PopupContext";

function Home() {
    const authContext = useContext(AuthContext);
    const { email, name, image_url } = authContext.state;
    const ImageUploaderRef = useRef(null)
    const { logout } = usePublic();
    const { showPopup } = usePopup();

    const handleLogout = async () => {
        try {
            logout();
        } catch (err) {

        }
    }
    const handleSave = async () => {
        try {
            await ImageUploaderRef.current.handleUpload(authContext.state);
            showPopup("upload successfully")
        } catch (err) {

        }
    }

    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center">
                <div className="w-96 p-x shadow-md p-8">
                    <div className="text-lg py-1 font-bold">Name: {name}</div>
                    <div className="text-lg py-1 font-bold">Email: {email}</div>
                    <ImageUploader ref={ImageUploaderRef} img={image_url} />
                    <div className="mt-5">
                        <button className="bg-sky-800 mr-4 text-white text-lg p-1 font-bold rounded" onClick={handleSave}>Save</button>
                        <button className="bg-sky-800 text-white text-lg p-1 font-bold rounded" onClick={handleLogout}>Log out</button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Home;
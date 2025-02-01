import ImageUploader from "./ImageUploader";
import { AuthContext } from "../context/AuthContext";
import { useContext, useRef } from "react";
function Home() {
    const authContext = useContext(AuthContext);
    const { email, name, image_url } = authContext.state;
    const ImageUploaderRef = useRef(null)
    const handleSave = async () => {
        try {
            const response = await ImageUploaderRef.current.handleUpload();
        } catch (err) {

        }
    }

    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center">
                <div>
                    <div>name:{name}</div>
                    <div>email:{email}</div>
                    <ImageUploader ref={ImageUploaderRef} img={"https://final-project-shiqi.s3.us-east-1.amazonaws.com/logo512.png"} />
                    <button className="bg-sky-800 text-white text-lg p-1 font-bold rounded" onClick={handleSave}>Save</button>
                </div>
            </div>

        </>
    );
}

export default Home;
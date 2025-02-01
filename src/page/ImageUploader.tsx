import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import usePublic from '../methods/public';
import axios from 'axios';
import { usePopup } from "../context/PopupContext";

interface ImageUploaderProps {
    img?: string;
}
export interface ImageUploaderHandle {
    handleUpload: () => Promise<void>;
}

const ImageUploader = forwardRef<ImageUploaderHandle, ImageUploaderProps>((props, ref) => {
    const { showPopup } = usePopup();
    useImperativeHandle(ref, () => ({
        handleUpload: async () => {
            try {
                if (file) {
                    const filename = encodeURIComponent(file.name);
                    const response = await getPresignedUrl(filename)
                    console.log(response)
                    const upload_url = response.data.upload_url
                    await axios.put(upload_url, file, {
                        headers: { 'Content-Type': file.type },
                    });
                    await updateImgUrl(upload_url);
                    showPopup("upload successfully")
                }
            } catch (err) {

            }
        }
    }));

    const [file, setFile] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const { getPresignedUrl, updateImgUrl } = usePublic();

    const fileInputRef = useRef(null)

    const handleFileChange = (e) => {
        const resFile = e.target.files[0];
        if (resFile) {
            setFile(resFile);
            const reader = new FileReader();
            reader.onload = () => {
                setImgPreview(reader.result)
            }
            reader.readAsDataURL(resFile)
        }
    };
    const handleOnClick = () => {
        fileInputRef.current.click();
    }


    return (
        <div className="upload-container">
            <div
                onClick={handleOnClick}
                className={` border-sky-200 w-20 h-20 border-2 border-dashed rounded-lg cursor-pointer flex justify-center items-center flex-col cur
        `}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-sky-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                {imgPreview ? <img src={imgPreview} alt="Preview" className='w-full h-full' /> : props.img && <img src={props.img} alt="Preview" className='w-full h-full' />}
            </div>
            <input type="file" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
        </div>
    );
});

export default ImageUploader;

import ImageUploader from "./ImageUploader";
function Home() {

    const handleSave = () => {

    }

    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center">
                <div>
                    <div>name:</div>
                    <div>email:</div>
                    <ImageUploader />
                    <button className="bg-sky-800 text-white text-lg p-1 font-bold rounded" onClick={handleSave}>Save</button>
                </div>
            </div>

        </>
    );
}

export default Home;
import React, { useState } from "react";
import "./AddPicture.scss";
export default function AddPicture({ logoHandler }) {
    const [image, setImage] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
            localStorage.setItem("image", reader.result);
        };
        // logoHandler(reader.result);
        reader.readAsDataURL(file);
    };

    return (
        <div>
            {image ? (
                <img src={image} alt="Selected" />
            ) : (
                <>
                    <label htmlFor="file-upload" className="custom-file-upload">
                        Upload Logo
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        onChange={handleImageChange}
                        className="add-picture-btn"
                        title="&nbsp;"
                    />
                </>
                // <input type="file" onChange={handleImageChange} className="add-picture-btn" title="&nbsp;"/>
            )}
        </div>
    );
}

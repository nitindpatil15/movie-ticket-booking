import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './CarousalAds.css';

import add from '../Assets/add.png';
import { addAd } from '../../Redux/Ads/adsSlice';

export const CarousalAds = () => {
    const [action, setAction] = useState("Home");
    const [imageUrl, setImageUrl] = useState(null); // State to hold the uploaded file
    const [adData, setAdData] = useState({
        title: '',
        description: '',
        link: '',
        targetAudience: '',
        impressions: ''
    });

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        setImageUrl(event.target.files[0]); // Handle file upload
    };

    const handleAddAd = () => {
        const { title, description, link, targetAudience, impressions } = adData;

        if (!imageUrl || !title || !description || !link || !targetAudience || !impressions) {
            alert("Please fill all fields and upload an image for the ad.");
            return;
        }

        const formData = new FormData();
        formData.append('imageUrl', imageUrl); // Use the correct field name 'image'
        formData.append('title', title);
        formData.append('description', description);
        formData.append('link', link);
        formData.append('targetAudience', targetAudience);
        formData.append('impressions', impressions);

        dispatch(addAd(formData))
            .unwrap()
            .then(() => alert('Ad added successfully'))
            .catch((error) => alert(error.message || 'Failed to add ad'));
    };

    return (
        <div className="container-h">
            <div className="">
                <div className="text my-2">Add Ads</div>
            </div>
            <div className="submit-container">
                <div className="submit" onClick={() => setAction("Movie")}>Movie</div>
            </div>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>

            {action === "Movie" ? <div></div> : (
                <div className="inputs">
                    <div className='input-ad'>
                    <div className="input-field">
                        <label>Title:</label>
                        <input type="text" name="title" value={adData.title} onChange={handleInputChange} placeholder="Enter ad title" />
                    </div>
                    <div className="input-field">
                        <label>Description:</label>
                        <input type="text" name="description" value={adData.description} onChange={handleInputChange} placeholder="Enter ad description" />
                    </div>
                    <div className="input-field">
                        <label>Link:</label>
                        <input type="text" name="link" value={adData.link} onChange={handleInputChange} placeholder="Enter ad link" />
                    </div>
                    <div className="input-field">
                        <label>Target Audience:</label>
                        <input type="text" name="targetAudience" value={adData.targetAudience} onChange={handleInputChange} placeholder="Enter target audience" />
                    </div>
                    <div className="input-field">
                        <label>Impressions:</label>
                        <input type="number" name="impressions" value={adData.impressions} onChange={handleInputChange} placeholder="Enter impressions count" />
                    </div>
                    </div>
                    <div className="input-new-1">
                        <input type="file" id="imageUrl" onChange={handleFileChange} /> {/* Updated to 'image' */}
                        <label htmlFor="imageUrl" id="label-img">
                            <img src={add} id="labelimg" alt="upload icon" /> 
                            Upload Home page carousel image here <br />In resolution of 900px x 600px
                        </label>
                    </div>
                    <button onClick={handleAddAd} className='btn mt-3'>Add Advertisement</button>
                </div>
            )}
        </div>
    );
};

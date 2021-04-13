import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';

export default function ImageView() {
    const [imageIds, setImageIds] = useState();

    const loadImages = async () => {
        try {
            const res = await fetch('http://localhost:5000/images');
            const data = await res.json();
            setImageIds(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadImages();
    }, []);

    return (
        <div>




<div className="gallery">
                {imageIds &&
                    imageIds.map((imageId, index) => (
                        <Image
                            key={index}
                            cloudName="soti"
                            publicId={`https://res.cloudinary.com/soti/image/upload/w_120,h_120,c_fit/w_150/${imageId}.png`}
                            width="300"
                            crop="scale"
                        />
                    ))}
            </div>

</div>
    );
}
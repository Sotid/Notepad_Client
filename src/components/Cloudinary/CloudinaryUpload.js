import React, {useState, useEffect} from 'react';
import { CloudinaryContext, Image } from "cloudinary-react";
 import { fetchPhotos, openUploadWidget } from "./CloudinaryService";
 import Button from "@material-ui/core/Button";
 import BackupIcon from '@material-ui/icons/Backup';

function Page() {
  const [images, setImages] = useState([])

  const beginUpload = tag => {
    const uploadOptions = {
      cloudName: "soti",
      tags: [tag, 'anImage'],
      uploadPreset: "q2ksqxtp"
    };
    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        console.log(photos);
        if(photos.event === 'success'){
          setImages([...images, photos.info.public_id])
        }
      } else {
        console.log(error);
      }
    })
  }

  useEffect( () => {
    fetchPhotos("image", setImages);
  }, [])

  return (
   <CloudinaryContext cloudName="soti">
      <div className="App">
      <Button
              onClick={() => beginUpload("image")}
                            aria-label="add"
              color="primary"

            >
              <BackupIcon style={{ height: 30, width: 25 }} />
         </Button>
      <section>
        {images.map(i => <Image
         
              key={i}
              publicId={i}
          cloudName="soti"  width="80" crop="scale"

            />)}
      </section>
    </div>
   </CloudinaryContext>
  );
}

export default Page;
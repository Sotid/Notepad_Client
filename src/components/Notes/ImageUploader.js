import { useState} from "react";
import axios from "axios";
import {Image} from "cloudinary-react"

function ImageUploader() {
  const [imageSelected, setImageSelected] = useState({})

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "q2ksqxtp");

    axios.post(
      "https://api.cloudinary.com/v1_1/soti/image/upload",
      formData)
      .then((response) => {
   return response.data

})
.then((data) => {
  const items= data
  console.log(items)
  return items

})

  };
  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
         setImageSelected(event.target.files[0]);
         console.log(event.target.files[0])

        }}
      />
      <button onClick={uploadImage}>Upload</button>
      <Image cloudName="soti" publicId={`https://res.cloudinary.com/soti/image/upload/${"items"}.jpg`} />
      
    </div>
  );
}

 export default ImageUploader
import { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import BackupIcon from "@material-ui/icons/Backup";
import Button from "@material-ui/core/Button";

function ImageUploader() {
  const [imageSelected, setImageSelected] = useState({});
  const [imageId, setImageId] = useState({});

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "q2ksqxtp");

    axios
      .post("https://api.cloudinary.com/v1_1/soti/image/upload", formData)
      .then((response) => {
        console.log(response.data);

        return setImageId(response.data.public_id);
      });
  };

  return (
    <div>
      <div>
        <Button
          variant="contained"
          component="label"
          style={{
            backgroundColor: "06d6a0",
            maxHeight: "1px",
            maxWidth: "1px",
            minHeight: "1px",
            minWidth: "1px",
          }}
        >
          +
          <input
            hidden
            type="file"
            onChange={(event) => {
              setImageSelected(event.target.files[0]);
              console.log(event.target.files[0]);
            }}
          />
        </Button>
        <Button
          style={{ height: 35, width: 35 }}
          iconStyle={{ height: 21, width: 21 }}
          size="small"
          color="primary"
          aria-label="upload"
          onClick={uploadImage}
        >
          <BackupIcon />
        </Button>
      </div>
      <Image
        cloudName="soti"
        publicId={`https://res.cloudinary.com/soti/image/upload/w_120,h_120,c_fit/w_150/${imageId}.png`}
      />
    </div>
  );
}

export default ImageUploader;

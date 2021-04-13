import React, { useEffect, useState } from 'react';
import ImageView from "../Notes/ImageView"
import BackupIcon from "@material-ui/icons/Backup";
import Button from "@material-ui/core/Button";

export default function Upload() {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    
  
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            setErrMsg('something went wrong!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            await fetch('http://localhost:5000/images/upload', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' },
            });
            setFileInputState('');
            setPreviewSource('');
            setSuccessMsg('Image uploaded successfully');
        } catch (err) {
            console.error(err);
            setErrMsg('Something went wrong!');
        }
    };
    return (
        <div>
        
            <form onSubmit={handleSubmitFile} className="form">
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
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
                        </Button>

                
                        <Button
          style={{ height: 35, width: 35 }}
          iconStyle={{ height: 21, width: 21 }}
          size="small"
          color="primary"
          aria-label="upload"
          type="submit"
        //   onClick={uploadImage}
        >
          <BackupIcon />
        </Button>
            </form>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}

          <ImageView />
        </div>
    );
}
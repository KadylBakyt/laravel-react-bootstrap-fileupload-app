import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { ProgressBar, Button, Row, Col } from 'react-bootstrap';

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, []);

  const handleDelete = () => {
    setFiles([]);
    setUploadProgress(0);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    try {
      const response = await axios.post('/upload_file', formData, {
        onUploadProgress: progressEvent => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'drag-active' : ''}`}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>

      {files.map(file => (
        <Row key={file.name}>
            <Col className='col-4'>
                {file.preview && <img src={file.preview} alt={file.name} with="200px" height="130px"/>}
            </Col>
            <Col className='col-5'>
                <h5>{file.name}</h5>
            </Col>
            <Col className='col-3 text-end'>
                <Button className="pull-right" onClick={handleUpload}>Загрузить файл</Button>
                <Button className="btn btn-danger pull-right" onClick={handleDelete}>Удалить файл</Button>
            </Col>
        </Row>
      ))}

      {files.length > 0 &&
        <Row>
            <ProgressBar className="mt-1" now={uploadProgress} label={`${uploadProgress}%`} />
        </Row>
      }

    </div>
  );
};

export default FileUploader;

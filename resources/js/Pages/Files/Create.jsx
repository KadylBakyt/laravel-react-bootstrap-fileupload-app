import React, { useState, useCallback } from 'react';
import { Inertia } from '@inertiajs/inertia';
import GuestLayout from '../../Layouts/GuestLayout';
import { Card, Form, Button, Row, Col, ProgressBar, Container, Alert } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function Create() {

    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [errors, getErrors] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }, []);

    const handleDelete = () => {
      setFiles([]);
      getErrors([]);
      setUploadProgress(0);
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleUpload = async () => {
      const formData = new FormData();
      files.forEach(file => formData.append('file', file));

      try {
        const response = await axios.post('/upload_file', formData, {
          onUploadProgress: progressEvent => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        });

        Inertia.get('/');

      } catch (error) {
        console.error(error.response);

        getErrors(error.response.data.message);
      }
    };

    const backToMainList = () => {
        Inertia.get('/');
    };

    return (
        <GuestLayout>
            <Card className="mt-2">
                <Card.Header className="bg-dark text-light">
                    <h5>Добавление файла</h5>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Название файла</Form.Label>
                            <Form.Control type="text" name="file_name" placeholder="Введите название файла" />
                        </Form.Group>
                        <Container>
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
                                        <Button className="pull-right" onClick={handleUpload}>Добавить файл</Button>
                                        <Button className="btn btn-danger pull-right" onClick={handleDelete}>Удалить файл</Button>
                                    </Col>
                                </Row>
                            ))}

                            { files.length > 0 && errors.length === 0 &&
                                <Row>
                                    <ProgressBar className="mt-1" now={uploadProgress} label={`${uploadProgress}%`} />
                                </Row>
                            }

                            { errors.length > 0 &&
                                <Alert key='danger' variant='danger'>{errors}</Alert>
                            }
                        </Container>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <Row>
                        <Col>
                            <Button className="btn btn-secondary" onClick={backToMainList}>Отменить</Button>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </GuestLayout>
    )
}

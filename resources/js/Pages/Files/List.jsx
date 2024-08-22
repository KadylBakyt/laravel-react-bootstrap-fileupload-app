import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';
import GuestLayout from '../../Layouts/GuestLayout';
import { Card, Form, Table, ButtonGroup, Button, Row, Col, Nav, Image } from 'react-bootstrap';

export default function List({files}) {

    const [search, setSearch] = useState("");

    const createNewFile = () => {
        Inertia.get('/add');
    };

    const serachFile = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const searchParams = new URLSearchParams(formData);

        Inertia.get('/', searchParams);
    };

    const clearSearchResetPage = (event) => {
        Inertia.get('/');
    };

    const handleFileDownload = (filename) => {
        axios.get(`/download_file/${filename}`, {
            responseType: 'blob', // Specify binary response
        })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        })
        .catch(error => {
            console.error('Error downloading file:', error);
        });
    };

    const handleDeleteFile= (id, filename) => {
        if(!confirm(`Вы действительно хотите удалить файл (${filename}) ?`));
        event.preventDefault();

        axios.delete(`/delete_file/${id}`)
        .then()
        .catch();

        Inertia.get('/');
    };

    useEffect(() => {
        setSearch(new URLSearchParams(new URL(window.location.href).search).get('fileName'));
    }, []);

    return (
        <GuestLayout>
            <Card className="mt-2">
                <Card.Header className="bg-dark text-light">Поиск</Card.Header>
                <Card.Body>
                    <form onSubmit={serachFile}>
                        <Row>
                            <Col className="col-10">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="text" name="fileName" value={search ? search : ''} onChange={e => setSearch(e.target.value)} placeholder="Введите название файла" />
                                </Form.Group>
                            </Col>
                            <Col className="col-auto text-end">
                                <Button className="btn btn-success" type="submit">Поиск</Button>
                                <Button className="btn btn-secondary pull-right" onClick={clearSearchResetPage}>Сбросить</Button>
                            </Col>
                        </Row>
                    </form>
                </Card.Body>
            </Card>
            <Card className="mt-3 mb-3">
                <Card.Header className="bg-dark text-light">
                    <Row>
                        <Col className='col-10'>
                            <b>Список файлов </b>
                            <i>(Записи с {files.from} до {files.to} из {files.total} записей, {files.to - files.from + 1} записей на текущей странице)</i>
                        </Col>
                        <Col className="text-end">
                            <Button className="btn btn-success pull-right" onClick={createNewFile}>+ Добавить файл</Button>
                        </Col>
                    </Row>

                </Card.Header>
                <Row className="mt-3">
                    <Col>
                        <Nav className='justify-content-center'>
                            <ul className="pagination">
                                {files.links.map(link => {
                                    return (
                                        <li className={link.active ? "page-item active" : "page-item"} key={link.label}>
                                            <a className="page-link " href={link.url}>
                                                <span aria-hidden="true">{link.label.replace("&raquo;", '').replace("&laquo;",'')}</span>
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </Nav>
                    </Col>
                </Row>
                <Card.Body>
                    <Table striped bordered hover responsive="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Название файла</th>
                                <th>Размер файла</th>
                                <th>Расширение файла</th>
                                <th>Файл</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            { files && files.data.map( (item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.original_name}</td>
                                    <td>{item.size}</td>
                                    <td>{item.mime_type}</td>
                                    <td>
                                        <Image
                                            src={'./storage/' + item.path}
                                            alt="me"
                                            width="100px"
                                            height="100px"
                                        />
                                    </td>
                                    <td>
                                        <ButtonGroup aria-label="Basic example">
                                            <Button variant="primary" onClick={() => handleFileDownload(item.path.replace("uploads/", ''))}>Скачать</Button>
                                            <Button variant="danger" onClick={() => handleDeleteFile(item.id, item.original_name)}>Удалить</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer>
                    <Row>
                        <Col>
                            <Nav className='justify-content-center'>
                                <ul className="pagination">
                                    {files.links.map(link => {
                                        return (
                                            <li className={link.active ? "page-item active" : "page-item"} key={link.label}>
                                                <a className="page-link " href={link.url}>
                                                    <span aria-hidden="true">{link.label.replace("&raquo;", '').replace("&laquo;",'')}</span>
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Nav>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </GuestLayout>
    )
}

import React, { useState, useEffect} from 'react';
import { Inertia } from '@inertiajs/inertia';
import GuestLayout from '../../Layouts/GuestLayout';
import { Card, Form, Table, ButtonGroup, Button, Row, Col } from 'react-bootstrap';

export default function List() {

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
            <Card className="mt-3">
                <Card.Header className="bg-dark text-light">
                    <Row>
                        <Col>
                            <h5>Список файлов</h5>
                        </Col>
                        <Col className="text-end">
                            <Button className="btn btn-success pull-right" onClick={createNewFile}>+ Добавить файл</Button>
                        </Col>
                    </Row>

                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover size="sm">
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
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <td>
                                    <ButtonGroup aria-label="Basic example">
                                        <Button variant="warning">Edit</Button>
                                        <Button variant="primary">Edit</Button>
                                        <Button variant="danger">Delete</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </GuestLayout>
    )
}

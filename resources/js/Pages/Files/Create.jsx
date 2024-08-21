import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import GuestLayout from '../../Layouts/GuestLayout';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

export default function Create() {

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
                            <Form.Control type="text" placeholder="Введите название файла" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <Row>
                        <Col>
                            <Button className="btn btn-secondary" onClick={backToMainList}>Отменить</Button>
                        </Col>
                        <Col className="text-end">
                            <Button className="btn btn-success pull-right" onClick={backToMainList}>Добавить файл</Button>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </GuestLayout>
    )
}

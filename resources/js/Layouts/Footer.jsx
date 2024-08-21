import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {

    const year = new Date().getFullYear();

    return (
        <footer className="fixed-bottom bg-primary">
            <Container>
                <Row>
                    <Col className="text-center">
                        <font className="text-light">
                            &copy; Copyright {year}. All Rights Reserved
                        </font>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

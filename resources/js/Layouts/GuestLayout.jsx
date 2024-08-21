import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

export default function GuestLayout({ children }) {
  return (
    <>
        <Header/>
        <Container className="mt-3">
            { children }
        </Container>
        <Footer/>
    </>
  );
}

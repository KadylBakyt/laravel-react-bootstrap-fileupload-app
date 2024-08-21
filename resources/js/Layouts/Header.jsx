import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
    return (
        <Navbar className="navbar navbar navbar-expand-lg navbar-light bg-primary">
            <Container>
                <Navbar.Brand href="#" >
                    <b className="text-light">React-Bootstrap</b>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default Header;

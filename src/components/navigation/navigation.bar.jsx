import {
    Container,
    Navbar,
    Nav,
    NavDropdown
} from 'react-bootstrap';

import logo from '../../resources/img/logo.svg';

export const NavigationBar = () => (
    <Navbar bg="secondary-grey" variant="dark" className="p-0">
        <Container fluid>
            <Navbar.Brand href="/">
                <img
                    alt="darts score logo"
                    src={logo}
                    width="60"
                    height="60"
                    className="d-inline-block"
                />
                <span>Darts Score</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" className="justify-content-end">
                <Nav>
                    <NavDropdown title="Let's play darts" id="navbarScrollingDropdown" menuVariant="dark">
                        <NavDropdown.Item href="/x01">X01</NavDropdown.Item>
                        <NavDropdown.Item href="/cricket">Cricket</NavDropdown.Item>
                    </NavDropdown>
                    
                    <Nav.Link href="/stats">Statistics</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/admin">Admin</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);
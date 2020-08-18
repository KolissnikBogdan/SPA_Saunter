import React, {useState} from "react";
import { Container, Navbar, Button } from "react-bootstrap"
import PathModalForm from "../ModalForm/PathModalForm";

const Header = () => {
    const [modalShow, setModalShow] = useState(false);

    return(
        <Navbar collapseOnSelect expand="lg" className="p-0">
            <Container className="border-bottom border-dark px-0 py-3">
                <Navbar.Brand href="/">
                    <img
                        alt="Logo"
                        src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/arrows-alt-256.png"
                        width="25"
                        height="25"
                        className="d-inline-block align-top"
                    />{' '}
                    Saunter
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Button onClick={() => setModalShow(true)}>Add path</Button>
                    <PathModalForm show={modalShow} onHide={() => setModalShow(false)} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;
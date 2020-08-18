import React from "react";
import { Container } from "react-bootstrap";
import ListOfItem from "../List/PathItems.jsx"

const MainPage = () => {
    return(
        <Container className="mt-2">
            <ListOfItem/>
        </Container>
    )
}

export default MainPage;
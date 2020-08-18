import React, { useState } from "react";
import PathItem from "./PathItem";
import FullDecript from "./PathFullDescription";

import { firestoreConnect } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux"
import { selectItem } from "../../store/actions/progectActions";
import { compose } from "redux";
import { Spinner, Button, Col, FormControl, InputGroup, Row } from "react-bootstrap";

const PathItems = () => {
    const divStyle = {
        overflowY: 'auto',
        height: '85vh'
    };

    const dispatch = useDispatch();
    const pathDescription = useSelector(state => state.firestore.ordered.pathDescription);

    const [searchQuery, setQuery] = useState("");

    const inputEvent = (event) => {
        const data = event.target.value;
        setQuery(data);
    }

    const filterItems = pathDescription && pathDescription.filter(item => {
        return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.fDescript.toLowerCase().includes(searchQuery.toLowerCase());
    })

    const handleClick = (path) => {
        dispatch(selectItem(path));
    }

    if(pathDescription && pathDescription.length !== 0){
        return (
            <React.Fragment>
                <Row>
                    <Col className="pl-0 border-right border-dark" style={ divStyle }>
                        <InputGroup className="mb-3">
                            <FormControl
                                type="text"
                                placeholder="Type..."
                                aria-describedby="basic-addon2"
                                value={ searchQuery }
                                onChange={ inputEvent }
                            />
                            <InputGroup.Append>
                                <Button variant="outline-secondary">
                                    <img
                                        alt="Logo"
                                        src="https://cdn1.iconfinder.com/data/icons/app-user-interface-line/64/search_focus_user_interface_app_zoom-256.png"
                                        width="25"
                                        height="25"
                                        className="d-inline-block align-top"/>
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                        {filterItems.sort((a, b) => b.favorite - a.favorite).map(item => (
                            <PathItem
                                key={item.id}
                                item={item}
                                onInfoChange={ handleClick }
                            />
                        ))}
                    </Col>
                    <Col style={divStyle}>
                        <FullDecript />
                    </Col>
                </Row>
            </React.Fragment>
        )
    } else {
        return (
            <Row className="justify-content-center align-items-center">
                <h5 className="text-muted text-center text-middle">Add your first route &nbsp;</h5>
                <Spinner className="text-muted" animation="border" />
            </Row>
        )
    }

}

export default compose(firestoreConnect(()=> ['pathDescription']))(PathItems);
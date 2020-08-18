import React from "react";
import MapForm from "../Map/MapContainer";

import { Col, Row, Button, ButtonGroup, Spinner } from "react-bootstrap";
import { deleteItem, selectItem, markFavorite } from "../../store/actions/progectActions";
import { useDispatch, useSelector } from "react-redux";

const FullDecript = () => {
    const dispatch = useDispatch();
    const selectedPath = useSelector(state => state.path.selectedPath);

    const handleRemove = (e) => {
        e.preventDefault();
        dispatch(deleteItem(selectedPath.id));
        dispatch(selectItem(null));
    }

    const handleIsFavorite = () => {
        dispatch(markFavorite(selectedPath.id));
    }

    const containerStyle = {
        width: '100%',
        height: '300px',
        position: 'relative'
    }

    if (selectedPath) {
        return (
            <>
                <Row className="align-items-center" >
                    <Col>
                        <h2>{selectedPath.title}</h2>
                    </Col>
                    <Col className="text-right">
                        <h5>{selectedPath.pathLength}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col className="pb-2">
                        {selectedPath.fDescript}
                    </Col>
                </Row>
                <div>
                    <MapForm containerStyle={containerStyle} route={selectedPath.route} onlyView={true}/>
                </div>
                <Row className="float-right">
                    <ButtonGroup vertical>
                        <Button variant="link" onClick={ handleIsFavorite } className="text-right">Set/unset favorite</Button>
                        <Button variant="link" style={{color: 'red'}} onClick={ handleRemove } className="text-right">Delete</Button>
                    </ButtonGroup>
                </Row>
            </>
        )
    } else {
        return (
            <Row className="justify-content-center align-items-center">
                <h5 className="text-muted text-center text-middle">Select path to review &nbsp;</h5>
                <Spinner className="text-muted" animation="border" />
            </Row>
        )
    }
}

export default FullDecript;
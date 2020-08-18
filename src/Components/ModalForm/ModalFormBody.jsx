import React, { useEffect } from "react";
import MapForm from "../Map/MapContainer";

import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectItem } from "../../store/actions/progectActions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import usePrevious from "../../hooks/usePrevious";
import useForm from "../../hooks/useForm";
import computeDistance from "../../utils/computeDistance";
import validate from "../../utils/validationForm";
import MapContainer from "../Map/MapContainer";

const ModalFormBody = (props) => {
    const { handleChange, handleMapChange, handleSubmit, state, errors } = useForm(
        submit,
        validate
    );

    const {
        loadingElement,
        containerElement,
        mapElement,
        defaultCenter,
        defaultZoom
    } = props;

    const dispatch = useDispatch();
    const pathDescription = useSelector(state => state.firestore.ordered.pathDescription);

    useEffect(() => {
        if(state.route.length > 1){
            computeDistance(state.route);
        }
    }, [handleMapChange, state.route])

    function submit() {
        dispatch(addItem(state));
        props.onHide();
    }

    const prevPathState = usePrevious(pathDescription);

    useEffect(() => {
        if(prevPathState && pathDescription && pathDescription.length !== 0) {
            if(prevPathState.pathDescription !== pathDescription) {
                let newArr = pathDescription.slice().sort((a, b) => b.createAt - a.createAt);
                dispatch(selectItem(newArr[0]));
            }
        }
    }, [pathDescription, selectItem]);

    const places = [
        {latitude: 49.436367,longitude: 32.057953},
        {latitude: 49.442582,longitude: 32.057341},
        {latitude: 49.443256,longitude: 32.051919}
    ]

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Row>
                <Col>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Text input" onChange={handleChange}/>
                        <Form.Text className="text-muted text-right">
                            {errors.title && <b className="error" style={{color: 'red'}}>{errors.title}</b>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="sDescript">
                        <Form.Label>Short description</Form.Label>
                        <Form.Control as="textarea" rows="2" placeholder="Text area" onChange={handleChange}/>
                        <Form.Text className="text-muted text-right">
                            {errors.sDescript && <b className="error" style={{color: 'red'}}>{`${errors.sDescript} `}</b>} Limit {state.sDescript.length} of 160
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="fDescript">
                        <Form.Label>Full description</Form.Label>
                        <Form.Control as="textarea" rows="5" placeholder="Text area" onChange={handleChange}/>
                        <Form.Text className="text-muted text-right">
                            {errors.fDescript && <b className="error" style={{color: 'red'}}>{errors.fDescript}</b>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="pathLength" className="my-5 text-center">
                        <Form.Label style={{ fontSize: '1.5rem' }}>
                            <img
                                alt="mapImage"
                                src="https://cdn0.iconfinder.com/data/icons/map-36/20/map_marker-256.png"
                                width="20"
                                height="20"
                                className="d-inline-block align-center"
                            />{' '} Length:  {state.route.length > 1 ? computeDistance(state.route) :
                            errors.pathLength && <b className="error" style={{color: 'red'}}>{errors.pathLength}</b>}
                        </Form.Label>
                    </Form.Group>

                    <Row className="justify-content-center">
                        <Button variant="outline-primary" size="lg" type="submit" >
                            <img
                                alt="checkImage"
                                src="https://cdn4.iconfinder.com/data/icons/dortmund/Dortmund-32x32/check.png"
                                width="10"
                                height="10"
                                className="d-inline-block align-center"
                            />{' '} Add path
                        </Button>
                    </Row>
                </Col>
                <Col>
                    <MapContainer
                        googleMapURL={
                        'https://maps.googleapis.com/maps/api/js?key=' +
                        'AIzaSyCSnZh4D_rLPyato0wJ79ch-vdxslft4CI' +
                        '&libraries=geometry,drawing,places'}
                        loadingElement={loadingElement || <div style={{height: `100%`}}/>}
                        containerElement={containerElement || <div style={{height: "80vh"}}/>}
                        mapElement={mapElement || <div style={{height: `100%`}}/>}
                        defaultCenter={defaultCenter || {lat: 49.453115, lng: 32.045652}}
                        defaultZoom={defaultZoom || 14}
                        onMapChange={ handleMapChange }/>
                </Col>
            </Form.Row>
        </Form>
    )
}

export default compose(firestoreConnect(()=> ['pathDescription']))(ModalFormBody);
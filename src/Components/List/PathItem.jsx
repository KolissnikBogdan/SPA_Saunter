import React from "react";
import { Tooltip, OverlayTrigger, Col, Row, Card } from "react-bootstrap";

const PathItem = ({ item, onInfoChange }) => {
    const handleClick = () => {
        onInfoChange(item);
    }

    const favoriteIcon = item.favorite ? <i><img
        alt="Logo"
        src="https://cdn2.iconfinder.com/data/icons/weather-blue-filled-line/32/weather_star_bookmark_save_favorite_full_rate-256.png"
        width="15"
        height="15"
        className="d-inline-block align-content-center"/></i> : null;

    return (
        <React.Fragment>
            <Card as="a"
                  style={{cursor: 'pointer'}}
                  className={'mb-2'}
                  onClick={ handleClick }>
                <Card.Body>
                    <Row className="align-items-center">
                        <Col className="col-xl-1 col-md-auto col-sm-2">
                            <img
                                alt="Logo"
                                src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/arrows-alt-256.png"
                                width="25"
                                height="25"
                                className="d-inline-block align-top"/>
                        </Col>
                        <Col className="col-xl-7 col-md-6 col-sm-auto">
                            <h5>{favoriteIcon} {item.title}</h5>
                            <OverlayTrigger overlay={<Tooltip><p className="text-left">{item.sDescript}</p></Tooltip>}>
                                <p className="text-truncate">
                                    {item.sDescript}
                                </p>
                            </OverlayTrigger>
                        </Col>
                        <Col className="col-xl-4 text-right col-md-auto col-sm-auto">
                            <label>{item.pathLength}</label>
                            <img
                                alt="Logo"
                                src="https://cdn4.iconfinder.com/data/icons/developer-set-3/128/right-512.png"
                                width="25"
                                height="25"
                                className="d-inline-block pull-right"
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
}

export default PathItem;
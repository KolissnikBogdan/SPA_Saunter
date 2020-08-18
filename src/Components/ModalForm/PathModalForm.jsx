import React from "react";
import { Modal } from "react-bootstrap";
import ModalFormBody from "./ModalFormBody";
import "./PathModalForm.css";

const PathModalForm = (props) => {
    return (
        <Modal {...props} dialogClassName="modal-90w modal-p">
            <Modal.Header closeButton>
                <Modal.Title>
                    Add new path
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ModalFormBody {...props}/>
            </Modal.Body>
        </Modal>
    );
}

export default PathModalForm;
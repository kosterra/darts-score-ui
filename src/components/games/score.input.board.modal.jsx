import { Fragment, useState, useEffect } from 'react';
import {
    Button,
    Modal
} from 'react-bootstrap';

const ScoreInputBoardModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Fragment>
            <div className="mb-2 ms-1 d-flex align-items-center gap-2">
                <span className="fs-8 fw-600">Click the dartboard or enter score</span>
                <i onClick={handleShow} className="fas fa-question-circle" style={{cursor: "pointer"}}></i>
            </div>

            <Modal show={show}
                onHide={handleClose}
                fullscreen={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton closeVariant="white">
                    <Modal.Title className="h6">How to manually add a dart score?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="fs-7">If you missed, simply enter 0.</p>
                    <p className="fs-7">For any other scores add:</p>
                    <p className="fs-7">"S" (for a single), "D" (for a double) or "T" (for a treble) before your score. So "D10" scores 20 points, "T20" scores 60 ...</p>
                    <p className="fs-7"><strong>Note that:</strong></p>
                    <p className="fs-7">The inner BULLSEYE (50 points) = "D25"<br /> and the outer BULLSEYE (25 points) = "S25".</p>
                </Modal.Body>
                <Modal.Footer className="p-1">
                    <Button variant="primary-green" onClick={handleClose} className="p-2">
                        <i className="fas fa-thumbs-up px-1"></i>
                        Got It
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default ScoreInputBoardModal;
import { Fragment, useState, useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { TiInfoLarge } from "react-icons/ti";

const ScoreInputBoardModal = () => {
    const op = useRef(null);

    return (
        <Fragment>
            <div className="mb-2 ms-1 d-flex align-items-center">
                <span className="col-10 text-shade100 fs-8 fw-semibold d-inline-block text-truncate">Click the dartboard or enter score</span>
                <div className="col-2 d-flex justify-content-end">
                    <Button
                        type="button"
                        severity="help"
                        size="small"
                        rounded
                        className="p-1 me-2 fw-semibold fs-6"
                        onClick={(e) => op.current.toggle(e)}
                    >
                        <TiInfoLarge />
                    </Button>
                </div>
            </div>
            
            <OverlayPanel ref={op} showCloseIcon>
                <div className="fs-8">
                    <p>If you missed, simply enter <strong>0</strong>.</p>
                    <p>For any other scores add:</p>
                    <ul>
                        <li><strong>S</strong> for a single</li>
                        <li><strong>D</strong> for a double</li>
                        <li><strong>T</strong> for a treble</li>
                    </ul>
                    <p>So "D10" scores 20 points, "T20" scores 60 ...</p>
                    <p className="fs-7 mt-4"><strong>Note that:</strong></p>
                    <p>The inner BULLSEYE (50 points) = <strong>D25</strong><br /> and the outer BULLSEYE (25 points) = <strong>S25</strong>.</p>
                </div>
            </OverlayPanel>
        </Fragment>
    )
}

export default ScoreInputBoardModal;
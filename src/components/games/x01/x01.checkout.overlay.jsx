import React, { useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { TiInfoLarge } from "react-icons/ti";

import Checkout from './x01.checkout';

export default function CheckoutOverlay(props) {
    const {
        score = 501,
    } = props;

    const op = useRef(null);

    return (
        <div className="card flex justify-content-center">
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
            <OverlayPanel ref={op} showCloseIcon>
                <Checkout score={score} />
            </OverlayPanel>
        </div>
    );
}
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { TiInfoLarge } from "react-icons/ti";

const ATCHelp = () => {

    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('center');
    const footerContent = (
        <div>
            <Button label="Got it!" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
        </div>
    );

    const show = (position) => {
        setPosition(position);
        setVisible(true);
    };

    return (
        <div>
            <Button
                type="button"
                severity="help"
                size="small"
                rounded
                className="p-1 me-2 fw-semibold fs-6"
                onClick={() => show('bottom-right')}
            >
                <TiInfoLarge />
            </Button>
            <Dialog
                header="Training Rules"
                visible={visible}
                position={position}
                style={{ width: '40vw' }}
                breakpoints={{ '960px': '50vw', '641px': '100vw' }}
                onHide={() => setVisible(false)}
                footer={footerContent}
                draggable={false}
                resizable={false}>
                <p className="m-0">
                    Hit every double on the board, beginning from 1 around the clock to 20 and then the bullseye in order. Ther is no Dartboard to save your hits.
                    Just start the stopwatch and stop once you have finished the challenge.
                    <br /><br />
                    <span className="fs-6 fw-semibold">Modes:</span>
                    <ul className="mt-3">
                        <li><strong>Single:</strong> Hit single values only. Double and triple hits are not counted as a hit. The last hit must be the single bull.</li>
                        <li><strong>Double:</strong> Hit double values only. Single and tripple hits are not counted as a hit. The last hit must be the double bull.</li>
                        <li><strong>Triple:</strong> Hit triple values only. Single and double hits are not counted as a hit. The last hit must be the double bull.</li>
                        <li><strong>All:</strong> Hitting singles, doubles and triples are allowed. The last hit must be the single or double bull.</li>
                    </ul>
                </p>
            </Dialog>
        </div>
    )
}

export default ATCHelp;
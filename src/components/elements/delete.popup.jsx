import { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const DeletePopup = (props) => {
    const {
        header = 'Delete Object',
        message = 'unknown',
        data,
        handleDelete
    } = props;

    const [showDialog, setShowDialog] = useState(false);

    return (
        <div>
            <Dialog
                header={header}
                visible={showDialog}
                blockScroll={true}
                onHide={() => setShowDialog(false)}
                draggable={false}
            >
                <span>Are you sure you want to delete {message}?</span>
                <Button severity="secondary" onClick={() => setShowDialog(false)}>
                    Cancel
                </Button>
                <Button severity="danger" onClick={() => handleDelete(data)}>
                    Sure!
                </Button>
            </Dialog>

            <div className="d-flex justify-content-center">
                <Button
                    severity="danger"
                    icon="pi pi-trash"
                    title="Show _raw data"
                    onClick={() => setShowDialog(true)}
                />
            </div>
        </div>
    );
};

export default DeletePopup;
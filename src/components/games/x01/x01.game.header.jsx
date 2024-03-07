import { Fragment } from "react";

const X01GameHeader = (props) => {
    const {
        setMode,
        numberOfSets,
        legMode,
        numberOfLegs,
        legInMode,
        legOutMode
    } = props

    return (
        <Fragment>
            <div className="d-flex justify-content-center mb-4">
                <div className="d-flex flex-column align-items-center rounded-bottom-4 bg-shade701 p-2 px-4">
                    <div className="text-shade100 fs-7">{setMode} <strong>{numberOfSets}</strong> Set{numberOfSets > 1 && 's'} - {legMode} <strong>{numberOfLegs}</strong> Leg{numberOfLegs > 1 && 's'}</div>
                    <div className="text-shade400 fs-8 pt-1">{legInMode} / {legOutMode}</div>
                </div>
            </div>
        </Fragment>
    );
};

export default X01GameHeader;
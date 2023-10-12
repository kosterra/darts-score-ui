import React, { Fragment } from "react";

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
                <div className="d-flex flex-column align-items-center bbr-12 bg-tertiary-grey p-2">
                    <div className="fs-7">{ setMode } <strong>{ numberOfSets }</strong> Set{ numberOfSets > 1 && 's' } - { legMode } <strong>{ numberOfLegs }</strong> Leg{ numberOfLegs > 1 && 's'}</div>
                    <div className="fs-9 pt-1">{ legInMode } / { legOutMode }</div>
                </div>
            </div>
        </Fragment>
    );
};

export default X01GameHeader;
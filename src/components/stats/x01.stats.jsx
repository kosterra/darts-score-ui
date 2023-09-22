import React, { Fragment } from 'react';

const X01Stats = (props) => {
    const { emptyText } = props

    return (
        <Fragment>
            <div className="d-flex justify-content-md-center align-items-center p-2 text-white">
                { emptyText }
            </div>
        </Fragment>
    );
}

export default X01Stats;
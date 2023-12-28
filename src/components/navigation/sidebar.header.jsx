import React, { Fragment } from 'react';
import logo from '/logo.svg';

const SidebarHeader = () => {

  return (
    <Fragment>
        <div className="d-flex justify-content-start align-items-center px-2">
            <img
                alt="darts score logo"
                src={logo}
                width="60"
                height="60"
                className="d-inline-block"
            />
            <span className="ps-3 text-white fw-600 fs-7">Darts Score</span>
        </div>
    </Fragment>
  );
};

export default SidebarHeader;
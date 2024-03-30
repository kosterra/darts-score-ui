import { Fragment } from 'react';
import { Avatar } from 'primereact/avatar';
import { FaTrophy } from "react-icons/fa6";

const X01StatsScoreBoardPlayer = (props) => {
    const {
        player,
        hasWonGame = false
    } = props

    return (
        <Fragment>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="position-relative">
                    <Avatar
                        label={(((player || {}).firstname || '') + ' ' + ((player || {}).lastname || '')).split(" ").map((n) => n[0]).join("")}
                        image={player || {}.profileImg || ''}
                        shape="circle"
                        size="xlarge"
                        style={{ width: '6rem', height: '6rem' }}
                        className="bg-shade700 mx-3"
                    />
                    <span className="position-absolute top-80 start-85 translate-middle">
                        {hasWonGame &&
                            <FaTrophy className="display-5 text-gold mt-2" />
                        }
                    </span>
                </div>
                <div className="mt-2 text-shade100 fs-6 fw-semibold">
                    {(player || {}).nickname || 'N/A'}
                </div>
                <div className="text-shade500 fs-7 fw-semibold">
                    {(player || {}).firstname || ''} {(player || {}).lastname || ''}
                </div>
            </div>
        </Fragment>
    );
};

export default X01StatsScoreBoardPlayer;
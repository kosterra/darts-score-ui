import { Fragment } from 'react';
import Avatar from 'react-avatar';

const X01StatsScoreBoardPlayer = (props) => {

    const {
        player
    } = props

    return (
        <Fragment>
            <div className="d-flex flex-column justify-content-center">
                <Avatar
                    name={`${player.firstname} ${player.lastname}`}
                    src={`${player.profileImg}`}
                    size="80"
                    round={true}
                    color="#565656"
                    textSizeRatio={0.2}
                    className="align-self-center"
                />
                <div className="mt-2 align-self-center fs-7 fw-semibold">
                    {player.nickname}
                </div>
                <div className="align-self-center fs-7 fw-semibold">
                    {player.firstname} {player.lastname}
                </div>
            </div>
        </Fragment>
    );
};

export default X01StatsScoreBoardPlayer;
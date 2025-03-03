import { useContext, useState, useEffect } from 'react';
import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag';
import { FaCircle, FaRegCircle } from "react-icons/fa";

import CricketContext from '../../../utils/cricket.context';

const CricketScoreBoard = (props) => {
    const { playerId, idx } = props
    const {
        game,
        players,
        getCurrentThrowScore,
        getCurrentSectionHit,
        checkSectionClosed
    } = useContext(CricketContext);

    const [player] = useState(players.find(player => player.id === playerId));
    const [playerModel, setPlayerModel] = useState(game.playerModels[playerId]);
    const [score, setScore] = useState(game.playerModels[playerId].score);
    const [sectionHit, setSectionHit] = useState(game.playerModels[playerId].sectionHit);

    const getNumberTemplate = (title, number) => { 
        return (
            <div className="d-flex flex-row">
                <div className={`col-4 d-flex justify-content-center text-shade100 fw-semibold p-0 ${checkSectionClosed(number) ? 'text-red text-decoration-line-through' : ''}`}>
                    {title}
                </div>
                <div className={`col-8 d-flex justify-content-center align-items-center gap-1 p-0`}>
                    {[...Array(sectionHit[number.toString()] > 3 ? 3 : sectionHit[number.toString()])].map((e, i) => (
                        <FaCircle key={`number-filled-${i}`} className="text-gold" />
                    ))}
                    {[...Array(sectionHit[number.toString()] >= 3 ? 0 : 3 - sectionHit[number.toString()])].map((e, i) => (
                        <FaRegCircle key={`number-unfilled-${i}`} className="text-gold" />
                    ))}
                </div>
            </div>
        );
    }

    useEffect(() => {
        const clickEnterSubmitForm = (e) => {
            if (e.key === 'Enter') {
                document.getElementById('submit-throws').click();
            }
        }

        document.addEventListener('keyup', clickEnterSubmitForm);

        return () => {
            document.removeEventListener('keyup', clickEnterSubmitForm);
        }
    }, [])

    useEffect(() => {
        if (game.currentPlayerTurn === playerId) {
            setScore(getCurrentThrowScore());
            setSectionHit(getCurrentSectionHit());
        } else {
            setScore(game.playerModels[playerId].score);
            setSectionHit(game.playerModels[playerId].sectionHit);
        }

        setPlayerModel(game.playerModels[playerId])
        // eslint-disable-next-line
    }, [game.currentThrow]);

    return (
        <div className="container-fluid py-xl-2 px-xl-2">
            {players && player &&
                <div className={`row pt-2 pb-2 ${game.players.length === 2 && Number(idx) === 1 ? 'flex-md-row-reverse' : ''}`}>
                    <div className="col-4 d-flex flex-column align-items-center justify-content-center p-0">
                        <div className="col-12 d-flex flex-column justify-content-center">
                            <div className="col-12 d-flex justify-content-center mb-xl-2">
                                <Avatar
                                    label={(player.firstname + ' ' + player.lastname).split(" ").map((n) => n[0]).join("")}
                                    image={player.profileImg}
                                    shape="circle"
                                    size="xlarge"
                                    style={{ maxWidth: '5.2rem', maxHeight: '5.2rem' }}
                                    className="w-100 h-100 ratio ratio-1x1"
                                />
                            </div>
                            <div className="col-12 d-flex flex-column justify-content-center align-items-center">
                                <div>
                                    <span className="fs-6 text-shade100 fw-semibold">{player.nickname}</span>
                                </div>
                                <div>
                                    <span className="fs-7 text-shade500 text-truncate" data-toggle="tooltip" title={player.firstname + ' ' + player.lastname}>
                                        {player.firstname + ' ' + player.lastname}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex col-12 d-flex justify-content-center align-items-center mt-3 gap-1">
                            {game.currentPlayerTurn === playerId && (
                                <Tag value="&nbsp;Current Player&nbsp;" severity="success" rounded className="text-truncate fs-9" />
                            )}
                            {game.startingPlayerLeg !== playerId && game.currentPlayerTurn !== playerId && (
                                <Tag value="&nbsp;" severity="" rounded className="text-truncate bg-transparent fs-9" />
                            )}
                        </div>
                    </div>
                    <div className="col-4 d-flex justify-content-center align-items-center">
                        <div className="display-3 text-shade100 fw-semibold" >
                            {game.currentPlayerTurn === playerId ? score : playerModel.score}
                        </div>
                    </div>
                    <div className="col-4 p-0">
                        {getNumberTemplate('20', 20)}
                        {getNumberTemplate('19', 19)}
                        {getNumberTemplate('18', 18)}
                        {getNumberTemplate('17', 17)}
                        {getNumberTemplate('16', 16)}
                        {getNumberTemplate('15', 15)}
                        {getNumberTemplate('BULL', 25)}
                    </div>
                </div>
            }
        </div>
    );
}

export default CricketScoreBoard
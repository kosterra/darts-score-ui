import { useContext, useState, useEffect } from 'react';
import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag';
import { FaCircle, FaRegCircle } from "react-icons/fa";

import X01Context from '../../../utils/x01.context';

const X01ScoreBoard = (props) => {
    const { playerId, idx } = props
    const {
        game,
        players,
        getCurrentThrowScore
    } = useContext(X01Context);

    const [player] = useState(players.find(player => player.id === playerId));
    const [playerModel, setPlayerModel] = useState(game.playerModels[playerId]);
    const [score, setScore] = useState(game.playerModels[playerId].score);

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
        let totalScore = getCurrentThrowScore();
        let currentPlayerScore = game.playerModels[game.currentPlayerTurn].score;
        let newCurrentScore = currentPlayerScore - totalScore;
        setScore(newCurrentScore);
        setPlayerModel(game.playerModels[playerId])
        // eslint-disable-next-line
    }, [game.currentThrow]);

    return (
        <div className="container-fluid py-xl-2 px-xl-2">
            {players && player &&
                <div className={`row pt-2 pb-2 ${game.players.length === 2 && Number(idx) === 1 ? 'flex-md-row-reverse' : ''}`}>
                    <div className="col-7 col-xl-6 d-flex flex-column align-items-center justify-content-center p-0">
                        <div className="col-12 d-flex flex-row flex-xxl-column justify-content-center">
                            <div className="col-3 col-md-4 col-xxl-12 d-flex justify-content-center mb-xl-2">
                                <Avatar
                                    label={(player.firstname + ' ' + player.lastname).split(" ").map((n) => n[0]).join("")}
                                    image={player.profileImg}
                                    shape="circle"
                                    size="xlarge"
                                    style={{ maxWidth: '5.2rem', maxHeight: '5.2rem' }}
                                    className="w-100 h-100 ratio ratio-1x1"
                                />
                            </div>
                            <div className="col-7 col-md-8 col-xxl-12 d-flex flex-column justify-content-center align-items-center">
                                <div className="col-4 d-flex justify-content-center">
                                    <span className="fs-6 text-shade100 fw-semibold">{player.nickname}</span>
                                </div>
                                <div className="col-8 d-flex justify-content-center text-center">
                                    <span className="fs-7 text-shade500 text-truncate" data-toggle="tooltip" title={player.firstname + ' ' + player.lastname}>
                                        {player.firstname + ' ' + player.lastname}
                                    </span>
                                </div>
                            </div>
                            <div className="col-1 d-flex d-md-none d-flex flex-column justify-content-center align-items-center gap-1">
                                {game.startingPlayerLeg === playerId && (
                                    <Tag value="L" severity="info" rounded className="fs-9" />
                                )}
                                {game.currentPlayerTurn === playerId && (
                                    <Tag value="P" severity="success" rounded className="fs-9" />
                                )}
                            </div>
                        </div>
                        <div className="d-none d-md-flex col-12 d-flex justify-content-center align-items-center mt-3 gap-1">
                            {game.startingPlayerLeg === playerId && (
                                <Tag value="&nbsp;Leg Owner&nbsp;" severity="info" rounded className="text-truncate fs-9"/>
                            )}
                            {game.currentPlayerTurn === playerId && (
                                <Tag value="&nbsp;Current Player&nbsp;" severity="success" rounded className="text-truncate fs-9" />
                            )}
                            {game.startingPlayerLeg !== playerId && game.currentPlayerTurn !== playerId && (
                                <Tag value="&nbsp;" severity="" rounded className="text-truncate bg-transparent fs-9" />
                            )}
                        </div>
                    </div>
                    <div className="col-5 col-xl-6 d-flex flex-row flex-md-column align-items-center justify-content-center p-0">
                        <div className="col-6 col-xl-12 d-flex justify-content-center align-items-center">
                            <div className="display-3 text-shade100 fw-semibold" >
                                {game.currentPlayerTurn === playerId ?
                                    score === 1 || score < 0 ? 'BUST' : score : playerModel.score
                                }
                            </div>
                        </div>
                        <div className="col-6 col-xl-12 d-flex flex-column flex-md-row align-items-center justify-content-center gap-1 gap-md-3 mt-xl-2">
                            <div>
                                <div className="d-flex justify-content-center text-shade100 fw-semibold mb-02">
                                    LEGS
                                </div>
                                {game.numberOfLegs <= 5 && game.legMode === 'Best of' &&
                                    <div className="d-flex justify-content-center gap-1 fs-7 mt-1">
                                        {[...Array(game.playerModels[playerId].currentSetLegsWon)].map((e, i) => (
                                            <FaCircle key={`leg-filled-${i}`} className="fas fa-circle m-01 text-gold" />
                                        ))}
                                        {[...Array(Math.round(game.numberOfLegs / 2) - game.playerModels[playerId].currentSetLegsWon)].map((e, i) => (
                                            <FaRegCircle key={`leg-unfilled-${i}`} className="far fa-circle m-01 text-gold" />
                                        ))}
                                    </div>
                                }
                                {game.numberOfLegs <= 4 && game.legMode === 'First to' &&
                                    <div className="d-flex justify-content-center gap-1 fs-7 mt-1">
                                        {[...Array(game.playerModels[playerId].currentSetLegsWon)].map((e, i) => (
                                            <FaCircle key={`set-filled-${i}`} className="fas fa-circle m-01 text-gold" />
                                        ))}
                                        {[...Array(game.numberOfLegs - game.playerModels[playerId].currentSetLegsWon)].map((e, i) => (
                                            <FaRegCircle key={`leg-unfilled-${i}`} className="far fa-circle m-01 text-gold" />
                                        ))}
                                    </div>
                                }
                                {((game.numberOfLegs > 4 && game.legMode === 'First to') || (game.numberOfLegs > 5 && game.legMode === 'Best of')) &&
                                    <div className="d-flex justify-content-center">
                                        <span className="text-value">{game.playerModels[playerId].currentSetLegsWon}</span>
                                    </div>
                                }
                            </div>
                            <div>
                                <div className="d-flex justify-content-center text-shade100 fw-semibold mb-02">
                                    SETS
                                </div>
                                {game.numberOfSets <= 5 && game.setMode === 'Best of' &&
                                    <div className="d-flex justify-content-center gap-1 fs-7 mt-1">
                                        {[...Array(game.playerModels[playerId].setsWon)].map((e, i) => (
                                            <FaCircle key={`set-filled-${i}`} className="fas fa-circle m-01 text-gold" />
                                        ))}
                                        {[...Array(Math.round(game.numberOfSets / 2) - game.playerModels[playerId].setsWon)].map((e, i) => (
                                            <FaRegCircle key={`set-unfilled-${i}`} className="far fa-circle m-01 text-gold" />
                                        ))}
                                    </div>
                                }
                                {game.numberOfSets <= 4 && game.setMode === 'First to' &&
                                    <div className="d-flex justify-content-center gap-1 fs-7 mt-1">
                                        {[...Array(game.playerModels[playerId].setsWon)].map((e, i) => (
                                            <FaCircle key={`set-filled-${i}`} className="fas fa-circle m-01 text-gold" />
                                        ))}
                                        {[...Array(game.numberOfSets - game.playerModels[playerId].setsWon)].map((e, i) => (
                                            <FaRegCircle key={`set-unfilled-${i}`} className="far fa-circle m-01 text-gold" />
                                        ))}
                                    </div>
                                }
                                {((game.numberOfSets > 4 && game.setMode === 'First to') || (game.numberOfSets > 5 && game.setMode === 'Best of')) &&
                                    <div className="d-flex justify-content-center">
                                        <span className="text-value text-shade100">{game.playerModels[playerId].setsWon}</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default X01ScoreBoard
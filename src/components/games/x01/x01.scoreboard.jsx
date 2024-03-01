import React, { useContext, useState, useEffect } from 'react';
import { Avatar } from 'primereact/avatar';
import { FaCircle, FaRegCircle, FaPlayCircle, FaUserCircle } from "react-icons/fa";

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
        <div className="container">
            {players && player &&
                <div className={`row justify-content-md-center pt-2 pb-2 ${game.players.length === 2 && Number(idx) === 1 ? 'flex-row-reverse' : ''}`}>
                    <div className="col d-flex flex-column justify-content-center">
                        <div className="d-flex justify-content-center display-3 fw-semibold mb-2">
                            <Avatar
                                label={(player.firstname + ' ' + player.lastname).split(" ").map((n) => n[0]).join("")}
                                image={player.profileImg}
                                shape="circle"
                                size="xlarge"
                                style={{ width: '6rem', height: '6rem' }}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <span className="fs-6 text-shade100 fw-semibold">{player.nickname}</span>
                        </div>
                        <div className="d-flex justify-content-center">
                            <span className="fs-7 text-shade500">{player.firstname + ' ' + player.lastname}</span>
                        </div>
                        <div className="d-flex justify-content-center">
                            {game.startingPlayerLeg === playerId && (
                                <FaUserCircle className="text-blue m-02 mt-2" />
                            )}
                            {game.currentPlayerTurn === playerId && (
                                <FaPlayCircle className="text-primary m-02 mt-2" />
                            )}
                            {game.startingPlayerLeg !== playerId && game.currentPlayerTurn !== playerId && (
                                <FaCircle className="opacity-0 m-02 mt-2" />
                            )}
                        </div>
                    </div>
                    <div className="col p-0">
                        <div className="d-flex justify-content-center align-items-center h-50">
                            <div className="display-3 text-shade100 fw-semibold mt-3" >
                                {game.currentPlayerTurn === playerId ?
                                    score === 1 || score < 0 ? 'BUST' : score : playerModel.score
                                }
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center gap-3 h-50">
                            <div>
                                <div className="d-flex justify-content-center text-shade100 fw-semibold mb-02">
                                    LEGS
                                </div>
                                {game.numberOfLegs <= 5 && game.legMode === 'Best of' &&
                                    <div className="d-flex justify-content-center fs-8">
                                        {[...Array(game.playerModels[playerId].currentSetLegsWon)].map((e, i) => (
                                            <FaCircle key={`leg-filled-${i}`} className="fas fa-circle m-01 text-gold" />
                                        ))}
                                        {[...Array(Math.round(game.numberOfLegs / 2) - game.playerModels[playerId].currentSetLegsWon)].map((e, i) => (
                                            <FaRegCircle key={`leg-unfilled-${i}`} className="far fa-circle m-01 text-gold" />
                                        ))}
                                    </div>
                                }
                                {game.numberOfLegs <= 4 && game.legMode === 'First to' &&
                                    <div className="d-flex justify-content-center fs-8">
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
                                    <div className="d-flex justify-content-center fs-8">
                                        {[...Array(game.playerModels[playerId].setsWon)].map((e, i) => (
                                            <FaCircle key={`set-filled-${i}`} className="fas fa-circle m-01 text-gold" />
                                        ))}
                                        {[...Array(Math.round(game.numberOfSets / 2) - game.playerModels[playerId].setsWon)].map((e, i) => (
                                            <FaRegCircle key={`set-unfilled-${i}`} className="far fa-circle m-01 text-gold" />
                                        ))}
                                    </div>
                                }
                                {game.numberOfSets <= 4 && game.setMode === 'First to' &&
                                    <div className="d-flex justify-content-center fs-8">
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
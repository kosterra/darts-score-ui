import React, { useContext, useState, useEffect } from 'react';

import Avatar from 'react-avatar';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

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
        <Container>
            {players && player &&
                <Row className={`justify-content-md-center pt-2 pb-2 ${game.players.length === 2 && Number(idx) === 1 ? 'flex-row-reverse' : ''}`}>
                    <Col className="d-flex flex-column justify-content-center align-items-center h-100">
                        <Row>
                            <div className="d-flex justify-content-center align-items-center h-50">
                                <div className="display-5 fw-semibold mt-1" >
                                    {game.currentPlayerTurn === playerId ? score : playerModel.score}
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <div>
                                    <div className="d-flex justify-content-center display-3 fw-semibold mb-2">
                                        <Avatar
                                            name={player.firstname + ' ' + player.lastname}
                                            src={player.profileImg}
                                            size="80"
                                            round={true}
                                            color="#565656"
                                            textSizeRatio={0.2}
                                            className="align-self-center"
                                        />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <span className="fs-5 fw-semibold">{player.nickname}</span>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <span className="fs-7">{player.firstname + ' ' + player.lastname}</span>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        {game.currentPlayerTurn === playerId && (
                                            <i className="fas fa-circle text-primary m-02 mt-2"></i>
                                        )}
                                        {game.startingPlayerLeg !== playerId && game.currentPlayerTurn !== playerId && (
                                            <i className="fas fa-circle opacity-0 m-02 mt-2"></i>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="d-flex flex-column justify-content-center">
                        <Row>
                            <div className="d-flex flex-column align-items-center justify-content-center w-100">
                                <div className="d-flex align-items-center w-75">
                                    <div className={`d-flex justify-content-center fw-semibold mb-02 w-50 ${checkSectionClosed(20) ? 'text-red text-decoration-line-through' : ''}`}>
                                        20
                                    </div>
                                    <div className={`d-flex justify-content-start align-items-center fs-8 w-50`}>
                                        {[...Array(sectionHit["20"] > 3 ? 3 : sectionHit["20"])].map((e, i) => (
                                            <i key={`number-filled-${i}`} className="fas fa-circle m-01 text-gold"></i>
                                        ))}
                                        {[...Array(sectionHit["20"] >= 3 ? 0 : 3 - sectionHit["20"])].map((e, i) => (
                                            <i key={`number-unfilled-${i}`} className="far fa-circle m-01 text-gold"></i>
                                        ))}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center w-75">
                                    <div className={`d-flex justify-content-center fw-semibold mb-02 w-50 ${checkSectionClosed(19) ? 'text-red text-decoration-line-through' : ''}`}>
                                        19
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center fs-8 w-50">
                                        {[...Array(sectionHit["19"] > 3 ? 3 : sectionHit["19"])].map((e, i) => (
                                            <i key={`number-filled-${i}`} className="fas fa-circle m-01 text-gold"></i>
                                        ))}
                                        {[...Array(sectionHit["19"] >= 3 ? 0 : 3 - sectionHit["19"])].map((e, i) => (
                                            <i key={`number-unfilled-${i}`} className="far fa-circle m-01 text-gold"></i>
                                        ))}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center w-75">
                                    <div className={`d-flex justify-content-center fw-semibold mb-02 w-50 ${checkSectionClosed(18) ? 'text-red text-decoration-line-through' : ''}`}>
                                        18
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center fs-8 w-50">
                                        {[...Array(sectionHit["18"] > 3 ? 3 : sectionHit["18"])].map((e, i) => (
                                            <i key={`number-filled-${i}`} className="fas fa-circle m-01 text-gold"></i>
                                        ))}
                                        {[...Array(sectionHit["18"] >= 3 ? 0 : 3 - sectionHit["18"])].map((e, i) => (
                                            <i key={`number-unfilled-${i}`} className="far fa-circle m-01 text-gold"></i>
                                        ))}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center w-75">
                                    <div className={`d-flex justify-content-center fw-semibold mb-02 w-50 ${checkSectionClosed(17) ? 'text-red text-decoration-line-through' : ''}`}>
                                        17
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center fs-8 w-50">
                                        {[...Array(sectionHit["17"] > 3 ? 3 : sectionHit["17"])].map((e, i) => (
                                            <i key={`number-filled-${i}`} className="fas fa-circle m-01 text-gold"></i>
                                        ))}
                                        {[...Array(sectionHit["17"] >= 3 ? 0 : 3 - sectionHit["17"])].map((e, i) => (
                                            <i key={`number-unfilled-${i}`} className="far fa-circle m-01 text-gold"></i>
                                        ))}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center w-75">
                                    <div className={`d-flex justify-content-center fw-semibold mb-02 w-50 ${checkSectionClosed(16) ? 'text-red text-decoration-line-through' : ''}`}>
                                        16
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center fs-8 w-50">
                                        {[...Array(sectionHit["16"] > 3 ? 3 : sectionHit["16"])].map((e, i) => (
                                            <i key={`number-filled-${i}`} className="fas fa-circle m-01 text-gold"></i>
                                        ))}
                                        {[...Array(sectionHit["16"] >= 3 ? 0 : 3 - sectionHit["16"])].map((e, i) => (
                                            <i key={`number-unfilled-${i}`} className="far fa-circle m-01 text-gold"></i>
                                        ))}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center w-75">
                                    <div className={`d-flex justify-content-center fw-semibold mb-02 w-50 ${checkSectionClosed(15) ? 'text-red text-decoration-line-through' : ''}`}>
                                        15
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center fs-8 w-50">
                                        {[...Array(sectionHit["15"] > 3 ? 3 : sectionHit["15"])].map((e, i) => (
                                            <i key={`number-filled-${i}`} className="fas fa-circle m-01 text-gold"></i>
                                        ))}
                                        {[...Array(sectionHit["15"] >= 3 ? 0 : 3 - sectionHit["15"])].map((e, i) => (
                                            <i key={`number-unfilled-${i}`} className="far fa-circle m-01 text-gold"></i>
                                        ))}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center w-75">
                                    <div className={`d-flex justify-content-center fw-semibold mb-02 w-50 ${checkSectionClosed(25) ? 'text-red text-decoration-line-through' : ''}`}>
                                        BULL
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center fs-8 w-50">
                                        {[...Array(sectionHit["25"] > 3 ? 3 : sectionHit["25"])].map((e, i) => (
                                            <i key={`number-filled-${i}`} className="fas fa-circle m-01 text-gold"></i>
                                        ))}
                                        {[...Array(sectionHit["25"] >= 3 ? 0 : 3 - sectionHit["25"])].map((e, i) => (
                                            <i key={`number-unfilled-${i}`} className="far fa-circle m-01 text-gold"></i>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Col>
                </Row>
            }
        </Container>
    );
}

export default CricketScoreBoard
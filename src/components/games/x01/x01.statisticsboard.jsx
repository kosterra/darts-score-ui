import { useContext } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import X01Context from '../../../utils/x01.context';

const X01StatisticsBoard = props => {
    const { playerId } = props
    const {
        game
    } = useContext(X01Context);

    return (
        <div className="container-fluid">
            <div className="row justify-content-md-center">
                <div className="col-12 col-xxl-6 p-0 px-1 px-md-2 pb-0">
                    <Accordion multiple activeIndex={[0]}>
                        <AccordionTab header="Averages">
                            <div>
                                <div className="d-flex justify-content-between text-shade500 fw-semibold border-bottom mb-2 fs-9">
                                    <span className="col-4"></span>
                                    <span className="col-2 fw-semibold text-center">L</span>
                                    <span className="col-2 fw-semibold text-center">S</span>
                                    <span className="col-2 fw-semibold text-center">G</span>
                                </div>
                                <div className="d-flex justify-content-between text-shade500 fs-9">
                                    <span className="col-4">Overall</span>
                                    <span className="col-2 text-center">{Math.round((((game.playerModels[playerId].averages || {})['set-' + game.currentSet] || {})['leg-' + game.currentSetLeg] || {}).overall || 0)}</span>
                                    <span className="col-2 text-center">{Math.round(((game.playerModels[playerId].averages || {})['set-' + game.currentSet] || {}).overall || 0)}</span>
                                    <span className="col-2 text-center">{Math.round(((game.playerModels[playerId].averages || {}).game || {}).overall || 0)}</span>
                                </div>
                                <div className="d-flex justify-content-between text-shade500 fs-9">
                                    <span className="col-4">Beg / Mid</span>
                                    <span className="col-2 text-center">{Math.round((((game.playerModels[playerId].averages || {})['set-' + game.currentSet] || {})['leg-' + game.currentSetLeg] || {}).begMidLeg || 0)}</span>
                                    <span className="col-2 text-center">{Math.round(((game.playerModels[playerId].averages || {})['set-' + game.currentSet] || {}).begMidSet || 0)}</span>
                                    <span className="col-2 text-center">{Math.round(((game.playerModels[playerId].averages || {}).game || {}).begMidGame || 0)}</span>
                                </div>
                                <div className="d-flex justify-content-between text-shade500 fs-9">
                                    <span className="col-4">End</span>
                                    <span className="col-2 text-center">{Math.round((((game.playerModels[playerId].averages || {})['set-' + game.currentSet] || {})['leg-' + game.currentSetLeg] || {}).endLeg || 0)}</span>
                                    <span className="col-2 text-center">{Math.round(((game.playerModels[playerId].averages || {})['set-' + game.currentSet] || {}).endSet || 0)}</span>
                                    <span className="col-2 text-center">{Math.round(((game.playerModels[playerId].averages || {}).game || {}).endGame || 0)}</span>
                                </div>
                            </div>
                        </AccordionTab>
                        <AccordionTab header="Amount">
                            <div>
                                <div className="d-flex justify-content-between text-shade500 fw-semibold border-bottom mb-2 fs-9">
                                    <span className="col-4"></span>
                                    <span className="col-2 fw-semibold text-center">L</span>
                                    <span className="col-2 fw-semibold text-center">S</span>
                                    <span className="col-2 fw-semibold text-center">G</span>
                                </div>
                                <div className="d-flex justify-content-between text-shade500 fs-9">
                                    <span className="col-4">Best Three</span>
                                    <span className="col-2 text-center">{((((game.playerModels[playerId].bestThreeDarts || {})['set-' + game.currentSet] || {})['leg-' + game.currentSetLeg] || {}).value || 0)}</span>
                                    <span className="col-2 text-center">{(((game.playerModels[playerId].bestThreeDarts || {})['set-' + game.currentSet] || {}).value || 0)}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].bestThreeDarts.game || {}).value || 0)}</span>
                                </div>
                                <div className="d-flex justify-content-between text-shade500 fs-9 mt-3">
                                    <span className="col-4">180</span>
                                    <span className="col-2 text-center">{(((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['leg-' + game.currentSetLeg] || {})['180'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['180'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {}).game || {})['180'] || 0}</span>
                                </div>
                                <div className="d-flex justify-content-between text-shade500 fs-9">
                                    <span className="col-4">160 - 179</span>
                                    <span className="col-2 text-center">{(((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['leg-' + game.currentSetLeg] || {})['160-179'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['160-179'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {}).game || {})['160-179'] || 0}</span>
                                </div>
                                <div className="d-flex justify-content-between text-shade500 fs-9">
                                    <span className="col-4">140 - 159</span>
                                    <span className="col-2 text-center">{(((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['leg-' + game.currentSetLeg] || {})['140-159'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['140-159'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {}).game || {})['140-159'] || 0}</span>
                                </div>
                                <div className="d-flex justify-content-between text-shade500 fs-9">
                                    <span className="col-4">120 - 139</span>
                                    <span className="col-2 text-center">{(((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['leg-' + game.currentSetLeg] || {})['120-139'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['120-139'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {}).game || {})['120-139'] || 0}</span>
                                </div>
                                <div className="d-flex justify-content-between text-shade500 fs-9">
                                    <span className="col-4">100 - 119</span>
                                    <span className="col-2 text-center">{(((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['leg-' + game.currentSetLeg] || {})['100-119'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['100-119'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {}).game || {})['100-119'] || 0}</span>
                                </div>
                                <div className="d-flex justify-content-between text-shade500 fs-9">
                                    <span className="col-4">80 - 99</span>
                                    <span className="col-2 text-center">{(((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['leg-' + game.currentSetLeg] || {})['80-99'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['80-99'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {}).game || {})['80-99'] || 0}</span>
                                </div>
                                <div className="d-flex justify-content-between text-shade500 fs-9">
                                    <span className="col-4">60 - 79</span>
                                    <span className="col-2 text-center">{(((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['leg-' + game.currentSetLeg] || {})['60-79'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['60-79'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {}).game || {})['60-79'] || 0}</span>
                                </div>
                                <div className="d-flex justify-content-between text-shade500 fs-9">
                                    <span className="col-4">40 - 59</span>
                                    <span className="col-2 text-center">{(((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['leg-' + game.currentSetLeg] || {})['40-59'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['40-59'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {}).game || {})['40-59'] || 0}</span>
                                </div>
                                <div className="d-flex justify-content-between text-shade500 fs-9">
                                    <span className="col-4">20 - 39</span>
                                    <span className="col-2 text-center">{(((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['leg-' + game.currentSetLeg] || {})['20-39'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['20-39'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {}).game || {})['20-39'] || 0}</span>
                                </div>
                                <div className="d-flex justify-content-between text-shade500 fs-9">
                                    <span className="col-4">1 - 19</span>
                                    <span className="col-2 text-center">{(((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['leg-' + game.currentSetLeg] || {})['1-19'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['1-19'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {}).game || {})['1-19'] || 0}</span>
                                </div>
                                <div className="d-flex justify-content-between text-shade500 fs-9">
                                    <span className="col-4">ZERO</span>
                                    <span className="col-2 text-center">{(((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['leg-' + game.currentSetLeg] || {})['ZERO'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {})['set-' + game.currentSet] || {})['ZERO'] || 0}</span>
                                    <span className="col-2 text-center">{((game.playerModels[playerId].scoreRanges || {}).game || {})['ZERO'] || 0}</span>
                                </div>
                            </div>
                        </AccordionTab>
                        <AccordionTab header="Checkout">
                            <div>
                                <div className="d-flex justify-content-between text-shade500 fw-semibold border-bottom mb-2 fs-9">
                                    <span className="col-4"></span>
                                    <span className="col-2 fw-semibold text-center">L</span>
                                    <span className="col-2 fw-semibold text-center">S</span>
                                    <span className="col-2 fw-semibold text-center">G</span>
                                </div>
                                <div className="d-flex justify-content-between text-shade500 fs-9">
                                    <span className="col-4">Highest</span>
                                    <span className="col-2 text-center">{Math.max(0, ...Object.keys((((game.playerModels[playerId].checkoutScores || {})['set-' + game.currentSet] || {})['leg-' + game.currentSetLeg] || {})).filter((key) => !isNaN(key)))}</span>
                                    <span className="col-2 text-center">{Math.max(0, ...Object.keys(((game.playerModels[playerId].checkoutScores || {})['set-' + game.currentSet] || {})).filter((key) => !isNaN(key)))}</span>
                                    <span className="col-2 text-center">{Math.max(0, ...Object.keys(((game.playerModels[playerId].checkoutScores || {})['game'] || {})).filter((key) => !isNaN(key)))}</span>
                                </div>
                                <div className="d-flex justify-content-between text-shade500 fs-9 mb-3">
                                    <span className="col-4">Doubles Hit</span>
                                    <span className="col-2 text-center">{Object.values(((((game.playerModels[playerId].checkoutScores || {})['set-' + game.currentSet] || {})['leg-' + game.currentSetLeg] || {}))).filter((key) => !isNaN(key)).reduce((partialSum, a) => partialSum + a, 0)}</span>
                                    <span className="col-2 text-center">{Object.values((((game.playerModels[playerId].checkoutScores || {})['set-' + game.currentSet] || {}))).filter((key) => !isNaN(key)).reduce((partialSum, a) => partialSum + a, 0)}</span>
                                    <span className="col-2 text-center">{Object.values((((game.playerModels[playerId].checkoutScores || {})['game'] || {}))).filter((key) => !isNaN(key)).reduce((partialSum, a) => partialSum + a, 0)}</span>
                                </div>
                                {[...Array(20)].map((x, i) => ((game.playerModels[playerId].checkout || {}).sections || {})[i + 1] ? (
                                    <div key={i + 1} className="d-flex justify-content-between text-shade500 fs-9">
                                        <span className="col-10">Double {i + 1}</span>
                                        <span className="d-flex justify-content-between col-2 text-center">
                                            <span className="col-4 text-center">{((((game.playerModels[playerId].checkout || {}).sections || {})[i + 1] || {}).hit || 0)}</span>
                                            <span className="col-4 text-center"> / </span>
                                            <span className="col-4 text-center">{((((game.playerModels[playerId].checkout || {}).sections || {})[i + 1] || {}).total || 0)}</span>
                                        </span>
                                    </div>
                                ) : null
                                )}
                                {((((game.playerModels[playerId].checkout || {}).sections || {})['25'] || {}).total || 0) > 0 &&
                                    <div className="d-flex justify-content-between text-shade500 fs-9">
                                        <span className="col-10">BULLSEYE</span>
                                        <span className="d-flex justify-content-between col-2 text-center">
                                            <span className="col-4 text-center">{((((game.playerModels[playerId].checkout || {}).sections || {})['25'] || {}).hit || 0)}</span>
                                            <span className="col-4 text-center"> / </span>
                                            <span className="col-4 text-center">{((((game.playerModels[playerId].checkout || {}).sections || {})['25'] || {}).total || 0)}</span>
                                        </span>
                                    </div>
                                }
                            </div>
                        </AccordionTab>
                    </Accordion>
                </div>
                <div className="col-12 col-xxl-6 p-0 px-1 px-md-2 pt-0">
                    <Accordion multiple activeIndex={[0]}>
                        <AccordionTab header="Per Round Score">
                            <div className="container">
                                <div className="row align-items-baseline mb-1" key="initial">
                                    <span className="col-4 p-0 fs-8 text-shade100 fw-semibold">Initial</span>
                                    <span className="col-8 p-0 fs-8 text-shade100 fw-semibold text-end">501</span>
                                </div>
                                {game.currentLegThrows.filter(e => e.playerId === playerId).map((throws, index) => (
                                    <div className="row align-items-baseline mb-1" key={index}>
                                        <span className="col-1 p-0 fs-8 text-shade100 fw-semibold">R{index + 1}</span>
                                        <span className="col-2 p-0 fs-9 text-shade500 fst-italic text-end">{throws.darts[0]}</span>
                                        <span className="col-2 p-0 fs-9 text-shade500 fst-italic text-end">{throws.darts[1]}</span>
                                        <span className="col-2 p-0 fs-9 text-shade500 fst-italic text-end">{throws.darts[2]}</span>
                                        <span className='col-2 p-0 fs-9 text-shade500 fw-semibold text-end'>{throws.roundScore}</span>
                                        <span className="col-3 p-0 fs-8 text-shade100 fw-semibold text-end">{throws.scoreLeft}</span>
                                    </div>
                                ))}
                            </div>
                        </AccordionTab>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default X01StatisticsBoard
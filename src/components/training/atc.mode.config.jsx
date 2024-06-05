import { SelectButton } from 'primereact/selectbutton';

import ATCConfigOptions from './atc.config.options';
import ATCHelp from './atc.help';

const ATCModeConfig = (props) => {
    const {
        atcModeOption,
        onATCModeChange
    } = props;

    return (
        <div className="container">
            <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
                <span className="text-center text-shade500 fs-7 fw-semibold">Training Mode</span>
                <ATCHelp />
            </div>
            <div className="row border border-shade600 rounded m-0 py-3 mb-3">
                <div className="col">
                    <SelectButton
                        value={atcModeOption}
                        onChange={(e) => onATCModeChange(e.value)}
                        optionLabel="value"
                        options={ATCConfigOptions.modeOptions.values}
                    />
                </div>
            </div>
        </div>
    );
};

export default ATCModeConfig;
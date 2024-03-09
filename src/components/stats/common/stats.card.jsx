import { Panel } from 'primereact/panel';

const StatsCard = (props) => {
    const {
        title,
        subtitle,
        value,
        subvalue
    } = props

    const headerTemplate = () => {
        return (
            <div className="p-panel-header">
                <div>
                    <div className="text-center fs-6 fw-semibold">{title}</div>
                    <div className="text-center fs-8 fw-medium">{subtitle}</div>
                </div>
            </div>
        );
    };

    return (
        <Panel headerTemplate={headerTemplate} className="h-100 bg-shade900">
            <div className="d-flex flex-column align-items-center p-1 pt-3">
                <span className="text-shade100 fs-1">
                    {value}
                </span>
                <span className="text-shade500 text-center fs-7 fw-semibold">
                    {subvalue}
                </span>
            </div>
        </Panel>
    )
};

export default StatsCard;  
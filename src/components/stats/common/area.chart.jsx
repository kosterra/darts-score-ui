import { Fragment, useState } from 'react';
import { Panel } from 'primereact/panel';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

const StatsAreaChart = (props) => {
    const {
        title,
        subtitle = '',
        xLabel = '',
        yLabel = '',
        data,
        players,
        labels,
        showLegend = false,
        className = ''
    } = props;

    const [areaProps, setAreaProps] = useState(
        labels.reduce(
            (a, { areaKey }) => {
                a[areaKey] = false;
                return a;
            },
            { hover: null }
        )
    );

    const handleLegendMouseEnter = (e) => {
        if (!areaProps[e.dataKey]) {
            setAreaProps({ ...areaProps, hover: e.dataKey });
        }
    };

    const handleLegendMouseLeave = () => {
        setAreaProps({ ...areaProps, hover: null });
    };

    const selectArea = (e) => {
        setAreaProps({
            ...areaProps,
            [e.dataKey]: !areaProps[e.dataKey],
            hover: null
        });
    };

    const headerTemplate = () => {
        return (
            <div className="p-panel-header" >
                <div>
                    <div className="text-center fs-6 fw-semibold">{title}</div>
                    <div className="text-center fs-8 fw-medium">{subtitle}</div>
                </div>
            </div>
        );
    };

    const renderLegendText = (value, entry) => {
        return (
            <span className="d-flex justify-content-center align-items-center">
                <span className="fs-7 fw-semibold text-shade500 pt-2">
                    <i className="pi pi-circle-fill m-1" style={{ color: areaProps[entry.dataKey] === true ? '#fff' : entry.payload.fill }}></i>
                </span>
                <span className="fs-7 fw-semibold text-shade500 pt-2">
                    {value}
                </span>
            </span>
        );
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="d-flex flex-column align-items-center bg-shade800">
                    <span className="bg-primary text-shade100 text-center fw-semibold fs-7 p-2 w-100">
                        {`${payload[0].payload.desc}`}
                    </span>
                    <div className="d-flex flex-column align-items-center p-2">
                        <span className="text-shade100 fs-8 fw-semibold">
                            {`${payload[0].payload.value}`}
                        </span>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <Panel headerTemplate={headerTemplate} className={`mx-auto ${className}`}>
            <ResponsiveContainer width="100%" height={330}>
                <AreaChart
                    data={data}
                    margin={{
                        top: 30,
                        right: 60,
                        left: 0,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="4 4" opacity={0.5} />
                    <YAxis type="number" domain={[0, 180]} label={{ value: yLabel, position: "center", angle: -90, dx: -20 }} />

                    {labels.map((label, index) => (
                        <Fragment key={'fragment-' + index}>
                            <XAxis dataKey={label.xKey} dy={10} tick={{ fontSize: 1 }} label={{ value: xLabel, position: "bottom", dy: 0 }} />
                            <Area key={'area-' + index}
                                name={players[index].nickname}
                                type="monotone"
                                dataKey={label.areaKey}
                                stroke={label.stroke}
                                strokeWidth={2}
                                fill={label.fill}
                                hide={areaProps[label.areaKey] === true}
                                strokeOpacity={
                                    Number(areaProps.hover === label.areaKey || !areaProps.hover ? 0.8 : 0.2)
                                }
                                fillOpacity={
                                    Number(areaProps.hover === label.areaKey || !areaProps.hover ? 0.8 : 0.2)
                                }
                                dot={{ stroke: label.stroke, strokeWidth: 2 }}
                            />
                        </Fragment>
                    ))}

                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />

                    {showLegend &&
                        <Legend
                            onClick={selectArea}
                            onMouseOver={handleLegendMouseEnter}
                            onMouseOut={handleLegendMouseLeave}
                            verticalAlign='bottom'
                            formatter={renderLegendText}
                            iconType='circle'
                            iconSize={0}
                        />
                    }
                </AreaChart>
            </ResponsiveContainer>
        </Panel>
    );
};

export default StatsAreaChart;
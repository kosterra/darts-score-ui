import { Fragment, useState } from 'react';
import { Panel } from 'primereact/panel';

import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Line,
    LineChart,
    Legend
} from 'recharts';

const StatsLineChart = (props) => {
    const {
        title,
        subtitle = '',
        data,
        xLabel = '',
        yLabel = '',
        players,
        labels,
        showLegend = false,
        className = ''
    } = props;

    const [lineProps, setLineProps] = useState(
        labels.reduce(
            (a, { key }) => {
                a[key] = false;
                return a;
            },
            { hover: null }
        )
    );

    const handleLegendMouseEnter = (e) => {
        if (!lineProps[e.dataKey]) {
            setLineProps({ ...lineProps, hover: e.dataKey });
        }
    };

    const handleLegendMouseLeave = () => {
        setLineProps({ ...lineProps, hover: null });
    };

    const selectLine = (e) => {
        setLineProps({
            ...lineProps,
            [e.dataKey]: !lineProps[e.dataKey],
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
                    <i className="pi pi-circle-fill m-1" style={{ color: lineProps[entry.dataKey] === true ? '#fff' : entry.payload.stroke }}></i>
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
                    <div className="d-flex flex-column align-items-start p-2">
                        {payload.map((payload, index) => (
                            <span key={index} className="text-shade100 fs-8 fw-semibold">
                                {`${players.length > 1 ? payload.name + ': ' : ''}${payload.value}`}
                            </span>
                        ))}
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <Panel headerTemplate={headerTemplate} className={`mx-auto ${className}`}>
            <ResponsiveContainer width="100%" height={330}>
                <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 10,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="4 4" opacity={0.5} />
                    <YAxis type="number"
                        domain={[0, 180]}
                        label={{
                            value: yLabel,
                            position: "center",
                            angle: -90,
                            dx: -20
                        }}
                    />

                    {labels.map((label, index) => (
                        <Fragment key={'fragment-' + index}>
                            <XAxis dataKey={label.xKey}
                                dy={10}
                                tick={{ fontSize: 1 }}
                                label={{
                                    value: xLabel,
                                    position: "bottom",
                                    dy: 0
                                }}
                            />
                            <Line
                                name={players[index].nickname}
                                key={'line-' + index}
                                dataKey={label.lineKey}
                                stroke={label.stroke}
                                strokeWidth={2}
                                fill={label.fill}
                                hide={lineProps[label.lineKey] === true}
                                strokeOpacity={
                                    Number(lineProps.hover === label.lineKey || !lineProps.hover ? 0.8 : 0.2)
                                }
                                fillOpacity={
                                    Number(lineProps.hover === label.lineKey || !lineProps.hover ? 0.8 : 0.2)
                                }
                                dot={{ stroke: label.stroke, strokeWidth: 2 }}
                            />
                        </Fragment>
                    ))
                    }

                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />

                    {showLegend &&
                        <Legend
                            onClick={selectLine}
                            onMouseOver={handleLegendMouseEnter}
                            onMouseOut={handleLegendMouseLeave}
                            verticalAlign='bottom'
                            formatter={renderLegendText}
                            iconType='circle'
                            iconSize={0}
                        />
                    }
                </LineChart>
            </ResponsiveContainer>
        </Panel>
    );
};

export default StatsLineChart;
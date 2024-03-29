import { Fragment, useState } from 'react';
import { Panel } from 'primereact/panel';

import {
    Bar,
    BarChart,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const StatsBarChart = (props) => {
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

    const [barProps, setBarProps] = useState(
        labels.reduce(
            (a, { barKey }) => {
                a[barKey] = false;
                return a;
            },
            { hover: null }
        )
    );

    const handleLegendMouseEnter = (e) => {
        if (!barProps[e.dataKey]) {
            setBarProps({ ...barProps, hover: e.dataKey });
        }
    };

    const handleLegendMouseLeave = () => {
        setBarProps({ ...barProps, hover: null });
    };

    const selectBars = (e) => {
        setBarProps({
            ...barProps,
            [e.dataKey]: !barProps[e.dataKey],
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
                    <i className="pi pi-circle-fill m-1" style={{ color: barProps[entry.dataKey] === true ? '#fff' : entry.payload.fill }}></i>
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
                        {`${payload[0].payload.range}`}
                    </span>
                    <div className="d-flex flex-column align-items-center p-2">
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
            <ResponsiveContainer width="100%" height={400}>
                <BarChart margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 0,
                }}
                    data={data}
                >
                    <YAxis label={{ value: yLabel, position: "center", angle: -90, dx: -20 }} />

                    {labels.map((label, index) => (
                        <Fragment key={'fragment-' + index}>
                            <XAxis type="category"
                                dataKey={label.xKey}
                                interval={0}
                                tick={{
                                    fontSize: 1,
                                    dx: -4,
                                    textAnchor: "end"
                                }}
                                label={{
                                    value: xLabel,
                                    position: "bottom"
                                }}
                                padding={{ top: 20 }}
                                angle={-70}
                            />
                            <Bar key={'bar-' + index}
                                name={players[index].nickname}
                                dataKey={label.barKey}
                                fill={label.fill}
                                hide={barProps[label.barKey] === true}
                                fillOpacity={
                                    Number(barProps.hover === label.barKey || !barProps.hover ? 0.8 : 0.2)
                                }
                            />
                        </Fragment>
                    ))}

                    <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', fill: "transparent" }} />

                    {showLegend &&
                        <Legend
                            onClick={selectBars}
                            onMouseOver={handleLegendMouseEnter}
                            onMouseOut={handleLegendMouseLeave}
                            verticalAlign='bottom'
                            formatter={renderLegendText}
                            iconType='circle'
                            iconSize={0}
                        />
                    }
                </BarChart>
            </ResponsiveContainer>
        </Panel>
    );
};

export default StatsBarChart;
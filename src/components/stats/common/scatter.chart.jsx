import { Fragment, useState } from 'react';
import { Panel } from 'primereact/panel';

import {
    Legend,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
    ZAxis
} from 'recharts';

const StatsScatterChart = (props) => {
    const {
        title,
        subtitle = '',
        data,
        players,
        xKey,
        yKey,
        zKey,
        xLabel = '',
        yLabel = '',
        labels,
        showLegend = false,
        className = ''
    } = props;

    const [scatterProps, setScatterProps] = useState(
        labels.reduce(
            (a, { scatterKey }) => {
                a[scatterKey] = false;
                return a;
            },
            { hover: null }
        )
    );

    const handleLegendMouseEnter = (e) => {
        if (!scatterProps[e.dataKey]) {
            setScatterProps({ ...scatterProps, hover: e.dataKey });
        }
    };

    const handleLegendMouseLeave = () => {
        setScatterProps({ ...scatterProps, hover: null });
    };

    const selectScatter = (e) => {
        setScatterProps({
            ...scatterProps,
            [e.dataKey]: !scatterProps[e.dataKey],
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
                    <i className="pi pi-circle-fill m-1" style={{ color: scatterProps[entry.dataKey] === true ? '#fff' : entry.payload.fill }}></i>
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
                        {`${payload[0].payload.section}`}
                    </span>
                    <div className="d-flex flex-column align-items-center p-2">
                        <span className="text-shade100 fs-8 fw-semibold pb-1">
                            {`${payload[0].payload.rate + '%'}`}
                        </span>
                        <span className="text-shade100 fs-9 fw-semibold">
                            {`${'(' + payload[0].payload.hit + '/' + payload[0].payload.total + ')'}`}
                        </span>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <Panel headerTemplate={headerTemplate} className={`mx-auto ${className}`}>
            <ResponsiveContainer width="100%" height={400}>
                <ScatterChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 0,
                    }}
                >
                    <XAxis type="number" dataKey={xKey} label={{ value: xLabel, position: "bottom", dy: 0 }} />
                    <YAxis type="number" dataKey={yKey} label={{ value: yLabel, position: "center", angle: -90, dx: -20 }} />
                    <ZAxis type="number" dataKey={zKey} range={[100, 1000]} />

                    {labels.map((label, index) => (
                        <Fragment key={'fragment-' + index}>
                            <Scatter
                                name={players[index].nickname}
                                key={'scatter-' + index}
                                data={data[label.scatterKey]}
                                dataKey={label.scatterKey}
                                stroke={label.stroke}
                                strokeWidth={2}
                                fill={label.fill}
                                hide={scatterProps[label.scatterKey] === true}
                                line={false}
                                strokeOpacity={
                                    Number(scatterProps.hover === label.scatterKey || !scatterProps.hover ? 0.8 : 0.2)
                                }
                                fillOpacity={
                                    Number(scatterProps.hover === label.scatterKey || !scatterProps.hover ? 0.8 : 0.2)
                                }
                                dot={{ stroke: label.stroke, strokeWidth: 2 }}
                            />
                        </Fragment>
                    ))}

                    <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', fill: "transparent" }} />

                    {showLegend &&
                        <Legend
                            onClick={selectScatter}
                            onMouseOver={handleLegendMouseEnter}
                            onMouseOut={handleLegendMouseLeave}
                            verticalAlign='bottom'
                            formatter={renderLegendText}
                            iconType='circle'
                            wrapperStyle={{
                                marginTop: "100px"
                            }}
                            iconSize={0}
                        />
                    }
                </ScatterChart>
            </ResponsiveContainer>
        </Panel>
    );
};

export default StatsScatterChart;
import { useState } from 'react';
import { Panel } from 'primereact/panel';

import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    Tooltip,
    PolarRadiusAxis,
    Legend
} from 'recharts';

const StatsRadarChart = (props) => {
    const {
        title,
        subtitle = '',
        data,
        players,
        axisKey,
        labels,
        showLegend = false,
        className = ''
    } = props;

    const [radarProps, setRadarProps] = useState(
        labels.reduce(
            (a, { radarKey }) => {
                a[radarKey] = false;
                return a;
            },
            { hover: null }
        )
    );

    const handleLegendMouseEnter = (e) => {
        if (!radarProps[e.dataKey]) {
            setRadarProps({ ...radarProps, hover: e.dataKey });
        }
    };

    const handleLegendMouseLeave = () => {
        setRadarProps({ ...radarProps, hover: null });
    };

    const selectRadar = (e) => {
        setRadarProps({
            ...radarProps,
            [e.dataKey]: !radarProps[e.dataKey],
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
                    <i className="pi pi-circle-fill m-1" style={{ color: radarProps[entry.dataKey] === true ? '#fff' : entry.payload.fill }}></i>
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
                        {`Section: ${payload[0].payload.section}`}
                    </span>
                    <div className="d-flex flex-column align-items-center p-2">
                        {payload.map((payload, index) => (
                            <span key={index} className="text-shade100">
                                <span className="fs-8 fw-semibold">
                                    {`${players.length > 1 ? payload.name + ': ' : ''}${players.length > 1 ? payload.payload['player' + (index + 1) + 'Hit'] : payload.payload['hit']}`}
                                </span>
                                <span className="fs-9 fw-semibold">
                                    {` (S${payload.payload[players.length > 1 ? 'player' + (index + 1) + 'S' : 'S']}/D${payload.payload[players.length > 1 ? 'player' + (index + 1) + 'D' : 'D']}/T${payload.payload[players.length > 1 ? 'player' + (index + 1) + 'T' : 'T']})`}
                                </span>
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
                <RadarChart
                    outerRadius={130}
                    data={data}
                    margin={{
                        top: 20,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <PolarGrid gridType="circle" />
                    <PolarRadiusAxis scale='auto' axisLine={false} tick={false} domain={['0', 'auto']} />
                    <PolarAngleAxis dataKey={axisKey} />

                    {labels.map((label, index) => (
                        <Radar
                            name={players[index].nickname}
                            key={index}
                            dataKey={label.radarKey}
                            stroke={label.stroke}
                            strokeWidth={2}
                            fill={label.fill}
                            hide={radarProps[label.radarKey] === true}
                            strokeOpacity={
                                Number(radarProps.hover === label.radarKey || !radarProps.hover ? 0.8 : 0.2)
                            }
                            fillOpacity={
                                Number(radarProps.hover === label.radarKey || !radarProps.hover ? 0.8 : 0.2)
                            }
                            dot={{ stroke: label.stroke, strokeWidth: 2 }}
                        />
                    ))}

                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />

                    {showLegend &&
                        <Legend
                            onClick={selectRadar}
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
                </RadarChart>
            </ResponsiveContainer>
        </Panel>
    );
};

export default StatsRadarChart;
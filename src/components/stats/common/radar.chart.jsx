import { Panel } from 'primereact/panel';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, PolarRadiusAxis, Legend } from 'recharts';
import useChartLegendInteraction from '@/hooks/useChartLegendInteraction';

const StatsRadarChart = ({ title, subtitle = '', data, players, axisKey, labels, showLegend = false, className = '' }) => {
    const [radarProps, handleMouseEnter, handleMouseLeave, handleClick] = useChartLegendInteraction(labels.map(l => l.radarKey));

    const headerTemplate = () => (
        <div className="p-panel-header">
            <div>
                <div className="text-center fs-6 fw-semibold">{title}</div>
                <div className="text-center fs-8 fw-medium">{subtitle}</div>
            </div>
        </div>
    );

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload?.length) {
            return (
                <div className="d-flex flex-column align-items-center bg-shade800">
                    <span className="bg-primary text-shade100 text-center fw-semibold fs-7 p-2 w-100">
                        Section: {payload[0].payload?.section}
                    </span>
                    <div className="d-flex flex-column align-items-center p-2">
                        {payload.map((p, idx) => (
                            <span key={idx} className="text-shade100 fs-8 fw-semibold">
                                {`${players.length > 1 ? p.name + ': ' : ''}${p.payload[p.dataKey] ?? 0}`}
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
                <RadarChart outerRadius={130} data={data} margin={{ top: 20, right: 0, left: 0, bottom: 20 }}>
                    <PolarGrid gridType="circle" />
                    <PolarRadiusAxis scale='auto' axisLine={false} tick={false} domain={['0', 'auto']} />
                    <PolarAngleAxis dataKey={axisKey} />
                    {labels.map((label, index) => (
                        <Radar
                            key={index}
                            name={players[index]?.nickname || `Player ${index + 1}`}
                            dataKey={label.radarKey}
                            stroke={label.stroke}
                            strokeWidth={2}
                            fill={label.fill}
                            hide={radarProps[label.radarKey]}
                            strokeOpacity={radarProps.hover === label.radarKey || !radarProps.hover ? 0.8 : 0.2}
                            fillOpacity={radarProps.hover === label.radarKey || !radarProps.hover ? 0.8 : 0.2}
                            dot={{ stroke: label.stroke, strokeWidth: 2 }}
                        />
                    ))}
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
                    {showLegend && (
                        <Legend
                            onClick={handleClick}
                            onMouseOver={handleMouseEnter}
                            onMouseOut={handleMouseLeave}
                            verticalAlign='bottom'
                            formatter={(value, entry) => (
                                <span className="fs-7 fw-semibold text-shade500 pt-2">
                                    <i className="pi pi-circle-fill m-1" style={{ color: radarProps[entry.dataKey] ? '#fff' : entry.payload.fill }}></i>
                                    {value}
                                </span>
                            )}
                            iconType='circle'
                            iconSize={0}
                            wrapperStyle={{ bottom: -8, left: 15 }}
                        />
                    )}
                </RadarChart>
            </ResponsiveContainer>
        </Panel>
    );
};

export default StatsRadarChart;

import React, { useState } from 'react';
import { Row, Col } from 'reactstrap'
import chart_data from './NewRelicCharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from "@fortawesome/free-solid-svg-icons";
import IframeResizer from 'iframe-resizer-react';
import './PortalHealthMetrics.css';

const PortalHealthMetrics = () => {
    const [filter, setFilter] = useState('filter_one_day');

    const determineFilterStyle = (selectedFilter) => {
        return selectedFilter === filter ? { cursor: 'pointer', fontWeight: 'bold', color: 'blue' } : { cursor: 'pointer' };
    }

    const renderNewRelicGraphs = () => {
        let filteredCharts = chart_data[filter];

        return filteredCharts.sources.map(data_source => {
            let iFrameSrc = `https://chart-embed.service.newrelic.com/herald/${data_source.source}?height=400px&timepicker=false`
             //dynamic sizing based on the size set in the chart data file -- 'large' renders a 12 column div, 'small' renders a 6 column div
            let size = data_source.size === 'large' ? '12' : '6';

            return <Col className="mb-4" xs={size}>
                <div className="chart">
                <IframeResizer
                    log
                    src={iFrameSrc}
                    style={{ width: '1px', minWidth: '100%', height: '425px'}}
                />
                </div>
            </Col>
        })
    }

    return (
        <>
            <Row className="mt-3">
                <Col xs="12">
                    <div className="pull-right filter">
                        <p>
                            <FontAwesomeIcon className="mr-2" icon={faClock} size="1x" /><b><span className="mr-2">Filter: </span></b>
                            <span id="filter_thirty_minutes" style={determineFilterStyle('filter_thirty_minutes')} className="mr-2" onClick={(e) => { setFilter(e.target.id) }}> 30m </span>
                            <span id="filter_one_hour" style={determineFilterStyle('filter_one_hour')} className="mr-2" onClick={(e) => { setFilter(e.target.id) }}> 1h </span>
                            <span id="filter_six_hours" style={determineFilterStyle('filter_six_hours')} className="mr-2" onClick={(e) => { setFilter(e.target.id) }}> 6h </span>
                            <span id="filter_one_day" style={determineFilterStyle('filter_one_day')} className="mr-2" onClick={(e) => { setFilter(e.target.id) }}> 1d </span>
                            <span id="filter_seven_days" style={determineFilterStyle('filter_seven_days')} className="mr-2" onClick={(e) => { setFilter(e.target.id) }}> 7d </span>
                        </p>
                    </div>
                </Col>
            </Row>
            <Row className="mb-n1">
                { renderNewRelicGraphs() }
            </Row>
        </>
    )
}

export default PortalHealthMetrics;
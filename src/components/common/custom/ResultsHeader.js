import React from "react";
import { Row, Badge, Col, Button, Spinner } from "reactstrap";
import AbortButton from "./AbortButton";

const ResultsHeader = ({ testInfo, inProgress, testBuildId, handleExport, reportDownloading }) => {

  const displayAbort =
    inProgress === true ? (
      <Col lg={3} md={3} sm={3} xs={3}>
        <div className="pull-right">
          <AbortButton buildID={testBuildId} />
        </div>
      </Col>
    ) : null;
  return (
    <div className="white">
      <Row>
        <Col>
          <h1>
            Test Results
            <span
              style={{
                fontSize: 30,
                verticalAlign: "text-top",
                marginLeft: 15
              }}
            >
              <Badge color="primary" pill>
                {testInfo}
              </Badge>
              {!inProgress && inProgress !== undefined && <Button styles={{ fontSize: "24px" }} disabled={reportDownloading}
                className="pull-right mt-2" color="primary" onClick={handleExport}>
                {reportDownloading && <Spinner className="mr-1" size="sm" style={{color: 'white'}} />}{reportDownloading ? 'Downloading' : 'Download Report'}<i></i></Button>}
            </span>
          </h1>
        </Col>
        {displayAbort}
      </Row>
    </div>
  );
};

export default ResultsHeader;

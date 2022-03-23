import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import Plotly from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
import "../../assets/css/Health.css";
import CommonService from "../../services/common.service";
import Button from "@material-ui/core/Button";
import DropdownComponent from "../common/custom/DropdownComponent";
const Plot = createPlotlyComponent(Plotly);

export default function Health() {

// IMP : Delete this we are not using 

  const items = [];
  const [containerList, setContainerList] = useState([]);
  const [data, setData] = useState([]);
  const [layout, setLayout] = useState({});
  const [selectedId, setSelectedId] = useState();
  const setSelectedInput = (val) => {
    setSelectedId(val);
  };

  const getAllContainer = () => {
    const api = CommonService.getApiUrl("container/getList");
    CommonService.httpGet(api).then((response) => {
      if (response !== undefined) {
        let data = response.data;
        data.forEach((element) => {
          if (selectedId === undefined) {
            setSelectedInput(element.name);
          }
          items.push({
            value: element.name,
            display: element.name.replace(/_/g, " "),
          });
          setContainerList(items);
        });
      }
    });
  };

  const fetchData = () => {
    var xConsumption = [];
    var yResourceName = [];

    let apiRoute = "health/" + selectedId;
    const healthApi = CommonService.getApiUrl(apiRoute);
    CommonService.httpGet(healthApi).then((response) => {
      if (response !== undefined) {
        let items = response.data;
        for (var prop in items) {
          if (prop === "CPU" || prop === "Memory") {
            xConsumption.push(items[prop]);
            yResourceName.push(prop);
          }
        }

        var trace1 = [
          {
            x: xConsumption,
            y: yResourceName,
            xaxis: "x1",
            yaxis: "y1",
            type: "bar",
            marker: {
              color: "rgba(50,171,96,0.6)",
              line: {
                color: "rgba(50,171,96,1.0)",
                width: 1,
              },
            },
            orientation: "h",
          },
        ];

        var templayout = {
          xaxis1: {
            range: [0, 100],
            domain: [0, 10],
            zeroline: false,
            showline: true,
            showticklabels: true,
            showgrid: true,
          },
          margin: {
            l: 100,
            r: 100,
            t: 10,
            b: 30,
          },
          height: 200,
          paper_bgcolor: "rgb(248,248,255)",
          plot_bgcolor: "rgb(248,248,255)",
          annotations: [],
        };

        for (var i = 0; i < xConsumption.length; i++) {
          var result = {
            xref: "x1",
            yref: "y1",
            x: xConsumption[i] + 5,
            y: yResourceName[i],
            text: xConsumption[i] + "%",
            font: {
              family: "Arial",
              size: 12,
              color: "rgb(50, 171, 96)",
            },
            showarrow: false,
          };

          templayout.annotations.push(result);
        }

        setData(trace1);
        setLayout(templayout);
      }
    });
  };

  // call on every change in selectedId
  useEffect(() => {
    if (selectedId !== undefined) {
      fetchData();

      // data would auto refresh in every 10 sec
      const interval = setInterval(() => fetchData(), 10000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [selectedId]);

  //call only once
  useEffect(() => {
    getAllContainer();
  }, []);

  return (
    <div style={{ marginTop: "5%", width: "100%" }}>
      {data.length === 0 ? (
        <Container
          className="white healthPodNoData"
          style={{ boxShadow: "none", display: "block" }}
        >
          <h3>CAVE Virtual Server Health Stats</h3>
          <div className="nodataMessage">No data to display</div>
        </Container>
      ) : (
        <Container
          className="white healthPod"
          style={{ boxShadow: "none", display: "block" }}
        >
          <div className="greentick">
            <h3>CAVE Virtual Server Health Stats</h3>
          </div>
          <br />

          <div className="filter-left">
            <br />
            <DropdownComponent
              items={containerList}
              class={"healthFilter"}
              selectInput={setSelectedInput}
            />
            <Button variant="contained" color="primary" onClick={fetchData}>
              Refresh Stats
            </Button>
          </div>
          <br />
          <Plot data={data} layout={layout} />
        </Container>
      )}
    </div>
  );
}

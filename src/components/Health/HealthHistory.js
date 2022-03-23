import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import Plotly from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
import "../../assets/css/Health.css";
import CommonService from "../../services/common.service";
import Button from "@material-ui/core/Button";
import DropdownComponent from "../common/custom/DropdownComponent";
import refresh from "../../assets/images/icon-reset-48.png";
const Plot = createPlotlyComponent(Plotly);

export default function HealthHistory() {
  
// IMP : delete this we are not using 

  const items = [];
  var yConsumption_cpu =    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var yConsumption_memory = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var xTimeline = [
    "12 m",
    "11 m",
    "10 m",
    "9 m",
    "8 m",
    "7 m",
    "6 m",
    "5 m",
    "4 m",
    "3 m",
    "2 m",
    "1 m"
  ];

  var revision = Math.random();
  console.log("Revision-declare:", revision);

  const [containerList, setContainerList] = useState([]);
  const [cpudata, setCPUData] = useState([]);
  const [memdata, setMemData] = useState([]);
  const [CPUlayout, setCPULayout] = useState({});
  const [Memlayout, setMemLayout] = useState({});
  const [selectedId, setSelectedId] = useState();

  const setSelectedInput = (val) => {
    setSelectedId(val);
  };

  const getAllContainer = () => {
    const api = CommonService.getApiUrl("container/getList");
    CommonService.httpGet(api).then((response) => {
      if (response !== undefined) {
        let data = response.data;
        if (selectedId === undefined) {
          setSelectedInput(data[0].name);
        }
        data.forEach((element) => {
          items.push({
            value: element.name,
            display: element.name.replace(/_/g, " "),
          });
        });

        setContainerList(items);
      }
    });
  };

  const fetchData = () => {
    console.log("Revision-inside fetch:", revision);

    let apiRoute = "health/" + selectedId;
    const healthApi = CommonService.getApiUrl(apiRoute);
    CommonService.httpGet(healthApi).then((response) => {
      if (response !== undefined) {
        let items = response.data;
        for (var prop in items) {
          if (prop === "CPU") {
            yConsumption_cpu.shift();
            yConsumption_cpu.push(items[prop]);
          }
          if (prop === "Memory") {
            yConsumption_memory.shift();
            yConsumption_memory.push(items[prop]);
          }
        }

        console.log("yConsumption-", yConsumption_cpu);
        console.log("yConsumption-memory", yConsumption_memory);
        var trace1 = {
          x: xTimeline,
          y: yConsumption_cpu,
          mode: "lines+markers",
          type: "scatter",
          marker: {
            //color: "rgba(50,171,96,0.6)",
            line: {
              color: "rgba(50,171,96,1.0)",
              width: 0.5,
            },
          },
        };

        var templayout1 = {
          height: 200,
          width: 800,
          title: "CPU Utilization",
          xaxis: {
            range: [0, 12],
            domain: [0, 1],
          },
          yaxis: {
            range: [0, 10],
            domain: [0, 1],
          },
          margin: {
            l: 50,
            r: 10,
            t: 50,
            b: 30,
          },
          annotations: [],
          datarevision: revision + 1,
        };

        for (var i = 0; i < yConsumption_cpu.length; i++) {
          let result1 = {
            xref: "x",
            yref: "y",
            x: xTimeline[i],
            y: yConsumption_cpu[i] + 1,
            text: yConsumption_cpu[i] + "%",
            font: {
              family: "Arial",
              size: 12,
              color: "rgb(50, 171, 96)",
            },
            showarrow: false,
          };

          templayout1.annotations.push(result1);
        }

        var trace2 = {
          x: xTimeline,
          y: yConsumption_memory,
          mode: "line",
          type: "scatter",
          marker: {
            line: {
              color: "rgba(50,171,96,1.0)",
              width: 0.5,
            },
          },
        };

        var templayout2 = {
          height: 200,
          width: 800,
          title: "Memory Utilization",
          xaxis: {
            range: [0, 12],
            domain: [0, 1],
          },
          yaxis: {
            range: [0, 10],
            domain: [0, 1],
          },
          margin: {
            l: 50,
            r: 10,
            t: 50,
            b: 30,
          },
          legend: {
            y: 0.5,
            traceorder: "none",
            font: {
              size: 16,
            },
          },
          annotations: [],
          datarevision: revision + 1,
        };

        for (var j = 0; j < yConsumption_memory.length; j++) {
          let result2 = {
            xref: "x",
            yref: "y",
            x: xTimeline[j],
            y: yConsumption_memory[j] + 1,
            text: yConsumption_memory[j] + "%",
            font: {
              family: "Arial",
              size: 12,
              color: "rgb(50, 171, 96)",
            },
            showarrow: false,
          };

          templayout2.annotations.push(result2);
        }

        setCPUData([trace1]);
        setMemData([trace2]);
        setCPULayout(templayout1);
        setMemLayout(templayout2);
        revision++;
      }
    });
  };

  // call on every change in selectedId
  useEffect(() => {
    if (selectedId !== undefined) {
      fetchData();

      // data would auto refresh in every 60 sec
      const interval = setInterval(() => fetchData(), 60000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [selectedId]);

  //call only once
  useEffect(() => {
    getAllContainer();
  }, []);

  const options = { displayModeBar: false };
  return (
    <div style={{ marginTop: "5%", width: "100%" }}>
      {cpudata.length === 0 ? (
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
           
            
            <img src={refresh} alt="my image" onClick={fetchData} style={{cursor:'pointer'}} />
            
          </div>
          <br />
          <Plot data={cpudata} layout={CPUlayout} config={options} />
          <Plot data={memdata} layout={Memlayout} config={options} />
        </Container>
      )}
    </div>
  );
}

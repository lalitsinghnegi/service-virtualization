import React, { useState, useEffect } from "react";
import { Input, Row, Col } from "reactstrap";
import {
  getVCData,
  getProgram
} from "../../services/folderStructure.service";
import DashboardCard from "../DashboardNew/Cards/DashboardCard";
import {
  faLayerGroup,
  faTasks
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { TelstraIcon } from "../common/icons/GradientIcons";



export const FolderStructure = (props) => {

  // Purpose : To show all value chain and program in the dashboard


  let history = useHistory();
  const [program, setProgram] = useState({
    program_id: null,
    program_name: "",
    team_id: "",
    team_name: "",
    team_code: ""
  });
  const [valueChain, setValueChain] = useState({
    valueChain_id: null,
    valueChain_name: "",
  });

  const [programdata, setProgramData] = useState([]);
  const [vcdata, setVCData] = useState([]);
 
  const handleProgramClick = async (data) => {
  
    setValueChain({ valueChain_id: null, valueChain_name: "" });
    setProgram({
      program_id: data.program_id,
      program_name: data.program_name,
      team_id: data.team_id,
      team_name: data.team_name,
      team_code: data.team_code
    });

    renderValueChain(data.program_id, data.team_id);
    if(programdata.length > 1){
      scrollToBottom();
      }
  };

  const handleValueChainClick = (data) => {

    console.log("hi")
    setValueChain({
      valueChain_id: data.valueChain_id,
      valueChain_name: data.valueChain_name,
    });
    history.push({
      pathname: "applications",
      state: {
        program: program,
        valueChain:{
          valueChain_id: data.valueChain_id,
          valueChain_name: data.valueChain_name,
        }
      }
    });
  };


  const ValueChain = () => {
    return (
      <Row>
        {vcdata.map((m, index) => (
          <Col xs={4} className="p-3" key={index}>
            <DashboardCard
              color={m.color}
              icon={m.icon}
              title={m.valueChain_name + " Stream"}
              subtitle={m.description}
              onClick={(e) => {
                console.log(m);
                handleValueChainClick(m);
              }}
            ></DashboardCard>
          </Col>
        ))}
      </Row>
    );
  };

  const Program = () => {
    return (
      <Row>
        {programdata.map((m, index) => (
          <Col xs={4} className="p-3" key={index}>
            <DashboardCard
              color={"turquoise"}
              //icon={"crowd-support"}
              title={m.program_name}
              subtitle={m.description}
              onClick={(e) => {
               
                handleProgramClick(m);
              }}
            ></DashboardCard>
          </Col>
        ))}
      </Row>
    );
  };

  const renderValueChain = async (pid, tid) => {
    let response = await getVCData({ program_id: pid, team_id: tid });
    if (response.code === 200) {
      setVCData(response.data);
    }
  };

  const renderProgram = async () => {
    let response = await getProgram();
    if (response.code === 200) {
      setProgramData(response.data);
      if (response.data.length === 1) {
        handleProgramClick(response.data[0]);
      }
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
        var scrollEl = document.getElementById("view-content");
        console.log("element",scrollEl)
        if (scrollEl != null) window.scrollTo({ top: scrollEl.scrollHeight + 40, behavior: "smooth" })
    }, 100);
}

  useEffect(() => {
    renderProgram();
  }, []);

  return (
    <>
    {programdata.length > 1 ? (
      <Row>
        <Col xs={11}>
          <h3>
          Programs
            <FontAwesomeIcon className="ml-2" icon={faTasks} size="1x" />{" "}
          </h3>
        </Col>
        <Col>
          {program.program_name !== "" && (
            <TelstraIcon primary icon="tick" color="green" />
          )}
        </Col>
      </Row>) : "" }
    
      {programdata.length > 1 ? (<><Program></Program>  <br></br></>) : ""}

      {vcdata.length > 0 ? (
        <div  id="view-content">
          <Row>
            <Col xs={12}>
              <h3>
                Streams
                <FontAwesomeIcon
                  className="ml-2"
                  icon={faLayerGroup}
                  size="1x"
                />
                <hr></hr>
                {valueChain.valueChain_name !== ""
                  ? " / " + valueChain.valueChain_name
                  : ""}
              </h3>
            </Col>
          </Row>

          <ValueChain></ValueChain>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default FolderStructure;

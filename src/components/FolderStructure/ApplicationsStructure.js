import React, { useState, useEffect,useContext } from "react";
import { Container, Row, Col, Spinner, Button } from "reactstrap";
import { GlobalContext } from "../../context/GlobalState";
import {
  getAppData,
  getFolderStructureId,
} from "../../services/folderStructure.service";
import { CardPose } from "../utils/pose";
import { useHistory } from "react-router-dom";
import { TelstraIcon } from "../common/icons/GradientIcons";

import { Fade, Collapse } from "reactstrap";
import { DataFilterTileNew } from "./tiles/DataFilterTileNew";
import "./tiles/DataTilesFrame.css";
import { TilePose } from "../utils/pose";

export const ApplicationsStructure = (props) => {

  // To show all Applications and action after selecting the valuechain


  let history = useHistory();
  const {selected_entity_data, setSelectedEntity } = useContext(GlobalContext);
  const [program, setProgram] = useState(props.location.state.program);
  const [valueChain, setValueChain] = useState(props.location.state.valueChain);

  const [application, setApplication] = useState({
    application_id: null,
    application_name: "",
  });

  const [folderStructure, setFolderStructure] = useState({
    folderStructure_id: null,
  });

  const [revision,setRevision] = useState(0);
  const [app_data, setAppData] = useState([]);
  const [action_data, setActionData] = useState([]);

  const handleApplicationClick = async (data) => {
    
  
    setApplication({
      application_id: data.application_id,
      application_name: data.application_name,
    });

    console.log("PEEEEEEEEEEh ", data.application_id)
    let response = await getFolderStructureId({
      program_id: program.program_id,
      team_id: program.team_id,
      valueChain_id: valueChain.valueChain_id,
      application_id: data.application_id,
    });
    if (response.code === 200) {
      setFolderStructure(response.data);
      var folder_s3_path = props.location.state.program.program_name+'/'+ props.location.state.valueChain.valueChain_name +'/'+ data.application_name;
      folder_s3_path = folder_s3_path.replace(/ /g, "_");
      let application_code = data.application_code ;
      console.log("EHHHHHHHHHHHHHHHH ", data.application_id)

      setActionData([
        {
          Route: "createstub",
          folderStructure_id: response.data[0].folderStructure_id,
          folderStructureS3 : folder_s3_path,
          application_code : application_code,
          application_id:data.application_id,
          color: "green",
          label:"Create Virtual Service",
          icon:"business-building",
          isSelected:false
        },
        {
          Route: "managestub",
          folderStructure_id: response.data[0].folderStructure_id,
          folderStructureS3: folder_s3_path,
          application_code : application_code,
          application_id:data.application_id,
          team_id: data.team_id,
          valueChain_id:data.valueChain_id,
          valueChain_name:data.valueChain_name,
          program_id:data.program_id,
          random:1121,
          color: "green",
          label:"Manage Virtual Services",
          icon:"file-sharing",
          isSelected:false
        },
      ]);
    }
  };

  const handleActionClick = (data) => {
    
    setSelectedEntity({
      folderStructure_id:data.folderStructure_id,
        folderStructureS3:data.folderStructureS3,
        team_name:program.team_name,
        application_id:application.application_id,
        application_code: data.application_code,
        team_code:program.team_code,
        program_name:program.program_name,
        valueChain_id:valueChain.valueChain_id,
        valueChain_name:valueChain.valueChain_name,
        team_id: program.team_id,
        program_id:program.program_id

    })
   
    history.push({
      pathname: data.Route,
      state: {
        folderStructure_id: data.folderStructure_id,
        team_name: program.team_name,
        folderStructureS3: data.folderStructureS3,
        application_code: data.application_code,
        application_id:data.application_id,
        team_code:program.team_code,
        program_name:program.program_name,
        program_id:program.program_id,
        valueChain_name:valueChain.valueChain_name,
        valueChain_id:valueChain.valueChain_id,
        team_id: program.team_id
      },
    });
  };

  const setSelectionFn = (obj) => {
    
    app_data.forEach((item) => {
      if(item.application_name === obj.application_name){
        item.isSelected = true ;
      } else {
        item.isSelected = false ;
      }
    })
    setAppData(app_data);
    setRevision(revision+1);
    handleApplicationClick(obj);
  };

  const Application = (props) => {
   const {data} = props;
    return (
      <Row style={{ marginTop: "30px",paddingLeft: "10px" }}>
        {data.map((tile, index) => (
          <Col xs={2} key={index}>
            <div className={`tiles-grid flex base-${tile.color}`}>
              <TilePose pose={tile.isSelected ? "selected" : "init"}>
                <DataFilterTileNew
                   {...tile}
                  obj={tile}
                  isSelected={tile.isSelected} // If this is undefined handle as usual
                  selectType={(tile) => {
                    setSelectionFn(tile);
                  }}
                ></DataFilterTileNew>
              </TilePose>
            </div>
          </Col>
        ))}
      </Row>
    );
  };

  const Action = (props) => {
    const {data} = props;
     return (
       <Row style={{ marginTop: "30px",paddingLeft: "5px"  }}>
         {data.map((tile, index) => (
           <Col xs={2} key={index}>
             <div className={`tiles-grid flex base-${tile.color}`}>
               <TilePose pose={tile.isSelected ? "selected" : "init"}>
                 <DataFilterTileNew
                    {...tile}
                   obj={tile}
                   minimize={tile.minimize}
                   isSelected={tile.isSelected} // If this is undefined handle as usual
                   selectType={(tile) => {
                    handleActionClick(tile);
                   }}
                 ></DataFilterTileNew>
               </TilePose>
             </div>
           </Col>
         ))}
       </Row>
     );
   };

  const renderApplication = async () => {
    let response = await getAppData({
      program_id: program.program_id,
      team_id: program.team_id,
      valueChain_id: valueChain.valueChain_id,
    });
    if (response.code === 200) {
      let d = response.data;
      let a = [];
      d.forEach((element) => {
        a.push({
          application_id: element.application_id,
          application_name: element.application_name,
          application_code: element.application_code,
          color: "magenta",
          label:element.application_name,
          icon:element.icon,
          isSelected:false
        });
      });
      setAppData(a);
    }
  };

  useEffect(() => {
    renderApplication();
  }, []);

  return (
    <Container>
      <>
      {console.log("Application Props are ",props.location.state)}
        <div className="white mt-3">
          {app_data.length > 0 ? (
            <div>
               <Row>
                <Col xs={11}>
                  <h1>
                  Virtual Service Creation for
                    {valueChain.valueChain_name !== ""
                      ? " - " + valueChain.valueChain_name
                      : ""}
                  </h1>
                </Col>
                <Col>
                  {valueChain.valueChain_name !== "" && (
                    <TelstraIcon primary icon="network-elem-managers" color="blue" />
                  )}
                </Col>
              </Row>
              <br></br>
              <Row>
            
                <Col xs={11}>
          
             
                  <h2>
                    Application
                    {application.application_name !== ""
                      ? " - " + application.application_name
                      : ""}
                  </h2>
                </Col>
                <Col>
                  {application.application_name !== "" && (
                    <TelstraIcon primary icon="tick" color="green" />
                  )}
                </Col>
              </Row>

              <Application data ={app_data}/>
            </div>
          ) : (
            ""
          )}

          {action_data.length > 0 ? (
            <div>
              <br></br>
              <br></br>
              <h2>Actions</h2>
              <Action data={action_data}/>
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    </Container>
  );
};

export default ApplicationsStructure;

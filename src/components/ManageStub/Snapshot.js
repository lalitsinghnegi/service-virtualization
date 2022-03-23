import React, { useState,useEffect } from "react";
import { FormGroup, Input} from "reactstrap";
import "../Create/create.css";
export default function Snapshot(props){

  // Purpose : Show the preview of individual end point infomation

 const {selectedRowData,...rest} = props;
const [preview,setPreview] = useState("");

    useEffect(() => {
      if(selectedRowData.epjson !== undefined){
        console.log("selectedRowData-2::" , selectedRowData)
        let preview = JSON.stringify(selectedRowData.epjson,undefined,4);
        setPreview(preview)
        
      } else {
        console.log("selectedRowData-1::" , selectedRowData)
        setPreview("")
      }
    }, [selectedRowData]);
  
    return (
      <div>
        {"Preview"}
          <FormGroup>
            <Input style={{fontSize: 13}}
              type="textarea"
              value={preview}
              rows="20"
              onChange={(e) => {
                e.preventDefault();
              }}
            />
          </FormGroup>
      </div>
    );
}

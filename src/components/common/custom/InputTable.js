// import { Button, Col, ListGroupItem, Row, Table } from "reactstrap";
// import { Field, FieldArray, change, formValues, reduxForm } from "redux-form";
// import {
//   adborIdValidator,
//   fnnValidator,
//   rangeValidator
// } from "../form/fieldValidators";

// import DropdownComponent from "./DropdownComponent";
// import React from "react";
// import ReduxFormContainer from "../form/redux/ReduxFormContainer";
// import _ from "lodash";
// import { commonFieldValidator } from "../form/syncValidators";
// import { renderField } from "../fields/fields";

// export default class InputTable extends React.Component {
//   handleRowChange = (numRows, newNumRows, fields) => {
//     let diff = newNumRows - numRows;
//     if (diff > 0) {
//       for (let i = 0; i < diff; i++) fields.push({ adborId: null, fnn: null });
//     } else if (diff < 0) {
//       diff *= -1;
//       for (let i = 0; i < diff; i++) fields.pop();
//     }
//   };

//   rangefieldRender = ({ fields, passdownprops, productType }) => (
//     <div>
//       <div id="s2p-product-modal-input-head" className="row">
//         <div className="col">
//           <span>RANGES:</span>
//         </div>
//         <div className="col">
//           <span>
//             <Button
//               color="link"
//               onClick={() => fields.push({ from: null, to: null })}
//             >
//               <i className="fa fa-plus fa-sm" aria-hidden="true"></i>
//             </Button>
//           </span>
//           <span>
//             <Button
//               color="link"
//               style={{ color: "#dc3545" }}
//               onClick={() => fields.pop()}
//             >
//               <i className="fa fa-minus fa-sm" aria-hidden="true"></i>
//             </Button>
//           </span>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col">From:</div>
//         <div className="col">To:</div>
//       </div>
//       {fields.map((range, index) => {
//         let from = 2 * index + 1,
//           to = from + 1;
//         return (
//           <React.Fragment key={index}>
//             <Row key={`rangeEditRow-${index}`}>
//               <Col xs="6">
//                 <Field
//                   name={`ranges[${index}].from`}
//                   disabled={false}
//                   component={renderField}
//                   validate={rangeValidator}
//                   invalid={this.props.errorMessage}
//                   type={"text"}
//                   showValidMsg={false}
//                 />
//               </Col>
//               <Col xs="6">
//                 <Field
//                   name={`ranges[${index}].to`}
//                   disabled={false}
//                   component={renderField}
//                   validate={rangeValidator}
//                   invalid={this.props.errorMessage}
//                   type={"text"}
//                   showValidMsg={false}
//                 />
//               </Col>
//             </Row>
//           </React.Fragment>
//         );
//       })}
//     </div>
//   );

//   adborFnnsRender = ({ fields, passdownprops, productType }) => (
//     <div>
//       <div className="row" id="product-input-header">
//         <div className="col col1">
//           {" "}
//           <span className="product-header">Product:</span>
//           <span>{productType.toUpperCase()}</span>
//         </div>
//         <div className="col col2">
//           <span className="product-header">Quantity: </span>
//           <span id="qty-dropdown">
//             <DropdownComponent
//               selectInput={qty =>
//                 this.handleRowChange(fields.length, qty, fields)
//               }
//             />
//           </span>
//         </div>
//       </div>
//       <div id="s2p-product-modal-input-head" className="row">
//         <div className="col">
//           <span>Adbor ID</span>
//           <span>
//             <Button
//               color="link"
//               onClick={() =>
//                 fields.forEach((d, i) =>
//                   passdownprops.dispatch(
//                     change(
//                       passdownprops.formName,
//                       `adborFnns[${i}].adborId`,
//                       fields.get(0).adborId
//                     )
//                   )
//                 )
//               }
//             >
//               <i className="fa fa-plus fa-sm" aria-hidden="true"></i>
//             </Button>
//           </span>
//         </div>
//         <div className="col">
//           <span>Service ID</span>
//           {/* Lazy way of fixing alignment issue of button on one side - Dan */}
//           <Button onClick={() => {}} style={{ opacity: 0, cursor: "default" }}>
//             <i className="fa fa-plus fa-sm" aria-hidden="true"></i>
//           </Button>
//         </div>
//       </div>
//       {fields.map((adborFnn, index) => {
//         let adborId = 2 * index + 1,
//           fnn = adborId + 1;
//         return (
//           <Row key={`adborFnnEditRow-${index}`}>
//             <Col xs="6">
//               <Field
//                 name={`adborFnns[${index}].adborId`}
//                 tabIndex={adborId}
//                 disabled={passdownprops.asyncValidating}
//                 autoFocus={adborId === 0}
//                 component={renderField}
//                 validate={adborIdValidator}
//                 invalid={this.props.errorMessage}
//                 type={"text"}
//                 showValidMsg={false}
//               />
//             </Col>
//             <Col xs="6">
//               <Field
//                 name={`adborFnns[${index}].fnn`}
//                 tabIndex={fnn}
//                 disabled={passdownprops.asyncValidating}
//                 component={renderField}
//                 validate={fnnValidator}
//                 touched={true}
//                 invalid={this.props.errorMessage}
//                 type={"text"}
//                 showValidMsg={false}
//                 placeholder={"GENERATED"}
//               />
//             </Col>
//           </Row>
//         );
//       })}
//     </div>
//   );

//   // savedTable = (product, data, index) => {
//   savedTable = savedProducts => {
//     if (savedProducts.length === 0) return;
//     return (
//       <div className="col-sm" id="product-table-col">
//         <div id="adbor-fnn-box" style={{ height: "100%" }}>
//           {savedProducts.map((product, index) => {
//             let name = product.name;
//             let adborFnns = product.adborFnns;
//             let ranges = product.ranges;
//             return (
//               <ListGroupItem id="s2p-table-box" key={index}>
//                 <div className="row" id="product-table-header">
//                   <div className="col">
//                     <span className="product-header">Product: </span>{" "}
//                     <span className="product-table-name">
//                       {name.toUpperCase()}
//                     </span>
//                   </div>
//                 </div>
//                 <Table id="adbor-fnn-table">
//                   <thead>
//                     <tr className="heading-table-row">
//                       <th>Adbor ID</th>
//                       <th>Service ID</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {adborFnns.map((adborFnn, index) => {
//                       const { adborId, fnn } = adborFnn;
//                       return (
//                         <tr key={index}>
//                           <td>{adborId}</td>
//                           <td>
//                             {fnn !== null && fnn !== undefined
//                               ? fnn
//                               : "GENERATED"}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </Table>
//                 <Table id="adbor-fnn-table">
//                   <thead>
//                     <tr className="heading-table-row">
//                       <th colSpan={2}>Ranges</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {ranges.map((range, index) => {
//                       const { from, to } = range;
//                       return (
//                         <tr key={index}>
//                           <td>{`From: ${from}`}</td>
//                           <td>{`To: ${to}`}</td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </Table>
//               </ListGroupItem>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };
//   editableTable = (productType, passdownprops) => {
//     return (
//       <div className="col-sm" id="product-table-col" key={productType}>
//         <ListGroupItem style={{ padding: ".50rem .75rem" }}>
//           <FieldArray
//             name="adborFnns"
//             props={{ passdownprops, productType }}
//             component={this.adborFnnsRender}
//           />
//           <FieldArray
//             name="ranges"
//             props={{ passdownprops, productType }}
//             component={this.rangefieldRender}
//           />
//         </ListGroupItem>
//       </div>
//     );
//   };

//   render() {
//     const { productType, productData, passdownprops } = this.props;
//     const savedProducts =
//       productData !== undefined &&
//       productData.filter(
//         prod => prod.name.toUpperCase() !== productType.toUpperCase()
//       );
//     return (
//       <div className="table-container">
//         <div className="row">
//           {this.savedTable(savedProducts)}
//           {this.editableTable(productType, passdownprops)}
//         </div>
//       </div>
//     );
//   }
// }

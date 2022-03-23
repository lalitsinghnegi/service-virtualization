import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import InputTable from "./InputTable";
import React from "react";
import ReduxFormContainer from "../form/redux/ReduxFormContainer";
import { SubmissionError } from "redux-form";
import _ from "lodash";
import { ifError } from "assert";
import s2pSiteAsyncVal from "../../Data/validation/AsyncValidateS2P";

class ProductModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      productType: "",
      tableData: {},
      productData: [],
      invalid: {
        status: false,
        fields: []
      }
    };

    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  open = productType => {
    this.setState({ modal: true, productType: productType.toLowerCase() });
  };

  handleSubmit = values => {
    console.log(values);
    let newFnns = values.adborFnns.map((adborFnn, i) => {
      return { fnn: adborFnn.fnn, index: i };
    });
    let prodName = values.name;
    let otherProds = this.props.productData.filter(
      prod => prod.name !== prodName
    );
    let uniqueFnns = otherProds
      .map(prod => prod.adborFnns.map(adborFnn => adborFnn.fnn))
      .flat();

    for (let i = 0; i < newFnns.length; i++) {
      if (newFnns[i].fnn && uniqueFnns.contains(newFnns[i].fnn)) {
        const field = "adborFnns[" + newFnns[i].index + "].fnn";
        const fieldErr = _.set(
          {},
          field,
          "Service ID is present in other product"
        );
        throw new SubmissionError({
          ...fieldErr,
          _error: "Product submission failed!"
        });
      }
    }

    values.name = this.state.productType;
    // if (!values.ranges) values.ranges = [{ from: "1", to: "100" }]
    if (!values.ranges) values.ranges = [];
    this.props.saveTableView(values);
    this.toggle();
  };

  handleOnClose = (tableData, toggle = true) => {
    this.props.cancelTableView(tableData);
    if (toggle) this.toggle();
  };

  render() {
    const { selectedProducts, formData, productData } = this.props;
    const { productType } = this.state;
    const modalLen = selectedProducts.length <= 1 ? 1 : 2;
    const size = 30 * modalLen - (modalLen - 1) * 5 + "vw";

    const formName = "s2pProductModalForm";
    const asyncBlurFields = ["adborFnns[].adborId", "adborFnns[].fnn"];
    let tData = productData.find(obj => obj.name === productType.toUpperCase());
    if (tData) {
      tData.cidn = this.props.cidn;
      tData.type = this.props.type;
    }

    return (
      <div className="productTable">
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          style={{ maxWidth: size }}
          backdrop={"static"}
          centered
        >
          <ModalHeader>
            {" "}
            <p>Product Data</p>
          </ModalHeader>
          {/* <form className="main-form needs-validation" onSubmit={this.submitHandler} noValidate > */}
          <ReduxFormContainer
            // validate={commonFieldValidator}
            asyncValidate={s2pSiteAsyncVal}
            onSubmit={this.handleSubmit.bind(this)}
            asyncBlurFields={asyncBlurFields}
            initialValues={tData}
            formName={formName}
            propsDepth={4}
          >
            <ModalBody>
              <InputTable
                assignProps
                formName={formName}
                productType={productType}
                productData={productData}
              />
            </ModalBody>
            <ModalFooter style={{ padding: "0.5rem" }}>
              {formData &&
                !formData.asyncValidating &&
                formData.fields &&
                formData.fields.adborFnns &&
                formData.fields.adborFnns.length > 0 && (
                  <button
                    color="#4CAF50"
                    className="btn btn-success "
                    id="submitButton"
                    type="submit"
                  >
                    Save{" "}
                    <i className="fa fa-check-square-o" aria-hidden="true"></i>
                  </button>
                )}
              <button
                color="danger"
                type="button"
                className="btn btn-danger"
                id="cancelButton"
                value="cancel"
                onClick={() => {
                  this.props.handleModalClose(productType.toUpperCase());
                  this.toggle();
                }}
              >
                Cancel
              </button>
            </ModalFooter>
          </ReduxFormContainer>
        </Modal>
      </div>
    );
  }
}

export default ProductModal;

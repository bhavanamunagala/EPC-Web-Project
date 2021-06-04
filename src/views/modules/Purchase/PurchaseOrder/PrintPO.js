import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Container, Row, Col, Table } from "reactstrap";
import "../../style.css";
import { history } from "../../../../history.js";
import { getSupplierById } from "../../../../redux/actions/Administration/supplier";
import { getPurchaseOrderById } from "../../../../redux/actions/Purchase/PurchaseOrder";
import ReactToPrint from "react-to-print";
import { Printer } from "react-feather";
import { toast } from "react-toastify";
import { data } from "jquery";

class PrintPO extends React.Component {
  render() {
    var converter = require("number-to-words");

    let {
      PONo,
      PODate,
      DeliveyDate,
      NetTotal,
      PODetails,
    } = this.props.selectedPO;
    let { supplierData } = this.props;

    return (
      <>
        <Container style={{ backgroundColor: "#fff " }} className="h-100">
          <Row className="justify-content-center p-1">
            <img
              src={require("../../../../assets/img/logo/logo.png")}
              alt="companyLogo"
              style={{ width: "25%" }}
            />
          </Row>
          <Row className="justify-content-center">
            <p>
              B-406, Rajashree Apt. Nandan Park Soc. Opp. Visamo kids Bopal
              -380058 Ahmedabad.
            </p>
          </Row>
          <Row className="justify-content-center">
            <h4>Purchase Order</h4>
          </Row>
          <Row>
            <Col className="border border-dark m-1 ">
              <Row className="my-3 p-1">
                <strong>M/s New Star Infotech</strong>
                <p className="mt-1">
                  B-406, Rajashree Apt. Nandan Park Soc. Opp. Visamo kids Bopal
                  -380058 Ahmedabad.
                </p>
                <Row>
                  <Col>
                    <strong>GSTin No :-</strong>
                    <br />
                    <strong>PAN No :-</strong>
                  </Col>
                  <Col>
                    <div>24AXMPK8712G1ZD</div>
                    <div>AXMPK8712G</div>
                  </Col>
                </Row>
              </Row>
            </Col>
            <Col className="m-1">
              <Row className="justify-content-between border border-dark p-1">
                <strong>P.O.NO. : {PONo}</strong>
                <strong className="mr-1">
                  DATE : {moment(PODate).format("DD / MM / YYYY")}
                </strong>
              </Row>
              <Row className="border border-dark p-1 mt-1">
                <p>
                  <strong>Ex. Delivery Date :</strong>{" "}
                  {moment(DeliveyDate).format("DD / MM / YYYY")}
                </p>
                <Row className="p-1">
                  <strong>DELIVERY AT :</strong>
                  <br />
                  {supplierData?.SupplierName}
                  {supplierData?.Address} <br />
                  {supplierData?.WorkAddress} <br />
                  {supplierData?.CityName +
                    " " +
                    supplierData?.DistrictName +
                    " " +
                    supplierData?.StateName +
                    " " +
                    supplierData?.CountryName}
                  <br />
                  {"Pincode :- " + supplierData?.ZipCode}
                  <br />
                  <strong>
                    Contact us : {supplierData?.ContactDetails?.[0]?.MobileNo}
                  </strong>
                </Row>
              </Row>
            </Col>
          </Row>
          <Row className="my-1 pl-1">
            You are requested to supply the following items
          </Row>
          <Row>
            <Table bordered className="m-1 text-right">
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Item Code</th>
                  <th>Item Description</th>
                  <th>Qty</th>
                  <th>Unit</th>
                  <th>
                    Rate
                    <hr />
                    INR
                  </th>
                  <th>
                    Disc.
                    <hr />
                    Per
                  </th>
                  <th>
                    Amount
                    <hr />
                    INR
                  </th>
                </tr>
              </thead>
              <tbody style={{ minHeight: "100px" }}>
                {PODetails?.length > 0 &&
                  PODetails.map((item, i) => (
                    <>
                      <tr>
                        <td>{item?.IDNumber}</td>
                        <td>{item?.ItemCode}</td>
                        <td
                          rowSpan={item?.POExcises?.length}
                          className="text-left"
                        >
                          {item?.ItemName}
                          {item?.POExcises?.length > 0 &&
                            item?.POExcises.map((taxData, i) => (
                              <i
                                className="d-flex justify-content-between ml-1"
                                key={"txtData" + taxData.IDNumber}
                              >
                                {taxData?.TaxName}
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                {taxData?.Percentage + " % "}
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <span>{taxData?.Amount + " /-"}</span>
                              </i>
                            ))}
                        </td>
                        <td>{item?.Quantity}</td>
                        <td>{item?.UnitName}</td>
                        <td>{item?.Rate + " /-"}</td>
                        <td>{item?.DISCPERC}</td>
                        <td>{item?.Amount + " /-"}</td>
                      </tr>

                      {/* {item?.POExcises?.length > 0 &&
                        item?.POExcises.map((taxData, i) => (
                          <tr>
                            <td></td>
                            <td></td>
                            <td>
                              {taxData?.Name +
                                "" +
                                taxData?.Percentage +
                                "% " +
                                taxData?.Amount}
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        ))} */}
                    </>
                  ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="6" className="text-left">
                    {/* <div className="d-flex justify-content-between "> */}
                    {/* <strong> */}
                    Amount in Words :{NetTotal && converter.toWords(NetTotal)}
                    Only
                    {/* </strong> */}
                    {/* </div> */}
                  </td>
                  <td>Total :</td>
                  <td>{NetTotal && NetTotal + " /-"}</td>
                </tr>
                <tr>
                  {/* <td colSpan="8">
                    <tabel className="w-100">
                      <thead>
                        <tr>
                          <th>Sr. No.</th>
                          <th>Terms And Condition</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            If Material is not as per specification it will
                            replace by party.
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>
                            If any daviation in quality it will solve or reback
                            by mutual understanding of both.
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td> Test Certificate Required.</td>
                        </tr>
                      </tbody>
                    </tabel>
                  </td> */}
                  <td colSpan="1">Sr. No.</td>
                  <td colSpan="7" className="text-left">
                    Terms And Condition
                  </td>
                </tr>
                <tr>
                  <td colSpan="1">1</td>
                  <td colSpan="7" className="text-left">
                    If Material is not as per specification it will replace by
                    party.
                  </td>
                </tr>
                <tr>
                  <td colSpan="1">2</td>
                  <td colSpan="7" className="text-left">
                    If any daviation in quality it will solve or reback by
                    mutual understanding of both.
                  </td>
                </tr>
                <tr>
                  <td colSpan="1">3</td>
                  <td colSpan="7" className="text-left">
                    Test Certificate Required.
                  </td>
                </tr>

                <tr className="text-left">
                  <td colSpan="8">Payment Terms : </td>
                </tr>
                <tr>
                  <td colSpan="4" className="text-left">
                    GSTIN No :- {supplierData?.GSTNo} <br />
                    PAN No. :- {supplierData?.PANNo}
                  </td>
                  <td colSpan="4" className="text-right mr-2">
                    For, Plasma Induction
                    <br />
                    <br />
                    <br />
                    <br />
                    ______________________
                    <br />
                    Authorised Signature
                  </td>
                </tr>
              </tfoot>
            </Table>
          </Row>
        </Container>
      </>
    );
  }
}

class PrintPOAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPO: {},
      supplierData: {},
    };
  }

  componentDidMount() {
    if (history?.location?.state?.id) {
      this.props.getPurchaseOrderById({
        IDNumber: history?.location?.state?.id,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.purchaseOrder.error !== this.props.purchaseOrder.error &&
      this.props.purchaseOrder.error
    ) {
      toast.error(this.props.purchaseOrder.error);
    }
    if (
      prevProps.purchaseOrder.successMsg !==
        this.props.purchaseOrder.successMsg &&
      this.props.purchaseOrder.successMsg
    ) {
      toast.success(this.props.purchaseOrder.successMsg);
    }

    if (
      prevProps.purchaseOrder.selectedPO !== this.props.purchaseOrder.selectedPO
    ) {
      if (this.props?.purchaseOrder?.selectedPO?.SupplierID) {
        this.props.getSupplierById({
          IDNumber: this.props?.purchaseOrder?.selectedPO?.SupplierID,
        });
      }
      this.setState({
        selectedPO: this.props?.purchaseOrder?.selectedPO,
      });
    }

    if (
      prevProps.supplier.selectedSupplier !==
      this.props.supplier.selectedSupplier
    ) {
      this.setState({
        supplierData: this.props?.supplier?.selectedSupplier,
      });
    }
  }
  render() {
    return (
      <Container>
        <Row
          className="p-1 justify-content-end mt-1"
          style={{ backgroundColor: "#fff" }}
        >
          <ReactToPrint
            trigger={() => (
              <Printer className="cursor-pointer mr-1 text-primary" size={20} />
            )}
            content={() => this.componentRef}
            pageStyle="@page {
                size: auto; margin: 0mm;
              }
              @media print {
                body {
                  -webkit-print-color-adjust: exact;
                   padding: 40px !important;
                  }
                  .table thead tr th,.table tbody tr td,.table tfoot tr td{
                    border-width: 1px !important;
                    border-style: solid !important;
                    border-color: black !important;
                   padding:10px;
                    -webkit-print-color-adjust:exact ;
                  }
                  .border{
                    border-width: 1px !important;
                    border-style: solid !important;
                    border-color: black !important;
                  }
                  .m-1{
                    margin: 1rem !important;
                  }
                  .p-1{
                    padding: 1rem !important;
                  }
                  .my-1{
                    margin-top: 1rem !important;
                    margin-bottom: 1rem !important;
                  }
                  .pl-1{
                    padding-left: 1rem !important;
                  }
                }"
          />
        </Row>
        <Row>
          <PrintPO
            ref={(el) => (this.componentRef = el)}
            selectedPO={this.state.selectedPO}
            supplierData={this.state.supplierData}
          />
        </Row>
      </Container>
    );
  }
}

// export default PrintPOAction;

const mapStateToProps = (state) => {
  return {
    purchaseOrder: state.purchaseOrder,
    supplier: state.supplier,
  };
};

export default connect(mapStateToProps, {
  getSupplierById,
  getPurchaseOrderById,
})(PrintPOAction);
